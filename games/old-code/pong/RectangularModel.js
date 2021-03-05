class RectangularModel {

	constructor(startPosX, startPosY, width, height=width) {
		this.posX = startPosX;
		this.posY = startPosY;

		this.width = width;
		this.height = height;
		
		// Single square hitbox		
		this.hitbox = new Hitbox(0, 0, 0, 0);

		this.smooth = false;
		this.radius = 0;

		this.speed = 1;
	}


	// Getters

	getEpicentreX() {
		return this.width / 2;
	}

	getEpicentreY() {
		return this.height / 2;
	}

	getRootDistanceX(pointX) {
		return this.posX - pointX;
	}
	getRootDistanceY(pointY) {
		return this.posY - pointY;
	}


	// Setters
	
	setDefaultColor(colorR, colorG=255, colorB=255) {
		this.colorR=colorR;
		this.colorG=colorG;
		this.colorB=colorB;
	}

	setPos(posX, posY) {
		this.posX = posX;
		this.posY = posY;
	}


	// Movement methods

	walkX(direction, speed=this.speed) {
		this.posX += speed * direction;
	}
	walkY(direction, speed=this.speed) {
		this.posY += speed * direction;
	}

	walkUp(speed=this.speed) {
		this.walkY(-1, speed);
	}
	walkDown(speed=this.speed) {
		this.walkY(1, speed);
	}
	walkRight(speed=this.speed) {
		this.walkX(-1, speed);
	}
	walkLeft(speed=this.speed) {
		this.walkX(1, speed);
	}


	// Collision calculation methods

	isTouchingX(otherObj) {
		return Hitbox.isOverlappingX(this, otherObj);
	}

	isTouchingY(otherObj) {
		return Hitbox.isOverlappingY(this, otherObj);
	}

	isTouching(otherObj) {
		return (this.isTouchingX(otherObj) % 5 != 0) && 
			(this.isTouchingY(otherObj) % 5 != 0);
	}

	isInsideX(otherObj) {
		return Hitbox.isInsideX(this, otherObj);
	}

	isInsideY(otherObj) {
		return Hitbox.isInsideY(this, otherObj);
	}

	isInside(otherObj) {
		return (this.isInsideX(otherObj) % 5 != 0) && 
			(this.isInsideY(otherObj) % 5 != 0);
	}
	

	// Draw Method
	draw(colorR, colorG, colorB) {

		if(arguments.length == 0) // No color was passed
			if(this.colorR == undefined) {// No default color either
				colorR = colorG = colorB = 255;
			} else {
				colorR = this.colorR;
				colorG = this.colorG;
				colorB = this.colorB;
			}
		else if(arguments.length == 1) { // If only the first paramater was passed
			colorG = ColorR;
			colorB = ColorR;
		}
		
		strokeWeight(0);
		fill(colorR, colorG, colorB);
		rect(this.posX, this.posY, this.width, this.height, this.radius, this.radius, this.radius, this.radius);
		fill(255); // Reset brush to normal
		strokeWeight(4);
	}
}