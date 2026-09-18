// Emergence Simulator - Boids Flocking MicroSim
// CANVAS_HEIGHT: 515
let containerWidth;
let canvasWidth = 400;
let drawHeight = 440;
let controlHeight = 75;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

let separationSlider, alignmentSlider, cohesionSlider;
let resetBtn;
let boids = [];
let numBoids = 80;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Emergence simulator showing flocking behavior from simple boid rules');

  separationSlider = createSlider(0, 100, 50, 1);
  separationSlider.parent(document.querySelector('main'));
  separationSlider.style('width', '100px');

  alignmentSlider = createSlider(0, 100, 50, 1);
  alignmentSlider.parent(document.querySelector('main'));
  alignmentSlider.style('width', '100px');

  cohesionSlider = createSlider(0, 100, 50, 1);
  cohesionSlider.parent(document.querySelector('main'));
  cohesionSlider.style('width', '100px');

  resetBtn = createButton('Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(initBoids);

  initBoids();
}

function initBoids() {
  boids = [];
  for (let i = 0; i < numBoids; i++) {
    boids.push({
      x: random(canvasWidth),
      y: random(drawHeight),
      vx: random(-2, 2),
      vy: random(-2, 2)
    });
  }
}

function draw() {
  updateCanvasSize();

  let sepStr = separationSlider.value() / 100;
  let aliStr = alignmentSlider.value() / 100;
  let cohStr = cohesionSlider.value() / 100;

  // Dark blue background
  fill(15, 20, 50);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  let perceptionRadius = 60;
  let maxSpeed = 3;
  let maxForce = 0.15;

  // Stats
  let totalNeighborCount = 0;

  // Update boids
  for (let i = 0; i < boids.length; i++) {
    let b = boids[i];
    let sepX = 0, sepY = 0, sepCount = 0;
    let aliX = 0, aliY = 0, aliCount = 0;
    let cohX = 0, cohY = 0, cohCount = 0;

    for (let j = 0; j < boids.length; j++) {
      if (i === j) continue;
      let other = boids[j];
      let dx = other.x - b.x;
      let dy = other.y - b.y;
      let d = sqrt(dx * dx + dy * dy);

      if (d < perceptionRadius) {
        // Separation
        if (d < perceptionRadius * 0.4 && d > 0) {
          sepX -= dx / d;
          sepY -= dy / d;
          sepCount++;
        }
        // Alignment
        aliX += other.vx;
        aliY += other.vy;
        aliCount++;
        // Cohesion
        cohX += other.x;
        cohY += other.y;
        cohCount++;
      }
    }

    totalNeighborCount += aliCount;

    let ax = 0, ay = 0;

    // Separation
    if (sepCount > 0) {
      sepX /= sepCount;
      sepY /= sepCount;
      let sm = sqrt(sepX * sepX + sepY * sepY);
      if (sm > 0) { sepX = (sepX / sm) * maxSpeed - b.vx; sepY = (sepY / sm) * maxSpeed - b.vy; }
      ax += sepX * sepStr * 1.5;
      ay += sepY * sepStr * 1.5;
    }

    // Alignment
    if (aliCount > 0) {
      aliX /= aliCount;
      aliY /= aliCount;
      let am = sqrt(aliX * aliX + aliY * aliY);
      if (am > 0) { aliX = (aliX / am) * maxSpeed - b.vx; aliY = (aliY / am) * maxSpeed - b.vy; }
      ax += aliX * aliStr;
      ay += aliY * aliStr;
    }

    // Cohesion
    if (cohCount > 0) {
      cohX = cohX / cohCount - b.x;
      cohY = cohY / cohCount - b.y;
      let cm = sqrt(cohX * cohX + cohY * cohY);
      if (cm > 0) { cohX = (cohX / cm) * maxSpeed - b.vx; cohY = (cohY / cm) * maxSpeed - b.vy; }
      ax += cohX * cohStr * 0.8;
      ay += cohY * cohStr * 0.8;
    }

    // Clamp acceleration
    let aLen = sqrt(ax * ax + ay * ay);
    if (aLen > maxForce) {
      ax = (ax / aLen) * maxForce;
      ay = (ay / aLen) * maxForce;
    }

    b.vx += ax;
    b.vy += ay;

    // Clamp speed
    let speed = sqrt(b.vx * b.vx + b.vy * b.vy);
    if (speed > maxSpeed) {
      b.vx = (b.vx / speed) * maxSpeed;
      b.vy = (b.vy / speed) * maxSpeed;
    }
    // Minimum speed
    if (speed < 0.5) {
      b.vx += random(-0.5, 0.5);
      b.vy += random(-0.5, 0.5);
    }

    b.x += b.vx;
    b.y += b.vy;

    // Wrap around
    if (b.x < 0) b.x += canvasWidth;
    if (b.x > canvasWidth) b.x -= canvasWidth;
    if (b.y < 0) b.y += drawHeight;
    if (b.y > drawHeight) b.y -= drawHeight;
  }

  // Draw boids with HSB color based on heading
  colorMode(HSB, 360, 100, 100);
  for (let b of boids) {
    let heading = atan2(b.vy, b.vx);
    let hue = map(heading, -PI, PI, 0, 360);
    fill(hue, 80, 95);
    noStroke();
    push();
    translate(b.x, b.y);
    rotate(heading);
    triangle(8, 0, -5, -4, -5, 4);
    pop();
  }
  colorMode(RGB, 255);

  // Stats overlay
  let avgNeighbors = totalNeighborCount / boids.length;
  let flocks = countFlocks(perceptionRadius);

  fill(255, 255, 255, 200);
  noStroke();
  rect(5, 5, 180, 55, 5);
  fill(0);
  textSize(11);
  textAlign(LEFT, TOP);
  noStroke();
  text('Agents: ' + boids.length, 12, 10);
  text('Avg Neighbors: ' + nf(avgNeighbors, 1, 1), 12, 24);
  text('Distinct Flocks: ' + flocks, 12, 38);

  // --- Controls ---
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(0);
  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);

  text('Separation: ' + separationSlider.value() + '%', 10, drawHeight + 16);
  separationSlider.position(sliderLeftMargin, drawHeight + 7);

  text('Alignment: ' + alignmentSlider.value() + '%', 10, drawHeight + 38);
  alignmentSlider.position(sliderLeftMargin, drawHeight + 30);

  text('Cohesion: ' + cohesionSlider.value() + '%', 10, drawHeight + 60);
  cohesionSlider.position(sliderLeftMargin, drawHeight + 52);

  resetBtn.position(sliderLeftMargin + 115, drawHeight + 28);
}

function countFlocks(radius) {
  let visited = new Array(boids.length).fill(false);
  let flockCount = 0;

  for (let i = 0; i < boids.length; i++) {
    if (visited[i]) continue;
    flockCount++;
    let stack = [i];
    while (stack.length > 0) {
      let curr = stack.pop();
      if (visited[curr]) continue;
      visited[curr] = true;
      for (let j = 0; j < boids.length; j++) {
        if (visited[j]) continue;
        let dx = boids[j].x - boids[curr].x;
        let dy = boids[j].y - boids[curr].y;
        if (dx * dx + dy * dy < radius * radius) {
          stack.push(j);
        }
      }
    }
  }
  return flockCount;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
