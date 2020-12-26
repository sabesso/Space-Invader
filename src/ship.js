class Ship {
    constructor (img) {
        this.x = width/2;
        this.y = height-30;
        // this.dir = 0;
        this.img = img;
    }
    
    draw() {
        image(this.img, this.x - 25, this.y - 20, 50, 50);
    }
    setSpeed(speedx) {
        this.speed = speedx;
    }
    move() {
        if ((this.x + this.speed) > 15 && (this.x + this.speed) < width - 10)
            this.x += this.speed;
        // if (this.x > 20 || this.dir > 0) {
        //     if (this.x + this.dir * 4 < width - 15)
        //         this.x += this.dir * this.speed;
        // }
    }
}