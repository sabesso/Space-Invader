const right = 1;
const left = -1;
const down = 10;

let height = 600;
let width = 800;
let ship;
let drops = [];
let aliens = [];
let alienDrops = [];
let xDirection = right;
let yDirection = 0;
let ufoImg;
let shipImg;
let dropImg;
let explosionSprite;
let explosionImg = [];
let aliensSprite;
let aliensImg = [];
let redLine = height * 3/4;
let blueLine = height * 2/4; 
let stars = 0;
let backgroundImg;
let shipSpeed = 7;
let shootSound;
let explosionSound;
let hitSound;
let button;
let timer = 500;
let live = 3;

function preload() {
  //  Loading images...
  ufoImg = loadImage('images/ufo.png');
  dropImg = loadImage('images/drop1.png');
  explosionSprite = loadImage('images/explode.png');
  aliensSprite = loadImage('images/aliens.png');
  star = loadImage('images/star.png');
  backgroundImg = loadImage('images/background.png');
  //  Loading sounds...
  soundFormats('mp3', 'wav');
  shootSound = loadSound('sounds/shoot.wav');
  explosionSound = loadSound('sounds/explosion.wav');
  hitSound = loadSound('sounds/fastinvader4.wav');
}

function setup() {
  let cnv = createCanvas(width, height);
  // cnv.position(350,0);
  init();
  ship = new Ship(shipImg,explosionImg);
  button = createButton("jouer");
  button.mousePressed(togglePlaying);

  setInterval(createAlienDrops, timer);
}

function togglePlaying() {
  
}

function red_stroke() {
  stroke(255,0,0);
}

function blue_stroke() {
  stroke(0,0,120);
}

function horizontalLine(color, pos) {
  color();
  strokeWeight(1);
  line(0, pos, width, pos);
}

function draw() {
  // background(0);
  image(backgroundImg, 0, 0, width, height);
  horizontalLine(red_stroke, redLine);
  horizontalLine(blue_stroke, blueLine);
  //  Check, draw and move the aliens
  checkAliens();
  drawAliens();
  moveAliens();
  //  Check, draw and move the drops
  checkDrops();
  moveDrops();
  //  Check & draw the drops from aliens
  checkAlienDrops();
  moveAlienDrops();
  //  Draw and move the ship
  ship.draw();
  ship.move();
}

//  *** Initiation to create diffrent images from the Sprite & making an array of aliens
function init() {
  shipImg = ufoImg.get(0, 150, 540, 390);
  //  Create an array to get each frame from the Sprite of aliens
  let redAlien = aliensSprite.get(0, 0, 48, 34);
  aliensImg.push(redAlien);
  let greenAlien = aliensSprite.get(56, 0, 36, 35);
  aliensImg.push(greenAlien);
  let yellowAlien = aliensSprite.get(98, 0, 32, 36);
  aliensImg.push(yellowAlien);
  let blueAlien = aliensSprite.get(137, 0, 37, 36);
  aliensImg.push(blueAlien);
  aliensImg.push(star);

  //  Create an array to get each frame from the Sprite of explosions
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let img = explosionSprite.get(j*40, i*40, 40, 40);
      explosionImg.push(img);   
    }
  }
  //  Create an array of Aliens 14 columns x 5 rows
  for (let j = 0; j < 5; j++) {
    for (let i = 0, x = 60; i < 14; i++, x += 50) {
      if (stars < 5) {
        let color = int(random(aliensImg.length));
        let isYellow = (color == 2);
        let isBlue = (color == 3);
        let isStar = (color == 4);
        if (isStar) {
          stars++;
        } 
        aliens.push(new Alien(x,50*j,aliensImg[color],explosionImg,isYellow,isBlue,isStar));
      } else {
        let color = int(random(aliensImg.length - 1));
        let isYellow = (color == 2);
        let isBlue = (color == 3);
        let isStar = false;
        aliens.push(new Alien(x,50*j,aliensImg[color],explosionImg,isYellow,isBlue,isStar));
      }
    }
  }
}

