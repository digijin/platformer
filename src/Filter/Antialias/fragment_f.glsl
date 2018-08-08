
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
	// gl_FragColor = uSampler(gl_FragCoord);
	// vec2 pixelCoord = vTextureCoord * filterArea.xy;
	// vec2 offFromCenter = (pixelCoord - iResolution/2.)/iResolution;

	vec4 base = texture2D(uSampler, vTextureCoord);
	vec4 above = texture2D(uSampler, vTextureCoord + vec2(0., 1.)/iResolution);
	vec4 below = texture2D(uSampler, vTextureCoord + vec2(0.,-1.)/iResolution);
	vec4 left = texture2D(uSampler, vTextureCoord + vec2(-1., 0.)/iResolution);
	vec4 right = texture2D(uSampler, vTextureCoord + vec2( 1.,0.)/iResolution);

	vec4 ab = mix(base, above+below/2., 0.5);
	vec4 lr = mix(base, left +right/2., 0.5);

	gl_FragColor = mix(lr, ab, .5);

	// gl_FragColor = vec4(1.-vTextureCoord, 0., 1.);

	// if(abs(pixelCoord.y - iMouse.y)<10. || abs(pixelCoord.x - iMouse.x)<10.){
	// 	gl_FragColor = vec4(sin(pixelCoord.x/100.), cos(pixelCoord.y/100.), abs(sin(iTime)), 0.5);
	// }

	// if(iResolution.x-pixelCoord.x < 10.){
	// 	gl_FragColor = vec4(1.,1.,0.,1.);
	// }
	// if(iResolution.y-pixelCoord.y < 10.){
	// 	gl_FragColor = vec4(1.,1.,0.,1.);
	// }
	// gl_FragColor += vec4(offFromCenter, 0., 0.);
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
