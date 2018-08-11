
precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D iChannel0;

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform vec4 filterArea;
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

void main( )
{
	float pc = fract(-iTime/2.);
	vec2 pixelCoord = vTextureCoord * filterArea.xy;
	vec2 coord = vTextureCoord;
	// coord.x += iTime;
	float noise = snoise2(coord*4.)/2.;
	noise += snoise2(coord*8.)/4.;
	noise += snoise2(coord*16.)/8.;
	noise += snoise2(coord*32.)/16.;
	noise = abs(noise);
	noise = 1.-noise;
	noise *= noise*noise;
	
	noise = 1.0-noise*(1.-pc);


	vec2 centerOffset = (pixelCoord/iResolution)-.5;
	// if(length(centerOffset)< fract(iTime)){
	// 	noise = 1.;
	// }
	// noise *= length(centerOffset);
	// noise = max(smoothstep(length(centerOffset)-.5, length(centerOffset) +0.1,  fract(-iTime/8.)), noise);
	float str = clamp(pc - length(centerOffset),0.,1.);
	str = smoothstep(0.3, 0.6, str);
	// noise = noise*str;
	noise = mix(noise, 1., str);
	gl_FragColor = vec4(vec3(noise), 1.);


}
