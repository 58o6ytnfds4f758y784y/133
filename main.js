img = "";
estatus = "";
objects = [];

function preload(){
    img = loadImage('dog_cat.jpg');
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Estatus: detectando objetos";
}
function modelLoaded() {
    console.log("¡Model cargado!")
    estatus= true;
    objectDetector.detect(img,gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(img, 0, 0, 640, 420);

    if(estatus != "")
    {
        for (i =0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "estatus: objeto detectado";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}