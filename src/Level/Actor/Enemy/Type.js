//@flow
// import config from "config";
import mech from "assets/mech.png";
import heli from "assets/heli.png";

export type EnemyTypeParams = {
    // hp: name,
    name: string,
    walkSpeed: number,
    jumpSpeed: number,
    jumpPower: number,
    hp: number,
    size: {
        w: number,
        h: number
    },
    registration: {
        x: number,
        y: number
    },
    idle: string,
    agro: string
};

export default class EnemyType {
    name: string;

    walkSpeed: number;

    jumpSpeed: number;
    jumpPower: number;
    hp: number;
    size: {
        w: number,
        h: number
    };

    registration: {
        x: number,
        y: number
    };

    idle: string;
    agro: string;
    image: any;
    id: string;
    constructor(params: EnemyTypeParams) {
    	Object.assign(this, params);
    }
}

const enemyTypeConfig: Array<EnemyTypeParams> = [
	{
		id: "1",
		name: "hopper",
		walkSpeed: 50,
		jumpSpeed: 100,
		jumpPower: 10,
		hp: 50,
		size: {
			w: 50,
			h: 50,
		},
		registration: {
			x: 0.5,
			y: 1,
		},
		idle: "rabbit",
		agro: "agro",
		image: mech,
	},
	{
		id: "2",
		name: "lil bouncy",
		walkSpeed: 250,
		jumpSpeed: 100,
		jumpPower: 6,
		hp: 1,
		size: {
			w: 20,
			h: 20,
		},
		registration: {
			x: 0.5,
			y: 1,
		},
		idle: "bounce",
		agro: "suicideBomber",
		image: mech,
	},
	{
		id: "3",
		name: "guard",
		walkSpeed: 50,
		jumpSpeed: 100,
		jumpPower: 10,
		hp: 100,
		size: {
			w: 60,
			h: 60,
		},
		registration: {
			x: 0.5,
			y: 1,
		},
		idle: "patrol",
		agro: "agro",
		image: mech,
	},
	{
		id: "4",
		name: "heli",
		walkSpeed: 50,
		jumpSpeed: 100,
		jumpPower: 10,
		hp: 100,
		size: {
			w: 124,
			h: 36,
		},
		registration: {
			x: 0.5,
			y: 1,
		},
		idle: "hover",
		agro: "heligun",
		image: heli,
	},
];

export const EnemyTypes: Array<EnemyType> = enemyTypeConfig.map(
	c => new EnemyType(c)
);

export const EnemyTypesMap: {
    [id: string]: EnemyType
} = EnemyTypes.reduce((out, next) => {
	out[next.id] = next;
	return out;
}, {});
