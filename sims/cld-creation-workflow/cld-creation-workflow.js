// CLD Creation Workflow Interactive Diagram
// A visual guide showing the 12 steps for creating effective Causal Loop Diagrams

// Global layout variables
let containerWidth;
let containerHeight = 580;
let canvasWidth = 800;
let margin = 30;

// Box and diagram styling
let steps = [];
let outputs = [];
let currentHover = -1;
let lineStrokeWeight = 2;
let arrowSize = 8;

// Box sizes
let boxHeight = 70;
let boxWidth = 150;
const defaultTextSize = 14;

// Layout constants
const row1Y = 100;  // Core Process Steps
const row2Y = 220;  // Analysis & Validation
const row3Y = 340;  // Documentation & Refinement
const row4Y = 410;  // Educational Content

// Layout helpers
const lm = 0.02;    // Left margin
const pcw = 0.22;   // Column width fraction

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    
    updateLayout();
    
    describe('Interactive workflow diagram showing 12 steps for creating Causal Loop Diagrams, organized in 4 rows: Core Process, Analysis & Validation, Documentation & Refinement, and Educational Content. Hover for details.');
}

function updateLayout() {
    // Responsive dimensions
    const margin = max(20, containerWidth * 0.03);
    boxWidth = containerWidth * 0.15;
    boxHeight = 60;
    
    if (containerWidth < 600) {
        boxWidth = containerWidth * 0.20;
        boxHeight = 50;
    }

    // Core Process Steps (Row 1)
    steps = [
        {
            x: containerWidth * 0.015,
            y: row1Y,
            w: boxWidth,
            h: boxHeight,
            label: 'Step 1:\nDefine Problem\n& Boundaries',
            color: '#FF6B6B',
            tcolor: 'white',
            description: 'Clearly articulate the problem and establish system boundaries. Define the time horizon, key stakeholders, and what will be included or excluded from analysis.'
        },
        {
            x: containerWidth * 0.21,
            y: row1Y,
            w: boxWidth,
            h: boxHeight,
            label: 'Step 2:\nIdentify Key\nVariables',
            color: '#4ECDC4',
            tcolor: 'white',
            description: 'Brainstorm important variables, conditions, and outcomes. Focus on elements that can change over time: stocks, variables, conditions, and outcomes.'
        },
        {
            x: containerWidth * 0.41,
            y: row1Y,
            w: boxWidth,
            h: boxHeight,
            label: 'Step 3:\nEstablish Causal\nRelationships',
            color: '#45B7D1',
            tcolor: 'white',
            description: 'Determine cause-and-effect relationships between variables. Define polarity (positive/negative), strength, and any significant time delays.'
        },
        {
            x: containerWidth * 0.61,
            y: row1Y,
            w: boxWidth,
            h: boxHeight,
            label: 'Step 4:\nIdentify Feedback\nLoops',
            color: '#96CEB4',
            tcolor: 'white',
            description: 'Look for circular chains of causality. Identify reinforcing loops (exponential change) and balancing loops (stability-seeking behavior).'
        },
        {
            x: containerWidth * 0.81,
            y: row1Y,
            w: boxWidth,
            h: boxHeight,
            label: 'Step 5:\nPlan Visual\nLayout',
            color: '#FFEAA7',
            tcolor: 'black',
            description: 'Design spatial arrangement before implementation. Consider flow direction, loop visibility, and consistent spacing for clarity.'
        }
    ];

    // Analysis & Validation (Row 2)
    let analysisSteps = [
        {
            x: containerWidth * .015,
            y: row2Y,
            w: boxWidth,
            h: boxHeight,
            label: 'Step 6:\nCreate Technical\nImplementation',
            color: '#DDA0DD',
            tcolor: 'black',
            description: 'Translate conceptual model into JSON format using the schema structure. Define nodes with positions, types, and metadata.'
        },
        {
            x: containerWidth * 0.21,
            y: row2Y,
            w: boxWidth + 5,
            h: boxHeight,
            label: 'Step 7:\nAdd Loop Symbols\n& Metadata',
            color: '#98D8C8',
            tcolor: 'black',
            description: 'Position R/B loop symbols at visual centers of feedback loops. Add comprehensive metadata for educational use.'
        },
        {
            x: containerWidth * 0.41,
            y: row2Y,
            w: boxWidth,
            h: boxHeight,
            label: 'Step 8:\nValidate & Test\nYour Model',
            color: '#F7DC6F',
            tcolor: 'black',
            description: 'Test the model rigorously through scenario analysis, loop dominance testing, and stakeholder review for accuracy.'
        },
        {
            x: containerWidth * 0.61,
            y: row2Y,
            w: boxWidth,
            h: boxHeight,
            label: 'Step 9:\nIdentify Leverage\nPoints',
            color: '#BB8FCE',
            tcolor: 'white',
            description: 'Use Meadows\' framework to identify high-impact intervention points where small changes create large system improvements.'
        },
        {
            x: containerWidth * 0.81,
            y: row2Y,
            w: boxWidth,
            h: boxHeight,
            label: 'Step 10:\nDevelop\nLesson Plan',
            color: '#85C1E9',
            tcolor: 'black',
            description: 'Create discussion questions, key insights, common misconceptions, and extension activities to support learning.'
        }
    ];

    // Documentation & Refinement (Row 3)
    let docSteps = [
        {
            x: containerWidth * 0.22,
            y: row3Y,
            w: boxWidth + 20,
            h: boxHeight,
            label: 'Step 11:\nDocument Process\n& Assumptions',
            color: '#F8C471',
            tcolor: 'black',
            description: 'Create comprehensive documentation explaining modeling decisions, assumptions, data sources, simplifications, and limitations.'
        },
        {
            x: containerWidth * 0.56,
            y: row3Y,
            w: boxWidth,
            h: boxHeight,
            label: 'Step 12:\nIterate &\nRefine',
            color: '#82E0AA',
            tcolor: 'black',
            description: 'Continuously improve the model based on stakeholder feedback, new evidence, scenario testing, and real-world validation.'
        }
    ];

    // Combine all steps
    steps = steps.concat(analysisSteps, docSteps);
}

