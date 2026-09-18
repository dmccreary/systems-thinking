// Filter Bubble Formation Simulator MicroSim
// CANVAS_HEIGHT: 472
// Chapter 25: Systems Design, Emerging Technology, and Practice
// Learning objective: apply the social feed ranking loop by repeatedly
// selecting content, and observe the resulting decline in topic diversity that
// defines a filter bubble (Bloom: Apply).
//
// The ranking rule contains no bias of any kind: it simply shows more of what
// was engaged with. The narrowing is produced by the loop, not by the rule.

let containerWidth;
let canvasWidth = 700;
let cardsHeight = 180;
let chartHeight = 175;
let infoHeight = 72;
let drawHeight = cardsHeight + chartHeight + infoHeight;
let controlHeight = 45;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

let nextButton, resetButton;

const CATEGORIES = [
  { name: 'Sports',     color: '#C62828' },
  { name: 'Politics',   color: '#2E5A87' },
  { name: 'Cooking',    color: '#2E8B57' },
  { name: 'Technology', color: '#6A4C93' },
  { name: 'Travel',     color: '#B8611A' }
];

const CARDS_PER_ROUND = 8;
const LEARNING_RATE = 0.9;

let weights = [];         // one per category; drives the sampling probability
let clicks = [];          // cumulative clicks per category
let cards = [];           // the current round's 8 cards
let round = 1;
let roundClicks = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  nextButton = createButton('Next Round');
  nextButton.position(10, drawHeight + 8);
  nextButton.mousePressed(nextRound);

  resetButton = createButton('Reset Feed');
  resetButton.position(105, drawHeight + 8);
  resetButton.mousePressed(resetFeed);

  resetFeed();

  describe(
    'A simulated content feed showing eight cards per round, each labeled with ' +
    'one of five topic categories. Clicking a card counts as engaging with it. ' +
    'A bar chart below shows the topic mix the feed is currently drawing from, ' +
    'which narrows round by round as the ranking rule follows engagement, ' +
    'demonstrating how a filter bubble forms from ordinary behavior.'
  );
}

function resetFeed() {
  weights = CATEGORIES.map(() => 1);
  clicks = CATEGORIES.map(() => 0);
  round = 1;
  roundClicks = 0;
  dealCards();
}

/** Sample this round's cards from the current weights. */
function dealCards() {
  const total = weights.reduce((a, b) => a + b, 0);
  cards = [];
  for (let i = 0; i < CARDS_PER_ROUND; i++) {
    let r = Math.random() * total;
    let idx = 0;
    for (let c = 0; c < weights.length; c++) {
      r -= weights[c];
      if (r <= 0) { idx = c; break; }
    }
    cards.push({ cat: idx, clicked: false });
  }
  roundClicks = 0;
}

function nextRound() {
  // The reinforcing ranking rule, in one line: categories engaged with get
  // more weight, so they get shown more, so they get engaged with more.
  for (let c = 0; c < CATEGORIES.length; c++) {
    weights[c] += clicks[c] * LEARNING_RATE;
  }
  clicks = CATEGORIES.map(() => 0);
  round++;
  dealCards();
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, cardsHeight + chartHeight);

  fill('white');
  stroke('silver');
  rect(0, cardsHeight + chartHeight, canvasWidth, infoHeight);

  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(20);
  text('Filter Bubble Formation Simulator', canvasWidth / 2, 6);
  fill('#6c757d');
  textSize(13);
  text('Round ' + round + ' — click the cards you would actually open',
       canvasWidth / 2, 32);

  drawCards();
  drawChart();
  drawInfo();
  drawControlHint();
}

function cardBox(i) {
  const usable = canvasWidth - margin * 2;
  const gap = 8;
  const w = (usable - gap * (CARDS_PER_ROUND - 1)) / CARDS_PER_ROUND;
  return { x: margin + i * (w + gap), y: 60, w: w, h: 100 };
}

