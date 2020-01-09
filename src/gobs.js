/****************************************
* Draw Array
*****************************************/
const renderQueue = [];
function removeFromRenderQueue(obj){
  const index = renderQueue.indexOf(obj);
  renderQueue.splice(index, 1);
}

const tmpQueue = [];

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
