// Moore's Law Visualization using p5.js
// This code can be pasted directly into the p5.js editor

// Canvas dimensions
let canvasWidth = 800;
let canvasHeight = 600;
let margin = 60;
let plotWidth = canvasWidth - 2 * margin;
let plotHeight = canvasHeight - 2 * margin;

// UI controls
let scaleToggleButton;
let isLogScale = true; // Default to logarithmic scale
let hoverInfo = null;
let pointRadius = 3; // Radius of data points

// Comprehensive dataset of CPU/GPU transistor counts from 1965 to 2025
const chipData = [
  // Starting in 1965 as requested
  { year: 1965, name: "Fairchild 702", transistors: 100, type: "CPU", manufacturer: "Fairchild", process: "25000nm", description: "Early integrated circuit used in Apollo Guidance Computer" },
  { year: 1965, name: "Intel 4004", transistors: 2300, type: "CPU", manufacturer: "Intel", process: "10000nm", description: "First commercially available microprocessor" },
  { year: 1967, name: "Texas Instruments 7400", transistors: 400, type: "CPU", manufacturer: "Texas Instruments", process: "15000nm", description: "Early digital logic chip that became industry standard" },
  { year: 1970, name: "Intel 1103", transistors: 1000, type: "CPU", manufacturer: "Intel", process: "12000nm", description: "First commercially available DRAM chip" },
  { year: 1972, name: "Intel 8008", transistors: 3500, type: "CPU", manufacturer: "Intel", process: "10000nm", description: "8-bit CPU, first with dedicated registers" },
  { year: 1974, name: "Intel 8080", transistors: 4500, type: "CPU", manufacturer: "Intel", process: "6000nm", description: "8-bit microprocessor, influential in early personal computers" },
  { year: 1975, name: "MOS 6502", transistors: 3510, type: "CPU", manufacturer: "MOS Technology", process: "8000nm", description: "Powered Apple II, Commodore 64, and early Nintendo consoles" },
  { year: 1978, name: "Intel 8086", transistors: 29000, type: "CPU", manufacturer: "Intel", process: "3000nm", description: "First x86 processor, 16-bit architecture" },
  { year: 1979, name: "Motorola 68000", transistors: 68000, type: "CPU", manufacturer: "Motorola", process: "3500nm", description: "Powered early Macintosh computers" },
  { year: 1982, name: "Intel 80286", transistors: 134000, type: "CPU", manufacturer: "Intel", process: "1500nm", description: "Second-generation x86 processor" },
  { year: 1985, name: "Intel 80386", transistors: 275000, type: "CPU", manufacturer: "Intel", process: "1500nm", description: "First 32-bit x86 processor" },
  { year: 1989, name: "Intel 80486", transistors: 1200000, type: "CPU", manufacturer: "Intel", process: "1000nm", description: "First with integrated FPU" },
  { year: 1993, name: "Intel Pentium", transistors: 3100000, type: "CPU", manufacturer: "Intel", process: "800nm", description: "Fifth generation x86 architecture" },
  { year: 1995, name: "Intel Pentium Pro", transistors: 5500000, type: "CPU", manufacturer: "Intel", process: "500nm", description: "Introduced out-of-order execution" },
  { year: 1997, name: "Intel Pentium II", transistors: 7500000, type: "CPU", manufacturer: "Intel", process: "350nm", description: "Included MMX technology" },
  { year: 1999, name: "Intel Pentium III", transistors: 9500000, type: "CPU", manufacturer: "Intel", process: "250nm", description: "Added SSE instructions" },
  { year: 2000, name: "Intel Pentium 4", transistors: 42000000, type: "CPU", manufacturer: "Intel", process: "180nm", description: "NetBurst microarchitecture" },
  { year: 2003, name: "AMD Opteron", transistors: 105900000, type: "CPU", manufacturer: "AMD", process: "130nm", description: "First 64-bit x86 processor" },
  { year: 2004, name: "NVIDIA GeForce 6800", transistors: 222000000, type: "GPU", manufacturer: "NVIDIA", process: "130nm", description: "Early programmable GPU" },
  { year: 2006, name: "Intel Core 2 Duo", transistors: 291000000, type: "CPU", manufacturer: "Intel", process: "65nm", description: "Core microarchitecture, multi-core" },
  { year: 2007, name: "NVIDIA Tesla C870", transistors: 681000000, type: "GPU", manufacturer: "NVIDIA", process: "90nm", description: "First CUDA-capable GPU" },
  { year: 2008, name: "Intel Core i7 (Nehalem)", transistors: 731000000, type: "CPU", manufacturer: "Intel", process: "45nm", description: "Nehalem microarchitecture" },
  { year: 2010, name: "NVIDIA Fermi GF100", transistors: 3000000000, type: "GPU", manufacturer: "NVIDIA", process: "40nm", description: "First with CUDA compute capability 2.0" },
  { year: 2011, name: "AMD Bulldozer", transistors: 1200000000, type: "CPU", manufacturer: "AMD", process: "32nm", description: "Bulldozer microarchitecture" },
  { year: 2012, name: "NVIDIA Kepler GK110", transistors: 7100000000, type: "GPU", manufacturer: "NVIDIA", process: "28nm", description: "Kepler architecture" },
  { year: 2012, name: "Intel Core i7 (Ivy Bridge)", transistors: 1400000000, type: "CPU", manufacturer: "Intel", process: "22nm", description: "First with 3D tri-gate transistors" },
  { year: 2014, name: "NVIDIA Maxwell GM200", transistors: 8000000000, type: "GPU", manufacturer: "NVIDIA", process: "28nm", description: "Maxwell architecture" },
  { year: 2015, name: "Intel Xeon E5 v4", transistors: 7200000000, type: "CPU", manufacturer: "Intel", process: "14nm", description: "Broadwell architecture, 22 cores" },
  { year: 2016, name: "NVIDIA Pascal GP100", transistors: 15300000000, type: "GPU", manufacturer: "NVIDIA", process: "16nm", description: "Pascal architecture" },
  { year: 2017, name: "AMD EPYC (Naples)", transistors: 19200000000, type: "CPU", manufacturer: "AMD", process: "14nm", description: "Zen architecture, up to 32 cores" },
  { year: 2018, name: "NVIDIA Turing TU102", transistors: 18600000000, type: "GPU", manufacturer: "NVIDIA", process: "12nm", description: "Turing architecture with RT cores" },
  { year: 2019, name: "AMD Epyc Rome", transistors: 39540000000, type: "CPU", manufacturer: "AMD", process: "7nm", description: "Zen 2 architecture, 64 cores" },
  { year: 2020, name: "NVIDIA Ampere A100", transistors: 54200000000, type: "GPU", manufacturer: "NVIDIA", process: "7nm", description: "Ampere architecture, tensor cores" },
  { year: 2021, name: "Apple M1 Ultra", transistors: 114000000000, type: "SoC", manufacturer: "Apple", process: "5nm", description: "ARM-based SoC with integrated GPU" },
  { year: 2022, name: "NVIDIA Hopper H100", transistors: 80000000000, type: "GPU", manufacturer: "NVIDIA", process: "4nm", description: "Hopper architecture" },
  { year: 2023, name: "AMD EPYC Genoa", transistors: 90000000000, type: "CPU", manufacturer: "AMD", process: "5nm", description: "Zen 4 architecture, 96 cores" },
  { year: 2024, name: "NVIDIA Blackwell B200", transistors: 208000000000, type: "GPU", manufacturer: "NVIDIA", process: "4nm", description: "Blackwell architecture for AI" },
  { year: 2025, name: "Cerebras WSE-3", transistors: 4000000000000, type: "AI", manufacturer: "Cerebras", process: "5nm", description: "Wafer-scale AI processor" }
];

