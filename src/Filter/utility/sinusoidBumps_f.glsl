
 float sinusoidBumps(in vec3 p, float iTime){
 	float f = 6.;

     return sin(p.x*f+iTime*0.57)*cos(p.y*f+iTime*2.17)*sin(p.z*f-iTime*1.31);// + 0.5*sin(p.x*32.+iTime*0.07)*cos(p.y*32.+iTime*2.11)*sin(p.z*32.-iTime*1.23);
 }
#pragma glslify: export(sinusoidBumps)
