import React, { Component } from "react";

export default class BaseButton extends Component {
	state = {
		over: false,
		down: false,
		glitch: 6,
		visible: false
	};

	componentDidMount() {
		// if (this.props.delay) {
		// }
		// this.timeout = setTimeout(this.glitch, 100 * Math.random());
		this.timeout = setTimeout(this.show, 100 * this.props.delay);
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
	}

	show = () => {
		this.setState(state => ({
			...state,
			visible: true
		}));
		this.timeout = setTimeout(this.glitch, 100 * Math.random());
	};

	glitch = () => {
		if (this.state.glitch > 0) {
			this.setState(state => ({
				...state,
				glitch: this.state.glitch - 1
			}));
			this.timeout = setTimeout(this.glitch, 100 * Math.random());
		}
	};
}
