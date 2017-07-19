import React from 'react';
 


export default class MainMenu extends React.Component {
     render(){
         return <div>
            Main Menu
            <button onClick={() => {console.log('play');
            }}>Play</button>
         
         </div>
     } 
 }