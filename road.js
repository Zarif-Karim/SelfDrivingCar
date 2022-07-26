/*
From utils.js:
    INFINITY
    lerp
    drawLine
*/

class Road {

    constructor(x,width,laneCount=3){
        this.x = x;
        this.width = width;

        this.laneCount = laneCount;
        this.laneWidth = width/laneCount;

        this.leftBoundary = x-width/2;
        this.rightBoundary = x+width/2;
        this.topBoundary = -INFINITY;
        this.bottomBoundary = INFINITY;

        const topLeft = {x: this.leftBoundary, y:this.topBoundary};
        const topRight = {x: this.rightBoundary, y:this.topBoundary};
        const bottomLeft = {x: this.leftBoundary, y:this.bottomBoundary};
        const bottomRight = {x: this.rightBoundary, y:this.bottomBoundary};
        this.borders = [
            [topLeft,bottomLeft],
            [topRight,bottomRight]
        ];
    }

    draw(ctx){
        //draw middle lanes        
        for(let i = 1; i < this.laneCount; ++i){
            const x = lerp(
                this.leftBoundary,
                this.rightBoundary,
                i/this.laneCount
            );
            
            drawLine(
                ctx,
                x,this.topBoundary,
                x,this.bottomBoundary,
                5, "white",
                [20,20]
            );
        }

        //draw outer lanes
        this.borders.forEach(border=>{
            drawLine(
                ctx,
                border[0].x,border[0].y,
                border[1].x,border[1].y,
                5,"white"
            );            
        });
    }

    //get horizontal center of lane given a laneIndex starting from 0
    getLaneCenter(laneIndex){
        laneIndex = Math.min(Math.max(0,laneIndex),this.laneCount-1);
        return this.leftBoundary+laneIndex*this.laneWidth+this.laneWidth/2;
    }
}