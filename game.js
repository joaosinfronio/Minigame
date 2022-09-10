class Game {
  constructor() {
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
  }

  controlsInput() {
    // Listen for keys pressed
    window.addEventListener("keydown", (e) => {
      if (
        (e.code === "ArrowDown" ||
          e.code === "ArrowUp" ||
          e.code === "ArrowLeft" ||
          e.code === "ArrowRight") &&
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
        e.code === "ArrowRight"
      ) {
        this.keys.splice(this.keys.indexOf(e.code), 1);
      }
    });
  }

  enemyHandler() {
    if (this.enemyTimer > this.enemyInterval) {
      for (let i = 0; i < 10; i++) {
        if (Math.random() < 0.5) {
          this.enemies.push(new Enemy(this, "Enemies/birds/Eat.png"));
        } else {
          this.enemies.push(new Enemy(this, "Enemies/birds/Idle.png"));
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

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    [...this.backgroundLayers, ...this.enemies].forEach(function (obj) {
      obj.draw();
    });
    this.player.draw();
  }

  runLogic() {
    [...this.backgroundLayers, ...this.enemies].forEach(function (obj) {
      obj.runLogic();
    });
    this.enemyHandler();
    this.enemies = this.enemies.filter((enemy) => !enemy.finished);
    this.player.runLogic();
  }

  loop() {
    this.draw();
    this.runLogic();
    requestAnimationFrame((timeStamp) => {
      const dt = timeStamp - this.lastTime;
      this.lastTime = timeStamp;
      this.deltatime = dt;
      this.loop();
    });
  }

  start() {
    this.loop();
  }
}
