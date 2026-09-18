// Logistic Map Bifurcation Explorer MicroSim
// CANVAS_HEIGHT: 536
// Chapter 6: Growth Patterns and Nonlinear Behavior
// Learning objective: given a range of parameter values for the logistic map,
// classify the resulting long-term behavior as a fixed point, a periodic cycle,
// or chaos (Bloom: Analyze).
//
// Left panel: the bifurcation diagram, with a marker at the current r.
// Right panel: two trajectories seeded 0.0001 apart, which stay together in the
// periodic regime and separate visibly once r enters the chaotic range.

let containerWidth;
let canvasWidth = 700;
let drawHeight = 400;
let infoHeight = 58;
let controlHeight = 78;
let canvasHeight = drawHeight + infoHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;
let sliderLeftMargin = 150;

let rSlider, resetButton;

const R_MIN = 2.4;
const R_MAX = 4.0;
const TRAJ_STEPS = 90;

let bifurcationPoints = [];   // precomputed once: {r, x} samples
let trajA = [];
let trajB = [];
let lastR = null;

const NODE_BLUE = '#2E5A87';
const TRAJ_A_COLOR = '#C62828';   // reinforcing red
const TRAJ_B_COLOR = '#2E7D32';   // balancing green
const CHAOS_TINT = '#FBEFEF';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  rSlider = createSlider(R_MIN, R_MAX, 2.9, 0.001);
  rSlider.position(sliderLeftMargin, drawHeight + infoHeight + 8);

  resetButton = createButton('Reset Trajectories');
  resetButton.position(10, drawHeight + infoHeight + 40);
  resetButton.mousePressed(seedTrajectories);

  sizeSliders();
  computeBifurcation();
  seedTrajectories();

  describe(
    'Two panels. The left panel is a bifurcation diagram of the logistic map ' +
    'with the growth parameter r on the horizontal axis, showing a single fixed ' +
    'point that splits into a period-2 cycle, then period-4, then chaos. The ' +
    'right panel plots two trajectories seeded one ten-thousandth apart, which ' +
    'overlap in the periodic regime and diverge within a few dozen steps once r ' +
    'is chaotic. A label states the current classification.'
  );
}

function sizeSliders() {
  const w = Math.max(120, canvasWidth - sliderLeftMargin - margin);
  rSlider.size(w);
}

/** Precompute the bifurcation diagram once: for each r, discard a transient
 *  then keep the values the map settles onto. */
function computeBifurcation() {
  bifurcationPoints = [];
  const COLUMNS = 460;
  for (let c = 0; c < COLUMNS; c++) {
    const r = R_MIN + ((R_MAX - R_MIN) * c) / (COLUMNS - 1);
    let x = 0.4;
    for (let i = 0; i < 260; i++) { x = r * x * (1 - x); }   // discard transient
    for (let i = 0; i < 60; i++) {
      x = r * x * (1 - x);
      bifurcationPoints.push({ r: r, x: x });
    }
  }
}

function seedTrajectories() {
  const r = rSlider ? rSlider.value() : 2.9;
  trajA = [0.5000];
  trajB = [0.5001];
  for (let i = 1; i < TRAJ_STEPS; i++) {
    trajA.push(r * trajA[i - 1] * (1 - trajA[i - 1]));
    trajB.push(r * trajB[i - 1] * (1 - trajB[i - 1]));
  }
  lastR = r;
}

/** Classify by counting how many distinct values the last 60 iterations
 *  cluster into, within a small tolerance. */
function classify(r) {
  let x = 0.4;
  for (let i = 0; i < 400; i++) { x = r * x * (1 - x); }
  const tail = [];
  for (let i = 0; i < 60; i++) {
    x = r * x * (1 - x);
    tail.push(x);
  }
  const tol = 0.004;
  const clusters = [];
  for (const v of tail) {
    if (!clusters.some(c => Math.abs(c - v) < tol)) { clusters.push(v); }
    if (clusters.length > 8) { break; }
  }
  if (clusters.length === 1) { return 'Fixed point'; }
  if (clusters.length === 2) { return 'Period-2 cycle'; }
  if (clusters.length === 4) { return 'Period-4 cycle'; }
  if (clusters.length <= 8) { return 'Period-' + clusters.length + ' cycle'; }
  return 'Chaotic';
}

function draw() {
  updateCanvasSize();

  const r = rSlider.value();
  if (r !== lastR) { seedTrajectories(); }

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, infoHeight);

  fill('white');
  stroke('silver');
  rect(0, drawHeight + infoHeight, canvasWidth, controlHeight);

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(20);
  text('Logistic Map Bifurcation Explorer', canvasWidth / 2, 8);

  drawBifurcation(r);
  drawTrajectories(r);
  drawInfo(r);
  drawControlLabels(r);
}

function bifBox() {
  return { x: margin + 26, y: 44, w: canvasWidth * 0.52 - margin - 26, h: drawHeight - 44 - 36 };
}

function trajBox() {
  const left = canvasWidth * 0.56;
  return { x: left, y: 44, w: canvasWidth - left - margin, h: drawHeight - 44 - 36 };
}

