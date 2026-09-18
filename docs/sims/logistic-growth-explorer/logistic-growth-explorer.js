// Logistic Growth S-Curve Explorer MicroSim
// CANVAS_HEIGHT: 546
// Chapter 6: Growth Patterns and Nonlinear Behavior
// Learning objective: given a carrying capacity and a feedback-delay setting,
// predict whether a growing quantity settles into a smooth S-curve, overshoots
// and recovers, or overshoots and collapses (Bloom: Analyze).
//
// Three traces share one set of axes: uncapped exponential growth for
// reference, a textbook logistic S-curve, and the delay-affected run that the
// sliders actually control.

let containerWidth;
let canvasWidth = 700;
let drawHeight = 410;
let controlHeight = 136;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;
let sliderLeftMargin = 215;

let rSlider, kSlider, delaySlider, fragileCheckbox;
let runButton, resetButton;

let isRunning = false;
const MAX_STEPS = 260;

// three traces
let expTrace = [];
let logisticTrace = [];
let delayTrace = [];
let delayBuffer = [];       // past (1 - N/K) terms, for the lagged balancing term
let currentK = 200;         // the delay run's K, which "fragile limit" can lower
let step = 0;
let collapsed = false;

const EXP_COLOR = '#ADB5BD';
const LOGISTIC_COLOR = '#2E7D32';
const DELAY_COLOR = '#2E5A87';
const OVERSHOOT_COLOR = '#C62828';
const K_COLOR = '#495057';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  rSlider = createSlider(0.05, 0.5, 0.18, 0.01);
  rSlider.position(sliderLeftMargin, drawHeight + 8);

  kSlider = createSlider(50, 500, 200, 10);
  kSlider.position(sliderLeftMargin, drawHeight + 40);

  delaySlider = createSlider(0, 15, 0, 1);
  delaySlider.position(sliderLeftMargin, drawHeight + 72);

  runButton = createButton('Run');
  runButton.position(10, drawHeight + 102);
  runButton.mousePressed(toggleRun);

  resetButton = createButton('Reset');
  resetButton.position(65, drawHeight + 102);
  resetButton.mousePressed(resetRun);

  fragileCheckbox = createCheckbox(' Fragile limit (overshoot damages K)', false);
  fragileCheckbox.position(130, drawHeight + 104);
  fragileCheckbox.changed(resetRun);

  sizeSliders();
  resetRun();

  describe(
    'A time-series chart comparing three growth traces on the same axes: ' +
    'uncapped exponential growth in gray, a smooth logistic S-curve in green, ' +
    'and a delay-affected run in blue that turns red when it exceeds the ' +
    'carrying capacity. Sliders set the growth rate, the carrying capacity and ' +
    'the response delay, and a fragile-limit checkbox makes an overshoot ' +
    'permanently lower the carrying capacity.'
  );
}

function sizeSliders() {
  const w = Math.max(90, canvasWidth - sliderLeftMargin - margin);
  rSlider.size(w);
  kSlider.size(w);
  delaySlider.size(w);
}

function toggleRun() {
  isRunning = !isRunning;
  runButton.html(isRunning ? 'Pause' : 'Run');
}

function resetRun() {
  isRunning = false;
  runButton.html('Run');
  step = 0;
  collapsed = false;
  currentK = kSlider ? kSlider.value() : 200;
  expTrace = [2];
  logisticTrace = [2];
  delayTrace = [2];
  delayBuffer = [];
}

function draw() {
  updateCanvasSize();

  const r = rSlider.value();
  const K = kSlider.value();
  const delay = delaySlider.value();
  const fragile = fragileCheckbox.checked();

  // If the learner moves K while paused, adopt it as the new limit.
  if (!isRunning && !collapsed) { currentK = K; }

  if (isRunning && step < MAX_STEPS) {
    advance(r, K, delay, fragile);
    step++;
  }

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
  text('Logistic Growth S-Curve Explorer', canvasWidth / 2, 8);

  drawChart(K);
  drawReadout(K, delay);
  drawControlLabels(r, K, delay);
}

/** One step of each trace. */
function advance(r, K, delay, fragile) {
  const dt = 1;

  // Pure exponential, uncapped, for reference.
  const eLast = expTrace[expTrace.length - 1];
  expTrace.push(eLast + r * eLast * dt);

  // Textbook logistic: the balancing term is felt immediately.
  const lLast = logisticTrace[logisticTrace.length - 1];
  logisticTrace.push(constrain(lLast + r * lLast * (1 - lLast / K) * dt, 0, K * 3));

  // Delay-affected run: the balancing term the system ACTS on is the one from
  // `delay` steps ago, so growth keeps going after the limit is already passed.
  const dLast = delayTrace[delayTrace.length - 1];
  delayBuffer.push(1 - dLast / currentK);
  const lagIndex = Math.max(0, delayBuffer.length - 1 - delay);
  const laggedTerm = delayBuffer[lagIndex];
  let next = dLast + r * dLast * laggedTerm * dt;

  // A fragile limit is permanently damaged by a large overshoot.
  if (fragile && next > currentK * 1.15 && !collapsed) {
    currentK = currentK * 0.55;
    collapsed = true;
  }
  delayTrace.push(constrain(next, 0, K * 3));
}

function chartBox() {
  return { x: margin + 46, y: 46, w: canvasWidth - margin * 2 - 56, h: drawHeight - 46 - 78 };
}

