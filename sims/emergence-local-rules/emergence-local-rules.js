// Emergence From Local Rules MicroSim
// CANVAS_HEIGHT: 618
// Chapter 14: Leverage Points -- Rules, Paradigms, and Emergence
// Learning objective: predict the emergent global pattern a set of local
// interaction rules will produce, then compare that prediction against the
// running simulation (Bloom: Analyze).
//
// Every agent uses only its neighbors inside a small radius. No agent has any
// information about the flock as a whole -- the global pattern in the infobox
// is computed by the observer, never by the agents.

let containerWidth;
let canvasWidth = 700;
let drawHeight = 420;
let infoHeight = 62;
let controlHeight = 136;
let canvasHeight = drawHeight + infoHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;
let sliderLeftMargin = 150;

let sepSlider, aliSlider, cohSlider;
let scatterButton, pauseButton, radiusCheckbox;

let boids = [];
const BOID_COUNT = 100;
const NEIGHBOR_RADIUS = 56;
const MAX_SPEED = 2.4;
const MAX_FORCE = 0.05;

let isRunning = false;     // every MicroSim starts paused
let patternText = 'Press "Start" and watch what the group does that no single agent decided.';
let lastPatternUpdate = 0;

const BOID_COLOR = '#4A6E96';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  sepSlider = createSlider(0, 100, 50, 1);
  sepSlider.position(sliderLeftMargin, drawHeight + infoHeight + 8);

  aliSlider = createSlider(0, 100, 50, 1);
  aliSlider.position(sliderLeftMargin, drawHeight + infoHeight + 40);

  cohSlider = createSlider(0, 100, 50, 1);
  cohSlider.position(sliderLeftMargin, drawHeight + infoHeight + 72);

  pauseButton = createButton('Start');
  pauseButton.position(10, drawHeight + infoHeight + 102);
  pauseButton.mousePressed(togglePause);

  scatterButton = createButton('Scatter Agents');
  scatterButton.position(70, drawHeight + infoHeight + 102);
  scatterButton.mousePressed(scatterAgents);

  radiusCheckbox = createCheckbox(' Show One Agent’s Local Radius', false);
  radiusCheckbox.position(190, drawHeight + infoHeight + 104);

  sizeSliders();
  scatterAgents();

  describe(
    'About a hundred small triangular agents move across the canvas, each ' +
    'steering only by the positions and headings of other agents inside a small ' +
    'local radius. Sliders set the relative weight of separation, alignment and ' +
    'cohesion. A text panel describes the flock-level pattern that results, ' +
    'which no individual agent computes or knows about.'
  );
}

function sizeSliders() {
  const w = Math.max(100, canvasWidth - sliderLeftMargin - margin);
  sepSlider.size(w);
  aliSlider.size(w);
  cohSlider.size(w);
}

function togglePause() {
  isRunning = !isRunning;
  pauseButton.html(isRunning ? 'Pause' : 'Start');
}

function scatterAgents() {
  boids = [];
  for (let i = 0; i < BOID_COUNT; i++) {
    const a = random(TWO_PI);
    boids.push({
      x: random(margin, canvasWidth - margin),
      y: random(margin, drawHeight - margin),
      vx: cos(a) * MAX_SPEED,
      vy: sin(a) * MAX_SPEED
    });
  }
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

  if (isRunning) {
    updateBoids();
    if (millis() - lastPatternUpdate > 2200) {
      patternText = describePattern();
      lastPatternUpdate = millis();
    }
  }

  if (radiusCheckbox.checked() && boids.length) {
    noFill();
    stroke('#B8611A');
    strokeWeight(1.5);
    drawingContext.setLineDash([5, 5]);
    circle(boids[0].x, boids[0].y, NEIGHBOR_RADIUS * 2);
    drawingContext.setLineDash([]);
    noStroke();
    fill('#B8611A');
    textAlign(CENTER, BOTTOM);
    textSize(11);
    text('this agent sees only inside this circle',
         boids[0].x, boids[0].y - NEIGHBOR_RADIUS - 4);
  }

  drawBoids();

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(20);
  text('Emergence From Local Rules', canvasWidth / 2, 8);

  drawInfo();
  drawControlLabels();
}

