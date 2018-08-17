// @flow

import { extend } from "lodash";
import ReactTestUtils from "react-dom/test-utils";
import sizzle from "sizzle";

const mouseEvent = function (
	eventName: string,
	params: Object,
	target: any = document
) {
	// let target = sizzle("canvas")[0];
	var event = document.createEvent("Event");
	extend(event, params);
	event.initEvent(eventName, true, true);
	//FLOWHACK
	target.dispatchEvent(event); //was document
};

const clickSelector = function (selector: string): boolean {
	const elements = sizzle(selector);
	if (elements.length > 0) {
		ReactTestUtils.Simulate.click(elements[0]);
		return true;
	}
	return false;
};

function clickCheckbox(selector: string) {
	const el = sizzle(selector)[0];
	ReactTestUtils.Simulate.change(el, { target: el });
}

const mouse = {
	mouseEvent,
	clickSelector,
	clickCheckbox,
};

export default mouse;
