// Data Ingestion Pipeline -- From Lake to Warehouse to Mart MicroSim
// CANVAS_HEIGHT: 500
// Chapter 18: Data Management and Governance
// Learning objective: sequence a data lake, an ETL process, a central data
// warehouse, a data mart and a star schema in their correct order and explain
// what each stage adds (Bloom: Understand).

let containerWidth;
let canvasWidth = 700;
let drawHeight = 355;
let infoHeight = 100;
let controlHeight = 45;
let canvasHeight = drawHeight + infoHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

let animateButton;
let selected = null;
let animating = false;
let packetT = 0;              // 0..STAGES.length-1, the packet's position
let packetPause = 0;          // frames remaining in a pause at a stage

const ACCENT = '#E8871A';

const STAGES = [
  {
    id: 'source', label: 'Source\nSystems', color: '#5B7FA6',
    title: 'Source Systems',
    body: 'The operational systems where data is created: the CRM, the point of ' +
          'sale, the HR system. Each was designed to run a business process, not ' +
          'to answer analytical questions — which is the whole reason the ' +
          'rest of this pipeline exists.'
  },
  {
    id: 'lake', label: 'Data Lake\n(raw)', color: '#2E8B57',
    title: 'Data Lake (raw)',
    body: 'Stores data in its original form, schema-on-read: you decide what it ' +
          'means when you query it, not when you load it. What a lake adds is ' +
          'optionality — you keep everything, including fields nobody has ' +
          'found a use for yet. What it risks is a swamp, if nothing downstream ' +
          'ever imposes meaning.'
  },
  {
    id: 'etl', label: 'ETL\nProcess', color: '#B8611A',
    title: 'ETL Process',
    body: 'Extract, Transform, Load. This is where raw records are cleaned, ' +
          'deduplicated, standardized and conformed to shared definitions. What ' +
          'ETL adds is <em>agreement</em>: after this stage, "customer" means one ' +
          'thing across the organization instead of five.'
  },
  {
    id: 'dw', label: 'Central Data\nWarehouse', color: '#6A4C93',
    title: 'Central Data Warehouse (star schema)',
    body: 'A single, governed, query-optimized store organized around business ' +
          'questions rather than around business processes. What the warehouse ' +
          'adds is a shared version of the truth — one place where two ' +
          'departments asking the same question get the same number. Click the ' +
          'small star diagram inside this box to look at its structure.'
  },
  {
    id: 'mart', label: 'Data Marts\n(Marketing, Finance)', color: '#C62828',
    title: 'Data Marts',
    body: 'Subject-specific slices of the warehouse, shaped for one audience. ' +
          'What a mart adds is speed and simplicity for its own users. The ' +
          'discipline that matters: a mart is derived <em>from</em> the ' +
          'warehouse, never loaded independently — otherwise you have ' +
          'rebuilt the silos this pipeline was meant to dissolve.'
  }
];

const STAR_INFO = {
  title: 'Star schema: fact table vs. dimension tables',
  body: 'The central <strong>fact table</strong> holds the measurements — ' +
        'one row per sale, with quantities and amounts, and a foreign key out to ' +
        'each dimension. It is narrow, numeric and very long.<br><br>' +
        'The surrounding <strong>dimension tables</strong> hold the descriptive ' +
        'context you filter and group by: Date, Product, Customer, Store. They ' +
        'are wide, textual and comparatively short.<br><br>' +
        'The shape is the point: every analytical question becomes "aggregate a ' +
        'measure from the fact table, sliced by attributes from the dimensions," ' +
        'which is one join deep no matter how the question is phrased.'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  animateButton = createButton('Animate Flow');
  animateButton.position(10, drawHeight + infoHeight + 8);
  animateButton.mousePressed(startAnimation);

  describe(
    'Five labeled boxes connected left to right: Source Systems, Data Lake, ETL ' +
    'Process, Central Data Warehouse and Data Marts. The warehouse box contains ' +
    'a small star-schema icon with one fact table surrounded by four dimension ' +
    'tables. Clicking any box explains what that stage adds, and an Animate Flow ' +
    'button sends a data packet through all five stages in order.'
  );
}

function startAnimation() {
  animating = true;
  packetT = 0;
  packetPause = 30;
}

function stageBox(i) {
  const usable = canvasWidth - margin * 2;
  const gap = usable * 0.045;
  const w = (usable - gap * 4) / 5;
  return { x: margin + i * (w + gap), y: 150, w: w, h: 110 };
}

function starIconBox() {
  const b = stageBox(3);
  return { x: b.x + b.w * 0.5 - 34, y: b.y + b.h + 12, w: 68, h: 58 };
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
  text('From Lake to Warehouse to Mart', canvasWidth / 2, 8);
  fill('#6c757d');
  textSize(13);
  text('Each stage adds something the previous one could not.', canvasWidth / 2, 34);

  drawArrows();
  drawStages();
  drawStarIcon();
  drawPacket();
  drawInfo();
  drawControlHint();
}

function drawArrows() {
  for (let i = 0; i < STAGES.length - 1; i++) {
    const a = stageBox(i);
    const b = stageBox(i + 1);
    const y = a.y + a.h / 2;
    stroke('#868e96');
    strokeWeight(2.5);
    line(a.x + a.w, y, b.x - 4, y);
    noStroke();
    fill('#868e96');
    triangle(b.x - 4, y, b.x - 14, y - 5, b.x - 14, y + 5);
  }
}

