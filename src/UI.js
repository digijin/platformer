//@flow

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

let reducer = () => {
    
}

export default class UI{
    container: HTMLDivElement
    constructor(container:HTMLDivElement){
        this.container = container;
        this.store = createStore(reducer, this.state);
        this.render();
        this.store.subscribe(this.render.bind(this))
    }
    render = () => {
        ReactDOM.render(<Provider store={this.store}><div>hello world</div></Provider>, this.container);    
    }
}