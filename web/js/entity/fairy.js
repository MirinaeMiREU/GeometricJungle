function Fairy(game, spritesheet) 
{
	// the sprite coordinate must be modified
	this.animation = new Animation(spritesheet, 150, 128, 4, 0.25, 4 , true, 1);
	this.x = 0;
	this.y = 500;
	this.speed = 100;
	this.ctx = game.ctx;
	Entity.call(this, game, 100, 500);
}

Fairy.prototype = new Entity();
Fairy.prototype.constructor = Fairy;

Fairy.prototype.update = function() 
{
	this.x += this.game.clockTick * this.speed;
	Entity.prototype.update.call(this);
}

Fairy.prototype.draw = function() 
{
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}
