// Stakeholder Power/Interest Grid - p5.js
// 2x2 matrix with draggable stakeholder dots
// CANVAS_HEIGHT: 600

let canvasWidth = 720;
let drawHeight = 540;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;

const stakeholders = [
  { id: 'cfo',     name: 'CFO',                   x: 0.85, y: 0.80, role: 'Chief Financial Officer', concerns: 'Budget overruns', cad: 'Weekly steering', attitude: 'neutral' },
  { id: 'sponsor', name: 'Project Sponsor',       x: 0.75, y: 0.95, role: 'Executive sponsor',       concerns: 'On-time delivery', cad: 'Weekly 1-on-1', attitude: 'champion' },
  { id: 'users',   name: 'End Users',             x: 0.90, y: 0.40, role: 'Daily system users',      concerns: 'Workflow disruption', cad: 'Bi-weekly demos', attitude: 'supporter' },
  { id: 'itdir',   name: 'IT Director',           x: 0.65, y: 0.85, role: 'Owns IT operations',     concerns: 'Production stability', cad: 'Daily status', attitude: 'supporter' },
  { id: 'vendor',  name: 'Vendor Account Mgr',    x: 0.55, y: 0.50, role: 'External vendor',         concerns: 'Renewal upsell', cad: 'Monthly QBR', attitude: 'neutral' },
  { id: 'compl',   name: 'Compliance Officer',    x: 0.40, y: 0.85, role: 'Regulatory compliance',  concerns: 'Audit findings', cad: 'Quarterly review', attitude: 'skeptic' },
  { id: 'union',   name: 'Union Steward',         x: 0.30, y: 0.65, role: 'Worker representation',  concerns: 'Job displacement', cad: 'Ad-hoc', attitude: 'skeptic' },
  { id: 'helpdesk',name: 'Help Desk Lead',        x: 0.70, y: 0.30, role: 'Support team manager',   concerns: 'Ticket volume', cad: 'Weekly sync', attitude: 'supporter' },
  { id: 'power',   name: 'Power User',            x: 0.85, y: 0.25, role: 'Departmental SME',       concerns: 'Workflow features', cad: 'Demo + UAT', attitude: 'champion' },
  { id: 'intern',  name: 'Intern Team',           x: 0.20, y: 0.15, role: 'Summer interns',          concerns: 'Learning experience', cad: 'Weekly mentor', attitude: 'neutral' },
  { id: 'board',   name: 'Board of Directors',    x: 0.20, y: 0.95, role: 'Governance body',        concerns: 'Strategic ROI', cad: 'Quarterly board pack', attitude: 'neutral' },
  { id: 'auditor', name: 'External Auditor',      x: 0.30, y: 0.50, role: 'Independent audit',      concerns: 'Audit trail completeness', cad: 'Annual', attitude: 'neutral' }
];

const attitudeColor = { champion: '#43A047', supporter: '#26A69A', neutral: '#90A4AE', skeptic: '#FFA000', blocker: '#C62828' };

let dragging = null;
let selected = null;
let whatIf = false;
let whatIfBtn;

function setup() {
  updateCanvasSize();
  const c = createCanvas(canvasWidth, canvasHeight);
  c.parent(document.querySelector('main'));

  whatIfBtn = createButton('What-If: Public Incident');
  whatIfBtn.position(20, drawHeight + 12);
  whatIfBtn.parent(document.querySelector('main'));
  whatIfBtn.mousePressed(() => { whatIf = !whatIf; whatIfBtn.html(whatIf ? 'Reset Positions' : 'What-If: Public Incident'); applyWhatIf(); });
  styleBtn(whatIfBtn, '#C2185B');

  describe('Stakeholder power-interest grid with draggable dots and engagement strategy panel.');
}
function styleBtn(b, bg) { b.style('background-color', bg); b.style('color', 'white'); b.style('border', 'none'); b.style('padding', '6px 10px'); b.style('border-radius', '4px'); b.style('cursor', 'pointer'); b.style('font-size', '11px'); }

let originalPos = null;
function applyWhatIf() {
  if (whatIf) {
    originalPos = stakeholders.map(s => ({ x: s.x, y: s.y }));
    // Compliance interest spikes; Auditor interest spikes; Sponsor power decays
    stakeholders.find(s => s.id === 'compl').x = 0.85;
    stakeholders.find(s => s.id === 'auditor').x = 0.80;
    stakeholders.find(s => s.id === 'sponsor').y = 0.55;
  } else if (originalPos) {
    stakeholders.forEach((s, i) => { s.x = originalPos[i].x; s.y = originalPos[i].y; });
  }
}

function gridGeo() {
  const padL = 80, padT = 60, padR = 40, padB = 40;
  return { x: padL, y: padT, w: canvasWidth - padL - padR, h: drawHeight - padT - padB - 100 };
}

