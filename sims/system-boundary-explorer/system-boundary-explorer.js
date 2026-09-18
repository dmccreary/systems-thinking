// System Boundary Explorer MicroSim
// CANVAS_HEIGHT: 545
// Chapter 1: Foundations of Systems Thinking
// Learning objective: illustrate how moving a system boundary changes what
// counts as an input, an output, or part of the environment (Bloom: Understand).
//
// The learner drags and resizes a dashed boundary circle over a household
// heating scene. Whatever falls inside the circle is "the system"; everything
// else is "the environment", and every connection that crosses the circle is
// relabeled live as an input or an output.

// ---- canvas geometry ----
let containerWidth;
let canvasWidth = 700;
let sceneHeight = 360;         // the drawn household scene
let infoHeight = 100;          // the live inside/environment readout
let drawHeight = sceneHeight + infoHeight;
let controlHeight = 85;        // two rows of buttons
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// ---- colors (named, per this book's MicroSim conventions) ----
const INSIDE_COLOR = '#E8A33D';      // warm amber: currently inside the boundary
const OUTSIDE_COLOR = '#5B7FA6';     // cool slate-blue: currently in the environment
const BOUNDARY_COLOR = '#1a3a6c';

// ---- scene state ----
let elements = [];
let connections = [];
let boundary = { x: 0, y: 0, r: 0 };
let targetBoundary = null;     // set by the preset buttons, animated with lerp()
let dragMode = null;           // 'move' | 'resize' | null
let selectedId = null;         // element whose definition is showing

// ---- controls ----
let presetSmallButton, presetHouseButton, resetButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  presetSmallButton = createButton('Boundary = Thermostat + Furnace');
  presetSmallButton.position(10, drawHeight + 8);
  presetSmallButton.mousePressed(() => setPreset('small'));

  presetHouseButton = createButton('Boundary = Whole House');
  presetHouseButton.position(10, drawHeight + 46);
  presetHouseButton.mousePressed(() => setPreset('house'));

  resetButton = createButton('Reset');
  resetButton.position(270, drawHeight + 46);
  resetButton.mousePressed(() => setPreset('reset'));

  buildScene();
  boundary = defaultBoundary();

  describe(
    'A household heating scene with a thermostat, furnace, house and outdoor ' +
    'thermometer. A draggable, resizable dashed circle marks the system boundary; ' +
    'elements inside it are part of the system and elements outside it are the ' +
    'environment, and every connection crossing the circle is labeled input or output.'
  );
}

// Positions are recomputed from the current canvas width so the scene rescales.
function buildScene() {
  const w = canvasWidth;
  elements = [
    {
      id: 'thermostat', label: 'Thermostat',
      x: w * 0.30, y: sceneHeight * 0.30, w: 78, h: 58,
      info: 'The thermostat is the system element that compares the measured ' +
            'temperature against the goal and decides when to call for heat.'
    },
    {
      id: 'furnace', label: 'Furnace',
      x: w * 0.30, y: sceneHeight * 0.72, w: 86, h: 66,
      info: 'The furnace is the element that converts fuel into heat when the ' +
            'thermostat tells it to run.'
    },
    {
      id: 'house', label: 'House',
      x: w * 0.60, y: sceneHeight * 0.52, w: 118, h: 100,
      info: 'The house is the space being heated. Whether it is part of the ' +
            'system or part of the environment depends entirely on where you ' +
            'draw the boundary.'
    },
    {
      id: 'outdoor', label: 'Outdoor Temp',
      x: w * 0.88, y: sceneHeight * 0.34, w: 92, h: 58,
      info: 'This is part of the environment whenever the boundary excludes it ' +
            'the system responds to it but does not control it.'
    }
  ];

  connections = [
    { from: 'outdoor', to: 'house', label: 'heat loss' },
    { from: 'house', to: 'thermostat', label: 'room temperature' },
    { from: 'thermostat', to: 'furnace', label: 'on/off signal' },
    { from: 'furnace', to: 'house', label: 'heat' }
  ];
}

function defaultBoundary() {
  return { x: canvasWidth * 0.28, y: sceneHeight * 0.54, r: min(canvasWidth * 0.145, 112) };
}

function setPreset(which) {
  selectedId = null;
  if (which === 'small') {
    targetBoundary = { x: canvasWidth * 0.28, y: sceneHeight * 0.54, r: min(canvasWidth * 0.145, 112) };
  } else if (which === 'house') {
    targetBoundary = { x: canvasWidth * 0.43, y: sceneHeight * 0.54, r: min(canvasWidth * 0.26, 155) };
  } else {
    targetBoundary = defaultBoundary();
  }
}

