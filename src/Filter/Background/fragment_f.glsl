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

vec2 hash2( vec2 p )
{
    // procedural white noise
	return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
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
		vec2 screen = (offsetpoint + offsetgrid) * gridsize;
		float dist = 1.-distance(pixelCoord, screen)/10.;
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
