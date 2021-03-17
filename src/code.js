  //  121 Create an array of Aliens 14 columns x 5 rows
  // for (let j = 0; j < 5; j++) {
  //   for (let i = 0, x = 60; i < 14; i++, x += 50) {
  //     if (stars < 5) {
  //       let color = int(random(aliensImg.length));
  //       let isYellow = (color == 2);
  //       let isBlue = (color == 3);
  //       let isStar = (color == 4);
  //       if (isStar) {
  //         stars++;
  //       } 
  //       aliens.push(new Alien(x,50*j,aliensImg[color],explosionImg,isYellow,isBlue,isStar));
  //     } else {
  //       let color = int(random(aliensImg.length - 1));
  //       let isYellow = (color == 2);
  //       let isBlue = (color == 3);
  //       let isStar = false;
  //       aliens.push(new Alien(x,50*j,aliensImg[color],explosionImg,isYellow,isBlue,isStar));
  //     }
  //   }
  // 141 }

  // aliens.forEach(row => {
  //   row.forEach(function(alien, index, object) {
  //     if (alien.toDelete) {
  //       // let index = aliens.indexOf(alien);
  //       object.splice(index,1);
  //       // let index = aliens.indexOf(alien);
  //       // aliens.splice(index, 1);
  //       print(aliens);
  //     }
  //   });
  // });

  //  169 Check if the alien will be deleted or not
  // aliens.forEach(alien => {
  //   if (alien.toDelete) {
  //     let index = aliens.indexOf(alien);
  //     aliens.splice(index, 1);
  //   }
  // 175 });

  //  *** To draw all the aliens
// 205 function drawAliens() {
//     aliens.forEach(alien => {
//       alien.draw();
//     });
// 210  }

// function checkDrops() {
//     //  Checking if hits aliens
//     drops.forEach(drop => {
//       aliens.forEach(alien => {
//         if (drop.hits(alien)) {
//           if (!alien.shield && !alien.star) {
//             explosionSound.play();
//             let index = aliens.indexOf(alien);
//             aliens[index + 1].left = false;
//             aliens[index - 1].right = false;
//             alien.toExplode = true;
//           } else if (!alien.shield && alien.star) {
//             let index = aliens.indexOf(alien);
//             if (alien.right && !aliens[index+1].shield) {
//               aliens[index + 1].right = false;
//               aliens[index + 1].left = false;
//               aliens[index + 1].toExplode = true;
//             } 
//             if (alien.left && !aliens[index-1].shield) {
//               aliens[index - 1].right = false;
//               aliens[index - 1].left = false;
//               aliens[index - 1].toExplode = true;
//             }
//             alien.right = false;
//             alien.left = false;
//             alien.toExplode = true;
//             explosionSound.play();
//             console.log(alien);
//             console.log(aliens[index+1]);
//             console.log(aliens[index-2]);
  
  
  
//             // if(alien.star) {
//             // let index = aliens.indexOf(alien);
//             // index1 = index + 1;
//             // index2 = index - 1;
//             //   aliens[index1].toExplode = true;
//             //   aliens[index2].toExplode = true;
//             //   console.log("index = " + index);
//             //   console.log("index + = " + index1);
//             //   console.log("index - = " + index2);
//             // }
//           } else {
//             hitSound.play();
//           }
//           drop.toDelete = true;
//         }
//       });
//       if (drop.y < 0) {
//         drop.toDelete = true;
//       }
//     });
//     //  Checking drop if out of the scene
//     drops.forEach(drop => {
//       if (drop.toDelete) {
//         let index = drops.indexOf(drop);
//         drops.splice(index, 1);
//       }
//     });
//   }