class Hitbox {
	constructor(startX, startY, endX, endY) {
		this.startX = startX;
		this.endX = endX;

		this.startY = startY;
		this.endY = endY;
	}

	// static checkBoundariesX(leftA, rightA, leftB, rightB) {
	// 	return (
	// 		/*// 1: false - Under
	// 		leftA > botB
	// 		leftA > leftB
	// 		rightA > botB
	// 		rightA > leftB*/
	// 		// 2: true - At the right corner
	// 		(leftA <= rightB &&
	// 		leftA <= leftB &&
	// 		rightA <= rightB &&
	// 		rightA >= leftB) ||

	// 		// 3: true - Inside X
	// 		(leftA <= rightB &&
	// 		//leftA <= leftB &&
	// 		//rightA >= rightB &&
	// 		rightA >= leftB) ||

	// 		// 4: true - At the left corner
	// 		(leftA <= rightB &&
	// 		leftA >= leftB &&
	// 		rightA >= rightB &&
	// 		rightA >= leftB)
	// 		/*// 5: false - To the Left
	// 		leftA < rightB
	// 		leftA < leftB
	// 		rightA < rightB
	// 		botA < leftB*/
	// 	);
	// }

	static checkBoundariesX(leftA, rightA, leftB, rightB) {

		// 0: false - To the left
		if ((leftA < rightB) &&
			(leftA < leftB) &&
			(rightA < rightB) &&
			(rightA < leftB)) { 
				return 0;
		}

		// 1: true - Touching to the left
		if ((leftA <= rightB) &&
			(leftA <= leftB) &&
			(rightA <= rightB) &&
			(rightA >= leftB)) {
				return 1;
		}

		// 2: true - Inside (Smaller)
		if ((leftA <= rightB) &&
			(leftA >= leftB) &&
			(rightA <= rightB) &&
			(rightA >= leftB)) {
				return 2;
		}

		// 3: true - Inside (Bigger)
		if ((leftA <= rightB) &&
			(leftA <= leftB) &&
			(rightA >= rightB) &&
			(rightA >= leftB)) {
				return 3;
		}
		
		// 4: true - Touching to the right
		if ((leftA <= rightB) &&
			(leftA >= leftB) &&
			(rightA >= rightB) &&
			(rightA >= leftB)) {
				return 4;
		}

		// 5: false - To the right
		if ((leftA > rightB) &&
			(leftA > leftB) &&
			(rightA > rightB) &&
			(rightA > leftB)) {
				return 5;
		}
	}

	static checkBoundariesY(topA, botA, topB, botB) {

		// 0: false - Over
		if ((topA < botB) &&
			(topA < topB) &&
			(botA < botB) &&
			(botA < topB)) { 
				return 0;
		}

		// 1: true - Touching at the top
		if ((topA <= botB) &&
			(topA <= topB) &&
			(botA <= botB) &&
			(botA >= topB)) {
				return 1;
		}

		// 2: true - Inside (Smaller)
		if ((topA <= botB) &&
			(topA >= topB) &&
			(botA <= botB) &&
			(botA >= topB)) {
				return 2;
		}

		// 3: true - Inside (Bigger)
		if ((topA <= botB) &&
			(topA <= topB) &&
			(botA >= botB) &&
			(botA >= topB)) {
				return 3;
		}
		
		// 4: true - Touching at the bottom
		if ((topA <= botB) &&
			(topA >= topB) &&
			(botA >= botB) &&
			(botA >= topB)) {
				return 4;
		}

		// 5: false - Under
		if ((topA > botB) &&
			(topA > topB) &&
			(botA > botB) &&
			(botA > topB)) {
				return 5;
		}
	}

	static isOverlappingX(objA, objB) {
		let leftA = objA.posX + objA.hitbox.endX;
		let rightA = objA.posX + objA.width + objA.hitbox.startX;
		let leftB = objB.posX + objB.hitbox.endX;
		let rightB = objB.posX + objB.width + objB.hitbox.startX;

		return this.checkBoundariesX(leftA, rightA, leftB, rightB);
	}

	static isOverlappingY(objA, objB) {
		let topA = objA.posY + objA.hitbox.startY;
		let botA = objA.posY + objA.height + objA.hitbox.endY;
		let topB = objB.posY + objB.hitbox.startY;
		let botB = objB.posY + objB.height + objB.hitbox.endY;

		return this.checkBoundariesY(topA, botA, topB, botB);
	}

	static isInsideX(objA, objB) {
		let leftA = objA.posX + objA.hitbox.endX;
		let rightA = objA.posX + objA.width + objA.hitbox.startX;
		let leftB = objB.posX + objB.hitbox.endX + objA.width;
		let rightB = objB.posX + objB.width + objB.hitbox.startX - objA.width;

		return this.checkBoundariesX(leftA, rightA, leftB, rightB);
	}

	static isInsideY(objA, objB) {
		let topA = objA.posY + objA.hitbox.startY;
		let botA = objA.posY + objA.height + objA.hitbox.endY;
		let topB = objB.posY + objB.hitbox.startY + objA.height;
		let botB = objB.posY + objB.height + objB.hitbox.endY - objA.height;

		return this.checkBoundariesY(topA, botA, topB, botB);
	}
}