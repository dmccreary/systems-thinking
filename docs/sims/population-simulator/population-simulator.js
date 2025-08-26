// Population Growth Simulatior
// Global variables
// Width responsive design
// Fixed height
let canvasWidth = 800; // updated by window resize

let canvasHeight = 500; // fixed height
let leftPanelWidth, rightPanelWidth;


// Region Definitions
// The height of the region at the bottom to place controls like sliders and buttons
let controlHeight = 60;

// the height above the control region
let drawHeight = canvasHeight - controlHeight;
let chartHeight = drawHeight; 
let margin = 20;
// Simulation variables
let population = 100;
let initialPopulation = 100;
let birthRateSlider;
let startStopButton, resetButton;
let isRunning = false;
let time = 0;
let timeStep = 0.1;

// Chart data
let populationHistory = [];
let maxTime = 50;
let maxPopulation = 500;

// Animation variables
let pulseAnimation = 0;

function setup() {
  // Calculate responsive dimensions
  let containerWidth = Math.min(windowWidth - 40, 1200);
  canvasWidth = containerWidth;
  canvasHeight = 500;

  leftPanelWidth = canvasWidth * 0.5;
  rightPanelWidth = canvasWidth * 0.5;
  chartHeight = canvasHeight - controlHeight;

  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector("main"));
  
  setupControls();
  reset();
}

function setupControls() {
  // vertical distance below drawingHeight to place conntrols
  controls_y_offset = 10;
  
  // Birth rate slider
  birthRateSlider = createSlider(0, 0.2, 0.02, 0.01);
  birthRateSlider.position(170, drawHeight + controls_y_offset + 20);
  birthRateSlider.size(canvasWidth/2 - 30);

  // Start/Stop button
  startStopButton = createButton("Start");
  startStopButton.position(margin, drawHeight + controls_y_offset);
  startStopButton.size(60, 20);
  startStopButton.mousePressed(toggleSimulation);

  // Reset button
  resetButton = createButton("Reset");
  resetButton.position(100, drawHeight + controls_y_offset);
  resetButton.size(60, 20);
  resetButton.mousePressed(reset);
}

function draw() {
  windowResized();
  // a light gray box around the regions
  stroke('sliver');
  fill('aliceblue');
  rect(0,0,canvasWidth,drawHeight);

  // Update simulation
  if (isRunning) {
    updateSimulation();
  }

  // Update pulse animation
  pulseAnimation += 0.1;

  // Draw panels
  drawLeftPanel();
  drawRightPanel();
  drawControls();

  // Draw panel divider
  stroke(200);
  strokeWeight(2);
  line(leftPanelWidth, 0, leftPanelWidth, chartHeight);
}

// draw the left panel that draws the CLD
function drawLeftPanel() {
  push();

  // draw a light gray border around the CLD area
  stroke('sliver');
  rect(0, 0, leftPanelWidth, chartHeight);
  
  // Center the diagram
  translate(leftPanelWidth / 2, chartHeight / 2);
  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  text('Population Causal Loop Diagram', 0, - chartHeight/2 + margin)

  // Draw causal loop diagram
  drawCausalLoopDiagram(0,0,leftPanelWidth-margin, chartHeight);

  pop();
}

function drawCausalLoopDiagram(xOffset, yOffest, CLDwidth, CLDheight) {
  push();
  translate(xOffset, yOffest);
  let nodeSize = 80;
  let nodeSpacing = CLDwidth/2 + margin;

  // Population node (left)
  let popX = -nodeSpacing / 2;
  let popY = 0;

  // Birth Rate node (right)
  let birthX = nodeSpacing / 2;
  let birthY = 0;

  // Draw curved arrows
  // x1, y1, x2, y2, curveUp, label
  drawCurvedArrow(popX, popY, birthX, birthY, true, "+"); // Population to Birth Rate
  drawCurvedArrow(birthX, birthY, popX, popY, false, "+"); // Birth Rate to Population

  // Draw reinforcing loop symbol
  drawLoopSymbol(0, 0, "R", true);

  // Draw nodes
  drawNode(popX, popY, nodeSize, "Population", population, isRunning);
  drawNode(
    birthX,
    birthY,
    nodeSize,
    "Birth Rate",
    birthRateSlider.value(),
    false
  );
  pop()
}

