---
title: "System Boundary Explorer"
description: "Drag a boundary around a household heating system and watch what counts as input, output, or environment change."
image: /sims/system-boundary-explorer/system-boundary-explorer.png
og:image: /sims/system-boundary-explorer/system-boundary-explorer.png
twitter:image: /sims/system-boundary-explorer/system-boundary-explorer.png
social:
  cards: false
status: implemented
library: p5.js
bloom_level: Understand
bloom_verb: Illustrate
chapter: 1
---

# System Boundary Explorer

<iframe src="main.html" width="100%" height="547" scrolling="no"></iframe>

[Run the System Boundary Explorer MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

There is no single correct system boundary. A boundary is a choice the analyst makes, and that choice decides which elements are "in the system" and which are merely part of the environment the system responds to. This MicroSim makes the choice physical: drag and resize the dashed circle over a household heating scene, and every connection that crosses it is relabeled live as an input or an output.

**Learning objective:** Given a depicted scenario, the learner will illustrate how moving a system boundary changes what counts as an input, an output, or part of the environment.

**Bloom's Taxonomy level:** Understand (Illustrate)

## How To Use

- Drag the dashed circle by its interior to move the boundary; drag the dot on its right edge to resize it.
- Watch the label under each element switch between "in system" and "environment" as the boundary passes over it.
- Look for the INPUT and OUTPUT tags that appear wherever a connection line crosses the circle.
- Click any element (thermostat, furnace, house, outdoor temperature) for its one-sentence definition.
- Use the two preset buttons to compare a narrow boundary against a whole-house boundary.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/system-boundary-explorer/main.html"
        width="100%" height="547" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows that a system is a set of interconnected parts
- Can distinguish a part from the whole it belongs to

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Explain why a system boundary is a modeling choice rather than a fact about the world
- Identify which elements are inputs, outputs, and environment for a given boundary
- Predict how relabeling occurs when a boundary is widened or narrowed

### Suggested Activity (12 minutes)

1. Before touching anything, ask learners to predict which elements the default boundary includes.
2. Press "Boundary = Thermostat + Furnace" and have learners name every input and output that appears.
3. Press "Boundary = Whole House" and ask what changed and, more importantly, what did NOT change about the physical scene.
4. Have learners drag the boundary to deliberately exclude the furnace, then explain what the system can and cannot now control.
5. Close by asking: which boundary would you choose if you were trying to cut the heating bill, and why?

### Assessment

Ask learners to write one sentence naming an element that was an input under one boundary and part of the system under another, and to explain why nothing about the element itself changed. A correct answer names the boundary, not the element, as the thing that moved.

### Discussion Questions

- Who decides where an organization's system boundary sits, and what does that decision hide?
- If the outdoor temperature is always in the environment, what does that tell us about the limits of any heating system?
- What goes wrong when two people analyzing the same problem draw different boundaries without saying so?

## Specification

The specification below was extracted from
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

## References

- [System boundary - Wikipedia](https://en.wikipedia.org/wiki/System) - Background on how systems are delimited from their environments.
- [Donella Meadows, Thinking in Systems](https://en.wikipedia.org/wiki/Donella_Meadows) - Meadows argues that boundaries are invented by the analyst, not found in the world.
- [Open and closed systems](https://en.wikipedia.org/wiki/Open_system_(systems_theory)) - Why exchanges across a boundary define an open system.

## Related Resources

- [Chapter 1: Foundations of Systems Thinking](../../chapters/01-foundations-of-systems-thinking/index.md)
- [All MicroSims in this book](../index.md)