function draw() {
  updateCanvasSize();

  // Animate toward a preset, if one was requested.
  if (targetBoundary) {
    boundary.x = lerp(boundary.x, targetBoundary.x, 0.18);
    boundary.y = lerp(boundary.y, targetBoundary.y, 0.18);
    boundary.r = lerp(boundary.r, targetBoundary.r, 0.18);
    if (abs(boundary.r - targetBoundary.r) < 0.5 &&
        abs(boundary.x - targetBoundary.x) < 0.5) {
      boundary = { x: targetBoundary.x, y: targetBoundary.y, r: targetBoundary.r };
      targetBoundary = null;
    }
  }

  // drawing region background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, sceneHeight);

  // info band
  fill('white');
  stroke('silver');
  rect(0, sceneHeight, canvasWidth, infoHeight);

  // controls region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(20);
  text('System Boundary Explorer', canvasWidth / 2, 8);

  drawConnections();
  drawBoundary();
  drawElements();
  // Tags and the resize handle paint last: either can land on top of an
  // element box, and underneath it they simply disappeared.
  drawCrossingTags();
  drawBoundaryHandle();
  drawInfoBand();
  drawControlLabels();
}

function isInside(el) {
  return dist(el.x, el.y, boundary.x, boundary.y) < boundary.r;
}

function drawBoundary() {
  push();
  noFill();
  stroke(BOUNDARY_COLOR);
  strokeWeight(2);
  drawingContext.setLineDash([9, 7]);
  circle(boundary.x, boundary.y, boundary.r * 2);
  drawingContext.setLineDash([]);
  pop();

  noStroke();
  fill(BOUNDARY_COLOR);
  textAlign(CENTER, TOP);
  textSize(12);
  // Below the circle rather than above it, where it collided with the title.
  const capY = constrain(boundary.y + boundary.r + 6, 0, sceneHeight - 16);
  text('system boundary (drag to move, drag the dot to resize)',
       constrain(boundary.x, 160, canvasWidth - 160), capY);
}

function drawElements() {
  for (const el of elements) {
    const inside = isInside(el);
    const c = inside ? INSIDE_COLOR : OUTSIDE_COLOR;

    stroke(selectedId === el.id ? 'black' : c);
    strokeWeight(selectedId === el.id ? 3 : 2);
    fill(inside ? '#FBEBD3' : '#DEE7F0');
    rectMode(CENTER);
    rect(el.x, el.y, el.w, el.h, 8);
    rectMode(CORNER);

    noStroke();
    fill('black');
    textAlign(CENTER, CENTER);
    textSize(13);
    text(el.label, el.x, el.y - 7);

    noStroke();
    fill(c);
    textSize(11);
    text(inside ? 'in system' : 'environment', el.x, el.y + 11);
  }
}

// Draw each connection, and label it input/output where it crosses the boundary.
function drawConnections() {
  for (const c of connections) {
    const a = elements.find(e => e.id === c.from);
    const b = elements.find(e => e.id === c.to);
    if (!a || !b) { continue; }

    stroke('#adb5bd');
    strokeWeight(2);
    line(a.x, a.y, b.x, b.y);
    drawArrowHead(a.x, a.y, b.x, b.y, b);

  }
}

/** Draws the INPUT/OUTPUT tag wherever a connection crosses the boundary. */
function drawCrossingTags() {
  for (const c of connections) {
    const a = elements.find(e => e.id === c.from);
    const b = elements.find(e => e.id === c.to);
    if (!a || !b) { continue; }
    const aIn = isInside(a);
    const bIn = isInside(b);
    if (aIn === bIn) { continue; }

    // Mark the crossing point with an input/output tag.
    const cross = boundaryCrossing(a, b);
    if (!cross) { continue; }
    const isInput = (!aIn && bIn);
    const tag = isInput ? 'INPUT' : 'OUTPUT';
    const tagColor = isInput ? '#2E7D32' : '#C62828';

    noStroke();
    fill(tagColor);
    circle(cross.x, cross.y, 11);

    fill('white');
    stroke(tagColor);
    strokeWeight(2);
    rectMode(CENTER);
    const label = tag + ': ' + c.label;
    textSize(11);
    const tw = textWidth(label) + 12;
    // Clamp the tag box so it cannot run off the edge of the scene.
    const tagX = constrain(cross.x, tw / 2 + 4, canvasWidth - tw / 2 - 4);
    const tagY = constrain(cross.y - 19, 12, sceneHeight - 12);
    rect(tagX, tagY, tw, 17, 4);
    rectMode(CORNER);

    noStroke();
    fill(tagColor);
    textAlign(CENTER, CENTER);
    textSize(11);
    text(label, tagX, tagY);
  }
}

