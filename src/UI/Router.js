import React from 'react';
import Menu from './MainMenu/Menu';


export default class Router extends React.Component{

    props:{scene:string}
    render(){
        return <Menu />
    }
}