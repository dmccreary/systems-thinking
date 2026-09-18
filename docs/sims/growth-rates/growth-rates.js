// Growth Rate Comparison MicroSim
// CANVAS_HEIGHT: 520
// Compare growth rates of logarithmic, polynomial, and exponential functions
// Learning Objective: Students will compare growth rates to predict limit behavior
// Bloom Level: Evaluate (L5)

// Canvas dimensions
let canvasWidth = 600;
let drawHeight = 400;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Graph region
let graphLeft = 70;
let graphTop = 55;
let graphRight, graphBottom;
let graphWidth, graphHeight;

// X-range control
let xMax = 10;
let xMin = 1;

// Y-scale mode: 'linear' or 'log'
let yScaleMode = 'linear';

// Animation state
let isRacing = false;
let raceX = 1;
let raceSpeed = 0.5;

// Ratio comparison mode
let ratioMode = false;
let ratioFunc1 = 0; // Index of first function for ratio
let ratioFunc2 = 6; // Index of second function for ratio

// Function definitions with categories
let functions = [
  // Logarithmic (blue family)
  { name: 'ln(x)', calc: x => Math.log(x), color: [30, 100, 200], enabled: true, category: 'log' },
  { name: 'log10(x)', calc: x => Math.log10(x), color: [70, 140, 220], enabled: false, category: 'log' },

  // Polynomial (green family)
  { name: 'sqrt(x)', calc: x => Math.sqrt(x), color: [30, 150, 50], enabled: true, category: 'poly' },
  { name: 'x', calc: x => x, color: [60, 180, 80], enabled: false, category: 'poly' },
  { name: 'x^2', calc: x => x * x, color: [90, 200, 100], enabled: true, category: 'poly' },
  { name: 'x^3', calc: x => x * x * x, color: [40, 130, 60], enabled: false, category: 'poly' },

  // Exponential (red family)
  { name: '2^x', calc: x => Math.pow(2, x), color: [200, 50, 50], enabled: false, category: 'exp' },
  { name: 'e^x', calc: x => Math.exp(x), color: [220, 80, 80], enabled: true, category: 'exp' },
  { name: '10^x', calc: x => Math.pow(10, x), color: [180, 30, 30], enabled: false, category: 'exp' }
];

// Checkbox buttons state
let checkboxBounds = [];
let sliderBounds = {};
let buttonBounds = {};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateGraphBounds();

  describe('Growth Rate Comparison MicroSim: Compare logarithmic, polynomial, and exponential functions to see which dominates at different scales.');
}

function updateGraphBounds() {
  graphRight = canvasWidth - margin;
  graphBottom = drawHeight - 30;
  graphWidth = graphRight - graphLeft;
  graphHeight = graphBottom - graphTop;
}

function draw() {
  updateCanvasSize();

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title and subtitle
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(22);
  text('Growth Rate Comparison', canvasWidth / 2, 8);
  textSize(14);
  fill(100);
  text('Which function dominates as x increases?', canvasWidth / 2, 32);

  // Draw graph
  if (ratioMode) {
    drawRatioGraph();
  } else {
    drawGraph();
  }

  // Draw controls
  drawControls();

  // Update race animation
  if (isRacing) {
    raceX += raceSpeed * (xMax / 100);
    if (raceX >= xMax) {
      raceX = xMax;
      isRacing = false;
    }
  }
}

