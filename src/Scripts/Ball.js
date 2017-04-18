import {random} from "./utility.js";
import {drawAndInfo} from "./common.js";

// define a Ball object factory
const Ball = (canvas, ctx) => {
	const state = {
		color: `rgb(${random(0,256)}, ${random(0,256)}, ${random(0,256)})`,
		posX: random(20, canvas.width - 20),
		posY: random(20, canvas.height - 20),
		velX: random(-8,8,0),
		velY: random(-8,8,0),
		radius: random(10,20),
		context : ctx, 
		isOnThePlayer : false
	};

	return Object.assign({}, drawAndInfo(state), {
		//	modify the position based on the velocity. Also, deflect the balls back if they touch the canvas margins
		update() {
			if(state.posX < state.radius) {
				state.poX = state.radius;
				state.velX = -state.velX;
			} 
			if(state.posY < state.radius) {
				state.posY = state.radius;
				state.velY = -state.velY;
			}
			if(state.posY > canvas.height - state.radius) {
				state.posY = canvas.height - state.radius;
				state.velY = -state.velY;
			}
			if(state.posX > canvas.width - state.radius) {
				state.posX = canvas.width - state.radius;
				state.velX = -state.velX;
			}

			state.posX += state.velX;
			state.posY += state.velY;
		}
	});
};

export {Ball};