// Inside a Neural Network Layer MicroSim
// CANVAS_HEIGHT: 538
// Chapter 22: Artificial Intelligence and Machine Learning Foundations
// Learning objective: compute the weighted sum, apply an activation function,
// and explain how changing one weight changes the layer's output (Bloom: Apply).
//
// Three inputs, three weights and a bias feed one output node. Everything is
// recomputed live, and the output node's brightness tracks the activation, so
// the arithmetic and its visual consequence stay on screen together.

let containerWidth;
let canvasWidth = 700;
let drawHeight = 400;
let controlHeight = 138;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

let xSliders = [];
let wSliders = [];
let bSlider;

const IN_COLOR = '#2E5A87';
const W_COLOR = '#B8611A';
const OUT_COLOR = '#2E7D32';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Left column: the three inputs and the bias.
  const defaultsX = [2, 1, 3];
  for (let i = 0; i < 3; i++) {
    const s = createSlider(-5, 5, defaultsX[i], 0.1);
    s.position(columnLeft(0), drawHeight + 8 + i * 32);
    xSliders.push(s);
  }
  bSlider = createSlider(-5, 5, 0.5, 0.1);
  bSlider.position(columnLeft(0), drawHeight + 8 + 3 * 32);

  // Right column: the three weights.
  const defaultsW = [0.8, 1.2, 0.5];
  for (let i = 0; i < 3; i++) {
    const s = createSlider(-2, 2, defaultsW[i], 0.05);
    s.position(columnLeft(1), drawHeight + 8 + i * 32);
    wSliders.push(s);
  }

  sizeSliders();

  describe(
    'A single neural network layer: three input nodes x1, x2 and x3 connected ' +
    'by weighted edges w1, w2 and w3 to one output node y, with a bias term. ' +
    'Sliders set every input, weight and the bias; the weighted sum and the ' +
    'sigmoid activation are recomputed live and the output node brightens as ' +
    'the activation approaches one.'
  );
}

function columnLeft(col) {
  return col === 0 ? 96 : Math.floor(canvasWidth / 2) + 96;
}

function columnSliderWidth() {
  return Math.max(70, Math.floor(canvasWidth / 2) - 96 - margin - 58);
}

function sizeSliders() {
  const w = columnSliderWidth();
  xSliders.forEach(s => s.size(w));
  wSliders.forEach(s => s.size(w));
  bSlider.size(w);
}

function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}

function draw() {
  updateCanvasSize();

  const xs = xSliders.map(s => s.value());
  const ws = wSliders.map(s => s.value());
  const b = bSlider.value();
  const z = xs[0] * ws[0] + xs[1] * ws[1] + xs[2] * ws[2] + b;
  const y = sigmoid(z);

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(20);
  text('Inside a Neural Network Layer', canvasWidth / 2, 8);

  drawLayer(xs, ws, b, z, y);
  drawControlLabels(xs, ws, b);
}

