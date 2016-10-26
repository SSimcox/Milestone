attribute vec4 vPosition;
attribute vec4 vNormal;
attribute vec3 myColor;

varying vec4 outColor;
uniform mat4 modelView;
uniform mat4 perspective;
//uniform vec3 lightPosition;


void main() {

    vec4 ambientProduct = vec4(0,.15,.15,1.0);
    vec4 diffuseProduct = vec4(0,.35,.35,1.0);
    vec4 specularProduct = vec4(1.0,.5,.5,1.0);
    float shininess = 100.0;
    vec3 lightPosition = vec3(2.0,2.0,0.0);//Hard coded for now


    vec3 pos = -(modelView * vPosition).xyz;

    //fixed light postion

    vec3 light = lightPosition.xyz;
    vec3 L = normalize( light - pos );


    vec3 E = normalize( -pos );
    vec3 H = normalize( L + E );

    vec4 NN = vec4(vNormal.xyz,0);

    // Transform vertex normal into eye coordinates

    vec3 N = normalize( (modelView*NN).xyz);

    // Compute terms in the illumination equation
    vec4 ambient = ambientProduct;

    float Kd = max( dot(L, N), 0.0 );
    vec4  diffuse = Kd*diffuseProduct;

    float Ks = pow( max(dot(N, H), 0.0), shininess );
    vec4  specular = Ks * specularProduct;

    if( dot(L, N) < 0.0 ) {
	specular = vec4(0.0, 0.0, 0.0, 1.0);
    }
    outColor = (ambient + diffuse +specular);


    float scale = 1.0;
    float move = 0.0;
    mat4 moveBack = mat4(// Hard coded worldView
    scale,0,0,0,
    0,scale,0,0,
    0,0,scale,move,
    0,0,0,1.0
    );

	gl_PointSize = 1.0;
    gl_Position = moveBack * vPosition;
}