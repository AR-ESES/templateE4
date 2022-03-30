function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	noStroke();
	fill(255);
	background(0);
	rectMode(CENTER);
}

function draw() {
	//background(0);
	rect(mouseX, height - 20, 150, 20);

}

function mouseClicked() {
	circle(random(width), random(height), 20);
}

function keyPressed() {
	if (key == 'G' || key == 'g' ) {
		fill(0, 250, 0);
	} else if (key == 'R' || key == 'r') {
		fill(250, 0, 0);
	} else if (key == 'B' || key == 'b') {
		fill(0, 0, 250);
	}
}