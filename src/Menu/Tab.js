import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const TYPE = "Tab";
class Tab extends PIXI.Graphics {}
export const behavior = {
	customDisplayObject: () => new Tab(),
	customDidAttach: instance => {
		// instance.buttonMode = true;
		// instance.interactive = true;
		instance.on("mouseover", instance.onMouseOver);
		instance.on("mouseout", instance.onMouseOut);
		instance.on("mouseup", instance.onMouseUp);
		instance.on("mousedown", instance.onMouseDown);
		instance.on("click", instance.onClick);
	},
	customApplyProps: function(instance, oldProps, newProps) {
		instance.onMouseOver = newProps.onMouseOver;
		instance.onMouseOut = newProps.onMouseOut;
		instance.onMouseDown = newProps.onMouseDown;
		instance.onMouseUp = newProps.onMouseUp;
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
			interactive,
			sideWidth,
			bottom,
			leftCorner,
			rightCorner,
		} = newProps;
		// this.cacheAsBitmap = false;
		if (alpha == undefined) {
			alpha = 1;
		}
		instance.clear();
		if (fill !== undefined) {
			instance.beginFill(fill, alpha);
		}
		instance.lineStyle(border, borderColor);
		if (leftCorner) {
			instance.moveTo(x, y);
		} else {
			instance.moveTo(x + sideWidth / 2, y - height / 2);
		}
		instance.lineTo(x + sideWidth, y - height);
		instance.lineTo(x + sideWidth + width, y - height);
		if (rightCorner) {
			instance.lineTo(x + sideWidth + width + sideWidth, y);
		} else {
			instance.lineTo(
				x + sideWidth + width + sideWidth / 2,
				y - height / 2
			);
		}

		if (!bottom) {
			instance.lineStyle(0);
		}
		instance.lineTo(x + sideWidth + width, y);
		instance.lineTo(x + sideWidth, y);
		if (leftCorner) {
			instance.lineTo(x, y);
		} else {
			instance.lineTo(x + sideWidth / 2, y - height / 2);
		}
		instance.endFill();

		instance.buttonMode = buttonMode;
		instance.interactive = interactive;
		// console.log(instance);
		// instance.mouseover = () => {
		// 	console.log("yolo");
		// };
		// this.cacheAsBitmap = true;
	},
};
export default CustomPIXIComponent(behavior, TYPE);