/** Craig Reynolds' three rules, each using only local neighbors. */
function updateBoids() {
  const sepW = sepSlider.value() / 50;
  const aliW = aliSlider.value() / 50;
  const cohW = cohSlider.value() / 50;

  for (const b of boids) {
    let sepX = 0, sepY = 0, sepN = 0;
    let aliX = 0, aliY = 0, aliN = 0;
    let cohX = 0, cohY = 0, cohN = 0;

    for (const o of boids) {
      if (o === b) { continue; }
      const dx = o.x - b.x, dy = o.y - b.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d > NEIGHBOR_RADIUS || d === 0) { continue; }

      // separation: steer away from neighbors that are too close
      if (d < NEIGHBOR_RADIUS * 0.45) {
        sepX -= dx / d; sepY -= dy / d; sepN++;
      }
      // alignment: steer toward the average heading of neighbors
      aliX += o.vx; aliY += o.vy; aliN++;
      // cohesion: steer toward the average position of neighbors
      cohX += o.x; cohY += o.y; cohN++;
    }

    let ax = 0, ay = 0;
    if (sepN) { const s = steer(sepX / sepN, sepY / sepN, b); ax += s.x * sepW * 1.6; ay += s.y * sepW * 1.6; }
    if (aliN) { const s = steer(aliX / aliN, aliY / aliN, b); ax += s.x * aliW; ay += s.y * aliW; }
    if (cohN) { const s = steer(cohX / cohN - b.x, cohY / cohN - b.y, b); ax += s.x * cohW; ay += s.y * cohW; }

    b.vx += ax;
    b.vy += ay;

    const sp = Math.sqrt(b.vx * b.vx + b.vy * b.vy) || 1;
    b.vx = (b.vx / sp) * MAX_SPEED;
    b.vy = (b.vy / sp) * MAX_SPEED;

    b.x += b.vx;
    b.y += b.vy;

    // wrap at the edges of the drawing region
    if (b.x < 0) { b.x += canvasWidth; }
    if (b.x > canvasWidth) { b.x -= canvasWidth; }
    if (b.y < 0) { b.y += drawHeight; }
    if (b.y > drawHeight) { b.y -= drawHeight; }
  }
}

/** Reynolds-style steering: desired direction at full speed, minus current
 *  velocity, clamped to a maximum force. */
function steer(dx, dy, b) {
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  let sx = (dx / len) * MAX_SPEED - b.vx;
  let sy = (dy / len) * MAX_SPEED - b.vy;
  const sl = Math.sqrt(sx * sx + sy * sy) || 1;
  if (sl > MAX_FORCE) { sx = (sx / sl) * MAX_FORCE; sy = (sy / sl) * MAX_FORCE; }
  return { x: sx, y: sy };
}

function drawBoids() {
  noStroke();
  fill(BOID_COLOR);
  for (const b of boids) {
    push();
    translate(b.x, b.y);
    rotate(atan2(b.vy, b.vx));
    triangle(7, 0, -5, 3.6, -5, -3.6);
    pop();
  }
}

/**
 * The observer's description of the flock-level pattern. Note that this
 * calculation uses global information -- average heading agreement and spatial
 * spread across all agents -- which is exactly the information no individual
 * agent has access to.
 */
function describePattern() {
  if (!boids.length) { return ''; }

  // heading agreement: length of the mean unit velocity vector, 0..1
  let mx = 0, my = 0;
  for (const b of boids) {
    const sp = Math.sqrt(b.vx * b.vx + b.vy * b.vy) || 1;
    mx += b.vx / sp; my += b.vy / sp;
  }
  const alignment = Math.sqrt(mx * mx + my * my) / boids.length;

  // spatial spread: mean distance from the flock's centroid, as a fraction of
  // the canvas diagonal
  let cx = 0, cy = 0;
  for (const b of boids) { cx += b.x; cy += b.y; }
  cx /= boids.length; cy /= boids.length;
  let spread = 0;
  for (const b of boids) { spread += dist(b.x, b.y, cx, cy); }
  spread = spread / boids.length / Math.sqrt(canvasWidth * canvasWidth + drawHeight * drawHeight);

  if (alignment > 0.8 && spread < 0.16) {
    return 'The flock is moving as one tight, aligned group — yet no agent ' +
           'was ever told where the group is going.';
  }
  if (alignment > 0.8) {
    return 'The agents are all heading the same way but spread thin across the ' +
           'canvas — alignment without cohesion.';
  }
  if (spread < 0.14) {
    return 'The agents have bunched into one dense cluster with no shared ' +
           'heading — cohesion without alignment.';
  }
  if (alignment > 0.45) {
    return 'The flock has split into two or three loosely connected clusters, ' +
           'each with its own heading.';
  }
  return 'The agents are milling with no group-level pattern — the local ' +
         'rules are too weak to produce anything global.';
}

function drawInfo() {
  noStroke();
  fill('#1a3a6c');
  textAlign(LEFT, TOP);
  textSize(12);
  text('What the observer sees (no agent computes this):', margin, drawHeight + 8);
  fill('black');
  textSize(13);
  text(patternText, margin, drawHeight + 26, canvasWidth - margin * 2, 34);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(14);
  const base = drawHeight + infoHeight;
  text('Separation: ' + sepSlider.value(), 12, base + 17);
  text('Alignment: ' + aliSlider.value(), 12, base + 49);
  text('Cohesion: ' + cohSlider.value(), 12, base + 81);
}

// These two functions must be present for width-responsive MicroSims.
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  sizeSliders();
  radiusCheckbox.position(190, drawHeight + infoHeight + 104);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
