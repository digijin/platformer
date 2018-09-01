
import GameObject from "GameObject";
import Level from "Scene/Level";
import generateDungeon from "./generateDungeon";

class GeneratorManager extends GameObject {
	constructor(manager){
		super();
		this.manager = manager;
	}

	init(engine){
		super.init(engine);
		this.gen = generateDungeon(engine, this.manager);
	}

	update(){
		const result = this.gen.next();
		if(result.done){
			this.destroy();
			this.engine.stage.removeChild(this.manager.container);
			this.engine.startScene(new Level());
		}
	}
}

export default GeneratorManager;