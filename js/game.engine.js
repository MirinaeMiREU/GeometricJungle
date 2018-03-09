/** 
 * This file constitues the game engine, animations, and the time interacted between them.
 * 
 * Author(s): Varik Hoang, Peter Bae, Cuong Tran, Logan Stafford
 * Based on code created by Seth Ladd and edited for use by Chris Marriott.
 * TCSS491 - Winter 2018
 */

window.requestAnimFrame = (
function () {
    return window.requestAnimationFrame         ||
            window.webkitRequestAnimationFrame  ||
            window.mozRequestAnimationFrame     ||
            window.oRequestAnimationFrame       ||
            window.msRequestAnimationFrame      ||
            function (callback, element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();


function GameEngine(manager, animArr, soundArr) {
	this.manager = manager;	
	this.ctx = null;
    this.entities = [];    
    this.surfaceWidth = null;
    this.surfaceHeight = null;
	this.energy = 100;
	this.ticked = false;
	this.animations = animArr;
	this.effects = soundArr;
    this.controller = new Controller(this, manager, animArr, soundArr);
    this.timer = new Timer();
    this.freq = AI_FREQ_INIT;
    this.backgrounds = [];
    this.currentBG;
    this.gametheme = soundArr[GAME_MUSIC];
    this.menutheme = soundArr[MENU_MUSIC];
    this.gameOver = true;
    this.musicPlaying = false;
    this.gamePaused = false;
    
    /**
     * The method initialize the context (canvas).
     */
    this.init = function(ctx) {
        this.ctx = ctx;
		this.controller.init(ctx);
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.currentBG = 0;     
        this.menutheme.loop = true;
    	this.menutheme.play();
    	this.musicPlaying = true;
        console.log('Game initialized.');
    }

    /**
     * The method starts the game
     */
    this.start = function() {
        console.log("Starting game...");
        var that = this;
    	this.currentBG = 4;
    	this.draw();
    	this.menutheme.play();
    	
        (function gameLoop() 
        {
        	if (!that.timer.status)
        		that.loop();
        	requestAnimFrame(gameLoop, that.ctx.canvas);
        })();       
    }
    
    this.newGame = function() {
    	console.log("Starting a new game.");
    	var that = this;
    	
    	this.gameOver = false;
    	this.currentBG = 0;
    	this.draw();
		this.menutheme.pause();
		this.gametheme.play();
		
		(function gameLoop() 
        {
        	if (!that.timer.status)
        		that.loop();
        	requestAnimFrame(gameLoop, that.ctx.canvas);
        })();      
    }

    /**
     * The method adds an animation
     * (entity) into the canvas (context).
     */
    this.addEntity = function(entity) {
//        console.log('Added entity.');
        this.entities.push(entity);
		this.entities.sort(function(a, b) {
			if (a.z === b.z) {
				return a.x - b.x;
			}
			return a.z - b.z;
		});
    }
    
    this.addBackground = function(entity) {
//        console.log('Added background.');
    	this.backgrounds.push(entity);
    }
	
    /**
     * The method removes an animation
     * (entity) from the canvas (context).
     */
	this.removeEntity = function(entity) {
		console.log('Removed entity.');
		var index = this.entities.indexOf(entity);
		this.entities.splice(index, 1);
	}

    /**
     * The method draws animations
     * from the list of entities.
     */
    this.draw = function() {
        this.ctx.clearRect(0, 0, this.surfaceWidth , this.surfaceHeight);
        this.ctx.save();
        
        if (!this.gameOver && !this.timer.isPause()) {
	//        console.log(this.backgrounds[this.currentBG]);
	        this.backgrounds[this.currentBG].draw(this.ctx);
	    	for (var i = 0; i < this.entities.length; i++) {
	    		this.entities[i].draw(this.ctx);
	    	}  	
        } else if (this.gameOver || this.timer.isPause()){
        		this.backgrounds[this.currentBG].draw(this.ctx);
        }
        
        this.updateEnergy();
        this.ctx.restore();		
    }
    
    this.showTutorial = function() {
    	if (this.currentBG == 4) {
    		console.log('Tutorial opened.');
    		this.currentBG = 6;
    		this.draw();
    	} else if (this.currentBG == 6) {
    		console.log('Tutorial closed.');
    		this.currentBG = 4;
    		this.draw();
    	}
    }
    
    this.pauseGame = function() {
    	var tempBG = this.currentBG;
    	    	
    	if (!this.timer.isPause()) {
    		console.log('Game paused.');
    		this.currentBG = 5;    		
    		this.timer.pause();    
    		this.draw();
    	} else if (this.timer.isPause()) {
    		this.timer.resume();
    		console.log('Game resumed.');    		   		
    		this.currentBG = 0;    		    
    	}
    }
    
    this.endGame = function() {
	    	for (var i = 0; i < this.entities.length; i++) {
	    		this.removeEntity(this.entities[i]);
	    	}
	    	this.currentBG = 3;
	    	this.gameOver = true;
	    	this.gametheme.pause();	  
	    	console.log('Game ended.');
    }

    /**
     * The method updates the current
     * state and position of animations.
     */
    this.update = function() {
        for (var i = 0; i < this.entities.length; i++)
            this.entities[i].update();
		if (this.timer.gameTime % 0.25 >= 0 &&
			this.timer.gameTime % 0.25 <= 0.1) {
			this.ticked = true;
//			console.log(this.energy);
		}
		if (this.timer.gameTime % 0.25 > 0.1 &&
			this.ticked) {
			if (this.energy < 100) {
				this.energy += 1;
			}
			this.ticked = false;
		}		
    }

	this.updateEnergy = function() {
		if (!this.gameOver && (this.currentBG != 5)) {
			var max = 100;
			var current = getPercentBar(this.energy, max, 300);		
			this.ctx.fillStyle = "black";
			this.ctx.fillRect(420, 170, 300, 30);		
			this.ctx.fillStyle = "white";
			this.ctx.fillRect(420, 170, current, 30);	
		}
	}
	
	this.toggleMusic = function() {
	    if (this.musicPlaying == false) {
	    	if (this.currentBG === 3 | this.currentBG == 4) {
	    		this.menutheme.play();
	    		this.musicPlaying = true;
	    	} else {
	    		this.gametheme.play();
	    		this.musicPlaying = true;
	    	}
	    } else if (this.musicPlaying == true) {
	    	if (this.currentBG === 3 | this.currentBG == 4) {
	    		this.menutheme.pause();
	    		this.musicPlaying = false;
	    	} else {
	    		this.gametheme.pause();
	    		this.musicPlaying = false;
	    	}	    	
	    }
	}
	
    /**
     * The method loops based on the
     * timer to update information
     * and re-draw animations on the canvas.
     */
    this.loop = function() {
        this.clockTick = this.timer.tick();
        if (!this.gameOver && !this.gamePaused) {
        	if (Math.round(this.timer.gameTime / this.freq) > this.timer.gameCount) {
        		this.timer.gameCount++;
            	spawnUnit(this, this.animations, this.effects, Math.floor(Math.random() * 5) + 1, 
                			Math.floor(Math.random() * 3), 1); 
            	
            }
        }
        	
        if (!this.timer.isPause())
        	this.update(); // update if the game is not pause
        this.draw(); 
    }
    
}