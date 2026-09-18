// Predator-Prey Population Dynamics Simulator
// CANVAS_HEIGHT: 695
// Lotka-Volterra inspired agent-based model

let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let graphHeight = 180;
let controlHeight = 115;
let canvasHeight = drawHeight + graphHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Populations
let prey = [];
let predators = [];
let initialPrey = 200;
let initialPredators = 20;

// Sliders
let birthRateSlider, predationSlider, deathRateSlider;

// Buttons
let resetBtn, diseaseBtn, removePredBtn, pauseBtn;

// History for graph
let preyHistory = [];
let predHistory = [];
let maxHistory = 300;

// Timing
let running = false;
let frameCounter = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Predator-prey population dynamics with animated agents and real-time graph');

  // Sliders
  birthRateSlider = createSlider(0.01, 0.1, 0.04, 0.005);
  birthRateSlider.parent(document.querySelector('main'));
  birthRateSlider.style('width', '120px');

  predationSlider = createSlider(0.001, 0.01, 0.005, 0.001);
  predationSlider.parent(document.querySelector('main'));
  predationSlider.style('width', '120px');

  deathRateSlider = createSlider(0.01, 0.1, 0.04, 0.005);
  deathRateSlider.parent(document.querySelector('main'));
  deathRateSlider.style('width', '120px');

  // Buttons
  pauseBtn = createButton('Start');
  pauseBtn.parent(document.querySelector('main'));
  pauseBtn.mousePressed(() => { running = !running; pauseBtn.html(running ? 'Pause' : 'Start'); });

  resetBtn = createButton('Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(resetSim);

  diseaseBtn = createButton('Add Disease');
  diseaseBtn.parent(document.querySelector('main'));
  diseaseBtn.mousePressed(() => {
    let half = Math.floor(prey.length / 2);
    prey.splice(0, half);
  });

  removePredBtn = createButton('Remove Predators');
  removePredBtn.parent(document.querySelector('main'));
  removePredBtn.mousePressed(() => { predators = []; });

  resetSim();
}

function resetSim() {
  prey = [];
  predators = [];
  for (let i = 0; i < initialPrey; i++) {
    prey.push({ x: random(10, canvasWidth - 10), y: random(10, drawHeight - 10), vx: random(-1, 1), vy: random(-1, 1) });
  }
  for (let i = 0; i < initialPredators; i++) {
    predators.push({ x: random(10, canvasWidth - 10), y: random(10, drawHeight - 10), vx: random(-1.5, 1.5), vy: random(-1.5, 1.5), hunger: 0 });
  }
  preyHistory = [];
  predHistory = [];
  frameCounter = 0;
  running = false;
  if (pauseBtn) pauseBtn.html('Start');
}

function draw() {
  updateCanvasSize();

  // Draw area background
  fill('#e8f5e9');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Graph area
  fill('#f5f5f5');
  rect(0, drawHeight, canvasWidth, graphHeight);

  // Control area
  fill('white');
  rect(0, drawHeight + graphHeight, canvasWidth, controlHeight);

  if (running) {
    frameCounter++;
    updateSimulation();
    if (frameCounter % 3 === 0) {
      preyHistory.push(prey.length);
      predHistory.push(predators.length);
      if (preyHistory.length > maxHistory) {
        preyHistory.shift();
        predHistory.shift();
      }
    }
  }

  drawAgents();
  drawGraph();
  drawControls();
}

function updateSimulation() {
  let birthRate = birthRateSlider.value();
  let predEff = predationSlider.value();
  let deathRate = deathRateSlider.value();

  // Move prey
  for (let p of prey) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 5 || p.x > canvasWidth - 5) p.vx *= -1;
    if (p.y < 5 || p.y > drawHeight - 5) p.vy *= -1;
    p.x = constrain(p.x, 5, canvasWidth - 5);
    p.y = constrain(p.y, 5, drawHeight - 5);
    // Random direction change
    if (random() < 0.05) { p.vx = random(-1, 1); p.vy = random(-1, 1); }
  }

  // Move predators
  for (let pr of predators) {
    pr.x += pr.vx;
    pr.y += pr.vy;
    if (pr.x < 5 || pr.x > canvasWidth - 5) pr.vx *= -1;
    if (pr.y < 5 || pr.y > drawHeight - 5) pr.vy *= -1;
    pr.x = constrain(pr.x, 5, canvasWidth - 5);
    pr.y = constrain(pr.y, 5, drawHeight - 5);
    if (random() < 0.05) { pr.vx = random(-1.5, 1.5); pr.vy = random(-1.5, 1.5); }
    pr.hunger++;
  }

  // Predation
  let caughtIndices = new Set();
  for (let pr of predators) {
    for (let i = 0; i < prey.length; i++) {
      if (caughtIndices.has(i)) continue;
      let d = dist(pr.x, pr.y, prey[i].x, prey[i].y);
      if (d < 10 && random() < predEff * 20) {
        caughtIndices.add(i);
        pr.hunger = 0;
        break;
      }
    }
  }
  // Remove caught prey (reverse order)
  let sorted = Array.from(caughtIndices).sort((a, b) => b - a);
  for (let i of sorted) prey.splice(i, 1);

  // Prey reproduction
  let newPrey = [];
  for (let p of prey) {
    if (random() < birthRate * 0.3 && prey.length + newPrey.length < 500) {
      newPrey.push({ x: p.x + random(-5, 5), y: p.y + random(-5, 5), vx: random(-1, 1), vy: random(-1, 1) });
    }
  }
  prey = prey.concat(newPrey);

  // Predator reproduction (if fed recently)
  let newPred = [];
  for (let pr of predators) {
    if (pr.hunger < 50 && random() < 0.005 && predators.length + newPred.length < 100) {
      newPred.push({ x: pr.x + random(-5, 5), y: pr.y + random(-5, 5), vx: random(-1.5, 1.5), vy: random(-1.5, 1.5), hunger: 0 });
    }
  }
  predators = predators.concat(newPred);

  // Predator death from starvation
  predators = predators.filter(pr => pr.hunger < Math.floor(200 * (1 - deathRate)));
}

