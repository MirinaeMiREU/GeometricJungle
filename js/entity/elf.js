/** 
 * The Elf class. Represents the Elf character.
 * 
 * Author(s): Varik Hoang, Peter Bae, Cuong Tran, Logan Stafford
 * TCSS491 - Winter 2018
 */
function Elf(game, spritesheets, lane, team) {
	/** Sprite coordinates must be modified if spritesheets are changed! */
	this.animations = spritesheets;
	this.animation = new Animation(this.animations[1], 111, 128, 5, 0.25, 5, true, 1);
	this.speed = 50;
	this.idle = false;
	this.attack = false;
	this.lane = lane;
	this.ctx = game.ctx;
	switch (lane) {
		case 1:
			Entity.call(this, game, 0, 50, 1);
			break;
		case 2:
			Entity.call(this, game, 0, 130, 2);
			break;
		case 3:
			Entity.call(this, game, 0, 210, 3);
			break;
		case 4:
			Entity.call(this, game, 0, 290, 4);
			break;
		case 5:
			Entity.call(this, game, 0, 370, 5);
	}
}

Elf.prototype = new Entity();
Elf.prototype.constructor = Elf;

Elf.prototype.update = function() {
	if (this.x > 400 && !this.idle) {
		this.animation = new Animation(this.animations[2], 254, 128, 5, 0.25, 5, true, 1);
		this.speed = 0;
		this.idle = true;
		//this.removeFromWorld = true;
	}
	// collision
	for (var i = 0; i < this.game.entities.length; i++) {
		var entity = this.game.entities[i];
		if (entity !== this && this.collide(entity) && !this.idle) {
			console.log('Elf colliding...');
			this.animation = new Animation(this.animations[2], 254, 128, 5, 0.25, 5, true, 1);
			this.speed = 0;
			this.idle = true;
		}
	}
	
	this.x += this.game.clockTick * this.speed;
	
	if (this.removeFromWorld) {
		console.log("rip");
	}
	Entity.prototype.update.call(this);
}

Elf.prototype.draw = function() {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

Elf.prototype.collide = function(other) {
	return distanceX(this, other) < 90;
}