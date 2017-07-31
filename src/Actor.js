// @flow
import GameObject from "GameObject";
import Point from "Point";

import config from "config";

import Rect from "Rect";
import Engine from "Engine";
import Explosion from "Explosion";
let engine: Engine;

export default class Actor extends GameObject {
	position: Point;
	h: number;
	v: number;
	size: { w: number, h: number };
	registration: { x: number, y: number };
	z: number;
	constructor() {
		super();
		this.tag("actor");
		engine = Engine.getInstance();
	}

	// explode = () => {
	// 	this.destroy();
	// 	//fill rect with explosions
	// 	let rect: Rect = this.getBoundingRect();
	// 	let center: Point
	// 	//find random points
	// 	for (let i = 0; i < 10; i++) {
	// 		let point:
	// 	}
	// };

	gravity = () => {
		this.v += engine.deltaTime * config.gravity; //GRAVITY
		if (!this.canMoveVert(this.v)) {
			this.v = 0;
		}
		this.position.y += this.v;
	};
	getBoundingRect = (): Rect => {
		return Rect.fromPosSizeRego(this.position, this.size, this.registration);
	};
	canMoveHori = (amount: number): boolean => {
		let boundingRect = this.getBoundingRect();
		if (amount > 0) {
			if (
				engine.grid.blockAtPosition({
					x: boundingRect.r + amount,
					y: boundingRect.t
				}).block !== "0" ||
				engine.grid.blockAtPosition({
					x: boundingRect.r + amount,
					y: boundingRect.b
				}).block !== "0"
			) {
				return false;
			}
		} else {
			if (
				engine.grid.blockAtPosition({
					x: boundingRect.l + amount,
					y: boundingRect.t
				}).block !== "0" ||
				engine.grid.blockAtPosition({
					x: boundingRect.l + amount,
					y: boundingRect.b
				}).block !== "0"
			) {
				return false;
			}
		}
		return true;
	};
	canMoveVert = (amount: number): boolean => {
		let boundingRect = this.getBoundingRect();

		if (amount > 0) {
			//GOIN DOWN
			if (
				engine.grid.blockAtPosition({
					x: boundingRect.r,
					y: boundingRect.b + amount
				}).block !== "0" ||
				engine.grid.blockAtPosition({
					x: boundingRect.l,
					y: boundingRect.b + amount
				}).block !== "0"
			) {
				return false;
			}
		} else {
			if (
				engine.grid.blockAtPosition({
					x: boundingRect.r,
					y: boundingRect.t + amount
				}).block !== "0" ||
				engine.grid.blockAtPosition({
					x: boundingRect.l,
					y: boundingRect.t + amount
				}).block !== "0"
			) {
				return false;
			}
		}
		return true;
	};
}
