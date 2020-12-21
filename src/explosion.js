class Explosion {
    constructor(animation, x, y) {
        this.animation = animation;
        this.x = x;
        this.y = y;
        this.index = 0;
    }

    show() {
        image(this.animation[this.index % this.animation.length], this.x , this.y);
    }
    animate() {
        this.index += 1;
    }
}