//@flow

import GameObject from "GameObject";

import type Player from "Player";
import Point from "Point";

const branchLength = 25;
const numBranches = 2;

export const FACING_RIGHT = 1;
export const FACING_LEFT = -1;

type Facing = FACING_LEFT | FACING_RIGHT;

export default class Leg extends GameObject {
	parent: Player;
	offset: Point;
	position: Point;
	stride: number;
	torsoOffset: Point;
	frontFootPos: Point;
	rearFootPos: Point;
	constructor(params: { parent: Playesr }) {
		super();
		this.parent = params.parent;
		this.offset = new Point({ x: 0, y: -40 });
		this.stride = 0;
		this.torsoOffset = new Point();
		this.frontFootPos = new Point();
		this.rearFootPos = new Point();
	}
	update() {
		let torsoOffsetTarget = new Point();
		let frontFootPosTarget = new Point({ x: 10, y: 0 }).add(
			this.parent.position
		);
		let rearFootPosTarget = new Point({ x: -10, y: 0 }).add(
			this.parent.position
		);
		if (this.parent.v !== 0) {
			torsoOffsetTarget.y = -10;
		} else {
			if (this.parent.h !== 0) {
				this.stride += this.engine.deltaTime * 10 * this.parent.h;

				frontFootPosTarget = new Point({
					x: Math.cos(this.stride) * 30,
					y: Math.sin(this.stride) * 20
				}).add(this.parent.position);
				rearFootPosTarget = new Point({
					x: Math.cos(this.stride + Math.PI) * 30,
					y: Math.sin(this.stride + Math.PI) * 20
				}).add(this.parent.position);
			}
		}
		//ease it all in
		this.torsoOffset = this.torsoOffset.easeTo(torsoOffsetTarget, 5);
		this.frontFootPos = this.frontFootPos.easeTo(frontFootPosTarget, 5);
		this.rearFootPos = this.rearFootPos.easeTo(rearFootPosTarget, 5);
		//and render it
		this.position = this.parent.position
			.add(this.offset)
			.add(this.torsoOffset);
		let facing =
			this.engine.input.mouse.position.x > this.engine.canvas.width / 2
				? FACING_RIGHT
				: FACING_LEFT;
		this.ik(this.frontFootPos, facing);
		this.head(this.position);
		this.ik(this.rearFootPos, facing);
	}
	head(pos: Point) {
		this.engine.ctx.beginPath();
		this.engine.ctx.arc(pos.x, pos.y, 10, 0, 2 * Math.PI, false);
		this.engine.ctx.context.fillStyle = "#ababab";
		this.engine.ctx.fill();
	}
	ik(target: Point, facing: Facing = FACING_LEFT) {
		let floor = this.parent.position.y;
		// this.engine.ctx.drawLine(this.position, target, "#ffff00");
		let dist = this.position.distanceTo(target);

		if (dist > branchLength * numBranches) {
			dist = branchLength * numBranches;
		}
		let dir = target.subtract(this.position).direction();
		let endpoint = this.position.move(dir, dist);
		// this.engine.ctx.drawLine(this.position, endpoint, "#ff0000", 2);

		if (endpoint.y > floor) {
			let ratio =
				(floor - this.position.y) / (endpoint.y - this.position.y);
			dist *= ratio;
			endpoint = this.position.move(dir, dist);
		}
		let midpoint = this.position.move(dir, dist / 2);
		let b = Math.sqrt(Math.pow(branchLength, 2) - Math.pow(dist / 2, 2));

		dir += Math.PI / 2;
		let joint = midpoint.move(dir, b * facing);

		this.engine.ctx.drawLine(this.position, joint, "#555555", 5);
		this.engine.ctx.drawLine(joint, endpoint, "#555555", 5);
	}
}