function drawGraph() {
  // Background
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(graphLeft, graphTop, graphWidth, graphHeight);

  // Calculate y range based on enabled functions
  let yMax = calculateYMax();
  let yMin = yScaleMode === 'log' ? 0.01 : 0;

  // Grid lines
  drawGridLines(yMin, yMax);

  // Axes
  stroke(0);
  strokeWeight(2);
  line(graphLeft, graphBottom, graphRight, graphBottom); // X-axis
  line(graphLeft, graphTop, graphLeft, graphBottom); // Y-axis

  // Axis labels
  fill('black');
  noStroke();
  textSize(14);
  textAlign(CENTER, TOP);
  text('x', graphLeft + graphWidth / 2, graphBottom + 5);

  push();
  translate(15, graphTop + graphHeight / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text(ratioMode ? 'ratio' : 'y', 0, 0);
  pop();

  // Draw functions
  strokeWeight(2);
  noFill();

  for (let i = 0; i < functions.length; i++) {
    if (!functions[i].enabled) continue;

    stroke(functions[i].color);
    beginShape();
    for (let px = graphLeft; px <= graphRight; px += 2) {
      let x = map(px, graphLeft, graphRight, xMin, xMax);
      let y = functions[i].calc(x);

      if (isNaN(y) || !isFinite(y) || y <= 0 && yScaleMode === 'log') continue;

      let py;
      if (yScaleMode === 'log') {
        py = map(Math.log10(y), Math.log10(yMin), Math.log10(yMax), graphBottom, graphTop);
      } else {
        py = map(y, yMin, yMax, graphBottom, graphTop);
      }

      if (py >= graphTop && py <= graphBottom) {
        vertex(px, py);
      }
    }
    endShape();
  }

  // Draw race line if racing
  if (isRacing || raceX > xMin) {
    let racePx = map(raceX, xMin, xMax, graphLeft, graphRight);
    stroke(100, 100, 100, 150);
    strokeWeight(1);
    line(racePx, graphTop, racePx, graphBottom);

    // Show current values
    drawValueLabels(raceX, yMin, yMax);
  }

  // Draw legend
  drawLegend();
}

function drawRatioGraph() {
  // Background
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(graphLeft, graphTop, graphWidth, graphHeight);

  let f1 = functions[ratioFunc1];
  let f2 = functions[ratioFunc2];

  // Calculate ratio range
  let ratioMax = 5;
  let ratioMin = 0;

  // Check if ratio goes to infinity, zero, or constant
  let testX = xMax * 0.9;
  let testRatio = f1.calc(testX) / f2.calc(testX);
  if (testRatio > 10) ratioMax = 20;
  if (testRatio > 100) ratioMax = 200;

  // Grid lines
  stroke(230);
  strokeWeight(1);
  for (let i = 1; i < 5; i++) {
    let y = map(i * ratioMax / 5, ratioMin, ratioMax, graphBottom, graphTop);
    line(graphLeft, y, graphRight, y);
  }

  // Reference line at y = 1
  stroke(150, 150, 200);
  strokeWeight(1);
  setLineDash([5, 5]);
  let y1 = map(1, ratioMin, ratioMax, graphBottom, graphTop);
  if (y1 >= graphTop && y1 <= graphBottom) {
    line(graphLeft, y1, graphRight, y1);
  }
  setLineDash([]);

  // Axes
  stroke(0);
  strokeWeight(2);
  line(graphLeft, graphBottom, graphRight, graphBottom);
  line(graphLeft, graphTop, graphLeft, graphBottom);

  // Draw ratio curve
  stroke(150, 50, 150);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let px = graphLeft; px <= graphRight; px += 2) {
    let x = map(px, graphLeft, graphRight, xMin, xMax);
    let y1Val = f1.calc(x);
    let y2Val = f2.calc(x);

    if (y2Val === 0 || !isFinite(y1Val) || !isFinite(y2Val)) continue;

    let ratio = y1Val / y2Val;
    let py = map(ratio, ratioMin, ratioMax, graphBottom, graphTop);

    if (py >= graphTop && py <= graphBottom) {
      vertex(px, py);
    }
  }
  endShape();

  // Ratio title
  fill(150, 50, 150);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  text(f1.name + ' / ' + f2.name, canvasWidth / 2, graphTop - 18);

  // Determine limit behavior
  let startRatio = f1.calc(xMin + 0.1) / f2.calc(xMin + 0.1);
  let endRatio = f1.calc(xMax) / f2.calc(xMax);

  let behavior = '';
  if (endRatio > startRatio * 10) {
    behavior = 'Ratio -> infinity (numerator dominates)';
  } else if (endRatio < startRatio / 10) {
    behavior = 'Ratio -> 0 (denominator dominates)';
  } else {
    behavior = 'Ratio stays bounded';
  }

  fill(80);
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text(behavior, canvasWidth / 2, graphBottom + 25);

  // Axis labels
  fill('black');
  noStroke();
  textSize(12);
  textAlign(RIGHT, CENTER);
  for (let i = 0; i <= 4; i++) {
    let val = ratioMin + (ratioMax - ratioMin) * i / 4;
    let y = map(val, ratioMin, ratioMax, graphBottom, graphTop);
    text(val.toFixed(1), graphLeft - 5, y);
  }
}

