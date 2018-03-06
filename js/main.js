/** 
 * This file initializes our game's asset manager and queues all art and sound assets into the game.
 * Afterwards, entities may be added into the game manually.
 * 
 * Author(s): Varik Hoang, Peter Bae, Cuong Tran, Logan Stafford
 * Based on code created by Seth Ladd and edited for use by Chris Marriott.
 * TCSS491 - Winter 2018
 */

/** Global variables. */
var IDLE = 0;
var WALK = 1;
var ATTACK = 2;
var DEAD = 3;
 
/** Declaring and initializing asset manager. */
var AM = new AssetManager();

/** Queueing download of all sound assets. */
AM.addMusic("./sound/elf/elf-deploy.mp3");
AM.addMusic("./sound/elf/elf-attack.mp3");
AM.addMusic("./sound/elf/elf-dead.mp3");

AM.addMusic("./sound/knight/knight-deploy.mp3");
AM.addMusic("./sound/knight/knight-attack.mp3");
AM.addMusic("./sound/knight/knight-dead.mp3");

AM.addMusic("./sound/fairy/fairy-deploy.mp3");
AM.addMusic("./sound/fairy/fairy-attack.mp3");
AM.addMusic("./sound/fairy/fairy-dead.mp3");

AM.addMusic("./sound/orc/orc-deploy.mp3");
AM.addMusic("./sound/orc/orc-attack.mp3");
AM.addMusic("./sound/orc/orc-dead.mp3");

AM.addMusic("./sound/dragon/dragon-deploy.mp3");
AM.addMusic("./sound/dragon/dragon-attack.mp3");
AM.addMusic("./sound/dragon/dragon-dead.mp3");

AM.addMusic("./sound/menu/achievement.mp3");
AM.addMusic("./sound/menu/error.mp3");
AM.addMusic("./sound/menu/achievement.mp3");
AM.addMusic("./sound/menu/music.mp3");
AM.addMusic("./sound/menu/navsounds.mp3");
AM.addMusic("./sound/menu/success.mp3");
AM.addMusic("./sound/menu/you_lose_music.mp3");

/** Queueing download of all art assets. */
AM.queueDownload("./img/background/forestbg.png");
AM.queueDownload("./img/background/blizzardbg.png");
AM.queueDownload("./img/background/volcanobg.png");
AM.queueDownload("./img/background/highlight.png");
AM.queueDownload("./img/background/unit.png");

AM.queueDownload("./img/elf/player1/IDLE.png");
AM.queueDownload("./img/elf/player1/WALK.png");
AM.queueDownload("./img/elf/player1/ATTACK.png");
AM.queueDownload("./img/elf/player1/DIE.png");
AM.queueDownload("./img/projectile/elf1.png");

AM.queueDownload("./img/elf/player2/IDLE.png");
AM.queueDownload("./img/elf/player2/WALK.png");
AM.queueDownload("./img/elf/player2/ATTACK.png");
AM.queueDownload("./img/elf/player2/DIE.png");
AM.queueDownload("./img/projectile/elf2.png");

AM.queueDownload("./img/fairy/player1/WALK.png");
AM.queueDownload("./img/fairy/player1/ATTACK.png");
AM.queueDownload("./img/fairy/player1/IDLE.png");
AM.queueDownload("./img/fairy/player1/DIE.png");

AM.queueDownload("./img/fairy/player2/WALK.png");
AM.queueDownload("./img/fairy/player2/ATTACK.png");
AM.queueDownload("./img/fairy/player2/IDLE.png");
AM.queueDownload("./img/fairy/player2/DIE.png");

AM.queueDownload("./img/knight/player1/WALK.png");
AM.queueDownload("./img/knight/player1/ATTACK.png");
AM.queueDownload("./img/knight/player1/IDLE.png");
AM.queueDownload("./img/knight/player1/DIE.png");

AM.queueDownload("./img/knight/player2/WALK.png");
AM.queueDownload("./img/knight/player2/ATTACK.png");
AM.queueDownload("./img/knight/player2/IDLE.png");
AM.queueDownload("./img/knight/player2/DIE.png");

AM.queueDownload("./img/projectile/elf1.png");
AM.queueDownload("./img/projectile/elf2.png");
AM.queueDownload("./img/projectile/fairy1.png");
AM.queueDownload("./img/projectile/fairy2.png");
AM.queueDownload("./img/projectile/wizard1.png");
AM.queueDownload("./img/projectile/wizard2.png");

