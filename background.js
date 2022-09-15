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
    if (this.x >= 0 && this.game.player.direction === -1) {
      this.x = 0;
    }
    if (this.x <= -this.width) {
      this.x = 0;
    }
    if (this.game.player.x > this.game.width * 0.05) {
      this.x = this.x - this.speed;
    }
  }

  draw() {
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
