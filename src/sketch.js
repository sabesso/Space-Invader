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
let shipImg;
let alienImg;
let dropImg;
let explodeImg;
let explosionSprite = [];
let aliensSprite;
let aliensImg = [];
let redLine = height * 3/4;
let blueLine = height * 2/4; 

function preload() {
  shipImg = loadImage('images/ship.png');
  alienImg = loadImage('images/alien.png');
  dropImg = loadImage('images/drop1.png');
  explodeImg = loadImage('images/explode.png');
  aliensSprite = loadImage('images/aliens3.png');
}

function setup() {
  createCanvas(width, height);
  init();
  ship = new Ship(shipImg);
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
  background(0);
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
  //  Draw and move the ship
  ship.draw();
  ship.move();
}

//  *** Initiation to create diffrent images from the Sprite & making an array of aliens
function init() {
  //  Create an array to get each frame from the Sprite of aliens
  let greenAlien = aliensSprite.get(56, 0, 36, 35);
  aliensImg.push(greenAlien);
  let yellowAlien = aliensSprite.get(98, 0, 32, 36);
  aliensImg.push(yellowAlien);
  let blueAlien = aliensSprite.get(137, 0, 37, 36);
  aliensImg.push(blueAlien); 
  let redAlien = aliensSprite.get(0, 0, 48, 34);
  aliensImg.push(redAlien);

  //  Create an array to get each frame from the Sprite of explosions
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let img = explodeImg.get(j*40, i*40, 40, 40);
      explosionSprite.push(img);   
    }
  }
  //  Create an array of Aliens 14 columns x 5 rows
  for (let j = 0; j < 5; j++) {
    for (let i = 0, x = 60; i < 14; i++, x += 50) {
      let color = int(random(aliensImg.length));
      let isBlue = (color == 2);
      aliens.push(new Alien(x,50*j,aliensImg[color],explosionSprite,isBlue));
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

  //  Check if the aliens arrived to the red line
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
          console.log("Warning !");
          alien.toExplode = true;
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
function checkAlienDrops() {
  aliens.forEach(alien => {
    if (alien.shot) {
      
    }
  });

}

//  *** Stops ship if the left or right arrow key is no longer held down
function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    ship.setSpeed(0);
    if (keyIsDown(RIGHT_ARROW))
    	ship.setSpeed(5);
  } 
  else if (keyCode === RIGHT_ARROW) {
    ship.setSpeed(0);
    if (keyIsDown(LEFT_ARROW))
    	ship.setSpeed(-5);
  }
}

//  *** Moves the ship if the left or right arrow key is held down
function keyPressed() {
  if (keyCode === LEFT_ARROW)
    ship.setSpeed(-5);
  else if (keyCode === RIGHT_ARROW)
    ship.setSpeed(5);
  if (key === ' ') {
    if (drops.length <= 5) {
      drop = new Drop(ship.x - 4, ship.y - 20, dropImg);
      drops.push(drop);
    }
  }
}
