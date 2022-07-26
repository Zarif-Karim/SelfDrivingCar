class Sensor {

    constructor(car,rayCount=3,rayLength=100,raySpread=Math.PI/4){
        this.car = car;
        this.rayCount = rayCount;
        this.rayLength = rayLength;
        this.raySpread = raySpread;

        this.rays=[];
    }

    update(roadBoarders){
        this.#castRays();
    }

    draw(ctx){
        this.rays.forEach(ray=>{
            drawLine(ctx,
                ray[0].x,ray[0].y,ray[1].x,ray[1].y,2,"yellow");
        });
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