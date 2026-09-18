// Vertical vs Scale-Out Graph Architecture MicroSim
// CANVAS_HEIGHT: 505
// Chapter 16: Graph Database Architecture
// Learning objective: compare a single graph-optimized-hardware server against
// a distributed scale-out cluster, and identify why a cross-server edge
// traversal costs more than a local one (Bloom: Analyze).

let containerWidth;
let canvasWidth = 700;
let drawHeight = 395;
let infoHeight = 65;
let controlHeight = 45;
let canvasHeight = drawHeight + infoHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

let switchButton, highlightButton;
let showScaleOut = false;
let highlightCross = false;
let pulse = 0;
let hoverText = '';

const LOCAL_COLOR = '#2E7D32';
const CROSS_COLOR = '#E8871A';
const SERVER_COLOR = '#2E5A87';

// The same nine vertices in both views. `shard` only matters in the
// scale-out view.
const VERTICES = [
  { id: 'v1', shard: 0 }, { id: 'v2', shard: 0 }, { id: 'v3', shard: 0 },
  { id: 'v4', shard: 1 }, { id: 'v5', shard: 1 }, { id: 'v6', shard: 1 },
  { id: 'v7', shard: 2 }, { id: 'v8', shard: 2 }, { id: 'v9', shard: 2 }
];

const EDGES = [
  ['v1', 'v2'], ['v2', 'v3'], ['v1', 'v3'],
  ['v4', 'v5'], ['v5', 'v6'], ['v4', 'v6'],
  ['v7', 'v8'], ['v8', 'v9'], ['v7', 'v9'],
  ['v3', 'v4'], ['v6', 'v7'], ['v2', 'v8']     // these three cross shards
];

let positions = {};   // recomputed every frame for the current view

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  switchButton = createButton('Switch View');
  switchButton.position(10, drawHeight + infoHeight + 8);
  switchButton.mousePressed(() => {
    showScaleOut = !showScaleOut;
    highlightCross = false;
    hoverText = '';
  });

  highlightButton = createButton('Highlight Cross-Shard Edges');
  highlightButton.position(110, drawHeight + infoHeight + 8);
  highlightButton.mousePressed(() => {
    if (showScaleOut) { highlightCross = !highlightCross; }
  });

  describe(
    'Two alternative architectures for the same nine-vertex graph, shown one at ' +
    'a time. The graph-optimized hardware view puts every vertex inside one ' +
    'large server, so all edges are solid local pointer hops. The scale-out view ' +
    'splits the same vertices across three smaller servers, and edges between ' +
    'servers are drawn dashed in orange because each one costs a network ' +
    'round-trip.'
  );
}

function isCross(e) {
  const a = VERTICES.find(v => v.id === e[0]);
  const b = VERTICES.find(v => v.id === e[1]);
  return a.shard !== b.shard;
}

function computePositions() {
  positions = {};
  if (!showScaleOut) {
    // one big server: all nine vertices in a single ring
    const cx = canvasWidth / 2;
    const cy = 225;
    const r = min(canvasWidth * 0.17, 108);
    VERTICES.forEach((v, i) => {
      const a = -HALF_PI + (TWO_PI * i) / VERTICES.length;
      positions[v.id] = { x: cx + r * cos(a), y: cy + r * sin(a) * 0.9 };
    });
  } else {
    // three shards, each with its own small ring
    const panelW = canvasWidth / 3;
    const r = min(panelW * 0.20, 46);
    VERTICES.forEach((v) => {
      const inShard = VERTICES.filter(x => x.shard === v.shard);
      const idx = inShard.indexOf(v);
      const a = -HALF_PI + (TWO_PI * idx) / inShard.length;
      const cx = panelW * v.shard + panelW / 2;
      const cy = 235;
      positions[v.id] = { x: cx + r * cos(a), y: cy + r * sin(a) };
    });
  }
}

function draw() {
  updateCanvasSize();
  computePositions();
  pulse = (pulse + 0.07) % TWO_PI;

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
  text(showScaleOut ? 'Scale-Out Cluster' : 'Graph-Optimized Hardware',
       canvasWidth / 2, 8);
  fill('#6c757d');
  textSize(13);
  text(showScaleOut
        ? 'The same nine vertices, split across three smaller servers.'
        : 'All nine vertices live in one machine’s memory.',
       canvasWidth / 2, 34);

  if (showScaleOut) { drawShardServers(); } else { drawSingleServer(); }
  drawEdges();
  drawVertices();
  drawInfo();
  updateHover();
}

function drawSingleServer() {
  const w = min(canvasWidth * 0.52, 400);
  const x = canvasWidth / 2 - w / 2;
  const y = 84;
  const h = 246;

  stroke(SERVER_COLOR);
  strokeWeight(3);
  fill('#EDF3F9');
  rect(x, y, w, h, 10);

  // rack lines, to make it read as a server
  stroke('#C3D2E0');
  strokeWeight(2);
  for (let i = 1; i <= 3; i++) { line(x + 10, y + i * 14, x + w - 10, y + i * 14); }

  noStroke();
  fill(SERVER_COLOR);
  textAlign(CENTER, TOP);
  textSize(14);
  // Caption sits BELOW the server box: inside it, it collided with the
  // bottom of the vertex ring.
  text('One large server — all edges are local pointer hops', x + w / 2, y + h + 8);
}

