/** 
 * This file manages keyboard input.
 * 
 * Author(s): Varik Hoang, Peter Bae, Cuong Tran, Logan Stafford 
 * Based on code created by Seth Ladd and edited for use by Chris Marriott.
 * TCSS491 - Winter 2018
 */

var KEY_Q = "KeyQ";
var KEY_W = "KeyW";
var KEY_E = "KeyE";
var KEY_R = "KeyR";
var KEY_T = "KeyT";
var KEY_1 = "Digit1";
var KEY_2 = "Digit2";
var KEY_3 = "Digit3";
var KEY_4 = "Digit4";
var KEY_5 = "Digit5";
var KEY_SPACE = 32;
var LEFT = 0;
var RIGHT = 1;

function Controller(game, manager, animArr, soundArr) {
	this.manager = manager;
	this.game = game;
	this.ctx = null;
	this.unitSelected = false;
	this.laneSelected = false;
	this.selectedLane = 0;
	this.selectedUnit = 0;
	this.highlight;
	this.unitHighlight;
	
	/**
	 * The mapping key
	 */
    this.keymap = {};

    /**
     * The reference of 
     * the controller class
     */
    var that = this;
	
	this.init = function(ctx) {
		this.highlight = new Highlight(game, manager.getAsset("./img/background/highlight.png"), 100); 
		this.unitHighlight = new HighlightUnit(game, manager.getAsset("./img/background/unit.png"));
		this.ctx = ctx;
		game.addEntity(this.highlight);
		game.addEntity(this.unitHighlight);
	}
    
    /**
     * The method hooks the key
     * pressed with the mapping key
     */
    this.keydown = function(event) {	
    	soundArr[MENU_NAVSOUNDS].play();
    	
		if (event.code === KEY_1) {
			that.selectedLane = 1;
			that.highlight.changeLane(1);
			
		} else if (event.code === KEY_2) {
			that.selectedLane = 2;
			that.highlight.changeLane(2);
		} else if (event.code === KEY_3) {
			that.selectedLane = 3;
			that.highlight.changeLane(3);
		} else if (event.code === KEY_4) {
			that.selectedLane = 4;
			that.highlight.changeLane(4);
		} else if (event.code === KEY_5) {
			that.selectedLane = 5;
			that.highlight.changeLane(5);
		}
		
		if (event.code === KEY_1 ||
			event.code === KEY_2 ||
			event.code === KEY_3 ||
			event.code === KEY_4 ||
			event.code === KEY_5) {
			
			that.laneSelected = true;
			console.log("lane selected");  
			console.log(that.selectedLane + " Down");
			
			if (that.unitSelected) {
				that.unitSelected = false;
				that.laneSelected = false;
				that.highlight.changeLane(100);
				that.unitHighlight.changeLoc(-100);
				spawnUnit(game, animArr, soundArr, that.selectedLane, that.selectedUnit, 0);
			}
		}
		
		if (event.code === KEY_Q) {
			console.log("Q Down");
			that.selectedUnit = 1;
			that.unitHighlight.changeLoc(0);
		} else if (event.code === KEY_W) {
			console.log("W Down");
			that.selectedUnit = 2;
			that.unitHighlight.changeLoc(1);
		} else if (event.code === KEY_E) {
			console.log("E Down");
			that.selectedUnit = 3;
			that.unitHighlight.changeLoc(2);
		} else if (event.code === KEY_R) {
			console.log("R Down");
			that.selectedUnit = 4;
		} else if (event.code === KEY_T) {
			console.log("T Down");
			that.selectedUnit = 5;
		}
		
		if (event.code === KEY_Q ||
			event.code === KEY_W ||
			event.code === KEY_E ||
			event.code === KEY_R ||
			event.code === KEY_T) {
			
			that.unitSelected = true;
			console.log("unit selected");
			console.log("unit selected");
			
			if (that.laneSelected) {
				that.laneSelected = false;
				that.unitSelected = false;
				that.highlight.changeLane(100);
				that.unitHighlight.changeLoc(-100);
				spawnUnit(game, animArr, soundArr, that.selectedLane, that.selectedUnit, 0);
			}
		}
		
        that.keymap[event.keyCode] = true;
		
		if (that.laneSelected || that.unitSelected) {
			event.preventDefault();
		}
    }
    
    /**
     * The method hooks the key
     * pressed with the mapping key
     */
    this.keyup = function(event) {
        that.keymap[event.keyCode] = false;
        event.preventDefault();
    }
    
	this.mouseclick = function(event) {	
		soundArr[MENU_NAVSOUNDS].play();
		
		if (event.button === 0) {
			if (event.x >= 245 && event.x <= 402 &&
			    event.y >= 140 && event.y <= 190) {			
				if (event.x >= 245 && event.x <= 294) {	
					console.log('unit 1');
					that.selectedUnit = 1;
					that.unitHighlight.changeLoc(0);
				} else if (event.x >= 299 && event.x <= 348) {			
					console.log('unit 2');
					that.selectedUnit = 2;
					that.unitHighlight.changeLoc(1);
				} else if (event.x >= 353 && event.x <= 402) {
					console.log('unit 3');
					that.selectedUnit = 3;
					that.unitHighlight.changeLoc(2);
				}
				that.unitSelected = true;
			}
			
			if (event.x > 240 && event.x < 1200 &&
				event.y >= 275 && event.y < 675) {
				if (event.y >= 275 && event.y < 355) {
					that.selectedLane = 1;
					that.highlight.changeLane(1);
				} else if (event.y >= 355 && event.y < 435) {
					that.selectedLane = 2;
					that.highlight.changeLane(2);
				} else if (event.y >= 435 && event.y < 515) {
					that.selectedLane = 3;
					that.highlight.changeLane(3);
				} else if (event.y >= 515 && event.y < 595) {
					that.selectedLane = 4;
					that.highlight.changeLane(4);  
				} else if (event.y >= 595 && event.y < 675) {
					that.selectedLane = 5;
					that.highlight.changeLane(5); 
				}
				that.laneSelected = true;
			}
			
			if (that.laneSelected === true && that.unitSelected) {
				that.laneSelected = false;
				that.unitSelected = false;
				that.highlight.changeLane(100);
				that.unitHighlight.changeLoc(-100);
				spawnUnit(game, animArr, soundArr, that.selectedLane, that.selectedUnit, 0);
			}
		}
		if (event.button == 2) {
			if (that.laneSelected) {
				that.laneSelected = false;
				that.highlight.changeLane(100);
			}
			if (that.unitSelected) {
				that.unitSelected = false;
				that.unitHighlight.changeLoc(-100);
			}
			if (event.y <= 810 && event.x <= 810) {
				event.preventDefault();
			}
		}
		/*
		if (event.button === 0 && that.laneSelected) {
			console.log("x: " + event.x + " y: " + event.y);
			if (event.y > 145) {
				if (event.y < 225) {
					game.addEntity(new Elf(game, animArr[0], 1, 0));  
				} else if (event.y < 305) {
					game.addEntity(new Elf(game, animArr[0], 2, 0));  
				} else if (event.y < 385) {
					game.addEntity(new Elf(game, animArr[0], 3, 0));  
				} else if (event.y < 465) {
					game.addEntity(new Elf(game, animArr[0], 4, 0));  
				} else if (event.y < 545) {
					game.addEntity(new Elf(game, animArr[0], 5, 0));  
				}
			}
			that.highlight.changeLane(6);
			that.laneSelected = false;
		}
		*/

	}
	
    // strictly hook event listener to the methods
	document.addEventListener("keydown", this.keydown, false);
	document.addEventListener("keyup", this.keyup, false);
	document.addEventListener("contextmenu", this.mouseclick, false);
	document.addEventListener("click", this.mouseclick, false);
}