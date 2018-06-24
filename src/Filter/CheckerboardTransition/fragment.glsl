precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec2 mouse;
uniform vec2 resolution;
uniform float time;
void main(){
	float blockWidth = 50.0;
	// float pc = abs(mod(time, 1.0));
	float pc = mouse.y/resolution.y * 2.0;
	//invert
	pc -= (resolution.y-gl_FragCoord.y) / resolution.y;
	float col = ceil(gl_FragCoord.x/blockWidth);
	if(mod(gl_FragCoord.y + (col * blockWidth/2.0), blockWidth) < blockWidth * pc){
		gl_FragColor = vec4(0.0,0.0,0.0,0.0);
	}else{
		gl_FragColor = texture2D(uSampler, vTextureCoord);
	}
}