function drawChart(K) {
  const b = chartBox();
  const yMax = K * 1.6;

  fill('white');
  stroke('#ced4da');
  strokeWeight(1);
  rect(b.x, b.y, b.w, b.h);

  // y-axis gridlines
  stroke('#eef1f4');
  strokeWeight(1);
  for (let i = 1; i < 4; i++) {
    const y = b.y + (b.h * i) / 4;
    line(b.x, y, b.x + b.w, y);
  }

  // the carrying-capacity line
  const kY = b.y + b.h - (K / yMax) * b.h;
  stroke(K_COLOR);
  strokeWeight(2);
  drawingContext.setLineDash([8, 6]);
  line(b.x, kY, b.x + b.w, kY);
  drawingContext.setLineDash([]);
  noStroke();
  fill(K_COLOR);
  textAlign(RIGHT, BOTTOM);
  textSize(12);
  text('K = ' + K, b.x + b.w - 4, kY - 3);

  // the damaged limit, once a fragile collapse has happened
  if (collapsed) {
    const dkY = b.y + b.h - (currentK / yMax) * b.h;
    stroke(OVERSHOOT_COLOR);
    strokeWeight(2);
    drawingContext.setLineDash([4, 5]);
    line(b.x, dkY, b.x + b.w, dkY);
    drawingContext.setLineDash([]);
    noStroke();
    fill(OVERSHOOT_COLOR);
    textAlign(RIGHT, TOP);
    textSize(12);
    text('K damaged → ' + Math.round(currentK), b.x + b.w - 4, dkY + 3);
  }

  plot(expTrace, EXP_COLOR, yMax, b, 2, false);
  plot(logisticTrace, LOGISTIC_COLOR, yMax, b, 2.5, false);
  plot(delayTrace, DELAY_COLOR, yMax, b, 3, true, K);

  // axis labels
  noStroke();
  fill('#495057');
  textAlign(CENTER, TOP);
  textSize(12);
  text('Time steps', b.x + b.w / 2, b.y + b.h + 4);
  push();
  translate(b.x - 34, b.y + b.h / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('Quantity', 0, 0);
  pop();

  drawLegend(b);
}

/** Draw one trace. When `flagOvershoot` is set, the segment above K is drawn
 *  in the reinforcing red so an overshoot is visible at a glance. */
function plot(trace, col, yMax, b, weight, flagOvershoot, K) {
  if (trace.length < 2) { return; }
  noFill();
  strokeWeight(weight);
  for (let i = 1; i < trace.length; i++) {
    const x0 = b.x + ((i - 1) / (MAX_STEPS - 1)) * b.w;
    const x1 = b.x + (i / (MAX_STEPS - 1)) * b.w;
    const y0 = b.y + b.h - constrain(trace[i - 1] / yMax, 0, 1) * b.h;
    const y1 = b.y + b.h - constrain(trace[i] / yMax, 0, 1) * b.h;
    stroke(flagOvershoot && trace[i] > K ? OVERSHOOT_COLOR : col);
    line(x0, y0, x1, y1);
  }
}

function drawLegend(b) {
  const items = [
    ['Exponential (uncapped reference)', EXP_COLOR],
    ['Logistic S-curve (no delay)', LOGISTIC_COLOR],
    ['Your run (delay applied)', DELAY_COLOR]
  ];
  let x = b.x + 8;
  const y = b.y + 12;
  textSize(11);
  textAlign(LEFT, CENTER);
  for (const it of items) {
    stroke(it[1]);
    strokeWeight(3);
    line(x, y, x + 16, y);
    noStroke();
    fill('#495057');
    text(it[0], x + 21, y);
    x += textWidth(it[0]) + 42;
  }
}

function drawReadout(K, delay) {
  const cur = delayTrace[delayTrace.length - 1];
  const peak = Math.max.apply(null, delayTrace);
  const pct = (cur / K) * 100;

  let shape;
  let shapeColor;
  if (step < 12) {
    shape = 'Press Run, then predict the shape before the curve gets there.';
    shapeColor = '#6c757d';
  } else if (collapsed) {
    shape = 'OVERSHOOT AND COLLAPSE — the limit itself was damaged, so the ' +
            'quantity settles far below where it started heading.';
    shapeColor = OVERSHOOT_COLOR;
  } else if (peak > K * 1.04) {
    shape = 'OVERSHOOT AND RECOVER — the delay let growth run past K before ' +
            'the balancing term fully engaged.';
    shapeColor = '#B8611A';
  } else {
    shape = 'SMOOTH S-CURVE — the balancing term engaged in time, so growth ' +
            'slowed before the limit rather than after it.';
    shapeColor = LOGISTIC_COLOR;
  }

  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(13);
  text('Current: ' + nf(cur, 1, 1) + '   (' + nf(pct, 1, 0) + '% of K)   ' +
       'Peak: ' + nf(peak, 1, 1) + '   Step: ' + step,
       margin, drawHeight - 68);

  fill(shapeColor);
  textSize(13);
  text(shape, margin, drawHeight - 48, canvasWidth - margin * 2, 44);
}

function drawControlLabels(r, K, delay) {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Growth rate r: ' + nf(r, 1, 2), 12, drawHeight + 17);
  text('Carrying capacity K: ' + K, 12, drawHeight + 49);
  text('Response delay: ' + delay + ' step' + (delay === 1 ? '' : 's'), 12, drawHeight + 81);
}

// These two functions must be present for width-responsive MicroSims.
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  sizeSliders();
  fragileCheckbox.position(130, drawHeight + 104);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
