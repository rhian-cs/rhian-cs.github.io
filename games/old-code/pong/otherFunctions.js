
function randomInt(limitA, limitB) {
	return Math.round((Math.random() * (limitB - limitA)) + limitA);
}

function customWaitThen(milliseconds, func) {
	if(currentFrame - intialFrame >= 
		(milliseconds/1000 * getFrameRate()) &&
		getFrameRate() > 10) { // Make sure FPS is not too low
		return func();
	}
	return undefined;
}