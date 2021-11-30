let radius = 5;
let lineLength = 60;
let walls = [];
let ray;
let particle;
let isFpsShow = false;
function setup() {
  // put setup code here
  createCanvas(1900, 900);
  noCursor();
  particle = new Particle();
  checkbox = createCheckbox('Show FPS', false);
  checkbox.changed(switchFpsShow);
  stroke(255);
  createBox(0, 0, width, height);
  createBox(width - 200, 100, 200, 130);
  createBox(150, 0, 30, 235);
  createBox((width / 2) - 40, (height / 2) - 40, 80, 80);
  createBox((width / 2) + 20, (height / 2) + 50, 20, 80);
  for(let i = 0; i < 30; i++) {
    createBox(random(width), random(height), random(width)/10,random(height)/10);
  }
  // createRandomBoundries();
}

function draw() {
  background(10);
  // put drawing code here
  noStroke();
  particle.updatePosition(mouseX, mouseY);
  for (let wall of walls) {
    wall.show();
  }
  particle.look(walls, 'rgba(166,156,30,0.05)');
  if (isFpsShow) {
    showFPS();
  }
}
function square(number) {
  return number * number;
}
function showFPS() {
  textSize(32);
  fill(255);
  text(Math.floor(frameRate()), width - 80, 30);
}
function switchFpsShow() {
  isFpsShow = this.checked();
}
function createBox(x1, y1, width, height) {
  walls.push(new Boundary(x1, y1, x1 + width, y1));
  walls.push(new Boundary(x1 + width, y1, x1 + width, y1 + height));
  walls.push(new Boundary(x1 + width, y1 + height, x1, y1 + height));
  walls.push(new Boundary(x1, y1 + height, x1, y1));
}
function createRandomBoundries(count = 5) {
  for (let i = 0; i < count; i++) {
    let x1 = random(width);
    let x2 = random(width);
    let y1 = random(height);
    let y2 = random(height);
    walls[i] = new Boundary(x1, x2, y1, y2);
  }
}