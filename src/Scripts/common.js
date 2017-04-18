import {drawRainbowBall} from "./utility.js";

// return an object that can draw itself and return its read-only state on demand
const drawAndInfo = (state) => ({

	// draw a ball on the canvas after following style specified
	draw(style) {

		// use custom function for rainbow style
		if (style === "rainbow") {
			drawRainbowBall(state, state.radius);
			return;
		}

		// stroke or fill
		const ctx = state.context;

		ctx.beginPath();
		ctx.lineWidth = 10;

		ctx[`${style}Style`] = state.color;
		
		ctx.arc(state.posX, state.posY, state.radius, 0, 2 * Math.PI);
		ctx[style]();
	},

	get state () {
		return state;
	}
});

export {drawAndInfo};