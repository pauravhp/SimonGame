buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var randomVariable;
var randomChosenColor;
var userChosenColor;
var level = 0;
var userLevel = 1;
var firstPress = 0;
async function nextSequence() {
	level = level + 1;

	$("#level-title").text("Level " + level);
	if (level === 1) {
		userClickedPattern = [];
	}
	randomVariable = Math.floor(Math.random() * (4 - 0) + 0);
	randomChosenColor = buttonColors[randomVariable];
	gamePattern.push(randomChosenColor);
	await new Promise((resolve) => setTimeout(resolve, 750));
	for (i in gamePattern) {
		$("#" + gamePattern[i])
			.animate({ opacity: 0.5 })
			.animate({ opacity: 1 });
		// console.log("Printed " + i);
		playSound(gamePattern[i]);
		await new Promise((resolve) => setTimeout(resolve, 750));
	}

	// $("#" + randomChosenColor).click(function () {
	// 	$("#" + randomChosenColor)
	// 		.animate({ opacity: 0.5 })
	// 		.animate({ opacity: 1 });
	// 	playSound(randomChosenColor);
	// });

	// nextSequence();
}

$(".btn").click(function (event) {
	console.log(event.target.id);
	userChosenColor = event.target.id;
	userClickedPattern.push(userChosenColor);
	playSound(userChosenColor);
	animatePress(userChosenColor);

	if (
		userClickedPattern.length === gamePattern.length &&
		userClickedPattern !== []
	) {
		// console.log("Trying to go to next level " + userLevel + ", " + level);
		progressLevel(userLevel);
	}
});

function playSound(name) {
	beat = new Audio("sounds/" + name + ".mp3");
	beat.play();
}

function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
	// $("#" + currentColor).removeClass("pressed");
}

function progressLevel(userLevel) {
	// if (userLevel === level) {
	if (arrayEquals(userClickedPattern, gamePattern) === true) {
		userClickedPattern = [];
		userLevel++;
		// console.log("User's Level" + userLevel);
		nextSequence();
	} else {
		$("body").addClass("game-over");
		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);
		playSound("wrong");
		resetGame();
	}
	// }
}

function arrayEquals(a1, a2) {
	if (a1.length !== a2.length) {
		return false;
	}
	for (i in a1) {
		if (a1[i] !== a2[i]) {
			return false;
		}
	}
	return true;
}

function resetGame() {
	console.log("Game Resetted");
	level = 0;
	userLevel = 1;
	gamePattern = [];
	userClickedPattern = [];
	firstPress = 0;
	$("#level-title").text("Game Over, Press Any Key to Restart");
}

$(document).keypress(function (event) {
	firstPress = firstPress + 1;
	if (firstPress === 1) {
		$("#level-title").text("Level " + level);
		nextSequence();
	}
	console.log(event.key + firstPress);
});
