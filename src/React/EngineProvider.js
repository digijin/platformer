import React, { Component, Children } from "react";
import PropTypes from "prop-types";

class EngineProvider extends Component {
	static propTypes = {
		engine: PropTypes.object.isRequired
	};

	// you must specify what you’re adding to the context
	static childContextTypes = {
		engine: PropTypes.object.isRequired
	};

	getChildContext() {
		const { engine } = this.props;
		return { engine };
	}

	render() {
		// `Children.only` enables us not to add a <div /> for nothing
		return Children.only(this.props.children);
	}
}
export default EngineProvider;
