var KEY_A = 65;
var KEY_D = 68;
var KEY_SPACE = 32;

var LEFT = 0;
var RIGHT = 1;

/**
 * The class manages key input
 */
function Controller() 
{
	/**
	 * The mapping key
	 */
    this.keymap = {};

    /**
     * The reference of 
     * the controller class
     */
    var that = this;
    
    /**
     * The method hooks the key
     * pressed with the mapping key
     */
    this.keydown = function(event) 
    {
        that.keymap[event.keyCode] = true;
        event.preventDefault();
    }
    
    /**
     * The method hooks the key
     * pressed with the mapping key
     */
    this.keyup = function(event) 
    {
        that.keymap[event.keyCode] = false;
        event.preventDefault();
    }

    // strictly hook event listener to the methods
	document.addEventListener("keydown", this.keydown, false);
	document.addEventListener("keyup", this.keyup, false);
}
