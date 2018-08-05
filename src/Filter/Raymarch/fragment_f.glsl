

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
const float MAX_DIST = 200.0;
const float EPSILON = 0.0001;

//golden ratio angle
const float PHI = 137.5 * PI / 180.;


float sdCone( in vec3 p, in vec3 c )
{
    vec2 q = vec2( length(p.xz), p.y );
    float d1 = -q.y-c.z;
    float d2 = max( dot(q,c.xy), q.y);
    return length(max(vec2(d1,d2),0.0)) + min(max(d1,d2), 0.);
}
float sdCapsule( vec3 p, vec3 a, vec3 b, float r )
{
    vec3 pa = p - a, ba = b - a;
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
    return length( pa - ba*h ) - r;
}

mat4 rotationMatrix(vec3 axis, float angle)
{
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;

    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

mat3 rotAxis(vec3 axis, float a) {
	float s=sin(a);
	float c=cos(a);
	float oc=1.0-c;
	vec3 as=axis*s;
	mat3 p=mat3(axis.x*axis,axis.y*axis,axis.z*axis);
	mat3 q=mat3(c,-as.z,as.y,as.z,c,-as.x,-as.y,as.x,c);
	return p*oc+q;
}

/**
 * Signed distance function describing the scene.
 *
 * Absolute value of the return value indicates the distance to the surface.
 * Sign indicates whether the point is inside or outside the surface,
 * negative indicating inside.
 */
float sceneSDF(vec3 samplePoint) {

	float blockwidth = 3.;
	vec3 block = floor(samplePoint/blockwidth);
	samplePoint.x = mod(samplePoint.x, blockwidth) - blockwidth/2.;
	samplePoint.z = mod(samplePoint.z, blockwidth) - blockwidth/2.;
	// float sphere = sphereSDF(samplePoint, vec3(0.), 1.4);
	float box = boxSDF(samplePoint, vec3(1., 1., 1.));
	return box;
	//max(-sphere, box);

}

#pragma glslify: shortestDistanceToSurface = require(../utility/Raymarch_f.glsl,sceneSDF=sceneSDF)
#pragma glslify: estimateNormal = require(../utility/estimateNormal_f.glsl,sceneSDF=sceneSDF)



void main( )
{

	vec3 viewDir = rayDirection(45.0, iResolution.xy, gl_FragCoord.xy);
	vec2 pos =  ((iMouse/iResolution.xy) - .5)*8.;
    vec3 eye = vec3(40.0* sin(pos.x), 40.*sin(pos.y), 40.0*cos(pos.x));
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

	vec3 normal = estimateNormal(p);

	// float a = 1.8;
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
