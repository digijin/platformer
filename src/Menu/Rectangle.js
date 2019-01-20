import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const TYPE = "Rectangle";
class Rectangle extends PIXI.Graphics {}
export const behavior = {
	customDisplayObject: () => new Rectangle(),
	customDidAttach: instance => {
		// instance.buttonMode = true;
		// instance.interactive = true;
		if(instance.onMouseOver){
			instance.on("mouseover", instance.onMouseOver.bind(instance));
		}
		if(instance.onMouseOut){
			instance.on("mouseout", instance.onMouseOut.bind(instance));
		}
		if(instance.onMouseUp){
			instance.on("mouseup", instance.onMouseUp.bind(instance));
		}
		if(instance.onMouseDown){
			instance.on("mousedown", instance.onMouseDown.bind(instance));
		}
		if(instance.onMouseMove){
			instance.on("mousemove", instance.onMouseMove.bind(instance));
		}
		if(instance.onClick){
			instance.on("click", instance.onClick.bind(instance));
		}
		// instance.getGlobalsPosition = function(){
		// 	let { x, y } = this.position;
		// 	let parent = this.parent;
		// 	while(parent){
		// 		console.log(parent, parent.x, parent.y);
		// 		x += parent.x;
		// 		y += parent.y;
		// 		parent = parent.parent;
		// 	}
		// 	return { x, y };
		// 	// return this.x;
		// }.bind(instance);
	},
	customApplyProps: function(instance, oldProps, newProps) {
		instance.onMouseOver = newProps.onMouseOver;
		instance.onMouseOut = newProps.onMouseOut;
		instance.onMouseDown = newProps.onMouseDown;
		instance.onMouseUp = newProps.onMouseUp;
		instance.onMouseMove = newProps.onMouseMove;
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
			testingId,
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
		instance.drawRect(x, y, width, height);
		instance.endFill();

		instance.buttonMode = buttonMode;
		instance.interactive = interactive;
		instance.testingId = testingId;
		// console.log(instance);
		// instance.mouseover = () => {
		// 	console.log("yolo");
		// };
		// this.cacheAsBitmap = true;
	},
};
export default CustomPIXIComponent(behavior, TYPE);
