 export default class MainMenu{
     constructor(){

     }
     update({ctx, deltaTime}){
        ctx.rotate(deltaTime)
        ctx.fillText('game!', 0, 6);
     }
 }