/**
 * Created by Steven on 10/24/2016.
 */

var viewTransform;
var modelView;
var scale;
var theta = 0;
var delta = 0;

var cameraPosition = vec3(0,300,300);
var lookAtPosition = vec3(0,0,0);





window.onload = function init()
{
    initButtons();

    // Retrieve HTML elements
    var canvas = document.getElementById( "gl-canvas" );

    // Initialize gl
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" );}

    makeSphere();
    octahedronVertices = genNormals(octahedronVertices,octahedronIndex);
    console.log(octahedronIndex);
    console.log(octahedronVertices);

    gl.enable(gl.DEPTH_TEST);
    //gl.enable(gl.CULL_FACE);
    //gl.cullFace(gl.BACK);
    //gl.cullFace(gl.FRONT);
    // Near things obscure far things
    gl.depthFunc(gl.LEQUAL);

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

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
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(flatten(octahedronIndex)), gl.STATIC_DRAW);
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
    scale = gl.getUniformLocation(program, "scale");
    lookat = gl.getUniformLocation(program, "lookat");
    amb = gl.getUniformLocation(program, "ap");
    diff = gl.getUniformLocation(program, "dp");
    spec = gl.getUniformLocation(program, "sp");


    firstCalc();
    render();
};


function render()
{
    nextCalc();
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // gl.drawArrays( gl.LINE_STRIP, 0, vertices.length);
    // var at = lookAt(cameraPosition,lookAtPosition,vec3(0,1,0));
    // var look = perspective(60,1,.1,1000);
    // //if(isRotating){ theta += 1;}
    // var objectRot = rotate(theta, [0,1,0]);
    // var trans = mult(at,objectRot);
    // var lightTrans = mat4();
    //
    //
    // gl.uniformMatrix4fv(modelView, false, flatten(trans));
    // gl.uniformMatrix4fv(viewTransform,false,flatten(look));
    // gl.uniformMatrix4fv(lightRotation,false,flatten(lightTrans));
    // gl.drawElements(gl.TRIANGLES, octahedronIndex.length ,gl.UNSIGNED_SHORT,0);
    drawPlanet(planets[0]);
    drawPlanet(planets[1]);
    drawPlanet(planets[2]);
    requestAnimFrame(render);
}

function drawPlanet(planet){
    var scalar = mat4(getBaseLog(10,planet.mass));
    var position = translate(planet.posx,0,planet.posy);
    var at = lookAt(cameraPosition,lookAtPosition,vec3(0,1,0));
    var look = perspective(60,1,.1,1000);
    //if(isRotating){ theta += 1;}
    var objectRot = rotate(theta, [0,1,0]);
    var trans = mult(at,position);
    var lightTrans = mat4();

    gl.uniformMatrix4fv(lookat,false,flatten(at));
    gl.uniformMatrix4fv(modelView, false, flatten(trans));
    gl.uniformMatrix4fv(viewTransform,false,flatten(look));
    gl.uniformMatrix4fv(lightRotation,false,flatten(lightTrans));
    gl.uniformMatrix4fv(scale,false,flatten(scalar));
    gl.uniform4fv(amb,flatten(planet.ap));
    gl.uniform4fv(diff,flatten(planet.dp));
    gl.uniform4fv(spec,flatten(planet.sp));
    gl.drawElements(gl.TRIANGLES, octahedronIndex.length ,gl.UNSIGNED_SHORT,0);
}

function initButtons(){
    $('#restart-btn').click(firstCalc);
    $('#forward').click(walkFoward);
    $('#left').click(walkLeft);
    $('#right').click(walkRight);
    $('#backward').click(walkBackward);

    $('#rright').click(rotRight);
    $('#rleft').click(rotLeft);
    $('#rup').click(rotUp);
    $('#rdown').click(rotDown);

}

function walkFoward(){
    var lookingDir = subtract(lookAtPosition,cameraPosition);
    lookingDir = normalize(lookingDir);
    lookingDir = vec3(lookingDir[0]*5,0,lookingDir[2]*5);
    lookAtPosition = add(lookAtPosition, lookingDir);
    cameraPosition = add(cameraPosition, lookingDir);
}

function walkBackward(){
    var lookingDir = subtract(lookAtPosition,cameraPosition);
    lookingDir = normalize(lookingDir);
    lookingDir = vec3(lookingDir[0]*5,0,lookingDir[2]*5);
    lookAtPosition = subtract(lookAtPosition, lookingDir);
    cameraPosition = subtract(cameraPosition, lookingDir);
}

function walkLeft(){
    var lookingDir = subtract(lookAtPosition,cameraPosition);
    lookingDir = normalize(lookingDir);
    var rot = rotate(90,[0,1,0]);
    lookingDir = multMatVector(rot,vec4(lookingDir,0));
    lookingDir = vec3(lookingDir[0]*5,0,lookingDir[2]*5);
    lookAtPosition = add(lookAtPosition, lookingDir);
    cameraPosition = add(cameraPosition, lookingDir);
}

function walkRight(){
    var lookingDir = subtract(lookAtPosition,cameraPosition);
    lookingDir = normalize(lookingDir);
    var rot = rotate(90,[0,1,0]);
    lookingDir = multMatVector(rot,vec4(lookingDir,0));
    lookingDir = vec3(lookingDir[0]*5,0,lookingDir[2]*5);
    lookAtPosition = subtract(lookAtPosition, lookingDir);
    cameraPosition = subtract(cameraPosition, lookingDir);
}

function rotRight(){
    cameraPosition = subtract(cameraPosition, lookAtPosition);
    var rot = rotate(15,[0,1,0]);
    cameraPosition = multMatVector(rot, vec4(cameraPosition,0));
    cameraPosition = vec3(cameraPosition[0],cameraPosition[1],cameraPosition[2]);
    cameraPosition = add(cameraPosition, lookAtPosition);
}

function rotLeft(){
    cameraPosition = subtract(cameraPosition, lookAtPosition);
    var rot = rotate(-15,[0,1,0]);
    cameraPosition = multMatVector(rot, vec4(cameraPosition,0));
    cameraPosition = vec3(cameraPosition[0],cameraPosition[1],cameraPosition[2]);
    cameraPosition = add(cameraPosition, lookAtPosition);
}

function rotUp(){
    cameraPosition = subtract(cameraPosition, lookAtPosition);
    var rot = rotate(-15,[1,0,0]);
    cameraPosition = multMatVector(rot, vec4(cameraPosition,0));
    cameraPosition = vec3(cameraPosition[0],cameraPosition[1],cameraPosition[2]);
    cameraPosition = add(cameraPosition, lookAtPosition);
}

function rotDown(){
    cameraPosition = subtract(cameraPosition, lookAtPosition);
    var rot = rotate(15,[1,0,0]);
    cameraPosition = multMatVector(rot, vec4(cameraPosition,0));
    cameraPosition = vec3(cameraPosition[0],cameraPosition[1],cameraPosition[2]);
    cameraPosition = add(cameraPosition, lookAtPosition);
}

function multMatVector(m,v){
    var res = [];
    for(var i = 0; i < m.length; ++i){
        var val=0;
        for(var j = 0; j < v.length; ++j){
            val += m[i][j] * v[j];
        }
        res.push(val);
    }
    return res;
}