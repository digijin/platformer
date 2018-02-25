// @flow

import Base from "./Base";
type PrimaryParams = {
    name: string,
    id: string,
    weight: number,
    power: number
};
export default class Primary extends Base {
    //how much the component weighs
    weight: number;
    //the strength of the outputted projectile
    power: number;
    // the energy taken to fire the projectile
    energyCost: number;
    // the time between shots
    reloadTime: number;

    constructor(params: PrimaryParams) {
        super();
        Object.assign(this, params);
    }
}

const PrimaryParams: Array<PrimaryParams> = [
    {
        name: "Fisher-Pryce My First Primary",
        id: "Primary1",
        weight: 1,
        reloadTime: 0.5,
        energyCost: 10,
        power: 100
    },
    {
        name: "Machine gun",
        id: "Primary2",
        weight: 1,
        reloadTime: 0.5,
        energyCost: 10,
        power: 500
    },

    {
        name: "Gattling Gauss Rifle",
        id: "Primaryx",
        weight: 1,
        reloadTime: 0.5,
        energyCost: 10,
        power: 1000
    }
];

export const Primarys: Array<Primary> = PrimaryParams.map(params => {
    return new Primary(params);
});
export const PrimaryMap: Object = Primarys.reduce(
    (output: Object, type: Primarys) => {
        if (output[type.id]) {
            throw new Error("duplicate id");
        }
        output[type.id] = type;
        return output;
    },
    {}
);
