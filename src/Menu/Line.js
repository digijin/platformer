import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const TYPE = "Line";
class Line extends PIXI.Graphics {}
export const behavior = {
	customDisplayObject: () => new Line(),
	// customDidAttach: instance => {},
	customApplyProps: function(instance, oldProps, newProps) {
		let { x, y, width, height, lineWidth, color } = newProps;
		if (!width) {
			width = 0;
		}
		if (!height) {
			height = 0;
		}
		// this.cacheAsBitmap = false;
		instance.clear();
		instance.lineStyle(lineWidth, color);
		instance.moveTo(x, y);
		instance.lineTo(x + width, y + height);
	},
};
export default CustomPIXIComponent(behavior, TYPE);
