class Pigeon extends GeneralEnemy {
  constructor(game, source) {
    super(game, source);

    this.width = 60;
    this.height = 60;
    this.spriteWidth = 128;
    this.spriteHeight = 32;

    this.x = this.game.width + Math.random() * 100;
    this.y = this.game.height - this.height;

    this.ySpeed = Math.random() * 5 + 3;
    this.xSpeed = 1;

    this.maxHeight =
      this.game.height - this.height - (Math.random() * this.game.height) / 2;
    this.maxFrame = 3;
    this.totalFrames = 4;
    this.flyState = false;
    this.finished = false;
    this.away = false;
    this.lives = 1;
    this.imageFly = "Enemies/birds/Walk.png";
  }

  runLogic() {
    super.frameLogic();

    super.fly();
  }
}
