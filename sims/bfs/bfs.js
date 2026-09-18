// Breadth-First Search Step-by-Step MicroSim
// CANVAS_HEIGHT: 523
// Chapter 15: Graph Theory Fundamentals
// Learning objective: given a starting vertex, predict which vertex
// breadth-first search visits next at each step, based on hop distance from
// the start (Bloom: Apply).
//
// The search advances one ring at a time so the invariant stays visible: BFS
// finishes every vertex at distance d before touching any vertex at distance
// d+1.

let containerWidth;
let canvasWidth = 700;
let drawHeight = 400;
let infoHeight = 78;
let controlHeight = 45;
let canvasHeight = drawHeight + infoHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

let nextButton, finishButton, restartButton;

// ---- the fixed sample graph ----
// Concentric rings around a start vertex, so hop distance is also visual
// distance and a learner can predict the next ring before pressing Next.
const VERTICES = [
  { id: 'A', ring: 0, angle: 0 },
  { id: 'B', ring: 1, angle: -90 },
  { id: 'C', ring: 1, angle: -18 },
  { id: 'D', ring: 1, angle: 54 },
  { id: 'E', ring: 1, angle: 126 },
  { id: 'F', ring: 1, angle: 198 },
  { id: 'G', ring: 2, angle: -110 },
  { id: 'H', ring: 2, angle: -55 },
  { id: 'I', ring: 2, angle: 5 },
  { id: 'J', ring: 2, angle: 65 },
  { id: 'K', ring: 2, angle: 130 },
  { id: 'L', ring: 2, angle: 195 },
  { id: 'M', ring: 3, angle: -80 },
  { id: 'N', ring: 3, angle: 30 },
  { id: 'O', ring: 3, angle: 160 }
];

const EDGES = [
  ['A','B'], ['A','C'], ['A','D'], ['A','E'], ['A','F'],
  ['B','G'], ['B','H'], ['C','H'], ['C','I'], ['D','J'],
  ['E','K'], ['F','L'], ['F','G'],
  ['G','M'], ['H','M'], ['I','N'], ['J','N'], ['K','O'], ['L','O']
];

const START = 'A';

// ---- search state ----
let dist = {};        // vertex -> hop distance, or undefined if unvisited
let currentRing = -1; // the deepest ring revealed so far
let maxRing = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  nextButton = createButton('Next Step');
  nextButton.position(10, drawHeight + infoHeight + 8);
  nextButton.mousePressed(nextStep);

  finishButton = createButton('Finish');
  finishButton.position(105, drawHeight + infoHeight + 8);
  finishButton.mousePressed(finishSearch);

  restartButton = createButton('Restart');
  restartButton.position(175, drawHeight + infoHeight + 8);
  restartButton.mousePressed(restart);

  computeDistances();
  restart();

  describe(
    'A graph laid out in concentric rings around a start vertex. Pressing Next ' +
    'Step reveals the next ring of the breadth-first search, coloring each ' +
    'newly visited vertex and labeling it with its hop distance from the start. ' +
    'Finish completes the traversal and Restart resets every vertex to unvisited.'
  );
}

/** Standard BFS over the edge list: the true hop distance for every vertex. */
function computeDistances() {
  const adj = {};
  VERTICES.forEach(v => { adj[v.id] = []; });
  EDGES.forEach(e => { adj[e[0]].push(e[1]); adj[e[1]].push(e[0]); });

  const d = {};
  d[START] = 0;
  const queue = [START];
  while (queue.length) {
    const cur = queue.shift();
    for (const n of adj[cur]) {
      if (d[n] === undefined) {
        d[n] = d[cur] + 1;
        queue.push(n);
      }
    }
  }
  dist = d;
  maxRing = Math.max.apply(null, Object.keys(d).map(k => d[k]));
}

function restart() {
  currentRing = -1;
}

function nextStep() {
  if (currentRing < maxRing) { currentRing++; }
}

function finishSearch() {
  currentRing = maxRing;
}

