// Loop Polarity Counter MicroSim
// CANVAS_HEIGHT: 545
// Chapter 3: Causal Loop Diagram Notation and Loop Identification
// Learning objective: classify a loop as reinforcing or balancing by counting
// its opposite-direction links (Bloom: Apply).
//
// The learner clicks each edge in turn. Every click reveals that link's
// polarity badge and a one-sentence justification, and increments the
// opposite-direction tally. Once all four edges are revealed, the center marker
// fills in with R or B -- the rule applied, not announced.

let containerWidth;
let canvasWidth = 700;
let drawHeight = 400;
let infoHeight = 100;
let controlHeight = 45;
let canvasHeight = drawHeight + infoHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

let newButton, resetButton;

const S_COLOR = '#2E7D32';       // same-direction link, positive
const O_COLOR = '#C62828';       // opposite-direction link, negative
const R_COLOR = '#C62828';       // reinforcing marker
const B_COLOR = '#2E7D32';       // balancing marker

// Three preloaded four-edge loops. `polarity` is 'S' for a same-direction link
// and 'O' for an opposite-direction one.
const SCENARIOS = [
  {
    name: 'Word-of-Mouth Growth',
    nodes: ['Advertising Spend', 'New Customers', 'Word of Mouth', 'Revenue'],
    edges: [
      { polarity: 'S', why: 'More advertising spend causes more new customers — same direction.' },
      { polarity: 'S', why: 'More new customers causes more word of mouth — same direction.' },
      { polarity: 'S', why: 'More word of mouth causes more revenue — same direction.' },
      { polarity: 'S', why: 'More revenue funds more advertising spend — same direction.' }
    ]
  },
  {
    name: 'Hiring to Close a Gap',
    nodes: ['Open Positions', 'Recruiting Effort', 'New Hires', 'Staffing Gap'],
    edges: [
      { polarity: 'S', why: 'More open positions causes more recruiting effort — same direction.' },
      { polarity: 'S', why: 'More recruiting effort causes more new hires — same direction.' },
      { polarity: 'O', why: 'More new hires causes a SMALLER staffing gap — opposite direction.' },
      { polarity: 'S', why: 'A smaller staffing gap means fewer open positions — same direction.' }
    ]
  },
  {
    name: 'Price and Demand',
    nodes: ['Inventory', 'Price', 'Customer Demand', 'Units Sold'],
    edges: [
      { polarity: 'O', why: 'More inventory causes a LOWER price — opposite direction.' },
      { polarity: 'O', why: 'A lower price causes HIGHER customer demand — opposite direction.' },
      { polarity: 'S', why: 'More customer demand causes more units sold — same direction.' },
      { polarity: 'O', why: 'More units sold causes LESS inventory — opposite direction.' }
    ]
  }
];

let scenarioIndex = 0;
let revealed = [false, false, false, false];
let lastWhy = '';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  newButton = createButton('New Scenario');
  newButton.position(10, drawHeight + infoHeight + 8);
  newButton.mousePressed(nextScenario);

  resetButton = createButton('Reset This Loop');
  resetButton.position(125, drawHeight + infoHeight + 8);
  resetButton.mousePressed(resetLoop);

  describe(
    'Four concepts arranged in a circle and joined by four curved arrows into ' +
    'one closed causal loop. Clicking an arrow reveals whether that link is ' +
    'same-direction or opposite-direction, with a one-sentence justification. ' +
    'A running tally counts the opposite-direction links, and once all four are ' +
    'revealed the marker at the center of the loop fills in with R for ' +
    'reinforcing or B for balancing.'
  );
}

function scenario() { return SCENARIOS[scenarioIndex]; }

function nextScenario() {
  scenarioIndex = (scenarioIndex + 1) % SCENARIOS.length;
  resetLoop();
}

function resetLoop() {
  revealed = [false, false, false, false];
  lastWhy = '';
}

function nodePos(i) {
  const cx = canvasWidth / 2;
  const cy = 216;
  const r = min(canvasWidth * 0.23, 148);
  const a = -HALF_PI + (TWO_PI * i) / 4;
  return { x: cx + r * cos(a), y: cy + r * sin(a) * 0.86 };
}

/** Midpoint of the curved arrow from node i to node i+1, used for hit-testing
 *  and for placing the polarity badge. */
function edgeBadgePos(i) {
  const a = nodePos(i);
  const b = nodePos((i + 1) % 4);
  const cx = canvasWidth / 2;
  const cy = 216;
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  // push the badge outward, away from the loop center
  const dx = mx - cx, dy = my - cy;
  const len = max(1, sqrt(dx * dx + dy * dy));
  return { x: mx + (dx / len) * 26, y: my + (dy / len) * 26 };
}

function revealedCount() {
  return revealed.filter(Boolean).length;
}

function negativeTally() {
  let n = 0;
  for (let i = 0; i < 4; i++) {
    if (revealed[i] && scenario().edges[i].polarity === 'O') { n++; }
  }
  return n;
}

function draw() {
  updateCanvasSize();

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
  text('Loop Polarity Counter', canvasWidth / 2, 8);
  fill('#495057');
  textSize(14);
  text('Scenario: ' + scenario().name, canvasWidth / 2, 34);

  drawEdges();
  drawNodes();
  drawCenterMarker();
  drawTally();
  drawInfo();
}

