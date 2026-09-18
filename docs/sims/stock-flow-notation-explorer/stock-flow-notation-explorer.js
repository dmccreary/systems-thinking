// Stock and Flow Notation Explorer MicroSim
// CANVAS_HEIGHT: 510
// Chapter 4: Feedback, Delay, and Loop Dynamics
// Learning objective: given a simple causal loop diagram, identify the
// corresponding stock, inflow and outflow in an equivalent stock-and-flow
// diagram (Bloom: Understand).
//
// The left half draws the bathtub-style stock-and-flow notation; the right half
// draws Chapter 3's causal loop diagram for the same bank account. Clicking a
// part of one highlights its counterpart in the other.

let containerWidth;
let canvasWidth = 700;
let drawHeight = 370;
let infoHeight = 95;
let controlHeight = 45;
let canvasHeight = drawHeight + infoHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

let resetButton;
let selected = null;       // 'stock' | 'inflow' | 'outflow' | null

const STOCK_COLOR = '#2E5A87';    // the book's neutral node blue
const IN_COLOR = '#2E7D32';       // positive-link green
const OUT_COLOR = '#B8860B';      // muted amber: an outflow is neither + nor -
const DIM = '#C8CDD3';

const MESSAGES = {
  stock: 'This rectangle is a stock — an accumulating quantity, the same role ' +
         'Chapter 3’s "Bank Balance" node played.',
  inflow: 'This pipe is an inflow — it adds to the stock, playing the same role ' +
          'as the CLD’s positive edge into Bank Balance.',
  outflow: 'This pipe is an outflow — a flow this simple CLD never showed, ' +
           'because CLDs don’t distinguish rate of change from accumulated amount.'
};

// Hit zones are recomputed every frame from the current canvas width.
let zones = {};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  resetButton = createButton('Reset');
  resetButton.position(10, drawHeight + infoHeight + 8);
  resetButton.mousePressed(() => { selected = null; });

  describe(
    'A bathtub-style stock and flow diagram of a bank balance on the left, with ' +
    'an inflow pipe labeled Interest Earned and an outflow pipe labeled ' +
    'Withdrawals, beside the equivalent causal loop diagram from Chapter 3 on ' +
    'the right. Clicking the tub or either pipe highlights the matching element ' +
    'in both diagrams and explains the correspondence.'
  );
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
  text('Stock and Flow Notation Explorer', canvasWidth / 2, 8);

  const splitX = canvasWidth * 0.60;
  drawStockAndFlow(splitX);
  drawCLD(splitX);

  stroke('#ced4da');
  strokeWeight(1);
  line(splitX, 46, splitX, drawHeight - 10);

  drawInfo();
}

function colorFor(part, base) {
  if (selected === null) { return base; }
  return selected === part ? base : DIM;
}

function drawStockAndFlow(splitX) {
  const tubW = min(splitX * 0.42, 170);
  const tubH = 118;
  const tubX = splitX * 0.5 - tubW / 2;
  const tubY = 150;

  zones.stock = { x: tubX, y: tubY, w: tubW, h: tubH };

  noStroke();
  fill('#495057');
  textAlign(CENTER, TOP);
  textSize(15);
  text('Stock-and-Flow Notation', splitX / 2, 46);

  // ---- inflow: cloud, pipe, valve ----
  const inX = tubX + tubW * 0.26;
  const cloudY = 82;
  drawCloud(inX, cloudY, colorFor('inflow', IN_COLOR));
  stroke(colorFor('inflow', IN_COLOR));
  strokeWeight(10);
  line(inX, cloudY + 16, inX, tubY);
  drawValve(inX, (cloudY + 16 + tubY) / 2, colorFor('inflow', IN_COLOR));
  noStroke();
  fill(colorFor('inflow', IN_COLOR));
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Interest Earned', inX + 20, (cloudY + 16 + tubY) / 2);
  zones.inflow = { x: inX - 22, y: cloudY, w: 66, h: tubY - cloudY };

  // ---- the tub: the stock ----
  noStroke();
  fill(selected === 'stock' || selected === null ? '#BBD7EF' : '#E7EAED');
  rect(tubX + 4, tubY + tubH * 0.6, tubW - 8, tubH * 0.4 - 4);

  noFill();
  stroke(colorFor('stock', STOCK_COLOR));
  strokeWeight(selected === 'stock' ? 5 : 3.5);
  rect(tubX, tubY, tubW, tubH, 4);

  noStroke();
  fill(colorFor('stock', 'black'));
  textAlign(CENTER, TOP);
  textSize(15);
  text('Bank Balance', tubX + tubW / 2, tubY + 14);
  fill(colorFor('stock', '#6c757d'));
  textSize(12);
  text('(the stock)', tubX + tubW / 2, tubY + 36);

  // ---- outflow: pipe, valve, cloud ----
  const outX = tubX + tubW * 0.74;
  const outEndY = tubY + tubH + 62;
  stroke(colorFor('outflow', OUT_COLOR));
  strokeWeight(10);
  line(outX, tubY + tubH, outX, outEndY - 16);
  drawValve(outX, tubY + tubH + 26, colorFor('outflow', OUT_COLOR));
  drawCloud(outX, outEndY, colorFor('outflow', OUT_COLOR));
  noStroke();
  fill(colorFor('outflow', OUT_COLOR));
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Withdrawals', outX + 20, tubY + tubH + 26);
  zones.outflow = { x: outX - 22, y: tubY + tubH, w: 66, h: 90 };
}

