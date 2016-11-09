/**
 * Created by Steven on 10/24/2016.
 */

var viewTransform;
var modelView;
var lightRotation;
var theta = 0;
var delta = 0;
var isRotating = false;
var mouseDown = false;



window.onload = function init()
{
    document.body.addEventListener('mousedown',function(){
        mouseDown = true;
        console.log(mouseDown);
    });
    document.body.addEventListener('mouseup',function(){
        mouseDown = false;
        console.log(mouseDown);
    });
    // Retrieve HTML elements
    var canvas = document.getElementById( "gl-canvas" );

    // Initialize gl
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" );}

    // document.getElementById('BSRotate').addEventListener('click', function(){
    //     isRotating = !isRotating;
    // });

    document.getElementById('LRotL').addEventListener('click', function(){delta-=5;});
    document.getElementById('LRotR').addEventListener('click', function(){delta+=5;});
    document.getElementById('SRotL').addEventListener('click', function(){theta-=5;});
    document.getElementById('SRotR').addEventListener('click', function(){theta+=5;});






    makeCylinder();
    cylinderVertices = genNormals(cylinderVertices,cylinderIndex);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    //gl.cullFace(gl.FRONT);
    // Near things obscure far things
    gl.depthFunc(gl.LEQUAL);

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    // var program = initShaders( gl, "./shaders/vshader.glsl",
    //     "./shaders/fshader.glsl" );

    var program = initShaders( gl, "vertex-shader",
        "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(flatten(octahedronVertices)), gl.STATIC_DRAW );
    var indicesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(flatten(cylinderIndex)), gl.STATIC_DRAW);
    // Associate out shader variables with our data buffer
    var vPos = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPos, 3, gl.FLOAT, false, 12, 0);
    gl.enableVertexAttribArray( vPos );
    var vNorm = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer( vNorm, 3, gl.FLOAT, false, 12, 12);
    gl.enableVertexAttribArray( vNorm );

    viewTransform = gl.getUniformLocation(program, "perspective");
    modelView = gl.getUniformLocation(program, "modelView");
    lightRotation = gl.getUniformLocation(program, "lightRotation");

    render();
};


function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // gl.drawArrays( gl.LINE_STRIP, 0, vertices.length);
    var at = lookAt(vec3(0,0,3),vec3(0,0,0),vec3(0,1,0));
    var look = perspective(60,1,0,5);
    if(isRotating){ theta += 1;}
    var objectRot = rotate(theta, [0,1,0]);
    var lightRot = rotate(delta,[0,1,0]);
    var trans = mult(at,objectRot);
    var lightTrans = mult(at, lightRot);

    theta = $('#SSlide').val();
    delta = $('#LSlide').val();

    gl.uniformMatrix4fv(modelView, false, flatten(trans));
    gl.uniformMatrix4fv(viewTransform,false,flatten(look));
    gl.uniformMatrix4fv(lightRotation,false,flatten(lightTrans));
    gl.drawElements(gl.TRIANGLES, cylinderIndex.length ,gl.UNSIGNED_SHORT,0);

    requestAnimFrame(render);
}