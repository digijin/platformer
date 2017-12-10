//@flow
import GameObject from "GameObject";

import Point from "Point";

let letters = [
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
		color: "#00ff00",
		points: [{ x: 0, y: 2 }, { x: 0, y: 4 }, { x: 3, y: 4 }]
	},
	{
		color: "#00b7ff",
		points: [{ x: 11, y: 3 }, { x: 11, y: 1 }, { x: 7, y: 1 }]
	}
];
//add dists
letters = letters.map(l => {
	let dist = 0;
	l.points = l.points.map(p => new Point(p));
	for (let p = 1; p < l.points.length; p++) {
		dist += l.points[p - 1].distanceTo(l.points[p]);
	}
	l.dist = dist;
	return l;
});

export default class DigijinLogo extends GameObject {
	constructor() {
		super();
		// console.log(letters);
	}
	update() {
		let size = 40;
		let width = size * 11;
		let offset = { x: (window.innerWidth - width) / 2, y: 100 };
		letters.forEach(l => {
			for (let p = 1; p < l.points.length; p++) {
				this.engine.ctx.drawLine(
					l.points[p - 1].multiply(size).add(offset),
					l.points[p].multiply(size).add(offset),
					l.color,
					3,
					true
				);
			}
		});
	}
}
