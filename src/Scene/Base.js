// @flow

import type Engine from 'Engine';

export default class SceneBase{
    engine: Engine
    start(engine:Engine){
        this.engine = engine;
        // this.engine.currentScene = this
        console.log('STARTSCENE');

    }
    end(){
        //wipe engine
        this.engine.objects = [];
        console.log('ENDSCENE');
    }
}