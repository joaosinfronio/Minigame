class Background {
  constructor(image, vSpeed, game) {
    this.game = game;
    this.x = 0;
    this.y = 0;

    this.width = this.game.width;
    this.height = this.game.height;

    this.image = image;

    this.vSpeed = vSpeed;
    this.speed = this.game.speed * this.vSpeed;
  }

  restart() {
    this.x = 0;
  }

  runLogic() {
    //For reverse direction linked with player direction
    this.speed =
      this.game.speed *
      this.vSpeed *
      this.game.stop *
      this.game.player.direction;

    //For reverse direction linked with player direction
    //If limt is reached re posiition the image
    if (this.x >= this.width) {
      this.x = -this.width;
    }
    if (this.x <= -this.width) {
      this.x = 0;
    }

    this.x = this.x - this.speed;
  }

  //three images ina continued loop
  draw() {
    this.game.context.drawImage(
      this.image,
      this.x - this.width,
      this.y,
      this.width,
      this.height
    );
    this.game.context.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.game.context.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}