function draw() {
    // Background
    fill('aliceblue');
    stroke('silver');
    rect(0, 0, canvasWidth, containerHeight);
  
    // draw title
    fill('black');
    noStroke();
    textSize(24);
    textAlign(CENTER,CENTER);
    // keep the title in the center and a margin down from the top
    text('Steps for Creating a Causal Loop Diagram', canvasWidth/2, margin);

    // Row labels
    drawRowLabels();
    
    // Draw all step boxes
    drawBoxes(steps);
    
    // Draw workflow arrows
    drawWorkflowArrows();
    
    // Description area
    renderDescriptionBox();
}

function drawRowLabels() {
    fill('#6C757D');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(16);
    textStyle(BOLD);
    
    text('Core Process:', 10, row1Y - 30);
    text('Analysis & Validation:', 10, row2Y - 30);
    text('Documentation & Refinement:', 10, row3Y - 30);
}

// draw the boxes in a row from the input array of steps
function drawBoxes(arr) {
    const txtSize = constrain(containerWidth * 0.018, 11, 14);
    const boxCornerRadius = 7;
  
    for (let i = 0; i < arr.length; i++) {
        const b = arr[i];
        const isHovered = mouseX >= b.x && mouseX <= b.x + b.w && 
                         mouseY >= b.y && mouseY <= b.y + b.h;
        
        // Box shadow for depth
        fill(0, 0, 0, 20);
        noStroke();
        
        rect(b.x + 3, b.y + 3, b.w, b.h, boxCornerRadius);
        
        // Main box
        stroke(isHovered ? '#007BFF' : '#DEE2E6');
        strokeWeight(isHovered ? 3 : 1);
        fill(b.color);
        
        rect(b.x, b.y, b.w, b.h, boxCornerRadius);
        
        // Text
        fill(b.tcolor);
        noStroke();
        textSize(txtSize);
        textAlign(CENTER, CENTER);
        text(b.label, b.x + b.w / 2, b.y + b.h / 2);
    }
}