function calculateYMax() {
  let yMax = 10;

  for (let i = 0; i < functions.length; i++) {
    if (!functions[i].enabled) continue;
    let y = functions[i].calc(isRacing ? raceX : xMax);
    if (isFinite(y) && y > 0) {
      yMax = max(yMax, y * 1.2);
    }
  }

  // Ccollege placement exponential at reasonable display max
  if (yScaleMode === 'linear') {
    yMax = min(yMax, 10000);
  } else {
    yMax = min(yMax, 1e10);
  }

  return yMax;
}

function drawGridLines(yMin, yMax) {
  stroke(230);
  strokeWeight(1);

  // Vertical grid lines (x-axis)
  let xStep = calculateStep(xMax - xMin);
  for (let x = xMin; x <= xMax; x += xStep) {
    let px = map(x, xMin, xMax, graphLeft, graphRight);
    line(px, graphTop, px, graphBottom);

    fill(100);
    noStroke();
    textSize(10);
    textAlign(CENTER, TOP);
    text(formatNumber(x), px, graphBottom + 2);
    stroke(230);
  }

  // Horizontal grid lines (y-axis)
  if (yScaleMode === 'log') {
    // Logarithmic scale
    let logMin = Math.floor(Math.log10(yMin));
    let logMax = Math.ceil(Math.log10(yMax));
    for (let exp = logMin; exp <= logMax; exp++) {
      let y = Math.pow(10, exp);
      let py = map(exp, Math.log10(yMin), Math.log10(yMax), graphBottom, graphTop);
      if (py >= graphTop && py <= graphBottom) {
        line(graphLeft, py, graphRight, py);

        fill(100);
        noStroke();
        textSize(10);
        textAlign(RIGHT, CENTER);
        text('10^' + exp, graphLeft - 5, py);
        stroke(230);
      }
    }
  } else {
    // Linear scale
    let yStep = calculateStep(yMax - yMin);
    for (let y = yMin; y <= yMax; y += yStep) {
      let py = map(y, yMin, yMax, graphBottom, graphTop);
      if (py >= graphTop && py <= graphBottom) {
        line(graphLeft, py, graphRight, py);

        fill(100);
        noStroke();
        textSize(10);
        textAlign(RIGHT, CENTER);
        text(formatNumber(y), graphLeft - 5, py);
        stroke(230);
      }
    }
  }
}

function calculateStep(range) {
  let magnitude = Math.pow(10, Math.floor(Math.log10(range)));
  let normalized = range / magnitude;

  if (normalized <= 2) return magnitude / 4;
  if (normalized <= 5) return magnitude / 2;
  return magnitude;
}

function formatNumber(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  if (n >= 10) return Math.round(n).toString();
  if (n >= 1) return n.toFixed(1);
  return n.toFixed(2);
}

function drawValueLabels(x, yMin, yMax) {
  let labelX = canvasWidth - 120;
  let labelY = graphTop + 10;

  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(labelX - 5, labelY - 5, 115, functions.filter(f => f.enabled).length * 18 + 25, 5);

  fill(80);
  noStroke();
  textSize(11);
  textAlign(LEFT, TOP);
  text('At x = ' + formatNumber(x), labelX, labelY);

  let idx = 0;
  for (let i = 0; i < functions.length; i++) {
    if (!functions[i].enabled) continue;
    let y = functions[i].calc(x);
    fill(functions[i].color);
    textAlign(LEFT, TOP);
    text(functions[i].name + ': ' + formatNumber(y), labelX, labelY + 18 + idx * 18);
    idx++;
  }
}

