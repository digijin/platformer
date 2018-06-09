import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const TYPE = "Rectangle";
export const behavior = {
	customDisplayObject: props => new PIXI.Graphics(),
	customApplyProps: function(instance, oldProps, newProps) {
		let {
			fill,
			x,
			y,
			width,
			height,
			border,
			borderColor,
			alpha
		} = newProps;
		// this.cacheAsBitmap = false;
		if (alpha == undefined) {
			alpha = 1;
		}
		instance.clear();
		if (fill) {
			instance.beginFill(fill, alpha);
		}
		instance.lineStyle(border, borderColor);
		instance.drawRect(x, y, width, height);
		instance.endFill();
		// this.cacheAsBitmap = true;
	}
};
export default CustomPIXIComponent(behavior, TYPE);
