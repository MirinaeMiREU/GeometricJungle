/**
 * The class manages the resources
 */
function AssetManager()
{
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = [];
    this.music = [];
    this.downloadQueue = [];

    /**
     * The method puts all
     * paths in queue to download
     */
    this.queueDownload = function (path)
    {
        console.log("Queueing " + path);
        this.downloadQueue.push(path);
    }
    
    /**
     * The method indicates if
     * the downloading is all done
     * @return true if done otherwise false
     */
    this.isDone = function ()
    {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    }
    
//    this.load = function(callback)
//    {
//    	console.log("Loaded " + this.src);
//        callback();
//    }
    
    /**
     * The method starts downloading
     * images from the queue
     */
    this.downloadAll = function (callback)
    {
        for (var i = 0; i < this.downloadQueue.length; i++)
        {
            var img = new Image();
            var that = this;

            var path = this.downloadQueue[i];
            console.log(path);

            img.addEventListener("load", function ()
            {
                console.log("Loaded " + this.src);
                that.successCount++;
                if(that.isDone()) callback();
            });

            img.addEventListener("error", function ()
            {
                console.log("Error loading " + this.src);
                that.errorCount++;
                if (that.isDone()) callback();
            });

            img.src = path;
            this.cache[path] = img;
        }
    }
    
    /**
     * The method pulls up the image
     * from client cache for use 
     * after finishing the download
     * @return the sprite (animations)
     */
    this.getAsset = function (path)
    {
        return this.cache[path];
    }
    
    this.addMusic = function(path)
    {
    	var sound = new Audio();
    	sound.addEventListener("canplay", null);
    	sound.addEventListener("error", null);
    	sound.src = path;
    	this.music[path] = sound;
    }
    
    this.getMusic = function(path)
    {
    	return this.music[path];
    }
}