function drawLegend() {
  let legendX = graphLeft + 10;
  let legendY = graphTop + 10;

  let enabledCount = functions.filter(f => f.enabled).length;
  if (enabledCount === 0) return;

  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(legendX - 5, legendY - 5, 80, enabledCount * 18 + 10, 5);

  let idx = 0;
  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);
  for (let i = 0; i < functions.length; i++) {
    if (!functions[i].enabled) continue;
    fill(functions[i].color);
    rect(legendX, legendY + idx * 18, 15, 12);
    fill(0);
    text(functions[i].name, legendX + 20, legendY + idx * 18 + 6);
    idx++;
  }
}

function drawControls() {
  checkboxBounds = [];

  // Row 1: Function checkboxes
  let row1Y = drawHeight + 12;

  // Category labels and checkboxes
  fill('black');
  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);

  // Calculate positions
  let logStart = 10;
  let polyStart = canvasWidth * 0.3;
  let expStart = canvasWidth * 0.65;

  // Logarithmic functions
  fill(30, 100, 200);
  text('Log:', logStart, row1Y);
  let logX = logStart + 35;
  for (let i = 0; i < 2; i++) {
    drawCheckbox(logX + i * 65, row1Y - 8, functions[i].enabled, functions[i].name, i);
  }

  // Polynomial functions
  fill(30, 150, 50);
  text('Poly:', polyStart, row1Y);
  let polyX = polyStart + 40;
  for (let i = 2; i < 6; i++) {
    drawCheckbox(polyX + (i - 2) * 55, row1Y - 8, functions[i].enabled, functions[i].name, i);
  }

  // Exponential functions
  fill(200, 50, 50);
  text('Exp:', expStart, row1Y);
  let expX = expStart + 35;
  for (let i = 6; i < 9; i++) {
    drawCheckbox(expX + (i - 6) * 55, row1Y - 8, functions[i].enabled, functions[i].name, i);
  }

  // Row 2: X-Range slider
  let row2Y = drawHeight + 45;
  fill('black');
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  text('X-Range: 1 to ' + xMax, 10, row2Y);

  // Slider
  let sliderX = 140;
  let sliderW = canvasWidth - sliderX - margin - 100;

  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderX, row2Y - 5, sliderW, 10, 5);

  // Slider handle
  let handleX = map(xMax, 10, 1000, sliderX, sliderX + sliderW);
  fill('#0088ff');
  noStroke();
  circle(handleX, row2Y, 16);

  sliderBounds = { x: sliderX, y: row2Y - 10, w: sliderW, h: 20, minVal: 10, maxVal: 1000 };

  // Stage labels
  fill(100);
  textSize(10);
  textAlign(CENTER, TOP);
  text('10', sliderX, row2Y + 8);
  text('100', sliderX + sliderW * 0.5, row2Y + 8);
  text('1000', sliderX + sliderW, row2Y + 8);

  // Row 3: Buttons
  let row3Y = drawHeight + 80;

  // Race button
  drawButton(10, row3Y, 80, 30, isRacing ? 'Racing...' : 'Race!', '#4CAF50', 'race');

  // Reset button
  drawButton(100, row3Y, 70, 30, 'Reset', '#f44336', 'reset');

  // Y-scale toggle
  let scaleX = 190;
  fill('black');
  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Y-Scale:', scaleX, row3Y + 15);

  drawToggle(scaleX + 60, row3Y + 5, yScaleMode === 'linear', 'Linear', 'Log', 'scale');

  // Ratio mode toggle
  let ratioX = canvasWidth * 0.55;
  text('Ratio Mode:', ratioX, row3Y + 15);
  drawToggle(ratioX + 85, row3Y + 5, !ratioMode, 'Off', 'On', 'ratio');

  // Ratio selectors (only show if ratio mode is on)
  if (ratioMode) {
    textSize(10);
    text(functions[ratioFunc1].name + ' / ' + functions[ratioFunc2].name, ratioX + 175, row3Y + 15);
  }
}

function drawCheckbox(x, y, checked, label, index) {
  let boxSize = 14;

  // Checkbox box
  fill(checked ? functions[index].color : 255);
  stroke(150);
  strokeWeight(1);
  rect(x, y, boxSize, boxSize, 2);

  // Checkmark
  if (checked) {
    stroke(255);
    strokeWeight(2);
    line(x + 3, y + 7, x + 6, y + 11);
    line(x + 6, y + 11, x + 11, y + 3);
  }

  // Label
  fill(80);
  noStroke();
  textSize(10);
  textAlign(LEFT, CENTER);
  text(label, x + boxSize + 3, y + boxSize / 2);

  // Store bounds for click detection
  checkboxBounds.push({ x: x, y: y, w: boxSize + 40, h: boxSize, index: index });
}

