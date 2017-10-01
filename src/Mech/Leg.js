//@flow

import GameObject from "GameObject";

import type Player from "Player";
import Point from "Point";

const branchLength = 100;
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
		this.stride += this.engine.deltaTime * 4;
		let stridePos = new Point({
			x: Math.cos(this.stride) * 30,
			y: Math.sin(this.stride) * 20
		}).add(this.parent.position);

		this.position = this.parent.position.add(this.offset);
		this.ik(stridePos);
		this.head(this.position);
	}
	ik(pos: Point) {
		let floor = this.parent.position.y;
		this.engine.ctx.drawLine(this.position, pos);
	}
	head(pos: Point) {
		this.engine.ctx.beginPath();
		this.engine.ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI, false);
		this.engine.ctx.context.fillStyle = "#ababab";
		this.engine.ctx.fill();
	}
}

/*

let center = { x: width / 2, y: height / 2 }; //this.position


update = () => {
  
  let roller2 = roller + Math.PI * speed
  center.y = (height / 2) + (Math.cos(roller/speed*2)*10)
  let pos = {x:Math.cos(roller/speed)*100, y: Math.sin(roller/speed)*40}
  pos.x += center.x
  pos.y += floor
  ik(pos);
  
  
  //draw the head
  ctx.beginPath()
  ctx.arc(center.x, center.y, 60, 0, 2 * Math.PI, false);
  ctx.fillStyle = '#ababab';
  ctx.fill();
  
  pos = {x:Math.cos(roller2/speed)*100, y: Math.sin(roller2/speed)*40}
  pos.x += center.x
  pos.y += floor
  ik(pos);
  
  // ctx.stroke();
  
  // console.log(pos)
  requestAnimationFrame(update);
};
update();

// document.addEventListener("mousemove", e => {
//   ik({ x: e.clientX, y: e.clientY });
// })
function ik(mouse){
  // console.log(e)
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.strokeStyle = "black"
  // let mouse = { x: e.clientX, y: e.clientY };
  ctx.moveTo(center.x, center.y);
  ctx.lineTo(mouse.x, mouse.y);
  ctx.stroke();
  
  //a^2 + b^2 = c^2
  let dist = Math.sqrt(
    Math.pow(mouse.x - center.x, 2) + Math.pow(mouse.y - center.y, 2)
  );
  if (dist > branchLength * numBranches) {
    dist = branchLength * numBranches;
  }
  let dir = Math.atan2(mouse.y - center.y, mouse.x - center.x);
  

  //floor;
  ctx.moveTo(0, floor);
  ctx.lineTo(width, floor);
  ctx.stroke();
  
  let endpoint = {
    x: center.x + Math.cos(dir) * dist,
    y: center.y + Math.sin(dir) * dist
  };
  if(endpoint.y>floor){
    let ratio =  (floor-center.y)/ (endpoint.y - center.y)
    dist *= ratio;
    endpoint = {
      x: center.x + Math.cos(dir) * dist,
      y: center.y + Math.sin(dir) * dist
    } 
  }
  
  // console.log(center.x , Math.sin(dir) , dist)
  let midpoint = {
    x: center.x + Math.cos(dir) * dist / 2,
    y: center.y + Math.sin(dir) * dist / 2
  };

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#FF0000";
  // ctx.moveTo(0,0);
  // console.log(midpoint)
  ctx.moveTo(midpoint.x, midpoint.y)
  let b = Math.sqrt(Math.pow(branchLength, 2)- Math.pow(dist/2, 2));
  dir += Math.PI/2
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

*/
