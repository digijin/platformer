// @flow

import Base from "./Base";
type BoosterParams = {
    name: string,
    id: string,
    weight: number,
    power: number,
    energyDrain: number,
    energyCost: number
};
export default class Booster extends Base {
    weight: number;
    power: number;
    energyDrain: number;
    energyCost: number;

    constructor(params: BoosterParams) {
    	super();
    	Object.assign(this, params);
    }
}

const boosterParams: Array<BoosterParams> = [
	{
		name: "Fisher-Pryce My First Booster",
		id: "StarterBooster",
		weight: 1,
		power: 100,
		energyDrain: 300,
		energyCost: 20
	},
	{
		name: "Chicken Brand Booster",
		id: "Booster2",
		weight: 1,
		power: 500,
		energyDrain: 300,
		energyCost: 20
	},

	{
		name: "Rocket Hare",
		id: "Boosterx",
		weight: 1,
		power: 10000,
		energyDrain: 300,
		energyCost: 20
	}
];

export const Boosters: Array<Booster> = boosterParams.map(params => {
	return new Booster(params);
});
export const BoosterMap: Object = Boosters.reduce(
	(output: Object, type: Booster) => {
		if (output[type.id]) {
			throw new Error("duplicate id");
		}
		output[type.id] = type;
		return output;
	},
	{}
);