function drawEdges() {
  for (let i = 0; i < 4; i++) {
    const a = nodePos(i);
    const b = nodePos((i + 1) % 4);
    const isRevealed = revealed[i];
    const pol = scenario().edges[i].polarity;

    stroke(isRevealed ? (pol === 'S' ? S_COLOR : O_COLOR) : '#8A97A5');
    strokeWeight(isRevealed ? 3 : 2.5);
    noFill();

    // bow the edge outward from the loop center
    const cx = canvasWidth / 2, cy = 216;
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    const dx = mx - cx, dy = my - cy;
    const len = max(1, sqrt(dx * dx + dy * dy));
    const ctrl = { x: mx + (dx / len) * 34, y: my + (dy / len) * 34 };

    beginShape();
    vertex(a.x, a.y);
    quadraticVertex(ctrl.x, ctrl.y, b.x, b.y);
    endShape();

    drawArrowHead(ctrl, b, isRevealed ? (pol === 'S' ? S_COLOR : O_COLOR) : '#8A97A5');

    const bp = edgeBadgePos(i);
    if (isRevealed) {
      noStroke();
      fill(pol === 'S' ? S_COLOR : O_COLOR);
      circle(bp.x, bp.y, 30);
      fill('white');
      textAlign(CENTER, CENTER);
      textSize(15);
      text(pol === 'S' ? 'S +' : 'O −', bp.x, bp.y);
    } else {
      stroke('#8A97A5');
      strokeWeight(2);
      fill('white');
      circle(bp.x, bp.y, 30);
      noStroke();
      fill('#6c757d');
      textAlign(CENTER, CENTER);
      textSize(13);
      text('?', bp.x, bp.y);
    }
  }
}

function drawArrowHead(from, to, col) {
  const ang = atan2(to.y - from.y, to.x - from.x);
  push();
  translate(to.x - cos(ang) * 46, to.y - sin(ang) * 30);
  rotate(ang);
  noStroke();
  fill(col);
  triangle(0, 0, -11, -5.5, -11, 5.5);
  pop();
}

function drawNodes() {
  for (let i = 0; i < 4; i++) {
    const p = nodePos(i);
    stroke('#2E5A87');
    strokeWeight(2);
    fill('#D6E3F0');
    rectMode(CENTER);
    rect(p.x, p.y, 150, 44, 8);
    rectMode(CORNER);

    noStroke();
    fill('black');
    textAlign(CENTER, CENTER);
    textSize(13);
    // text() with a box treats x,y as the box's top-left corner, so pass
    // the corner rather than the node center.
    text(scenario().nodes[i], p.x - 71, p.y - 20, 142, 40);
  }
}

function drawCenterMarker() {
  const cx = canvasWidth / 2;
  const cy = 216;
  const done = revealedCount() === 4;
  const neg = negativeTally();
  const reinforcing = neg % 2 === 0;

  stroke(done ? (reinforcing ? R_COLOR : B_COLOR) : '#adb5bd');
  strokeWeight(3);
  fill(done ? (reinforcing ? '#F7D6D6' : '#D3EDD9') : '#E9ECEF');
  circle(cx, cy, 62);

  noStroke();
  if (done) {
    fill(reinforcing ? R_COLOR : B_COLOR);
    textAlign(CENTER, CENTER);
    textSize(30);
    text(reinforcing ? 'R' : 'B', cx, cy);
  } else {
    fill('#adb5bd');
    textAlign(CENTER, CENTER);
    textSize(13);
    text((4 - revealedCount()) + ' left', cx, cy);
  }
}

function drawTally() {
  noStroke();
  textAlign(LEFT, TOP);
  fill('black');
  textSize(15);
  text('Opposite-direction links found: ' + negativeTally(), margin, 64);
  fill('#6c757d');
  textSize(12);
  text('Links revealed: ' + revealedCount() + ' of 4', margin, 86);
}

function drawInfo() {
  noStroke();
  textAlign(LEFT, TOP);

  if (lastWhy) {
    fill('black');
    textSize(14);
    text(lastWhy, margin, drawHeight + 10, canvasWidth - margin * 2, 40);
  } else {
    fill('#868e96');
    textSize(14);
    text('Click each "?" badge to reveal that link’s polarity.',
         margin, drawHeight + 10, canvasWidth - margin * 2, 24);
  }

  if (revealedCount() === 4) {
    const neg = negativeTally();
    const reinforcing = neg % 2 === 0;
    fill(reinforcing ? R_COLOR : B_COLOR);
    textSize(14);
    text((reinforcing ? 'REINFORCING (R): ' : 'BALANCING (B): ') +
         neg + ' opposite-direction link' + (neg === 1 ? '' : 's') + ' is an ' +
         (reinforcing ? 'EVEN' : 'ODD') + ' number, so a change fed around the ' +
         'loop comes back ' + (reinforcing ? 'amplified' : 'reversed') + '.',
         margin, drawHeight + 54, canvasWidth - margin * 2, 44);
  } else {
    fill('#6c757d');
    textSize(13);
    text('The rule: count the opposite-direction links. An EVEN count (including ' +
         'zero) makes the loop reinforcing; an ODD count makes it balancing.',
         margin, drawHeight + 54, canvasWidth - margin * 2, 44);
  }
}

function mousePressed() {
  if (mouseY > drawHeight) { return; }
  for (let i = 0; i < 4; i++) {
    const bp = edgeBadgePos(i);
    if (dist(mouseX, mouseY, bp.x, bp.y) < 20) {
      if (!revealed[i]) {
        revealed[i] = true;
        lastWhy = scenario().edges[i].why;
      } else {
        lastWhy = scenario().edges[i].why;
      }
      return;
    }
  }
}

// These two functions must be present for width-responsive MicroSims.
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
