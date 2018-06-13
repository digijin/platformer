import React, { Component } from "react";

export default class BaseButton extends Component {
	state = {
		over: false,
		down: false,
		glitch: 4
	};

	componentDidMount() {
		this.timeout = setTimeout(this.glitch, 100);
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
	}

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
