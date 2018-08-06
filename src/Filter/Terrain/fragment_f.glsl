

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
const float MAX_DIST = 100.0;
const float DELTA_DIST = 0.01;
const float EPSILON = 0.0001;

//golden ratio angle
const float PHI = 137.5 * PI / 180.;


float terrainHeight(vec2 coord){
	// return sin(coord.x)*sin(coord.y);
	return snoise3(vec3(coord/5., iTime/100.));
}
vec3 getNormal( vec3 p )
{
    vec3 n = vec3( terrainHeight(vec2(p.x-EPSILON,p.z)) - terrainHeight(vec2(p.x+EPSILON,p.z)),
	2.0*EPSILON,
	terrainHeight(vec2(p.x,p.z-EPSILON)) - terrainHeight(vec2(p.x,p.z+EPSILON)) );
    return normalize( n );
}

float raymarch(vec3 eye, vec3 marchingDirection, float start, float end, float delta) {
	float t = start;
	for( int i=0; i<256; i++ )
	{
        vec3 pos = eye + t*marchingDirection;
		float h = pos.y - terrainHeight( pos.xz );
		if( h<(0.002*t) || t>end ) break;
		t += 0.5*h;
	}
	return t;
}


void main( )
{

	vec3 viewDir = rayDirection(45.0, iResolution.xy, gl_FragCoord.xy);
	vec3 eye = vec3(40., 3., 20.) + iPosition*10.;
	// vec2 pos =  ((iMouse/iResolution.xy) - .5)*8.;
    // vec3 eye = vec3(40.0* sin(pos.x), 40.*sin(pos.y), 40.0*cos(pos.x)) + iPosition;
	// vec3 eye = iPosition * 40.;
	// eye.x += iTime*10.;
    mat4 viewToWorld = lookAtMatrix(eye, eye+ vec3(1., 0.,0.), vec3(0.0, 1.0, 0.0));
    vec3 worldDir = (viewToWorld * vec4(viewDir, 0.0)).xyz;
    float dist = raymarch(eye, worldDir, MIN_DIST, MAX_DIST, DELTA_DIST);
    if (dist > MAX_DIST - EPSILON) {
        // Didn't hit anything
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
		return;
    }

    // The closest point on the surface to the eyepoint along the view ray
    vec3 p = eye + dist * worldDir;

	vec3 normal = getNormal(p);
	// gl_FragColor = vec4(normal, 1.);

	// float a = 1.5;
	// float b = 1.99;
	// if(length(worldDir-normal)<a){
	// 	gl_FragColor = vec4(vec3(.4), 1.);
	// }else if(length(worldDir-normal)<b){
	// 	gl_FragColor = vec4(vec3(.8), 1.);
	// }else{
	// 	gl_FragColor = vec4(1.,0.,0., 1.);
	// }

	float power = light(
		normalize(vec3(10., 10., 100.)-p),
		normalize(worldDir),
		normal,
		0.5
		);
	gl_FragColor = vec4(vec3(power), 1.);

    // gl_FragColor = vec4(data.rgb, 1.0);


}
