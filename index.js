let buttonColours =["green","red","yellow","blue"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0 ;
let start = false;


$(document).on("keydown",function(){
  if(!start)
  {
    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
  }

});

$(".btn").click(function() {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
  {
    console.log("success");

            if(userClickedPattern.length === gamePattern.length)
            {
              setTimeout(function () {
                nextSequence();
              },1000);
            }
}


else{
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    } ,200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function startOver()
{
  gamePattern=[];
  start = false;
  level = 0;
}

function nextSequence()
{
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+ level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
function playSound(name)
{
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor)
{
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
      $("#" + currentColor).removeClass("pressed");
  }, 100);
}
