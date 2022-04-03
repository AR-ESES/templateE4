// Angle between vectors
let dot
let theta

let video;
let poseNet;
let poses = [];

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);

    // Create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video, {
        outputStride: 8,
        quantBytes: 4
    }, modelReady);
    // This sets up an event that fills the global variable "poses"
    // with an array every time new poses are detected
    poseNet.on('pose', function (results) {
        poses = results;
    });
    // Hide the video element, and just show the canvas
    video.hide();
}

function modelReady() {
    select('#status').html('Model Loaded');
}

function mousePressed() {
    console.log(JSON.stringify(poses))
}

function draw() {
    image(video, 0, 0, width, height);

    if (poses.length > 0) {
        const pose = poses[0].pose;

        // Create a yellow ellipse for the right eye
        fill(255);
        const rightEye = pose.rightEye;
        circle(rightEye.x, rightEye.y, 40);

        let centerloc = createVector(rightEye.x, rightEye.y);
        let mouseloc = createVector(leftEye.x, leftEye.y);
        let normal = createVector(200, 0);

        let dir = mouseloc.sub(centerloc);
        dir.normalize();
        dir.mult(200);

        drawVector(normal, mouseloc);

        let angle = angleBetween(normal, dir);
        // let angle = p5.vector.angleBetween(normal,dir);
        fill(255);
        stroke(0);

        text("Degrees: 		" + int(degrees(angle)), 50, height - 50);
        // text("Radians: 		"+ radians(angle), 100, height-80);
    }
}

function drawVector(v, w) {

    applyMatrix();
    translate(width / 2, height / 2);
    strokeWeight(4)
    stroke(255);
    line(0, 0, v.x, v.y);
    line(0, 0, w.x, w.y);
    resetMatrix();

}

function dot2(v, w) {
    let dot = v.x * w.x + v.y * w.y;
    return dot;
}

function angleBetween(v, w) {
    let dot = dot2(v, w);
    theta = acos(dot / (v.mag() * w.mag()));
    return theta;
}