function drawButton(x, y, w, h, label, bgColor, id) {
  fill(bgColor);
  stroke(150);
  strokeWeight(1);
  rect(x, y, w, h, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text(label, x + w / 2, y + h / 2);

  buttonBounds[id] = { x: x, y: y, w: w, h: h };
}

function drawToggle(x, y, isLeft, leftLabel, rightLabel, id) {
  let toggleW = 90;
  let toggleH = 22;

  // Background
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(x, y, toggleW, toggleH, toggleH / 2);

  // Active side
  fill('#2196F3');
  noStroke();
  if (isLeft) {
    rect(x, y, toggleW / 2, toggleH, toggleH / 2, 0, 0, toggleH / 2);
  } else {
    rect(x + toggleW / 2, y, toggleW / 2, toggleH, 0, toggleH / 2, toggleH / 2, 0);
  }

  // Labels
  textSize(11);
  textAlign(CENTER, CENTER);
  fill(isLeft ? 'white' : 'black');
  text(leftLabel, x + toggleW / 4, y + toggleH / 2);
  fill(!isLeft ? 'white' : 'black');
  text(rightLabel, x + 3 * toggleW / 4, y + toggleH / 2);

  buttonBounds[id] = { x: x, y: y, w: toggleW, h: toggleH, isToggle: true };
}

function setLineDash(pattern) {
  drawingContext.setLineDash(pattern);
}

function mousePressed() {
  // Check checkboxes
  for (let cb of checkboxBounds) {
    if (mouseX >= cb.x && mouseX <= cb.x + cb.w &&
        mouseY >= cb.y && mouseY <= cb.y + cb.h) {
      functions[cb.index].enabled = !functions[cb.index].enabled;
      return;
    }
  }

  // Check slider
  if (mouseX >= sliderBounds.x && mouseX <= sliderBounds.x + sliderBounds.w &&
      mouseY >= sliderBounds.y && mouseY <= sliderBounds.y + sliderBounds.h) {
    updateSliderValue();
    return;
  }

  // Check buttons
  for (let id in buttonBounds) {
    let b = buttonBounds[id];
    if (mouseX >= b.x && mouseX <= b.x + b.w &&
        mouseY >= b.y && mouseY <= b.y + b.h) {
      handleButtonClick(id, b);
      return;
    }
  }
}

function mouseDragged() {
  // Drag slider
  if (mouseX >= sliderBounds.x - 20 && mouseX <= sliderBounds.x + sliderBounds.w + 20 &&
      mouseY >= sliderBounds.y && mouseY <= sliderBounds.y + sliderBounds.h) {
    updateSliderValue();
  }
}

function updateSliderValue() {
  let newX = constrain(mouseX, sliderBounds.x, sliderBounds.x + sliderBounds.w);
  // Use logarithmic mapping for slider
  let t = (newX - sliderBounds.x) / sliderBounds.w;
  xMax = Math.round(Math.pow(10, 1 + t * 2)); // 10 to 1000
  xMax = constrain(xMax, 10, 1000);
  raceX = xMin;
}

function handleButtonClick(id, bounds) {
  if (id === 'race') {
    isRacing = true;
    raceX = xMin;
  } else if (id === 'reset') {
    isRacing = false;
    raceX = xMin;
    xMax = 10;
  } else if (id === 'scale') {
    yScaleMode = (yScaleMode === 'linear') ? 'log' : 'linear';
  } else if (id === 'ratio') {
    ratioMode = !ratioMode;
    if (ratioMode) {
      // Set default ratio functions if none enabled
      let enabledIndices = functions.map((f, i) => f.enabled ? i : -1).filter(i => i >= 0);
      if (enabledIndices.length >= 2) {
        ratioFunc1 = enabledIndices[0];
        ratioFunc2 = enabledIndices[enabledIndices.length - 1];
      }
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateGraphBounds();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  updateGraphBounds();
}