function drawShardServers() {
  const panelW = canvasWidth / 3;
  for (let s = 0; s < 3; s++) {
    const w = panelW * 0.78;
    const x = panelW * s + (panelW - w) / 2;
    const y = 120;
    const h = 210;

    stroke(SERVER_COLOR);
    strokeWeight(2.5);
    fill('#EDF3F9');
    rect(x, y, w, h, 8);

    stroke('#C3D2E0');
    strokeWeight(2);
    for (let i = 1; i <= 2; i++) { line(x + 8, y + i * 12, x + w - 8, y + i * 12); }

    noStroke();
    fill(SERVER_COLOR);
    textAlign(CENTER, TOP);
    textSize(13);
    text('Shard ' + (s + 1), x + w / 2, y + h - 24);
  }
}

function drawEdges() {
  for (const e of EDGES) {
    const a = positions[e[0]];
    const b = positions[e[1]];
    const cross = showScaleOut && isCross(e);

    if (cross) {
      const w = highlightCross ? 3 + sin(pulse) * 1.6 : 2.5;
      stroke(CROSS_COLOR);
      strokeWeight(w);
      drawingContext.setLineDash([7, 6]);
      line(a.x, a.y, b.x, b.y);
      drawingContext.setLineDash([]);
    } else {
      stroke(showScaleOut ? LOCAL_COLOR : '#5B7FA6');
      strokeWeight(2);
      line(a.x, a.y, b.x, b.y);
    }
  }
}

function drawVertices() {
  for (const v of VERTICES) {
    const p = positions[v.id];
    stroke('#14517F');
    strokeWeight(2);
    fill('#D6E3F0');
    circle(p.x, p.y, 28);
    noStroke();
    fill('black');
    textAlign(CENTER, CENTER);
    textSize(11);
    text(v.id, p.x, p.y);
  }
}

/** Hovering a vertex reports which server holds it; hovering an edge reports
 *  whether it is a local hop or a cross-shard hop. */
function updateHover() {
  hoverText = '';
  if (mouseY > drawHeight) { return; }

  for (const v of VERTICES) {
    const p = positions[v.id];
    if (dist(mouseX, mouseY, p.x, p.y) < 16) {
      hoverText = showScaleOut
        ? v.id + ' lives on Shard ' + (v.shard + 1) + '. Which shard holds a ' +
          'vertex is what decides whether reaching it is cheap or expensive.'
        : v.id + ' lives in the single server’s memory, like every other ' +
          'vertex in this view.';
      return;
    }
  }

  for (const e of EDGES) {
    const a = positions[e[0]];
    const b = positions[e[1]];
    if (distToSegment(mouseX, mouseY, a.x, a.y, b.x, b.y) < 6) {
      if (showScaleOut && isCross(e)) {
        hoverText = e[0] + ' → ' + e[1] + ': CROSS-SHARD hop — roughly ' +
                    '100 to 1000× the cost of a local hop, because the ' +
                    'traversal has to leave the machine and come back.';
      } else {
        hoverText = e[0] + ' → ' + e[1] + ': LOCAL hop — a pointer ' +
                    'dereference in memory, on the order of nanoseconds.';
      }
      return;
    }
  }
}

function distToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) { return dist(px, py, x1, y1); }
  let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;
  t = constrain(t, 0, 1);
  return dist(px, py, x1 + t * dx, y1 + t * dy);
}

function drawInfo() {
  noStroke();
  textAlign(LEFT, TOP);

  if (highlightCross && showScaleOut) {
    fill(CROSS_COLOR);
    textSize(14);
    const crossCount = EDGES.filter(isCross).length;
    text('Cross-shard edges require a network round-trip — much slower than ' +
         'a local pointer hop. ' + crossCount + ' of ' + EDGES.length +
         ' edges here cross a shard boundary.',
         margin, drawHeight + 10, canvasWidth - margin * 2, 46);
    return;
  }

  if (hoverText) {
    fill('black');
    textSize(13);
    text(hoverText, margin, drawHeight + 10, canvasWidth - margin * 2, 48);
    return;
  }

  fill('#868e96');
  textSize(13);
  text(showScaleOut
        ? 'Hover any vertex to see which shard holds it, or any edge to see its ' +
          'relative cost. The cluster has more total memory — and every ' +
          'dashed edge is a bill it pays for that.'
        : 'Hover any vertex or edge. With everything in one machine’s ' +
          'memory, a traversal is a pointer dereference — the cheapest ' +
          'operation a graph database has.',
       margin, drawHeight + 10, canvasWidth - margin * 2, 48);
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
