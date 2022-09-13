class Enemy extends GeneralEnemy {
  constructor(game, source) {
    super(game, source);

    // this.game = game;
    this.width = 60;
    this.height = 60;
    // this.image = new Image();
    // this.image.src = source;
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
    // this.fps = 20;
    // this.frameTimer = 0;
    // this.frameInterval = 1000 / this.fps;
    // this.frameX = 0;

    this.flyState = false;

    this.finished = false;
    this.away = false;
  }

  // draw() {
  // this.game.context.beginPath();
  // this.game.context.arc(
  //   this.x + this.width / 2,
  //   this.y + this.height / 1.5,
  //   this.width * 0.3,
  //   0,
  //   Math.PI * 2
  // );
  // this.game.context.stroke();
  // this.game.context.drawImage(
  //   this.image,
  //   (Math.floor(this.frameX) * this.spriteWidth) / 4,
  //   0,
  //   this.spriteWidth / 4,
  //   this.spriteHeight,
  //   this.x,
  //   this.y,
  //   this.width,
  //   this.height
  // );
  // }

  runLogic() {
    //Logic for frame Sprite
    // if (this.frameTimer > this.frameInterval) {
    //   if (this.frameX > this.maxFrame) {
    //     this.frameX = 0;
    //   } else {
    //     this.frameX += Math.random() * 1 + 0.2;
    //   }
    //   this.frameTimer = 0;
    // } else {
    //   this.frameTimer += this.game.deltatime;
    // }
    super.frameLogic();

    if (this.flyState) {
      this.image.src = "Enemies/birds/Walk.png";
      if (this.y > this.maxHeight) {
        this.y = this.y - this.ySpeed;
        this.xSpeed = Math.random() * 2 + 1.5;
      }
      this.x -= this.xSpeed;
    } else {
      this.x -= this.xSpeed * this.game.stop;
    }

    if (this.x < 0 - this.width) {
      this.away = true;
    }
  }
}