function drawValve(x, y, col) {
  noStroke();
  fill('white');
  circle(x, y, 22);
  stroke(col);
  strokeWeight(2.5);
  noFill();
  circle(x, y, 22);
  line(x - 8, y - 8, x + 8, y + 8);
  line(x - 8, y + 8, x + 8, y - 8);
}

function drawCloud(x, y, col) {
  // A plain silhouette. Outlining three overlapping circles leaves the
  // interior arcs showing, which reads as a doubled shape.
  noStroke();
  const c = color(col);
  c.setAlpha(80);
  fill(c);
  circle(x - 15, y + 3, 24);
  circle(x, y - 6, 30);
  circle(x + 16, y + 3, 25);
  circle(x, y + 6, 26);
}

function drawCLD(splitX) {
  const cx = splitX + (canvasWidth - splitX) / 2;

  noStroke();
  fill('#495057');
  textAlign(CENTER, TOP);
  textSize(15);
  text('Chapter 3 Causal Loop Diagram', cx, 46);

  const boxW = min(canvasWidth - splitX - margin * 2, 180);
  const interestY = 140;
  const balanceY = 268;

  // Interest Earned node <- matches the inflow
  stroke(colorFor('inflow', IN_COLOR));
  strokeWeight(selected === 'inflow' ? 4 : 2);
  fill(selected === 'inflow' || selected === null ? '#D3EDD9' : '#EFF1F3');
  rectMode(CENTER);
  rect(cx, interestY, boxW, 46, 8);

  // Bank Balance node <- matches the stock
  stroke(colorFor('stock', STOCK_COLOR));
  strokeWeight(selected === 'stock' ? 4 : 2);
  fill(selected === 'stock' || selected === null ? '#D6E3F0' : '#EFF1F3');
  rect(cx, balanceY, boxW, 46, 8);
  rectMode(CORNER);

  noStroke();
  fill(colorFor('inflow', 'black'));
  textAlign(CENTER, CENTER);
  textSize(14);
  text('Interest Earned', cx, interestY);
  fill(colorFor('stock', 'black'));
  text('Bank Balance', cx, balanceY);

  // The two causal edges, each labeled + and arrowheaded so the direction of
  // causation is visible rather than implied.
  stroke(colorFor('inflow', IN_COLOR));
  strokeWeight(selected === 'inflow' ? 3 : 2);
  line(cx - boxW * 0.22, interestY + 23, cx - boxW * 0.22, balanceY - 23);
  cldArrow(cx - boxW * 0.22, balanceY - 23, 1, colorFor('inflow', IN_COLOR));

  stroke(colorFor('stock', STOCK_COLOR));
  strokeWeight(selected === 'stock' ? 3 : 2);
  line(cx + boxW * 0.22, balanceY - 23, cx + boxW * 0.22, interestY + 23);
  cldArrow(cx + boxW * 0.22, interestY + 23, -1, colorFor('stock', STOCK_COLOR));

  noStroke();
  fill(colorFor('inflow', IN_COLOR));
  textAlign(CENTER, CENTER);
  textSize(16);
  text('+', cx - boxW * 0.22 - 12, (interestY + balanceY) / 2);
  fill(colorFor('stock', STOCK_COLOR));
  text('+', cx + boxW * 0.22 + 12, (interestY + balanceY) / 2);

  // the missing piece
  noStroke();
  fill(selected === 'outflow' ? OUT_COLOR : '#adb5bd');
  textAlign(CENTER, TOP);
  textSize(12);
  text(selected === 'outflow'
        ? 'Withdrawals have no counterpart here — the CLD never showed them.'
        : 'Notice what is missing on this side.',
       // text() with a width measures from x as the box's LEFT edge, so
       // pass the corner rather than the centre or it overflows the canvas.
       cx - (canvasWidth - splitX - 24) / 2, balanceY + 40,
       canvasWidth - splitX - 24, 50);
}

/** A small vertical arrowhead on a causal loop diagram edge. dir 1 = pointing down. */
function cldArrow(x, y, dir, col) {
  noStroke();
  fill(col);
  triangle(x, y, x - 5, y - 9 * dir, x + 5, y - 9 * dir);
}

function drawInfo() {
  noStroke();
  textAlign(LEFT, TOP);
  if (selected) {
    fill('black');
    textSize(14);
    text(MESSAGES[selected], margin, drawHeight + 12, canvasWidth - margin * 2, 46);
    fill('#6c757d');
    textSize(12);
    text('A causal loop diagram tells you which way things push each other. A ' +
         'stock-and-flow diagram adds what a CLD leaves out: what accumulates, ' +
         'and at what rate.',
         margin, drawHeight + 58, canvasWidth - margin * 2, 34);
  } else {
    fill('#868e96');
    textSize(14);
    text('Click the tub, the inflow pipe, or the outflow pipe. Each click ' +
         'highlights the matching element in both diagrams.',
         margin, drawHeight + 12, canvasWidth - margin * 2, 46);
  }
}

function inZone(z) {
  return z && mouseX > z.x && mouseX < z.x + z.w && mouseY > z.y && mouseY < z.y + z.h;
}

function mousePressed() {
  if (mouseY > drawHeight) { return; }
  if (inZone(zones.stock)) { selected = 'stock'; return; }
  if (inZone(zones.inflow)) { selected = 'inflow'; return; }
  if (inZone(zones.outflow)) { selected = 'outflow'; return; }
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
