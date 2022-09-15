class Cat extends GeneralEnemy {
  constructor(game, source) {
    super(game, source);

    this.width = 60;
    this.height = 60;
    this.spriteWidth = 288;
    this.spriteHeight = 48;

    this.x = this.game.width + Math.random() * 400;
    this.y = this.game.height - this.height;

    this.xSpeed = 1;

    this.maxFrame = 5;
    this.totalFrames = 6;
    this.finished = false;
    this.away = false;
    this.lives = 12;
    this.direction = -1;
  }

  runLogic() {
    if (this.frameX < 0) {
      this.frameX = this.maxFrame;
    }
    super.frameLogic();
    if (this.lives <= 0) {
      this.finished = true;
    }

    this.image.src = "Enemies/cat/Walk.png";
    this.xSpeed = Math.random() * 2 + 1.5;
    this.x -= this.xSpeed * this.game.speedModifier;

    if (this.x < 0 - this.width) {
      this.away = true;
    }
  }
}
