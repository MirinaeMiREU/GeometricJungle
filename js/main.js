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

AM.queueDownload("./img/knight/1/WALK.png");
AM.queueDownload("./img/knight/1/ATTACK.png");
AM.queueDownload("./img/knight/1/IDLE.png");
AM.queueDownload("./img/knight/1/DIE.png");

AM.downloadAll(function () {
	var animArr = [];
	
	var elfArr = [];
	elfArr.push(AM.getAsset("./img/elf/1/IDLE.png"));
	elfArr.push(AM.getAsset("./img/elf/1/WALK.png"));
	elfArr.push(AM.getAsset("./img/elf/1/ATTACK.png"));
	elfArr.push(AM.getAsset("./img/elf/1/DIE.png"));
	
	var knightArr = [];
	knightArr.push(AM.getAsset("./img/knight/1/IDLE.png"));
	knightArr.push(AM.getAsset("./img/knight/1/WALK.png"));
	knightArr.push(AM.getAsset("./img/knight/1/ATTACK.png"));
	knightArr.push(AM.getAsset("./img/knight/1/DIE.png"));
	
	animArr.push(elfArr);
	animArr.push(knightArr);
	
	/** Setting up page canvas and context. */
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
	ctx.fillStyle = "white";

	/** Setting up game engine. */
    var gameEngine = new GameEngine(AM, animArr);
    gameEngine.init(ctx);
    gameEngine.start();
    
    /** Adding entities into the game.*/
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background/back.png"), 960, 540));
    gameEngine.addEntity(new Elf(gameEngine, animArr[0], 1, 0));  
    gameEngine.addEntity(new Fairy(gameEngine, AM.getAsset("./img/fairy/1/WALK.png")));
    
    /** Play the background music, continuously looping. */
    var theme = AM.getMusic("./sound/combat.mp3");
    theme.loop = true;
    //theme.play();
	
	/** Log to console once completed. */
    console.log("All Done!");    
});