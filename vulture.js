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
    // if (this.lives <= 0) {
    //   this.finished = true;
    // }

    // if (this.flyState) {
    //   this.image.src = "Enemies/vulture/Vulture_walk.png";

    //   if (Math.random() > 0.91) {
    //     this.y = this.y + Math.random() * this.ySpeed + this.ySpeed / 3;
    //   } else {
    //     this.y = this.y - Math.random() * this.ySpeed + this.ySpeed / 3;
    //   }

    //   this.xSpeed = Math.random() * 2 + 1.5;

    //   this.x -= this.xSpeed * this.game.speedModifier;
    // } else {
    //   this.x -= this.xSpeed * this.game.stop;
    // }

    // if (this.x < 0 - this.width) {
    //   this.away = true;
    // }
  }
}
