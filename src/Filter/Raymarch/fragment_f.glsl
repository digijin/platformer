

//https://raw.githubusercontent.com/darrenmothersele/raymarch/master/shaders/frag.glsl

#pragma glslify: smin = require(glsl-smooth-min)
#pragma glslify: noise = require(glsl-noise/simplex/2d)

precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D iChannel0;

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform vec4 filterArea;

#define PI 3.1415926535897932384626433832795

/**
 * Part 4 Challenges:
 * - Show the union instead of the intersection
 * - Show cube - sphere
 * - Show sphere - cube
 * - Subtract a new sphere from the cube/sphere intersection to make the top face into a "bowl"
 */

const int MAX_MARCHING_STEPS = 255;
const float MIN_DIST = 0.0;
const float MAX_DIST = 100.0;
const float EPSILON = 0.0001;

/**
 * Constructive solid geometry intersection operation on SDF-calculated distances.
 */
float intersectSDF(float distA, float distB) {
    return max(distA, distB);
}

/**
 * Constructive solid geometry union operation on SDF-calculated distances.
 */
float unionSDF(float distA, float distB) {
    return min(distA, distB);
}

/**
 * Constructive solid geometry difference operation on SDF-calculated distances.
 */
float differenceSDF(float distA, float distB) {
    return max(distA, -distB);
}

/**
 * Signed distance function for a cube centered at the origin
 * with width = height = length = 2.0
 */
float cubeSDF(vec3 p) {
    // If d.x < 0, then -1 < p.x < 1, and same logic applies to p.y, p.z
    // So if all components of d are negative, then p is inside the unit cube
    vec3 d = abs(p) - vec3(1.0, 1.0, 1.0);

    // Assuming p is inside the cube, how far is it from the surface?
    // Result will be negative or zero.
    float insideDistance = min(max(d.x, max(d.y, d.z)), 0.0);

    // Assuming p is outside the cube, how far is it from the surface?
    // Result will be positive or zero.
    float outsideDistance = length(max(d, 0.0));

    return insideDistance + outsideDistance;
}

/**
 * Signed distance function for a sphere centered at the origin with radius 1.0;
 */
float sphereSDF(vec3 p, vec3 center, float radius) {
    return length(p-center) - radius;
}

//returns a sliced up sphere
float sphericalCapSDF(vec3 p, float pc){
	float plane = pc;//*2.-1.;
	float sphereDist = sphereSDF(p, vec3(0.), 1.);
	if(p.x > plane){
		return max(p.x - plane, sphereDist);
	}
	return sphereDist;

}
float sphericalSliceSDF(vec3 p, float s1, float s2){
	float top = max(s1, s2);
	float bottom = min(s1, s2);
	// float plane = pc;//*2.-1.;
	float sphereDist = sphereSDF(p, vec3(0.), 1.);
	// if(p/
	if(p.x < bottom){
		return max(bottom - p.x, sphereDist);
	}
	if(p.x > top){
		return max(p.x - top, sphereDist);
	}
	return sphereDist;

}

float sinusoidBumps(in vec3 p){
	float f = 6.;

    return sin(p.x*f+iTime*0.57)*cos(p.y*f+iTime*2.17)*sin(p.z*f-iTime*1.31);// + 0.5*sin(p.x*32.+iTime*0.07)*cos(p.y*32.+iTime*2.11)*sin(p.z*32.-iTime*1.23);
}

/**
 * Signed distance function describing the scene.
 *
 * Absolute value of the return value indicates the distance to the surface.
 * Sign indicates whether the point is inside or outside the surface,
 * negative indicating inside.
 */
