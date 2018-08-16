// @flow

import Base from "./Base";
type BodyParams = {
    name: string,
    id: string,
    weight: number,
    power: number
};
export default class Body extends Base {
    weight: number;
    power: number;

    constructor(params: BodyParams) {
    	super(params);
    	Object.assign(this, params);
    }
}

const BodyParamsList: Array<BodyParams> = [
	{
		name: "A Normal Body",
		id: "StarterBody",
		weight: 1,
		power: 100
	},
	{
		name: "Another Normal Body",
		id: "Body2",
		weight: 1,
		power: 500
	},

	{
		name: "it's all the same shit",
		id: "Bodyx",
		weight: 1,
		power: 10000
	}
];

export const Bodys: Array<Body> = BodyParamsList.map(params => {
	return new Body(params);
});
export const BodyMap: Object = Bodys.reduce((output: Object, type: Bodys) => {
	if (output[type.id]) {
		throw new Error("duplicate id");
	}
	output[type.id] = type;
	return output;
}, {});
