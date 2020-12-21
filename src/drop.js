class Drop {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.r = 10;
        this.img = img;
        this.toDelete = false;
    }

    draw() {
        image(this.img, this.x, this.y, this.r/2, this.r);
        // fill(200, 0 , 100);
        // ellipse(this.x, this.y, this.r, this.r);
    }
    move() {
        this.y -= 5;
    }
    hits(alien) {
        if (this.x >= alien.x && this.x <= alien.x + alien.width && this.y >= alien.y && this.y <= alien.y + alien.height) {
            return true;
        } else {
            return false;
        }
    }
    // takeOut() {
    //     this.toDelete = true;
    // }
    // animate() {
    //     if (animate) {
            
    //     }
    // }
}