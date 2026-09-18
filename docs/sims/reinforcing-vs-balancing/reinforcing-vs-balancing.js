// Reinforcing vs Balancing Loop Simulator
// Compare dynamic behavior of reinforcing and balancing feedback loops
// Bloom Level: Analyze (L4)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let canvasHeight = drawHeight;

let initialSlider, strengthSlider;
let runButton, resetButton, polarityToggle;

// Simulation state
let simRunning = false;
let simStep = 0;
let maxSteps = 40;
let reinforcingData = [];
let balancingData = [];
let initialValue = 50;
let loopStrength = 0.05;
let showPolarity = true;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  buildControls();
  resetSimulation();
  describe('Side-by-side comparison of reinforcing and balancing feedback loops with time-series graphs showing exponential growth vs damped oscillation.');
}

function buildControls() {
  let mainEl = document.querySelector('main');
  let controlDiv = document.createElement('div');
  controlDiv.id = 'loop-controls';
  controlDiv.style.cssText = 'background: white; border: 1px solid silver; padding: 12px; font-family: Arial, sans-serif; font-size: 14px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: center;';
  mainEl.appendChild(controlDiv);

  initialSlider = createCtrlSlider(controlDiv, 'Initial Value', 10, 100, 50, 1);
  strengthSlider = createCtrlSlider(controlDiv, 'Loop Strength', 1, 20, 5, 1);

  runButton = document.createElement('button');
  runButton.textContent = 'Run Simulation';
  runButton.style.cssText = 'padding: 6px 16px; font-size: 14px; cursor: pointer; border: 1px solid #4285F4; border-radius: 4px; background: #4285F4; color: white; font-weight: bold;';
  runButton.addEventListener('click', toggleRun);
  controlDiv.appendChild(runButton);

  resetButton = document.createElement('button');
  resetButton.textContent = 'Reset';
  resetButton.style.cssText = 'padding: 6px 16px; font-size: 14px; cursor: pointer; border: 1px solid silver; border-radius: 4px; background: #f0f0f0;';
  resetButton.addEventListener('click', resetSimulation);
  controlDiv.appendChild(resetButton);

  let polLabel = document.createElement('label');
  polLabel.style.cssText = 'display: flex; align-items: center; gap: 4px; font-size: 13px;';
  let polCb = document.createElement('input');
  polCb.type = 'checkbox';
  polCb.checked = true;
  polCb.addEventListener('change', function() { showPolarity = polCb.checked; });
  polLabel.appendChild(polCb);
  polLabel.appendChild(document.createTextNode('Show Polarity'));
  controlDiv.appendChild(polLabel);
}

function createCtrlSlider(parent, label, min, max, def, step) {
  let wrap = document.createElement('div');
  wrap.style.cssText = 'display: flex; align-items: center; gap: 6px;';
  let lbl = document.createElement('span');
  lbl.textContent = label + ':';
  lbl.style.cssText = 'font-size: 13px; white-space: nowrap;';
  wrap.appendChild(lbl);
  let sl = document.createElement('input');
  sl.type = 'range'; sl.min = min; sl.max = max; sl.value = def; sl.step = step;
  sl.style.cssText = 'width: 100px;';
  wrap.appendChild(sl);
  let val = document.createElement('span');
  val.textContent = def;
  val.style.cssText = 'font-size: 13px; min-width: 24px; font-variant-numeric: tabular-nums;';
  wrap.appendChild(val);
  sl.addEventListener('input', function() { val.textContent = sl.value; });
  parent.appendChild(wrap);
  return { value: function() { return parseFloat(sl.value); } };
}

function toggleRun() {
  simRunning = !simRunning;
  runButton.textContent = simRunning ? 'Pause' : 'Run Simulation';
}

function resetSimulation() {
  simRunning = false;
  simStep = 0;
  initialValue = initialSlider ? initialSlider.value() : 50;
  loopStrength = strengthSlider ? strengthSlider.value() / 100 : 0.05;
  reinforcingData = [initialValue];
  balancingData = [initialValue];
  if (runButton) runButton.textContent = 'Run Simulation';
}

function draw() {
  updateCanvasSize();

  // Update simulation
  if (simRunning && simStep < maxSteps) {
    initialValue = initialSlider.value();
    loopStrength = strengthSlider.value() / 100;
    simStep++;

    // Reinforcing: exponential growth
    let prevR = reinforcingData[reinforcingData.length - 1];
    reinforcingData.push(prevR * (1 + loopStrength));

    // Balancing: damped oscillation toward target (50)
    let target = 50;
    let prevB = balancingData[balancingData.length - 1];
    let error = prevB - target;
    let correction = -error * loopStrength * 1.8;
    // Add slight overshoot for oscillation
    let overshoot = sin(simStep * 0.5) * error * loopStrength * 0.5;
    balancingData.push(prevB + correction + overshoot);

    if (simStep >= maxSteps) {
      simRunning = false;
      runButton.textContent = 'Run Simulation';
    }
  }

  // Background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Reinforcing vs Balancing Loops', canvasWidth / 2, 8);

  let halfW = canvasWidth / 2 - 10;
  let leftX = 10;
  let rightX = canvasWidth / 2 + 5;

  // === CLD Diagrams (top half) ===
  let cldH = 170;
  let cldY = 38;

  // Reinforcing loop CLD
  drawCLD(leftX, cldY, halfW, cldH, 'Reinforcing (R)', [66, 133, 244],
    ['Customer\nBase', 'Revenue', 'Marketing\nBudget'], ['+', '+', '+'], 'R');

  // Balancing loop CLD
  drawCLD(rightX, cldY, halfW, cldH, 'Balancing (B)', [229, 57, 53],
    ['Inventory', 'Production\nRate', ''], ['+', '\u2212', ''], 'B');

  // === Time Series Graphs (bottom half) ===
  let graphY = cldY + cldH + 15;
  let graphH = drawHeight - graphY - 10;

  drawGraph(leftX, graphY, halfW, graphH, 'Reinforcing Loop', [66, 133, 244], reinforcingData);
  drawGraph(rightX, graphY, halfW, graphH, 'Balancing Loop', [229, 57, 53], balancingData);
}

