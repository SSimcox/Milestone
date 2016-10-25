attribute vec4 vPosition;
attribute vec3 myColor;

varying vec3 outColor;
uniform mat4 transform;

void main() {
    float r = (vPosition.x + 1.0) * 0.5;
    outColor = vec3(r, 0.0, 1.0);
    float scale = 1.0;
    float move = 0.0;
    mat4 moveBack = mat4(
    scale,0,0,0,
    0,scale,0,0,
    0,0,scale,move,
    0,0,0,1.0
    );
	gl_PointSize = 1.0;
    gl_Position = moveBack * vPosition;
}