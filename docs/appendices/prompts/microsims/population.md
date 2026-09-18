# Create a Population Simulation

!!! prompt
    Please create a new simulation using the p5.js JavaScript framework.

    This simulation has two regions on the canvas placed side-by-side.

    LEFT PANEL DESCRIPTION:
    The left panel is a causal loop diagram that has nodes for a store (box shape) of the population of a region.  
    Label it "Population" There is also a node for "Birth Rate". There are two clockwise curved edges between the two nodes.  
    A slider in a control region is below that adjusts the birth rate.  There is also a Start/Stop Simulation button and a Reset button in the control area.

    RIGHT PANEL DESCRIPTION:
    The right panel has a population chart with time as the horizontal axis and People as the vertical axis.
    The chart will automatically scale if the population goes above the max value in the vertical direction.

    Use the p5.js push, pop, scale and translate functions to center and scale each region to make them easy to adjust.

    Make the Javascript easy to test with the p5.js editor.  In the setup() the canvas must be placed in an HTML <main> element:

    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector("main"));

    Please use these rules for generating a width-responsive p5.js JavaScript file: https://github.com/dmccreary/microsims/blob/main/docs/rules/standard-rules.md