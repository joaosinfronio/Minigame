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

    this.maxFrame = 4;
    this.frameX = 0;
    this.fps = 15;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;

    this.speed = 0;
    this.forceUp = 0;
    this.gravity = 1.5;
    this.jumpingState = false;
    this.lives = 10;

    this.direction = 1;

    this.image.src = "player/Walk.png";
  }

  checkForColision(enemy) {
    let dx = enemy.x - this.x;
    let dy = enemy.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < enemy.width / 2 + this.width / 2) {
      enemy.finished = true;
      return true;
    }
    return false;
  }

  // checkForAlert(enemy) {
  //   let dx = enemy.x - this.x;
  //   let dy = enemy.x - this.y;
  //   let distance = Math.sqrt(dx * dx + dy * dy);
  //   if (distance < enemy.width * 5 + this.width * 5) {
  //     enemy.flyState = true;
  //     return true;
  //   }
  //   enemy.flyState = false;
  //   return false;
  // }

  // recives a argument for multiples canvas elements
  draw() {
    this.game.context.fillStyle = "white";

    this.game.context.font = "12px sans-serif";
    this.game.context.fillText("Lives" + this.lives, 100, 100);

    this.game.context.beginPath();
    this.game.context.arc(
      this.x + this.width / 2,
      this.y + this.height / 1.5,
      this.width * 0.4,
      0,
      Math.PI * 2
    );
    this.game.context.stroke();

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

  runLogic() {
    //Screen Speed of Player
    for (var enemy of this.game.enemies) {
      if (this.checkForColision(enemy)) {
        this.lives--;
      }
    }
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX > this.maxFrame) {
        this.frameX = 0;
      } else {
        this.frameX += 1;
      }
      this.frameTimer = 0;
    } else {
      this.frameTimer += this.game.deltatime;
    }

    if (this.game.keys.indexOf("ArrowRight") > -1) {
      //Controls
      this.speed = 5;
      this.direction = 1;
    } else if (this.game.keys.indexOf("ArrowLeft") > -1) {
      this.direction = -1;
      this.speed = -5;
    } else {
      this.direction = 1;
      this.speed = 0;
    }
    if (this.game.keys.indexOf("ArrowUp") > -1 && !this.checkJumping()) {
      this.forceUp -= 22;
    }

    //Horizontal movement
    this.x += this.speed;

    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.width > this.game.width) {
      this.x = this.game.width - this.width;
    }

    //Vertical movement
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

      this.forceUp = 0;
    }
    if (this.y > this.game.height - this.height) {
      this.y = this.game.height - this.height;
    }
  }
}
