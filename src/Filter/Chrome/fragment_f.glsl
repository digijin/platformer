// Created by inigo quilez - iq/2013
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

// Volumetric clouds. It performs level of detail (LOD) for faster rendering

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
	vec4 base = texture2D(uSampler, vTextureCoord);
	// gl_FragColor = texture2D(uSampler, vTextureCoord);
	vec3 colour = vec3(vTextureCoord.y)* base.a;
	gl_FragColor = vec4(colour, base.a);
	if(pixelCoord.y-40. <4.){
		gl_FragColor = vec4(vec3(.8), 1.);
	}
	gl_FragColor = gl_FragColor * base.a;

	for(int i = 0; i<3; i++)
	{
		// vec2 offsetCoord = vec2(pixelCoord.x, pixelCoord.y-float(i))/filterArea.xy;
		// vec4 sample = texture2D(uSampler, offsetCoord);
		// if(sample.a<0.1 && base.a > 0.1){
		// 	gl_FragColor = vec4(1.,0.,0.,1.);
		// 	// gl_FragColor.x = mix(gl_FragColor.x, 1., 0.5);
		// }

		// offsetCoord = vec2(pixelCoord.x-float(i), pixelCoord.y)/filterArea.xy;
		// sample = texture2D(uSampler, offsetCoord);
		// if(sample.a<0.1 && base.a > 0.1){
		// 	gl_FragColor = vec4(1.,0.,0.,1.);
		// 	// gl_FragColor.x = mix(gl_FragColor.x, 1., 0.5);
		// }
	}

}
