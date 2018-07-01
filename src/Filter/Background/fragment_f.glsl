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
	float gridsize = 100.;
	vec2 pixelCoord = vTextureCoord * filterArea.xy;
	vec2 offFromCenter = (pixelCoord - iResolution/2.)/iResolution;

	vec2 grid = floor(pixelCoord/gridsize);// + vec2(i,j);
	vec2 gridpos = pixelCoord - grid*gridsize;
	vec2 point = hash2(grid);
	gl_FragColor = vec4(0.,0.,0.,1.);
	// for(int i=-1;i<=1;i++){
	// 	for(int j=-1;j<=1;j++){


		vec2 offsetgrid = grid + vec2(0.,-1.);
		vec2 offsetpoint = hash2(offsetgrid);
		vec2 screen = (offsetpoint + offsetgrid) * gridsize;
		gl_FragColor.r += 1.-distance(pixelCoord, screen)/10.;

	// 	}
	// }
	// }
	if(gridpos.x<1.||gridpos.y<1.){
		gl_FragColor.g  = 1.;
	}

	gl_FragColor.b += 1.-length(point-gridpos/gridsize)*10.;

	// gl_FragColor = texture2D(iChannel0, vTextureCoord);
	//
	// if(abs(pixelCoord.y - iMouse.y)<10. || abs(pixelCoord.x - iMouse.x)<10.){
	// 	gl_FragColor = vec4(sin(pixelCoord.x/100.), cos(pixelCoord.y/100.), abs(sin(iTime)), 0.5);
	// }
	//
	// if(iResolution.x-pixelCoord.x < 10.){
	// 	gl_FragColor = vec4(1.,1.,0.,1.);
	// }
	// if(iResolution.y-pixelCoord.y < 10.){
	// 	gl_FragColor = vec4(1.,1.,0.,1.);
	// }
	// gl_FragColor += vec4(offFromCenter, 0., 0.);
	// // gl_FragColor = vec4(1.);
	// // for (int i = 0; i < 3; i++) {
	// // 	if(gl_FragCoord.x<seeds[i].x * iResolution.x){
	// // 		gl_FragColor *= 0.8;
	// // 	}
	// // 	if(gl_FragCoord.y<seeds[i].y * iResolution.y){
	// // 		gl_FragColor *= 0.8;
	// // 	}
	// // }

}
