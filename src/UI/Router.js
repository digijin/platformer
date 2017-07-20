import React from 'react';
import Menu from './MainMenu/Menu';

import type Engine from 'Engine'

export default class Router extends React.Component{

    props:{
        scene:string,
        engine: Engine
    }
    render(){
        return <Menu engine={this.props.engine} />
    }
}