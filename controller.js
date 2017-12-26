// const Game = require('./game.js');


let game=new Game();

const loadGame = function () {
  game.createGameArray();
  displayGameTable(game.gameArray);
  displayScore(game.getScore());
}

const displayGameTable = function (gameArray) {
  gameArray.forEach((element,index)=>{
    let cell=document.getElementById(index);
    cell.innerText="";
    if(element>0)cell.innerText=element;
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



/*
Think about these functions in these functions there is repeatation I can see
Try to make "Common Fucntion" for all these functions
Here for action you should know direction and other things are nearly the same
*/

const actionAfterUpArrow = function () {
  game.shiftElementsUpword();
}

const actionAfterDownArrow = function () {
  game.shiftElementsDownword();
}

const actionAfterRightArrow = function () {
  game.shiftElementsRight();
}

const actionAfterLeftArrow = function () {
  game.shiftElementsLeft();
}

const actions={
  ArrowUp:actionAfterUpArrow,
  ArrowDown:actionAfterDownArrow,
  ArrowRight:actionAfterRightArrow,
  ArrowLeft:actionAfterLeftArrow,
}

const displayGameOver = function () {
  document.getElementById('message').innerText="GameOver";
  onkeyup=null;
}

const takeActionAccordingToInput = function (event) {
  if(game.isGameOver()){
    displayGameOver();
    return ;
  }
  if(event.keyCode<41&&event.keyCode>36){
    actions[event.key]();
    game.addRandomElement();
    game.updateColumns();
    game.updateRows();
    displayGameTable(game.gameArray);
  }
}

const addKeyboardListener = function () {
  onkeyup=takeActionAccordingToInput;
}
window.onload=loadGame;
