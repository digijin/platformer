
/** Wrapper for canvas.getContext('2d') */

import Engine from 'Engine';


export default class Context{
	engine:Engine
	constructor(context){
		this.context = context;
		this.engine = Engine.getInstance();
	}

	drawImage(){
		this.context.drawImage( ...arguments);
	}
	clearRect(){
		this.context.clearRect( ...arguments);
	}
	strokeRect(){
		this.context.strokeRect( ...arguments);
	}
	fillText(){
		this.context.fillText( ...arguments);
	}
	fillRect(){
		this.context.fillRect( ...arguments);
	}
	translate(){
		this.context.translate( ...arguments);
	}
	rotate(){
		this.context.rotate( ...arguments);
	}
	setTransform(){
		this.context.setTransform( ...arguments);
	}
	drawSprite = function(image, position = {x:0, y:0}, size = {w:20,h:20}, rotation = 0, registration = {x:.5,y:.5}){
		// console.log(this);
		// position = this.engine.view.offset
		this.context.translate(position.x, position.y);
		this.context.rotate(rotation);
		let imageParams = [image, 0, 0, image.width, image.height]
		this.context.drawImage(...imageParams, 
			-size.w*registration.x, 
			-size.h*registration.y, 
			size.w, size.h)
		// this.setTransform(1, 0, 0, 1, 0, 0); //reset translate and rotate
		this.resetTransform();
	}
	resetTransform(){
		this.context.setTransform(1, 0, 0, 1, 0, 0); //reset translate and rotate
	}
}