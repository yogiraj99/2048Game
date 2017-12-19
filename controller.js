// const Game = require('./game.js');


let game=new Game();

const loadGame = function () {
  game.createGameArray();
  displayGameTable(game.gameArray);
  displayScore(game.getScore());
}

const displayGameTable = function (gameArray) {
  console.log(gameArray);
  gameArray.forEach((element,index)=>{
    let cell=document.getElementById(index);
    if(element==0){
      cell.innerText="";
    }else {
      cell.innerText=element;
    }
  })
}

const displayScore = function (score) {
  let scoreDisplay=document.getElementById("scoreDisplay");
  scoreDisplay.innerText=score;
}

const startGame = function () {
  game.startGame();
  addKeyboardListener();
  displayGameTable(game.gameArray);
  document.getElementById("startGame").onclick=null;
}

const shiftElementsLeft = function () {
  game.shiftElementsLeft();
  game.addRandomElement();
  displayGameTable(game.gameArray)
}

const shiftElementsRight = function () {
  game.shiftElementsRight();
  game.addRandomElement();
  displayGameTable(game.gameArray)
}

const shiftElementsUpword = function () {
  game.shiftElementsUpword();
  game.addRandomElement();
  displayGameTable(game.gameArray)
}

const shiftElementsDownword = function () {
  game.shiftElementsDownword();
  game.addRandomElement();
  displayGameTable(game.gameArray)
}

const actions={
  ArrowUp:shiftElementsUpword,
  ArrowDown:shiftElementsDownword,
  ArrowRight:shiftElementsRight,
  ArrowLeft:shiftElementsLeft,
}

const gameOver = function () {
  document.getElementById('message').innerText="GameOver";
  onkeyup=null;
}

const takeActionAccordingToInput = function (event) {
  if(game.isGameOver()){
    gameOver();
    return ;
  }
  if(event.keyCode<41&&event.keyCode>36){
    actions[event.key]();
  }
}

const addKeyboardListener = function () {
  onkeyup=takeActionAccordingToInput;
}
window.onload=loadGame;
