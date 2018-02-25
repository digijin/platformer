// @flow

type EngineParams = {
    name: string,
    id: string,
    weight: number,
    power: number
};
export default class Engine {
    name: string;
    id: string;
    weight: number;
    power: number;

    constructor(params: EngineParams) {
        Object.assign(this, params);
    }
}

const engineParams: Array<EngineParams> = [
    {
        name: "Fisher-Pryce My First Engine",
        id: "en1",
        weight: 1,
        power: 100
    },
    {
        name: "KR-VPx Mark 1",
        id: "en2",
        weight: 1,
        power: 200
    },
    {
        name: "KR-VPx Mark 2",
        id: "en3",
        weight: 1,
        power: 300
    },
    {
        name: "KR-VPx Mark 3",
        id: "en4",
        weight: 1,
        power: 500
    },
    {
        name: "Pocket ColdFusion",
        id: "enx",
        weight: 1,
        power: 10000
    }
];

export const Engines: Array<Engine> = engineParams.map(params => {
    return new Engine(params);
});
export const EngineMap: Object = Engines.reduce(
    (output: Object, type: Engines) => {
        if (output[type.id]) {
            throw new Error("duplicate id");
        }
        output[type.id] = type;
        return output;
    },
    {}
);