function drawCards() {
  for (let i = 0; i < cards.length; i++) {
    const c = cards[i];
    const b = cardBox(i);
    const cat = CATEGORIES[c.cat];

    stroke(cat.color);
    strokeWeight(c.clicked ? 4 : 2);
    fill(c.clicked ? lerpColor(color(cat.color), color('white'), 0.55)
                   : lerpColor(color(cat.color), color('white'), 0.86));
    rect(b.x, b.y, b.w, b.h, 7);

    noStroke();
    fill(c.clicked ? 'white' : cat.color);
    textAlign(CENTER, CENTER);
    textSize(min(12, b.w * 0.20));
    text(cat.name, b.x + 3, b.y, b.w - 6, b.h - 20);

    if (c.clicked) {
      noStroke();
      fill('white');
      textSize(10);
      text('engaged', b.x + b.w / 2, b.y + b.h - 14);
    }
  }
}

function drawChart() {
  const top = cardsHeight + 10;
  const h = chartHeight - 46;
  const usable = canvasWidth - margin * 2;
  const barW = usable / CATEGORIES.length;
  const total = weights.reduce((a, b) => a + b, 0);

  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  text('Topic mix the feed is drawing from', margin, top - 2);

  const baseY = top + h + 4;

  for (let c = 0; c < CATEGORIES.length; c++) {
    const share = weights[c] / total;
    const bh = share * h * 1.6;
    const x = margin + c * barW;
    const cat = CATEGORIES[c];

    // bar
    noStroke();
    fill(cat.color);
    rect(x + barW * 0.16, baseY - min(bh, h), barW * 0.68, min(bh, h), 3);

    // percentage above the bar
    fill('#212529');
    textAlign(CENTER, BOTTOM);
    textSize(12);
    text(nf(share * 100, 1, 1) + '%', x + barW / 2, baseY - min(bh, h) - 2);

    // category label below the axis
    fill(share < 0.02 ? '#adb5bd' : cat.color);
    textAlign(CENTER, TOP);
    textSize(11);
    text(cat.name, x + barW / 2, baseY + 4);
    if (share < 0.02) {
      fill('#adb5bd');
      textSize(10);
      text('(gone)', x + barW / 2, baseY + 18);
    }
  }

  stroke('#ced4da');
  strokeWeight(1);
  line(margin, baseY, canvasWidth - margin, baseY);
}

/** Shannon evenness: 1.0 when all five categories are equally likely,
 *  approaching 0 as the feed collapses onto one. */
function diversity() {
  const total = weights.reduce((a, b) => a + b, 0);
  let h = 0;
  for (const w of weights) {
    const p = w / total;
    if (p > 0) { h -= p * Math.log(p); }
  }
  return h / Math.log(CATEGORIES.length);
}

function drawInfo() {
  const d = diversity();
  const gone = weights.filter(w => w / weights.reduce((a, b) => a + b, 0) < 0.02).length;
  const y = cardsHeight + chartHeight + 8;

  noStroke();
  textAlign(LEFT, TOP);
  fill('black');
  textSize(13);
  text('Topic diversity: ' + nf(d * 100, 1, 0) + '%' +
       (gone ? '   — ' + gone + ' categor' + (gone === 1 ? 'y has' : 'ies have') +
               ' effectively disappeared from the feed' : ''),
       margin, y);

  fill(d < 0.55 ? '#C62828' : '#6c757d');
  textSize(12);
  const msg = d < 0.45
    ? 'This is a filter bubble. Nothing in the ranking rule is biased — it ' +
      'only shows more of what you engaged with. The narrowing came from the loop.'
    : (d < 0.75
        ? 'The mix is starting to narrow. Notice you never chose to stop seeing ' +
          'the other topics; they were simply outbid.'
        : 'Click a few cards, then press Next Round. Engaging with a category ' +
          'makes it more likely to appear next time.');
  text(msg, margin, y + 20, canvasWidth - margin * 2, 44);
}

function drawControlHint() {
  noStroke();
  fill('#495057');
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Clicks this round: ' + roundClicks, 200, drawHeight + controlHeight / 2);
}

function mousePressed() {
  if (mouseY > cardsHeight) { return; }
  for (let i = 0; i < cards.length; i++) {
    const b = cardBox(i);
    if (mouseX > b.x && mouseX < b.x + b.w && mouseY > b.y && mouseY < b.y + b.h) {
      if (!cards[i].clicked) {
        cards[i].clicked = true;
        clicks[cards[i].cat]++;
        roundClicks++;
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
