/** 
 * The Knight class. Represents the Knight character.
 * 
 * Author(s): Varik Hoang, Peter Bae, Cuong Tran, Logan Stafford
 * TCSS491 - Winter 2018
 */
function Knight(game, spritesheet, y) {
	/** Sprite coordinates must be modified if spritesheets are changed! */
	this.animation = new Animation(spritesheet, 136, 128, 4, 0.25, 4 , true, 1.2);
	this.speed = 25;
	this.ctx = game.ctx;
	switch (y) {
		case 1:
			Entity.call(this, game, 0, 50);
			break;
		case 2:
			Entity.call(this, game, 0, 130);
			break;
		case 3:
			Entity.call(this, game, 0, 210);
			break;
		case 4:
			Entity.call(this, game, 0, 290);
			break;
		case 5:
			Entity.call(this, game, 0, 370);
	}
	
	this.game.manager.getMusic('./sound/pop.mp3').play();
}

Knight.prototype = new Entity();
Knight.prototype.constructor = Knight;

Knight.prototype.update = function() {
	// collision
	for (var i = 0; i < this.game.entities.length; i++) {
		var entity = this.game.entities[i];
		if (entity !== this && this.collide(entity))
			console.log('Knight colliding...');
	}
	
	this.x += this.game.clockTick * this.speed;
	Entity.prototype.update.call(this);
}

Knight.prototype.draw = function() {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

Knight.prototype.collide = function(other) {
	return distance(this, other) < 10;
}