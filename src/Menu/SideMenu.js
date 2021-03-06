import { Container } from "react-pixi-fiber";
import React, { Component } from "react";
import Rectangle from "./Rectangle";
import Header from "./SideMenu/Header";
import Missions from "./Missions";
import Options from "./Options";
import OutfittingMenu from "./Outfitting";
import { UICOLOUR } from "./constants";
import Button from "./SideMenu/Button";
import engineConnect from "React/engineConnect";
import StartMenu from "../Scene/StartMenu";

import MenuBackgroundFilter from "Filter/Buildings/Filter";

import FilterUpdater from "Filter/Updater";


class SideMenu extends Component {
	state = {
		selected: "MISSIONS",
	};

	bgFilter = new MenuBackgroundFilter();

	onSectionClick = section => {
		if (section === "QUIT") {
			this.props.engine.startScene(new StartMenu());
		}
		this.setState(state => ({
			...state,
			selected: section,
		}));
	};

	getSectionMenu(section: String) {
		switch (section) {
			case "MISSIONS":
				return <Missions/>;
			case "OPTIONS":
				return <Options/>;
			case "OUTFITTING":
				return <OutfittingMenu/>;
		}
	}

	componentDidMount() {
		this.props.engine.register(new FilterUpdater(this.bgFilter));
	}

	render() {
		const sections = ["MISSIONS", "OUTFITTING", "OPTIONS", "SAVE", "QUIT"];

		return (
			<Container
				filters={
					[
						// new AdvancedBloomFilter({ bloomScale: 0.3, quality: 10 }),
					]
				}
			>
				<Container filters={[this.bgFilter]}>
					<Rectangle
						x={0}
						y={0}
						width={window.innerWidth}
						height={window.innerHeight}
						border={3}
						borderColor={UICOLOUR}
					/>
				</Container>
				<Rectangle
					x={10}
					y={10}
					width={260}
					height={760}
					border={1}
					borderColor={UICOLOUR}
				/>
				<Header text={"header text"}/>
				{sections.map((s, i) => (
					<Button
						onClick={() => {
							this.onSectionClick(s);
						}}
						selected={s === this.state.selected}
						key={"section" + i}
						text={s}
						x={22}
						y={87 + i * 53}
					/>
				))}
				{this.getSectionMenu(this.state.selected)}
			</Container>
		);
	}
}

export default engineConnect(SideMenu);
