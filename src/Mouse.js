
import Point from 'Point'
export default class Mouse{
    position: Point;
    constructor(){
        this.position = new Point({x:0, y:0})
        document.addEventListener('mousemove', (e) => {
            this.position = new Point({x:e.clientX, y: e.clientY});
        })
    }
}

