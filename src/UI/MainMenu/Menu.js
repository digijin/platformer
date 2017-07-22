import React from 'react';
import { connect } from 'react-redux';

import Level from 'Scene/Level'

class MainMenu extends React.Component {
     render(){
         return <div>
            Main Menu
            <div id="instructions">
            <pre>
            a:move left
            d:move right
            space:jump/booster
            e:grapple arm
            left mouse:primary (guns)
            right mouse:secondary (missiles)
            
            </pre>
            </div>
            <button onClick={this.props.play}>Play</button>
         </div>
     } 
 }

function mapStateToProps(state:Object, props:Object):Object {
	return {
	};
}

function mapDispatchToProps(dispatch:Function, props:Object):Object {
	return {
        play: () => {
            props.engine.startScene(new Level());
        },
		close: (id) => {
			// dispatch({type:'CLOSE_CONTEXT_MENU'});
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);