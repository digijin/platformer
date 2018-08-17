// @flow

import Missile from "../GameObject/Missile";
import GuidedMissile from "./Secondary/GuidedMissile";

import Base from "./Base";
type SecondaryParams = {
    name: string,
    id: string,
    weight: number,
    power: number,
    projectile: Projectile
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
    //class to instantiate
    projectile: Projectile;

    constructor(params: SecondaryParams) {
    	super();
    	Object.assign(this, params);
    }
}

const SecondaryParamsList: Array<SecondaryParams> = [
	{
		name: "Missile Pod",
		id: "StarterSecondary",
		weight: 1,
		reloadTime: 0.05,
		energyCost: 10,
		power: 100,
		projectile: Missile,
	},
	{
		name: "Guided Missile Pod",
		id: "Secondary2",
		weight: 1,
		reloadTime: 0.5,
		energyCost: 10,
		power: 500,
		projectile: GuidedMissile,
	},
	{
		name: "homing mines",
		id: "Secondary3",
		weight: 1,
		reloadTime: 0.5,
		energyCost: 10,
		power: 500,
		projectile: Missile,
	},

	{
		name: "homing drones",
		id: "Secondaryx",
		weight: 1,
		reloadTime: 0.5,
		energyCost: 10,
		power: 1000,
		projectile: Missile,
	},
];

export const Secondarys: Array<Secondary> = SecondaryParamsList.map(params => {
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
