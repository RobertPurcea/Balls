import {random} from "./utility.js";
import {drawAndInfo} from "./common.js";

// return an object that can modify it's given state position through keypress
const keyboardControlled = (state) => ({
	setControls(up, right, down, left) {
		document.addEventListener("keydown", (e) => {
			switch (e.key) {
			case up:
				state.posY -= state.vel;
				break;
			case down:
				state.posY += state.vel;
				break;
			case right: 
				state.posX += state.vel;
				break;
			case left:
				state.posX -= state.vel;
				break;
			}
		});
	}
});

// define Player object factory
export const Player = (canvas, ctx) => {
	const state = {
		color: "black",
		posX: random(0, canvas.width),
		posY: random(0, canvas.height),
		vel: 20,
		radius: 10,
		context : ctx,
		lives : 3, 
		isHurt : false
	};

	return Object.assign({}, drawAndInfo (state), keyboardControlled (state), {

		//	prevent the Player ball from going past the canvas margins
		update() {
			if(state.posX < 0 + state.radius) {
				state.posX = 0 + state.radius;
			}
			if(state.posY < state.radius) {
				state.posY = state.radius;
			}
			if(state.posY > canvas.height - state.radius) {
				state.posY = canvas.height - state.radius;
			}
			if(state.posX > canvas.width - state.radius) {
				state.posX = canvas.width - state.radius;
			}
		},

		loseLife () {
			state.lives -= 1;
		},

		setColor(color) {
			state.color = color;
		}
	});
};