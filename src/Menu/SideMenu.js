import { Text, Container } from "react-pixi-fiber";
import React from "react";
import Rectangle from "./Rectangle";
import Header from "./SideMenu/Header";
// export default class SideMenu extends Container {
// 	render() {
// 		return <Text text="Peanut Butter Jelly Time" x={200} y={200} />;
// 	}
// }

export default function SideMenu(props) {
	return (
		<Container>
			<Rectangle
				x={10}
				y={10}
				width={260}
				height={760}
				border={1}
				borderColor={0xff5000}
			/>
			<Header text={"header text"} />
		</Container>
	);
	// return <Text text="Peanut Butter Jelly Time" x={200} y={200} />;
}
