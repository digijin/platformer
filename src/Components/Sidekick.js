// @flow

import Base from "./Base";
type SidekickParams = {
    name: string,
    id: string,
    weight: number,
    power: number
};
export default class Sidekick extends Base {
    weight: number;
    power: number;

    constructor(params: SidekickParams) {
    	super(params);
    	Object.assign(this, params);
    }
}

const SidekickParams: Array<SidekickParams> = [
	{ name: "None", id: "none" },
	{
		name: "Fisher-Pryce My First Sidekick",
		id: "Sidekick1",
		weight: 1,
		power: 100
	},
	{
		name: "Chicken Brand Sidekick",
		id: "Sidekick2",
		weight: 1,
		power: 500
	},

	{
		name: "Rocket Sidekick",
		id: "Sidekickx",
		weight: 1,
		power: 10000
	}
];

export const Sidekicks: Array<Sidekick> = SidekickParams.map(params => {
	return new Sidekick(params);
});
export const SidekickMap: Object = Sidekicks.reduce(
	(output: Object, type: Sidekicks) => {
		if (output[type.id]) {
			throw new Error("duplicate id");
		}
		output[type.id] = type;
		return output;
	},
	{}
);