function drawBifurcation(r) {
  const b = bifBox();

  fill('white');
  stroke('#ced4da');
  strokeWeight(1);
  rect(b.x, b.y, b.w, b.h);

  // tint the chaotic zone (r > ~3.57, the accumulation point)
  const chaosStart = b.x + ((3.57 - R_MIN) / (R_MAX - R_MIN)) * b.w;
  noStroke();
  fill(CHAOS_TINT);
  rect(chaosStart, b.y + 1, b.x + b.w - chaosStart - 1, b.h - 2);

  // the diagram itself
  stroke(NODE_BLUE + '40');
  strokeWeight(1);
  for (const p of bifurcationPoints) {
    const px = b.x + ((p.r - R_MIN) / (R_MAX - R_MIN)) * b.w;
    const py = b.y + b.h - p.x * b.h;
    point(px, py);
  }

  // marker at the current r
  const mx = b.x + ((r - R_MIN) / (R_MAX - R_MIN)) * b.w;
  stroke('#E8871A');
  strokeWeight(2);
  line(mx, b.y, mx, b.y + b.h);

  noStroke();
  fill('#495057');
  textAlign(CENTER, TOP);
  textSize(11);
  text('growth parameter r', b.x + b.w / 2, b.y + b.h + 4);
  textAlign(LEFT, TOP);
  text(R_MIN.toFixed(1), b.x, b.y + b.h + 4);
  textAlign(RIGHT, TOP);
  text(R_MAX.toFixed(1), b.x + b.w, b.y + b.h + 4);

  push();
  translate(b.x - 16, b.y + b.h / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('long-run x', 0, 0);
  pop();

  fill('#6c757d');
  textAlign(CENTER, TOP);
  textSize(11);
  text('click anywhere in this panel to jump r there', b.x + b.w / 2, b.y + b.h + 18);
}

function drawTrajectories(r) {
  const b = trajBox();
  const half = (b.h - 26) / 2;

  drawOneTrajectory(trajA, TRAJ_A_COLOR, b.x, b.y, b.w, half, 'x₀ = 0.5000');
  drawOneTrajectory(trajB, TRAJ_B_COLOR, b.x, b.y + half + 26, b.w, half, 'x₀ = 0.5001');

  // how far apart the two runs have drifted by the end
  const drift = Math.abs(trajA[TRAJ_STEPS - 1] - trajB[TRAJ_STEPS - 1]);
  noStroke();
  fill(drift > 0.05 ? TRAJ_A_COLOR : '#495057');
  textAlign(CENTER, TOP);
  textSize(11);
  text('Difference after ' + TRAJ_STEPS + ' steps: ' + nf(drift, 1, 4) +
       (drift > 0.05 ? '  — the two runs have separated' : '  — still together'),
       b.x + b.w / 2, b.y + b.h + 4);
}

function drawOneTrajectory(traj, col, x, y, w, h, label) {
  fill('white');
  stroke('#ced4da');
  strokeWeight(1);
  rect(x, y, w, h);

  noFill();
  stroke(col);
  strokeWeight(1.8);
  beginShape();
  for (let i = 0; i < traj.length; i++) {
    vertex(x + (i / (TRAJ_STEPS - 1)) * w, y + h - traj[i] * h);
  }
  endShape();

  noStroke();
  fill(col);
  textAlign(LEFT, TOP);
  textSize(11);
  text(label, x + 5, y + 4);
}

function drawInfo(r) {
  const label = classify(r);
  let color18, explain;
  if (label === 'Fixed point') {
    color18 = '#2E7D32';
    explain = 'One value, repeated forever. Small differences in where you start ' +
              'wash out completely.';
  } else if (label === 'Chaotic') {
    color18 = '#C62828';
    explain = 'No repeating pattern. The two trajectories above started one ' +
              'ten-thousandth apart and are now unrelated — the system is ' +
              'deterministic but unpredictable.';
  } else {
    color18 = '#B8611A';
    explain = 'The system alternates between a fixed set of values. Still ' +
              'perfectly predictable, just not constant.';
  }

  noStroke();
  fill(color18);
  textAlign(LEFT, TOP);
  textSize(16);
  text(label + '  (r = ' + nf(r, 1, 3) + ')', margin, drawHeight + 8);

  fill('#495057');
  textSize(12);
  text(explain, margin + 220, drawHeight + 10, canvasWidth - margin - 230, 44);
}

function drawControlLabels(r) {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('r: ' + nf(r, 1, 3), 12, drawHeight + infoHeight + 17);
}

function mousePressed() {
  const b = bifBox();
  if (mouseX > b.x && mouseX < b.x + b.w && mouseY > b.y && mouseY < b.y + b.h) {
    const r = R_MIN + ((mouseX - b.x) / b.w) * (R_MAX - R_MIN);
    rSlider.value(constrain(r, R_MIN, R_MAX));
    seedTrajectories();
  }
}

// These two functions must be present for width-responsive MicroSims.
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  sizeSliders();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