function drawNode(x, y, size, label, value, animate) {
  push();
  translate(x, y);

  // Node animation
  let pulseScale = 1;
  if (animate && isRunning) {
    pulseScale = 1 + 0.1 * sin(pulseAnimation * 3);
  }
  scale(pulseScale);

  // Draw box
  stroke(30, 144, 255); // DodgerBlue
  strokeWeight(2);
  fill(255);
  rectMode(CENTER);
  rect(0, 0, size, size * 0.6, 5);

  // Draw label
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(label, 0, -8);

  // Draw value
  textSize(10);
  fill(100);
  if (typeof value === "number") {
    text(value.toFixed(value < 1 ? 3 : 0), 0, 8);
  } else {
    text(value, 0, 8);
  }

  pop();
}

function drawCurvedArrow(x1, y1, x2, y2, curveUp, label) {
  push();

  // Calculate curve control point
  let midX = (x1 + x2) / 2;
  let midY = (y1 + y2) / 2;
  // make this a parameter
  let curveOffset = curveUp ? -60 : 60;
  let controlY = midY + curveOffset;

  // Draw curved line
  stroke(128);
  strokeWeight(2);
  noFill();
  bezier(x1, y1, midX, controlY, midX, controlY, x2, y2);

  // Draw arrowhead
  let t = 0.9; // Position along curve for arrowhead
  let arrowX = bezierPoint(x1, midX, midX, x2, t);
  let arrowY = bezierPoint(y1, controlY, controlY, y2, t);
  let tangentX = bezierTangent(x1, midX, midX, x2, t);
  let tangentY = bezierTangent(y1, controlY, controlY, y2, t);
  let angle = atan2(tangentY, tangentX);

  drawArrowhead(arrowX, arrowY, angle, 8);

  // Draw label
  let labelT = 0.5;
  let labelX = bezierPoint(x1, midX, midX, x2, labelT);
  let labelY = bezierPoint(y1, controlY, controlY, y2, labelT);

  fill(255);
  stroke(0);
  strokeWeight(2);
  ellipse(labelX, labelY, 20);

  fill(34, 139, 34); // Forest Green for positive feedback
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text(label, labelX, labelY);

  pop();
}

function drawArrowhead(x, y, angle, size) {
  push();
  translate(x, y);
  rotate(angle);

  fill(128);
  noStroke();
  triangle(0, 0, -size, -size / 2, -size, size / 2);

  pop();
}

// draw the "R" or "B" symbol with a circular arrow in the center of each loop
function drawLoopSymbol(x, y, label, clockwise) {
  push();
  translate(x, y);

  // Draw circular background
  fill(220, 20, 60); // Crimson for reinforcing
  stroke(0);
  strokeWeight(1);
  ellipse(0, 0, 30);

  // Draw R or B
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  textStyle(BOLD);
  text(label, 0, 0);

  // Draw circular arrow
  stroke(0);
  strokeWeight(2);
  noFill();
  let startAngle = clockwise ? 0 : PI;
  let endAngle = clockwise ? TWO_PI * 0.8 : PI + TWO_PI * 0.8;
  arc(0, 0, 40, 40, startAngle, endAngle);

  // Draw arrow tip
  let tipAngle = clockwise ? TWO_PI * 0.8 : PI + TWO_PI * 0.8;
  let tipX = cos(tipAngle) * 20;
  let tipY = sin(tipAngle) * 20;
  let arrowDir = clockwise ? tipAngle + PI / 2 : tipAngle - PI / 2;
  drawArrowhead(tipX, tipY, arrowDir, 8);

  pop();
}

// The right panel contains the chart of population over time
function drawRightPanel() {
  push();
  // translate so that the origin (0,0) in in the upper left corner
  translate(leftPanelWidth, 0);

  // Panel background
  fill('aliceblue');
  noStroke();
  rect(0, 0, rightPanelWidth, chartHeight);
  
  // chart title
  textAlign(CENTER, CENTER);
  fill('black');
  text('Population Over Time', rightPanelWidth/2, margin)
  // Chart margins
  let chartMargin = 30;
  // leave room at the top for the title 
  let chartWidth = rightPanelWidth - chartMargin*2;
  let actualChartHeight = chartHeight - chartMargin*2;

  translate(margin, chartMargin);

  // Draw chart
  drawChart(20, 10, chartWidth, actualChartHeight-chartMargin);

  pop();
}

