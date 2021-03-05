// Objects
var ball;
var player1, player2;

// Time values
var intialFrame = 0;
var currentFrame = 0;

// Screen Variables
base_values = {
	"screenWidth": 800,
	"screenHeight":  600,
	"ballSize":  16,
	"playerWidth":  16,
	"playerHeight":  96,
	"playerDistanceToWall":  16
}

/*ballSize = (base_values);
playerWidth = 16;
playerHeight = 96;
playerDistanceToWall = 16;*/

// Other variables
var ballDirX;
var ballDirY;

var score1 = score2 = 0;
var state = 0;

var ballMovementAllowed;
var playerMovementAllowed;

function ballReset() {
	// Centralize ball on the screen
	ball.setPos(
		screen.width/2 - ball.width / 2, 
		screen.height/2 - ball.height / 2
	);

	// Random values for the ball direction
	ballDirX = Math.random() >= 0.5 ? 1 : -1;
	ballDirY = randomInt(60, 140) / 100;
}

function playerReset(player) {
	player.setPos(player.posX, screen.height / 2 - player.height / 2);
}

function gameSetup() {
	ballReset();
	playerReset(player1);
	playerReset(player2);
	
	initialFrame = currentFrame;
	customWaitThen(setupSleepTime, () => {
		state = 1;
	})
}

function gameRun() {

	// Ball behavior
	
	// Check for score
	bLimitScreenX = ball.isTouchingX(screen);
	if(bLimitScreenX % 5 == 0) { // If out of bounds in X axis
		if(ballDirX == 1) { // Player 1 scored
			score1++;
		} else { // Player 2 scored
			score2++;
		}
		console.log("Placar: " + score1 + "x" + score2);
		
		intialFrame = currentFrame;
		state = 2;
	}

	// Ball limits
	bLimitScreenY = ball.isInsideY(screen);
	if(bLimitScreenY % 5 == 0) {
		ballDirY *= -1;
	}

	bLimitPlayer1X = ball.isTouchingX(player1);
	bLimitPlayer1Y = ball.isTouchingY(player1);
	if(ball.isTouching(player1)) {
		
		// Touching the Right of player 1
		if(bLimitPlayer1X == 4) {
			ballDirX = 1;
		}
		
		// Touching the Top of player 1
		if(bLimitPlayer1Y == 1){ 
			ballDirY = -1;
		}
		
		// Touching the Bottom of player 1
		if(bLimitPlayer1Y == 4){
			ballDirY = 1;
		}
	}

	bLimitPlayer2X = ball.isTouchingX(player2);
	bLimitPlayer2Y = ball.isTouchingY(player2);
	if(ball.isTouching(player2)) {
		// Touching the Left of player 2
		if(bLimitPlayer2X == 1) {
			ballDirX = -1;
		}
		
		// Touching the Top of player 2
		if(bLimitPlayer2Y == 1){ 
			ballDirY = -1;
		}
		
		// Touching the Bottom of player 2
		if(bLimitPlayer2Y == 4){
			ballDirY = 1;
		}
	}

	// Player limits

	// If Player 1 is reaching out of bounds in Y axis
	p1limitScreen = player1.isInsideY(screen);
	if(p1limitScreen == 5) {
		player1.walkUp();
	} else if(p1limitScreen == 0) {
		player1.walkDown();
	}
 
	// If Player 1 is reaching out of bounds in Y axis
	p2limitScreen = player2.isInsideY(screen);
	if(p2limitScreen == 5) {
		player2.walkUp();
	} else if (p2limitScreen == 0) {
		player2.walkDown();
	}
}

function scorePlusState() {
	movementAllowed = false;
	if(currentFrame - intialFrame >= 
		(scorePlusSleepTime/1000 * getFrameRate()) &&
		getFrameRate() > 10) { // Make sure FPS is not too low
			movementAllowed = true;
			state = 1;
			ballReset();
			playerReset(player1);
			playerReset(player2);
		}
}

function drawNet() {
	let netX = screen.width/2 - netWidth / 2;
	let netY = 0;

	while(netY < screen.height) {
		noStroke();
		fill(255);
		rect(netX, netY, netWidth, netHeight, radius, radius, radius, radius);
		netY += netHeight + netSpacing;
	}
}

function drawObjects() {
	// Background objects
	background(16);
	drawNet();

	let txtSize = 85;
	textSize(txtSize);

	text(score1, 
		(screen.width / 4) - (txtSize * (score1 + '').length / 4), // Centralizing the text
		txtSize);
	text(score2, 
		(3 * screen.width / 4) - (txtSize * (score2 + '').length / 4), // Centralizing the text
		txtSize);

	// Foreground objects

	player1.draw();
	player2.draw();

	ball.draw();
}

function doMovementProcessing() {
	// Ball movement
	if(ballMovementAllowed) {
		ball.walkX(ballDirX);
		ball.walkY(ballDirY);
	}

	if(playerMovementAllowed) {

		// Player 1 keys
		if(player1controllable) {
			if(keyIsDown(87)) // W
				player1.walkUp();
			if(keyIsDown(83)) // S
				player1.walkDown();
		}

		// Player 2 keys
		if(player2controllable) {
			if(keyIsDown(UP_ARROW))
			player2.walkUp();
		if(keyIsDown(DOWN_ARROW))
			player2.walkDown();
		}

		// Player 1 automated movement
		if(player1bot) {
			if(ballMovementAllowed) {
				errorRate = randomInt(-bot1ErrorRange/2, bot1ErrorRange/2);
			} else {
				errorRate = 0;
			}
			if((player1.posY + (player1.height / 2)) < ball.posY + ball.height/2 + errorRate)
				player1.walkDown();
			if((player1.posY + (player1.height / 2)) > ball.posY + ball.height/2 + errorRate)
				player1.walkUp();
		}
		
		// Player 2 automated movement
		if(player2bot) {
			if(ballMovementAllowed) {
				errorRate = randomInt(-bot2ErrorRange/2, bot2ErrorRange/2);
			} else {
				errorRate = 0;
			}
			if((player2.posY + (player2.height / 2)) < ball.posY + ball.height/2 + errorRate)
				player2.walkDown();
			if((player2.posY + (player2.height / 2)) > ball.posY + ball.height/2 + errorRate)
				player2.walkUp();
		}
	}
}