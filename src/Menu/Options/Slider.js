
import React from "react";
import { Text, Container } from "react-pixi-fiber";
import Rectangle from "../Rectangle";
import { UICOLOUR } from "../constants";
import engineConnect from "React/engineConnect";

export class Slider extends React.Component{
    state = {
    	down: false,
    	x: 0,
    	pc: 0,
    }

    render() {

    	const { x, y, label } = this.props;
    	const self = this;
        
    	const SLIDER_X_OFFSET = 100;
    	const SLIDER_WIDTH = 200;
    	return <Container
    		x={x}
    		y={y}>
    		<Text
    			text={label}
    			style={{
    				fontFamily: "RobotoBold",
    				fontSize: 24,
    				fill: UICOLOUR,
    				align: "center",
    			}}
    			x={0}
    			y={10}
    		/>

    		<Rectangle
    			x={SLIDER_X_OFFSET}
    			y={20}
    			width={SLIDER_WIDTH}
    			height={4}
    		/>
    		<Rectangle
    			x={SLIDER_X_OFFSET + (this.state.pc * SLIDER_WIDTH) - 5}
    			width={10}
    			y={0}
    			height={40}
    			fill={UICOLOUR}
    			buttonMode={true}
    			interactive={true}
    			onMouseDown={(e) => {
    				// console.log("md", e, this.getGlobalsPosition());
    				// console.log(e.data.global, e.data.originalEvent);
    				self.setState(state => ({
    					...state,
    					x: e.data.global.x,
    					down: true,
    				}));
    			}}
    			onMouseUp={() => {
    				self.setState(state => ({
    					...state,
    					down: false,
    				}));
    			}}
    			// onMouseOut={() => {
    			// 	self.setState(state => ({
    			// 		...state,
    			// 		down: false,
    			// 	}));
    			// }}
    			onMouseMove={function(e){
    				// const diff = e.data.global.x - self.state.x;
    				// console.log(diff);
    				if(self.state.down){
    					let pc = e.data.global.x - this.getGlobalsPosition().x - SLIDER_X_OFFSET;
    					pc = (pc.clamp(0, SLIDER_WIDTH) / SLIDER_WIDTH);
    					// console.log(pc);
                        
    					self.setState(state => ({
    						...state,
    						pc: pc,
    					}));
    				}
    			}}
    		/>
    
    	</Container>;
    }
}
// export default engineConnect(Slider);
export default Slider;