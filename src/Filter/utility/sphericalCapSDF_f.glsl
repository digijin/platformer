
#pragma glslify: sphereSDF = require(./sphereSDF.glsl)

//returns a sliced up sphere
float sphericalCapSDF(vec3 p, vec3 center, float radius, float pc){
	float plane = pc;//*2.-1.;
	float sphereDist = sphereSDF(p, center, radius);
	if(p.x > plane){
		return max(p.x - plane, sphereDist);
	}
	return sphereDist;

}

#pragma glslify: export(sphericalCapSDF)
