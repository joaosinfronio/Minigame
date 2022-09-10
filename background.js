class Background {
  constructor(image, vSpeed, game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.width = 928;
    this.height = 793;
    this.image = image;
    this.vSpeed = vSpeed;
    this.speed = this.game.speed * this.vSpeed;
  }

  runLogic() {
    this.speed = this.game.speed * this.vSpeed;
    if (this.x <= -this.width) {
      this.x = 0;
    }
    this.x = this.x - this.speed;
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
