// Fishbone Diagram -- Cart Abandonment MicroSim
// CANVAS_HEIGHT: 559
// Chapter 2: Mental Models and Systems Analysis Tools
// Learning objective: given a list of candidate causes for a problem, the
// learner will categorize each cause onto the correct bone of a fishbone
// diagram (Bloom: Analyze).
//
// The drag-and-categorize interaction is the primary teaching device: sorting
// the causes is what makes the diagram a thinking tool rather than a list.

let containerWidth;
let canvasWidth = 750;
let boneHeight = 360;
let poolHeight = 96;
let infoHeight = 58;
let drawHeight = boneHeight + poolHeight + infoHeight;
let controlHeight = 45;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

let revealButton, resetButton;

const BONES = [
  { id: 'people',     name: 'People',     color: '#2E5A87', above: true,  slot: 0 },
  { id: 'process',    name: 'Process',    color: '#2E8B57', above: true,  slot: 1 },
  { id: 'technology', name: 'Technology', color: '#6A4C93', above: false, slot: 0 },
  { id: 'cost',       name: 'Cost',       color: '#B8611A', above: false, slot: 1 }
];

const CAUSES = [
  { text: 'Slow page load',            bone: 'technology',
    why: 'A page that takes six seconds to load is a property of the system, not of ' +
         'the people or the pricing — that makes it a Technology cause.' },
  { text: 'Payment error',             bone: 'technology',
    why: 'A failing payment gateway is a technical fault. It belongs with Technology ' +
         'even though the customer experiences it as a money problem.' },
  { text: 'Surprise shipping fee',     bone: 'cost',
    why: 'The fee itself is a Cost cause. Note that the <em>surprise</em> is a ' +
         'Process problem — real causes often straddle two bones, and arguing ' +
         'about which is the point of the exercise.' },
  { text: 'No guest checkout option',  bone: 'process',
    why: 'Forcing account creation is a decision about how the checkout flow works, ' +
         'which makes it a Process cause rather than a Technology one.' },
  { text: 'Confusing return policy',   bone: 'process',
    why: 'The policy is written and approved by people, but what the customer hits ' +
         'is the step in the flow — a Process cause.' },
  { text: 'Untrained support staff',   bone: 'people',
    why: 'Capability and training sit on the People bone. The fix is coaching, not ' +
         'code and not price.' },
  { text: 'No live chat staffing',     bone: 'people',
    why: 'Nobody is rostered to answer at the moment of hesitation. That is a ' +
         'staffing decision, so it belongs to People.' },
  { text: 'Competitor price is lower', bone: 'cost',
    why: 'This is a Cost cause, and a useful one to include: some causes are outside ' +
         'the shop’s control, and a fishbone that only lists fixable causes ' +
         'is lying to you.' },
  { text: 'Checkout has 7 steps',      bone: 'process',
    why: 'Step count is a design of the flow — Process. Notice how many of the ' +
         'causes land here; a crowded bone is itself a finding.' },
  { text: 'Taxes added at final step', bone: 'cost',
    why: 'Adding cost late in the flow is a Cost cause with a Process aggravator, ' +
         'the same pattern as the surprise shipping fee.' }
];

let labels = [];
let dragging = null;
let selectedLabel = null;
let infoText = '';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  revealButton = createButton('Reveal All');
  revealButton.position(10, drawHeight + 8);
  revealButton.mousePressed(revealAll);

  resetButton = createButton('Reset');
  resetButton.position(95, drawHeight + 8);
  resetButton.mousePressed(resetBoard);

  resetBoard();

  describe(
    'A fishbone diagram for the problem "Customers Abandon Cart", with four ' +
    'category bones labeled People, Process, Technology and Cost branching off a ' +
    'central spine. Ten candidate cause labels sit in a pool below the diagram; ' +
    'the learner drags each one onto the bone they believe it belongs to. A ' +
    'correct drop snaps into place and turns the bone’s color, and a wrong ' +
    'drop bounces back.'
  );
}

function resetBoard() {
  labels = CAUSES.map((c, i) => ({
    text: c.text, bone: c.bone, why: c.why,
    placed: false, wrong: 0, slotIndex: -1,
    x: 0, y: 0, homeX: 0, homeY: 0, tx: 0, ty: 0
  }));
  layoutPool();
  infoText = '';
  selectedLabel = null;
}

