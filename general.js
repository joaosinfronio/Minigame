class GeneralEnemy {
  constructor(game, source) {
    this.game = game;
    this.image = new Image();
    this.image.src = source;
    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
    this.frameX = 0;

    //     this.width = 60;
    //     this.height = 60;
    //     this.x = this.game.width + Math.random() * 100;
    //     this.y = this.game.height - this.height;
    //     this.spriteWidth = 128;
    //     this.spriteHeight = 32;

    //     this.ySpeed = Math.random() * 5 + 3;
    //     this.xSpeed = 1;

    //     this.maxHeight =
    //       this.game.height - this.height - (Math.random() * this.game.height) / 2;

    //     this.maxFrame = 3;
    //     this.totalFrames = 4;

    //     this.flyState = false;

    //     this.finished = false;
    //     this.away = false;
  }

  draw() {
    this.game.context.drawImage(
      this.image,
      (Math.floor(this.frameX) * this.spriteWidth) / this.totalFrames,
      0,
      this.spriteWidth / this.totalFrames,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  frameLogic() {
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX > this.maxFrame) {
        this.frameX = 0;
      } else {
        this.frameX += Math.random() * 1 + 0.2;
      }
      this.frameTimer = 0;
    } else {
      this.frameTimer += this.game.deltatime;
    }
  }
}
