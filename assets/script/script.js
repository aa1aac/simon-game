// variables for game defined
 var simonSeq=[0,1,2,3]; //stores random sequence generated
 var userSeq=[]; //stores input by the user
 var id=0;
 var color=0;
 var level=0;
 var boardSound=[
  'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',// for red 0 
  'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', //yelllow
  'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', //green
  'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'  //blue
 ]
 // start the game when window is loaded
$(document).ready(function(){
  // add event listener to the start button
  $('.start').click(function(){
    level++;
      startSequence();
  })

  // click for input 
  $(".simon").click(function()
  {
    id= $(this).attr("id");
    color=$(this).attr("class").split(" ")[1];
    addClassSound(id,color);
    userSeq.push(id);
  })
})



// defination of startSequence function
function startSequence(){
  console.log(level);
   $(".count").text(level);
  //  getRandomNum();
   var i=0;
   var interval=setInterval(function(){
     id= simonSeq[i];
     color=$('#'+id).attr('class').split(" ")[1];
     console.log(id+" "+color);
     addClassSound(id,color);
     if (i=simonSeq.length){
        clearInterval(interval);
     }
   },1000);
}

// function to get random number for index;
 function getRandomNum(){
   var num=Math.floor(Math.random()*4);
   simonSeq.push(num);
 }

 // function for class sound
 function addClassSound(id,color){
  $("#"+id).addClass(color+"-active");
  playSound(id);
  setTimeout(function(){
       $("#"+id).removeClass(color+"-active");
  },200)
 }

 //play sound function
 function playSound(id){

 }
/*// defination of simon object for game body
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
  setTimeout(game(),1000);
 
})
$(".strict").click(function(){
    simon.strictMode=true;
    setTimeout(game(), 1000);
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
       } 
       else {
          console.log('Good Move!');
           playAudio(simon.sound.arr)
          var check = simon.movesByPlayer.length === simon.randomMoves.length;
          if (check) {
            if(simon.count == 20){
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
}*/