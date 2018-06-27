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

uniform vec2 seeds[16];
uniform vec3 colors[16];

void main() {
    float closest = distance(seeds[0] * iResolution, gl_FragCoord.xy);
	float next = closest;
    vec3 color = vec3(0.5);
    for (int i = 0; i < 16; i++) {
        float current = distance(seeds[i] * iResolution, gl_FragCoord.xy);
        if (current < closest) {
            color = colors[i];
			// color = vec4(1.,1.,1.,1.);
			// color *= 1.-(current/(iResolution.x/4.));
			next = closest;
            closest = current;
        }else if(current < next){
			next = current;
		}
    }
	float ratio = closest/next;
	// color *= ratio;
	color = mix(color, vec3(0.), ratio);
	// color = vec3(ratio);
    gl_FragColor = vec4(color, 1.0);


}
