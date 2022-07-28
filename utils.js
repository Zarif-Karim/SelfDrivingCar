const INFINITY = 10000000;

function lerp(start,end,percentage){
    return start + (end-start) * percentage;
}

//draws a line in the given context
function drawLine(ctx,x1,y1,x2,y2,width=1,color="black",pattern=[]){
    ctx.setLineDash(pattern);
    ctx.lineWidth=width;
    ctx.strokeStyle=color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function getIntersection(A,B,C,D){
    const tTop = (D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop = (C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom = (D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);

    if(bottom != 0){
        const t = tTop/bottom;
        const u = uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x : lerp(A.x,B.x,t),
                y : lerp(A.y,B.y,t),
                offset : t
            }
        }
    }
}