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
    
    /**
     * The method initialize the context (canvas).
     */
    this.init = function(ctx) {
        this.ctx = ctx;
		this.controller.init(ctx);
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.currentBG = 0;
        console.log('Game initialized.');
    }

    /**
     * The method starts the game
     */
    this.start = function() {
        console.log("Starting game...");
        var that = this;
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
        
//        console.log(this.backgrounds[this.currentBG]);
        this.backgrounds[this.currentBG].draw(this.ctx);
        for (var i = 0; i < this.entities.length; i++) 
            this.entities[i].draw(this.ctx);

		this.updateEnergy();
        this.ctx.restore();
		
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
		var max = 100;
		var current = getPercentBar(this.energy, max, 300);
		
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(420, 170, 300, 30);
		
		this.ctx.fillStyle = "white";
		this.ctx.fillRect(420, 170, current, 30);
		
		
	}
	
    /**
     * The method loops based on the
     * timer to update information
     * and re-draw animations on the canvas.
     */
    this.loop = function() {
        this.clockTick = this.timer.tick();
        if (Math.round(this.timer.gameTime / this.freq) > this.timer.gameCount)
        {
        	this.timer.gameCount++;
        	spawnUnit(this, this.animations, this.effects, 
        			Math.floor(Math.random() * 5) + 1, 
        			Math.floor(Math.random() * 3), 1);
        }
        
        if (!this.timer.isPause())
        	this.update(); // update if the game is not pause
        this.draw();
    }
}