//http://www.html5gamedevs.com/topic/29327-guide-to-pixi-v4-filters/ for dimensions
precision highp float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D iChannel0;

uniform vec2 iResolution;
uniform vec2 iDimensions;
uniform vec2 iMouse;
uniform float iTime;
uniform vec4 filterArea;
uniform vec4 inputSize;
uniform vec4 outputFrame;

void main()
{
    vec2 pixelCoord = vTextureCoord * inputSize.xy + outputFrame.xy;
    vec2 pcCoord = (pixelCoord) / iDimensions;
    // vec2 pcCoord = vTextureCoord;

    vec2 block = mod(pixelCoord, 25.);

    if (block.x>10.){
        // gl_FragColor = vec4(vec3(1.), 1.);
        gl_FragColor = vec4(0., smoothstep(25., 10., block.x), 0., 1.);
    } else {
        gl_FragColor = vec4(1., 0., 0., 1.);
    }
    // gl_FragColor = texture2D(iChannel0, pcCoord);

    // if(pcCoord.x<.1 || pcCoord.x>.9
    // || pcCoord.y<.1 || pcCoord.y>.9){
    // 	// gl_FragColor = vec4(pcCoord.xy, 1., 1.);
    // 	gl_FragColor = vec4(vec3(0.), 1.);
    // }

    // if(pcCoord.x<.1){
    // 	gl_FragColor = vec4(smoothstep(0., .1, pcCoord.x), 0., 0. ,1.);
    // }
    // if(pcCoord.x>.9){
    // 	gl_FragColor = vec4(smoothstep(.9, 1., pcCoord.x), 0., 0. ,1.);
    // }


}