function visited(id) {
  return currentRing >= 0 && dist[id] <= currentRing;
}

function positionOf(v) {
  const cx = canvasWidth / 2;
  const cy = 228;
  const unit = min(canvasWidth * 0.125, 84);
  if (v.ring === 0) { return { x: cx, y: cy }; }
  const a = radians(v.angle);
  // The vertical squash keeps the outermost ring clear of the title above and
  // the info band below; without it the ring-3 vertices ran into both.
  return { x: cx + unit * v.ring * cos(a), y: cy + unit * v.ring * sin(a) * 0.60 };
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
  text('Breadth-First Search, One Ring at a Time', canvasWidth / 2, 8);

  drawEdges();
  drawVertices();
  drawInfo();
}

function drawEdges() {
  for (const e of EDGES) {
    const a = VERTICES.find(v => v.id === e[0]);
    const b = VERTICES.find(v => v.id === e[1]);
    const pa = positionOf(a);
    const pb = positionOf(b);
    const both = visited(a.id) && visited(b.id);
    stroke(both ? '#7FA8CC' : '#dee2e6');
    strokeWeight(both ? 2.5 : 1.5);
    line(pa.x, pa.y, pb.x, pb.y);
  }
}

function drawVertices() {
  for (const v of VERTICES) {
    const p = positionOf(v);
    const d = dist[v.id];
    const isVisited = visited(v.id);
    const isFrontier = isVisited && d === currentRing;

    stroke(isVisited ? '#14517F' : '#adb5bd');
    strokeWeight(isFrontier ? 4 : 2);
    if (!isVisited) {
      fill('white');
    } else {
      // deeper rings get a deeper blue
      fill(lerpColor(color('#BBD7EF'), color('#14517F'), d / max(1, maxRing)));
    }
    circle(p.x, p.y, 42);

    noStroke();
    const deep = isVisited && d / max(1, maxRing) > 0.5;
    fill(isVisited ? (deep ? 'white' : 'black') : '#868e96');
    textAlign(CENTER, CENTER);
    textSize(15);
    text(v.id, p.x, p.y - 6);

    if (isVisited) {
      textSize(11);
      text('d=' + d, p.x, p.y + 11);
    }
  }
}

function drawInfo() {
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);

  if (currentRing < 0) {
    fill('black');
    text('Start vertex: ' + START + '. Before pressing Next Step, predict which ' +
         'vertices BFS reaches first.', margin, drawHeight + 10,
         canvasWidth - margin * 2, 24);
    fill('#6c757d');
    textSize(13);
    text('BFS visits every vertex at distance d before any vertex at distance ' +
         'd+1, so the answer is always "the next ring out" — never a ' +
         'far-away vertex, however tempting the edge looks.',
         margin, drawHeight + 36, canvasWidth - margin * 2, 40);
    return;
  }

  const atRing = VERTICES.filter(v => dist[v.id] === currentRing).map(v => v.id);
  const nextRing = VERTICES.filter(v => dist[v.id] === currentRing + 1).map(v => v.id);
  const visitedCount = VERTICES.filter(v => visited(v.id)).length;

  fill('black');
  text('Distance ' + currentRing + ' just visited: ' + atRing.join(', ') +
       '   (' + visitedCount + ' of ' + VERTICES.length + ' vertices visited)',
       margin, drawHeight + 10, canvasWidth - margin * 2, 24);

  fill(nextRing.length ? '#B8611A' : '#2E7D32');
  textSize(13);
  if (nextRing.length) {
    text('Predict before you press: the next step must visit exactly ' +
         nextRing.join(', ') + ' — every vertex at distance ' +
         (currentRing + 1) + ', and nothing deeper.',
         margin, drawHeight + 36, canvasWidth - margin * 2, 40);
  } else {
    text('Traversal complete. Every vertex is labeled with its shortest hop ' +
         'distance from ' + START + ' — which is what BFS computes for free ' +
         'along the way.',
         margin, drawHeight + 36, canvasWidth - margin * 2, 40);
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
