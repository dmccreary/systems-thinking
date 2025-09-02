// animation of the capability maturity model (CMM)
// stairstep diagram with Initial level at the bottom
// Text from wikipedia
let canvasWidth = 620;
let canvasHeight = 550;
let layers = [];
let descriptions = [];
let currentHover = -1;
let m = 20; // margins around the steps
let step_width = 120;
let sh = 60;

function setup() {
    const canvas =createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);
    textSize(16);

  // Define the layers and labels
  layers = [
    { x: m,     y: sh*4+m, w: step_width*5-m, h: 60, level: "Level 1 - Initial Awareness", color: "red", tcolor: "white" },
    { x: 100+m, y: sh*3+m, w: step_width*4, h: 60, level: "Level 2 - Repeatable", color: "orange", tcolor: "black"  },
    { x: 200+m, y: sh*2+m, w: step_width*3+m, h: 60, level: "Level 3 - Defined", color: "yellow", tcolor: "black" },
    { x: 300+m, y: sh*1+m, w: step_width*2+m*2, h: 60, level: "Level 4 - Managed", color: "green", tcolor: "white"  },
    { x: 400, y: m,      w: step_width+m*4, h: 60, level: "L5 - Optimizing", color: "blue", tcolor: "white"  }
  ];

  descriptions = [
    "Level 1: Initial Awareness is characteristic of processes at this level that they are (typically) undocumented and in a state of dynamic change, tending to be driven in an ad hoc, uncontrolled and reactive manner by users or events. This provides a chaotic or unstable environment for the processes.",
    "Level 2: Repeatable is characteristic of this level of maturity that some processes are repeatable, possibly with consistent results. Process discipline is unlikely to be rigorous, but where it exists it may help to ensure that existing processes are maintained during times of stress.",
    "Level 3: Defined is characteristic of processes at this level that there are sets of defined and documented standard processes established and subject to some degree of improvement over time. These standard processes are in place. The processes may not have been systematically or repeatedly used - sufficient for the users to become competent or the process to be validated in a range of situations. This could be considered a developmental stage - with use in a wider range of conditions and user competence development the process can develop to next level of maturity.",
    "Level 4: Defined is characteristic of processes at this level that, using process metrics, effective achievement of the process objectives can be evidenced across a range of operational conditions. The suitability of the process in multiple environments has been tested and the process refined and adapted. Process users have experienced the process in multiple and varied conditions, and are able to demonstrate competence. The process maturity enables adaptions to particular projects without measurable losses of quality or deviations from specifications. Process Capability is established from this level. (Example - surgeon performing an operation hundreds of times with levels of negative outcome approaching zero).",
    "Level 5: Optimized is a characteristic of processes at this level that the focus is on continually improving process performance through both incremental and innovative technological changes/improvements. At maturity level 5, processes are concerned with addressing statistical common causes of process variation and changing the process (for example, to shift the mean of the process performance) to improve process performance. This would be done at the same time as maintaining the likelihood of achieving the established quantitative process-improvement objectives."
  ];
}


function draw() {
  background(240);
  
  // Draw layers and add labels
  textSize(24);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < layers.length; i++) {
    if (i === currentHover) fill(220);
    else fill(200);
    let l = layers[i];
    fill(l.color);
    rect(l.x, l.y, l.w, l.h);
    fill(l.tcolor);
    text(l.level, l.x + l.w / 2, l.y + l.h / 2);
  }

  // Display description text
  if (currentHover != -1) {
    textSize(16);
    fill(0);
    textAlign(LEFT, TOP);
    text(descriptions[currentHover], 20, 340, 560, 360);
  }
}

function mouseMoved() {
  currentHover = -1;
  for (let i = 0; i < layers.length; i++) {
    let l = layers[i];
    if (mouseX >= l.x && mouseX <= l.x + l.w && mouseY >= l.y && mouseY <= l.y + l.h) {
      currentHover = i;
      break;
    }
  }
}
