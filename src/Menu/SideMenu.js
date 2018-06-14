import { Text, Container } from "react-pixi-fiber";
import React, { Component } from "react";
import Rectangle from "./Rectangle";
import Header from "./SideMenu/Header";
import Missions from "./Missions";
import OutfittingMenu from "./Outfitting";
import { UICOLOUR } from "./constants";
import Button from "./SideMenu/Button";
// export default class SideMenu extends Container {
// 	render() {
// 		return <Text text="Peanut Butter Jelly Time" x={200} y={200} />;
// 	}
// }

export default class SideMenu extends Component {
	state = {
		selected: "MISSIONS"
	};

	onSectionClick = section => {
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
			<Container>
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
// export default function SideMenu(props) {
// 	// return <Text text="Peanut Butter Jelly Time" x={200} y={200} />;
// }
