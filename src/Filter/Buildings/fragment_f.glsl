

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

const bool TRANSPARENT = true;



const int MAX_MARCHING_STEPS = 256;
const float MIN_DIST = 0.0;
const float MAX_DIST = 1000.0;
const float DELTA_DIST = 0.01;
const float EPSILON = 0.0001;
//golden ratio angle
const float PHI = 137.5 * PI / 180.;

const float GRIDSIZE = 8.;

float sceneSDF(vec3 samplePoint) {
	vec2 block = floor(samplePoint.xz / GRIDSIZE);
	float n = ceil(pow(abs(snoise2(block)), 2.) * 10.);
	vec3 point = vec3(
		mod(samplePoint.x, GRIDSIZE)-(GRIDSIZE/2.),
		samplePoint.y - n,
		mod(samplePoint.z, GRIDSIZE)-(GRIDSIZE/2.)
	);
	// samplePoint.x = mod(samplePoint.x, GRIDSIZE)-(GRIDSIZE/2.);
	// samplePoint.z = mod(samplePoint.z, GRIDSIZE)-(GRIDSIZE/2.);
	// vec2 block = vec2(floor(samplePoint.x/GRIDSIZE), floor(samplePoint.y/GRIDSIZE));
	// float buildings = MAX_DIST;
	// samplePoint.y = samplePoint.y - n;
	float building = boxSDF(point, vec3(3.,1.+(n),3.));

	//find distance from outer bounds;

	// float outer = boxSDF(samplePoint, vec3(4.,12.,4.));
	// if(outer<0.){
	// 	building = min(building, -outer);
	// }

	return building;
	// return length(samplePoint)-1.;
}
float outerSDF(vec3 samplePoint){
	vec3 point = vec3(
		mod(samplePoint.x, GRIDSIZE)-(GRIDSIZE/2.),
		samplePoint.y,
		mod(samplePoint.z, GRIDSIZE)-(GRIDSIZE/2.)
	);
	return -boxSDF(point, vec3(4.,10.,4.));
}

const float DEPTH_RATIO = .5;
const float DEPTH_MAX_STEP = 1.;

float cloudnoise(vec3 point){

	float topfadeout = smoothstep(10.,5., point.y);
	float noise = max(snoise3(point/5.), 0.);
	
	// if(point.y>5.){
	// 	return 0.;
	// }

	return mix(0., noise, topfadeout);
}

vec2 raymarch(vec3 eye, vec3 marchingDirection, float start, float end) {
    float depth = start;
	float dist = 0.;
	float cloud = 0.;
    for (int i = 0; i < MAX_MARCHING_STEPS; i++) {
		vec3 point = eye + depth * marchingDirection;
		dist = sceneSDF(point);
		if (dist < EPSILON) {
			return vec2(depth, cloud);
		}
		// float outer = outerSDF(point);
		// if(outer < 0.){
		// 	outer = 10.;
		// }
		if(dist * DEPTH_RATIO > DEPTH_MAX_STEP){
			cloud += cloudnoise(point);
			depth += DEPTH_MAX_STEP;
		}else{
			cloud += cloudnoise(point) * dist * DEPTH_RATIO / DEPTH_MAX_STEP;
        	depth += dist * DEPTH_RATIO;
		}
		// cloud = max(cloud, cloudnoise(point));


        if (depth >= end) {
			return vec2(end, cloud);
        }
    }
	if (dist < EPSILON) {
		return vec2(depth, cloud);
	}else{
    	return vec2(end, cloud);
	}
}
#pragma glslify: estimateNormal = require(../utility/estimateNormal_f.glsl,sceneSDF=sceneSDF)

void main( )
{

	vec3 viewDir = rayDirection(90.0, iResolution.xy, gl_FragCoord.xy);
	vec3 eye = iPosition*10. + (vec3(2.,0.,-1.)*iTime*1.);
    mat4 viewToWorld = lookAtMatrix(eye, eye+ iRotation, vec3(0.0, 1.0, 0.0));
    vec3 worldDir = (viewToWorld * vec4(viewDir, 0.0)).xyz;
	vec2 result = raymarch(eye, worldDir, MIN_DIST, MAX_DIST); 
	float dist = result.x;
	float cloud = result.y /10.;
    if (dist > MAX_DIST - EPSILON) {
        // Didn't hit anything
        // gl_FragColor = vec4(worldDir, 0.0);
		gl_FragColor = vec4(vec3(0.),0.);
		return;
    }

    // The closest point on the surface to the eyepoint along the view ray
    vec3 p = eye + dist * worldDir;
	vec3 normal = estimateNormal(p);

	vec3 lightpos = vec3(0., 10., 0.);
	
	vec3 tint = vec3(255., 147., 98.) /255.;
    // gl_FragColor = vec4(normal, 1.0);
	float degree = (normal.x/2.) + (normal.y/4.) + (normal.z/8.) + (1./8.);

	if(TRANSPARENT){
		gl_FragColor = vec4(vec3(0.), degree - cloud);
	}else{
		gl_FragColor = vec4(degree*tint, 1.0);
	}

	
	//WINDOWS
	// if(fract(p.x)>0.1 && fract(p.x)<0.9){
	// 	if(fract(p.y)>0.1 && fract(p.y)<0.9){
	// 	// gl_FragColor.g = 1.;
	// 	// gl_FragColor = vec4(tint, 0.);
	// 	gl_FragColor = gl_FragColor / 2.;
	// 	gl_FragColor.a = 1.;
	// 	}
	// }

	//cloud
	// gl_FragColor.r = cloud / 10.;

	//FADE IN
	float fadein = smoothstep(0.,2.,iTime);
	gl_FragColor = mix(vec4(0.), gl_FragColor, fadein);
	// float power = light(
	// 	normalize(lightpos-p),
	// 	normalize(worldDir),
	// 	normal,
	// 	0.5
	// 	);
	// gl_FragColor = vec4(vec3(power), 1.);

    // gl_FragColor = vec4(data.rgb, 1.0);


}
