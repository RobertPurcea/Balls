// get a random variable between min and max that is different from deniedValue
const random = (min, max, deniedValue) => {	
	// get random value
	let randomValue = Math.floor(Math.random() * (max - min)) + min;

	// if the random value is different from the deniedValue return it else pick another randomValue
	return randomValue !== deniedValue ?  randomValue : random(min, max, deniedValue);
};

const doBallsTouch = (state1, state2) => {
	// calculate the distance between two points 
	const distanceBetweenCenters = Math.sqrt((state2.posX - state1.posX) ** 2 + (state2.posY - state1.posY) ** 2);

	// substract the radius of each ball to determine if their margins touch 
	const distanceBetweenBalls = distanceBetweenCenters - state1.radius - state2.radius;

	return distanceBetweenBalls <= 0 ? true : false;
};

const drawRainbowBall = (state, radius) => {
	const ctx = state.context;
	
	ctx.beginPath();
	ctx.lineWidth = 5;

	ctx.strokeStyle = `rgb(${random(0,256)}, ${random(0,256)}, ${random(0,256)})`;
	ctx.arc(state.posX, state.posY, radius, 0, 2 * Math.PI);

	ctx.stroke();
	if	(radius >= 5) {
		drawRainbowBall(state, radius - ctx.lineWidth);
	}
};

// const drawLives()
export {random, doBallsTouch, drawRainbowBall};






























// // return canvas element. If not found, throw error
// function getCanvas() {
// 	if ( document.querySelector("canvas") ) {
// 		return document.querySelector("canvas");
// 	} else {
// 		throw( new Error("No canvas detected, please add a canvas element to your html") );
// 	}
// }