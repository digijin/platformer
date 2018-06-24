import { Text, Container } from "react-pixi-fiber";
import React, { Component } from "react";
import Rectangle from "./Rectangle";
import Header from "./SideMenu/Header";
import Missions from "./Missions";
import OutfittingMenu from "./Outfitting";
import { UICOLOUR } from "./constants";
import Button from "./SideMenu/Button";
import engineConnect from "React/engineConnect";
import MainMenu from "../Scene/MainMenu";
// export default class SideMenu extends Container {
// 	render() {
// 		return <Text text="Peanut Butter Jelly Time" x={200} y={200} />;
// 	}
// }

import { AdvancedBloomFilter } from "@pixi/filter-advanced-bloom";

class SideMenu extends Component {
	state = {
		selected: "OUTFITTING"
	};

	onSectionClick = section => {
		if (section == "QUIT") {
			this.props.engine.startScene(new MainMenu());
		}
		this.setState(state => ({
			...state,
			selected: section
		}));
	};

	getSectionMenu(section: String) {
		switch (section) {
		case "MISSIONS":
			return <Missions />;
		case "OUTFITTING":
			return <OutfittingMenu />;
		}
	}

	render() {
		const sections = ["MISSIONS", "OUTFITTING", "OPTIONS", "SAVE", "QUIT"];

		return (
			<Container
				filters={[
					new AdvancedBloomFilter({ bloomScale: 0.3, quality: 10 })
				]}
			>
				<Rectangle
					x={10}
					y={10}
					width={260}
					height={760}
					border={1}
					borderColor={UICOLOUR}
				/>
				<Header text={"header text"} />
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
