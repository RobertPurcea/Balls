// polyfills, webpack
import "babel-polyfill";
if (module.hot) module.hot.accept();

import {doBallsTouch} from "./Scripts/utility.js";
import {Ball} from "./Scripts/Ball.js";
import {Player} from "./Scripts/Player.js";

// setup full size canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// setup player
let player = Player(canvas, ctx);
player.setControls("w", "d", "s", "a");

// initialize ball collection
let ballCollection = createBallCollection(20,3); 


function loop() {
	// clear canvas before every drawing
	ctx.clearRect(0,0,canvas.width, canvas.height);

	// update player position and draw 
	player.update();
	player.draw("stroke");

	// draw each ball and detect collisions between player and the other balls
	ballCollection.forEach(ball => {
		ball.update();

		if ( ball.evil ) {
			ball.draw("rainbow");
		} else {
			ball.draw("fill");
		}

		// if an "evil" ball touches the player, the player loses a life
		// if a normal ball touches the player, the ball is deleted from the set 
		if(doBallsTouch(player.state, ball.state)) {
			if(ball.evil) {
				player.setColor("red");

				if (!ball.isOnThePlayer) {
					ball.isOnThePlayer = true;
					player.loseLife();
				}

			} else {
				ballCollection.delete(ball);
			}
		} else { 
			player.setColor("black");
			ball.isOnThePlayer = false;
		}
	});

	// if the player got 0 lives left, stop the game
	if(player.state.lives) {
		requestAnimationFrame(loop);
	} else {
		cancelAnimationFrame(animationFrameId);
	}
}

// start game
let animationFrameId = requestAnimationFrame(loop);


// create a set of Ball elements
function createBallCollection (ballNumber, evilBallNumber) {
	let ballCollection = new Set();

	for (let i = 0; i < ballNumber + evilBallNumber; i++) {
		let ball = Ball(canvas, ctx);
		ball.evil = (i >= ballNumber) ? true : false;
		ballCollection.add(ball);
	}

	return ballCollection;
}