vec4 sceneSDF(vec3 samplePoint) {
	float bumps = sinusoidBumps(samplePoint);
	float sphere1 = sphereSDF(samplePoint, vec3(0.), 1.) + bumps*.1;
	float sphere2 = sphereSDF(samplePoint, vec3(sin(iTime*.75), cos(iTime*.98), sin(iTime*1.2)), 1.) + bumps*.1;
	// float sphereDist = min(sphere1, sphere2);
	float sphereDist = smin(sphere1, sphere2, 0.8);

	// for(int i = 0; i<10; i++){
	// 	float sphere = sphereSDF(samplePoint, vec3(sin(iTime*.75+float(i)), cos(iTime*.98+float(i)), sin(iTime*1.2+float(i))), 1.) + bumps*.1;
	// 	sphereDist = min(sphereDist, sphere);
	// }

	return vec4(vec3(1.), sphereDist);
}
vec4 sphericalSlicesSceneSDF(vec3 samplePoint) {

	// return vec4( vec3(0.8), sphereSDF(samplePoint, vec3(0., 0. , 0.), 1.) + 0.04*sinusoidBumps(samplePoint));

    // float sphereDist = sphereSDF(samplePoint / 1.2) * 1.2;
    // float sphereCapDist = sphericalCapSDF(samplePoint / 1.2, sin(iTime)) * 1.2;
    // float cubeDist = cubeSDF(samplePoint);
    // return intersectSDF(cubeDist, sphereDist);
	// return intersectSDF(sphereDist, sphereCapDist);
	// return sphereCapDist;
	float pc = mod(iTime/4., 1.);
	// float sliceB = sphericalSliceSDF(samplePoint, sin(iTime+PI), cos(iTime+PI));
	float bumps = sinusoidBumps(samplePoint);

	float phase = pc*4.;
	float planeA = -1.;
	float planeB = clamp(1. - phase, -1., 1.);
	float planeC = clamp(2. - phase, -1., 1.);
	float planeD = clamp(3. - phase, -1., 1.);
	float planeE = 1.;

	float amp = 0.1;
	float sliceA = sphericalSliceSDF(samplePoint, planeA, planeB)+ amp*bumps;
	float sliceB = sphericalSliceSDF(samplePoint, planeB, planeC)+ amp*bumps;
	float sliceC = sphericalSliceSDF(samplePoint, planeC, planeD)+ amp*bumps;
	float sliceD = sphericalSliceSDF(samplePoint, planeD, planeE)+ amp*bumps;
	//yellow red dark light
	if(sliceA < sliceB){
		return vec4( vec3(1.,1.,0.),sliceA);
	}else if(sliceB < sliceC){
		return vec4( vec3(1.,0.,0.),sliceB);
	}else if(sliceC < sliceD){
		return vec4( vec3(0.4),sliceC);
	}else{
		return vec4( vec3(0.8),sliceD);
	}
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
vec4 shortestDistanceToSurface(vec3 eye, vec3 marchingDirection, float start, float end) {
    float depth = start;
    for (int i = 0; i < MAX_MARCHING_STEPS; i++) {
		vec4 data = sceneSDF(eye + depth * marchingDirection);
        float dist = data.a;
        if (dist < EPSILON) {
			// return depth;
			return vec4(data.xyz,depth);
        }
        depth += dist;
        if (depth >= end) {
            // return end;
			return vec4(data.xyz,end);
        }
    }
    return vec4(vec3(1.),end);
}


/**
 * Return the normalized direction to march in from the eye point for a single pixel.
 *
 * fieldOfView: vertical field of view in degrees
 * size: resolution of the output image
 * fragCoord: the x,y coordinate of the pixel in the output image
 */
vec3 rayDirection(float fieldOfView, vec2 size, vec2 fragCoord) {
    vec2 xy = fragCoord - size / 2.0;
    float z = size.y / tan(radians(fieldOfView) / 2.0);
    return normalize(vec3(xy, -z));
}

/**
 * Using the gradient of the SDF, estimate the normal on the surface at point p.
 */
vec3 estimateNormal(vec3 p) {
    return normalize(vec3(
        sceneSDF(vec3(p.x + EPSILON, p.y, p.z)).a - sceneSDF(vec3(p.x - EPSILON, p.y, p.z)).a,
        sceneSDF(vec3(p.x, p.y + EPSILON, p.z)).a - sceneSDF(vec3(p.x, p.y - EPSILON, p.z)).a,
        sceneSDF(vec3(p.x, p.y, p.z  + EPSILON)).a - sceneSDF(vec3(p.x, p.y, p.z - EPSILON)).a
    ));
}

/**
 * Lighting contribution of a single point light source via Phong illumination.
 *
 * The vec3 returned is the RGB color of the light's contribution.
 *
 * k_a: Ambient color
 * k_d: Diffuse color
 * k_s: Specular color
 * alpha: Shininess coefficient
 * p: position of point being lit
 * eye: the position of the camera
 * lightPos: the position of the light
 * lightIntensity: color/intensity of the light
 *
 * See https://en.wikipedia.org/wiki/Phong_reflection_model#Description
 */
vec3 phongContribForLight(vec3 k_d, vec3 k_s, float alpha, vec3 p, vec3 eye,
                          vec3 lightPos, vec3 lightIntensity) {
    vec3 N = estimateNormal(p);
    vec3 L = normalize(lightPos - p);
    vec3 V = normalize(eye - p);
    vec3 R = normalize(reflect(-L, N));

    float dotLN = dot(L, N);
    float dotRV = dot(R, V);

    if (dotLN < 0.0) {
        // Light not visible from this point on the surface
        return vec3(0.0, 0.0, 0.0);
    }

    if (dotRV < 0.0) {
        // Light reflection in opposite direction as viewer, apply only diffuse
        // component
        return lightIntensity * (k_d * dotLN);
    }
    return lightIntensity * (k_d * dotLN + k_s * pow(dotRV, alpha));
}

/**
 * Lighting via Phong illumination.
 *
 * The vec3 returned is the RGB color of that point after lighting is applied.
 * k_a: Ambient color
 * k_d: Diffuse color
 * k_s: Specular color
 * alpha: Shininess coefficient
 * p: position of point being lit
 * eye: the position of the camera
 *
 * See https://en.wikipedia.org/wiki/Phong_reflection_model#Description
 */
vec3 phongIllumination(vec3 k_a, vec3 k_d, vec3 k_s, float alpha, vec3 p, vec3 eye) {
    const vec3 ambientLight = 0.5 * vec3(1.0, 1.0, 1.0);
    vec3 color = ambientLight * k_a;

    vec3 light1Pos = vec3(4.0 * sin(iTime),
                          2.0,
                          4.0 * cos(iTime));
    vec3 light1Intensity = vec3(0.4, 0.4, 0.4);

    color += phongContribForLight(k_d, k_s, alpha, p, eye,
                                  light1Pos,
                                  light1Intensity);

    vec3 light2Pos = vec3(2.0 * sin(0.37 * iTime),
                          2.0 * cos(0.37 * iTime),
                          2.0);
    vec3 light2Intensity = vec3(0.4, 0.4, 0.4);

    color += phongContribForLight(k_d, k_s, alpha, p, eye,
                                  light2Pos,
                                  light2Intensity);
    return color;
}

/**
 * Return a transform matrix that will transform a ray from view space
 * to world coordinates, given the eye point, the camera target, and an up vector.
 *
 * This assumes that the center of the camera is aligned with the negative z axis in
 * view space when calculating the ray marching direction. See rayDirection.
 */
mat4 viewMatrix(vec3 eye, vec3 center, vec3 up) {
    // Based on gluLookAt man page
    vec3 f = normalize(center - eye);
    vec3 s = normalize(cross(f, up));
    vec3 u = cross(s, f);
    return mat4(
        vec4(s, 0.0),
        vec4(u, 0.0),
        vec4(-f, 0.0),
        vec4(0.0, 0.0, 0.0, 1)
    );
}

void main( )
{
	// vec3 dir = rayDirection(45.0, iResolution.xy, gl_FragCoord.xy);
    // vec3 eye = vec3(0.0, 0.0, 15.0);
    // float dist = shortestDistanceToSurface(eye, dir, MIN_DIST, MAX_DIST);

    // if (dist > MAX_DIST - EPSILON) {
    //     // Didn't hit anything
    //     gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
	// 	return;
    // }

    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);

	////
	vec3 viewDir = rayDirection(45.0, iResolution.xy, gl_FragCoord.xy);
	vec2 pos =  (iMouse/iResolution.xy) - .5;
    vec3 eye = vec3(10.0* sin(pos.x), 10.0*cos(pos.x), 7.0*pos.y);

    mat4 viewToWorld = viewMatrix(eye, vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0));

    vec3 worldDir = (viewToWorld * vec4(viewDir, 0.0)).xyz;

	vec4 data = shortestDistanceToSurface(eye, worldDir, MIN_DIST, MAX_DIST);
    float dist = data.a;

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

	gl_FragColor = vec4(normal, 1.);

	// if(length(worldDir-normal)<1.8){
	// 	gl_FragColor = vec4(vec3(.4), 1.);
	// }else if(length(worldDir-normal)<1.999){
	// 	gl_FragColor = vec4(vec3(.8), 1.);
	// }else{
	// 	gl_FragColor = vec4(1.,0.,0., 1.);
	// }

    // gl_FragColor = vec4(data.rgb, 1.0);


}
