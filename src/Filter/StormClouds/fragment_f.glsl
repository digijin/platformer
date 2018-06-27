
precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D iChannel0;

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform vec4 filterArea;

uniform vec2 seeds[16];
uniform vec3 colors[16];

#define PI 3.14159265358979323846

float rand(vec2 c){
	return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float noise(vec2 p, float freq ){
	float unit = iResolution.x/freq;
	vec2 ij = floor(p/unit);
	vec2 xy = mod(p,unit)/unit;
	//xy = 3.*xy*xy-2.*xy*xy*xy;
	xy = .5*(1.-cos(PI*xy));
	float a = rand((ij+vec2(0.,0.)));
	float b = rand((ij+vec2(1.,0.)));
	float c = rand((ij+vec2(0.,1.)));
	float d = rand((ij+vec2(1.,1.)));
	float x1 = mix(a, b, xy.x);
	float x2 = mix(c, d, xy.x);
	return mix(x1, x2, xy.y);
}

float pNoise(vec2 p, int res){
	float persistance = .5;
	float n = 0.;
	float normK = 0.;
	float f = 4.;
	float amp = 1.;
	int iCount = 0;
	for (int i = 0; i<50; i++){
		n+=amp*noise(p, f);
		f*=2.;
		normK+=amp;
		amp*=persistance;
		if (iCount == res) break;
		iCount++;
	}
	float nf = n/normK;
	return nf*nf*nf*nf;
}


void main() {
	vec3 colorFG = vec3(33.,51.,55.)/255.;
	vec3 colorBG = vec3(56.,128.,108.)/255.;

	vec2 pixelCoord = vTextureCoord * filterArea.xy;
	vec2 offFromCenter = (pixelCoord - iResolution/2.)/iResolution;

	vec2 angle = vec2(0.,85.*PI/180.) + offFromCenter/2.;
	// angle += (iMouse/iResolution)-0.5;
	// vec2 angle = (iMouse/iResolution)*30.*PI/180.;
	// angle += offFromCenter * 20.;

	float dist = 1000.;
	//find y offset
	float y = tan(angle.y) * dist;
	// recalculate dist so it can influence x;
	dist = sqrt(pow(dist, 2.)+pow(y, 2.));
	float x = tan(angle.x) * dist;
	vec2 coord = vec2(x,y);// + iMouse;
	coord.x += iTime*100.;
	// vec2 coord = tan(angle) * dist;
	// coord += iMouse;

	float str = pNoise(coord.xy, 16);

	// str = fract(str+iTime/4.);

	vec3 color = mix(colorFG, colorBG, vec3(str));

	// color += vec3(offFromCenter, 0.);
	color = mix(color, vec3(0.), pixelCoord.y/iResolution.y);

	gl_FragColor = vec4(color, 1.);



}
