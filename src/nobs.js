startButton.addEventListener('click', () => {
  makeTmpPlayer();
  start();
  // console.log("Have I Won: 1");
})


stopButton.addEventListener('click', () => {
  stop();
})


/****************************************
* Player Making
*****************************************/
function makeTmpPlayer() {
  const data = {name: "", health:3, score:0, x:200, y:200, lv:0.001, r:0.0, av:0.01};
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
