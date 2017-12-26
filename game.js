const isEveryElementNonZero = function (listOfElements) {
  return listOfElements.every((element)=>{return element>0;});
}

const Game = function () {
  this.gameArray=[];
  this.score=0;
  this.rows=[[],[],[],[]];
  this.columns=[[],[],[],[]];
  this.rowList=[2,2,4,2,4,2,4,2,4,2,4,2,4,2,4,4];
};

/*
Bacically idea is instead of converting gameArray into rows or columns
I want to get columns and rows from game data ;
*/

Game.prototype.getScore = function () {
  return this.score;
};

Game.prototype.createGameArray = function () {
  this.gameArray=new Array(16).fill(0);
};

Game.prototype.startGame = function () {
  this.addRandomElement();
};

Game.prototype.canElementsBeMerged = function () {
  let that=this;
  return this.columns.some(that.isAnyRepetitionOfNumber)||this.rows.some(that.isAnyRepetitionOfNumber);
};

Game.prototype.isAnyRepetitionOfNumber = function (listOfElements) {
  for (let i = 0; i < listOfElements.length-1; i++) {
    let currentElement=listOfElements[i];
    let nextElement=listOfElements[i+1];
    if (currentElement==nextElement) {
      return true;
    }
  }
  return false;
}

Game.prototype.isGameOver = function () {
  console.log(!this.canElementsBeMerged());
  console.log(isEveryElementNonZero(this.gameArray));
  return isEveryElementNonZero(this.gameArray)&&(!this.canElementsBeMerged());
};

Game.prototype.isValidIndex = function (index) {
  return this.gameArray[index]==0;
};

Game.prototype.removeZeros = function (array) {
  return array.filter((element)=>{return element!=0;});
}

Game.prototype.addRandomElement = function () {
  let index=this.genrateRandomIndex();
  if(this.isValidIndex(index)){
    let randomElement=this.rowList[index];
    this.gameArray[index]=randomElement;
    return ;
  }
  return this.addRandomElement();
};

Game.prototype.genrateRandomIndex = function () {
  return Math.floor(Math.random()*(this.gameArray.length));
};

Game.prototype.getRows = function (array) {
  let rows=[];
  rows.push(array.slice(0,4));
  rows.push(array.slice(4,8));
  rows.push(array.slice(8,12));
  rows.push(array.slice(12,16));
  return rows;
};

Game.prototype.getReverseRows = function (array) {
  let rows=this.getRows(array);
  return rows.map((row)=>{return row.reverse();})
};

Game.prototype.updateRows = function () {
  this.rows=this.getRows(this.gameArray);
};

Game.prototype.getColumns = function (array) {
  let columns=[];
  for(let index=0;index<4;index++){
    let column=[];
    column.push(array[index]);
    column.push(array[index+4]);
    column.push(array[index+8]);
    column.push(array[index+12]);
    columns.push(column);
  }
  return columns;
};

Game.prototype.updateColumns = function () {
  this.columns=this.getColumns(this.gameArray);
};

Game.prototype.getReverseColumns = function (array) {
  let columns=this.getColumns(array);
  return columns.map((column)=>{return column.reverse();})
};

Game.prototype.updateArray = function (groupedArray) {
  let that=this;
  return groupedArray.map((groupOfElements)=>{
    return that.getMergedArray(groupOfElements);
  })
};

Game.prototype.joinArraysIntoOne = function (arrayOfArray) {
  return arrayOfArray.reduce((intialArray,array)=>{
    return intialArray.concat(array);
  },[])
};

Game.prototype.actionAfterLeftArrow = function () {
  this.shiftElementsLeft();
  this.addRandomElement();
}

Game.prototype.actionAfterRightArrow = function () {
  this.shiftElementsRight();
  this.addRandomElement();
}

Game.prototype.actionAfterUpArrow = function () {
  this.shiftElementsUpword();
  this.addRandomElement();
}

Game.prototype.actionAfterDownArrow = function () {
  this.shiftElementsDownword();
  this.addRandomElement();
}

Game.prototype.joinReverseArraysIntoOne = function (arrayOfArray) {
  return arrayOfArray.reduce((intialArray,array)=>{
    return intialArray.concat(array.reverse())},[]);
};

Game.prototype.getMergedArray = function (groupOfElements) {
  let filterdGroupOfElements=this.removeZeros(groupOfElements);
  let groupToBeMerged=this.addZerosToMakeLength4(filterdGroupOfElements);
  return this.mergeSimiliarElements(groupToBeMerged);
};

Game.prototype.addZerosToMakeLength4 = function (array) {
  let arrayOfZeros=new Array(4-array.length).fill(0);
  array=array.concat(arrayOfZeros);
  return array;
};

Game.prototype.shiftElementsUpword = function () {
  let columns=this.getColumns(this.gameArray);
  let updatedColumns=this.updateArray(columns);
  let columnsArray=this.joinArraysIntoOne(updatedColumns);
  let rows=this.getColumns(columnsArray);
  this.gameArray=this.joinArraysIntoOne(rows);
};

Game.prototype.shiftElementsDownword = function () {
  let columns=this.getReverseColumns(this.gameArray);
  let updatedColumns=this.updateArray(columns);
  let columnsArray=this.joinReverseArraysIntoOne(updatedColumns);
  let rows=this.getColumns(columnsArray);
  this.gameArray=this.joinArraysIntoOne(rows);
};

Game.prototype.shiftElementsLeft = function () {
  let rows=this.getRows(this.gameArray);
  let updatedRows=this.updateArray(rows);
  this.gameArray=this.joinArraysIntoOne(updatedRows)
};

Game.prototype.shiftElementsRight = function () {
  let reverseRows=this.getReverseRows(this.gameArray);
  let updatedReverseRows=this.updateArray(reverseRows);
  this.gameArray=this.joinReverseArraysIntoOne(updatedReverseRows);
};


/*

===> Think About This Function <===

This Is Significantally Large
Try to Make It Samll By
  ->  Dividing Into Smaller Functions
  ->  Or You Can Try Another Logic If You Can I Think You Must Try

*/

Game.prototype.mergeSimiliarElements = function (array) {
  // console.log("this is inputArray"+array);
  let firstElement=array[0];
  let secondElement=array[1];
  let thirdElement=array[2];
  let fourthElement=array[3];
  if(firstElement==secondElement){
    if(thirdElement==fourthElement){
      array[2]=thirdElement*2;
      array[3]=0;
    }
    array[0]=firstElement*2;
    array[1]=array[2];
    array[2]=array[3];
    array[3]=0;
  }else if (secondElement==thirdElement) {
    array[0]=firstElement;
    array[1]=thirdElement*2;
    array[2]=fourthElement
    array[3]=0;
  }else if (thirdElement==fourthElement) {
    array[0]=firstElement;
    array[1]=secondElement;
    array[2]=thirdElement*2;
    array[3]=0
  }
  return array;
};


// module.exports = Game;

/*
One General Thing Which Applies For This Also Is Think About The Function Names
*/
