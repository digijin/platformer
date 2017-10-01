//@flow

import GameObject from "GameObject";

import type Player from "Player";

export default class Leg extends GameObject {
	parent: Player;
	constructor(params: { parent: Player }) {
		super();
		this.parent = params.parent;
	}
	update() {
		this.engine.ctx.drawLine(
			this.parent.position,
			this.parent.position.add({ x: 10, y: 20 })
		);
	}
}

/*
const width = 500;
const height = 500;

const branchLength = 100;
const numBranches = 2;

const center = { x: width / 2, y: height / 2 };

const floor = center.y + branchLength*(numBranches-0.5)

let canvas = document.getElementsByTagName("canvas")[0];
canvas.width = width;
canvas.height = height;
let ctx = canvas.getContext("2d");

ctx.font = "30px Arial";
ctx.fillText("Use Mouse", 10, 50);

let roller = 0;
update = () => {
  roller --;
  let pos = {x:Math.cos(roller/40)*100, y: Math.sin(roller/40)*40}
  pos.x += center.x
  pos.y += floor
  ik(pos);
  console.log(pos)
  requestAnimationFrame(update);
};
update();

document.addEventListener("mousemove", e => {
  ik({ x: e.clientX, y: e.clientY });
})
function ik(mouse){
  // console.log(e)
  canvas.width = width; //reset
  // ctx.lineWidth = 10;
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
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#00FF00";
  ctx.moveTo(center.x, center.y);
  ctx.lineTo(joint.x, joint.y);
  ctx.lineTo(endpoint.x, endpoint.y)
  ctx.stroke();
}

*/
