

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


float sceneSDF(vec3 samplePoint) {
	samplePoint.z = mod(samplePoint.z, 8.)-4.;
	return length(samplePoint)-1.;
}
#pragma glslify: shortestDistanceToSurface = require(../utility/Raymarch_f.glsl,sceneSDF=sceneSDF)
#pragma glslify: estimateNormal = require(../utility/estimateNormal_f.glsl,sceneSDF=sceneSDF)

void main( )
{

	vec3 viewDir = rayDirection(45.0, iResolution.xy, gl_FragCoord.xy);
	vec3 eye = iPosition*10.;
    mat4 viewToWorld = lookAtMatrix(eye, eye+ iRotation, vec3(0.0, 1.0, 0.0));
    vec3 worldDir = (viewToWorld * vec4(viewDir, 0.0)).xyz;
	float dist = shortestDistanceToSurface(eye, worldDir, MIN_DIST, MAX_DIST);
    if (dist > MAX_DIST - EPSILON) {
        // Didn't hit anything
        gl_FragColor = vec4(worldDir, 0.0);
		return;
    }

    // The closest point on the surface to the eyepoint along the view ray
    vec3 p = eye + dist * worldDir;
	vec3 normal = estimateNormal(p);

	vec3 lightpos = vec3(0., 100., 0.);

	float power = light(
		normalize(lightpos-p),
		normalize(worldDir),
		normal,
		0.5
		);
	gl_FragColor = vec4(vec3(power), 1.);

    // gl_FragColor = vec4(data.rgb, 1.0);


}
