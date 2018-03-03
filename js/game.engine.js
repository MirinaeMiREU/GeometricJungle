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
    this.controller = new Controller(this, manager, animArr, soundArr);
    
    /**
     * The method initialize the context (canvas).
     */
    this.init = function(ctx) {
        this.ctx = ctx;
		this.controller.init(ctx);
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.timer = new Timer();
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
            that.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        })();
    }

    /**
     * The method adds an animation
     * (entity) into the canvas (context).
     */
    this.addEntity = function(entity) {
        console.log('Added entity.');
        this.entities.push(entity);
		this.entities.sort(function(a, b) {
			if (a.z === b.z) {
				return a.x - b.x;
			}
			return a.z - b.z;
		});
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

        for (var i = 0; i < this.entities.length; i++) 
            this.entities[i].draw(this.ctx);

        this.ctx.restore();
    }

    /**
     * The method updates the current
     * state and position of animations.
     */
    this.update = function() {
        for (var i = 0; i < this.entities.length; i++)
            this.entities[i].update();
    }

    /**
     * The method loops based on the
     * timer to update information
     * and re-draw animations on the canvas.
     */
    this.loop = function() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    }
}