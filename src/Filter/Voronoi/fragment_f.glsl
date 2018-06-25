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

uniform vec2 seeds[8];
uniform vec3 colors[8];

void main() {
    float dist = distance(seeds[0] * iResolution, gl_FragCoord.xy);
    vec3 color = vec3(0.5);
    for (int i = 1; i < 8; i++) {
        float current = distance(seeds[i] * iResolution, gl_FragCoord.xy);
        if (current < dist) {
            color = colors[i];
			color *= 1.-(current/(iResolution.x/4.));
            dist = current;
        }
    }
    gl_FragColor = vec4(color, 1.0);


}
