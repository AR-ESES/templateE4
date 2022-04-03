let video;
let poseNet;
let poses = [];

var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem141101'; // fill in your serial port name here
let outByte = 0;


function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(width, height);
  stroke(255, 180, 20);

  serial = new p5.SerialPort();    // make a new instance of the serialport library
  //serial.on('data', serialEvent);  // callback for when new data arrives
  //serial.on('error', serialError); // callback for errors
  //serial.on('list', printList);       // set a callback function for the serialport list event
  //serial.list();                   // list the serial ports
  
  serial.open(portName);           // open a serial port
  
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
  console.log(JSON.stringify(poses));
}



function draw() {
  image(video, 0, 0, width, height);
  strokeWeight(10);
  stroke(255, 180, 20);
  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    const pose = poses[0].pose;

    const rightEye = pose.rightEye;
    const leftEye = pose.leftEye;
    let LE = createVector(leftEye.x, leftEye.y);
    let LR = createVector(rightEye.x, rightEye.y);

    //line(LR.x, LR.y, LE.x, LE.y);
    let vert = createVector(width / 2, 0);
    //line(width / 2, height / 2, vert.x, vert.y);

    let normal = createVector(0, 200);

    let dir = LE.sub(LR);
    dir.normalize();
    dir.mult(200);

    let angle = angleBetween(normal, dir);
    noFill();
    arc(width/2, height/2, 200, 200, -angle, 0);
    
    // let angle = p5.vector.angleBetween(normal,dir);
    fill(255, 180, 20);
    noStroke();

    textAlign(CENTER);
    textSize(60);
    text(int(degrees(angle)), width/2, height/2);
    // text("Radians: 		"+ radians(angle), 100, height-80);
    
    outByte = int(degrees(angle));
    serial.write(outByte + '\n');
    console.log(outByte + '\n');
    
  }
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