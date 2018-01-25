var AM = new AssetManager();

AM.queueDownload("./img/elf/1/1_IDLE.png");

AM.queueDownload("./img/fairy/1/2_WALK.png");
AM.queueDownload("./img/fairy/1/6_ATTACK.png");
AM.queueDownload("./img/fairy/1/7_HURT.png");
AM.queueDownload("./img/fairy/1/1_IDLE.png");
AM.queueDownload("./img/fairy/1/8_DIE.png");

AM.queueDownload("./img/knight/2_KNIGHT/WALK.png");
AM.queueDownload("./img/knight/2_KNIGHT/ATTACK.png");
AM.queueDownload("./img/knight/2_KNIGHT/HURT.png");
AM.queueDownload("./img/knight/2_KNIGHT/IDLE.png");
AM.queueDownload("./img/knight/2_KNIGHT/DIE.png");


AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
    
//    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background.jpg"), 1024, 512));
    gameEngine.addEntity(new Elf(gameEngine, AM.getAsset("./img/elf/1/1_IDLE.png")));
    
    
    
    
    gameEngine.addEntity(new Fairy(gameEngine, AM.getAsset("./img/fairy/1/2_WALK.png")));
//    gameEngine.addEntity(new Fairy(gameEngine, AM.getAsset("./img/fairy/1/6_ATTACK.png")));
//    gameEngine.addEntity(new Fairy(gameEngine, AM.getAsset("./img/fairy/1/7_HURT.png")));
//    gameEngine.addEntity(new Fairy(gameEngine, AM.getAsset("./img/fairy/1/1_IDLE.png")));
//    gameEngine.addEntity(new Fairy(gameEngine, AM.getAsset("./img/fairy/1/8_DIE.png")));

    gameEngine.addEntity(new Knight(gameEngine, AM.getAsset("./img/knight/2_KNIGHT/WALK.png")));
    console.log("All Done!");
    
    
});