function revealAll() {
  for (const l of labels) {
    if (!l.placed) { placeLabel(l); }
  }
  infoText = 'All causes placed. A crowded bone is a finding in itself: Process ' +
             'carries the most causes here, which is where a cart-abandonment ' +
             'investigation should start.';
}

function layoutPool() {
  const perRow = 5;
  const w = (canvasWidth - margin * 2 - 8 * (perRow - 1)) / perRow;
  const top = boneHeight + 26;
  let i = 0;
  for (const l of labels) {
    if (l.placed) { continue; }
    const row = Math.floor(i / perRow);
    const col = i % perRow;
    l.homeX = margin + col * (w + 8);
    l.homeY = top + row * 32;
    l.w = w;
    if (!l.dragging) { l.x = l.homeX; l.y = l.homeY; }
    i++;
  }
}

function spineY() { return boneHeight * 0.52; }

/** The rectangle a bone's causes get dropped into. */
function boneZone(bone) {
  const headX = canvasWidth - margin - 150;
  const usable = headX - margin - 70;
  const zoneW = usable * 0.40;
  const x = margin + 50 + bone.slot * (usable * 0.48);
  const y = bone.above ? 46 : spineY() + 38;
  // The lower zones stop short of the region edge so their category
  // labels, which hang below the zone, stay inside the drawing region
  // instead of colliding with the label pool underneath.
  const h = bone.above ? spineY() - 56 : boneHeight - spineY() - 64;
  return { x: x, y: y, w: zoneW, h: h };
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, boneHeight);

  fill('#F5F6F8');
  stroke('silver');
  rect(0, boneHeight, canvasWidth, poolHeight);

  fill('white');
  stroke('silver');
  rect(0, boneHeight + poolHeight, canvasWidth, infoHeight);

  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(18);
  text('Fishbone Diagram — Cart Abandonment', margin, 8);

  drawSkeleton();
  animateLabels();
  drawLabels();
  drawPoolHeader();
  drawInfo();
  drawControlHint();
}

function drawSkeleton() {
  const sy = spineY();
  const headX = canvasWidth - margin - 150;

  // the spine
  stroke('#495057');
  strokeWeight(4);
  line(margin + 20, sy, headX - 6, sy);
  noStroke();
  fill('#495057');
  triangle(headX - 6, sy, headX - 20, sy - 8, headX - 20, sy + 8);

  // the problem box at the head
  stroke('#C62828');
  strokeWeight(3);
  fill('#F7D6D6');
  rect(headX, sy - 32, 145, 64, 8);
  noStroke();
  fill('#212529');
  textAlign(CENTER, CENTER);
  textSize(14);
  text('Customers\nAbandon Cart', headX + 72, sy);

  // the four category bones
  for (const b of BONES) {
    const z = boneZone(b);
    const startX = z.x - 34;
    const startY = sy;
    const endX = z.x + z.w * 0.5;
    const endY = b.above ? z.y + 6 : z.y + z.h - 6;

    stroke(b.color);
    strokeWeight(3);
    line(startX, startY, endX, endY);

    // the drop zone
    noFill();
    stroke(b.color);
    strokeWeight(1.5);
    drawingContext.setLineDash([5, 5]);
    rect(z.x, z.y, z.w, z.h, 6);
    drawingContext.setLineDash([]);

    // category label at the far end of the bone
    noStroke();
    fill(b.color);
    rectMode(CENTER);
    const labelY = b.above ? z.y - 10 : z.y + z.h + 12;
    textSize(14);
    rect(endX, labelY, textWidth(b.name) + 18, 22, 5);
    rectMode(CORNER);
    fill('white');
    textAlign(CENTER, CENTER);
    text(b.name, endX, labelY);
  }
}

function animateLabels() {
  for (const l of labels) {
    if (l === dragging) { continue; }
    const tx = l.placed ? l.tx : l.homeX;
    const ty = l.placed ? l.ty : l.homeY;
    l.x = lerp(l.x, tx, 0.25);
    l.y = lerp(l.y, ty, 0.25);
    if (l.wrong > 0) {
      l.wrong--;
      l.x += sin(l.wrong * 1.1) * 4;     // gentle shake back
    }
  }
}

