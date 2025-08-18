# MicroSim Template

[Link to Template Demo](./00-template.html){ .md-button .md-button--primary }

## About this MicroSim

This MicroSim teaches us how to
specify the drawing of a static filled circle.

## Sample Prompt

```linenums="0"
Create a single file p5.js sketch.
Draw a green circle on a 600x400 canvas with a radius of 200.
```

## Sample Response

```javascript
let canvasHeight = 400;
let aspectRatio = 1.91; // Open Graph standard
let canvasWidth = canvasHeight * aspectRatio;
let radius = 200;
function setup() {
const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('canvas-container');
  fill(245);
  rect(0,0, canvasWidth, canvasHeight);
  fill('green');
  circle(canvasWidth/2, canvasHeight/2, radius);
}
```

## Lesson Plan

### Grade Level, Subject and Topic

9th grade geometry. Circle and radius.

### Activities

#### Fill Color

Change the color in the prompt.  You
can specify any one of the [140 named colors](https://www.w3schools.com/tags/ref_colornames.asp).

#### Border Weight

Change the prompt to include a black border of
width 10.

#### Border Color

Change the prompt to make the border purple.

#### Change the Radius

Change the prompt to make the circle smaller
or larger by changing the radius from 10 to 200.

#### Change the Location

Change the prompt to move the circle to the left or right.