function drawWorkflowArrows() {
    strokeWeight(lineStrokeWeight);
    stroke('#6C757D');
    
    // Row 1: Sequential arrows (Steps 1-5)
    for (let i = 0; i < 4; i++) {
        const from = steps[i];
        const to = steps[i + 1];
        drawArrow(from.x + from.w, from.y + from.h / 2, 
                 to.x, to.y + to.h / 2);
    }
    
    // Row 2: Sequential arrows (Steps 6-10)
    for (let i = 5; i < 9; i++) {
        const from = steps[i];
        const to = steps[i + 1];
        drawArrow(from.x + from.w, from.y + from.h / 2, 
                 to.x, to.y + to.h / 2);
    }
    
    // Connecting arrows between rows
    // Step 5 to Step 6
    drawArrow(steps[4].x + steps[4].w / 2, steps[4].y + steps[4].h,
             steps[5].x + steps[5].w / 2, steps[5].y);
    
    // Step 10 to Step 11
    drawArrow(steps[9].x + steps[9].w / 2, steps[9].y + steps[9].h,
             steps[10].x + steps[10].w / 2, steps[10].y);
    
    // Step 11 to Step 12
    drawArrow(steps[10].x + steps[10].w, steps[10].y + steps[10].h / 2,
             steps[11].x, steps[11].y + steps[11].h / 2);
    
    // Feedback arrow: Step 12 back to Step 8 (iteration)
    stroke('green');
    strokeWeight(3);
    //drawCurvedArrow(steps[11].x + steps[11].w / 2, steps[11].y,
    //               steps[7].x + steps[7].w / 2, steps[7].y + steps[7].h);
    drawArrow(steps[11].x + steps[11].w / 2, steps[11].y,
                   steps[7].x + steps[7].w / 2, steps[7].y + steps[7].h);
}

function drawArrow(x1, y1, x2, y2) {
    line(x1, y1, x2, y2);
    const angle = atan2(y2 - y1, x2 - x1);
    push();
    translate(x2, y2);
    rotate(angle);
    fill('#6C757D'); // Match the arrow stroke color
    noStroke();
    triangle(-arrowSize * 2, -arrowSize, -arrowSize * 2, arrowSize, 0, 0);
    pop();
}

function drawCurvedArrow(x1, y1, x2, y2) {
    // Draw curved line
    noFill();
    const midX = (x1 + x2) / 2;
    const midY = min(y1, y2) - 40;
    bezier(x1, y1, midX, midY, midX, midY, x2, y2);
    
    // Draw arrowhead at end
    const angle = atan2(y2 - midY, x2 - midX);
    push();
    translate(x2, y2);
    rotate(angle);
    fill('#28A745');
    noStroke();
    triangle(-arrowSize * 2, -arrowSize, -arrowSize * 2, arrowSize, 0, 0);
    pop();
}

function renderDescriptionBox() {
    const descriptionY = row4Y + 20;
    const descriptionHeight = 120;
    
    // Panel background
    fill('#FFFFFF');
    stroke('#DEE2E6');
    strokeWeight(1);
    rect(10, descriptionY, containerWidth - 20, descriptionHeight, 5);
    
    noStroke();
    fill('#212529');
    textSize(constrain(containerWidth * 0.02, 12, 16));
    textAlign(LEFT, TOP);
    
    if (currentHover !== -1 && currentHover < steps.length) {
        // remove newline from the label
        const label = steps[currentHover].label;
        let cleaned_label = label.replaceAll('\n', ' ');
        const desc = steps[currentHover].description;
        text(cleaned_label + '\n' + desc, 20, descriptionY + 10, containerWidth - 40, descriptionHeight - 20);
    } else {
        textAlign(CENTER, CENTER);
        textSize(constrain(containerWidth * 0.025, 14, 18));
        fill('#6C757D');
        text('Hover over any step to see detailed guidance.\n\nThis workflow creates effective CLDs that reveal systemic patterns\nand identify leverage points for positive change.', 
             containerWidth / 2, descriptionY + descriptionHeight / 2);
    }
}

// Interaction handlers
function mouseMoved() {
    currentHover = -1;
    
    for (let i = 0; i < steps.length; i++) {
        const b = steps[i];
        if (mouseX >= b.x && mouseX <= b.x + b.w && 
            mouseY >= b.y && mouseY <= b.y + b.h) {
            currentHover = i;
            cursor('pointer');
            return;
        }
    }
    cursor('default');
}

// Responsive handling
function windowResized() {
    updateCanvasSize();
    updateLayout();
    resizeCanvas(containerWidth, containerHeight);
    redraw();
}

function updateCanvasSize() {
    const rect = document.querySelector('main').getBoundingClientRect();
    // the canvas width is the full containerWidth
    containerWidth = Math.floor(rect.width);
    canvasWidth = containerWidth;
}