function drawLabels() {
  textSize(11);
  for (const l of labels) {
    const bone = BONES.find(b => b.id === l.bone);
    const w = l.placed ? l.w : l.w;
    const h = 26;

    stroke(l.placed ? bone.color : '#adb5bd');
    strokeWeight(selectedLabel === l ? 3 : 1.5);
    fill(l.placed ? lerpColor(color(bone.color), color('white'), 0.80) : '#E9ECEF');
    rect(l.x, l.y, w, h, 5);

    noStroke();
    fill(l.placed ? bone.color : '#495057');
    textAlign(CENTER, CENTER);
    textSize(11);
    text(l.text, l.x + 3, l.y, w - 6, h);

    if (l.placed) {
      noStroke();
      fill('#2E7D32');
      textAlign(RIGHT, CENTER);
      textSize(12);
      text('✓', l.x + w - 4, l.y + h / 2);
    }
  }
}

function placeLabel(l) {
  const bone = BONES.find(b => b.id === l.bone);
  const z = boneZone(bone);
  const already = labels.filter(x => x.placed && x.bone === l.bone).length;
  l.placed = true;
  l.slotIndex = already;
  l.w = z.w - 12;
  l.tx = z.x + 6;
  l.ty = z.y + 6 + already * 30;
}

function drawPoolHeader() {
  const remaining = labels.filter(l => !l.placed).length;
  noStroke();
  fill('#495057');
  textAlign(LEFT, TOP);
  textSize(13);
  text(remaining
        ? 'Drag each cause onto the bone you think it belongs to  (' +
          remaining + ' left)'
        : 'All causes placed — click any placed label to see why it fits ' +
          'its category.',
       margin, boneHeight + 7);
}

function drawInfo() {
  noStroke();
  textAlign(LEFT, TOP);
  fill(infoText ? 'black' : '#868e96');
  textSize(12.5);
  const msg = infoText ||
    'A fishbone organizes brainstormed causes instead of just listing them. ' +
    'Deciding which bone a cause belongs to is the part that does the teaching.';
  text(msg.replace(/<[^>]+>/g, ''), margin, boneHeight + poolHeight + 8,
       canvasWidth - margin * 2, infoHeight - 12);
}

function drawControlHint() {
  noStroke();
  fill('#495057');
  textAlign(LEFT, CENTER);
  textSize(13);
  text('A wrong drop bounces back so you can try again.', 165,
       drawHeight + controlHeight / 2);
}

function mousePressed() {
  // a placed label: show why it fits
  for (const l of labels) {
    if (l.placed && hit(l)) {
      selectedLabel = l;
      infoText = l.why;
      return;
    }
  }
  // an unplaced label: start dragging
  for (const l of labels) {
    if (!l.placed && hit(l)) {
      dragging = l;
      l.dragging = true;
      return;
    }
  }
}

function hit(l) {
  return mouseX > l.x && mouseX < l.x + l.w && mouseY > l.y && mouseY < l.y + 26;
}

function mouseDragged() {
  if (dragging) {
    dragging.x = mouseX - dragging.w / 2;
    dragging.y = mouseY - 13;
  }
}

function mouseReleased() {
  if (!dragging) { return; }
  const l = dragging;
  l.dragging = false;
  dragging = null;

  const cx = l.x + l.w / 2;
  const cy = l.y + 13;

  for (const b of BONES) {
    const z = boneZone(b);
    if (cx > z.x && cx < z.x + z.w && cy > z.y && cy < z.y + z.h) {
      if (b.id === l.bone) {
        placeLabel(l);
        infoText = l.why;
        selectedLabel = l;
      } else {
        l.wrong = 24;             // bounce back with a shake
        infoText = '"' + l.text + '" does not belong on the ' + b.name +
                   ' bone. Ask what KIND of thing this cause is — a person, ' +
                   'a step in the flow, a system, or a price.';
      }
      layoutPool();
      return;
    }
  }
  layoutPool();
}

// These two functions must be present for width-responsive MicroSims.
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  // re-place everything against the new geometry
  const placed = labels.filter(l => l.placed);
  for (const l of labels) { l.placed = false; }
  for (const l of placed) { placeLabel(l); }
  layoutPool();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
