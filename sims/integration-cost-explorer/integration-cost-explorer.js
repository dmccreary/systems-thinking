// Point-to-Point vs. Hub Integration Cost MicroSim
// CANVAS_HEIGHT: 505
// Chapter 18: Data Management and Governance
// Learning objective: calculate the number of connections required under a
// point-to-point architecture versus a hub architecture, and explain why the
// hub scales better (Bloom: Apply).
//
// Two panels draw the same N systems. On the left every system connects to
// every other system; on the right every system connects only to a hub. The
// live counts are C(N,2) and N.

let containerWidth;
let canvasWidth = 700;
let drawHeight = 400;
let infoHeight = 60;
let controlHeight = 45;
let canvasHeight = drawHeight + infoHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;
let sliderLeftMargin = 230;

let nSlider;
let nodeCount = 6;

const P2P_COLOR = '#C62828';
const HUB_COLOR = '#2E7D32';
const NODE_FILL = '#D6E3F0';
const NODE_STROKE = '#2E5A87';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  nSlider = createSlider(3, 20, nodeCount, 1);
  nSlider.position(sliderLeftMargin, drawHeight + infoHeight + 10);
  nSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe(
    'Two side-by-side diagrams of the same set of systems. On the left every ' +
    'system is wired directly to every other system; on the right each system ' +
    'connects only to a central hub. A slider changes how many systems there ' +
    'are, and live counts show point-to-point connections growing as N(N-1)/2 ' +
    'while hub connections grow as N.'
  );
}

function draw() {
  updateCanvasSize();
  nodeCount = nSlider.value();

  // drawing region
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // info band
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, infoHeight);

  // control region
  fill('white');
  stroke('silver');
  rect(0, drawHeight + infoHeight, canvasWidth, controlHeight);

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(20);
  text('Point-to-Point vs. Hub Integration Cost', canvasWidth / 2, 8);

  const panelW = canvasWidth / 2;
  const cy = 218;
  const radius = min(panelW * 0.30, 118);

  drawPointToPoint(panelW * 0.5, cy, radius);
  drawHub(panelW * 1.5, cy, radius);

  // divider between the two panels
  stroke('#ced4da');
  strokeWeight(1);
  line(panelW, 44, panelW, drawHeight - 8);

  drawCounts(panelW);
  drawSliderLabel();
}

/** Positions of N systems evenly spaced around a circle. */
function ringPositions(cx, cy, radius) {
  const pts = [];
  for (let i = 0; i < nodeCount; i++) {
    const a = -HALF_PI + (TWO_PI * i) / nodeCount;
    pts.push({ x: cx + radius * cos(a), y: cy + radius * sin(a) });
  }
  return pts;
}

function drawPointToPoint(cx, cy, radius) {
  noStroke();
  fill(P2P_COLOR);
  textAlign(CENTER, TOP);
  textSize(16);
  text('Point-to-Point', cx, 52);

  const pts = ringPositions(cx, cy, radius);

  // every pair connected
  stroke(P2P_COLOR);
  strokeWeight(1);
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      line(pts[i].x, pts[i].y, pts[j].x, pts[j].y);
    }
  }
  drawSystems(pts);
}

function drawHub(cx, cy, radius) {
  noStroke();
  fill(HUB_COLOR);
  textAlign(CENTER, TOP);
  textSize(16);
  text('Hub', cx, 52);

  const pts = ringPositions(cx, cy, radius);

  stroke(HUB_COLOR);
  strokeWeight(1.5);
  for (const p of pts) {
    line(cx, cy, p.x, p.y);
  }
  drawSystems(pts);

  // the hub itself
  stroke(HUB_COLOR);
  strokeWeight(2);
  fill('#D3EDD9');
  circle(cx, cy, 44);
  noStroke();
  fill(HUB_COLOR);
  textAlign(CENTER, CENTER);
  textSize(12);
  text('HUB', cx, cy);
}

function drawSystems(pts) {
  for (const p of pts) {
    stroke(NODE_STROKE);
    strokeWeight(1.5);
    fill(NODE_FILL);
    circle(p.x, p.y, 20);
  }
}

function drawCounts(panelW) {
  const p2p = (nodeCount * (nodeCount - 1)) / 2;
  const hub = nodeCount;

  noStroke();
  textAlign(CENTER, TOP);

  fill(P2P_COLOR);
  textSize(17);
  text(p2p + ' connections', panelW * 0.5, drawHeight + 8);
  fill('#495057');
  textSize(13);
  text('N(N−1)/2 = ' + nodeCount + '×' + (nodeCount - 1) + '/2',
       panelW * 0.5, drawHeight + 32);

  fill(HUB_COLOR);
  textSize(17);
  text(hub + ' connections', panelW * 1.5, drawHeight + 8);
  fill('#495057');
  textSize(13);
  text('N = ' + nodeCount + '  (' + (p2p - hub) + ' fewer than point-to-point)',
       panelW * 1.5, drawHeight + 32);
}

function drawSliderLabel() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Number of Systems (N): ' + nodeCount, 12,
       drawHeight + infoHeight + controlHeight / 2);
}

// These two functions must be present for width-responsive MicroSims.
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  nSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
