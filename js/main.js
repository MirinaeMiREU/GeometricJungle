/** 
 * The Main.js file. Serves as the main executable code for our game and
 * utilizes all assets, game engine, and asset manager.
 * 
 * Author(s): Varik Hoang, Peter Bae, Cuong Tran, Logan Stafford
 * TCSS491 - Winter 2018
 */

/** Declaring and initializing asset manager. */
var AM = new AssetManager();

/** Queueing download of all sound assets. */
AM.addMusic("./sound/combat.mp3");
AM.addMusic("./sound/pop.mp3");

/** Queueing download of all art assets. */
AM.addMusic("./sound/combat.mp3");
AM.addMusic("./sound/pop.mp3");

AM.queueDownload("./img/background/back.png");
AM.queueDownload("./img/background/highlight.png");

AM.queueDownload("./img/elf/1/IDLE.png");
AM.queueDownload("./img/elf/1/WALK.png");
AM.queueDownload("./img/elf/1/ATTACK.png");
AM.queueDownload("./img/elf/1/DIE.png");

AM.queueDownload("./img/fairy/1/WALK.png");
AM.queueDownload("./img/fairy/1/ATTACK.png");
AM.queueDownload("./img/fairy/1/IDLE.png");
AM.queueDownload("./img/fairy/1/DIE.png");

AM.queueDownload("./img/knight/2_KNIGHT/WALK.png");
AM.queueDownload("./img/knight/2_KNIGHT/ATTACK.png");
AM.queueDownload("./img/knight/2_KNIGHT/IDLE.png");
AM.queueDownload("./img/knight/2_KNIGHT/DIE.png");

AM.downloadAll(function () {
	
	/** Setting up page canvas and context. */
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
	ctx.fillStyle = "white";

	/** Setting up game engine. */
    var gameEngine = new GameEngine(AM);
    gameEngine.init(ctx);
    gameEngine.start();
    
    /** Adding entities into the game.*/
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background/back.png"), 960, 540));
    var elfArr = [];
	elfArr.push(AM.getAsset("./img/elf/1/IDLE.png"));
	elfArr.push(AM.getAsset("./img/elf/1/WALK.png"));
	elfArr.push(AM.getAsset("./img/elf/1/ATTACK.png"));
	elfArr.push(AM.getAsset("./img/elf/1/DIE.png"));
    gameEngine.addEntity(new Elf(gameEngine, elfArr, 1));  
    gameEngine.addEntity(new Fairy(gameEngine, AM.getAsset("./img/fairy/1/WALK.png")));
    
    /** Play the background music, continuously looping. */
    var theme = AM.getMusic("./sound/combat.mp3");
    theme.loop = true;
    //theme.play();
	
	/** Log to console once completed. */
    console.log("All Done!");    
});