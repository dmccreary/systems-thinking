// Subsystem Nesting Explorer MicroSim
// CANVAS_HEIGHT: 560
// Chapter 1: Foundations of Systems Thinking
// Learning objective: differentiate the whole-car system from its nested
// subsystems and identify each subsystem's own inputs and outputs
// (Bloom: Analyze).
//
// A car is drawn as one outer system box holding four subsystem boxes. Clicking
// a subsystem expands it in place to reveal its own Input, Throughput and
// Output — the point being that a subsystem is a full system in its own right.

// ---- canvas geometry ----
let containerWidth;
let canvasWidth = 700;
let sceneHeight = 420;
let infoHeight = 95;
let drawHeight = sceneHeight + infoHeight;
let controlHeight = 45;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// ---- state ----
let subsystems = [];
let connections = [];
let expandedId = null;      // only one subsystem is expanded at a time
let infoText = '';
let collapseButton;

// Definitions reused from this chapter's prose.
const DEFS = {
  subsystem: 'Subsystem: a system nested inside a larger system. It has its own ' +
             'inputs, throughput and outputs, and it is a complete system when you ' +
             'look at it on its own.',
  Input: 'Input: whatever the system takes in from outside its boundary.',
  Throughput: 'Throughput: the transformation the system performs on its inputs — ' +
              'the work that happens between input and output.',
  Output: 'Output: whatever the system sends back across its boundary to the world.'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  collapseButton = createButton('Collapse All');
  collapseButton.position(10, drawHeight + 8);
  collapseButton.mousePressed(() => { expandedId = null; infoText = ''; });

  buildSubsystems();

  describe(
    'A car drawn as one outer system box containing four subsystem boxes: engine, ' +
    'transmission, braking system and electrical system. Clicking a subsystem ' +
    'expands it to show its own input, throughput and output.'
  );
}

function buildSubsystems() {
  const data = [
    {
      id: 'engine', label: 'Engine', color: '#F4B183',
      input: 'fuel, air, spark', throughput: 'combustion', output: 'rotational force',
      info: 'The engine turns stored chemical energy into rotational motion. Inside ' +
            'the car it is one part; examined on its own it is a complete system.'
    },
    {
      id: 'transmission', label: 'Transmission', color: '#A9D08E',
      input: 'rotational force', throughput: 'gear selection', output: 'torque at the wheels',
      info: 'The transmission matches engine speed to road speed. Its input is ' +
            'another subsystem’s output — that is what makes the car a system ' +
            'rather than a pile of parts.'
    },
    {
      id: 'braking', label: 'Braking System', color: '#9DC3E6',
      input: 'pedal pressure', throughput: 'friction at the discs', output: 'slowing force, heat',
      info: 'The braking system converts motion into heat. Notice that heat is a ' +
            'real output, not a side note: every system sends something back across ' +
            'its boundary.'
    },
    {
      id: 'electrical', label: 'Electrical System', color: '#C9A0DC',
      input: 'alternator current', throughput: 'store and distribute charge', output: 'spark, lights, sensor data',
      info: 'The electrical system supplies the other three. Its output becomes the ' +
            'engine’s input, which is why a dead battery stops a car with a ' +
            'perfectly good engine.'
    }
  ];

  const outer = outerRect();
  const cols = 2, rows = 2;
  const cellW = outer.w / cols;
  const cellH = outer.h / rows;

  subsystems = data.map((d, i) => {
    const cx = outer.x + cellW * (i % cols) + cellW / 2;
    const cy = outer.y + cellH * Math.floor(i / cols) + cellH / 2;
    return Object.assign({}, d, {
      cx: cx, cy: cy,
      cw: cellW * 0.80, ch: cellH * 0.56,     // collapsed size
      ew: cellW * 0.94, eh: cellH * 0.90,     // expanded size
      w: cellW * 0.80, h: cellH * 0.56        // current animated size
    });
  });

  connections = [
    { from: 'engine', to: 'transmission', label: 'rotational force' },
    { from: 'electrical', to: 'engine', label: 'spark' }
  ];
}

function outerRect() {
  return {
    x: margin + 12,
    y: 58,
    w: canvasWidth - (margin + 12) * 2,
    h: sceneHeight - 58 - 16
  };
}

function draw() {
  updateCanvasSize();

  // drawing region
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, sceneHeight);

  // info band
  fill('white');
  stroke('silver');
  rect(0, sceneHeight, canvasWidth, infoHeight);

  // control region
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(20);
  text('A Car Is a System of Systems', canvasWidth / 2, 8);

  drawOuterSystem();
  animateSizes();
  drawConnections();
  drawSubsystems();
  drawInfoBand();
  drawControlHint();
}

function drawOuterSystem() {
  const o = outerRect();
  noFill();
  stroke('#6c757d');
  strokeWeight(2.5);
  rect(o.x, o.y, o.w, o.h, 14);

  noStroke();
  fill('#495057');
  textAlign(LEFT, BOTTOM);
  textSize(15);
  text('Car (System)', o.x + 6, o.y - 4);
}

// lerp() each box toward its collapsed or expanded target size.
function animateSizes() {
  for (const s of subsystems) {
    const tw = (s.id === expandedId) ? s.ew : s.cw;
    const th = (s.id === expandedId) ? s.eh : s.ch;
    s.w = lerp(s.w, tw, 0.22);
    s.h = lerp(s.h, th, 0.22);
  }
}

