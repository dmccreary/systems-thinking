// Bathtub Stock and Flow Simulator MicroSim
// CANVAS_HEIGHT: 566
// Chapter 5: Stocks, Flows, and System Dynamics
// Learning objective: given independently adjustable inflow and outflow rates,
// predict whether a stock rises, falls, or holds steady (Bloom: Apply).
//
// The tub is the stock. The tap is the inflow and the drain is the outflow, and
// the chart beside the tub plots the water level over time so accumulation is
// visible rather than merely described.

let containerWidth;
let canvasWidth = 700;
let drawHeight = 400;         // the drawn scene: tub, pipes and chart
let infoHeight = 56;          // the rising/falling/steady verdict
let controlHeight = 110;
let canvasHeight = drawHeight + infoHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;
let sliderLeftMargin = 190;

// ---- simulation state ----
let level = 50;              // the stock, 0-100 percent full
let history = [];            // recent levels, for the chart
const MAX_HISTORY = 240;
let isRunning = false;       // every MicroSim starts paused

let inflowSlider, outflowSlider;
let startButton, resetButton;

const WATER = '#4A90D9';
const IN_COLOR = '#2E7D32';
const OUT_COLOR = '#B8611A';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  startButton = createButton('Start');
  startButton.position(10, drawHeight + infoHeight + 8);
  startButton.mousePressed(toggleSimulation);

  resetButton = createButton('Reset');
  resetButton.position(80, drawHeight + infoHeight + 8);
  resetButton.mousePressed(resetSimulation);

  inflowSlider = createSlider(0, 2, 0.8, 0.05);
  inflowSlider.position(sliderLeftMargin, drawHeight + infoHeight + 44);

  outflowSlider = createSlider(0, 2, 0.4, 0.05);
  outflowSlider.position(sliderLeftMargin, drawHeight + infoHeight + 76);

  sizeSliders();
  resetSimulation();

  describe(
    'A bathtub whose water level represents a stock. A tap above it adds water ' +
    'at an adjustable inflow rate and a drain below removes water at an ' +
    'adjustable outflow rate. A chart beside the tub plots the level over time, ' +
    'and a readout states whether the stock is rising, falling or holding steady.'
  );
}

function sizeSliders() {
  const w = Math.max(90, canvasWidth - sliderLeftMargin - margin);
  inflowSlider.size(w);
  outflowSlider.size(w);
}

function toggleSimulation() {
  isRunning = !isRunning;
  startButton.html(isRunning ? 'Pause' : 'Start');
}

function resetSimulation() {
  level = 50;
  history = [];
  isRunning = false;
  startButton.html('Start');
}

function draw() {
  updateCanvasSize();

  const inflow = inflowSlider.value();
  const outflow = outflowSlider.value();
  const net = inflow - outflow;

  if (isRunning) {
    // The stock changes by the NET flow. This is the whole idea: the level is
    // not set by either rate on its own, only by the difference between them.
    level = constrain(level + net * 0.35, 0, 100);
    history.push(level);
    if (history.length > MAX_HISTORY) { history.shift(); }
  }

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
  text('Bathtub Stock and Flow Simulator', canvasWidth / 2, 8);

  const splitX = canvasWidth * 0.46;
  drawTub(splitX, inflow, outflow);
  drawChart(splitX, canvasWidth - margin);
  drawVerdict(net, inflow, outflow);
  drawControlLabels(inflow, outflow);
}

