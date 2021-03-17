const right = 1;
const left = -1;
const down = 10;

let height = 600;
let width = 800;
let columns = 14;
let rows = 5;
let ship;
let drops = [];
let aliens = [];
let alienStatus = [];
let alienDrops = [];
let aliensExiste = true;
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
let counter;
let time = 500;
let live = 2;
let star = 4, shield = 3, shooter = 2, normal = 1, exploded = 0;
let stage = 0;  //  Which function should be running right now ?
                //  stage 0 = splash
                //  stage 1 = game
                //  stage 2 = win
let textColor = (0,255,0);
let titleFont;

function preload() {
  //  Loading images...
  ufoImg = loadImage('images/ufo.png');
  dropImg = loadImage('images/drop1.png');
  explosionSprite = loadImage('images/explode.png');
  aliensSprite = loadImage('images/aliens.png');
  starImg = loadImage('images/star.png');
  backgroundImg = loadImage('images/background.png');
  //  Loading sounds...
  soundFormats('mp3', 'wav');
  shootSound = loadSound('sounds/shoot.wav');
  explosionSound = loadSound('sounds/explosion.wav');
  hitSound = loadSound('sounds/fastinvader4.wav');
  //  Loading fonts
  titleFont = loadFont('fonts/candy_pop/Candy_Pop.ttf');
  bodyFont = loadFont('fonts/brighly_crush/Brightly_Crush_Shine.otf');
  // titleFont = loadFont('fonts/daily_hours/Daily Hours.ttf');
  // titleFont = loadFont('fonts/fluo_gums/Fluo Gums.ttf');
}

function setup() {
  let cnv = createCanvas(width, height);
  // cnv.position(350,0);
  init();
  ship = new Ship(shipImg,explosionImg);
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
  if (stage == 0) {
    splash();
  } else if (stage == 1) {
    game();
  } else if (stage == 2) {
    win();
    clearInterval(counter);
  }

  if (mouseIsPressed && stage == 0) {
    stage = 1;
    counter = setInterval(createAlienDrops, time);
  }

  // if (!focused) {
  //   counter.pause();
  // }
}

//  Introduction to game
function splash() {
  image(backgroundImg, 0, 0, width, height);
  //  Words for Splash
  fill(200,255,200);
  textFont(titleFont);
  textAlign(CENTER);
  textSize(40);
  text('SPACE INVADER', width/2, 100);

  textAlign(LEFT);
  textSize(20);
  text('COMMENT JOUER : ', width/8, 200);

  textFont(bodyFont);
  textSize(20);
  text('Appuyez sur les flèches Droite et Gauche pour vous déplacer', width/8, 250);
  text('Appuyez sur Espace pour tirer', width/8, 300);
  text('Détruire tous les Aliens pour gagner', width/8, 350);

  textFont(titleFont);
  textAlign(CENTER);
  textSize(30);
  text("Cliquez sur l'écran pour commencer", width/2, 450);
}

function game() {
  image(backgroundImg, 0, 0, width, height);
  horizontalLine(red_stroke, redLine);
  horizontalLine(blue_stroke, blueLine);
  //  Check & draw the drops from aliens
  checkAlienDrops();
  moveAlienDrops();
  //  Check, draw and move the aliens
  checkAliens();
  drawAliens();
  moveAliens();
  //  Check, draw and move the drops
  checkDrops();
  moveDrops();
  //  Draw and move the ship
  ship.draw();
  ship.move();
}

function win() {
  image(backgroundImg, 0, 0, width, height);
  //  Words for Win
  fill(0,255,0);
  textFont(titleFont);
  textAlign(CENTER);
  textSize(40);
  text('Félicitation, Tu as gagner...', width/2, 200);
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
  aliensImg.push(starImg);

  //  Create an array to get each frame from the Sprite of explosions
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let img = explosionSprite.get(j*40, i*40, 40, 40);
      explosionImg.push(img);   
    }
  }
  //  Create an array of Aliens 14 columns x 5 rows
  for (let j = 0; j < rows; j++) {
    // alienStatus[j] = [];
    aliens[j] = [];
    alienStatus[j] = [];
    for (let i = 0, x = 60; i < columns; i++, x += 50) {
      if (stars < 5) {
        let color = int(random(aliensImg.length));
        let isYellow = (color == 2);
        let isBlue = (color == 3);
        let isStar = (color == 4);
        
        if (isBlue) {
          alienStatus[j][i] = shield;
        } else if (isStar) {
          alienStatus[j][i] = star;
          stars++;
        } else if (isYellow) {
          alienStatus[j][i] = shooter;
        } else {
          alienStatus[j][i] = normal;
        }
        aliens[j][i] = new Alien(x,50*j,aliensImg[color],explosionImg,isYellow,isBlue,isStar);
        // aliens.push(new Alien(x,50*j,aliensImg[color],explosionImg,isYellow,isBlue,isStar));
      } else {
        let color = int(random(aliensImg.length - 1));
        let isYellow = (color == 2);
        let isBlue = (color == 3);
        let isStar = false;
        // aliens.push(new Alien(x,50*j,aliensImg[color],explosionImg,isYellow,isBlue,isStar));
        if (isBlue) {
          alienStatus[j][i] = shield;
        } else if (isYellow) {
          alienStatus[j][i] = shooter;
        } else {
          alienStatus[j][i] = normal;
        }
        aliens[j][i] = new Alien(x,50*j,aliensImg[color],explosionImg,isYellow,isBlue,isStar);
      }
    }
  }
  // print(alienStatus);
  // print(aliensNumber);
  // console.log(aliensNumber.length);
}

