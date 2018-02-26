// @flow

import Base from "./Base";
type SecondaryParams = {
    name: string,
    id: string,
    weight: number,
    power: number
};
export default class Secondary extends Base {
    //how much the component weighs
    weight: number;
    //the strength of the outputted projectile
    power: number;
    // the energy taken to fire the projectile
    energyCost: number;
    // the time between shots
    reloadTime: number;

    constructor(params: SecondaryParams) {
        super();
        Object.assign(this, params);
    }
}

const SecondaryParams: Array<SecondaryParams> = [
    {
        name: "Fisher-Pryce My First Secondary",
        id: "Secondary1",
        weight: 1,
        reloadTime: 0.5,
        energyCost: 10,
        power: 100
    },
    {
        name: "missile pod",
        id: "Secondary2",
        weight: 1,
        reloadTime: 0.5,
        energyCost: 10,
        power: 500
    },
    {
        name: "homing mines",
        id: "Secondary3",
        weight: 1,
        reloadTime: 0.5,
        energyCost: 10,
        power: 500
    },

    {
        name: "homing drones",
        id: "Secondaryx",
        weight: 1,
        reloadTime: 0.5,
        energyCost: 10,
        power: 1000
    }
];

export const Secondarys: Array<Secondary> = SecondaryParams.map(params => {
    return new Secondary(params);
});
export const SecondaryMap: Object = Secondarys.reduce(
    (output: Object, type: Secondarys) => {
        if (output[type.id]) {
            throw new Error("duplicate id");
        }
        output[type.id] = type;
        return output;
    },
    {}
);
