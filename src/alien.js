class Alien {
    constructor(x, y, img, animation, shield) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.animation = animation;
        this.shield = shield;
        this.speed = 1.5;
        this.width = 30;
        this.height = 30;
        this.toExplode = false;
        this.toDelete = false;
        this.index = 0;
    }

    bottom() {
        return this.y + this.height;
    }

    drawShield() {
        stroke(0,0,192);
        strokeWeight(4);
        let pos = this.bottom() + 3;
        line(this.x, pos, this.x + this.width, pos);
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
        }
        if (this.shield) {
            this.drawShield();
        }
    }
    move(xDir,yDir) {
        this.x += this.speed * xDir;
        this.y += yDir;
    }
}