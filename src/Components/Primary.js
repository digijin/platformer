// @flow

import type Projectile from "../GameObject/Projectile";

import Bullet from "../GameObject/Bullet";
import BasicBullet from "./Primary/BasicBullet";
import LaserBullet from "./Primary/LaserBullet";
import FlameBullet from "./Primary/FlameBullet";

import Base from "./Base";
type PrimaryParams = {
    name: string,
    id: string,
    weight: number,
    power: number,
    projectile: Projectile
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
    //class to instantiate
    projectile: Projectile;

    constructor(params: PrimaryParams) {
        super();
        Object.assign(this, params);
    }
}

const primaryParams: Array<PrimaryParams> = [
    {
        name: "Gattling Gun",
        id: "StarterPrimary",
        weight: 1,
        reloadTime: 0.05,
        energyCost: 2,
        power: 100,
        projectile: BasicBullet
    },
    {
        name: "Laser Cannon",
        id: "Primary2",
        weight: 1,
        reloadTime: 0,
        energyCost: 4,
        power: 500,
        projectile: LaserBullet
    },
    {
        name: "FlameThrower",
        id: "Primary3",
        weight: 1,
        reloadTime: 0.5,
        energyCost: 10,
        power: 500,
        projectile: FlameBullet
    },

    {
        name: "Gattling Gauss Rifle",
        id: "Primaryx",
        weight: 1,
        reloadTime: 0.5,
        energyCost: 10,
        power: 1000,
        projectile: Bullet
    }
];

export const Primarys: Array<Primary> = primaryParams.map(params => {
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
