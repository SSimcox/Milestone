attribute vec4 vPosition;
attribute vec4 vNormal;
attribute vec3 myColor;

varying vec4 outColor;
uniform mat4 modelView;
uniform mat4 perspective;
uniform mat4 lightRotation;


void main() {

    vec4 ambientProduct = vec4(.5,0.25,0.0,1.0);
    vec4 diffuseProduct = vec4(.75,0.37,0.0,1.0);
    vec4 specularProduct = vec4(1.0,.5,0.0,1.0);
    float shininess = 50.0;
    vec4 lightPosition = vec4(1.0,1.0,2.0,0.0);//Hard coded for now


    vec3 pos = (modelView * vPosition).xyz;

    //fixed light postion

    vec3 light = (lightRotation * lightPosition).xyz;
    //vec3 light = lightPosition.xyz;
    //vec3 L = normalize( light - pos );
    vec3 L = normalize(lightPosition.xyz);
    L = normalize(light);

    vec3 E = -normalize( pos );
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

    outColor.a = 1.0;
	gl_PointSize = 1.0;
    gl_Position = perspective * modelView * vPosition;
}