//  *** Check if the alien has been deleted or hits the wall ***
function checkAliens() {
  //  Check if the alien will be deleted or not
  aliens.forEach(alien => {
    if (alien.toDelete) {
      let index = aliens.indexOf(alien);
      aliens.splice(index, 1);
    }
  });

  //  Check if the alien hits the left or right wall
  yDirection = 0;
  if (aliens.filter(alien => alien.x + 30 > width).length > 0) {
    xDirection = left;
    yDirection = down;
  } else if (aliens.filter(alien => alien.x < 1).length > 0) {
    xDirection = right;
    yDirection = down;
  }

  //  Check if the aliens arrived to the red or blue line
  aliens.forEach(alien => {
    if (alien.bottom() == redLine) {
      alien.speed = 3;
    }
    if (alien.bottom() == blueLine) {
      alien.shield = false;
    }
  });
}

//  *** To draw all the aliens
function drawAliens() {
  aliens.forEach(alien => {
    alien.draw();
  });
}

//  *** To move all the aliens
function moveAliens() {
  aliens.forEach(alien => {
    alien.move(xDirection, yDirection);
  });
}

//  *** To check if the drops hits the aliens or out of the scene
function checkDrops() {
  //  Checking if hits aliens
  drops.forEach(drop => {
    aliens.forEach(alien => {
      if (drop.hits(alien)) {
        if (!alien.shield) {
          if(alien.star) {
            let index = aliens.indexOf(alien);
            index1 = index + 1;
            index2 = index - 1;
            aliens[index1].toExplode = true;
            aliens[index2].toExplode = true;
            console.log("index = " + index);
            console.log("index + = " + index1);
            console.log("index - = " + index2);
          }
          explosionSound.play();
          alien.toExplode = true;
        } else {
          hitSound.play();
        }
        drop.toDelete = true;
      }
    });
    if (drop.y < 0) {
      drop.toDelete = true;
    }
  });
  //  Checking drop if out of the scene
  drops.forEach(drop => {
    if (drop.toDelete) {
      let index = drops.indexOf(drop);
      drops.splice(index, 1);
    }
  });
}

//  *** Moves the drops
function moveDrops() {
  drops.forEach(drop => {
    drop.draw();
    drop.move();
  });
}

//  *** Checking the drops of aliens
function createAlienDrops() {
  // let obj = aliens.find(alien => (alien.shooter && !alien.shoot));
  let al = aliens[Math.floor(Math.random() * aliens.length)];
  if (al.shoot) {
    alienDrops.push(new AlienDrop(al.x+15,al.y+30,dropImg));
  }
}

function checkAlienDrops() {
   //  Checking if hits aliens
  alienDrops.forEach(drop => {
    if (drop.hits(ship)) {
      if (live > 0) {
        live--;
        console.log("Ship has effected!");
      } else {
        ship.toExplode = true;
      }
      drop.toDelete = true;
    }
    // console.log("drop " + drop.x);
    // console.log("ship " + ship.x);
    if (drop.y > height) {
      drop.toDelete = true;
    }
  });

  //  Checking drop if out of the scene
  alienDrops.forEach(drop => {
    if (drop.toDelete) {
      let index = alienDrops.indexOf(drop);
      alienDrops.splice(index, 1);
    }
  });
}

function moveAlienDrops() {
  alienDrops.forEach(drop => {
    drop.draw();
    drop.move();
  });
}


//  *** Stops ship if the left or right arrow key is no longer held down
function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    ship.setSpeed(0);
    if (keyIsDown(RIGHT_ARROW))
    	ship.setSpeed(shipSpeed);
  } 
  else if (keyCode === RIGHT_ARROW) {
    ship.setSpeed(0);
    if (keyIsDown(LEFT_ARROW))
    	ship.setSpeed(-shipSpeed);
  }
}

//  *** Moves the ship if the left or right arrow key is held down
function keyPressed() {
  if (keyCode === LEFT_ARROW)
    ship.setSpeed(-shipSpeed);
  else if (keyCode === RIGHT_ARROW)
    ship.setSpeed(shipSpeed);
  if (key === ' ') {
    if (drops.length <= 5) {
      drop = new Drop(ship.x+(ship.width/2)-4 , ship.y-10 , dropImg);
      drops.push(drop);
      shootSound.play();
    }
  }
}
