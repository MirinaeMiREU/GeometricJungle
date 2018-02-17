/** 
 * The Main.js file. Serves as the main executable code for our game and
 * utilizes all assets, game engine, and asset manager.
 * 
 * Author(s): Varik Hoang, Peter Bae, Cuong Tran, Logan Stafford
 * TCSS491 - Winter 2018
 */

// Global variables
var IDLE = 0;
var WALK = 1;
var ATTACK = 2;
var DEAD = 3;
 
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

AM.queueDownload("./img/elf/2/IDLE.png");
AM.queueDownload("./img/elf/2/WALK.png");
AM.queueDownload("./img/elf/2/ATTACK.png");
AM.queueDownload("./img/elf/2/DIE.png");

AM.queueDownload("./img/fairy/1/WALK.png");
AM.queueDownload("./img/fairy/1/ATTACK.png");
AM.queueDownload("./img/fairy/1/IDLE.png");
AM.queueDownload("./img/fairy/1/DIE.png");

AM.queueDownload("./img/fairy/2/WALK.png");
AM.queueDownload("./img/fairy/2/ATTACK.png");
AM.queueDownload("./img/fairy/2/IDLE.png");
AM.queueDownload("./img/fairy/2/DIE.png");

AM.queueDownload("./img/knight/1/WALK.png");
AM.queueDownload("./img/knight/1/ATTACK.png");
AM.queueDownload("./img/knight/1/IDLE.png");
AM.queueDownload("./img/knight/1/DIE.png");

AM.queueDownload("./img/knight/2/WALK.png");
AM.queueDownload("./img/knight/2/ATTACK.png");
AM.queueDownload("./img/knight/2/IDLE.png");
AM.queueDownload("./img/knight/2/DIE.png");

AM.queueDownload("./img/projectile/elf1.png");
AM.queueDownload("./img/projectile/elf2.png");
AM.queueDownload("./img/projectile/fairy1.png");
AM.queueDownload("./img/projectile/fairy2.png");
AM.queueDownload("./img/projectile/wizard1.png");
AM.queueDownload("./img/projectile/wizard2.png");

