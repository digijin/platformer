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
const float TERRAIN_MAX_HEIGHT = 1.5;

//golden ratio angle
const float PHI = 137.5 * PI / 180.;

float fbmnoise3(vec3 point){
    float n = 0.;
    n += snoise3(point) / 2.;
    n += snoise3(point*2.) / 4.;
    n += snoise3(point*4.) / 8.;
    // n += snoise3(point*8.) / 16.;
    return n;
}


float terrainHeight(vec2 coord){
    // return sin(coord.x)*sin(coord.y);
    return -abs(fbmnoise3(vec3(coord/8., iTime/50.)))*TERRAIN_MAX_HEIGHT;
}
vec3 getNormal(vec3 p)
{
    vec3 n = vec3(terrainHeight(vec2(p.x-EPSILON, p.z)) - terrainHeight(vec2(p.x+EPSILON, p.z)),
    2.0*EPSILON,
    terrainHeight(vec2(p.x, p.z-EPSILON)) - terrainHeight(vec2(p.x, p.z+EPSILON)));
    return normalize(n);
}

float raymarch(vec3 eye, vec3 marchingDirection, float start, float end, float delta) {
    float t = start;
    // return early if ray is looking down
    if (marchingDirection.y <0.){
        return end;
    }

    //take big first step because we know there is nothing between eye.y and -TERRAIN_MAX__HEIGHT
    float ydiff = eye.y-(-TERRAIN_MAX_HEIGHT);//10 - - 1.5 = +8.5
    t = ydiff / marchingDirection.y;

    for (int i=0; i<32; i++)
    {
        vec3 pos = eye + t*marchingDirection;
        float h =  terrainHeight(pos.xz) - pos.y;
        if (h<(0.002*t) || t>end) break;
        t += 0.9*h;
    }
    return t;
}


void main()
{

    //    vec3 colorFG = vec3(33., 51., 55.)/255.;
    vec3 colorFG = vec3(13., 25., 25.)/255.;
    vec3 colorBG = vec3(56., 128., 108.)/255.;

    vec3 viewDir = rayDirection(45.0, iResolution.xy, gl_FragCoord.xy);
    vec3 eye = vec3(40., -20., 20.) + iPosition*100.;
    eye.z += iTime;
    eye.x += iTime;
    mat4 viewToWorld = lookAtMatrix(eye, eye+ iRotation, vec3(0.0, 1.0, 0.0));
    vec3 worldDir = (viewToWorld * vec4(viewDir, 0.0)).xyz;
    float dist = raymarch(eye, worldDir, MIN_DIST, MAX_DIST, DELTA_DIST);
    if (dist > MAX_DIST - EPSILON) {
        // Didn't hit anything
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        return;
    }

    // The closest point on the surface to the eyepoint along the view ray
    vec3 p = eye + dist * worldDir;

    //    vec3 normal = getNormal(p);
    //    vec3 lightpos = vec3(10., 10., 10.) + eye;
    //
    //    float power = light(
    //    normalize(lightpos-p),
    //    normalize(worldDir),
    //    normal,
    //    0.5
    //    );
    float str = pow(-p.y/TERRAIN_MAX_HEIGHT, .2);

    str = smoothstep(0., 1., str);

    vec3 tint = mix(colorBG, colorFG, vec3(str));

    //    gl_FragColor = vec4(vec3(power)* tint, 1.);
    gl_FragColor = vec4(tint, 1.);
    // gl_FragColor = vec4(data.rgb, 1.0);


}
