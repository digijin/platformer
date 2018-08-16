// @flow

import Base from "./Base";
type LegParams = {
    name: string,
    id: string,
    weight: number,
    speed: 1,
    jumpPower: number
};
export default class Leg extends Base {
    weight: number;
    speed: 1;
    jumpPower: number;

    constructor(params: LegParams) {
    	super(params);
    	Object.assign(this, params);
    }
}

const LegParamsList: Array<LegParams> = [
	{
		name: "Fisher-Pryce My First Leg",
		id: "StarterLegs",
		weight: 1,
		speed: 500,
		jumpPower: 10
	},
	{
		name: "Chicken Brand Leg",
		id: "leg2",
		weight: 1,
		speed: 600,
		jumpPower: 50
	},

	{
		name: "Rocket Hare",
		id: "legx",
		weight: 1,
		speed: 1000,
		jumpPower: 100
	}
];

export const Legs: Array<Leg> = LegParamsList.map(params => {
	return new Leg(params);
});
export const LegMap: Object = Legs.reduce((output: Object, type: Leg) => {
	if (output[type.id]) {
		throw new Error("duplicate id");
	}
	output[type.id] = type;
	return output;
}, {});
