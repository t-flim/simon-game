
var level = 0;
var started = false;
var gameTitle = $("#level-title");

var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

$("#level-title").on("click", function() {
    if (!started) {
        gameTitle.html("Level " + level);
        started = true;
        setTimeout(function() {
            nextSequence();
        }, 500);
    } else {
        replay();
    }
})

$(".btn").on("click", function(event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    
    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
})

function nextSequence() {
    gameTitle.html("Level " + level);
    level++;
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);
    
    buttonAnimation(randomChosenColour);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
                userClickedPattern = [];    
            }, 1000);
        }
    } else {
        gameOver();
    }
}

function replay() {
    console.log("new feature coming soon..");
    
}

function gameOver() {
    playSound("wrong");
    gameTitle.html("Game Over, <span id='high-light'>&#062;Press Me&#060;</span> to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    startOver();
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
    userClickedPattern = [];
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function buttonAnimation(currentColour) {
    $("#" + currentColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(currentColour);
}

function animatePress(currentColour) {
    var activeButton = $("#" + currentColour);
    activeButton.addClass("pressed");

    setTimeout(function() {
        activeButton.removeClass("pressed");
    }, 100)
}