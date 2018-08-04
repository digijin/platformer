

//https://raw.githubusercontent.com/darrenmothersele/raymarch/master/shaders/frag.glsl

#pragma glslify: smin = require(glsl-smooth-min)
#pragma glslify: combineChamfer = require(glsl-combine-chamfer)
#pragma glslify: noise = require(glsl-noise/simplex/2d)
#pragma glslify: unionSDF = require(../utility/unionSDF.glsl)
#pragma glslify: sphereSDF = require(../utility/sphereSDF_f.glsl)
#pragma glslify: sinusoidBumps = require(../utility/sinusoidBumps_f.glsl)
#pragma glslify: lookAtMatrix = require(../utility/lookAtMatrix_f.glsl)
#pragma glslify: rayDirection = require(../utility/rayDirection_f.glsl)
#pragma glslify: light = require(glsl-specular-blinn-phong)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: snoise4 = require(glsl-noise/simplex/4d)
#pragma glslify: ease = require(glsl-easings/exponential-out)

precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D iChannel0;

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform vec4 filterArea;

#define PI 3.1415926535897932384626433832795

const int MAX_MARCHING_STEPS = 255;
const float MIN_DIST = 0.0;
const float MAX_DIST = 100.0;
const float EPSILON = 0.0001;

//golden ratio angle
const float PHI = 137.5 * PI / 180.;


/**
 * Signed distance function describing the scene.
 *
 * Absolute value of the return value indicates the distance to the surface.
 * Sign indicates whether the point is inside or outside the surface,
 * negative indicating inside.
 */
float sceneSDF(vec3 samplePoint) {

	float sphere1 = sphereSDF(samplePoint, vec3(0.), 1.);
	// float sphere2 = sphereSDF(samplePoint, vec3(sin(iTime*.75), cos(iTime*.98), sin(iTime*1.2)), 1.+cos(iTime*2.8)/4.);

	// float sphereDist = smin(sphere1, sphere2, 0.1);// + snoise4(vec4(samplePoint, iTime))*0.1;

	float sphereDist = sphere1;

	for(int i = 0; i<20; i++){
		float angle = PHI * float(i);

		// float sphere = sphereSDF(samplePoint, vec3(sin(iTime*.75+float(i)), cos(iTime*.98+float(i)), sin(iTime*1.2+float(i))), 1.);// + bumps*.1;
		vec3 pos = vec3(sin(angle), cos(angle), 0.)*float(i)/4.;
		float size = 1. + float(i)/10.;
		// size *= fract(iTime/10.);
		size *= ease(smoothstep((float(i)-5.)/20., (float(i)+1.)/20., fract(iTime/4.)));
		float sphere = sphereSDF(samplePoint, pos, size);
		sphereDist = smin(sphereDist, sphere, 0.2);
	}

	return sphereDist+  0.1*snoise3(samplePoint);
}

#pragma glslify: shortestDistanceToSurface = require(../utility/Raymarch_f.glsl,sceneSDF=sceneSDF)
#pragma glslify: estimateNormal = require(../utility/estimateNormal_f.glsl,sceneSDF=sceneSDF)



void main( )
{

	vec3 viewDir = rayDirection(45.0, iResolution.xy, gl_FragCoord.xy);
	vec2 pos =  ((iMouse/iResolution.xy) - .5)*8.;
    vec3 eye = vec3(10.0* sin(pos.x), 10.0*cos(pos.x), 20.0);
    mat4 viewToWorld = lookAtMatrix(eye, vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0));
    vec3 worldDir = (viewToWorld * vec4(viewDir, 0.0)).xyz;
    float dist = shortestDistanceToSurface(eye, worldDir, MIN_DIST, MAX_DIST);
    if (dist > MAX_DIST - EPSILON) {
        // Didn't hit anything
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
		return;
    }

    // The closest point on the surface to the eyepoint along the view ray
    vec3 p = eye + dist * worldDir;
	//
    // vec3 K_a = vec3(0.2, 0.2, 0.2);
    // vec3 K_d = vec3(0.7, 0.2, 0.2);
    // vec3 K_s = vec3(1.0, 1.0, 1.0);
    // float shininess = 10.0;
	//
    // vec3 color = phongIllumination(K_a, K_d, K_s, shininess, p, eye);
	//
    // gl_FragColor = vec4(color, 1.0);
	vec3 normal = estimateNormal(p);
	//translate from world to camera;
	// normal = worldDir-normal;
	// gl_FragColor = vec4(normal, 1.0);
	// vec3 screenNormal = vec3(length(worldDir-normal)/2.);

	// gl_FragColor = vec4(normal, 1.);

	float a = 1.8;
	float b = 1.99;
	if(length(worldDir-normal)<a){
		gl_FragColor = vec4(vec3(.4), 1.);
	}else if(length(worldDir-normal)<b){
		gl_FragColor = vec4(vec3(.8), 1.);
	}else{
		gl_FragColor = vec4(1.,0.,0., 1.);
	}

	// float power = light(
	// 	normalize(vec3(10., 10., 100.)-p),
	// 	normalize(worldDir),
	// 	normal,
	// 	0.5
	// 	);
	// gl_FragColor = vec4(vec3(power), 1.);

    // gl_FragColor = vec4(data.rgb, 1.0);


}
