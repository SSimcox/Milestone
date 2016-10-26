/**
 * Created by Steven on 10/22/2016.
 */

var octahedronVertices = [];
var bisections = [];
var iterations = 4;

var octahedronIndex = [
    0,1,2,
    0,2,3,
    0,3,4,
    0,4,1,
    1,5,2,
    2,5,3,
    3,5,4,
    4,5,1
];

function makeSphere(){
  octahedronVertices.push(vec3(0,1,0));
  octahedronVertices.push(normalize(vec3(-1,0,1)));
  octahedronVertices.push(normalize(vec3(1,0,1)));
  octahedronVertices.push(normalize(vec3(1,0,-1)));
  octahedronVertices.push(normalize(vec3(-1,0,-1)));
  octahedronVertices.push(vec3(0,-1,0));
  for(var i = 0; i < iterations; ++i)
  {
    octahedronIndex = getTriangles();
  }
}

function getTriangles()
{
  var temp = [];
  for(var i = 0; i < octahedronIndex.length; i+=3)
  {
    temp = temp.concat(getNextTriangle(i));
  }
  return flatten(temp);
}

function getNextTriangle(i)
{
  var bisectIndices = [];
  bisectIndices[0] = getBisectIndex(octahedronIndex[i], octahedronIndex[i+1]);
  bisectIndices[1] = getBisectIndex(octahedronIndex[i+1],octahedronIndex[i+2]);
  bisectIndices[2] = getBisectIndex(octahedronIndex[i+2],octahedronIndex[i]);
  var newTriangles = [
    vec3(octahedronIndex[i],bisectIndices[0],bisectIndices[2]), //top triangle
    vec3(bisectIndices[0],octahedronIndex[i+1],bisectIndices[1]), //bottom left
    vec3(bisectIndices[2],bisectIndices[1],octahedronIndex[i+2]), //bottom right
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
    octahedronVertices.push(bisect(octahedronVertices[i],octahedronVertices[j]));
    bisections[i][j] = bisections[j][i] = octahedronVertices.length - 1;
    return bisections[i][j];
  }
}

function bisect(i,j)
{
  var temp = vec3((i[0]+j[0])/2,(i[1]+j[1])/2,(i[2]+j[2])/2);
  temp = normalize(temp);
  return temp;
}