function draw() {
  updateCanvasSize();
  background('#fafbfc');
  noStroke(); fill('#1a3a6c');
  textSize(15); textStyle(BOLD); textAlign(CENTER, TOP);
  text('Stakeholder Power/Interest Grid', canvasWidth / 2, 12);
  textStyle(NORMAL);

  const g = gridGeo();
  // Quadrant fills
  fill('#FFE0B2'); noStroke(); rect(g.x, g.y, g.w / 2, g.h / 2);          // top-left Keep Satisfied (coral tint)
  fill('#A5D6A7'); rect(g.x + g.w / 2, g.y, g.w / 2, g.h / 2);              // top-right Manage Closely (emerald)
  fill('#ECEFF1'); rect(g.x, g.y + g.h / 2, g.w / 2, g.h / 2);              // bottom-left Monitor
  fill('#F8BBD0'); rect(g.x + g.w / 2, g.y + g.h / 2, g.w / 2, g.h / 2);    // bottom-right Keep Informed (magenta tint)

  // Quadrant labels
  fill('#212121'); noStroke(); textSize(11); textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('Keep Satisfied', g.x + g.w / 4, g.y + g.h / 4 - 10);
  text('Manage Closely', g.x + 3 * g.w / 4, g.y + g.h / 4 - 10);
  text('Monitor', g.x + g.w / 4, g.y + 3 * g.h / 4 - 10);
  text('Keep Informed', g.x + 3 * g.w / 4, g.y + 3 * g.h / 4 - 10);
  textStyle(NORMAL);

  // Axes
  stroke('#37474F'); strokeWeight(2);
  line(g.x, g.y, g.x, g.y + g.h);
  line(g.x, g.y + g.h, g.x + g.w, g.y + g.h);
  // Mid-lines
  stroke('#90A4AE'); strokeWeight(1); drawingContext.setLineDash([4, 4]);
  line(g.x + g.w / 2, g.y, g.x + g.w / 2, g.y + g.h);
  line(g.x, g.y + g.h / 2, g.x + g.w, g.y + g.h / 2);
  drawingContext.setLineDash([]);

  // Axis labels
  fill('#37474F'); noStroke(); textSize(10);
  textAlign(CENTER, TOP); text('Interest in Project →', g.x + g.w / 2, g.y + g.h + 8);
  push(); translate(g.x - 12, g.y + g.h / 2); rotate(-PI/2);
  textAlign(CENTER, CENTER); text('Power → ', 0, 0); pop();

  // Dots
  for (const s of stakeholders) {
    const px = g.x + s.x * g.w;
    const py = g.y + (1 - s.y) * g.h;
    fill(attitudeColor[s.attitude]); stroke('#212121'); strokeWeight(1);
    circle(px, py, selected && selected.id === s.id ? 18 : 12);
    fill('#212121'); noStroke(); textSize(8.5); textAlign(CENTER, BOTTOM);
    text(s.name, px, py - 9);
  }

  // Side panel
  fill('#fff'); stroke('#90A4AE'); strokeWeight(1);
  rect(20, drawHeight - 100, canvasWidth - 40, 90, 6);
  if (selected) {
    fill('#1a3a6c'); noStroke(); textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text(selected.name + ' — ' + selected.role, 35, drawHeight - 92);
    textStyle(NORMAL); fill('#212121'); textSize(10);
    text('Concerns: ' + selected.concerns, 35, drawHeight - 70);
    text('Preferred cadence: ' + selected.cad, 35, drawHeight - 54);
    const quad = whichQuadrant(selected);
    fill('#26A69A'); textStyle(BOLD); textSize(11);
    text('Suggested strategy: ' + quad, 35, drawHeight - 34);
    textStyle(NORMAL);
  } else {
    fill('#666'); noStroke(); textSize(11); textAlign(CENTER, TOP); textStyle(ITALIC);
    text('Drag any stakeholder dot to reposition. Click a dot for details and engagement strategy.', canvasWidth / 2, drawHeight - 70);
    textStyle(NORMAL);
  }
}

function whichQuadrant(s) {
  if (s.y > 0.5 && s.x > 0.5) return 'Manage Closely';
  if (s.y > 0.5 && s.x <= 0.5) return 'Keep Satisfied';
  if (s.y <= 0.5 && s.x > 0.5) return 'Keep Informed';
  return 'Monitor';
}

function mousePressed() {
  const g = gridGeo();
  for (const s of stakeholders) {
    const px = g.x + s.x * g.w;
    const py = g.y + (1 - s.y) * g.h;
    if (dist(mouseX, mouseY, px, py) < 12) {
      dragging = s;
      selected = s;
      return;
    }
  }
  selected = null;
}
function mouseReleased() { dragging = null; }
function mouseDragged() {
  if (dragging) {
    const g = gridGeo();
    dragging.x = constrain((mouseX - g.x) / g.w, 0, 1);
    dragging.y = constrain(1 - (mouseY - g.y) / g.h, 0, 1);
  }
}

function windowResized() { updateCanvasSize(); resizeCanvas(canvasWidth, canvasHeight); }
function updateCanvasSize() {
  const c = document.querySelector('main');
  if (c) canvasWidth = c.offsetWidth;
}
