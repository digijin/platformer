//@flow

import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Router from "UI/Router";
import reducer from "UI/reducer";

import type Engine from "Engine";

export default class UI {
	container: HTMLDivElement;
	store: Object;
	engine: Engine;

	constructor(container: HTMLDivElement, engine: Engine) {
		this.engine = engine;
		this.container = container;
		this.store = createStore(reducer, {});
		this.render();
		this.store.subscribe(this.render.bind(this));
	}
	render = () => {
		ReactDOM.render(
			<Provider store={this.store}>
				<MuiThemeProvider>
					<div id="ui-container">
						<Router engine={this.engine} />
					</div>
				</MuiThemeProvider>
			</Provider>,
			this.container
		);
	};
	dispatch = (action: Object) => {
		this.store.dispatch(action);
	};
}
