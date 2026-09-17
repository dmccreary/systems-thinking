---
title: Loop Polarity Counter
description: Given a causal loop diagram, the learner will classify the loop as reinforcing or balancing by counting its opposite-direction links (Bloom: Applying).
status: scaffold
library: p5.js
bloom_level: Apply
---

# Loop Polarity Counter



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: Causal Loop Diagram Notation and Loop Identification](../../chapters/03-cld-notation-and-loop-identification/index.md).

```text
Type: microsim
**sim-id:** loop-polarity-counter<br/>
**Library:** p5.js<br/>
**Template:** https://github.com/dmccreary/infographics/tree/main/docs/sims/cld-builder<br/>
**Status:** Specified

Purpose: Let learners apply the negative-link counting rule step by step on a four-node causal loop by clicking each edge in sequence around the loop and watching a running tally of same-direction (S) and opposite-direction (O) links, culminating in the automatically revealed loop marker.

Bloom Taxonomy Level: Apply
Bloom Taxonomy Verb: Classify

Learning Objective: Given a causal loop diagram, the learner will classify the loop as reinforcing or balancing by counting its opposite-direction links (Bloom: Applying).

Canvas: 700x480 default, responsive — recompute node positions around a circle of radius proportional to `canvas.width` inside a `windowResized()` handler so the loop stays centered and legible at any container width.

Visual elements:
- Four nodes arranged in a circle (default scenario: "Advertising Spend," "New Customers," "Word of Mouth," "Revenue"), connected by four curved directed edges forming one closed loop, each edge labeled with a "+"/S or "−"/O badge once revealed.
- A running tally panel beside the canvas reading "Opposite-direction links found: N" that increments only when the learner clicks an unrevealed edge whose polarity is negative.
- A large loop-marker circle at the loop's center, initially blank/gray, that fills in with a red "R" or green "B" (matching this chapter's color convention) only after all four edges have been clicked/revealed.

Controls:
- Clicking an unrevealed edge reveals its polarity badge (S or O) with a short one-sentence justification appearing in an info panel below the canvas (e.g., "More advertising spend causes more new customers — same direction").
- A "New Scenario" button, built with `createButton()`, that swaps in one of three preloaded four-edge loops (a mix of reinforcing and balancing examples) with freshly randomized node positions.
- A "Reset This Loop" button that re-hides all edge badges and empties the tally without changing the current scenario.

Interactivity requirement: every edge is clickable and reveals a labeled badge plus an explanatory info-panel sentence; the loop-marker circle updates live based on the tally, satisfying the interactivity bar with immediate, teaching feedback on every click.

Color scheme: same-direction (S) badges in the book's positive-link green, opposite-direction (O) badges in the negative-link red, and the final loop marker filled in the matching reinforcing-red or balancing-green used throughout this chapter's other diagrams for visual consistency.

Implementation: p5.js sketch with an array of edge objects (endpoints, true polarity, revealed state) drawn as curved Bezier arrows, `mousePressed()` hit-testing against each edge's curve midpoint, and a small state machine tracking revealed count and running negative-link tally to trigger the final marker reveal.
```

## Related Resources

- [Chapter 3: Causal Loop Diagram Notation and Loop Identification](../../chapters/03-cld-notation-and-loop-identification/index.md)
