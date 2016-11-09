/**
 * Created by Steven on 11/8/2016.
 */

function genNode(id,xs,ys,zs,xr,yr,zr,xt,yt,zt){
    this.objectId = id;
    this.initialPos = {
        xRotate: xr,
        yRotate: yr,
        zRotate: zr,
        xScale: xs,
        yScale: ys,
        zScale: zs,
        xTranslate: xt,
        yTranslate: yt,
        zTranslate: zt
    };
    this.leftChild = null;
    this.rightSibling = null;
}

function addNodeData(lhs,rhs){
    var newData = {
        xRotate: lhs.xRotate + rhs.xRotate,
        yRotate: lhs.yRotate + rhs.yRotate,
        zRotate: lhs.zRotate + rhs.zRotate,
        xScale: lhs.xScale + rhs.xScale,
        yScale: lhs.yScale + rhs.yScale,
        zScale: lhs.zScale + rhs.zScale,
        xTranslate: lhs.xTranslate + rhs.xTranslate,
        yTranslate: lhs.yTranslate + rhs.yTranslate,
        zTranslate: lhs.zTranslate + rhs.zTranslate
    };
    return newData;
};