function drawStages() {
  for (let i = 0; i < STAGES.length; i++) {
    const s = STAGES[i];
    const b = stageBox(i);
    const isSel = selected === s.id;

    stroke(s.color);
    strokeWeight(isSel ? 4 : 2.5);
    fill(isSel ? lerpColor(color(s.color), color('white'), 0.78) : 'white');
    rect(b.x, b.y, b.w, b.h, 8);

    noStroke();
    fill('black');
    textAlign(CENTER, CENTER);
    textSize(13);
    text(s.label, b.x + 5, b.y, b.w - 10, b.h - 22);

    noStroke();
    fill(s.color);
    textAlign(CENTER, BOTTOM);
    textSize(11);
    text('stage ' + (i + 1), b.x + b.w / 2, b.y + b.h - 6);
  }
}

/** The star schema inset: one fact table surrounded by four dimension tables. */
function drawStarIcon() {
  const box = starIconBox();
  const cx = box.x + box.w / 2;
  const cy = box.y + box.h / 2;
  const isSel = selected === 'star';

  stroke(isSel ? ACCENT : '#adb5bd');
  strokeWeight(isSel ? 2.5 : 1);
  fill(isSel ? '#FDF3E7' : 'white');
  rect(box.x - 6, box.y - 6, box.w + 12, box.h + 12, 6);

  // dimension tables at the four corners
  const dims = [[-26, -18], [26, -18], [-26, 18], [26, 18]];
  for (const d of dims) {
    stroke('#5B7FA6');
    strokeWeight(1);
    fill('#D6E3F0');
    rectMode(CENTER);
    rect(cx + d[0], cy + d[1], 20, 13, 2);
    rectMode(CORNER);
    stroke('#adb5bd');
    line(cx + d[0] * 0.45, cy + d[1] * 0.45, cx + d[0] * 0.75, cy + d[1] * 0.75);
  }

  // the fact table at the center
  stroke('#B8611A');
  strokeWeight(1.5);
  fill('#F8E3CE');
  rectMode(CENTER);
  rect(cx, cy, 30, 17, 2);
  rectMode(CORNER);

  noStroke();
  fill('#495057');
  textAlign(CENTER, TOP);
  textSize(10);
  text('star schema (click)', cx, box.y + box.h + 8);
}

function drawPacket() {
  if (!animating) { return; }

  if (packetPause > 0) {
    packetPause--;
  } else {
    packetT += 0.016;
    if (packetT >= STAGES.length - 1) {
      packetT = STAGES.length - 1;
      animating = false;
    } else if (Math.abs(packetT - Math.round(packetT)) < 0.016) {
      packetPause = 28;      // pause briefly at each stage
    }
  }

  const i = Math.floor(packetT);
  const frac = packetT - i;
  const a = stageBox(i);
  const b = stageBox(Math.min(i + 1, STAGES.length - 1));
  const x = lerp(a.x + a.w / 2, b.x + b.w / 2, frac);
  const y = a.y + a.h / 2;

  noStroke();
  fill(ACCENT);
  circle(x, y - 68, 22);
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(11);
  text('data', x, y - 68);

  stroke(ACCENT);
  strokeWeight(2);
  line(x, y - 56, x, y - 44);
  noStroke();
  fill(ACCENT);
  triangle(x, y - 40, x - 5, y - 50, x + 5, y - 50);
}

function drawInfo() {
  noStroke();
  textAlign(LEFT, TOP);

  if (selected === 'star') {
    fill('#B8611A');
    textSize(14);
    text(STAR_INFO.title, margin, drawHeight + 8);
    fill('black');
    textSize(12);
    text(stripTags(STAR_INFO.body), margin, drawHeight + 28,
         canvasWidth - margin * 2, infoHeight - 32);
    return;
  }

  const s = STAGES.find(x => x.id === selected);
  if (s) {
    fill(s.color);
    textSize(14);
    text(s.title, margin, drawHeight + 8);
    fill('black');
    textSize(12);
    text(stripTags(s.body), margin, drawHeight + 28,
         canvasWidth - margin * 2, infoHeight - 32);
  } else {
    fill('#868e96');
    textSize(14);
    text('Click any stage to see what it adds, or click the small star-schema ' +
         'diagram under the warehouse to look inside it.',
         margin, drawHeight + 14, canvasWidth - margin * 2, 40);
  }
}

/** The info strings carry light HTML for reuse in the lesson page; p5's text()
 *  needs it removed. */
function stripTags(s) {
  return s.replace(/<br><br>/g, '  ').replace(/<[^>]+>/g, '');
}

function drawControlHint() {
  noStroke();
  fill('#495057');
  textAlign(LEFT, CENTER);
  textSize(13);
  text('The packet pauses at each stage, in order.', 120,
       drawHeight + infoHeight + controlHeight / 2);
}

function mousePressed() {
  if (mouseY > drawHeight) { return; }

  const sb = starIconBox();
  if (mouseX > sb.x - 6 && mouseX < sb.x + sb.w + 6 &&
      mouseY > sb.y - 6 && mouseY < sb.y + sb.h + 6) {
    selected = (selected === 'star') ? null : 'star';
    return;
  }

  for (let i = 0; i < STAGES.length; i++) {
    const b = stageBox(i);
    if (mouseX > b.x && mouseX < b.x + b.w && mouseY > b.y && mouseY < b.y + b.h) {
      selected = (selected === STAGES[i].id) ? null : STAGES[i].id;
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
