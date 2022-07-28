class Sensor {

    constructor(car,rayCount=3,rayLength=100,raySpread=Math.PI/4){
        this.car = car;
        this.rayCount = rayCount;
        this.rayLength = rayLength;
        this.raySpread = raySpread;

        this.rays=[];
        this.readings = [];
    }

    update(roadBoarders){
        this.#castRays();

        this.readings = [];
        this.rays.forEach(ray=>{
            this.readings.push(this.#getReadings(ray,roadBoarders));
        });

    }

    #getReadings(ray,roadBoarders){
        let touches = [];
        
        roadBoarders.forEach(rb => {
            const touch = getIntersection(
                ray[0], ray[1], rb[0],rb[1]
            );

            if(touch) touches.push(touch);
        });

        if(touches.length == 0) return null

        const offsets = touches.map(t=>t.offset);
        const minOffset = Math.min(...offsets);
        return touches.find(t=>t.offset == minOffset);
    }

    draw(ctx){
        for(let i = 0; i < this.rayCount; ++i){
            //untouched segment
            drawLine(ctx,
                this.rays[i][0].x, this.rays[i][0].y,
                this.rays[i][1].x, this.rays[i][1].y,
                2,"yellow"
            );

            //touched segment
            if(this.readings[i]){
                drawLine(ctx,
                    this.readings[i].x, this.readings[i].y,
                    this.rays[i][1].x, this.rays[i][1].y,
                    2,"black"
                );
            }
        };
    }

    #castRays(){
        this.rays = [];
        for(let i = 0; i < this.rayCount; ++i){
            const rayAngle = lerp(
                this.raySpread/2,
                -this.raySpread/2,
                this.rayCount==1? 0.5 : i/(this.rayCount-1)
            ) + this.car.angle;

            const start = {x: this.car.x, y:this.car.y};
            const end = {
                x: start.x-Math.sin(rayAngle)*this.rayLength, 
                y: start.y-Math.cos(rayAngle)*this.rayLength
            };

            this.rays.push([start,end]);
        }
    }
}