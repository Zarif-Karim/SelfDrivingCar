const canvas = document.getElementById("myCanvas");
canvas.width = 300;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2,canvas.width*0.9,4);
const car = new Car(road.getLaneCenter(3),window.innerHeight*0.8,30,50);

animate();

function animate(){
    car.update(road.borders);
    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0,-car.y+canvas.height*0.8);

    road.draw(ctx);
    car.draw(ctx);

    ctx.restore();
    
    ctx.font = "30px Arial";
    ctx.fillText(`Distance: ${-car.y.toFixed(2)}`,10,50);
    requestAnimationFrame(animate);
}