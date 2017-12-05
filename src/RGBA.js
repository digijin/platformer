//@flow

type rgbaParams = { r: number, g: number, b: number, a: number };

export default class RGBA {
	r: number;
	g: number;
	b: number;
	a: number;
	constructor(params: rgbaParams) {
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
	static fromStops(stops: Array<rgbaParams>, pc: number) {}
}
