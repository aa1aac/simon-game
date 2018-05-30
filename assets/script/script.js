// defination of simon object for game body
var simon={
 count:0,
 colorPossibilities :["red", "yellow", "green", "blue"],
 randomMoves:[],
 movesByPlayer:[],
 simpleColorsIndex:[],
 strictMode:false,
 sound:{
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'), 
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'), 
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'), 
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  },
}
$(".start").click(function (){
  setTimeout(game(),2000);
 
})
$(".strict").click(function(){
    simon.strictMode=true;
    setTimeout(game(), 2000);
})
function game() {
    gameStart();
}

function gameStart() {
    simon.count=0;
    simon.movesByPlayer=[];
    simon.randomMoves=[];
    simon.simpleColorsIndex=[];
    console.log(simon);
    count();
}

function count(){
  simon.count++;
  setTimeout(function (){
    $(".count").html(simon.count);
  },300)
  newMoves();
}
function newMoves() {
    var randomIndex=Math.floor(Math.random() * 4);
    simon.simpleColorsIndex.push(randomIndex);
    simon.randomMoves.push(simon.colorPossibilities[randomIndex]);
    displayMoves();
    console.log(simon.simpleColorsIndex);
    console.log(simon.randomMoves);
}


function displayMoves() {
   var i=0;
   var moves=setInterval(function(){
     playGame(simon.randomMoves[i],simon.simpleColorsIndex[i]);
     i++;
       
      if (i>=simon.randomMoves.length){
          clearInterval(moves);
          }
       
   },1000)
   clearPlayer();
}

function playGame(nameOfColor,colorIndex){
    removeColor(colorIndex);
    $("."+colorIndex).css({
        backgroundColor:nameOfColor
    })

    playAudio(nameOfColor);
}
function playAudio(nameOfColor){
    switch(nameOfColor){
        case "red":
         simon.sound.red.play();
         break;
        case "yellow":
          simon.sound.yellow.play();
          break;
        case "green":
          simon.sound.green.play();
          break;
        case "blue":
          simon.sound.blue.play();
          break;
    }
}
function removeColor(color){
    setTimeout(function () {
        $("." + color).css({
            backgroundColor: "inherit"
        })
    }, 400) 
}
function clearPlayer(){
  simon.movesByPlayer=[];
  addPlayer();
}
var arr=[];
function addPlayer(){
  $(".simon").click(function(){
      arr.push(this.id)
      
})
  setTimeout(function (){
    playerTurn(arr);
  },1000)
}
function playerTurn(arr){
    if (simon.movesByPlayer[simon.movesByPlayer.length - 1] !== simon.randomMoves[simon.movesByPlayer.length - 1]) {
     if(game.strict){
          alert('Try again! ...From scratch!');
          game();
        } else {
          alert('Wrong move! Try again!');
          displayMoves();
        }
       } else {
          console.log('Good Move!');
          playAudio(simon.sound.arr);
          var check = game.movesByPlayer.length === game.currentGame.length;
          if (check) {
            if(game.count == 20){
              alert('You won! Congrats.');
            } else {
              alert('Next round!');
              nextLevel();
            }
          }
        }
}
function nextLevel(){
    count();
}