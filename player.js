class Player {
  constructor(game) {
    this.game = game;
    this.spriteWidth = 288;
    this.spriteHeight = 48;
    this.width = this.spriteWidth * 0.33;
    this.height = 100;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.image = new Image();
    this.sadSound = new Audio();
    this.sadSound.src = "player/Sad Dog 1.wav";
    this.sound = new Audio();
    this.sound.volume = 0.15;

    this.frameX = 0;
    this.fps = 15;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;

    this.speed = 0;
    this.forceUp = 0;
    this.gravity = 1.2;
    this.restart();

    // this.maxFrame = 4;
    // this.jumpingState = false;
    // this.lives = 10;
    // this.direction = 1;
    // this.state = "";
    // this.power = 0;
    // this.attack = 0;
    // this.image.src = "player/Walk.png";
  }

  restart() {
    this.x = 0;
    this.y = this.game.height - this.height;

    this.maxFrame = 4;
    this.image.src = "player/Walk.png";
    this.sound.src = "player/0.wav";

    this.lives = 10;
    this.direction = 1;
    this.power = 0;
    this.attack = 0;

    this.jumpingState = false;
    this.state = "";
    this.powerTime = 300;
    this.maxPower = 300;
  }

  //Checks for a colision with enemies
  //Circles with radius = width *0.3
  checkForColision(enemy, modifier) {
    let dx = enemy.x - this.x;
    let dy = enemy.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    let radiusEnemy = enemy.width * modifier;
    let radiusplayer = this.width * modifier;

    if (distance < radiusEnemy + radiusplayer) {
      enemy.finished = true;
      return true;
    }
    return false;
  }

  //Checks for Distance of alert with enemy
  checkForAlert(enemy) {
    if (this.checkForColision(enemy, 2.5)) {
      enemy.finished = false;
      enemy.flyState = true;
      return true;
    } else {
      return false;
    }
  }

  //Removes lives from player
  removeLives() {
    if (this.state !== "hurt") {
      this.lives--;
      this.sadSound.play();
    }
  }

  drawLives() {
    this.game.context.fillStyle = "black";

    this.game.context.font = " 25px helvetica";
    this.game.context.fillText(
      "Lives " + this.lives,
      (this.game.width - 2) * 0.2,
      100 - 3
    );
    this.game.context.fillStyle = "white";

    this.game.context.font = "25px helvetica";
    this.game.context.fillText(
      "Lives " + this.lives,
      this.game.width * 0.2,
      100
    );
  }

  drawPower() {
    this.game.context.fillStyle = "black";

    this.game.context.font = " 25px helvetica";
    this.game.context.fillText(
      "Power " + (this.power / this.powerTime).toFixed(0),
      this.game.width * 0.8 - 2,
      100 - 3
    );
    this.game.context.fillStyle = "white";

    this.game.context.font = "25px helvetica";
    this.game.context.fillText(
      "Power " + (this.power / this.powerTime).toFixed(0),
      this.game.width * 0.8,
      100
    );
  }

  // recives a argument for multiples canvas elements
  draw() {
    //Size of colision area

    // this.game.context.beginPath();
    // this.game.context.arc(
    //   this.x + this.width / 2,
    //   this.y + this.height / 1.5,
    //   this.width * 0.3,
    //   0,
    //   Math.PI * 2
    // );
    // this.game.context.stroke();

    this.drawLives();
    this.drawPower();

    this.game.context.drawImage(
      this.image,
      (this.frameX * this.spriteWidth) / 6,
      0,
      this.spriteWidth / 6,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  //Could check for paltforms
  checkJumping() {
    if (
      this.y <
      this.game.height - this.height

      /* || !checkForPlatform()*/
    ) {
      this.jumpingState = true;
    } else {
      this.jumpingState = false;
    }
    return this.jumpingState;
  }

  //Kills a enemy if is inline
  killEnemy(enemy) {
    if (
      this.y < enemy.y &&
      this.y + this.height > enemy.height &&
      this.attack === 1
    ) {
      enemy.lives--;
      return true;
    }
  }

  handleEnemies() {
    for (var enemy of this.game.enemies) {
      if (this.checkForColision(enemy, 0.3)) {
        this.removeLives();
        this.state = "hurt";
        enemy.away = true;
      }
      if (this.checkForAlert(enemy)) {
        this.killEnemy(enemy);
      }
    }
  }

  handleFrames() {
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX > this.maxFrame) {
        this.frameX = 0;
      } else if (this.frameX <= 0) {
        this.frameX = this.maxFrame;
      }
      {
        this.frameX += 1 * this.direction;
      }
      this.frameTimer = 0;
    } else {
      this.frameTimer += this.game.deltatime;
    }
  }

  horizontalMovement() {
    this.x += this.speed * this.game.stop;

    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.width > this.game.width * 0.8) {
      this.x = this.game.width * 0.8 - this.width;
    }
  }

  verticalMovement() {
    this.y += this.forceUp;
    if (this.checkJumping()) {
      this.image.src = "player/Jump.png";

      //Check for direction
      if (this.direction === -1) {
        this.image.src = "player/reverseJump.png";
      }
      this.forceUp += this.gravity;
      this.frameX = 0;
    } else {
      this.image.src = "player/Walk.png";

      //Check for direction
      if (this.direction === -1) {
        this.image.src = "player/reverseWalk.png";
      }
      if (this.game.stop === 0) {
        this.frameX = 0;
        this.image.src = "player/Idle.png";
      }

      this.forceUp = 0;
    }
  }

  runLogic() {
    //Check for enemys colision
    this.handleEnemies();

    //Movement between Frames of Sprite
    this.handleFrames();

    //Movement controls
    //Movement Right
    if (this.game.keys.indexOf("ArrowRight") > -1) {
      this.speed = this.game.speed;
      this.direction = 1;
      this.game.stop = 1;
      this.game.speedModifier = 1;

      //Movement Left
    } else if (this.game.keys.indexOf("ArrowLeft") > -1) {
      this.direction = -1;
      this.speed = -this.game.speed;
      this.game.stop = 1;
      this.game.speedModifier = 0.3;

      //Stop moving
    } else if (this.game.keys.indexOf("ArrowDown") > -1) {
      this.direction = 0;
      this.speed = 0;
      this.game.stop = 0;

      //Attack
    } else if (
      this.game.keys.indexOf("Space") > -1 &&
      this.power > this.powerTime
    ) {
      this.attack = 1;
      this.sound.play();
      this.power = 0;
    } else {
      this.speed = 0;
    }
    if (this.power < this.maxPower + 2) {
      this.power++;
    }
    //Fall
    if (this.game.keys.indexOf("ArrowUp") > -1 && !this.checkJumping()) {
      this.forceUp -= 22;
    }

    //Horizontal movement
    this.horizontalMovement();

    //Vertical movement

    this.verticalMovement();

    //On the Ground
    if (this.y > this.game.height - this.height) {
      this.y = this.game.height - this.height;
    }

    //If its Hurt
    if (this.state === "hurt") {
      this.image.src = "player/Hurt.png";
      setTimeout(() => (this.state = ""), 3000);
    }

    //If Attacks
    if (this.attack === 1) {
      this.image.src = "player/Attack.png";
      this.maxFrame = 2;
      setTimeout(() => {
        this.attack = 0;
        this.maxFrame = 4;
      }, 200);
    }
  }
}
