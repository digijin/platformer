
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
	// //in'n'out
	// gl_FragColor = texture2D(uSampler, vTextureCoord);

	// // gl_FragColor = uSampler(gl_FragCoord);
	// vec2 pixelCoord = vTextureCoord * filterArea.xy;
	// vec2 coord = pixelCoord/iResolution.xy;
	// // vec2 offFromCenter = (pixelCoord - iResolution/2.)/iResolution;

	// vec4 base = texture2D(uSampler, coord);
	// vec4 above = texture2D(uSampler, coord + vec2(0., 1.)/iResolution);
	// vec4 below = texture2D(uSampler, coord + vec2(0.,-1.)/iResolution);
	// vec4 left = texture2D(uSampler, coord + vec2(-1., 0.)/iResolution);
	// vec4 right = texture2D(uSampler, coord + vec2( 1.,0.)/iResolution);

	// vec4 ab = mix(base, above+below/2., 0.5);
	// vec4 lr = mix(base, left +right/2., 0.5);

	// gl_FragColor = mix(lr, ab, .5);

	vec4 combined = vec4(0.);
	for(float i=-2.; i<=2.; i+=1.){
	for(float j=-2.; j<=2.; j+=1.){
		combined = combined + texture2D(uSampler, vTextureCoord + vec2(i, j)/iResolution);
	}}

	gl_FragColor = combined/25.;

	
}
