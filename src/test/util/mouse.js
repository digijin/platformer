// @flow

import { extend, keys, assign } from "lodash";
import ReactTestUtils from "react-dom/test-utils";
import sizzle from "sizzle";

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

let gap = 10;

let mouseEvent = function(
	eventName: string,
	params: Object,
	target = document
) {
	// let target = sizzle("canvas")[0];
	var event = document.createEvent("Event");
	extend(event, params);
	event.initEvent(eventName, true, true);
	target.dispatchEvent(event); //was document
};

let clickSelector = function(selector: string): boolean {
	let elements = sizzle(selector);
	if (elements.length > 0) {
		ReactTestUtils.Simulate.click(elements[0]);
		return true;
	}
	return false;
};
let canvas;

function setCanvas(c) {
	canvas = c;
}

function clickCheckbox(selector: string) {
	let el = sizzle(selector)[0];
	ReactTestUtils.Simulate.change(el, { target: el });
}

function canvasMouseMove(pos: { x: number, y: number }) {
	mouseEvent(canvas, "mousemove", { button: 0, pageX: pos.x, pageY: pos.y });
}

function canvasClick(pos: { x: number, y: number }, param) {
	// debugger;
	// mouseEvent(canvas, 'mousemove', {button:0, pageX:block.center.x, pageY:block.center.y});

	let params = assign({ button: 0, pageX: pos.x, pageY: pos.y }, param);

	mouseEvent(canvas, "mousedown", params);
	mouseEvent(canvas, "mouseup", params);
}
function canvasMouseDown(pos: { x: number, y: number }, param) {
	let params = assign({ button: 0, pageX: pos.x, pageY: pos.y }, param);
	mouseEvent(canvas, "mousedown", params);
}
function canvasMouseUp(pos: { x: number, y: number }, param) {
	let params = assign({ button: 0, pageX: pos.x, pageY: pos.y }, param);
	mouseEvent(canvas, "mouseup", params);
}

const mouse = {
	mouseEvent,
	clickSelector,
	clickCheckbox,
	canvasMouseMove,
	canvasClick,
	setCanvas,
	canvasMouseDown,
	canvasMouseUp
};

export default mouse;
