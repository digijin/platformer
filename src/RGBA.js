//@flow

type rgbaParams = { r: number, g: number, b: number, a?: number };

export default class RGBA {
	r: number;
	g: number;
	b: number;
	a: number;
	constructor(params: rgbaParams) {
		if (!params.a) {
			params.a = 1;
		}
		if (
			params.r < 0 ||
			params.r > 1 ||
			params.g < 0 ||
			params.g > 1 ||
			params.b < 0 ||
			params.b > 1 ||
			params.a < 0 ||
			params.a > 1
		) {
			throw new Error("RGBA expects values to be 0<=value<=1");
		}
		Object.assign(this, params);
	}
	toString() {
		return (
			"rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")"
		);
	}
	static fromStops(stops: Array<rgbaParams>, pc: number) {
		let l = stops.length - 1;
		let prevStop = Math.floor(pc * l);
		let nextStop = Math.ceil(pc * l);
		pc = (l * pc) % 1;
		let ipc = 1 - pc;
		let p = stops[prevStop];
		let n = stops[nextStop];
		return new RGBA({
			r: p.r * ipc + n.r * pc,
			g: p.g * ipc + n.g * pc,
			b: p.b * ipc + n.b * pc,
			a: p.a * ipc + n.a * pc
		});
	}
}
