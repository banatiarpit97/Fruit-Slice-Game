$(document).ready(function () {
$(".fruitDiv").hide();
var lives;
var playing = false;
var score = 0;
    var allFruits = ['fruit1.jpg', 'fruit2.jpg', 'fruit3.png', 'fruit4.jpg', 'fruit5.png']
var fruitsContainerWidth = $(".fruitsContainer").width();
var fruitsContainerHeight = $(".fruitsContainer").height();
var fruitsContainerLeft = document.querySelector(".fruitsContainer").offsetLeft;
var fruitsContainerTop = document.querySelector(".fruitsContainer").offsetTop;

var interval;
var fruitHeight = $(".fruitDiv").height();
var fruitWidth = $(".fruitDiv").width();
var currentTop;
var speed;
var initialPos = 0 - fruitHeight;
console.log(fruitsContainerTop, fruitHeight, initialPos)

$(window).resize(function () {
    fruitsContainerWidth = $(".fruitsContainer").width();
    fruitsContainerHeight = $(".fruitsContainer").height();
    fruitsContainerLeft = document.querySelector(".fruitsContainer").offsetLeft;
    fruitsContainerTop = document.querySelector(".fruitsContainer").offsetTop;
    fruitHeight = $(".fruitDiv").height();
    fruitWidth = $(".fruitDiv").width();
    initialPos = fruitsContainerTop - fruitHeight;
})
$(".startGame").click(function () {
    if (playing == true) {
        location.reload();
    }
    else {
        playing = true;
        score = 0;
        lives = 3
        $(".fruitsContainer").css("background", "white");
        $(".gameOverMessageDiv").addClass("hidden");
        $(".startGame").hide();
        $(".pause_restart").removeClass("hidden");
        $(".scoreCount").html(score);
        getLives();
        getFruits();
    }
});
$(".pause").click(function () {
    if (playing) {
        clearInterval(interval);
        playing = false;
        $(this).html("Resume");
    }
    else {
        interval = setInterval(moveFruits, speed);
        playing = true;
        $(this).html("Pause");
    }
});
$(".restart").click(function () {
    restart();
});
var getFruits = function () {
    if (lives) {
        $(".fruit").attr("src", 'img/' + allFruits[Math.floor(5 * Math.random())])
            $(".fruitDiv").css("left", Math.floor((Math.random() * ((fruitsContainerWidth - 100) - (fruitWidth) + 1) + (fruitWidth))));
            $(".fruitDiv").css("top", initialPos);
            $(".fruitDiv").show();
            speed = Math.floor(Math.random() * (70 - (150) + 1) + (150));
            interval = setInterval(moveFruits, speed);
        
    }
    else {
        playing = false;
        $(".fruitsContainer").css("background", "linear-gradient(#f3ca6b, #f3706c)")
        $(".gameOverMessageDiv").removeClass("hidden");
        $(".pause_restart").addClass("hidden");
        $(".startGame").html("Play Again");
        $(".startGame").show();
    }
}
$(".fruitDiv").mouseover(function () {
    if (playing) {
        score += 1;
        $(".scoreCount").html(score);
        $(".sliceAudio")[0].play();
        $(this).hide("explode",300);
        // $(this).hide();
        clearInterval(interval);
        setTimeout(() => {
            getFruits();            
        }, 300);
    }
});
// $(".fruit").mouseover(function(){
// 	score +=1;
// 	$(".scoreCount").html(score);
// 	$(".sliceAudio")[0].play();
// 	$(".fruitDiv").addClass("magictime vanishOut");
//     clearInterval(interval);
// 	setTimeout(function(){
// 	$(".fruitDiv").hide()
// 	$(".fruitDiv").removeClass("magictime vanishOut")
// 	getFruits();
// 	}, 150);
var getLives = function () {
    $(".livesLeft").html("");
    for (i = 0; i < lives; i++) {
        $(".livesLeft").removeClass("hidden").append('<span class="fa fa-heart"></span>');
    }
}
function moveFruits() {
    currentTop = $(".fruitDiv").position().top;
    currentTop += 20;
    $(".fruitDiv").css("top", currentTop);
    if ((currentTop) >= fruitsContainerHeight) {
        CheckDownContact();
        return;
    }
}
function CheckDownContact() {
    clearInterval(interval);
    $(".fruitDiv").hide();
    lives--;
    getLives();
    getFruits();
}
function restart() {
    playing = true;
    clearInterval(interval)
    score = 0;
    $(".scoreCount").html(score);
    lives = 3;
    getLives();
    getFruits();
}
})