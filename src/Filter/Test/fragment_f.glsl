
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

	gl_FragColor = texture2D(iChannel0, vTextureCoord);

	if(abs(pixelCoord.y - iMouse.y)<10. || abs(pixelCoord.x - iMouse.x)<10.){
		gl_FragColor = vec4(sin(pixelCoord.x/100.), cos(pixelCoord.y/100.), abs(sin(iTime)), 0.5);
	}

	if(iResolution.x-pixelCoord.x < 10.){
		gl_FragColor = vec4(1.,1.,0.,1.);
	}
	if(iResolution.y-pixelCoord.y < 10.){
		gl_FragColor = vec4(1.,1.,0.,1.);
	}
	gl_FragColor += vec4(offFromCenter, 0., 0.);
	// gl_FragColor = vec4(1.);
	// for (int i = 0; i < 3; i++) {
	// 	if(gl_FragCoord.x<seeds[i].x * iResolution.x){
	// 		gl_FragColor *= 0.8;
	// 	}
	// 	if(gl_FragCoord.y<seeds[i].y * iResolution.y){
	// 		gl_FragColor *= 0.8;
	// 	}
	// }

}
