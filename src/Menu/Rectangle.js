import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const TYPE = "Rectangle";
export const behavior = {
	customDisplayObject: props => new PIXI.Graphics(),
	customDidAttach: instance => {
		// instance.buttonMode = true;
		// instance.interactive = true;
		instance.on("mouseover", instance.onMouseOver);
		instance.on("mouseout", instance.onMouseOut);
		instance.on("click", instance.onClick);
	},
	customApplyProps: function(instance, oldProps, newProps) {
		instance.onMouseOver = newProps.onMouseOver;
		instance.onMouseOut = newProps.onMouseOut;
		instance.onClick = newProps.onClick;
		let {
			fill,
			x,
			y,
			width,
			height,
			border,
			borderColor,
			alpha,
			buttonMode,
			interactive
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

		instance.buttonMode = buttonMode;
		instance.interactive = interactive;
		// console.log(instance);
		// instance.mouseover = () => {
		// 	console.log("yolo");
		// };
		// this.cacheAsBitmap = true;
	}
};
export default CustomPIXIComponent(behavior, TYPE);
