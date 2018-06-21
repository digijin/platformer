import React from "react";
import Tab from "./Folder/Tab";
import Rectangle from "../../Rectangle";
import Line from "../../Line";
import { UICOLOUR } from "../../constants";

import Owned from "./Folder/Owned";

const MAGIC_HEIGHT = 210;
const MAGIC_WIDTH = 700;
const TAB_LEFT = 10;
const TAB_WIDTH = 86;

const X = 591;
const Y = 348;

export default class Folder extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Rectangle
					x={X}
					y={Y}
					fill={UICOLOUR}
					alpha={0.25}
					width={MAGIC_WIDTH}
					height={MAGIC_HEIGHT}
				/>
				<Line x={X} y={Y} width={10} lineWidth={1} color={UICOLOUR} />
				<Line
					x={X + MAGIC_WIDTH}
					y={Y}
					width={-MAGIC_WIDTH + 16 + TAB_LEFT + TAB_WIDTH * 3}
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
				<Tab
					leftCorner={true}
					rightCorner={true}
					text={"OWNED"}
					fill={UICOLOUR}
					x={X + TAB_LEFT}
					y={Y}
				/>
				<Tab
					rightCorner={true}
					bottom={true}
					text={"SHOPS"}
					fill={0x0}
					x={X + TAB_LEFT + TAB_WIDTH}
					y={Y}
				/>
				<Tab
					rightCorner={true}
					bottom={true}
					text={"ADDON"}
					fill={0x0}
					x={X + TAB_LEFT + TAB_WIDTH * 2}
					y={Y}
				/>
				<Owned x={X} y={Y} width={MAGIC_WIDTH} height={MAGIC_HEIGHT} />
			</React.Fragment>
		);
	}
}
