// @flow

export default class Mission {
    constructor(params) {
        Object.assign(this, params);
    }
}

export const Missions = [];
Missions.push(
    new Mission({
        level: require("levels/level.txt"),
        title: "First Mission",
        description: "This is your first mission. Go shoot shit til it dies",
        objectives: [
            { text: "Go To X" },
            { text: "Kill Y" },
            { text: "Obtain z" },
            { text: "clear everything" }
        ]
    }),

    new Mission({
        level: require("levels/level.txt"),
        title: "Second Mission",
        description: "Exactly the same as first mission. here for testing",
        objectives: [
            { text: "dont kill everything" },
            { text: "just joking, kill everything" }
        ]
    })
);
