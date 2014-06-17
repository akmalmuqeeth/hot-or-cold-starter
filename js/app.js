
$(document).ready(function(){

	startNewGame();
	console.log(secretNumber);
	
	/*--- Display information modal box ---*/
	$(".what").click(function(){
		$(".overlay").fadeIn(1000);

	});

	/*--- Hide information modal box ---*/
	$("a.close").click(function(){
		$(".overlay").fadeOut(1000);
	});

	$("a.new").click(function() {
		startNewGame();
		console.log(secretNumber);	
	});

	$( "form" ).submit(function( event ) {
		
		var guess = +$("#userGuess").val();

		if(isNaN(guess) || (guess <1 || guess > 100)) {
			$("#feedback").text("Invalid input! Enter number between 1 and 100.");
		} else {
			var feedback = calculateFeedback(guess);
			$("#feedback").text(feedback);
			//increment counter
			$("#count").text(counter++);
			//update guess list
			$("#guessList").append($("<li>"+guess+":"+feedback+"</li>"))
			$("#userGuess").val('');
		}

	event.preventDefault();
});
});

var secretNumber;
var counter = 1;

function startNewGame() {

	secretNumber = getRandomInt(1,100);
	//update counter
	counter = 1;
	$("#count").text("0");

	$("#guessList").empty();

	$("#userGuess").val('');

	$("#feedback").text("Make your Guess!");
}

function calculateFeedback(guess) {

	var feedback = ""
	
	if(guess == secretNumber) {
		feedback = "BINGO!"
	} else {
		var away = (secretNumber > guess) ? secretNumber - guess : guess - secretNumber;
		if(away >= 50){
			feedback = "ice cold"
		}
		else if(away > 30 && away < 50) {
			feedback = "cold"
		} else if (away > 20 && away <= 30) {
			feedback = "warm"
		} else if (away > 10 && away <= 20) {
			feedback = "hot"
		} else if (away >= 1 && away <= 10) {
			feedback = "very hot"
		}
	}
	return feedback;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
 function getRandomInt(min, max) {
 	return Math.floor(Math.random() * (max - min + 1)) + min;
 }