// define variables


// defination of simon object
var simon={
 count:0,
 colorPossibilities :["red", "yellow", "green", "blue"],
 randomMoves:[],
 movesByPlayer:[],
 simpleColorsIndex:[],
 strictMode:false
}
$(".start").click(function (){
  setTimeout(game(),2000);
})
$(".strict").click(function(){
    simon.strictMode=true;
    setTimeout(game(), 2000);
})

function game() {
    $(".simon").click(function (){
        var a=this.id;
        playAudio(a);
        
    })
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
  $(".count").html(simon.count);
  newMoves();
}
function newMoves() {
    var randomIndex=Math.floor(Math.random() * 4);
    simon.simpleColorsIndex.push(randomIndex);
    simon.randomMoves.push(simon.colorPossibilities[randomIndex]);
    displayMoves();
    console.log(simon.simpleColorsIndex);
}

function displayMoves() {
   var i=0;
   var moves=setInterval(function(){
     playGame(simon.randomMoves[i],simon.simpleColorsIndex[i]);
     i++;
       
      if (i>=simon.randomMoves.length){
          clearInterval(moves);
          
      }
       
   },100)
   
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
    var audio = document.querySelector("."+nameOfColor)
    audio.play();
}
function removeColor(color){
    setTimeout(function () {
        $("." + color).css({
            backgroundColor: "inherit"
        })
    }, 300)
   
}
function clearPlayer(){
  simon.movesByPlayer=[]
  addPlayer();
}

function addPlayer(){
    var arr=[];
  $(".simon").click(function(){
      playerTurn();
  })
}
function playerTurn(){
    var field = this.id;
   if(simon.strictMode===false){
       if (field=simon.randomMoves){
           count();
       }
       else{setTimeout(function () {
           displayMoves();
       },1000)}
   
   }
   else if (simon.strictMode === true) {
        if (field===simon.randomMoves){
           count();
        }
        else{
            $(".count").html("!!!");
            setTimeout(() => {
                game(); 
            }, 1000);
            
        }
   }
}