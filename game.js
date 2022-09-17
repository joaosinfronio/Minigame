class Game {
  constructor(gameScreenElement, gameOverScreenElement) {
    this.gameScreenElement = gameScreenElement;
    this.gameOverScreenElement = gameOverScreenElement;
    //define canvas
    this.canvas = document.querySelector("canvas");
    this.context = this.canvas.getContext("2d");

    //Size of the Game
    this.width = this.canvas.width = 800;
    this.height = this.canvas.height = 750;

    //this game as a player
    this.player = new Player(this);

    //enemies
    this.enemies = [];

    //keys active for controls
    this.keys = [];
    this.yTouch = "";
    this.xTouch = "";

    this.touchLimit = 30;
    this.doubleTapTime = 0;
    this.doubleTapTimeLimit = 10;
    this.doublePermission = false;

    //Enable input controls
    this.controlsInput();

    //Background
    this.backgroundLayers = [];

    //Speed of the game
    this.speed = 3.5;
    this.lastTime = 0;
    this.enemyTimer = 0;
    this.enemyInterval = Math.random() * 10000 + 5000;

    this.deltatime = 0;
    this.stop = 1;
    this.loose = false;
    this.gameTimer = 10000;
    this.score = 0;
    this.id;
    this.sound = new Audio();
    this.sound.src = "background/AmbientNatureBirdsWater01.wav";
    this.speedModifier = 1;
  }

  restart() {
    this.backgroundLayers.forEach((layer) => layer.restart());
    this.player.restart();
    this.enemies = [];
    this.keys = [];

    this.score = 0;
    this.loose = false;
    this.gameTimer = 10000;
    this.enemyInterval = Math.random() * 10000 + 5000;

    this.lastTime = 0;
    this.enemyTimer = 0;
    this.deltatime = 0;
    this.speed = 3.5;
    this.id;
  }

  controlsInput() {
    // Listen for keys pressed
    window.addEventListener("keydown", (e) => {
      if (
        (e.code === "ArrowDown" ||
          e.code === "ArrowUp" ||
          e.code === "ArrowLeft" ||
          e.code === "ArrowRight" ||
          e.code === "Space") &&
        this.keys.indexOf(e.code) === -1
      ) {
        this.keys.push(e.code);
      }
    });
    // Listen for keys not pressed
    window.addEventListener("keyup", (e) => {
      if (
        e.code === "ArrowDown" ||
        e.code === "ArrowUp" ||
        e.code === "ArrowLeft" ||
        e.code === "ArrowRight" ||
        e.code === "Space"
      ) {
        this.keys.splice(this.keys.indexOf(e.code), 1);
      }
    });

    window.addEventListener("touchstart", (e) => {
      this.xTouch = e.changedTouches[0].pageX;
      this.yTouch = e.changedTouches[0].pageY;

      if (this.doublePermission === true && this.inDoubleTapTime()) {
        this.keys.push("DOUBLETAP");
        this.doublePermission = false;
      } else {
        this.doublePermission = true;
        this.doubleTapTime = 0;
      }
    });

    window.addEventListener("touchmove", (e) => {
      const distance = e.changedTouches[0].pageY - this.yTouch;
      const distanceX = e.changedTouches[0].pageX - this.xTouch;

      if (distance < -this.touchLimit && this.keys.indexOf("UP") === -1) {
        this.keys.push("UP");
      } else if (
        distance > this.touchLimit &&
        this.keys.indexOf("DOWN") === -1
      ) {
        this.keys.push("DOWN");
      }
      if (distanceX > this.touchLimit && this.keys.indexOf("FORWARD") === -1) {
        this.keys.push("FORWARD");
      } else if (
        distanceX < -this.touchLimit &&
        this.keys.indexOf("BACKWARD") === -1
      ) {
        this.keys.push("BACKWARD");
      }
    });

    window.addEventListener("touchend", (e) => {
      this.keys.splice(this.keys.indexOf("UP"), 1);
      this.keys.splice(this.keys.indexOf("Down"), 1);
      this.keys.splice(this.keys.indexOf("FORWARD"), 1);
      this.keys.splice(this.keys.indexOf("BACKWARDS"), 1);
    });
  }

  inDoubleTapTime() {
    if (this.doubleTapTime < this.doubleTapTimeLimit) {
      return true;
    }
  }

  doubleTimeHandler() {
    if (this.doubleTapTime <= this.doubleTapTimeLimit) {
      this.doubleTapTime++;
    }
  }

  enemyHandler() {
    //If time less then 40 less time time between enemies
    if (this.gameTimer < 4000) {
      this.enemyInterval = 5000;
    }

    //If is time to add enemies
    if (this.enemyTimer > this.enemyInterval) {
      // Add vulure or cats
      if (Math.random() < 0.5) {
        for (let i = 0; i < 1; i++) {
          this.enemies.push(new Vulture(this, "Enemies/vulture/Idle.png"));
        }
      } else {
        for (let i = 0; i < 2; i++) {
          this.enemies.push(new Cat(this, "Enemies/cat/Walk.png"));
        }
      }
      //Add piegons
      if (Math.random() > 0.2) {
        for (let i = 0; i < 5; i++) {
          if (Math.random() < 0.5) {
            this.enemies.push(new Pigeon(this, "Enemies/birds/Eat.png"));
          } else {
            this.enemies.push(new Pigeon(this, "Enemies/birds/Idle.png"));
          }
        }
      }

      this.enemyTimer = 0;
    } else {
      this.enemyTimer += this.deltatime;
    }
  }

  //Adds an array of backgrounds images
  addBackgroundLayers(images) {
    this.backgroundLayers = [...images];
  }

  drawTime() {
    this.context.fillStyle = "black";

    this.context.font = " 25px helvetica";
    this.context.fillText(
      "Time " + (this.gameTimer / 100).toFixed(0),
      (this.width - 3) * 0.6,
      100 - 3
    );
    this.context.fillStyle = "white";

    this.context.font = "25px helvetica";
    this.context.fillText(
      "Time " + (this.gameTimer / 100).toFixed(0),
      this.width * 0.6,
      100
    );
  }

  drawScore() {
    this.context.fillStyle = "black";

    this.context.font = " 25px helvetica";
    this.context.fillText(
      "Score " + this.score,
      (this.width - 3) * 0.4,
      100 - 3
    );
    this.context.fillStyle = "white";

    this.context.font = "25px helvetica";
    this.context.fillText("Score " + this.score, this.width * 0.4, 100);
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    [...this.backgroundLayers, ...this.enemies].forEach(function (obj) {
      obj.draw();
    });
    this.player.draw();
    this.drawTime();
    this.drawScore();
  }

  runLogic() {
    [...this.backgroundLayers, ...this.enemies].forEach(function (obj) {
      obj.runLogic();
    });

    this.enemyHandler();
    let score = this.enemies.length;
    this.enemies = this.enemies.filter((enemy) => !enemy.finished);
    score = score - this.enemies.length;
    this.score += score;

    this.enemies = this.enemies.filter((enemy) => !enemy.away);
    this.player.runLogic();
    this.gameOver();
    this.sound.play();
    this.doubleTimeHandler();
  }

  displayOver() {
    this.gameScreenElement.style.display = "none";
    this.gameOverScreenElement.style.display = "";
  }

  gameOver() {
    if (this.player.lives <= 0 || this.gameTimer <= 0) {
      window.cancelAnimationFrame(this.id);
      this.loose = true;
      this.displayOver();
      this.restart();
      this.player.sadSound.src = "background/AmbientNatureBirdsWater01.wav";
      return true;
    }
  }

  loop() {
    this.draw();
    this.runLogic();
    if (this.loose === false) {
      this.id = window.requestAnimationFrame((timeStamp) => {
        const dt = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        this.deltatime = dt;
        this.gameTimer--;
        this.loop();
      });
    }
  }

  start() {
    this.loop();
  }
}