// Initialize canvas
function setup() {
  // Create a canvas to match the parent container's size
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textAlign(CENTER, CENTER);
  
  // Create toggle button
  scaleToggleButton = createButton('Switch to Linear Scale');
  scaleToggleButton.position(canvasWidth/2 - 80, 20);
  scaleToggleButton.mousePressed(toggleScale);
  
  // Add accessibility description
  describe('An interactive visualization of Moore\'s Law showing the exponential growth of transistor counts in processors from 1965 to 2025.', LABEL);
}

// Update canvas size based on container size
function updateCanvasSize() {
  // Get the exact dimensions of the container
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);  // Avoid fractional pixels
  canvasWidth = containerWidth;
  
  // Update the plot width with the new canvas width
  plotWidth = canvasWidth - 2 * margin;
}

// Main draw function
function draw() {
  background('aliceblue');
  
  // Draw title and description
  fill(0);
  textSize(20);
  textAlign(CENTER, TOP);
  text("Moore's Law: Transistor Count (1965-2025)", canvasWidth/2, 50);
  
  textSize(12);
  // text("Visualization of the exponential growth in transistor counts, following Gordon Moore's 1965 prediction", canvasWidth/3, 120);
  // text("that transistor density would double approximately every two years.", canvasWidth/3, 140);
  
  // Draw axes
  drawAxes();
  
  // Plot data points
  plotDataPoints();
  
  // Draw hover information if applicable
  if (hoverInfo) {
    drawHoverInfo();
  }
  
  // Draw legend
  drawLegend();
  
  // Draw info text at the bottom
  drawInfoText();
}