// draw only the lines and axis - no title
// The drawChart function has been updated to dynamically calculate axis labels based on the current maxTime and
//  maxPopulation values. The changes:
//  1. Time axis (x-axis): Now calculates timeValue = (i * maxTime) / 5 instead of using fixed i * 10
//  2. Population axis (y-axis): Now calculates popValue = (i * maxPopulation) / 5 instead of using fixed i * 100
//  This ensures that as the simulation runs and data values exceed the original bounds, the axis labels will
//  automatically update to show the correct scale ranges, making the chart readable at all times.


function drawChart(xOffset, yOffset, chartWidth, chartHeight) {
  push();
  translate(xOffset, yOffset);
  // Draw axes
  stroke(0);
  strokeWeight(2);
  line(0, chartHeight, chartWidth, chartHeight); // X-axis
  line(0, 0, 0, chartHeight); // Y-axis

  // Draw grid lines
  stroke(230);
  strokeWeight(1);
  for (let i = 0; i <= 10; i++) {
    let x = map(i, 0, 10, 0, chartWidth);
    line(x, 0, x, chartHeight);

    let y = map(i, 0, 10, chartHeight, 0);
    line(0, y, chartWidth, y);
  }

  // Draw labels
  fill(0);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text("Time", chartWidth / 2, chartHeight + 25);

  push();
  translate(-35, chartHeight / 2);
  rotate(-PI / 2);
  text("Population", 0, 0);
  pop();

  // Draw axis numbers
  textAlign(CENTER, TOP);
  textSize(10);
  for (let i = 0; i <= 5; i++) {
    let timeValue = (i * maxTime) / 5;
    let x = map(timeValue, 0, maxTime, 0, chartWidth);
    text(timeValue.toFixed(0), x, chartHeight + 5);
  }

  textAlign(RIGHT, CENTER);
  for (let i = 0; i <= 5; i++) {
    let popValue = (i * maxPopulation) / 5;
    let y = map(popValue, 0, maxPopulation, chartHeight, 0);
    text(popValue.toFixed(0), -5, y);
  }

  // Draw population curve
  if (populationHistory.length > 1) {
    stroke(30, 144, 255);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let i = 0; i < populationHistory.length; i++) {
      let x = map(populationHistory[i].time, 0, maxTime, 0, chartWidth);
      let y = map(populationHistory[i].pop, 0, maxPopulation, chartHeight, 0);
      vertex(x, y);
    }
    endShape();

    // Draw current point
    if (populationHistory.length > 0) {
      let lastPoint = populationHistory[populationHistory.length - 1];
      let currentX = map(lastPoint.time, 0, maxTime, 0, chartWidth);
      let currentY = map(lastPoint.pop, 0, maxPopulation, chartHeight, 0);

      fill(255, 0, 0);
      noStroke();
      ellipse(currentX, currentY, 8);
    }
  }
  pop();
}

// just update the text in the controls area
function drawControls() {
  // Control area background
  fill('white');
  stroke('silver');
  rect(0, chartHeight, canvasWidth, controlHeight);

  // Labels
  fill(0);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text(
    "Birth Rate: " + birthRateSlider.value().toFixed(3),
    170,
    drawHeight + 20
  );

  textAlign(CENTER, CENTER);
  text(
    `Population: ${population.toFixed(0)} | Time: ${time.toFixed(1)}`,
    canvasWidth *.75,
    drawHeight + margin - 5,
  );
}

function updateSimulation() {
  let birthRate = birthRateSlider.value();
  let deltaPopulation = population * birthRate * timeStep;
  population += deltaPopulation;
  time += timeStep;

  // Store history for chart
  populationHistory.push({ time: time, pop: population });

  // Adjust scale if population grows too large
  if (population > maxPopulation) {
    maxPopulation = population * 1.2;
  }

  // Reset if time gets too large
  if (time > maxTime) {
    maxTime = time * 1.2;
  }
}

function toggleSimulation() {
  isRunning = !isRunning;
  startStopButton.html(isRunning ? "Stop" : "Start");
}

function reset() {
  isRunning = false;
  startStopButton.html("Start");
  population = initialPopulation;
  time = 0;
  populationHistory = [];
  maxPopulation = 500;
  maxTime = 50;
}

function windowResized() {
  // Update canvas size
  let containerWidth = windowWidth;
  canvasWidth = containerWidth;
  leftPanelWidth = canvasWidth * 0.5;
  rightPanelWidth = canvasWidth * 0.5;

  resizeCanvas(canvasWidth, canvasHeight);

  // Make the slider size change with canvas width
  birthRateSlider.size(canvasWidth/2);
}
