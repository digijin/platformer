//@flow
import GameObject from "GameObject";

import Point from "Point";
import MainMenu from "Scene/MainMenu";

let lettersConfig = [
	{
		color: "#00ff00",
		points: [
			{ x: 2, y: 1 },
			{ x: 2, y: 3 },
			{ x: 1, y: 3 },
			{ x: 1, y: 2 },
			{ x: 2, y: 2 }
		]
	},
	{ color: "#00ff00", points: [{ x: 3, y: 2 }, { x: 3, y: 3 }] },
	{
		color: "#00ff00",
		points: [
			{ x: 5, y: 3 },
			{ x: 4, y: 3 },
			{ x: 4, y: 2 },
			{ x: 5, y: 2 },
			{ x: 5, y: 4 },
			{ x: 4, y: 4 }
		]
	},
	{ color: "#00ff00", points: [{ x: 6, y: 2 }, { x: 6, y: 3 }] },
	{ color: "#00b7ff", points: [{ x: 7, y: 2 }, { x: 7, y: 4 }] },
	{ color: "#00b7ff", points: [{ x: 8, y: 2 }, { x: 8, y: 3 }] },
	{
		color: "#00b7ff",
		points: [
			{ x: 9, y: 3 },
			{ x: 9, y: 2 },
			{ x: 10, y: 2 },
			{ x: 10, y: 3 }
		]
	},
	{
		color: "#00b7ff",
		points: [{ x: 11, y: 3 }, { x: 11, y: 1 }, { x: 7, y: 1 }]
	},
	{
		color: "#00ff00",
		points: [{ x: 0, y: 2 }, { x: 0, y: 4 }, { x: 3, y: 4 }]
	}
];
//add dists
let letters: Array<{
	color: string,
	points: Array<Point>,
	dist: number
}> = lettersConfig.map(l => {
	let dist = 0;
	l.points = l.points.map(p => new Point(p));
	for (let p = 1; p < l.points.length; p++) {
		dist += l.points[p - 1].distanceTo(l.points[p]);
	}
	l.dist = dist;
	return l;
});
const FADETIME = 8;
export default class DigijinLogo extends GameObject {
	time: number;
	constructor() {
		super();
		// console.log(letters);
		this.time = 0;
	}
	update() {
		this.time += this.engine.deltaTime * 8;
		let size = 40;
		let width = size * 11;
		let height = size * 5;
		let offset = {
			x: (window.innerWidth - width) / 2,
			y: (window.innerHeight - height) / 2
		};
		let ctx = this.engine.ctx.context;
		if (this.time > 12) {
			ctx.globalAlpha = (FADETIME - (this.time - 12)) / FADETIME;
		}
		this.renderLetters(ctx, size, offset);

		if (this.time > 12 + FADETIME) {
			//end
			ctx.globalAlpha = 1;
			this.engine.startScene(new MainMenu());
		}
	}

	renderLetters(ctx, size, offset) {
		letters.forEach((l, index) => {
			let progress = this.time - index;
			ctx.strokeStyle = l.color;
			ctx.lineWidth = 3;
			ctx.beginPath();
			let from = l.points[0];
			ctx.moveTo(
				from.multiply(size).add(offset).x,
				from.multiply(size).add(offset).y
			);
			for (let p = 1; p < l.points.length; p++) {
				let to = l.points[p];
				let dist = from.distanceTo(to);
				if (progress > dist) {
					ctx.lineTo(
						to.multiply(size).add(offset).x,
						to.multiply(size).add(offset).y
					);
				} else if (progress > 0) {
					let mid = from.percentTo(to, progress / dist);
					ctx.lineTo(
						mid.multiply(size).add(offset).x,
						mid.multiply(size).add(offset).y
					);
				}
				progress -= dist;
				from = to;
			}
			ctx.stroke();
		});
	}
}
