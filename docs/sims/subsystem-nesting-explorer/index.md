---
title: "Subsystem Nesting Explorer"
description: "Open each of a car's four subsystems to see that every subsystem is a complete system in its own right."
image: /sims/subsystem-nesting-explorer/subsystem-nesting-explorer.png
og:image: /sims/subsystem-nesting-explorer/subsystem-nesting-explorer.png
twitter:image: /sims/subsystem-nesting-explorer/subsystem-nesting-explorer.png
social:
  cards: false
status: implemented
library: p5.js
bloom_level: Analyze
bloom_verb: Differentiate
chapter: 1
---

# Subsystem Nesting Explorer

<iframe src="main.html" width="100%" height="562" scrolling="no"></iframe>

[Run the Subsystem Nesting Explorer MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

"Subsystem" sounds like a lesser thing than a system, and it is not. Any subsystem, examined on its own, has its own boundary, its own inputs, its own transformation, and its own outputs. This MicroSim makes that concrete: click a car subsystem and it opens in place to reveal the Input / Throughput / Output structure you already met for the car as a whole.

**Learning objective:** Given a depicted car, the learner will differentiate the whole-car system from its nested subsystems and identify each subsystem's own inputs and outputs.

**Bloom's Taxonomy level:** Analyze (Differentiate)

## How To Use

- Click any of the four subsystem boxes to open it. Only one opens at a time so the nesting stays readable.
- Inside an open subsystem, click the Input, Throughput or Output row for that term's definition.
- Follow the arrows between subsystems - one subsystem's output is the next one's input.
- Press "Collapse All" to return to the whole-car view.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/subsystem-nesting-explorer/main.html"
        width="100%" height="562" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows the input / throughput / output vocabulary
- Has seen at least one system boundary drawn

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Differentiate a whole system from its nested subsystems
- State the input, throughput and output of a given subsystem
- Explain why one subsystem's output being another's input is what makes a system more than a pile of parts

### Suggested Activity (12 minutes)

1. Ask learners to name the car's inputs and outputs before opening anything.
2. Open the Engine and compare its input/throughput/output to the car's. Ask what is the same about the structure.
3. Open the Transmission and ask where its input comes from. Learners should notice it is the Engine's output.
4. Ask: if the Electrical System fails, which other subsystems stop, and why is that not obvious from a parts list?
5. Have learners name a subsystem of their school or workplace and state its three parts.

### Assessment

Ask each learner to pick any subsystem and write its input, throughput and output, then to name one other subsystem it depends on. The dependency is the part that shows real understanding.

### Discussion Questions

- At what point does it stop being useful to keep decomposing a system into subsystems?
- A dead battery stops a car with a perfectly good engine. What does that say about analyzing subsystems in isolation?
- Is a department a subsystem of a company, or a system in its own right? Does the answer matter?

## Specification

The specification below was extracted from
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

## References

- [Systems theory - Wikipedia](https://en.wikipedia.org/wiki/Systems_theory) - The nesting of systems within systems is a founding idea of the field.
- [Hierarchy theory](https://en.wikipedia.org/wiki/Hierarchy_theory) - How levels of organization relate in complex systems.
- [Herbert Simon, The Architecture of Complexity](https://en.wikipedia.org/wiki/Herbert_A._Simon) - Simon's argument that complex systems are nearly decomposable into subsystems.

## Related Resources

- [Chapter 1: Foundations of Systems Thinking](../../chapters/01-foundations-of-systems-thinking/index.md)
- [All MicroSims in this book](../index.md)
