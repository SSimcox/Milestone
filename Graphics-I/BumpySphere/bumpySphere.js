/**
 * Created by Steven on 10/24/2016.
 */

var viewTransform;

window.onload = function init()
{
    // Retrieve HTML elements
    var canvas = document.getElementById( "gl-canvas" );

    // Initialize gl
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" );}


    makeSphere();
    octahedronVertices = genNormals(octahedronVertices,octahedronIndex);
    // Execute sierpinskiMountain
    //triangles = getTriangles();

    gl.enable(gl.DEPTH_TEST);
    // Near things obscure far things
    gl.depthFunc(gl.LEQUAL);

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "./shaders/vshader.glsl",
        "./shaders/fshader.glsl" );

    // var program = initShaders( gl, "./shaders/shader.js",
    //     "./shaders/shader.js" );
    gl.useProgram( program );

    // Load the data into the GPU
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(flatten(octahedronVertices)), gl.STATIC_DRAW );
    var indicesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(flatten(octahedronIndex)), gl.STATIC_DRAW);
    // Associate out shader variables with our data buffer
    var vPos = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPos, 3, gl.FLOAT, false, 12, 0);
    gl.enableVertexAttribArray( vPos );

    viewTransform = gl.getUniformLocation(program, "transform");

    console.log(octahedronVertices);
    console.log(octahedronIndex);
    render();
};

var theta = 0;

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // gl.drawArrays( gl.LINE_STRIP, 0, vertices.length);
    //var at = lookAt(vec3(0,0,3),vec3(0,0,0),vec3(0,1,0));
    //var look = perspective(90,1,0,5);
    //var trans = mult(look,at);
    //theta += 2;
    //if(theta >= 358 && theta <= 360) theta = 0;
    //theta = 135;
    //var rot = rotate(theta, [0,1,0]);
    //trans = mult(trans,rot);
    //var trans = at;
    //gl.uniformMatrix4fv(viewTransform, false, flatten(rot));
    gl.drawElements(gl.TRIANGLES, octahedronIndex.length ,gl.UNSIGNED_SHORT,0);

    requestAnimFrame(render);
}