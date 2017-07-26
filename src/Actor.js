// @flow
import GameObject from "GameObject";

import Engine from "Engine";
let engine: Engine;

export default class Actor extends GameObject {
	constructor(params: Object) {
		super();
		engine = Engine.getInstance();
	}
	canMoveVert = (amount: number): boolean => {
		// if (this.v > 0) {
		// 	//GOIN DOWN
		// 	if (
		// 		engine.grid.blockAtPosition({
		// 			x: boundingRect.r,
		// 			y: boundingRect.b + this.v
		// 		}).block !== "0" ||
		// 		engine.grid.blockAtPosition({
		// 			x: boundingRect.l,
		// 			y: boundingRect.b + this.v
		// 		}).block !== "0"
		// 	) {
		// 		this.v = 0;
		// 	}
		// } else {
		// 	if (
		// 		engine.grid.blockAtPosition({
		// 			x: boundingRect.r,
		// 			y: boundingRect.t + this.v
		// 		}).block !== "0" ||
		// 		engine.grid.blockAtPosition({
		// 			x: boundingRect.l,
		// 			y: boundingRect.t + this.v
		// 		}).block !== "0"
		// 	) {
		// 		this.v = 0;
		// 	}
		// }
	};
}
