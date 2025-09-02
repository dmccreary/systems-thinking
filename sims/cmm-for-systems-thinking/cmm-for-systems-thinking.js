// Systems Thinking Strategic Decision Maturity Model visualization (sketch.js)

let containerWidth;
const canvasHeight = 500; // Fixed vertical size
let canvasWidth; // dynamically calculated based on container width

let layers = [];
let descriptions = [];
let currentHover = -1;

// Layout parameters (will be recalculated)
let m = 20;        // margin around steps
let sh = 60;       // step height (fixed)
let stepUnit = 0;  // will be calculated as (canvasWidth - 2*m) / 5
let infoboxYoffset = 390;

function setup() {
  // Calculate initial container width
  updateCanvasSize();
  // Create canvas using the current container width
  // Always put the canvas in the main to be compatable with the p5.js editor
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Define descriptions for Systems Thinking Strategic Decision maturity levels
  descriptions = [
    "Level 1 - Linear: Organizations make decisions based on direct cause-and-effect thinking. Strategic planning focuses on immediate outcomes without considering system-wide impacts. Decision-makers rely on intuition and past experience, with little awareness of interconnections. Problems are addressed in isolation, often creating unintended consequences elsewhere in the organization. Few people have ever heard of a CLD.",
    
    "Level 2 - Aware: Leadership begins recognizing that organizational issues are interconnected. Some consideration of secondary effects in strategic planning, though analysis remains limited. Basic stakeholder mapping. occurs, and there's growing awareness that quick fixes often backfire. Decision-making still primarily reactive, but questions about root causes are starting to emerge.  Staff begins to recognize strong systems thinking skills among their peers. CLDs appear on whiteboards.",
    
    "Level 3 - Analytical: Organizations systematically map key relationships and feedback loops before major decisions. Strategic planning includes scenario analysis and considers multiple perspectives. Root cause analysis is standard practice, and teams regularly examine mental models and assumptions. Decision-making processes explicitly consider delays and unintended consequences.  Formal systems thinking skills assessments are possible.  Over 50% of staff can read a CLD.",
    
    "Level 4 - Integrated: Systems thinking is embedded throughout strategic decision-making processes. Organizations use systems archetypes to understand recurring patterns and identify leverage points for maximum impact. Cross-functional collaboration is standard, with shared systems thinking vocabulary. Decision-making explicitly balances short-term needs with long-term system health and sustainability. CLDs are common in business funding proposals.",
    
    "Level 5 - Transformative: Systems thinking fundamentally shapes organizational culture and identity. Strategic decisions consistently consider whole-system optimization over local optimization. The organization actively reshapes its environment and industry systems. Decision-making processes model complexity, embrace paradox, and continuously evolve mental models. The organization serves as a systems thinking exemplar for others.  CLDs are popular in staff tattoos."
  ];

  // Build initial layout
  updateLayout();

  // Accessibility description
  describe(
    'Strategic Systems Thinking Capability Maturity Model (CMM) showing five levels of organizational maturity from Linear to Transformative, displayed as ascending steps with detailed descriptions available on hover.',
    LABEL
  );
}

function draw() {
  background('aliceblue');
  
  // Title
  fill(50);
  textSize(28);
  textAlign(CENTER, TOP);
  text("Strategic Systems Thinking Capability Maturity Model", canvasWidth / 2, 10);
  
  // Subtitle
  textSize(16);
  fill(100);
  text("Hover over each level to explore characteristics", canvasWidth / 2, 45);
  
  // Draw each layer
  textSize(18);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < layers.length; i++) {
    let l = layers[i];
    
    if (i === currentHover) {
      stroke(50);
      strokeWeight(5);
    } else {
      stroke(100);
      strokeWeight(2);
    }
    
    // draw the box
    fill(l.color);
    // leave some room for the border
    rect(l.x+3, l.y+3, l.w, l.h-2, 7);
    
    // draw the text
    fill(l.tcolor);
    noStroke();
    text(l.level, l.x + l.w / 2, l.y + l.h / 2);
  }
  
  // Infobox description area
  if (currentHover !== -1) {
    fill(255, 255, 255, 240);
    stroke(150);
    strokeWeight(1);
    rect(10, infoboxYoffset, canvasWidth - 20, 95, 5);
    fill(0);
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);
    text(descriptions[currentHover], 20, infoboxYoffset + 5, canvasWidth - 40, 120);
  } else {
    fill(100);
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);
    text(
      "Move your mouse over each level to see detailed characteristics",
      canvasWidth / 2,
      infoboxYoffset
    );
  }
}

function mouseMoved() {
  currentHover = -1;
  for (let i = 0; i < layers.length; i++) {
    let l = layers[i];
    if (
      mouseX >= l.x &&
      mouseX <= l.x + l.w &&
      mouseY >= l.y &&
      mouseY <= l.y + l.h
    ) {
      currentHover = i;
      break;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateLayout();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    containerWidth = Math.floor(container.getBoundingClientRect().width);
  } else {
    containerWidth = windowWidth; // fallback
  }
  canvasWidth = containerWidth;
}

function updateLayout() {
  // Recalculate unit width for steps
  m = max(20, containerWidth * 0.03);
  stepUnit = (containerWidth - 2 * m) / 5;
  
  // Rebuild the layers array based on current containerWidth
  layers = [
    {
      x: m,
      y: sh * 4 + 2 * m + 20, // Added offset for title
      w: stepUnit * 5,
      h: sh,
      level: "Level 1 - Linear Thinking",
      color: "#E74C3C",
      tcolor: "white"
    },
    {
      x: m + stepUnit * 1,
      y: sh * 3 + 2 * m + 20,
      w: stepUnit * 4,
      h: sh,
      level: "Level 2 - Some Teams Aware of Systems Thining",
      color: "#F39C12",
      tcolor: "white"
    },
    {
      x: m + stepUnit * 2,
      y: sh * 2 + 2 * m + 20,
      w: stepUnit * 3,
      h: sh,
      level: "Level 3 - Stragegic Impact Analysis",
      color: "#F1C40F",
      tcolor: "black"
    },
    {
      x: m + stepUnit * 3,
      y: sh * 1 + 2 * m + 20,
      w: stepUnit * 2,
      h: sh,
      level: "Level 4 - Integrated",
      color: "#27AE60",
      tcolor: "white"
    },
    {
      x: stepUnit * 4 - 30,
      y: 2 * m + 20,
      w: stepUnit * 1 + m + 30,
      h: sh,
      level: "L5 - Transformative",
      color: "#2980B9",
      tcolor: "white"
    }
  ];
}