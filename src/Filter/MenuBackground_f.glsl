precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform vec2 resolution;
uniform float time;

void main(){

	vec2 center = resolution / 2.0;
	float dist = distance(center, vec2(gl_FragCoord));
	if(dist < 30.0){
		gl_FragColor = vec4(gl_FragCoord.x/resolution.x,gl_FragCoord.x/resolution.y,sin(time),0.5);
		
	}
}