function drawAgents() {
  noStroke();
  // Draw prey
  fill(34, 139, 34);
  for (let p of prey) {
    ellipse(p.x, p.y, 6, 6);
  }
  // Draw predators
  fill(200, 50, 50);
  for (let pr of predators) {
    let sz = map(pr.hunger, 0, 150, 10, 7);
    ellipse(pr.x, pr.y, sz, sz);
  }

  // Population counts
  noStroke();
  fill(34, 139, 34);
  textSize(14);
  textAlign(LEFT, TOP);
  text('Prey: ' + prey.length, 10, 10);
  fill(200, 50, 50);
  text('Predators: ' + predators.length, 10, 28);
}

function drawGraph() {
  let gx = 40;
  let gy = drawHeight + 10;
  let gw = canvasWidth - 60;
  let gh = graphHeight - 30;

  // Axes
  stroke(100);
  strokeWeight(1);
  line(gx, gy, gx, gy + gh);
  line(gx, gy + gh, gx + gw, gy + gh);

  // Labels
  noStroke();
  fill(80);
  textSize(11);
  textAlign(CENTER, TOP);
  text('Time', gx + gw / 2, gy + gh + 4);
  textAlign(RIGHT, CENTER);
  text('500', gx - 4, gy);
  text('0', gx - 4, gy + gh);

  if (preyHistory.length < 2) return;

  let maxPop = 500;

  // Draw prey line
  stroke(34, 139, 34);
  strokeWeight(1.5);
  noFill();
  beginShape();
  for (let i = 0; i < preyHistory.length; i++) {
    let px = gx + (i / maxHistory) * gw;
    let py = gy + gh - (preyHistory[i] / maxPop) * gh;
    vertex(px, constrain(py, gy, gy + gh));
  }
  endShape();

  // Draw predator line
  stroke(200, 50, 50);
  beginShape();
  for (let i = 0; i < predHistory.length; i++) {
    let px = gx + (i / maxHistory) * gw;
    let py = gy + gh - (predHistory[i] / maxPop) * gh;
    vertex(px, constrain(py, gy, gy + gh));
  }
  endShape();

  // Legend
  noStroke();
  fill(34, 139, 34);
  textSize(11);
  textAlign(LEFT, TOP);
  text('Prey (Hares)', gx + gw - 130, gy + 2);
  fill(200, 50, 50);
  text('Predators (Lynx)', gx + gw - 130, gy + 16);
}

function drawControls() {
  let cy = drawHeight + graphHeight;
  noStroke();
  fill(60);
  textSize(11);
  textAlign(LEFT, CENTER);
  // Row 1 labels
  text('Birth Rate: ' + nf(birthRateSlider.value(), 1, 3), 5, cy + 15);
  // Row 2 labels
  text('Predation: ' + nf(predationSlider.value(), 1, 3), 5, cy + 50);
  // Row 3 labels
  text('Death Rate: ' + nf(deathRateSlider.value(), 1, 3), 5, cy + 85);

  positionControls();
}

function positionControls() {
  let ox = canvasOffsetX();
  let oy = canvasOffsetY();
  let cy = drawHeight + graphHeight;
  // Row 1: birth rate slider + pause + reset
  birthRateSlider.position(ox + sliderLeftMargin, oy + cy + 5);
  birthRateSlider.size(canvasWidth - sliderLeftMargin - margin);
  // Row 2: predation slider + disease + remove pred
  predationSlider.position(ox + sliderLeftMargin, oy + cy + 40);
  predationSlider.size(canvasWidth - sliderLeftMargin - margin);
  // Row 3: death rate slider + buttons
  deathRateSlider.position(ox + sliderLeftMargin, oy + cy + 75);
  deathRateSlider.size(canvasWidth * 0.4);
  pauseBtn.position(ox + 10, oy + cy + 5);
  resetBtn.position(ox + 70, oy + cy + 5);
  diseaseBtn.position(ox + canvasWidth * 0.65, oy + cy + 75);
  removePredBtn.position(ox + canvasWidth * 0.8, oy + cy + 75);
}

function canvasOffsetX() {
  return document.querySelector('main canvas').getBoundingClientRect().left;
}
function canvasOffsetY() {
  return document.querySelector('main canvas').getBoundingClientRect().top;
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
