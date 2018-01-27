function Fairy(game, spritesheet) 
{
	// the sprite coordinate must be modified
	this.animation = new Animation(spritesheet, 150, 128, 4, 0.25, 4 , true, 1);
	this.x = 0;
	this.y = 500;
	this.speed = 25;
	this.ctx = game.ctx;
	Entity.call(this, game, 0, 210);
}

Fairy.prototype = new Entity();
Fairy.prototype.constructor = Fairy;

Fairy.prototype.update = function() 
{
	// collision
	for (var i = 0; i < this.game.entities.length; i++)
	{
		var entity = this.game.entities[i];
		if (entity !== this && this.collide(entity))
			console.log('colliding...');
	}
	
	this.x += this.game.clockTick * this.speed;
	Entity.prototype.update.call(this);
}

Fairy.prototype.draw = function() 
{
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

Fairy.prototype.collide = function(other) 
{
	return distance(this, other) < 10;
}