function drawLayer(xs, ws, b, z, y) {
  const inX = canvasWidth * 0.20;
  const outX = canvasWidth * 0.74;
  const ys = [140, 215, 290];
  const outY = 215;
  const biasY = 348;
  const biasX = inX;

  // weighted edges
  for (let i = 0; i < 3; i++) {
    const thickness = map(abs(ws[i]), 0, 2, 1, 7);
    stroke(ws[i] >= 0 ? W_COLOR : '#7B4B9E');
    strokeWeight(thickness);
    line(inX + 26, ys[i], outX - 32, outY);

    // weight label on the edge
    const mx = lerp(inX + 26, outX - 32, 0.42);
    const my = lerp(ys[i], outY, 0.42);
    noStroke();
    fill('white');
    rectMode(CENTER);
    textSize(13);
    const label = 'w' + (i + 1) + ' = ' + nf(ws[i], 1, 2);
    rect(mx, my, textWidth(label) + 10, 18, 3);
    rectMode(CORNER);
    noStroke();
    fill(ws[i] >= 0 ? W_COLOR : '#7B4B9E');
    textAlign(CENTER, CENTER);
    text(label, mx, my);
  }

  // bias edge
  stroke('#6c757d');
  strokeWeight(2);
  drawingContext.setLineDash([6, 5]);
  line(biasX + 34, biasY, outX - 32, outY + 24);
  drawingContext.setLineDash([]);

  // input nodes
  for (let i = 0; i < 3; i++) {
    stroke(IN_COLOR);
    strokeWeight(2);
    fill('#D6E3F0');
    circle(inX, ys[i], 52);
    noStroke();
    fill('black');
    textAlign(CENTER, CENTER);
    textSize(14);
    text('x' + (i + 1), inX, ys[i] - 8);
    textSize(13);
    fill(IN_COLOR);
    text(nf(xs[i], 1, 1), inX, ys[i] + 10);
  }

  // bias box
  stroke('#6c757d');
  strokeWeight(2);
  fill('#E9ECEF');
  rectMode(CENTER);
  rect(biasX, biasY, 90, 38, 6);
  rectMode(CORNER);
  noStroke();
  fill('black');
  textAlign(CENTER, CENTER);
  textSize(13);
  text('bias b = ' + nf(b, 1, 1), biasX, biasY);

  // output node, brightness tracking the activation
  const fillCol = lerpColor(color('#EAF4EC'), color('#1B5E20'), y);
  stroke(OUT_COLOR);
  strokeWeight(3);
  fill(fillCol);
  circle(outX, outY, 76);
  noStroke();
  fill(y > 0.55 ? 'white' : 'black');
  textAlign(CENTER, CENTER);
  textSize(16);
  text('y', outX, outY - 11);
  textSize(15);
  text(nf(y, 1, 3), outX, outY + 11);

  // the arithmetic, spelled out
  const bx = canvasWidth * 0.5;
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(15);
  text('Weighted sum = ' +
       nf(xs[0], 1, 1) + '×' + nf(ws[0], 1, 2) + ' + ' +
       nf(xs[1], 1, 1) + '×' + nf(ws[1], 1, 2) + ' + ' +
       nf(xs[2], 1, 1) + '×' + nf(ws[2], 1, 2) + ' + ' + nf(b, 1, 1) +
       ' = ' + nf(z, 1, 2),
       bx, 44);
  fill(OUT_COLOR);
  textSize(15);
  text('y = sigmoid(' + nf(z, 1, 2) + ') = ' + nf(y, 1, 3), bx, 68);

  fill('#6c757d');
  textSize(12);
  text('Drag any weight to zero and watch that input stop mattering — ' +
       'a weight is how much attention the layer pays to one input.',
       bx, drawHeight - 26);
}

function drawControlLabels(xs, ws, b) {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(14);

  const labels0 = ['x1: ' + nf(xs[0], 1, 1), 'x2: ' + nf(xs[1], 1, 1),
                   'x3: ' + nf(xs[2], 1, 1), 'bias: ' + nf(b, 1, 1)];
  for (let i = 0; i < labels0.length; i++) {
    text(labels0[i], 12, drawHeight + 8 + i * 32 + 9);
  }

  const labels1 = ['w1: ' + nf(ws[0], 1, 2), 'w2: ' + nf(ws[1], 1, 2),
                   'w3: ' + nf(ws[2], 1, 2)];
  for (let i = 0; i < labels1.length; i++) {
    text(labels1[i], Math.floor(canvasWidth / 2) + 12, drawHeight + 8 + i * 32 + 9);
  }
}

// These two functions must be present for width-responsive MicroSims.
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  for (let i = 0; i < 3; i++) {
    xSliders[i].position(columnLeft(0), drawHeight + 8 + i * 32);
    wSliders[i].position(columnLeft(1), drawHeight + 8 + i * 32);
  }
  bSlider.position(columnLeft(0), drawHeight + 8 + 3 * 32);
  sizeSliders();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
