const Game = function () {
  this.gameArray=[];
  this.score=0;
  this.rowList=[2,2,4,2,4,2,4,2,4,2,4,2,4,2,4,4];
};

Game.prototype.getScore = function () {
  return this.score;
};

Game.prototype.createGameArray = function () {
  this.gameArray=new Array(16).fill(0);
};

Game.prototype.startGame = function () {
  this.addRandomElement();
};

Game.prototype.isGameOver = function () {
  return this.gameArray.every((element)=>{return element>0;})
};

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

Game.prototype.shiftElementsLeft = function () {
  let newArray=[];
  for (let index=0;index<4;index++) {
    let row=this.gameArray.slice((index*4),(index*4)+4);
    let rowBeforeMerge=row.filter((element)=>{return element!=0;})
    let mergedRow=this.mergeSimiliarElements(this.addZerosToMakeLength4(rowBeforeMerge))
    mergedRow=this.addZerosToMakeLength4(mergedRow,"back")
    let newRow=mergedRow.filter((element)=>{return element!=0;})
    newRow=this.addZerosToMakeLength4(newRow,"back")
    newArray=newArray.concat(newRow);
  }
  this.gameArray=newArray;
};

Game.prototype.shiftElementsUpword = function () {
  let newArray=[];
  for (let index=0;index<4;index++) {
    let column=[];
    column.push(this.gameArray[index]);
    column.push(this.gameArray[index+4]);
    column.push(this.gameArray[index+8]);
    column.push(this.gameArray[index+12]);
    let columnBeforeMerge=column.filter((element)=>{return element!=0;})
    let mergedColumn=this.mergeSimiliarElements(this.addZerosToMakeLength4(columnBeforeMerge))
    mergedColumn=this.addZerosToMakeLength4(mergedColumn,"back")
    let newColumn=mergedColumn.filter((element)=>{return element!=0;})
    newColumn=this.addZerosToMakeLength4(newColumn,"back")
    this.gameArray[index]=newColumn[0];
    this.gameArray[index+4]=newColumn[1];
    this.gameArray[index+8]=newColumn[2];
    this.gameArray[index+12]=newColumn[3];
  }
};

Game.prototype.shiftElementsDownword = function () {
  let newArray=[];
  for (let index=0;index<4;index++) {
    let column=[];
    column.push(this.gameArray[index]);
    column.push(this.gameArray[index+4]);
    column.push(this.gameArray[index+8]);
    column.push(this.gameArray[index+12]);
    let columnBeforeMerge=column.filter((element)=>{return element!=0;}).reverse()
    let mergedColumn=this.mergeSimiliarElements(this.addZerosToMakeLength4(columnBeforeMerge)).reverse()
    mergedColumn=this.addZerosToMakeLength4(mergedColumn,"front")
    let newColumn=mergedColumn.filter((element)=>{return element!=0;})
    newColumn=this.addZerosToMakeLength4(newColumn,"front")
    this.gameArray[index]=newColumn[0];
    this.gameArray[index+4]=newColumn[1];
    this.gameArray[index+8]=newColumn[2];
    this.gameArray[index+12]=newColumn[3];
  }
};

Game.prototype.shiftElementsRight = function () {
  let newArray=[];
  for (let index=0;index<4;index++) {
    let row=this.gameArray.slice((index*4),(index*4)+4);
    let rowBeforeMerge=row.filter((element)=>{return element!=0;}).reverse()
    let mergedRow=this.mergeSimiliarElements(this.addZerosToMakeLength4(rowBeforeMerge)).reverse();
    mergedRow=this.addZerosToMakeLength4(mergedRow,"front")
    let newRow=mergedRow.filter((element)=>{return element!=0;})
    newRow=this.addZerosToMakeLength4(newRow,"front")
    newArray=newArray.concat(newRow);
  }
  this.gameArray=newArray;
};

Game.prototype.addZerosToMakeLength4 = function (array,side) {
  let arrayOfZeros=new Array(4-array.length).fill(0);
  if(side=="front"){
    array=arrayOfZeros.concat(array);
    return array;
  }
  array=array.concat(arrayOfZeros);
  return array;
};

Game.prototype.mergeSimiliarElements = function (array) {
  console.log("this is inputArray"+array);
  let firstElement=array[0];
  let secondElement=array[1];
  let thirdElement=array[2];
  let fourthElement=array[3];
  if(firstElement==secondElement){
    array[1]=0;
    if(thirdElement==fourthElement){
      array[0]=firstElement;
      array[2]=thirdElement*2;
      array[3]=0
    }
    array[0]=firstElement*2;
  }else if (secondElement==thirdElement) {
    array[0]=firstElement;
    array[1]=thirdElement*2;
    array[2]=0
    array[3]=fourthElement;
  }else if (thirdElement==fourthElement) {
    array[0]=firstElement;
    array[1]=secondElement;
    array[2]=thirdElement*2;
    array[3]=0
  }
  return array;
};

Game.prototype.isValidIndex = function (index) {
  return this.gameArray[index]==0;
};

// module.exports = Game;
