window.addEventListener("load", () => {
  const startScreenElement = document.querySelector("#start");
  const gameScreenElement = document.querySelector("#game");
  const gameOverScreenElement = document.querySelector("#gameOver");

  const startButton = startScreenElement.querySelector("img");

  const playAgainButton = gameOverScreenElement.querySelector("img");

  //Create a Game
  const game = new Game(gameScreenElement, gameOverScreenElement);
  const images = [
    "Enemies/vulture/Idle.png",
    "Enemies/vulture/Vulture_walk.png",
    "Enemies/birds/Eat.png",
    "Enemies/birds/Walk.png",
    "player/Attack.png",
    "player/Jump.png",
    "player/reverseWalk.png",
    "player/Hurt.png",
    "player/Idle.png",
    "player/reverseJump.png",
  ];

  const backgroundLayer1 = new Image();
  backgroundLayer1.src = "background/layer-0.png";
  const backgroundLayer2 = new Image();
  backgroundLayer2.src = "background/layer-2.png";
  const backgroundLayer3 = new Image();
  backgroundLayer3.src = "background/layer-3.png";
  const backgroundLayer4 = new Image();
  backgroundLayer4.src = "background/layer-4.png";
  const backgroundLayer5 = new Image();
  backgroundLayer5.src = "background/layer-5.png";
  const backgroundLayer6 = new Image();
  backgroundLayer6.src = "background/layer-6.png";
  const backgroundLayer7 = new Image();
  backgroundLayer7.src = "background/layer-7.png";
  const backgroundLayer8 = new Image();
  backgroundLayer8.src = "background/layer-8.png";
  const backgroundLayer9 = new Image();
  backgroundLayer9.src = "background/layer-9.png";
  const layer1 = new Background(backgroundLayer1, 0.1, game);
  const layer2 = new Background(backgroundLayer2, 0.2, game);
  const layer3 = new Background(backgroundLayer3, 0.3, game);
  const layer4 = new Background(backgroundLayer4, 0.4, game);
  const layer5 = new Background(backgroundLayer5, 0.5, game);
  const layer6 = new Background(backgroundLayer6, 0.6, game);
  const layer7 = new Background(backgroundLayer7, 0.7, game);
  const layer8 = new Background(backgroundLayer8, 0.8, game);
  const layer9 = new Background(backgroundLayer9, 0.9, game);

  const gameLayers = [
    layer1,
    layer2,
    layer3,
    layer4,
    layer5,
    layer6,
    layer7,
    layer8,
    layer9,
  ];

  game.addBackgroundLayers(gameLayers);

  //Start the game

  startButton.addEventListener("click", () => {
    game.start();
    startScreenElement.style.display = "none";
    gameScreenElement.style.display = "";
  });

  playAgainButton.addEventListener("click", () => {
    game.restart();
    gameOverScreenElement.style.display = "none";
    gameScreenElement.style.display = "";
  });
});
