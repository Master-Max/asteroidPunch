/****************************************
* Draw Array
*****************************************/
const renderQueue = [];
function removeFromRenderQueue(obj){
  const index = renderQueue.indexOf(obj);
  renderQueue.splice(index, 1);
}

const asteroidQueue = [];
function removeFromAsteroidQueue(obj){
  console.log("Attempting removal of asteroid");
  const index = asteroidQueue.indexOf(obj);
  asteroidQueue.splice(index, 1);
}

const shotQueue = [];
function removeFromShotQueue(obj){
  console.log("Attempting removal of shot");
  const index = shotQueue.indexOf(obj);
  shotQueue.splice(index, 1);
}
/****************************************
*Dev Buttons
*****************************************/
const startButton = document.getElementById('start-btn');
const stopButton = document.getElementById('stop-btn');


/****************************************
*Player Stuff
*****************************************/
let player;



// Test Stuff

//const canvasDiv = document.getElementById('canvas-div');
