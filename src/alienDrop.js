class AlienDrop {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.r = 10;
        this.toDelete = false;
    }

    draw() {
        image(this.img, this.x, this.y, this.r/2, this.r);
    }
    move() {
        this.y += 2;
    }
    hits(ship) {
        if (this.x >= ship.x && this.x+5 <= ship.x + ship.width && this.y >= ship.y && this.y <= ship.y + ship.height) {
            return true;
        } else {
            return false;
        }
    }
}