function drawSubsystems() {
  rectMode(CENTER);
  for (const s of subsystems) {
    stroke(s.color);
    strokeWeight(2.5);
    fill(lerpColor(color(s.color), color('white'), 0.72));
    rect(s.cx, s.cy, s.w, s.h, 10);

    noStroke();
    fill('black');
    textAlign(CENTER, TOP);
    textSize(14);
    text(s.label, s.cx, s.cy - s.h / 2 + 7);

    if (s.id === expandedId && s.h > s.ch * 1.3) {
      drawITOBoxes(s);
    } else if (s.id !== expandedId) {
      noStroke();
      fill('#6c757d');
      textSize(11);
      text('click to open', s.cx, s.cy + s.h / 2 - 18);
    }
  }
  rectMode(CORNER);
}

// The three Input / Throughput / Output sub-boxes inside an expanded subsystem.
function drawITOBoxes(s) {
  const parts = [
    { key: 'Input', value: s.input },
    { key: 'Throughput', value: s.throughput },
    { key: 'Output', value: s.output }
  ];
  const top = s.cy - s.h / 2 + 28;
  const avail = s.h - 36;
  const bh = Math.min(30, avail / 3 - 3);
  s.itoBoxes = [];

  for (let i = 0; i < parts.length; i++) {
    const by = top + bh / 2 + i * (bh + 3);
    const bw = s.w - 16;
    stroke('#adb5bd');
    strokeWeight(1);
    fill('white');
    rect(s.cx, by, bw, bh, 5);
    s.itoBoxes.push({ key: parts[i].key, x: s.cx, y: by, w: bw, h: bh });

    noStroke();
    fill('#1a3a6c');
    textAlign(LEFT, CENTER);
    textSize(11);
    text(parts[i].key + ':', s.cx - bw / 2 + 6, by);
    fill('#212529');
    textSize(11);
    // text() with a box measures from the box's top-left, so shift up by
    // half the row height to line the value up with its key.
    text(parts[i].value, s.cx - bw / 2 + 74, by - bh / 2, bw - 80, bh);
  }
}

function drawConnections() {
  for (const c of connections) {
    const a = subsystems.find(s => s.id === c.from);
    const b = subsystems.find(s => s.id === c.to);
    if (!a || !b) { continue; }

    // Clip the centre-to-centre segment to each box's edge. Drawn between
    // centres, the line disappears behind two adjacent boxes and only a stub
    // shows in the gap.
    const p1 = boxExit(a, b.cx - a.cx, b.cy - a.cy);
    const p2 = boxExit(b, a.cx - b.cx, a.cy - b.cy);

    stroke('#495057');
    strokeWeight(2);
    line(p1.x, p1.y, p2.x, p2.y);

    const ang = atan2(p2.y - p1.y, p2.x - p1.x);
    push();
    translate(p2.x, p2.y);
    rotate(ang);
    noStroke();
    fill('#495057');
    triangle(0, 0, -10, -5, -10, 5);
    pop();

    // Offset the label perpendicular to the line so it does not cover the
    // short segment and its arrowhead in the gap between two boxes.
    const len = Math.max(1, dist(p1.x, p1.y, p2.x, p2.y));
    const nx = -(p2.y - p1.y) / len;
    const ny = (p2.x - p1.x) / len;
    const mx = (p1.x + p2.x) / 2 + nx * 13;
    const my = (p1.y + p2.y) / 2 + ny * 13;
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    fill('aliceblue');
    rectMode(CENTER);
    rect(mx, my, textWidth(c.label) + 8, 14);
    rectMode(CORNER);
    fill('#495057');
    text(c.label, mx, my);
  }
}

/** Where a ray leaving a box's centre in direction (dx, dy) crosses its edge. */
function boxExit(box, dx, dy) {
  const hw = box.w / 2 + 3;
  const hh = box.h / 2 + 3;
  const tx = dx === 0 ? Infinity : hw / Math.abs(dx);
  const ty = dy === 0 ? Infinity : hh / Math.abs(dy);
  const t = Math.min(tx, ty);
  return { x: box.cx + dx * t, y: box.cy + dy * t };
}

function drawInfoBand() {
  noStroke();
  textAlign(LEFT, TOP);
  fill(infoText ? 'black' : '#868e96');
  textSize(13);
  const msg = infoText ||
    'Click a subsystem box to open it. Inside, click Input, Throughput or Output ' +
    'for its definition — each subsystem is a complete system in its own right.';
  text(msg, margin, sceneHeight + 12, canvasWidth - margin * 2, infoHeight - 18);
}

function drawControlHint() {
  noStroke();
  fill('#495057');
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Only one subsystem opens at a time, so the nesting stays readable.',
       130, drawHeight + 22);
}

function mousePressed() {
  if (mouseY > drawHeight || mouseY > sceneHeight) { return; }

  // An open subsystem's Input/Throughput/Output boxes take priority.
  const open = subsystems.find(s => s.id === expandedId);
  if (open && open.itoBoxes) {
    for (const b of open.itoBoxes) {
      if (abs(mouseX - b.x) < b.w / 2 && abs(mouseY - b.y) < b.h / 2) {
        infoText = DEFS[b.key] + '  For the ' + open.label.toLowerCase() + ', that is "' +
                   (b.key === 'Input' ? open.input : b.key === 'Throughput' ? open.throughput : open.output) + '".';
        return;
      }
    }
  }

  for (const s of subsystems) {
    if (abs(mouseX - s.cx) < s.w / 2 && abs(mouseY - s.cy) < s.h / 2) {
      if (expandedId === s.id) {
        expandedId = null;
        infoText = '';
      } else {
        expandedId = s.id;
        infoText = DEFS.subsystem + '  ' + s.info;
      }
      return;
    }
  }
}

// These two functions must be present for width-responsive MicroSims.
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  const keep = expandedId;
  buildSubsystems();
  expandedId = keep;
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