// Draw x and y axes
function drawAxes() {
  stroke(0);
  strokeWeight(1);
  
  // X-axis
  line(margin, canvasHeight - margin, canvasWidth - margin, canvasHeight - margin);
  
  // Y-axis
  line(margin, canvasHeight - margin, margin, margin);
  
  // Draw x-axis ticks and labels
  textAlign(CENTER, TOP);
  textSize(12);
  fill(0);
  noStroke();
  for (let year = 1965; year <= 2025; year += 10) {
    let x = map(year, 1965, 2025, margin, canvasWidth - margin);
    stroke(0);
    line(x, canvasHeight - margin, x, canvasHeight - margin + 5);
    noStroke();
    text(year, x, canvasHeight - margin + 10);
  }
  
  // X-axis label
  textAlign(CENTER, TOP);
  textSize(14);
  text("Year", canvasWidth/2, canvasHeight - 20);
  
  // Draw y-axis ticks and labels
  textAlign(RIGHT, CENTER);
  textSize(12);
  
  if (isLogScale) {
    // Log scale ticks
    for (let i = 2; i <= 12; i++) {  // Start from 10^2 (100) to accommodate the 100 transistor chip
      let y = map(i, 2, 12, canvasHeight - margin, margin);
      stroke(220);
      strokeWeight(0.5);
      line(margin, y, canvasWidth - margin, y); // Grid line
      stroke(0);
      strokeWeight(1);
      line(margin - 5, y, margin, y); // Tick
      noStroke();
      text("10^" + i, margin - 10, y);
    }
    
    // Y-axis label
    push();
    translate(20, canvasHeight/2);
    rotate(-PI/2);
    textAlign(CENTER, BOTTOM);
    textSize(14);
    text("Transistor Count (Log Scale)", 0, 0);
    pop();
  } else {
    // Linear scale ticks
    let maxTransistors = 4000000000000; // 4 trillion (for Cerebras WSE-3)
    let tickStep = maxTransistors / 5;
    
    for (let i = 0; i <= 5; i++) {
      let value = i * tickStep;
      let y = map(value, 0, maxTransistors, canvasHeight - margin, margin);
      stroke(220);
      strokeWeight(0.5);
      line(margin, y, canvasWidth - margin, y); // Grid line
      stroke(0);
      strokeWeight(1);
      line(margin - 5, y, margin, y); // Tick
      noStroke();
      text(formatNumber(value), margin - 10, y);
    }
    
    // Y-axis label
    push();
    translate(20, canvasHeight/2);
    rotate(-PI/2);
    textAlign(CENTER, BOTTOM);
    textSize(14);
    text("Transistor Count", 0, 0);
    pop();
  }
}

// Plot data points and trend line
function plotDataPoints() {
  // Draw trend line (Moore's Law)
  stroke(0, 102, 204); // Blue color
  strokeWeight(1.5);
  drawingContext.setLineDash([5, 5]); // Dashed line
  
  let firstPoint = getPlotPosition(chipData[0].year, chipData[0].transistors);
  let lastPoint = getPlotPosition(chipData[chipData.length - 1].year, chipData[chipData.length - 1].transistors);
  line(firstPoint.x, firstPoint.y, lastPoint.x, lastPoint.y);
  
  drawingContext.setLineDash([]); // Reset to solid line
  
  // Draw data points
  for (let i = 0; i < chipData.length; i++) {
    let chip = chipData[i];
    let pos = getPlotPosition(chip.year, chip.transistors);
    
    // Check if mouse is hovering over the point
    if (dist(mouseX, mouseY, pos.x, pos.y) < 10) {
      hoverInfo = {
        chip: chip,
        x: pos.x,
        y: pos.y
      };
      fill(255, 0, 0); // Red for hovered point
      stroke(150);
      circle(pos.x, pos.y, pointRadius * 4);
    } else {
      // Color by type
      if (chip.type === "CPU") {
        fill(70, 130, 180); // Steel blue
      } else if (chip.type === "GPU") {
        fill(60, 179, 113); // Medium sea green
      } else if (chip.type === "SoC") {
        fill(255, 140, 0);  // Dark orange
      } else {
        fill(220, 20, 60);  // Crimson
      }
      
      noStroke();
      circle(pos.x, pos.y, pointRadius * 3);
    }
  }
}

// Get plotting position for a data point
function getPlotPosition(year, transistors) {
  let x = map(year, 1965, 2025, margin, canvasWidth - margin);
  let y;
  
  if (isLogScale) {
    // Log scale: map log10 of transistor count
    let logValue = Math.log10(transistors);
    y = map(logValue, 2, 12, canvasHeight - margin, margin);  // Updated to start from 10^2
  } else {
    // Linear scale
    y = map(transistors, 0, 4000000000000, canvasHeight - margin, margin);
  }
  
  return { x, y };
}

