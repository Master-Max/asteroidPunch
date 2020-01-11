startButton.addEventListener('click', () => {
  makeTmpPlayer();
  makeTmpAsteroid();
  start();
  // console.log("Have I Won: 1");
})


stopButton.addEventListener('click', () => {
  stop();
})
/****************************************
* Asteroid Making
*****************************************/
function genAsteroidStats() {
  let ranX = Math.random() * (height);
  let ranY = Math.random() * (width);
  if(ranX > (width/2) - 50 || ranX < (width/2) + 50){
    ranX +=5;
  }
  if(ranY > (height/2) - 50 || ranY < (height/2) + 50){
    ranY +=5;
  }
  ranRad = Math.random() * (Math.PI * 2);

  let coords = [ranX, ranY, ranRad];
  let flavor = '';

  switch(Math.floor(Math.random() * 4)){
    case 0:
      flavor = 'Pinched';
      break;
    case 1:
      flavor = 'Jagged';
      break;
    case 2:
      flavor = 'Lumpy';
      break;
    case 3:
      flavor = 'Cobbled';
      break;
    default:
  }

  let vx = Math.random() * 0.1;
  let vy = Math.random() * 0.1;

  const stats = {coords:coords, flavor:flavor, vx:vx, vy:vy}

  return stats;
}

function makeTmpAsteroid() {
  let h = height;
  let w = width;
  stats = genAsteroidStats();
  //console.log(stats);
  const data = {vx:stats.vx, vy:stats.vy, health:3, flavor:stats.flavor, x:stats.coords[0], y:stats.coords[1], lv:0.1, rad:stats.coords[2], h:height, w:width};
  //const data = {health:3, flavor:'Cobbled', x:100, y:100, lv:0.1, rad:0, h:height, w:width};
  asteroid = new Asteroid(data);
  renderQueue.push(asteroid);
}


/****************************************
* Player Making
*****************************************/
function makeTmpPlayer() {
  let h = height;
  let w = width;
  const data = {name: "", health:3, score:0, x:width/2, y:height/2, lv:0.001, r:0.0, av:0.01, h:h, w:w};
  player = new Player(data);
  renderQueue.push(player);
}

document.addEventListener('keydown', downKey);

function downKey(e) {
  console.log('DW' + e.code);
  switch(e.code){
    case 'KeyA':
      player.turnLeft(true);
      break;
    case 'KeyD':
      player.turnRight(true);
      break;
    case 'KeyW':
      player.burnEngine(true);
      break;
    default:

  }
}

document.addEventListener('keyup', upKey);

function upKey(e) {
  console.log('UP' + e.code);
  switch(e.code){
    case 'KeyA':
      player.turnLeft(false);
      break;
    case 'KeyD':
      player.turnRight(false);
      break;
    case 'KeyW':
      player.burnEngine(false);
      break;
    default:

  }
}
