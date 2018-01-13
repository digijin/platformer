// @flow

import RGBA from "Utility/RGBA";

let defaults = {
	frontColor: "#172125",
	sideColor: "#2b353b",
	windowColor: "#171619",
	windowLitColor: "#61666c",
	width: 30,
	floors: 50,
	floorHeight: 5,
	windowHeight: 3,
	windowWidth: 3,
	windowMargin: 1,
	sideWidth: 10
};

export default class Building {
	frontColor: string;
	sideColor: string;
	sideWidth: number;
	windowColor: string;
	windowLitColor: string;
	width: number;
	floors: number;
	floorHeight: number;
	windowHeight: number;
	windowWidth: number;
	windowMargin: number;
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
	constructor(params: {} = {}) {
		Object.assign(this, defaults, params);
		this.canvas = document.createElement("canvas");
		let height = this.floors * this.floorHeight;

		this.canvas.height = height;
		this.canvas.width = this.width + this.sideWidth;
		this.context = this.canvas.getContext("2d");

		if (this.context) {
			this.context.fillStyle = this.frontColor;
			this.context.fillRect(0, 0, this.width, height);
			this.context.fillStyle = this.sideColor;
			this.context.fillRect(this.width, 0, this.sideWidth, height);

			for (let y = 0; y < this.floors; y++) {
				let litFloor = Math.random() < 0.3;
				for (
					let x = 0;
					x < this.width - this.windowWidth;
					x += this.windowMargin + this.windowWidth
				) {
					this.context.fillStyle = this.windowColor;
					this.context.shadowBlur = 0;
					if (litFloor) {
						let unlit = RGBA.fromString(this.windowColor);
						let lit = RGBA.fromString(this.windowLitColor);
						let pc = Math.random();

						this.context.shadowColor = this.windowLitColor;
						this.context.shadowBlur = pc * 3;

						this.context.fillStyle = unlit
							.percentTo(lit, pc)
							.toHex();
					}
					this.context.fillRect(
						x,
						y * this.floorHeight,
						this.windowWidth,
						this.windowHeight
					);
					//and on side
					let ratio = this.sideWidth / this.width;
					this.context.fillRect(
						this.width + x * ratio,
						y * this.floorHeight,
						this.windowWidth,
						this.windowHeight
					);
				}
			}
		}
	}

	static random() {
		return new Building({
			floors: 20 + Math.floor(Math.random() * 40),
			windowLitColor: new RGBA({
				r: 1,
				g: 0.5 + Math.random() * 0.5,
				b: 0.5 + Math.random() * 0.5
			}).toHex(),
			width: 10 + Math.floor(Math.random() * 40),
			sideWidth: 10 + Math.floor(Math.random() * 40),
			floorHeight: 4 + Math.floor(Math.random() * 4),
			windowHeight: 1 + Math.floor(Math.random() * 4),
			windowWidth: 1 + Math.floor(Math.random() * 4)
		});
	}
}
