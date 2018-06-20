import React from "react";
import Tab from "./Folder/Tab";
import Rectangle from "../../Rectangle";
import Line from "../../Line";
import { UICOLOUR } from "../../constants";

const MAGIC_HEIGHT = 210;
const MAGIC_WIDTH = 700;
const TAB_LEFT = 10;
const TAB_WIDTH = 85;

const X = 591;
const Y = 348;

export default class Folder extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Line x={X} y={Y} width={10} lineWidth={1} color={UICOLOUR} />
				<Line
					x={X + MAGIC_WIDTH}
					y={Y}
					width={-MAGIC_WIDTH + 20 + TAB_LEFT + TAB_WIDTH * 3}
					lineWidth={1}
					color={UICOLOUR}
				/>
				<Line
					x={X}
					y={Y}
					height={MAGIC_HEIGHT}
					lineWidth={1}
					color={UICOLOUR}
				/>
				<Line
					x={X + MAGIC_WIDTH}
					y={Y}
					height={MAGIC_HEIGHT}
					lineWidth={1}
					color={UICOLOUR}
				/>

				<Line
					x={X}
					y={Y + MAGIC_HEIGHT}
					width={MAGIC_WIDTH}
					lineWidth={1}
					color={UICOLOUR}
				/>
				<Tab text={"OWNED"} x={X + TAB_LEFT} y={Y} />
				<Tab text={"SHOPS"} x={X + TAB_LEFT + TAB_WIDTH} y={Y} />
				<Tab
					text={"ADDON"}
					x={X + TAB_LEFT + TAB_WIDTH + TAB_WIDTH}
					y={Y}
				/>
			</React.Fragment>
		);
	}
}
