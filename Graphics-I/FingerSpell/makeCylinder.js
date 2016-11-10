/**
 * Created by Steven on 10/22/2016.
 */

var cylinderVertices = [];
var bisections = [];
var iterations = 2;
var newCylinderVertices = [];

var cylinderIndex = [
    //Top Pyramid
    0,1,2,
    0,2,3,
    0,3,4,
    0,4,1,
    ////Middle Rectangle
    //Front Face
    1,5,2,
    5,6,2,
    //Right Face
    2,6,3,
    6,7,3,
    //Back Face
    3,7,4,
    7,8,4,
    //Left Face
    4,8,1,
    8,5,1,
    //Bottom Pyramid
    5,9,6,
    6,9,7,
    7,9,8,
    8,9,5
];

function makeCylinder(){
  cylinderVertices.push(vec3(0,1.5,0));
  cylinderVertices.push(normalize(vec3(-1,.5,1)));
  cylinderVertices.push(normalize(vec3(1,.5,1)));
  cylinderVertices.push(normalize(vec3(1,.5,-1)));
  cylinderVertices.push(normalize(vec3(-1,.5,-1)));

  cylinderVertices.push(normalize(vec3(-1,-.5,1)));
  cylinderVertices.push(normalize(vec3(1,-.5,1)));
  cylinderVertices.push(normalize(vec3(1,-.5,-1)));
  cylinderVertices.push(normalize(vec3(-1,-.5,-1)));
  cylinderVertices.push(vec3(0,-1.5,0));
  for(var i = 0; i < iterations; ++i)
  {
    cylinderIndex = getTriangles();
  }
}

function getTriangles()
{
  var temp = [];
  for(var i = 0; i < cylinderIndex.length; i+=3)
  {
    temp = temp.concat(getNextTriangle(i));
  }
  return flatten(temp);
}

function getNextTriangle(i)
{
  var bisectIndices = [];
  bisectIndices[0] = getBisectIndex(cylinderIndex[i], cylinderIndex[i+1]);
  bisectIndices[1] = getBisectIndex(cylinderIndex[i+1],cylinderIndex[i+2]);
  bisectIndices[2] = getBisectIndex(cylinderIndex[i+2],cylinderIndex[i]);
  var newTriangles = [
    vec3(cylinderIndex[i],bisectIndices[0],bisectIndices[2]), //top triangle
    vec3(bisectIndices[0],cylinderIndex[i+1],bisectIndices[1]), //bottom left
    vec3(bisectIndices[2],bisectIndices[1],cylinderIndex[i+2]), //bottom right
    vec3(bisectIndices[0],bisectIndices[1],bisectIndices[2])//middle
  ];
  return newTriangles;
}

function getBisectIndex(i,j)
{
  if(bisections[i] != undefined && bisections[i][j] != undefined)
  {
    return bisections[i][j];
  }
  else if(bisections[j] != undefined &&bisections[j][i] != undefined)
  {
    return bisections[j][i];
  }
  else
  {
    if(bisections[i] == undefined) {
      bisections[i] = [];
    }
    if(bisections[j] == undefined) {
      bisections[j] = [];
    }
    cylinderVertices.push(bisect(cylinderVertices[i],cylinderVertices[j]));
    bisections[i][j] = bisections[j][i] = cylinderVertices.length - 1;
    return bisections[i][j];
  }
}

function bisect(i,j)
{
  var temp = vec3((i[0]+j[0])/2,(i[1]+j[1])/2,(i[2]+j[2])/2);
    if(temp[1] > .5) {
        var difference = subtract(temp,vec3(0,.5,0));
        difference = normalize(difference);
        temp = add(vec3(0,.5,0),difference);
    }
    else if(temp[1] < -.5){
        var difference = subtract(temp,vec3(0,-.5,0));
        difference = normalize(difference);
        temp = add(vec3(0,-.5,0), difference);
    }
    else{
        var difference = vec3(temp[0],0,temp[2]);
        difference = normalize(difference);
        temp = vec3(difference[0],temp[1],difference[2]);
    }

  return temp;
}

function condenseVertices(){
    for(var i = 0; i < cylinderIndex.length; ++i){
        newCylinderVertices.push(cylinderVertices[cylinderIndex[i]]);
    }
}