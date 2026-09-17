---
title: Subsystem Nesting Explorer
description: Given a depicted car, the learner will differentiate the whole-car system from its nested subsystems and identify each subsystem's own inputs and outputs (Bloom: Analyzing).
status: scaffold
library: p5.js
bloom_level: Analyze
---

# Subsystem Nesting Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 1: Foundations of Systems Thinking](../../chapters/01-foundations-of-systems-thinking/index.md).

```text
Type: microsim
**sim-id:** subsystem-nesting-explorer<br/>
**Library:** p5.js<br/>
**Template:** https://github.com/dmccreary/automating-instructional-design/tree/main/docs/sims/rule-hierarchy-cascade<br/>
**Status:** Specified

Purpose: Show a car as a system made of nested subsystems (engine, transmission, braking system, electrical system), each of which can be expanded to reveal its own inputs, throughput, and outputs, reinforcing that a subsystem is a full system in its own right.

Bloom Taxonomy Level: Analyze
Bloom Taxonomy Verb: Differentiate

Learning Objective: Given a depicted car, the learner will differentiate the whole-car system from its nested subsystems and identify each subsystem's own inputs and outputs (Bloom: Analyzing).

Canvas: 700x480 default, responsive — layout recalculates box positions as percentages of `canvas.width`/`canvas.height` inside `windowResized()`.

Visual elements:
- An outer rounded rectangle labeled "Car (System)" drawn in a light background color.
- Four inner rounded rectangles nested inside it, one each for "Engine," "Transmission," "Braking System," and "Electrical System," each drawn as a distinct subsystem box with its own border.
- Small arrows between adjacent subsystem boxes showing at least one real connection (e.g., an arrow from Engine to Transmission labeled "rotational force").

Controls:
- Clicking any subsystem box expands it in place (animated width/height increase using `lerp()` over several frames) to reveal three small labeled sub-boxes inside it: "Input," "Throughput," "Output," each pre-filled with that subsystem's real values (e.g., Engine: Input = "fuel, air, spark," Throughput = "combustion," Output = "rotational force").
- A "Collapse All" button, built with `createButton()`, that animates all subsystems back to their collapsed state.

Interactivity requirement: every subsystem box and every Input/Throughput/Output sub-box is clickable, and clicking shows a one-sentence infobox definition beside the canvas (reusing this chapter's definitions of subsystem, input, throughput, and output).

Color scheme: each subsystem box uses a distinct pastel color from the book's existing palette so the four subsystems are visually distinguishable at a glance; the outer "Car" system uses a neutral gray border.

Implementation: p5.js sketch using nested rectangle drawing, an array of subsystem objects (each with position, size, expanded/collapsed state, and input/throughput/output text), and `mousePressed()` hit-testing against each box's current rectangle.
```

## Related Resources

- [Chapter 1: Foundations of Systems Thinking](../../chapters/01-foundations-of-systems-thinking/index.md)
