import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const TYPE = "Line";
export const behavior = {
	customDisplayObject: props => new PIXI.Graphics(),
	customDidAttach: instance => {},
	customApplyProps: function(instance, oldProps, newProps) {
		let { x, y, width, height, lineWidth, color } = newProps;
		// this.cacheAsBitmap = false;
		instance.clear();
		instance.lineStyle(lineWidth, color);
		instance.moveTo(x, y);
		instance.lineTo(x + width, y + height);
	}
};
export default CustomPIXIComponent(behavior, TYPE);
