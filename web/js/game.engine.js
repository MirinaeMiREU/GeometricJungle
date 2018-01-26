window.requestAnimFrame = (
function ()
{
    return window.requestAnimationFrame         ||
            window.webkitRequestAnimationFrame  ||
            window.mozRequestAnimationFrame     ||
            window.oRequestAnimationFrame       ||
            window.msRequestAnimationFrame      ||
            function (callback, element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

/**
 * The class manages animations
 * and the time interacted between them
 */
function GameEngine(manager) 
{
	this.manager = manager;
	this.ctx = null;
    this.entities = [];
    
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.controller = new Controller(this, manager);
    
    /**
     * The method initialize the context (canvas)
     */
    this.init = function(ctx) 
    {
        this.ctx = ctx;
		this.controller.init(ctx);
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.timer = new Timer();
        console.log('game initialized');
    }

    /**
     * The method starts the game
     */
    this.start = function() 
    {
        console.log("starting game");
        var that = this;
        (function gameLoop() 
        {
            that.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        })();
    }

    /**
     * The method adds an animation
     * (entity) into the canvas (context)
     */
    this.addEntity = function(entity) 
    {
        console.log('added entity');
        this.entities.push(entity);
    }

    /**
     * The method draws animations
     * from the list of entities
     */
    this.draw = function() 
    {
        this.ctx.clearRect(0, 0, this.surfaceWidth , this.surfaceHeight);
        this.ctx.save();

        for (var i = 0; i < this.entities.length; i++) 
            this.entities[i].draw(this.ctx);

        this.ctx.restore();
    }

    /**
     * The method updates the current
     * state and position of animations
     */
    this.update = function() 
    {
        for (var i = 0; i < this.entities.length; i++)
            this.entities[i].update();
    }

    /**
     * The method loops based on the
     * timer to update information
     * and re-draw animations on the canvas
     */
    this.loop = function()
    {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    }
}





