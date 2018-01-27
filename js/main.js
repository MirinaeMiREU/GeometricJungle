var AM = new AssetManager();

AM.addMusic("./sound/combat.mp3");
AM.addMusic("./sound/pop.mp3");

AM.queueDownload("./img/background.png");
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
	ctx.fillStyle = "white";

    var gameEngine = new GameEngine(AM);
    gameEngine.init(ctx);
    gameEngine.start();
    
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background.png"), 705, 473));
	var elfArr = [];
	elfArr.push(AM.getAsset("./img/elf/1/1_IDLE.png"));
    gameEngine.addEntity(new Elf(gameEngine, elfArr));
    
    var theme = AM.getMusic("./sound/combat.mp3");
    theme.loop = true;
    theme.play();
    
    
    
//    gameEngine.addEntity(new Fairy(gameEngine, AM.getAsset("./img/fairy/1/6_ATTACK.png")));
//    gameEngine.addEntity(new Fairy(gameEngine, AM.getAsset("./img/fairy/1/7_HURT.png")));
//    gameEngine.addEntity(new Fairy(gameEngine, AM.getAsset("./img/fairy/1/1_IDLE.png")));
//    gameEngine.addEntity(new Fairy(gameEngine, AM.getAsset("./img/fairy/1/8_DIE.png")));

	gameEngine.addEntity(new Fairy(gameEngine, AM.getAsset("./img/fairy/1/2_WALK.png")));
    console.log("All Done!");
    
    
});