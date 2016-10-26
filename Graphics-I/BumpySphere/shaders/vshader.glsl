attribute vec4 vPosition;
attribute vec3 myColor;

varying vec3 outColor;
uniform mat4 worldView;
uniform mat4 perspective;


void main() {

    vec4 ambient = vec4(.15,.15,.15,1.0);
    vec4 diffuse = vec4(.35,.35,.35,1.0);
    vec4 specular = vec4(.5,.5,.5,1.0);






    float scale = 1.0;
    float move = 0.0;
    mat4 moveBack = mat4(
    scale,0,0,0,
    0,scale,0,0,
    0,0,scale,move,
    0,0,0,1.0
    );


    outColor = vec3(0.0,1.0,1.0);
	gl_PointSize = 1.0;
    gl_Position = moveBack * vPosition;
}