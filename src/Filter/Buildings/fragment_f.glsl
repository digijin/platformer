

//https://raw.githubusercontent.com/darrenmothersele/raymarch/master/shaders/frag.glsl
//http://iquilezles.org/www/articles/distfunctions/distfunctions.htm

#pragma glslify: smin = require(glsl-smooth-min)
#pragma glslify: combineChamfer = require(glsl-combine-chamfer)
#pragma glslify: noise = require(glsl-noise/simplex/2d)
#pragma glslify: unionSDF = require(../utility/unionSDF.glsl)
#pragma glslify: sphereSDF = require(../utility/sphereSDF_f.glsl)
#pragma glslify: boxSDF = require(../utility/sdBox_f.glsl)
#pragma glslify: sinusoidBumps = require(../utility/sinusoidBumps_f.glsl)
#pragma glslify: lookAtMatrix = require(../utility/lookAtMatrix_f.glsl)
#pragma glslify: rayDirection = require(../utility/rayDirection_f.glsl)
#pragma glslify: light = require(glsl-specular-blinn-phong)
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: snoise4 = require(glsl-noise/simplex/4d)
#pragma glslify: ease = require(glsl-easings/exponential-out)

precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D iChannel0;

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform vec3 iPosition;
uniform vec3 iRotation;
uniform float iTime;
uniform vec4 filterArea;

#define PI 3.1415926535897932384626433832795

const int MAX_MARCHING_STEPS = 1023;
const float MIN_DIST = 0.0;
const float MAX_DIST = 1000.0;
const float DELTA_DIST = 0.01;
const float EPSILON = 0.0001;
//golden ratio angle
const float PHI = 137.5 * PI / 180.;

const float GRIDSIZE = 8.;

float sceneSDF(vec3 samplePoint) {
	vec2 block = floor(samplePoint.xz / GRIDSIZE);
	samplePoint.x = mod(samplePoint.x, GRIDSIZE)-(GRIDSIZE/2.);
	samplePoint.z = mod(samplePoint.z, GRIDSIZE)-(GRIDSIZE/2.);
	// vec2 block = vec2(floor(samplePoint.x/GRIDSIZE), floor(samplePoint.y/GRIDSIZE));
	float buildings = MAX_DIST;
	for(int x = -1; x<1; x++){
		for(int y = -1; y<1; y++){
			vec3 offset = vec3(float(x), 0., float(y));
			float n = abs(snoise2(block + offset.xz));
			float building = boxSDF(samplePoint+(offset*GRIDSIZE), vec3(3.,1.+(n*6.),3.));
			buildings = min(buildings,building);
		}
	}
	// building +=

	return buildings;
	// return length(samplePoint)-1.;
}
float raymarch(vec3 eye, vec3 marchingDirection, float start, float end) {
    float depth = start;
	float dist = 0.;
    for (int i = 0; i < MAX_MARCHING_STEPS; i++) {
		dist = sceneSDF(eye + depth * marchingDirection);
		if (dist < EPSILON) {
		return depth;
		}
        depth += dist * .3;
        if (depth >= end) {
			return end;
        }
    }
	if (dist < EPSILON) {
		return depth;
	}else{
    	return end;
	}
}
#pragma glslify: estimateNormal = require(../utility/estimateNormal_f.glsl,sceneSDF=sceneSDF)

void main( )
{

	vec3 viewDir = rayDirection(45.0, iResolution.xy, gl_FragCoord.xy);
	vec3 eye = iPosition*10.;
    mat4 viewToWorld = lookAtMatrix(eye, eye+ iRotation, vec3(0.0, 1.0, 0.0));
    vec3 worldDir = (viewToWorld * vec4(viewDir, 0.0)).xyz;
	float dist = raymarch(eye, worldDir, MIN_DIST, MAX_DIST);
    if (dist > MAX_DIST - EPSILON) {
        // Didn't hit anything
        gl_FragColor = vec4(worldDir, 0.0);
		return;
    }

    // The closest point on the surface to the eyepoint along the view ray
    vec3 p = eye + dist * worldDir;
	vec3 normal = estimateNormal(p);

	vec3 lightpos = vec3(0., 10., 0.);
	
    gl_FragColor = vec4(normal, 1.0);

	// float power = light(
	// 	normalize(lightpos-p),
	// 	normalize(worldDir),
	// 	normal,
	// 	0.5
	// 	);
	// gl_FragColor = vec4(vec3(power), 1.);

    // gl_FragColor = vec4(data.rgb, 1.0);


}
