//variables declared
userSeq = [];
simonSeq = [];
const maxLevel = 20;
var id, color, level = 0;
var strict = false;
var error = false; 
var boardSound=[
  'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',// for red 0 
  'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', //yelllow 1
  'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', //green  2
  'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'  //blue  3
 ];
//start board sequence
$(document).ready(function() {
  $(".start").click(function() {
    strict = false;
    error = false;
    level = 0;
    level++;
    simonSeq = []
    userSeq = [];
    simonSequence();
  })
  //user's strict mode click listener
  $(".simon").click(function() {
    id = $(this).attr("id");
    color = $(this).attr("class").split(" ")[1];
    userSequence();
  });
  //strict mode listener
  $(".strict").click(function() {
    level = 0;
    level++;
    simonSeq = []
    userSeq = [];
    strict = true;    
    simonSequence();
  })
})
//user sequence
function userSequence() {
  userSeq.push(id);
    addClassSound(id, color);
    //check user sequence
    if(!checkUserSeq()) {
      //if playing strict mode reset everything lol
      if(strict) {
        simonSeq = [];
        level = 1;
      }   
      error = true;   
      displayError();
      userSeq = [];      
      simonSequence();
    }
    //check end of sequence
    else if(userSeq.length == simonSeq.length && userSeq.length < maxLevel) {
      level++;
      userSeq = [];
      error = false;
      simonSequence();
    }
    //check for the winner
    if(userSeq.length == maxLevel) {
      displayWinner();
      resetGame();
    }     
  
}

/* simon sequence */
function simonSequence() {
  console.log("level "+level);
  $(".count").text(level);
  if(!error) {
    getRandomNum();
  }
  if(error && strict) {
    alert("game Over!!!! sorry you clicked The wrong One!!!!");
    alert("The game Starts from The scratch")
    getRandomNum();
  
  }  
  var i = 0;
  var interval = setInterval(function() {
    id = simonSeq[i];
    color = $("#"+id).attr("class");
    color = color.split(" ")[1];
    console.log(id+" "+color);
    addClassSound(id, color);
    i++;
    if(i == simonSeq.length) {
      clearInterval(interval);
    } 
  }, 1000);  
}
//generate random number for random simon sequence
function getRandomNum() {
  var random = Math.floor(Math.random() * 4);
  simonSeq.push(random);
}
/* add temporary class and sound  */
function addClassSound(id, color) {
  $("#"+id).addClass(color+"-active");
  playSound(id);
  setTimeout(function(){
    $("#"+id).removeClass(color+"-active");
  }, 500);
}
/* checking user seq against simon sequence */
function checkUserSeq() {
  for(var i = 0; i < userSeq.length; i++) {
    if(userSeq[i] != simonSeq[i]) {      
      return false;
    }
  }
  return true;
}
/* display error  */
function displayError() { 
  var counter = 0;
  $(".count").text("!!");
  var error = setInterval(function() {
    
    counter++;
    if(counter == 3) {
      $(".count").text(level);
      clearInterval(error);
      userSeq = [];
      counter = 0;
    }
  }, 500);
}
//display winner 
function displayWinner() {
  var count = 0;
  var winInterval = setInterval(function() { 
    count++;
    $(".count").text("Win");
    alert("congrats You Win")
    if(count == 5) {
      clearInterval(winInterval);
      $(".display").text("00");
      count = 0;
    }
  }, 500);
}
// play board sound 
function playSound(id) {
  var sound = new Audio(boardSound[id]);
  sound.play();
}

/* reset game */
function resetGame() {
  userSeq = [];
  simonSeq = [];
  level = 0;
  $(".display").text("00");
   
}
