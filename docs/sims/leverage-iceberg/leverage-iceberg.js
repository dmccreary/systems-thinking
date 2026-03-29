// Leverage Points Iceberg MicroSim
// Interactive visualization of Donella Meadows' 12 Leverage Points
// Using the iceberg metaphor: surface interventions are visible but weak,
// deep interventions are hidden but transformative

// Canvas dimensions
let canvasWidth = 800;
let drawHeight = 520;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;

// Layout
let icebergWidth = 400;
let infoboxX = 420;
let infoboxWidth = 360;
let margin = 20;

// Animation
let waveOffset = 0;
let glowPhase = 0;

// Interaction state
let hoveredLayer = null;
let defaultTextSize = 16;

// Waterline position (percentage from top of iceberg area)
let waterlineY = 0.22;

// Layer data for all 12 leverage points
const layers = [
  {
    level: 12,
    name: "Constants & Numbers",
    shortName: "Numbers",
    zone: "shallow",
    yStart: 0.04,
    yEnd: 0.10,
    color: [232, 244, 248],
    hoverColor: [255, 255, 255],
    anchor: "#level-12-constants-numbers-subsidies",
    description: "Tweaking parameters like tax rates, quotas, and subsidies without changing system structure.",
    examples: ["Carbon tax rate", "Minimum wage amount", "Emission caps"],
    impact: "Low",
    timeToEffect: "Immediate",
    actors: "Politicians, Regulators"
  },
  {
    level: 11,
    name: "Stocks & Buffers",
    shortName: "Stocks",
    zone: "shallow",
    yStart: 0.10,
    yEnd: 0.16,
    color: [212, 238, 245],
    hoverColor: [232, 244, 248],
    anchor: "#level-11-material-stocks-and-flows",
    description: "Changing physical infrastructure, capacity, and material reserves.",
    examples: ["Building renewable plants", "Expanding transit", "Training inspectors"],
    impact: "Low-Medium",
    timeToEffect: "Years",
    actors: "Engineers, Planners"
  },
  {
    level: 10,
    name: "Negative Feedback",
    shortName: "Regulation",
    zone: "shallow",
    yStart: 0.16,
    yEnd: 0.22,
    color: [184, 228, 240],
    hoverColor: [212, 238, 245],
    anchor: "#level-10-regulating-negative-feedback-loops",
    description: "Creating constraints and regulations that prevent the worst outcomes.",
    examples: ["Safety standards", "Environmental limits", "Antitrust enforcement"],
    impact: "Medium",
    timeToEffect: "Months to years",
    actors: "Regulators, Lawyers"
  },
  // --- WATERLINE at 0.22 ---
  {
    level: 9,
    name: "Positive Feedback",
    shortName: "Acceleration",
    zone: "structural",
    yStart: 0.25,
    yEnd: 0.34,
    color: [126, 204, 224],
    hoverColor: [157, 217, 232],
    anchor: "#level-9-driving-positive-feedback-loops",
    description: "Accelerating beneficial self-reinforcing processes that build momentum.",
    examples: ["Feed-in tariffs", "Network effects", "Viral adoption campaigns"],
    impact: "Medium-High",
    timeToEffect: "Months to years",
    actors: "Entrepreneurs, Movement builders"
  },
  {
    level: 8,
    name: "Information Flows",
    shortName: "Information",
    zone: "structural",
    yStart: 0.34,
    yEnd: 0.44,
    color: [91, 189, 208],
    hoverColor: [126, 204, 224],
    anchor: "#level-8-information-flows",
    description: "Changing who knows what, when they know it, and how they can act on it.",
    examples: ["Disclosure requirements", "Whistleblower protections", "Real-time feedback"],
    impact: "High",
    timeToEffect: "Weeks to months",
    actors: "Journalists, Researchers"
  },
  {
    level: 7,
    name: "Rules of the System",
    shortName: "Rules",
    zone: "structural",
    yStart: 0.44,
    yEnd: 0.54,
    color: [58, 173, 194],
    hoverColor: [91, 189, 208],
    anchor: "#level-7-rules-of-the-system",
    description: "Changing the formal and informal rules that define how actors behave.",
    examples: ["Property rights", "Voting rules", "Extended producer responsibility"],
    impact: "High",
    timeToEffect: "Years",
    actors: "Legislators, Courts"
  },
  {
    level: 6,
    name: "Power to Self-Organize",
    shortName: "Power",
    zone: "deep",
    yStart: 0.54,
    yEnd: 0.66,
    color: [32, 144, 168],
    hoverColor: [58, 173, 194],
    anchor: "#level-6-power-to-self-organize-system-structure",
    description: "Changing who makes the rules and how rule-making itself works.",
    examples: ["Worker co-determination", "Community ownership", "Democratic governance"],
    impact: "Very High",
    timeToEffect: "Years to decades",
    actors: "Organizers, Social movements"
  },
  {
    level: 5,
    name: "Goals of the System",
    shortName: "Goals",
    zone: "deep",
    yStart: 0.66,
    yEnd: 0.78,
    color: [24, 107, 128],
    hoverColor: [32, 144, 168],
    anchor: "#level-5-goals-of-the-system",
    description: "Changing what the system is fundamentally trying to achieve.",
    examples: ["Shareholder to stakeholder value", "GDP to wellbeing", "Treatment to prevention"],
    impact: "Transformative",
    timeToEffect: "Decades",
    actors: "Visionaries, B-Corp founders"
  },
  {
    level: 4,
    name: "Paradigms",
    shortName: "Paradigms",
    zone: "transformative",
    yStart: 0.78,
    yEnd: 0.86,
    color: [15, 77, 92],
    hoverColor: [24, 107, 128],
    anchor: "#level-4-mental-models-and-paradigms",
    description: "Changing the shared beliefs and assumptions that create the system.",
    examples: ["Nature as partner vs resource", "Enough vs more", "Cooperation vs competition"],
    impact: "Revolutionary",
    timeToEffect: "Generations",
    actors: "Philosophers, Artists, Scientists"
  },
  {
    level: 3,
    name: "Goals of Paradigms",
    shortName: "Meta-Goals",
    zone: "transformative",
    yStart: 0.86,
    yEnd: 0.91,
    color: [10, 51, 64],
    hoverColor: [15, 77, 92],
    anchor: "#level-4-mental-models-and-paradigms",
    description: "The goals that emerge from paradigms themselves—what a society believes 'success' means.",
    examples: ["What is 'progress'?", "What is a 'good life'?", "What does 'winning' mean?"],
    impact: "Foundational",
    timeToEffect: "Generations",
    actors: "Cultures, Civilizations"
  },
  {
    level: 2,
    name: "Mindset to Change Paradigms",
    shortName: "Mindset",
    zone: "transformative",
    yStart: 0.91,
    yEnd: 0.95,
    color: [6, 30, 40],
    hoverColor: [10, 51, 64],
    anchor: "#level-4-mental-models-and-paradigms",
    description: "The ability to see your own paradigm as a paradigm—and hold beliefs lightly.",
    examples: ["Recognizing assumptions", "Intellectual humility", "Openness to being wrong"],
    impact: "Liberating",
    timeToEffect: "Lifetime practice",
    actors: "Contemplatives, Systems thinkers"
  },
  {
    level: 1,
    name: "Transcending Paradigms",
    shortName: "Transcendence",
    zone: "transformative",
    yStart: 0.95,
    yEnd: 0.98,
    color: [45, 27, 78],
    hoverColor: [61, 43, 94],
    anchor: "#level-4-mental-models-and-paradigms",
    description: "The power to transcend paradigms entirely—no paradigm is 'true', respond appropriately to each moment.",
    examples: ["No fixed position", "Flexible mind", "Appropriate response"],
    impact: "Beyond measurement",
    timeToEffect: "Timeless",
    actors: "Sages, Masters"
  }
];

