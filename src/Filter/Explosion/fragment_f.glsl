
precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D iChannel0;

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform vec4 filterArea;

void main( )
{
	vec2 pixelCoord = vTextureCoord * filterArea.xy;
	vec2 offFromCenter = (pixelCoord - iResolution/2.)/iResolution;
	vec2 offFromMouse = (pixelCoord-iMouse)/iResolution;

	if(length(offFromCenter) <0.5){

		gl_FragColor = vec4(1.);
		float pc = abs(sin(iTime));
		vec2 midpoint = mix(offFromMouse, offFromCenter, vec2(pc));
		if(length(midpoint)< pc/2.){
			gl_FragColor = vec4(0.);
			// gl_FragColor = mix(vec4(0.), vec4(1.), vec4(length(offFromMouse)/length(offFromCenter)));
			// gl_FragColor.a = length(offFromMouse/offFromCenter);
		}


	}
	// if(length(offFromMouse) <0.5){
	// 	gl_FragColor = vec4(1.,0.,0.,1.);
	// }


}
