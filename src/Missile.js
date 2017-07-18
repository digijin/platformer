

import missile from './missile.png'
import Smoke from 'Smoke'
import Explosion from 'Explosion'
export default class Missile{
    position:Point;
    direction: number;
    target:Point;
    speed: number
    constructor(params:{position:Point, direction: number, target:Point}){
        Object.assign(this, params);
        this.speed = 1;
        this.guided = true;
    }
    explode(){
        this.destroy();
    }
    update = ({ctx, deltaTime, mouse, register}) => {
        // console.log('"asd');

        this.position.y += Math.sin(this.direction)*this.speed;
        this.position.x += Math.cos(this.direction)*this.speed;

        //smoke trail
        // console.log('asdads');
        
        register(new Smoke({position: this.position.clone()}))

        //aim at target
        // this.target = mouse.position
        if(this.guided){
            let diff = this.target.subtract(this.position);
            let dist = Math.pow(diff.x, 2) + Math.pow(diff.y, 2);
            if(dist < 20){
                this.explode();
                for(let i = 0; i< 10; i++){
                    //we want red outlines to be on the outside
                    //pick a direction
                    let dir = Math.random()*Math.PI*2;
                    let dist = Math.random() * 20;
                    let offset = {x:Math.cos(dir)*dist, y:Math.sin(dir)*dist};
                    register(new Explosion({
                        position: this.position.add(offset), 
                        rotation: dir,
                        delay: Math.random()/8
                    }))
                    // register(new Explosion({position: this.position.add({x:(Math.random()-0.5)*30, y:(Math.random()-0.5)*30})}))
                }
            }
            let newdir = Math.atan2(diff.y, diff.x);

            // debugTextDiv.innerHTML = 'current: '+this.direction+"<br />target: "+newdir

            let dirDiff = this.direction - newdir;
            if(dirDiff > Math.PI) 
                newdir += 2*Math.PI
            if(dirDiff < -Math.PI) 
                newdir -= 2*Math.PI
            
            //recalculate now we have removed cyclic variance
            dirDiff = (newdir - this.direction)

            //TODO REMOVE HARDCODING
            if(Math.abs(dirDiff) < 0.5){
                this.speed += deltaTime*8;
                this.direction += dirDiff/3
            }else{
                this.speed -= deltaTime*5;
                // this.speed = (this.speed + 1) /2;
                if(dirDiff > 0){
                    this.direction += deltaTime *Math.PI
                }else{
                    this.direction -= deltaTime *Math.PI
                }
            }
            if(this.speed<1)this.speed = 1;
            if(this.speed>8)this.speed = 8;

            //dont spin it up too much
            // if(Math.abs(this.direction>Math.PI*2)){
            //     this.direction = this.direction % (Math.PI/2);
            // }
            if(this.direction>Math.PI) this.direction -= Math.PI*2
            if(this.direction<-Math.PI) this.direction += Math.PI*2

        }
        
        //draw box
        // ctx.fillRect(this.position.x, this.position.y, 10, 10);
        
        //draw image
        // ctx.drawImage(missile, 0, 0, missile.width, missile.height, this.position.x, this.position.y, 10, 10)

        // //draw image rotated
        // let w = 20;
        // let h = 20;
        // ctx.translate(this.position.x, this.position.y);
        // ctx.rotate(this.direction)
        // ctx.drawImage(missile, 0, 0, missile.width, missile.height, -w/2, -h/2, w, h);
        // ctx.setTransform(1, 0, 0, 1, 0, 0); //reset translate and rotate

        ctx.drawSprite(missile, this.position, {w:40, h:40}, this.direction, {x:.5, y:.5});


    }
}
