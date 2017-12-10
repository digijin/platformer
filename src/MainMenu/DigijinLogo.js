import GameObject from "GameObject";

import Point from "Point";

const letters = [
	[
		{ x: 2, y: 1 },
		{ x: 2, y: 3 },
		{ x: 1, y: 3 },
		{ x: 1, y: 2 },
		{ x: 2, y: 2 }
	], //d
	[{ x: 3, y: 2 }, { x: 3, y: 3 }], //i
	[
		{ x: 5, y: 3 },
		{ x: 4, y: 3 },
		{ x: 4, y: 2 },
		{ x: 5, y: 2 },
		{ x: 5, y: 4 },
		{ x: 4, y: 4 }
	], //g
	[{ x: 6, y: 2 }, { x: 6, y: 3 }], //i
	[{ x: 7, y: 2 }, { x: 7, y: 4 }], //j
	[{ x: 8, y: 2 }, { x: 8, y: 3 }], //i
	[{ x: 9, y: 3 }, { x: 9, y: 2 }, { x: 10, y: 2 }, { x: 10, y: 3 }], //n
	[{ x: 0, y: 2 }, { x: 0, y: 4 }, { x: 3, y: 4 }],
	[{ x: 11, y: 3 }, { x: 11, y: 1 }, { x: 7, y: 1 }]
];

export default class DigijinLogo extends GameObject {
	update() {
		let size = 40;
		letters.forEach(l => {
			for (let p = 1; p < l.length; p++) {
				this.engine.ctx.drawLine(
					new Point(l[p - 1]).multiply(size),
					new Point(l[p]).multiply(size),
					"#00ff00",
					3,
					true
				);
			}
		});
	}
}