// Zone colors for legend
const zoneColors = {
  shallow: [184, 228, 240],
  structural: [91, 189, 208],
  deep: [32, 144, 168],
  transformative: [45, 27, 78]
};

const zoneLabels = {
  shallow: "Shallow (Easy, Low Impact)",
  structural: "Structural (Harder, Lasting)",
  deep: "Deep (Systemic Change)",
  transformative: "Transformative (Paradigm Shift)"
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textFont('Arial');

  describe('Interactive iceberg diagram showing Donella Meadows 12 Leverage Points. Layers above the waterline represent easy but low-impact interventions. Deeper layers represent harder but more transformative interventions. Hover over layers to see details.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Update animations
  waveOffset += 0.02;
  glowPhase += 0.03;

  // Background
  background(245, 248, 250);

  // Draw main areas
  drawIceberg();
  drawWaterline();
  drawInfobox();
  drawControlBar();

  // Check for hover
  checkHover();
}

function drawIceberg() {
  let icebergLeft = 20;
  let icebergTop = 40;
  let icebergHeight = drawHeight - 40;

  // Draw title
  fill(40);
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("Leverage Points: Where to Intervene", icebergWidth / 2 + 10, 15);
  textStyle(NORMAL);

  // Draw zone labels on left
  textSize(11);
  textAlign(RIGHT, CENTER);
  fill(100);

  // Draw each layer
  for (let layer of layers) {
    let yTop = icebergTop + layer.yStart * icebergHeight;
    let yBottom = icebergTop + layer.yEnd * icebergHeight;
    let layerHeight = yBottom - yTop;

    // Calculate iceberg width at this depth (wider at bottom)
    let widthTop = getIcebergWidth(layer.yStart, icebergWidth - 40);
    let widthBottom = getIcebergWidth(layer.yEnd, icebergWidth - 40);

    let centerX = icebergLeft + (icebergWidth - 40) / 2 + 20;

    // Check if this layer is hovered
    let isHovered = hoveredLayer === layer;

    // Set color
    let col = isHovered ? layer.hoverColor : layer.color;

    // Add glow for deep layers
    if ((layer.zone === 'deep' || layer.zone === 'transformative') && !isHovered) {
      let glowIntensity = (sin(glowPhase) * 0.15 + 0.85);
      col = [col[0] * glowIntensity, col[1] * glowIntensity, col[2] * glowIntensity];
    }

    // Dim non-hovered layers when something is hovered
    if (hoveredLayer && !isHovered) {
      col = [col[0] * 0.7 + 70, col[1] * 0.7 + 70, col[2] * 0.7 + 70];
    }

    fill(col[0], col[1], col[2]);
    stroke(isHovered ? 50 : 200);
    strokeWeight(isHovered ? 2 : 1);

    // Draw layer as trapezoid
    beginShape();
    vertex(centerX - widthTop / 2, yTop);
    vertex(centerX + widthTop / 2, yTop);
    vertex(centerX + widthBottom / 2, yBottom);
    vertex(centerX - widthBottom / 2, yBottom);
    endShape(CLOSE);

    // Draw level number and short name - consistent format for all layers
    let textY = (yTop + yBottom) / 2;
    fill(layer.zone === 'transformative' || layer.zone === 'deep' ? 255 : 40);
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(layer.level + ": " + layer.shortName, centerX, textY);
    textStyle(NORMAL);
  }

  // Draw "VISIBLE" and "HIDDEN" labels
  let waterY = icebergTop + waterlineY * icebergHeight;
  fill(80);
  textSize(10);
  textAlign(LEFT, CENTER);
  textStyle(ITALIC);
  text("VISIBLE", icebergLeft + 5, waterY - 40);
  text("Easy to reach", icebergLeft + 5, waterY - 25);
  text("HIDDEN", icebergLeft + 5, waterY + 25);
  text("Hard to reach", icebergLeft + 5, waterY + 40);
  textStyle(NORMAL);
}

function getIcebergWidth(yPercent, maxWidth) {
  // Iceberg gets wider as it goes deeper
  // Above waterline: narrower (60-80% of max)
  // Below waterline: wider (80-100% of max)
  if (yPercent < waterlineY) {
    return maxWidth * (0.5 + yPercent * 1.5);
  } else {
    return maxWidth * (0.75 + (yPercent - waterlineY) * 0.35);
  }
}

function drawWaterline() {
  let icebergTop = 60;
  let icebergHeight = drawHeight - 100;
  let waterY = icebergTop + waterlineY * icebergHeight;

  // Draw animated wave
  stroke(100, 180, 220);
  strokeWeight(3);
  noFill();

  beginShape();
  for (let x = 0; x < icebergWidth; x += 3) {
    let waveY = waterY + sin(x * 0.03 + waveOffset) * 4;
    vertex(x + 20, waveY);
  }
  endShape();

  // Second wave for depth
  stroke(100, 180, 220, 100);
  strokeWeight(2);
  beginShape();
  for (let x = 0; x < icebergWidth; x += 3) {
    let waveY = waterY + sin(x * 0.03 + waveOffset + 1) * 3 + 5;
    vertex(x + 20, waveY);
  }
  endShape();

  // Water surface label
  fill(70, 130, 180);
  noStroke();
  textSize(11);
  textAlign(RIGHT, CENTER);
  textStyle(BOLD);
  text("SURFACE", icebergWidth + 10, waterY);
  textStyle(NORMAL);
}

function drawInfobox() {
  let boxX = infoboxX;
  let boxY = 60;
  let boxWidth = min(infoboxWidth, canvasWidth - infoboxX - 20);
  let boxHeight = drawHeight - 100;

  // Background
  fill(255);
  stroke(220);
  strokeWeight(1);
  rect(boxX, boxY, boxWidth, boxHeight, 8);

  if (hoveredLayer) {
    // Draw layer info
    drawLayerInfo(hoveredLayer, boxX, boxY, boxWidth, boxHeight);
  } else {
    // Draw default intro text
    drawIntroText(boxX, boxY, boxWidth, boxHeight);
  }
}

function drawIntroText(x, y, w, _h) {
  let padding = 20;
  let textX = x + padding;
  let textY = y + padding;
  let textW = w - padding * 2;

  // Title
  fill(40);
  textSize(18);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text("The Iceberg Model", x + w/2, textY);
  textStyle(NORMAL);
  textY += 35;

  // Intro paragraph
  fill(60);
  textSize(13);
  textAlign(LEFT, TOP);
  textLeading(20);

  let intro = "Most intervention attempts focus on what's visible above the waterline: numbers, regulations, quick fixes.\n\nBut the real leverage lies beneath: in rules, power structures, goals, and the paradigms that shape how we see the world.";
  text(intro, textX, textY, textW, 120);
  textY += 130;

  // Instruction
  fill(100);
  textSize(12);
  textStyle(ITALIC);
  text("Hover over any layer to explore.", textX, textY);
  text("Click to dive deeper.", textX, textY + 18);
  textStyle(NORMAL);
  textY += 50;

  // Zone legend
  fill(40);
  textSize(13);
  textStyle(BOLD);
  text("Zones:", textX, textY);
  textStyle(NORMAL);
  textY += 25;

  textSize(11);
  let zones = ['shallow', 'structural', 'deep', 'transformative'];
  for (let zone of zones) {
    // Color swatch
    fill(zoneColors[zone][0], zoneColors[zone][1], zoneColors[zone][2]);
    stroke(180);
    strokeWeight(1);
    rect(textX, textY - 6, 14, 14, 2);

    // Label
    fill(60);
    noStroke();
    textAlign(LEFT, CENTER);
    text(zoneLabels[zone], textX + 22, textY);
    textY += 22;
  }
}

function drawLayerInfo(layer, x, y, w, h) {
  let padding = 20;
  let textX = x + padding;
  let textY = y + padding;
  let textW = w - padding * 2;

  // Zone color bar on left
  fill(zoneColors[layer.zone][0], zoneColors[layer.zone][1], zoneColors[layer.zone][2]);
  noStroke();
  rect(x, y, 6, h, 8, 0, 0, 8);

  // Level number
  fill(100);
  textSize(14);
  textAlign(LEFT, TOP);
  text("LEVEL " + layer.level, textX + 10, textY);
  textY += 22;

  // Layer name
  fill(40);
  textSize(20);
  textStyle(BOLD);
  text(layer.name, textX + 10, textY);
  textStyle(NORMAL);
  textY += 35;

  // Divider
  stroke(230);
  strokeWeight(1);
  line(textX + 10, textY, x + w - padding, textY);
  noStroke();
  textY += 15;

  // Description
  fill(60);
  textSize(13);
  textAlign(LEFT, TOP);
  textLeading(20);
  text(layer.description, textX + 10, textY, textW - 20, 80);
  textY += 75;

  // Examples section
  fill(40);
  textSize(12);
  textStyle(BOLD);
  text("EXAMPLES", textX + 10, textY);
  textStyle(NORMAL);
  textY += 20;

  fill(70);
  textSize(12);
  for (let example of layer.examples) {
    text("• " + example, textX + 15, textY);
    textY += 20;
  }
  textY += 10;

  // Divider
  stroke(230);
  line(textX + 10, textY, x + w - padding, textY);
  noStroke();
  textY += 15;

  // Metrics
  textSize(12);

  // Impact
  fill(40);
  textStyle(BOLD);
  text("Impact: ", textX + 10, textY);
  textStyle(NORMAL);
  fill(getImpactColor(layer.impact));
  text(layer.impact, textX + 65, textY);
  textY += 22;

  // Time to effect
  fill(40);
  textStyle(BOLD);
  text("Time: ", textX + 10, textY);
  textStyle(NORMAL);
  fill(70);
  text(layer.timeToEffect, textX + 65, textY);
  textY += 22;

  // Actors
  fill(40);
  textStyle(BOLD);
  text("Actors: ", textX + 10, textY);
  textStyle(NORMAL);
  fill(70);
  text(layer.actors, textX + 65, textY);
  textY += 35;

  // Click instruction
  fill(70, 130, 180);
  textSize(13);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Click to learn more →", x + w/2, textY);
  textStyle(NORMAL);
}

function getImpactColor(impact) {
  switch(impact) {
    case "Low": return color(150, 150, 150);
    case "Low-Medium": return color(130, 160, 130);
    case "Medium": return color(100, 150, 100);
    case "Medium-High": return color(70, 140, 70);
    case "High": return color(50, 130, 50);
    case "Very High": return color(30, 120, 80);
    case "Transformative": return color(20, 100, 120);
    case "Revolutionary": return color(100, 50, 150);
    case "Beyond measurement": return color(120, 60, 160);
    default: return color(100);
  }
}

function drawControlBar() {
  // Control bar background
  fill(255);
  stroke(220);
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Instructions
  fill(80);
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text("Hover to explore  •  Click any layer to learn more in the chapter", canvasWidth / 2, drawHeight + controlHeight / 2);
}

function checkHover() {
  let icebergLeft = 20;
  let icebergTop = 60;
  let icebergHeight = drawHeight - 100;

  hoveredLayer = null;

  // Check if mouse is in iceberg area
  if (mouseX < icebergLeft || mouseX > icebergWidth + 20 || mouseY < icebergTop || mouseY > icebergTop + icebergHeight) {
    cursor(ARROW);
    return;
  }

  // Find which layer mouse is over
  for (let layer of layers) {
    let yTop = icebergTop + layer.yStart * icebergHeight;
    let yBottom = icebergTop + layer.yEnd * icebergHeight;

    if (mouseY >= yTop && mouseY <= yBottom) {
      // Check horizontal bounds (iceberg shape)
      let yPercent = (mouseY - icebergTop) / icebergHeight;
      let layerWidth = getIcebergWidth(yPercent, icebergWidth - 40);
      let centerX = icebergLeft + (icebergWidth - 40) / 2 + 20;

      if (mouseX >= centerX - layerWidth/2 && mouseX <= centerX + layerWidth/2) {
        hoveredLayer = layer;
        cursor(HAND);
        return;
      }
    }
  }

  cursor(ARROW);
}

function mousePressed() {
  if (hoveredLayer && hoveredLayer.anchor) {
    // Navigate to the anchor in the chapter
    window.location.href = hoveredLayer.anchor;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 850);
    // Adjust infobox position for narrower screens
    if (canvasWidth < 750) {
      icebergWidth = canvasWidth * 0.5;
      infoboxX = icebergWidth + 20;
      infoboxWidth = canvasWidth - infoboxX - 20;
    } else {
      icebergWidth = 400;
      infoboxX = 420;
      infoboxWidth = min(360, canvasWidth - infoboxX - 20);
    }
  }
}
