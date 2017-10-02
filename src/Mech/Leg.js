//@flow

import GameObject from "GameObject";

import type Player from "Player";
import Point from "Point";

const branchLength = 25;
const numBranches = 2;

export default class Leg extends GameObject {
	parent: Player;
	offset: Point;
	position: Point;
	stride: number;
	constructor(params: { parent: Player }) {
		super();
		this.parent = params.parent;
		this.offset = new Point({ x: 0, y: -40 });
		this.stride = 0;
	}
	update() {
		if (this.parent.h !== 0) {
			this.stride += this.engine.deltaTime * 10 * this.parent.h;
		}
		let stridePos = new Point({
			x: Math.cos(this.stride) * 30,
			y: Math.sin(this.stride) * 20
		}).add(this.parent.position);
		let rearPos = new Point({
			x: Math.cos(this.stride + Math.PI) * 30,
			y: Math.sin(this.stride + Math.PI) * 20
		}).add(this.parent.position);

		this.position = this.parent.position.add(this.offset);
		this.ik(rearPos);
		this.head(this.position);
		this.ik(stridePos);
	}
	head(pos: Point) {
		this.engine.ctx.beginPath();
		this.engine.ctx.arc(pos.x, pos.y, 10, 0, 2 * Math.PI, false);
		this.engine.ctx.context.fillStyle = "#ababab";
		this.engine.ctx.fill();
	}
	ik(target: Point) {
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
		let joint = midpoint.move(dir, b);

		this.engine.ctx.drawLine(this.position, joint, "#555555", 5);
		this.engine.ctx.drawLine(joint, endpoint, "#555555", 5);
	}
}

/*

let center = { x: width / 2, y: height / 2 }; //this.position


function ik(mouse){
  // console.log(e)
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.strokeStyle = "black"
  // let mouse = { x: e.clientX, y: e.clientY };
  ctx.moveTo(center.x, center.y);
  ctx.lineTo(mouse.x, mouse.y);
  ctx.stroke();
  
  let joint = {
    x: midpoint.x + Math.cos(dir) * b,
    y: midpoint.y + Math.sin(dir) * b
  };
  ctx.lineTo(joint.x, joint.y)

  ctx.stroke();
  
  
  
  //proper draw
  
  ctx.beginPath();
  ctx.lineWidth = 32;
  ctx.strokeStyle = "#ababab";
  ctx.moveTo(center.x, center.y);
  ctx.lineTo(joint.x, joint.y);
  ctx.lineTo(endpoint.x, endpoint.y)
  ctx.lineTo(endpoint.x+30, endpoint.y)
  ctx.stroke();
}

update = () => {
  
  let roller2 = roller + Math.PI * speed
  center.y = (height / 2) + (Math.cos(roller/speed*2)*10)
  let pos = {x:Math.cos(roller/speed)*100, y: Math.sin(roller/speed)*40}
  pos.x += center.x
  pos.y += floor
  ik(pos);
  
  pos = {x:Math.cos(roller2/speed)*100, y: Math.sin(roller2/speed)*40}
  pos.x += center.x
  pos.y += floor
  ik(pos);
};
update();

*/
