/** 
 * The HighlightUnit. This class represents the highlight for unit selection.
 * 
 * Author(s): Varik Hoang, Peter Bae, Cuong Tran, Logan Stafford
 * Based on code created by Seth Ladd and edited for use by Chris Marriott.
 * TCSS491 - Winter 2018
 */
function HighlightUnit(game, spritesheet) {
	this.loc = -2;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
	
	
	Entity.call(this, game, 0, 0, 0);
	this.draw = function () {
		this.ctx.drawImage(this.spritesheet, this.loc * 54 + 6, 6, 48, 48);
	};
	
	this.changeLoc = function(loc) {
		this.loc = loc;
	};
};

HighlightUnit.prototype.update = function () {
};