//  *** Check if the alien has been deleted or hits the wall ***
function checkAliens() {
  //  WIN ... Check if the Player hits all the aliens
  // for (let i = 0; i < rows; i++) {
  //   for (let j = 0; j < columns; j++) {

      // if (aliens[i][j].toDelete == false) {
      //   alienExiste = true;
      //   break;
      // }
  if ( aliens[0].some(alien => alien.toDelete == false) ||
       aliens[1].some(alien => alien.toDelete == false) ||
       aliens[2].some(alien => alien.toDelete == false) ||
       aliens[3].some(alien => alien.toDelete == false) ||
       aliens[4].some(alien => alien.toDelete == false) ) {
    stage = 1;
  } else {
    stage = 2;
  }
      // alienExiste = aliens[i].some(alien => alien.toDelete == false);
      // // console.log(aliensExiste);
      // if (alienExiste) {
      //   stage = 1;
      // } else {
      //   stage = 2;
      // }
      
  //   }
  // }
  // aliens.forEach(row => {
  //   alienExiste = row.some(alien => alien.toDelete == false);
  //   console.log(aliensExiste);
  //   if (!alienExiste) {
  //     stage = 2;
  //   }
  // });

  //  Check if the alien hits the left or right wall
  yDirection = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (alienStatus[i][j] != 0) {
        if (aliens[i][j].x + 30 > width) {
          xDirection = left;
          yDirection = down;
        } else if (aliens[i][j].x < 1) {
          xDirection = right;
          yDirection = down;
        }
      }
    }
  }

  //  Check if the aliens arrived to the red or blue line
  aliens.forEach(row => {
    row.forEach(alien => {
      if (alien.bottom() == redLine) {
        alien.speed = 3;
      }
      if (alien.bottom() == blueLine) {
        alien.shield = false;
      }
    });
  });
}

//  *** To draw all the aliens
function drawAliens() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (!aliens[i][j].toDelete) {
        aliens[i][j].draw();
      }
    }
  }
}

//  *** To move all the aliens
function moveAliens() {
  aliens.forEach(row => {
    row.forEach(alien => {
      alien.move(xDirection, yDirection);
    });
  });
}

//  *** To check if the drops hits the aliens or out of the scene
function checkDrops() {
  //  Checking if hits aliens
  drops.forEach(drop => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (alienStatus[i][j] != 0) {
          if (drop.hits(aliens[i][j])) {
            if (!aliens[i][j].shield && !aliens[i][j].star) {
              explosionSound.play();
              aliens[i][j].toExplode = true;
              alienStatus[i][j] = 0;
            } else if (aliens[i][j].star) {
              aliens[i][j].toExplode = true;
              explosionSound.play();
              alienStatus[i][j] = 0;
              if (aliens[i][j+1] != undefined) {
                if (!aliens[i][j+1].shield) {
                  aliens[i][j+1].toExplode = true;
                  alienStatus[i][j+1] = 0;
                }
              }
              if (aliens[i][j-1] != undefined) {
                if (!aliens[i][j-1].shield) {
                  aliens[i][j-1].toExplode = true;
                  alienStatus[i][j-1] = 0;
                }
              }
            } else if (aliens[i][j].shield) {
              hitSound.play();
            }
            drop.toDelete = true;
          }
        }
      }
    }
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
  let al = aliens[Math.floor(Math.random() * rows)][Math.floor(Math.random() * columns)];
  if (!al.toDelete && al.shoot) {
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
