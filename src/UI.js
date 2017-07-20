//@flow

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Router from 'UI/Router'

let reducer = () => {

}

export default class UI{
    container: HTMLDivElement;
    store: Object;
    constructor(container:HTMLDivElement){
        this.container = container;
        this.store = createStore(reducer, this.state);
        this.render();
        this.store.subscribe(this.render.bind(this))
    }
    render = () => {
        ReactDOM.render(<Provider store={this.store}><div>UI Layer<Router /></div></Provider>, this.container);    
    }
    dispatch = (action:Object) => {
        this.store.dispatch(action)
    }
}