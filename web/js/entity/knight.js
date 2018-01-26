function Knight(game, spritesheet, y) 
{
	// the sprite coordinate must be modified
	this.animation = new Animation(spritesheet, 136, 128, 4, 0.25, 4 , true, 1.2);
	this.speed = 25;
	this.ctx = game.ctx;
	switch (y) {
		case 1:
			Entity.call(this, game, 0, 0);
			break;
		case 2:
			Entity.call(this, game, 0, 110);
			break;
		case 3:
			Entity.call(this, game, 0, 210);
			break;
		case 4:
			Entity.call(this, game, 0, 310);
			break;
		case 5:
			Entity.call(this, game, 0, 410);
	}
}

Knight.prototype = new Entity();
Knight.prototype.constructor = Knight;

Knight.prototype.update = function() 
{
	// collision
	for (var i = 0; i < list.length; i++)
	{
		var entity = list[i];
		if (entity !== this && this.collide(entity))
			console.log('colliding...');
	}
	
	this.x += this.game.clockTick * this.speed;
	Entity.prototype.update.call(this);
}

Knight.prototype.draw = function() 
{
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

Knight.prototype.collide = function() 
{
	return distance(this, other) < 10;
}