function drawTub(splitX, inflow, outflow) {
  const tubW = min(splitX - margin * 2, 210);
  const tubH = 150;
  const tubX = (splitX - tubW) / 2;
  const tubY = 140;

  // inflow pipe and tap
  stroke(IN_COLOR);
  strokeWeight(9);
  line(tubX + tubW * 0.28, 74, tubX + tubW * 0.28, 104);
  noStroke();
  fill(IN_COLOR);
  textAlign(CENTER, BOTTOM);
  textSize(13);
  text('Interest earned (inflow)', tubX + tubW * 0.28, 68);

  // water falling from the tap, thickness tracking the inflow rate
  if (inflow > 0) {
    stroke(WATER);
    strokeWeight(map(inflow, 0, 2, 1, 10));
    line(tubX + tubW * 0.28, 104, tubX + tubW * 0.28, tubY);
  }

  // the tub
  const waterH = (level / 100) * (tubH - 8);
  noStroke();
  fill(WATER);
  rect(tubX + 4, tubY + tubH - 4 - waterH, tubW - 8, waterH);

  noFill();
  stroke('#495057');
  strokeWeight(4);
  // open-topped tub: left wall, floor, right wall
  line(tubX, tubY, tubX, tubY + tubH);
  line(tubX, tubY + tubH, tubX + tubW, tubY + tubH);
  line(tubX + tubW, tubY, tubX + tubW, tubY + tubH);

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(15);
  text('The Stock', tubX + tubW / 2, tubY + 8);
  textSize(22);
  fill('#14517F');
  text(nf(level, 1, 1) + '%', tubX + tubW / 2, tubY + 30);

  // outflow pipe and drain
  stroke(OUT_COLOR);
  strokeWeight(9);
  line(tubX + tubW * 0.72, tubY + tubH, tubX + tubW * 0.72, tubY + tubH + 46);
  if (outflow > 0 && level > 0) {
    stroke(WATER);
    strokeWeight(map(outflow, 0, 2, 1, 10));
    line(tubX + tubW * 0.72, tubY + tubH + 46, tubX + tubW * 0.72, tubY + tubH + 66);
  }
  noStroke();
  fill(OUT_COLOR);
  textAlign(CENTER, TOP);
  textSize(13);
  text('Withdrawals (outflow)', tubX + tubW * 0.72, tubY + tubH + 72);
}

function drawChart(x0, x1) {
  const y0 = 90;
  const y1 = drawHeight - 34;
  const w = x1 - x0;

  fill('white');
  stroke('#ced4da');
  strokeWeight(1);
  rect(x0, y0, w, y1 - y0);

  // gridlines at 0, 50 and 100 percent
  stroke('#e9ecef');
  for (let pct = 0; pct <= 100; pct += 25) {
    const y = map(pct, 0, 100, y1, y0);
    line(x0, y, x0 + w, y);
  }

  noStroke();
  fill('#6c757d');
  textAlign(LEFT, CENTER);
  textSize(11);
  text('100%', x0 + 4, y0 + 7);
  text('0%', x0 + 4, y1 - 7);

  noStroke();
  fill('black');
  textAlign(CENTER, BOTTOM);
  textSize(14);
  text('Stock level over time', x0 + w / 2, y0 - 6);

  if (history.length > 1) {
    noFill();
    stroke(WATER);
    strokeWeight(2.5);
    beginShape();
    for (let i = 0; i < history.length; i++) {
      const px = map(i, 0, MAX_HISTORY - 1, x0 + 2, x0 + w - 2);
      const py = map(history[i], 0, 100, y1 - 2, y0 + 2);
      vertex(px, py);
    }
    endShape();
  } else {
    noStroke();
    fill('#adb5bd');
    textAlign(CENTER, CENTER);
    textSize(13);
    text('Press Start to plot the level over time', x0 + w / 2, (y0 + y1) / 2);
  }
}

function drawVerdict(net, inflow, outflow) {
  let verdict, verdictColor;
  if (abs(net) < 0.001) {
    verdict = 'HOLDING STEADY — inflow equals outflow (dynamic equilibrium)';
    verdictColor = '#495057';
  } else if (net > 0) {
    verdict = 'RISING — inflow exceeds outflow by ' + nf(net, 1, 2);
    verdictColor = IN_COLOR;
  } else {
    verdict = 'FALLING — outflow exceeds inflow by ' + nf(-net, 1, 2);
    verdictColor = OUT_COLOR;
  }

  noStroke();
  fill(verdictColor);
  textAlign(CENTER, TOP);
  textSize(16);
  text(verdict, canvasWidth / 2, drawHeight + 8);

  fill('#6c757d');
  textSize(12);
  text('A large inflow does not mean a rising stock, and a large outflow does ' +
       'not mean a falling one. Only the difference matters.',
       canvasWidth / 2, drawHeight + 32);
}

function drawControlLabels(inflow, outflow) {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  fill(IN_COLOR);
  text('Inflow rate: ' + nf(inflow, 1, 2), 12, drawHeight + infoHeight + 53);
  fill(OUT_COLOR);
  text('Outflow rate: ' + nf(outflow, 1, 2), 12, drawHeight + infoHeight + 85);
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
