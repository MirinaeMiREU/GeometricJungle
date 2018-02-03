/** 
 * The Elf class. Represents the Elf character.
 * 
 * Author(s): Varik Hoang, Peter Bae, Cuong Tran, Logan Stafford
 * TCSS491 - Winter 2018
 */
function Elf(game, spritesheets, y) {
	/** Sprite coordinates must be modified if spritesheets are changed! */
	this.animations = spritesheets;
	this.animation = new Animation(this.animations[1], 111, 128, 5, 0.25, 5, true, 1);
	this.speed = 20;
	this.idle = false;
	this.lane = y;
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
}

Elf.prototype = new Entity();
Elf.prototype.constructor = Elf;

Elf.prototype.update = function() {
	if (this.x > 50 && !this.idle) {
		this.animation = new Animation(this.animations[0], 118, 128, 4, 0.25, 4, true, 1);
		this.speed = 0;
		this.idle = true;
	}
	// collision
	for (var i = 0; i < this.game.entities.length; i++) {
		var entity = this.game.entities[i];
		if (entity !== this && this.collide(entity))
			console.log('Elf colliding...');
	}
	
	this.x += this.game.clockTick * this.speed;
	Entity.prototype.update.call(this);
}

Elf.prototype.draw = function() {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

Elf.prototype.collide = function(other) {
	return distance(this, other) < 10;
}