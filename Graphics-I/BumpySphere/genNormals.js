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
                var currentNormal = newVertices[currentIndex * 2 + 1] * numParts[currentIndex];
                numParts[currentIndex]++;
                currentNormal += normal;
                newVertices[currentIndex * 2 + 1] = currentNormal / numParts[currentIndex];
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
    var x = vertices[indices[startIndex]] - vertices[indices[startIndex + 1]];
    console.log(vertices[indices[startIndex]]);
    var y = vertices[indices[startIndex]] - vertices[indices[startIndex + 2]];
    return cross(x,y);
}