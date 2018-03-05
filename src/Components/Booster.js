// @flow

import Base from "./Base";
type BoosterParams = {
    name: string,
    id: string,
    weight: number,
    power: number
};
export default class Booster extends Base {
    weight: number;
    power: number;

    constructor(params: BoosterParams) {
    	super(params);
    	Object.assign(this, params);
    }
}

const BoosterParams: Array<BoosterParams> = [
	{
		name: "Fisher-Pryce My First Booster",
		id: "StarterBooster",
		weight: 1,
		power: 100
	},
	{
		name: "Chicken Brand Booster",
		id: "Booster2",
		weight: 1,
		power: 500
	},

	{
		name: "Rocket Hare",
		id: "Boosterx",
		weight: 1,
		power: 10000
	}
];

export const Boosters: Array<Booster> = BoosterParams.map(params => {
	return new Booster(params);
});
export const BoosterMap: Object = Boosters.reduce(
	(output: Object, type: Boosters) => {
		if (output[type.id]) {
			throw new Error("duplicate id");
		}
		output[type.id] = type;
		return output;
	},
	{}
);
