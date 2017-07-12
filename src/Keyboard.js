
export class Keyboard{
    keysdown: Array<number>;
    constructor(){
        this.keysdown = []
        window.onkeydown = (e) => {
            //strip duplicates
            if(!this.down(e.keyCode)){
                this.keysdown.push(e.keyCode);
            }
        }
        window.onkeyup = (e) => {
            this.keysdown.splice(this.keysdown.indexOf(e.keyCode), 1);
        }
    }
    down = (key) => {
        return this.keysdown.indexOf(key)>-1;
    }
}