/** The resize grab handle on the circle's right edge. */
function drawBoundaryHandle() {
  noStroke();
  fill(BOUNDARY_COLOR);
  circle(boundary.x + boundary.r, boundary.y, 14);
  fill('white');
  circle(boundary.x + boundary.r, boundary.y, 5);
}

// Walk the segment a->b and return the point where it crosses the circle.
function boundaryCrossing(a, b) {
  const steps = 60;
  let prevIn = dist(a.x, a.y, boundary.x, boundary.y) < boundary.r;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const px = lerp(a.x, b.x, t);
    const py = lerp(a.y, b.y, t);
    const nowIn = dist(px, py, boundary.x, boundary.y) < boundary.r;
    if (nowIn !== prevIn) { return { x: px, y: py }; }
    prevIn = nowIn;
  }
  return null;
}

function drawArrowHead(x1, y1, x2, y2, target) {
  const ang = atan2(y2 - y1, x2 - x1);
  // Land the head on the target box's edge, whatever that box's size.
  const hw = target ? target.w / 2 + 6 : 46;
  const hh = target ? target.h / 2 + 6 : 40;
  const tx = cos(ang) === 0 ? Infinity : hw / Math.abs(cos(ang));
  const ty = sin(ang) === 0 ? Infinity : hh / Math.abs(sin(ang));
  const t = Math.min(tx, ty);
  const hx = x2 - cos(ang) * t;
  const hy = y2 - sin(ang) * t;
  push();
  translate(hx, hy);
  rotate(ang);
  noStroke();
  fill('#868e96');
  triangle(0, 0, -9, -4.5, -9, 4.5);
  pop();
}

function drawInfoBand() {
  const insideList = elements.filter(isInside).map(e => e.label);
  const outsideList = elements.filter(e => !isInside(e)).map(e => e.label);

  noStroke();
  textAlign(LEFT, TOP);

  fill(INSIDE_COLOR);
  textSize(14);
  text('Inside the system:', margin, sceneHeight + 10);
  fill('black');
  text(insideList.length ? insideList.join(', ') : '(nothing — the boundary is empty)',
       margin + 135, sceneHeight + 10);

  fill(OUTSIDE_COLOR);
  text('In the environment:', margin, sceneHeight + 32);
  fill('black');
  text(outsideList.length ? outsideList.join(', ') : '(nothing — the boundary holds everything)',
       margin + 145, sceneHeight + 32);

  // Selected element definition, or a prompt to click one.
  const sel = elements.find(e => e.id === selectedId);
  noStroke();
  fill(sel ? 'black' : '#868e96');
  textSize(13);
  const msg = sel ? (sel.label + ': ' + sel.info)
                  : 'Click any element for its definition. Drag the dashed circle to redraw the boundary.';
  text(msg, margin, sceneHeight + 58, canvasWidth - margin * 2, infoHeight - 62);
}

function drawControlLabels() {
  noStroke();
  fill('#495057');
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Presets move the boundary for you.', 270, drawHeight + 22);
}

function mousePressed() {
  if (mouseY > drawHeight) { return; }   // clicks in the control region

  // resize handle first, so it wins over the move region
  if (dist(mouseX, mouseY, boundary.x + boundary.r, boundary.y) < 12) {
    dragMode = 'resize';
    targetBoundary = null;
    return;
  }

  for (const el of elements) {
    if (abs(mouseX - el.x) < el.w / 2 && abs(mouseY - el.y) < el.h / 2) {
      selectedId = (selectedId === el.id) ? null : el.id;
      return;
    }
  }

  if (dist(mouseX, mouseY, boundary.x, boundary.y) < boundary.r) {
    dragMode = 'move';
    targetBoundary = null;
  }
}

function mouseDragged() {
  if (dragMode === 'move') {
    boundary.x = constrain(mouseX, boundary.r, canvasWidth - boundary.r);
    boundary.y = constrain(mouseY, boundary.r + 18, sceneHeight - boundary.r - 22);
  } else if (dragMode === 'resize') {
    // Cap the radius so the circle and its caption stay inside the scene.
    const maxR = Math.min(canvasWidth * 0.42, (sceneHeight - 40) / 2);
    boundary.r = constrain(mouseX - boundary.x, 40, maxR);
  }
}

function mouseReleased() {
  dragMode = null;
}

// These two functions must be present for width-responsive MicroSims.
function windowResized() {
  const prev = canvasWidth;
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  const scale = canvasWidth / prev;
  buildScene();
  boundary.x *= scale;
  boundary.r *= scale;
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
