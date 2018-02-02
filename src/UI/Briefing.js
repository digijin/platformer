//@flow
import React from "react";
import Button from "material-ui/Button";
import MainMenu from "Scene/MainMenu";
import Equip from "Scene/Equip";
import { withStyles } from "material-ui/styles";
import Doors from "Transition/Doors";
import engineConnect from "React/engineConnect";

import { Missions } from "Mission";

import classnames from "classnames";
const styles = theme => ({
    container: {
        position: "fixed",
        left: "100px",
        right: "100px",
        top: "100px",
        bottom: "100px"
    },
    title: {
        fontSize: "30px",
        fontFamily: "HeadingFont",
        textAlign: "center",
        margin: "10px"
    },
    panel: {
        backgroundColor: "rgba(255,255,255,0.7)"
    },
    missionList: {
        border: "1px solid grey",
        width: "30%",
        display: "block"
    },
    missionListSelected: {
        border: "1px solid grey"
    },
    missionDetails: {
        float: "right",
        border: "1px solid grey",
        width: "60%",
        display: "block"
    },
    button: {
        float: "right"
    },
    map: {
        float: "right",
        width: "100px",
        height: "100px",
        border: "1px solid grey"
    }
});
export class Briefing extends React.Component<{}> {
    props: any;
    state: any;

    constructor() {
        super();
        this.state = { selectedMission: null };
    }

    changeMission(index: number) {
        this.setState({ selectedMission: index });
    }

    render() {
        let availableMissions = Missions;
        let selectedMission = Missions[this.state.selectedMission];
        if (!selectedMission) {
            selectedMission = {
                title: "None Selected",
                description: "Please select a mission on the left",
                objectives: []
            };
        }
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.panel}>
                    <Button
                        raised={true}
                        className={classnames(classes.button, classes.menu)}
                        onClick={() => {
                            this.props.engine.startScene(new MainMenu());
                        }}
                    >
                        go back to menu
                    </Button>
                    <div className={classes.title}>Briefing panel</div>
                    <div className={classes.missionDetails}>
                        {selectedMission.title}
                        <hr />
                        {selectedMission.description}
                        <div className={classes.map}>some picture</div>
                        <ul>
                            {selectedMission.objectives.map((o, i) => {
                                return <li key={i}>{o.text}</li>;
                            })}
                        </ul>
                    </div>
                    <div className={classes.missionList}>
                        list of available missions here
                        <ul>
                            {Missions.map((mission, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={
                                            this.state.selectedMission == index
                                                ? classes.missionListSelected
                                                : ""
                                        }
                                    >
                                        <a
                                            onClick={() => {
                                                this.changeMission(index);
                                            }}
                                        >
                                            {mission.title}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <Button
                        id="equipButton"
                        className={classes.button}
                        raised={true}
                        disabled={this.state.selectedMission == null}
                        onClick={() => {
                            this.props.engine.startSceneTransition(
                                new Equip(),
                                new Doors()
                            );
                        }}
                    >
                        go to equip screen
                    </Button>
                </div>
            </div>
        );
    }
}
export default engineConnect(withStyles(styles)(Briefing));
