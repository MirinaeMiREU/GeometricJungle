var AM = new AssetManager();

AM.queueDownload("./img/elf/1/1_IDLE.png");
//AM.queueDownload("./img/Elf1.png");
//AM.queueDownload("./img/background.jpg");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
    
//    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background.jpg"), 1024, 512));
    gameEngine.addEntity(new Elf(
    		gameEngine, 
    		AM.getAsset("./img/elf/1/1_IDLE.png"))
    );

    console.log("All Done!");
});