function drawCLD(x, y, w, h, title, col, vars, polarities, loopType) {
  // Background
  fill(255, 255, 255, 200);
  stroke(col[0], col[1], col[2], 100);
  strokeWeight(1);
  rect(x, y, w, h, 6);

  // Title
  noStroke();
  fill(col[0], col[1], col[2]);
  textAlign(CENTER, TOP);
  textSize(14);
  text(title, x + w / 2, y + 4);

  let cx = x + w / 2;
  let cy = y + h / 2 + 10;
  let radius = min(w, h) * 0.28;

  // Loop label in center
  fill(col[0], col[1], col[2], 60);
  noStroke();
  ellipse(cx, cy, radius * 0.7, radius * 0.7);
  fill(col[0], col[1], col[2]);
  textAlign(CENTER, CENTER);
  textSize(18);
  noStroke();
  text(loopType, cx, cy);

  // Variable nodes
  let numVars = loopType === 'B' ? 2 : 3;
  let nodePositions = [];
  for (let i = 0; i < numVars; i++) {
    let angle = -HALF_PI + (TWO_PI / numVars) * i;
    let nx = cx + cos(angle) * radius;
    let ny = cy + sin(angle) * radius;
    nodePositions.push({ x: nx, y: ny });

    // Node box
    fill(col[0], col[1], col[2], 30);
    stroke(col[0], col[1], col[2]);
    strokeWeight(1.5);
    let boxW = w * 0.3;
    let boxH = 28;
    rect(nx - boxW / 2, ny - boxH / 2, boxW, boxH, 4);

    // Node label
    fill(40);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text(vars[i], nx, ny);
  }

  // Arrows between nodes
  for (let i = 0; i < numVars; i++) {
    let from = nodePositions[i];
    let to = nodePositions[(i + 1) % numVars];
    let dx = to.x - from.x;
    let dy = to.y - from.y;
    let len = sqrt(dx * dx + dy * dy);
    let ux = dx / len;
    let uy = dy / len;

    let startX = from.x + ux * 22;
    let startY = from.y + uy * 16;
    let endX = to.x - ux * 22;
    let endY = to.y - uy * 16;

    stroke(col[0], col[1], col[2]);
    strokeWeight(2);
    line(startX, startY, endX, endY);

    // Arrowhead
    let aSize = 8;
    let aAngle = atan2(endY - startY, endX - startX);
    fill(col[0], col[1], col[2]);
    triangle(
      endX, endY,
      endX - cos(aAngle - 0.4) * aSize, endY - sin(aAngle - 0.4) * aSize,
      endX - cos(aAngle + 0.4) * aSize, endY - sin(aAngle + 0.4) * aSize
    );

    // Polarity label
    if (showPolarity && polarities[i]) {
      let midX = (startX + endX) / 2 - uy * 10;
      let midY = (startY + endY) / 2 + ux * 10;
      noStroke();
      fill(col[0], col[1], col[2]);
      textSize(16);
      textAlign(CENTER, CENTER);
      text(polarities[i], midX, midY);
    }
  }
}

function drawGraph(x, y, w, h, title, col, data) {
  // Background
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(x, y, w, h, 6);

  // Title
  noStroke();
  fill(col[0], col[1], col[2]);
  textAlign(CENTER, TOP);
  textSize(13);
  text(title, x + w / 2, y + 4);

  let pad = 30;
  let gx = x + pad;
  let gy = y + 22;
  let gw = w - pad - 10;
  let gh = h - 36;

  // Axes
  stroke(180);
  strokeWeight(1);
  line(gx, gy, gx, gy + gh);
  line(gx, gy + gh, gx + gw, gy + gh);

  // Find range
  let maxVal = 100;
  for (let i = 0; i < data.length; i++) {
    if (data[i] > maxVal) maxVal = data[i] * 1.1;
  }
  let minVal = 0;

  // Y-axis labels
  fill(150);
  noStroke();
  textAlign(RIGHT, CENTER);
  textSize(10);
  for (let v = 0; v <= maxVal; v += maxVal / 4) {
    let yy = gy + gh - (v / maxVal) * gh;
    text(round(v), gx - 4, yy);
    stroke(240);
    strokeWeight(0.5);
    line(gx, yy, gx + gw, yy);
    noStroke();
  }

  // X-axis label
  fill(150);
  textAlign(CENTER, TOP);
  textSize(10);
  text('Time Steps', x + w / 2, gy + gh + 2);

  // Plot data
  if (data.length > 1) {
    stroke(col[0], col[1], col[2]);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < data.length; i++) {
      let px = gx + (i / maxSteps) * gw;
      let py = gy + gh - (constrain(data[i], minVal, maxVal) / maxVal) * gh;
      vertex(px, py);
    }
    endShape();

    // Current point
    let lastI = data.length - 1;
    let lastX = gx + (lastI / maxSteps) * gw;
    let lastY = gy + gh - (constrain(data[lastI], minVal, maxVal) / maxVal) * gh;
    fill(col[0], col[1], col[2]);
    noStroke();
    ellipse(lastX, lastY, 8, 8);

    // Value label
    textSize(12);
    textAlign(LEFT, BOTTOM);
    text(round(data[lastI]), lastX + 6, lastY - 2);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