AM.downloadAll(function () {
	var animArr = [];
	var soundArr = [];
	
	soundArr[ELF_SOUND_DEPLOY] = AM.getMusic("./sound/elf/elf-deploy.mp3");
	soundArr[ELF_SOUND_ATTACK] = AM.getMusic("./sound/elf/elf-attack.mp3");
	soundArr[ELF_SOUND_DEAD] = AM.getMusic("./sound/elf/elf-dead.mp3");
	
	soundArr[KNIGHT_SOUND_DEPLOY] = AM.getMusic("./sound/knight/knight-deploy.mp3");
	soundArr[KNIGHT_SOUND_ATTACK] = AM.getMusic("./sound/knight/knight-attack.mp3");
	soundArr[KNIGHT_SOUND_DEAD] = AM.getMusic("./sound/knight/knight-dead.mp3");
	
	soundArr[FAIRY_SOUND_DEPLOY] = AM.getMusic("./sound/fairy/fairy-deploy.mp3");
	soundArr[FAIRY_SOUND_ATTACK] = AM.getMusic("./sound/fairy/fairy-attack.mp3");
	soundArr[FAIRY_SOUND_DEAD] = AM.getMusic("./sound/fairy/fairy-dead.mp3");
	
	soundArr[ORC_SOUND_DEPLOY] = AM.getMusic("./sound/orc/orc-deploy.mp3");
	soundArr[ORC_SOUND_ATTACK] = AM.getMusic("./sound/orc/orc-attack.mp3");
	soundArr[ORC_SOUND_DEAD] = AM.getMusic("./sound/orc/orc-dead.mp3");
	
	soundArr[DRAGON_SOUND_DEPLOY] = AM.getMusic("./sound/dragon/dragon-deploy.mp3");
	soundArr[DRAGON_SOUND_ATTACK] = AM.getMusic("./sound/dragon/dragon-attack.mp3");
	soundArr[DRAGON_SOUND_DEAD] = AM.getMusic("./sound/dragon/dragon-dead.mp3");
	
	soundArr[MENU_ERROR] = AM.getMusic("./sound/menu/error.mp3");
	soundArr[MENU_ACHIEVEMENT] = AM.getMusic("./sound/menu/achievement.mp3");
	soundArr[MENU_MUSIC] = AM.getMusic("./sound/menu/music.mp3");
	soundArr[MENU_NAVSOUNDS] = AM.getMusic("./sound/menu/navsounds.mp3");
	soundArr[MENU_SUCCESS] = AM.getMusic("./sound/menu/success.mp3");
	soundArr[MENU_YOU_LOSE_MUSIC] = AM.getMusic("./sound/menu/you_lose_music.mp3");
	
	animArr[ELF_LEFT_IDLE] = AM.getAsset("./img/elf/player1/IDLE.png");
	animArr[ELF_LEFT_WALK] = AM.getAsset("./img/elf/player1/WALK.png");
	animArr[ELF_LEFT_ATTACK] = AM.getAsset("./img/elf/player1/ATTACK.png");
	animArr[ELF_LEFT_DIE] = AM.getAsset("./img/elf/player1/DIE.png");
	animArr[ELF_LEFT_ARROW] = AM.getAsset("./img/projectile/elf1.png");
	
	animArr[ELF_RIGHT_IDLE] = AM.getAsset("./img/elf/player2/IDLE.png");
	animArr[ELF_RIGHT_WALK] = AM.getAsset("./img/elf/player2/WALK.png");
	animArr[ELF_RIGHT_ATTACK] = AM.getAsset("./img/elf/player2/ATTACK.png");
	animArr[ELF_RIGHT_DIE] = AM.getAsset("./img/elf/player2/DIE.png");
	animArr[ELF_RIGHT_ARROW] = AM.getAsset("./img/projectile/elf2.png");
	
	animArr[KNIGHT_LEFT_IDLE] = AM.getAsset("./img/knight/player1/IDLE.png");
	animArr[KNIGHT_LEFT_WALK] = AM.getAsset("./img/knight/player1/WALK.png");
	animArr[KNIGHT_LEFT_ATTACK] = AM.getAsset("./img/knight/player1/ATTACK.png");
	animArr[KNIGHT_LEFT_DIE] = AM.getAsset("./img/knight/player1/DIE.png");
	
	animArr[KNIGHT_RIGHT_IDLE] = AM.getAsset("./img/knight/player2/IDLE.png");
	animArr[KNIGHT_RIGHT_WALK] = AM.getAsset("./img/knight/player2/WALK.png");
	animArr[KNIGHT_RIGHT_ATTACK] = AM.getAsset("./img/knight/player2/ATTACK.png");
	animArr[KNIGHT_RIGHT_DIE] = AM.getAsset("./img/knight/player2/DIE.png");
	
	animArr[FAIRY_LEFT_IDLE] = AM.getAsset("./img/fairy/player1/IDLE.png");
	animArr[FAIRY_LEFT_WALK] = AM.getAsset("./img/fairy/player1/WALK.png");
	animArr[FAIRY_LEFT_ATTACK] = AM.getAsset("./img/fairy/player1/ATTACK.png");
	animArr[FAIRY_LEFT_DIE] = AM.getAsset("./img/fairy/player1/DIE.png");
	
	animArr[FAIRY_RIGHT_IDLE] = AM.getAsset("./img/fairy/player2/IDLE.png");
	animArr[FAIRY_RIGHT_WALK] = AM.getAsset("./img/fairy/player2/WALK.png");
	animArr[FAIRY_RIGHT_ATTACK] = AM.getAsset("./img/fairy/player2/ATTACK.png");
	animArr[FAIRY_RIGHT_DIE] = AM.getAsset("./img/fairy/player2/DIE.png");
	
	animArr[FAIRY_LEFT_MAGIC_STAR] = AM.getAsset("./img/projectile/fairy1.png");
	animArr[FAIRY_RIGHT_MAGIC_STAR] = AM.getAsset("./img/projectile/fairy2.png");
	
	/** Setting up page canvas and context. */
    var canvas = document.getElementById("gameWorld");
    //canvas.style.margin = "auto";
    //canvas.style.position = "absolute";
    //canvas.style.top = 0;
    //canvas.style.bottom = 0;
    //canvas.style.left = 0;
    //canvas.style.right = 0;
    var ctx = canvas.getContext("2d");
	ctx.fillStyle = "white";

	/** Setting up game engine. */
    var gameEngine = new GameEngine(AM, animArr, soundArr);
    gameEngine.init(ctx);
    gameEngine.start();
    
    /** Adding entities into the game.*/
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background/blizzardbg.png"), 1440, 810));
    gameEngine.addEntity(new Knight(gameEngine, animArr, soundArr, 2, 0));
    gameEngine.addEntity(new Knight(gameEngine, animArr, soundArr, 2, 1));
    gameEngine.addEntity(new Knight(gameEngine, animArr, soundArr, 1, 1));
    gameEngine.addEntity(new Fairy(gameEngine, animArr, soundArr, 4, 0));
    gameEngine.addEntity(new Fairy(gameEngine, animArr, soundArr, 4, 1));
    gameEngine.addEntity(new Elf(gameEngine, animArr, soundArr, 3, 1));
    gameEngine.addEntity(new Fairy(gameEngine, animArr, soundArr, 5, 0));
    gameEngine.addEntity(new Fairy(gameEngine, animArr, soundArr, 5, 1));
    
    /** Testing the animation */
//    gameEngine.addEntity(new Elf(gameEngine, animArr, soundArr, 1, 0));
//    gameEngine.addEntity(new Elf(gameEngine, animArr, soundArr, 2, 0));
//    gameEngine.addEntity(new Elf(gameEngine, animArr, soundArr, 3, 0));
//    gameEngine.addEntity(new Elf(gameEngine, animArr, soundArr, 4, 0));
//    gameEngine.addEntity(new Elf(gameEngine, animArr, soundArr, 5, 0));
//    gameEngine.addEntity(new Elf(gameEngine, animArr, soundArr, 1, 1));
//    gameEngine.addEntity(new Elf(gameEngine, animArr, soundArr, 2, 1));
//    gameEngine.addEntity(new Elf(gameEngine, animArr, soundArr, 3, 1));
//    gameEngine.addEntity(new Elf(gameEngine, animArr, soundArr, 4, 1));
//    gameEngine.addEntity(new Elf(gameEngine, animArr, soundArr, 5, 1));
    
//    gameEngine.addEntity(new Knight(gameEngine, animArr, soundArr, 1, 0));
//    gameEngine.addEntity(new Knight(gameEngine, animArr, soundArr, 2, 0));
//    gameEngine.addEntity(new Knight(gameEngine, animArr, soundArr, 3, 0));
//    gameEngine.addEntity(new Knight(gameEngine, animArr, soundArr, 4, 0));
//    gameEngine.addEntity(new Knight(gameEngine, animArr, soundArr, 5, 0));
//    gameEngine.addEntity(new Knight(gameEngine, animArr, soundArr, 1, 1));
//    gameEngine.addEntity(new Knight(gameEngine, animArr, soundArr, 2, 1));
//    gameEngine.addEntity(new Knight(gameEngine, animArr, soundArr, 3, 1));
//    gameEngine.addEntity(new Knight(gameEngine, animArr, soundArr, 4, 1));
//    gameEngine.addEntity(new Knight(gameEngine, animArr, soundArr, 5, 1));
    
//    gameEngine.addEntity(new Fairy(gameEngine, animArr, soundArr, 1, 0));
//    gameEngine.addEntity(new Fairy(gameEngine, animArr, soundArr, 2, 0));
//    gameEngine.addEntity(new Fairy(gameEngine, animArr, soundArr, 3, 0));
//    gameEngine.addEntity(new Fairy(gameEngine, animArr, soundArr, 4, 0));
//    gameEngine.addEntity(new Fairy(gameEngine, animArr, soundArr, 5, 0));
//    gameEngine.addEntity(new Fairy(gameEngine, animArr, soundArr, 1, 1));
//    gameEngine.addEntity(new Fairy(gameEngine, animArr, soundArr, 2, 1));
//    gameEngine.addEntity(new Fairy(gameEngine, animArr, soundArr, 3, 1));
//    gameEngine.addEntity(new Fairy(gameEngine, animArr, soundArr, 4, 1));
//    gameEngine.addEntity(new Fairy(gameEngine, animArr, soundArr, 5, 1));
    
    /** Play the background music, continuously looping. */
    var theme = AM.getMusic("./sound/menu/music.mp3");
    theme.loop = true;
    theme.play();
	
	/** Log to console once completed. */
    console.log("All Done!");    
});