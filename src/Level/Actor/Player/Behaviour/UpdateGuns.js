
import Base from "./Base";
import { ALL } from "Level/Actor/Player/State";
import { PrimaryMap } from "Components/Primary";
import Shell from "GameObject/Shell";
import Point from "Utility/Point";
import config from "config";

export default class UpdateGuns extends Base{

    states = ALL
    update(){
    	if (this.player.primaryReload > 0) {
    		this.player.primaryReload -= this.engine.deltaTime;
    	} else {
    		if (this.engine.input.getButton("fire")) {
    			const primary = PrimaryMap[this.engine.currentPlayer.primary];
    			if (Math.random() < 0.25) {
    				this.engine.register(
    					new Shell({
    						container: this.player.container,
    						position: new Point(this.player.position).add({
    							x: 0,
    							y: -this.player.size.h / 2,
    						}),
    						// x: this.position.x,
    						// y: this.position.y - (this.size.h/2),
    						h: Math.random() - 0.5,
    						v: -Math.random(),
    					})
    				);
    			}
    			// const gunPoint = this.player.leg.gunBarrelPos;
    			const gunPoint = new Point(this.player.position).subtract({ x: 0, y: config.player.size.h / 2 });
    			const diff = this.player.getTargetPoint().subtract(gunPoint);
    			const dir = Math.atan2(diff.y, diff.x);
    			if (this.player.spendEnergy(primary.energyCost)) {
    				this.player.primaryReload = primary.reloadTime;
    				this.engine.register(
    					// new Bullet({
    					new primary.projectile({
    						dir: dir,
    						container: this.player.parent,
    						position: gunPoint,
    						owner: this.player,
    						time: 8,
    						h: Math.cos(dir) * 10,
    						v: Math.sin(dir) * 10,
    					})
    				);
    			}
    		}
    	}
    }

}