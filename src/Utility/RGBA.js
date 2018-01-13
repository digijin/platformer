//@flow

type rgbaParams = { r: number, g: number, b: number, a?: number };

export default class RGBA {
	r: number;
	g: number;
	b: number;
	a: number;
	constructor(params: rgbaParams) {
		if (!params.a && params.a !== 0) {
			params.a = 1;
		}
		["r", "g", "b", "a"].forEach(a => {
			if (params[a] < 0 || params[a] > 1) {
				throw new Error("RGBA expects values to be 0<=value<=1");
			}
		});
		Object.assign(this, params);
	}
	static fromString(str: string) {
		str = str.replace("#", "");
		return new RGBA({
			r: parseInt(str.substr(0, 2), 16) / 255,
			g: parseInt(str.substr(2, 2), 16) / 255,
			b: parseInt(str.substr(4, 2), 16) / 255,
			a: 1
		});
	}

	percentTo(rgba: RGBA, percent: number): Point {
		let inverse = 1 - percent;
		return new RGBA({
			r: this.r * inverse + rgba.r * percent,
			g: this.g * inverse + rgba.g * percent,
			b: this.b * inverse + rgba.b * percent,
			a: this.a * inverse + rgba.a * percent
		});
	}
	toHex() {
		return "#" + this.toNumber().toString(16);
	}
	toString() {
		return (
			"rgba(" +
			Math.round(this.r * 255) +
			"," +
			Math.round(this.g * 255) +
			"," +
			Math.round(this.b * 255) +
			"," +
			this.a +
			")"
		);
	}
	toNumber() {
		return (
			(Math.floor(this.r * 255) << 16) +
			(Math.floor(this.g * 255) << 8) +
			Math.floor(this.b * 255)
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
