$(".fruitDiv").hide();
var lives;
var playing = false;
var score = 0;
var allFruits = [1,2,3,4,5]
var fruitsContainerWidth = $(".fruitsContainer").width();
var fruitsContainerHeight = $(".fruitsContainer").height();
var interval;
var fruitHeight = $(".fruit").height();
var currentTop;
var speed = 55;

$(window).resize(function(){
	var a = $(window).height();
	$(".container-fluid").css("height", a);
})

$(".startGame").click(function(){
	if(playing == true){
		location.reload();

	}
	else{
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

$(".pause").click(function(){
	if(playing){
		clearInterval(interval);
		playing = false;
		$(this).html("Resume");
    }
    else{
       interval = setInterval(moveFruits, speed);
       playing = true;	
	   $(this).html("Pause");

    }		
});

$(".restart").click(function(){
	restart();
});

var getFruits = function(){
   if(lives){
	$(".fruit").attr("src", 'img/fruit'+allFruits[Math.floor(5*Math.random())]+'.jpg').css("left",Math.floor((Math.random() * ((fruitsContainerWidth-100) - (0)+1)+(0))));
    $(".fruit").css("top", 0);
    $(".fruitDiv").show();
    interval = setInterval(moveFruits, speed);
  }
  else{
  	playing = false;
  	$(".fruitsContainer").css("background", "linear-gradient(#f3ca6b, #f3706c)")
  	$(".gameOverMessageDiv").removeClass("hidden");
	$(".pause_restart").addClass("hidden");
  	$(".startGame").html("Play Again");
  	$(".startGame").show();
  }

} 


$(".fruit").mouseover(function(){
	if(playing){
	score +=1;
	$(".scoreCount").html(score);
	$(".sliceAudio")[0].play();
	$(".fruitDiv").hide();
    clearInterval(interval);
	getFruits();
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


var getLives = function(){
	        $(".livesLeft").html("");
			for(i=0;i<lives;i++){
		    $(".livesLeft").removeClass("hidden").append('<span class="fa fa-heart"></span>');
	        }
}

function moveFruits(){
	currentTop = $(".fruit").position().top;
	currentTop+=20;
	$(".fruit").css("top", currentTop);
    if((currentTop+fruitHeight)>=fruitsContainerHeight){
       CheckDownContact();
	}

}

function CheckDownContact(){
    clearInterval(interval);
    $(".fruitDiv").hide();
	lives--;
	getLives();
	getFruits();

}

function restart(){
	playing = true;
	clearInterval(interval)
   score = 0;
	$(".scoreCount").html(score);
   lives = 3;
   getLives();
   getFruits();
}


