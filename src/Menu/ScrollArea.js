import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import engineConnect from "../React/engineConnect";

const TYPE = "ScrollArea";
class ScrollArea extends PIXI.Container {}
class Mask extends PIXI.Sprite {}
export const behavior = {
	customDisplayObject: props => {
		const scrollArea = new ScrollArea();
		const mask = new Mask(PIXI.Texture.WHITE);
		scrollArea.addChild(mask);
		scrollArea.mask = mask;
		mask.width = props.width;
		mask.height = props.height;
		// mask.buttonMode = true;
		scrollArea.interactive = true;
		mask.on("click", console.log("yolo"));
		// mask.x = props.x;
		// mask.y = props.y;
		scrollArea.engine = props.engine; //pass reference for later
		return scrollArea;
	},
	customDidAttach: instance => {
		instance.on("mouseover", () => {
			console.log("MO");
			instance.over = true;
		});
		instance.on("mouseout", () => {
			console.log("MOut");
			instance.over = false;
		});
		const onWheel = function(e) {
			console.log("mfw", instance.over, this.over);
		};
		instance.onWheel = onWheel.bind(instance);
		instance.engine.canvas.addEventListener("wheel", instance.onWheel);
	},
	customWillDetach: instance => {
		instance.engine.canvas.removeEventListener("wheel", instance.onWheel);
	}

	// customDidAttach: instance => {
	// 	// instance.buttonMode = true;
	// 	// instance.interactive = true;
	// 	instance.on("mouseover", instance.onMouseOver);
	// 	instance.on("mouseout", instance.onMouseOut);
	// 	instance.on("mouseup", instance.onMouseUp);
	// 	instance.on("mousedown", instance.onMouseDown);
	// 	instance.on("click", instance.onClick);
	// },
	// customApplyProps: function(instance, oldProps, newProps) {
	// 	instance.onMouseOver = newProps.onMouseOver;
	// 	instance.onMouseOut = newProps.onMouseOut;
	// 	instance.onMouseDown = newProps.onMouseDown;
	// 	instance.onMouseUp = newProps.onMouseUp;
	// 	instance.onClick = newProps.onClick;
	// 	let {
	// 		fill,
	// 		x,
	// 		y,
	// 		width,
	// 		height,
	// 		border,
	// 		borderColor,
	// 		alpha,
	// 		buttonMode,
	// 		interactive
	// 	} = newProps;
	// 	// this.cacheAsBitmap = false;
	// 	if (alpha == undefined) {
	// 		alpha = 1;
	// 	}
	// 	instance.clear();
	// 	if (fill !== undefined) {
	// 		instance.beginFill(fill, alpha);
	// 	}
	// 	instance.lineStyle(border, borderColor);
	// 	instance.drawRect(x, y, width, height);
	// 	instance.endFill();
	//
	// 	instance.buttonMode = buttonMode;
	// 	instance.interactive = interactive;
	// 	// console.log(instance);
	// 	// instance.mouseover = () => {
	// 	// 	console.log("yolo");
	// 	// };
	// 	// this.cacheAsBitmap = true;
	// }
};
export default engineConnect(CustomPIXIComponent(behavior, TYPE));