AM.downloadAll(function () {
	var animArr = [];
	
	animArr[ELF_LEFT_IDLE] = AM.getAsset("./img/elf/1/IDLE.png");
	animArr[ELF_LEFT_WALK] = AM.getAsset("./img/elf/1/WALK.png");
	animArr[ELF_LEFT_ATTACK] = AM.getAsset("./img/elf/1/ATTACK.png");
	animArr[ELF_LEFT_DIE] = AM.getAsset("./img/elf/1/DIE.png");
	
	animArr[ELF_RIGHT_IDLE] = AM.getAsset("./img/elf/2/IDLE.png");
	animArr[ELF_RIGHT_WALK] = AM.getAsset("./img/elf/2/WALK.png");
	animArr[ELF_RIGHT_ATTACK] = AM.getAsset("./img/elf/2/ATTACK.png");
	animArr[ELF_RIGHT_DIE] = AM.getAsset("./img/elf/2/DIE.png");
	
	animArr[KNIGHT_LEFT_IDLE] = AM.getAsset("./img/knight/1/IDLE.png");
	animArr[KNIGHT_LEFT_WALK] = AM.getAsset("./img/knight/1/WALK.png");
	animArr[KNIGHT_LEFT_ATTACK] = AM.getAsset("./img/knight/1/ATTACK.png");
	animArr[KNIGHT_LEFT_DIE] = AM.getAsset("./img/knight/1/DIE.png");
	
	animArr[KNIGHT_RIGHT_IDLE] = AM.getAsset("./img/knight/2/IDLE.png");
	animArr[KNIGHT_RIGHT_WALK] = AM.getAsset("./img/knight/2/WALK.png");
	animArr[KNIGHT_RIGHT_ATTACK] = AM.getAsset("./img/knight/2/ATTACK.png");
	animArr[KNIGHT_RIGHT_DIE] = AM.getAsset("./img/knight/2/DIE.png");
	
	animArr[FAIRY_LEFT_IDLE] = AM.getAsset("./img/fairy/1/IDLE.png");
	animArr[FAIRY_LEFT_WALK] = AM.getAsset("./img/fairy/1/WALK.png");
	animArr[FAIRY_LEFT_ATTACK] = AM.getAsset("./img/fairy/1/ATTACK.png");
	animArr[FAIRY_LEFT_DIE] = AM.getAsset("./img/fairy/1/DIE.png");
	
	animArr[FAIRY_RIGHT_IDLE] = AM.getAsset("./img/fairy/2/IDLE.png");
	animArr[FAIRY_RIGHT_WALK] = AM.getAsset("./img/fairy/2/WALK.png");
	animArr[FAIRY_RIGHT_ATTACK] = AM.getAsset("./img/fairy/2/ATTACK.png");
	animArr[FAIRY_RIGHT_DIE] = AM.getAsset("./img/fairy/2/DIE.png");
	
	animArr[FAIRY_LEFT_MAGIC_STAR] = AM.getAsset("./img/projectile/fairy1.png");
	animArr[FAIRY_RIGHT_MAGIC_STAR] = AM.getAsset("./img/projectile/fairy2.png");
	
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
    gameEngine.addEntity(new Knight(gameEngine, animArr, 2, 0));
    gameEngine.addEntity(new Knight(gameEngine, animArr, 2, 1));
    gameEngine.addEntity(new Knight(gameEngine, animArr, 1, 1));
    gameEngine.addEntity(new Fairy(gameEngine, animArr, 4, 0));
    gameEngine.addEntity(new Fairy(gameEngine, animArr, 4, 1));
    gameEngine.addEntity(new Fairy(gameEngine, animArr, 3, 1));
    gameEngine.addEntity(new Fairy(gameEngine, animArr, 5, 0));
    gameEngine.addEntity(new Fairy(gameEngine, animArr, 5, 1));
    
    /** Testing the animation */
//    gameEngine.addEntity(new Elf(gameEngine, animArr, 1, 0));
//    gameEngine.addEntity(new Elf(gameEngine, animArr, 2, 0));
//    gameEngine.addEntity(new Elf(gameEngine, animArr, 3, 0));
//    gameEngine.addEntity(new Elf(gameEngine, animArr, 4, 0));
//    gameEngine.addEntity(new Elf(gameEngine, animArr, 5, 0));
//    gameEngine.addEntity(new Elf(gameEngine, animArr, 1, 1));
//    gameEngine.addEntity(new Elf(gameEngine, animArr, 2, 1));
//    gameEngine.addEntity(new Elf(gameEngine, animArr, 3, 1));
//    gameEngine.addEntity(new Elf(gameEngine, animArr, 4, 1));
//    gameEngine.addEntity(new Elf(gameEngine, animArr, 5, 1));
    
//    gameEngine.addEntity(new Knight(gameEngine, animArr, 1, 0));
//    gameEngine.addEntity(new Knight(gameEngine, animArr, 2, 0));
//    gameEngine.addEntity(new Knight(gameEngine, animArr, 3, 0));
//    gameEngine.addEntity(new Knight(gameEngine, animArr, 4, 0));
//    gameEngine.addEntity(new Knight(gameEngine, animArr, 5, 0));
//    gameEngine.addEntity(new Knight(gameEngine, animArr, 1, 1));
//    gameEngine.addEntity(new Knight(gameEngine, animArr, 2, 1));
//    gameEngine.addEntity(new Knight(gameEngine, animArr, 3, 1));
//    gameEngine.addEntity(new Knight(gameEngine, animArr, 4, 1));
//    gameEngine.addEntity(new Knight(gameEngine, animArr, 5, 1));
    
//    gameEngine.addEntity(new Fairy(gameEngine, animArr, 1, 0));
//    gameEngine.addEntity(new Fairy(gameEngine, animArr, 2, 0));
//    gameEngine.addEntity(new Fairy(gameEngine, animArr, 3, 0));
//    gameEngine.addEntity(new Fairy(gameEngine, animArr, 4, 0));
//    gameEngine.addEntity(new Fairy(gameEngine, animArr, 5, 0));
//    gameEngine.addEntity(new Fairy(gameEngine, animArr, 1, 1));
//    gameEngine.addEntity(new Fairy(gameEngine, animArr, 2, 1));
//    gameEngine.addEntity(new Fairy(gameEngine, animArr, 3, 1));
//    gameEngine.addEntity(new Fairy(gameEngine, animArr, 4, 1));
//    gameEngine.addEntity(new Fairy(gameEngine, animArr, 5, 1));
    
    /** Play the background music, continuously looping. */
    var theme = AM.getMusic("./sound/combat.mp3");
    theme.loop = true;
    theme.play();
	
	/** Log to console once completed. */
    console.log("All Done!");    
});