// @flow
export default class Game{
    container: HTMLElement;
    ctx:Object;
    shells: Array<Object>;
    lastTime: number;
    constructor(container:HTMLElement){
        let canvas = document.createElement('CANVAS');
        container.appendChild(canvas);
        this.ctx = canvas.getContext('2d');
        this.ctx.fillRect(10, 10, 40, 40);

        this.shells = [];
        this.lastTime = new Date().getTime();
        requestAnimationFrame(this.update)

    }
    update = () => {
        let nowTime = new Date().getTime();
        let diff = nowTime - this.lastTime;
        this.lastTime = nowTime;
        // console.log(''.padStart(diff, '1'))


        this.ctx.clearRect(0,0, 200, 200);
        this.shells.push({
            x: 50,
            y: 50,
            h: Math.random()-0.5,
            v: -Math.random()
        })
        // this.shells.forEach( shell => {
        // })
        this.shells = this.shells.filter((shell) => {
            shell.x += shell.h;
            shell.y += shell.v;
            shell.v += 0.01;
            this.ctx.fillRect(shell.x, shell.y, 4, 4);
            return (shell.y <= 100);
        })
        
        // this.ctx.fillRect(10, 10, 40*Math.random(), 40*Math.random());
        requestAnimationFrame(this.update)
    }
}