
/**
 * Signed distance function for a sphere centered at the origin with radius 1.0;
 */
float sphereSDF(vec3 p, vec3 center, float radius) {
    return length(p-center) - radius;
}

#pragma glslify: export(sphereSDF)
