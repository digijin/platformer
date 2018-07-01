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
#define PI 3.14159265359
vec2 hash2( vec2 p )
{
    // procedural white noise
	return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

bool SameSide(vec3 p1, vec3 p2, vec3 a,vec3 b){
	vec3 cp1 = cross(b-a, p1-a);
	vec3 cp2 = cross(b-a, p2-a);
	if( dot(cp1, cp2) >= 0.){
		return true;
	}else{
		return false;
	}
}

bool PointInTriangle(vec3 p, vec3 a,vec3 b,vec3 c){
	if (SameSide(p,a, b,c) && SameSide(p,b, a,c) &&  SameSide(p,c, a,b)){
		return true;
	}else{
		return false;
	}
}
// https://thebookofshaders.com/08/
mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}
float triangle(vec2 ray, vec2 pos, float rot){

		// mat3 tri = mat3( 0., 1.,0.,
		// 				 1.,-1.,0.,
		// 				-1.,-1.,0.) + vec3(pos, 0.);
	vec3 a = vec3(0., 1.,0. ) * 10.;
	vec3 b = vec3(1.,-1.,0. ) * 10.;
	vec3 c = vec3(-1.,-1.,0.) * 10.;

	a = vec3(rotate2d(rot) * a.xy, 0.) + vec3(pos, 0.);
	b = vec3(rotate2d(rot) * b.xy, 0.) + vec3(pos, 0.);
	c = vec3(rotate2d(rot) * c.xy, 0.) + vec3(pos, 0.);

	if(PointInTriangle(vec3(ray, 0.), a,b,c)){
		return 1.;
	}else{
		return 0.;
	}

	// float adist = 1.-distance(ray, a.xy)/10.;
	// float bdist = 1.-distance(ray, b.xy)/10.;
	// float cdist = 1.-distance(ray, c.xy)/10.;
	//
	// return max(adist, max(bdist,cdist));
	// return 1.-distance(ray, pos)/10.;
}
void main( )
{
	vec3 uicolor = vec3(255.,147.,98.)/255.;
	float gridsize = 100.;
	vec2 pixelCoord = vTextureCoord * filterArea.xy;

	pixelCoord.y -= iTime*50.;

	vec2 grid = floor(pixelCoord/gridsize);// + vec2(i,j);

	gl_FragColor = vec4(0.,0.,0.,0.);

    for( int j=-1; j<=1; j++ )
    for( int i=-1; i<=1; i++ )
    {
        vec2 g = vec2(float(i),float(j));


		vec2 offsetgrid = grid + g;
		vec2 offsetpoint = hash2(offsetgrid);

		offsetpoint = 0.5 + 0.5*sin( iTime + 6.2831*offsetpoint );
		vec2 lastOffsetpoint = 0.5 + 0.5*sin( (iTime-0.1) + 6.2831*offsetpoint);
		vec2 offsetDiff = offsetpoint - lastOffsetpoint;
		vec2 screen = (offsetpoint + offsetgrid) * gridsize;
		float dist = triangle(pixelCoord, screen, atan(offsetDiff.y/offsetDiff.x));
		//sin(iTime)*PI
		if(dist > 0.){
			dist *= offsetpoint.y - lastOffsetpoint.y;
			gl_FragColor += vec4(dist*uicolor, dist);
		}
	}

	// vec2 gridpos = pixelCoord - grid*gridsize;
	// if(gridpos.x<1.||gridpos.y<1.){
	// 	gl_FragColor.g  = 1.;
	// }

}
