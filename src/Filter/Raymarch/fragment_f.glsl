

//https://raw.githubusercontent.com/darrenmothersele/raymarch/master/shaders/frag.glsl

#pragma glslify: smin = require(glsl-smooth-min)
#pragma glslify: noise = require(glsl-noise/simplex/2d)
#pragma glslify: unionSDF = require(../utility/unionSDF.glsl)
#pragma glslify: sphereSDF = require(../utility/sphereSDF_f.glsl)
#pragma glslify: sinusoidBumps = require(../utility/sinusoidBumps_f.glsl)
#pragma glslify: lookAtMatrix = require(../utility/lookAtMatrix_f.glsl)
#pragma glslify: rayDirection = require(../utility/rayDirection_f.glsl)

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



/**
 * Signed distance function describing the scene.
 *
 * Absolute value of the return value indicates the distance to the surface.
 * Sign indicates whether the point is inside or outside the surface,
 * negative indicating inside.
 */
float sceneSDF(vec3 samplePoint) {
	float bumps = sinusoidBumps(samplePoint, iTime);
	float sphere1 = sphereSDF(samplePoint, vec3(0.), 1.) + bumps*.1;
	float sphere2 = sphereSDF(samplePoint, vec3(sin(iTime*.75), cos(iTime*.98), sin(iTime*1.2)), 1.) + bumps*.1;
	// float sphereDist = min(sphere1, sphere2);
	float sphereDist = smin(sphere1, sphere2, 0.8);
	// float sphereDist = unionSDF(sphere1, sphere2);

	// for(int i = 0; i<10; i++){
	// 	float sphere = sphereSDF(samplePoint, vec3(sin(iTime*.75+float(i)), cos(iTime*.98+float(i)), sin(iTime*1.2+float(i))), 1.) + bumps*.1;
	// 	sphereDist = min(sphereDist, sphere);
	// }

	return sphereDist;
}


/**
 * Return the shortest distance from the eyepoint to the scene surface along
 * the marching direction. If no part of the surface is found between start and end,
 * return end.
 *
 * eye: the eye point, acting as the origin of the ray
 * marchingDirection: the normalized direction to march in
 * start: the starting distance away from the eye
 * end: the max distance away from the ey to march before giving up
 */
float shortestDistanceToSurface(vec3 eye, vec3 marchingDirection, float start, float end) {
    float depth = start;
    for (int i = 0; i < MAX_MARCHING_STEPS; i++) {
		float dist = sceneSDF(eye + depth * marchingDirection);

        if (dist < EPSILON) {
			return depth;
        }
        depth += dist;
        if (depth >= end) {
			return end;
        }
    }
    return end;
}




/**
 * Using the gradient of the SDF, estimate the normal on the surface at point p.
 */
vec3 estimateNormal(vec3 p) {
    return normalize(vec3(
        sceneSDF(vec3(p.x + EPSILON, p.y, p.z)) - sceneSDF(vec3(p.x - EPSILON, p.y, p.z)),
        sceneSDF(vec3(p.x, p.y + EPSILON, p.z)) - sceneSDF(vec3(p.x, p.y - EPSILON, p.z)),
        sceneSDF(vec3(p.x, p.y, p.z  + EPSILON)) - sceneSDF(vec3(p.x, p.y, p.z - EPSILON))
    ));
}

// /**
//  * Lighting contribution of a single point light source via Phong illumination.
//  *
//  * The vec3 returned is the RGB color of the light's contribution.
//  *
//  * k_a: Ambient color
//  * k_d: Diffuse color
//  * k_s: Specular color
//  * alpha: Shininess coefficient
//  * p: position of point being lit
//  * eye: the position of the camera
//  * lightPos: the position of the light
//  * lightIntensity: color/intensity of the light
//  *
//  * See https://en.wikipedia.org/wiki/Phong_reflection_model#Description
//  */
// vec3 phongContribForLight(vec3 k_d, vec3 k_s, float alpha, vec3 p, vec3 eye,
//                           vec3 lightPos, vec3 lightIntensity) {
//     vec3 N = estimateNormal(p);
//     vec3 L = normalize(lightPos - p);
//     vec3 V = normalize(eye - p);
//     vec3 R = normalize(reflect(-L, N));
//
//     float dotLN = dot(L, N);
//     float dotRV = dot(R, V);
//
//     if (dotLN < 0.0) {
//         // Light not visible from this point on the surface
//         return vec3(0.0, 0.0, 0.0);
//     }
//
//     if (dotRV < 0.0) {
//         // Light reflection in opposite direction as viewer, apply only diffuse
//         // component
//         return lightIntensity * (k_d * dotLN);
//     }
//     return lightIntensity * (k_d * dotLN + k_s * pow(dotRV, alpha));
// }
//
// /**
//  * Lighting via Phong illumination.
//  *
//  * The vec3 returned is the RGB color of that point after lighting is applied.
//  * k_a: Ambient color
//  * k_d: Diffuse color
//  * k_s: Specular color
//  * alpha: Shininess coefficient
//  * p: position of point being lit
//  * eye: the position of the camera
//  *
//  * See https://en.wikipedia.org/wiki/Phong_reflection_model#Description
//  */
// vec3 phongIllumination(vec3 k_a, vec3 k_d, vec3 k_s, float alpha, vec3 p, vec3 eye) {
//     const vec3 ambientLight = 0.5 * vec3(1.0, 1.0, 1.0);
//     vec3 color = ambientLight * k_a;
//
//     vec3 light1Pos = vec3(4.0 * sin(iTime),
//                           2.0,
//                           4.0 * cos(iTime));
//     vec3 light1Intensity = vec3(0.4, 0.4, 0.4);
//
//     color += phongContribForLight(k_d, k_s, alpha, p, eye,
//                                   light1Pos,
//                                   light1Intensity);
//
//     vec3 light2Pos = vec3(2.0 * sin(0.37 * iTime),
//                           2.0 * cos(0.37 * iTime),
//                           2.0);
//     vec3 light2Intensity = vec3(0.4, 0.4, 0.4);
//
//     color += phongContribForLight(k_d, k_s, alpha, p, eye,
//                                   light2Pos,
//                                   light2Intensity);
//     return color;
// }



void main( )
{

	vec3 viewDir = rayDirection(45.0, iResolution.xy, gl_FragCoord.xy);
	vec2 pos =  (iMouse/iResolution.xy) - .5;
    vec3 eye = vec3(10.0* sin(pos.x), 10.0*cos(pos.x), 7.0*pos.y);

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

    // gl_FragColor = vec4(data.rgb, 1.0);


}
