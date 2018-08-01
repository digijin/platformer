#pragma glslify: sphereSDF = require(./sphereSDF.glsl)
/**
 * Signed distance function for a sphere centered at the origin with radius 1.0;
 */
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
#pragma glslify: export(sphericalSliceSDF)
