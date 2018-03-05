// @flow

import Base from "./Base";

type EngineParams = {
    name: string,
    id: string,
    weight: number,
    maxPower: number,
    regenSpeed: number
};
export default class Engine extends Base {
    weight: number;
    maxPower: number;
    regenSpeed: number; //per second

    constructor(params: EngineParams) {
    	super(params);
    	Object.assign(this, params);
    }
}

const engineParams: Array<EngineParams> = [
	{
		name: "Fisher-Pryce My First Engine",
		id: "StarterEngine",
		weight: 1,
		maxPower: 100,
		regenSpeed: 100
	},
	{
		name: "KR-VPx Mark 1",
		id: "en2",
		weight: 1,
		maxPower: 200,
		regenSpeed: 100
	},
	{
		name: "KR-VPx Mark 2",
		id: "en3",
		weight: 1,
		maxPower: 300,
		regenSpeed: 100
	},
	{
		name: "KR-VPx Mark 3",
		id: "en4",
		weight: 1,
		maxPower: 500,
		regenSpeed: 100
	},
	{
		name: "Pocket ColdFusion",
		id: "enx",
		weight: 1,
		maxPower: 10000,
		regenSpeed: 1000
	}
];

export const Engines: Array<Engine> = engineParams.map(params => {
	return new Engine(params);
});
export const EngineMap: Object = Engines.reduce(
	(output: Object, type: Engines) => {
		if (output[type.id]) {
			throw new Error("duplicate id");
		}
		output[type.id] = type;
		return output;
	},
	{}
);
