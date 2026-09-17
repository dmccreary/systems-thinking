---
title: System Boundary Explorer
description: Given a depicted scenario, the learner will illustrate how moving a system boundary changes what counts as an input, output, or part of the environment (Bloom: Understanding).
status: scaffold
library: p5.js
bloom_level: Understand
---

# System Boundary Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 1: Foundations of Systems Thinking](../../chapters/01-foundations-of-systems-thinking/index.md).

```text
Type: microsim
**sim-id:** system-boundary-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Let learners drag a boundary line around a simple depicted system (a household heating system: thermostat, furnace, house walls, outside weather) and see how the boundary choice changes which elements are labeled "inside the system," "input," "output," or "environment."

Bloom Taxonomy Level: Understand
Bloom Taxonomy Verb: Illustrate

Learning Objective: Given a depicted scenario, the learner will illustrate how moving a system boundary changes what counts as an input, output, or part of the environment (Bloom: Understanding).

Canvas: 700x450 default, responsive — recalculate all positions and the boundary circle's radius as a fraction of `canvas.width` on a `windowResized()` handler so the layout rescales correctly on any device width.

Visual elements:
- A household scene drawn in flat vector style: a thermostat icon, a furnace icon, a house outline, and an outdoor thermometer icon positioned outside the house outline.
- A draggable, resizable dashed circle (the boundary) that the learner can drag by its center and resize by dragging a handle on its edge, using `p5.js` mouse-drag event handling.
- Arrows automatically drawn crossing the boundary circle wherever an element's connection line intersects it, labeled "Input" (arrow pointing in) or "Output" (arrow pointing out).
- A small text panel below the canvas that updates live to read: "Inside the system: [list]" and "In the environment: [list]," recomputed whenever the boundary moves.

Controls:
- Two preset buttons, built with `createButton()`: "Boundary = Thermostat + Furnace Only" and "Boundary = Whole House," which animate the dashed circle to each preset position.
- A "Reset" button that returns the circle to its default starting position and size.

Interactivity requirement: every icon (thermostat, furnace, house outline, outdoor thermometer) is clickable; clicking it opens a small infobox beside the canvas with that element's one-sentence definition, sourced from this chapter's prose (e.g., clicking the outdoor thermometer shows: "This is part of the environment whenever the boundary excludes it — the system responds to it but doesn't control it.").

Color scheme: warm amber for elements currently inside the boundary, cool slate-blue for elements currently in the environment, matching the book's existing color palette for consistency with other diagrams.

Implementation: p5.js sketch with `createCanvas` sized from the container width, `dragEvent` handlers on the boundary circle, and simple point-in-circle math to determine inside/outside status for each icon on every frame.
```

## Related Resources

- [Chapter 1: Foundations of Systems Thinking](../../chapters/01-foundations-of-systems-thinking/index.md)
