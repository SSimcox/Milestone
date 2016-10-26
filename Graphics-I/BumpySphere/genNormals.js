/**
 * Created by Steven on 10/24/2016.
 */

function genNormals(vertices, indices)
{
    var newVertices = [];
    var numParts = [];
    for(var i = 0; i < indices.length; i+=3)
    {
        var normal = getNormal(vertices, indices, i);
        for(var j = 0; j < 3; ++j)
        {
            var currentIndex = indices[i + j];
            newVertices[currentIndex * 2] = vertices[currentIndex];
            if(numParts[currentIndex] == undefined)
            {
                newVertices[currentIndex * 2 + 1] = normal;
                numParts[currentIndex] = 1;
            }
            else
            {
                var currentNormal = mult(newVertices[currentIndex * 2 + 1], [numParts[currentIndex], numParts[currentIndex],numParts[currentIndex]]);
                numParts[currentIndex]++;
                currentNormal = add(currentNormal, normal);
                newVertices[currentIndex * 2 + 1] = vec3(currentNormal[0] / numParts[currentIndex],currentNormal[1] / numParts[currentIndex], currentNormal[2] / numParts[currentIndex]);
            }
        }
    }

    for(var i = 0; i < indices.length; ++i)
    {
        indices[i]*=2;
    }

    return newVertices;
}

function getNormal(vertices, indices, startIndex)
{
    var x = subtract(vec3(vertices[indices[startIndex + 1]]), vec3(vertices[indices[startIndex]]));
    var y = subtract(vec3(vertices[indices[startIndex + 2]]), vec3(vertices[indices[startIndex]]));
    return cross(x,y);
}