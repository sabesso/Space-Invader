class Ship {
    constructor (img, animation) {
        this.x = width/2 - 30;
        this.y = height-30;
        // this.dir = 0;
        this.img = img;
        this.animation = animation;
        this.width = 60;
        this.height = 30;
        this.toExplode = false;
        this.toDelete = false;
        this.index = 0;
    }
    
    draw() {
        if (this.toExplode && this.index < 15) {
            image(this.animation[this.index % this.animation.length], this.x , this.y);
            this.index += 1;
            if (this.index >= 15) {
                this.toDelete = true;
            }
        } else {
            image(this.img, this.x, this.y, this.width, this.height);
            // image(this.img, this.x - 25, this.y - 20, this.width, this.height);
        }
    }
    setSpeed(speedx) {
        this.speed = speedx;
    }
    move() {
        if ((this.x + this.speed) > -2 && (this.x + this.speed) < width - 55)
            this.x += this.speed;
        // if (this.x > 20 || this.dir > 0) {
        //     if (this.x + this.dir * 4 < width - 15)
        //         this.x += this.dir * this.speed;
        // }
    }
}