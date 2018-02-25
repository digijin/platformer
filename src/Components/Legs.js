// @flow

import Base from "./Base";
type LegParams = {
    name: string,
    id: string,
    weight: number,
    power: number
};
export default class Leg extends Base {
    weight: number;
    power: number;

    constructor(params: LegParams) {
        super(params);
        Object.assign(this, params);
    }
}

const LegParams: Array<LegParams> = [
    {
        name: "Fisher-Pryce My First Leg",
        id: "leg1",
        weight: 1,
        power: 100
    },
    {
        name: "Chicken Brand Leg",
        id: "leg2",
        weight: 1,
        power: 500
    },

    {
        name: "Rocket Hare",
        id: "legx",
        weight: 1,
        power: 10000
    }
];

export const Legs: Array<Leg> = LegParams.map(params => {
    return new Leg(params);
});
export const LegMap: Object = Legs.reduce((output: Object, type: Legs) => {
    if (output[type.id]) {
        throw new Error("duplicate id");
    }
    output[type.id] = type;
    return output;
}, {});
