class Vulture extends GeneralEnemy {
  constructor(game, source) {
    super(game, source);
    this.width = 90;
    this.height = 90;

    this.spriteWidth = 192;
    this.spriteHeight = 48;

    this.x = this.game.width + Math.random() * 200;
    this.y = this.game.height - this.height;

    this.ySpeed = Math.random() * 4 + 2;
    this.xSpeed = Math.random() * 0.9;

    this.maxHeight =
      this.game.height - this.height - (Math.random() * this.game.height) / 3;

    this.maxFrame = 3;
    this.totalFrames = 4;
    this.flyState = false;

    this.finished = false;
    this.away = false;
    this.lives = 13;
    this.imageFly = "Enemies/vulture/Vulture_walk.png";
  }

  runLogic() {
    super.frameLogic();

    super.fly();
  }
}
