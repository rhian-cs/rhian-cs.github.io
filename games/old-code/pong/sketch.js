
function setup() {
	screen = new RectangularModel(0, 0, screenWidth, screenHeight);
	screen.hitbox = new Hitbox(8, 0, -8, 0);

	createCanvas(screen.width, screen.height);
	
	ball = new RectangularModel(-ballSize, -ballSize, ballSize);
	ball.speed = ballSpeed;
	ball.setDefaultColor(255, 255, 255);
	ball.radius = radius;

	player1 = new RectangularModel(playerDistanceToWall, -playerHeight, playerWidth, playerHeight);
	player1.speed = ballSpeed * percentSpeedPlayerToBall;
	player1.setDefaultColor(255, 255, 255);
	player1.radius = radius;

	player2 = new RectangularModel(screen.width - playerWidth - playerDistanceToWall, player1.posY, playerWidth, playerHeight);
	player2.speed = ballSpeed * percentSpeedPlayerToBall;
	player2.setDefaultColor(255, 255, 255);
	player2.radius = radius;
	
	frameRate(60);
	
}

function draw() {
	drawObjects();
	doMovementProcessing();

	switch(state) {
		case 0:
			ballMovementAllowed = false;
			playerMovementAllowed = false;
			gameSetup();
			break;
			case 1:
			ballMovementAllowed = true;
			playerMovementAllowed = true;
			gameRun();
			break;
		case 2:
			ballMovementAllowed = false;
			playerMovementAllowed = true;
			scorePlusState();
	}

	currentFrame++;
}