// Draw hover info box
function drawHoverInfo() {
  let chip = hoverInfo.chip;
  let boxWidth = 280;
  let boxHeight = 150;
  let boxX = hoverInfo.x + 15;
  let boxY = hoverInfo.y - 15;
  
  // Make sure box stays within canvas
  if (boxX + boxWidth > canvasWidth) {
    boxX = hoverInfo.x - boxWidth - 15;
  }
  
  if (boxY + boxHeight > canvasHeight - 20) {
    boxY = canvasHeight - boxHeight - 20;
  }
  
  if (boxY < 110) {
    boxY = 110;
  }
  
  // Draw info box
  fill(255, 255, 245);
  stroke(100);
  strokeWeight(1);
  rect(boxX, boxY, boxWidth, boxHeight, 5);
  
  // Draw text
  noStroke();
  fill(0);
  textAlign(LEFT, TOP);
  textSize(16);
  text(chip.name + " (" + chip.year + ")", boxX + 10, boxY + 10);
  
  textSize(12);
  text("Transistors: " + chip.transistors.toLocaleString(), boxX + 10, boxY + 35);
  text("Manufacturer: " + chip.manufacturer, boxX + 10, boxY + 55);
  text("Process: " + chip.process, boxX + 10, boxY + 75);
  text("Type: " + chip.type, boxX + 10, boxY + 95);
  text("Description: " + chip.description, boxX + 10, boxY + 115, boxWidth - 20, 50);
}

// Toggle between logarithmic and linear scales
function toggleScale() {
  isLogScale = !isLogScale;
  scaleToggleButton.html(isLogScale ? 'Switch to Linear Scale' : 'Switch to Logarithmic Scale');
}

// Format large numbers for display
function formatNumber(num) {
  if (num >= 1000000000000) {
    return (num / 1000000000000).toFixed(1) + "T";
  } else if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

// Draw legend
function drawLegend() {
  let legendX = margin + 20;
  let legendY = margin + 10;
  let itemHeight = 20;
  let itemWidth = 80;
  
  fill(0);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text("Processor Types:", legendX, legendY);
  
  // CPU
  fill(70, 130, 180); // Steel blue
  noStroke();
  circle(legendX + 10, legendY + itemHeight, pointRadius *3);
  fill(0);
  text("CPU", legendX + 20, legendY + itemHeight);
  
  // GPU
  fill(60, 179, 113); // Medium sea green
  noStroke();
  circle(legendX + 10 + itemWidth, legendY + itemHeight, pointRadius * 3);
  fill(0);
  text("GPU", legendX + 20 + itemWidth, legendY + itemHeight);
  
  // SoC
  fill(255, 140, 0); // Dark orange
  noStroke();
  circle(legendX + 10 + itemWidth * 2, legendY + itemHeight, pointRadius * 3);
  fill(0);
  text("SoC", legendX + 20 + itemWidth * 2, legendY + itemHeight);
  
  // AI
  fill(220, 20, 60); // Crimson
  noStroke();
  circle(legendX + 10 + itemWidth * 3, legendY + itemHeight, pointRadius * 3);
  fill(0);
  text("AI", legendX + 20 + itemWidth * 3, legendY + itemHeight);
  
  // Trend Line
  stroke(0, 102, 204); // Blue
  strokeWeight(1.5);
  drawingContext.setLineDash([5, 5]);
  line(legendX + 10 + itemWidth * 4, legendY + itemHeight, legendX + 10 + itemWidth * 4 + 30, legendY + itemHeight);
  drawingContext.setLineDash([]);
  noStroke();
  fill(0);
  text("Moore's Law", legendX + 45 + itemWidth * 4, legendY + itemHeight);
}

// Draw informational text at the bottom
function drawInfoText() {
  fill(100);
  noStroke();
  textSize(10);
  // textAlign(LEFT, BOTTOM);
  // text("About Moore's Law: In 1965, Gordon Moore predicted that the number of transistors on integrated circuits would double approximately every two years.", margin, canvasHeight - 15);
  // textAlign(RIGHT, BOTTOM);
  // text("Data sources: Intel, AMD, NVIDIA corporate publications, Computer History Museum, and IEEE technical documentation.", canvasWidth - margin, canvasHeight - 15);
}

// Reset hover information when mouse moves
function mouseMoved() {
  hoverInfo = null;
}

// Handle window resizing
function windowResized() {
  // Update canvas size when the container resizes
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  
  // Update button position
  scaleToggleButton.position(canvasWidth/2 - 80, 20);
}