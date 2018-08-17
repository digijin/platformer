import React, { Component } from "react";
import PropTypes from "prop-types";
const engineConnect = ComponentToWrap => {
	return class EngineComponent extends Component {
		static contextTypes = {
			engine: PropTypes.object.isRequired,
		};

		render() {
			const { engine } = this.context;
			// what we do is basically rendering `ComponentToWrap`
			// with an added `theme` prop, like a hook
			return <ComponentToWrap {...this.props} engine={engine} />;
		}
	};
};
export default engineConnect;
