---
title: Logistic Map Bifurcation Explorer
description: Given a range of parameter values for the logistic map, the learner will classify the resulting long-term behavior as a fixed point, a periodic cycle, or chaos (Bloom: Analyzing).
status: scaffold
library: p5.js
bloom_level: Analyze
---

# Logistic Map Bifurcation Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 6: Growth Patterns and Nonlinear Behavior](../../chapters/06-growth-patterns-and-nonlinear-behavior/index.md).

```text
Type: microsim
**sim-id:** logistic-map-bifurcation-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Let learners drag a growth-rate parameter through the logistic map's route to chaos and directly observe fixed points, periodic bifurcations, and chaotic behavior, alongside a live demonstration of sensitivity to initial conditions.

Bloom Taxonomy Level: Analyze
Bloom Taxonomy Verb: Classify / Compare

Learning Objective: Given a range of parameter values for the logistic map, the learner will classify the resulting long-term behavior as a fixed point, a periodic cycle, or chaos (Bloom: Analyzing).

Canvas: 700x460 default, responsive — recompute both panels' widths as a proportion of `canvas.width` inside a `windowResized()` handler.

Visual elements:
- Left panel: a live bifurcation diagram (r on the x-axis from 2.4 to 4.0, long-run x-values on the y-axis), plotting a faint point for each of the last 60 iterations at the current r, with a vertical marker line showing the currently selected r.
- Right panel: two trajectory line charts stacked vertically, one starting at \(x_0=0.5000\) and one at \(x_0=0.5001\), both run at the current r, initially overlapping almost exactly and visibly diverging within a few dozen steps whenever r is in the chaotic range.
- A live label beneath the bifurcation diagram reading the current classification: "Fixed point," "Period-2 cycle," "Period-4 cycle," or "Chaotic," computed from the spread of the last 60 iterated values.

Controls:
- An r-slider (`createSlider()`, range 2.4 to 4.0, step 0.001) that immediately recomputes both panels.
- A "Reset Trajectories" button, built with `createButton()`, that reseeds both right-panel trajectories at their starting values without changing r.
- Clicking anywhere on the bifurcation diagram jumps the r-slider to that x-position, letting learners explore visually rather than only by dragging the slider.

Interactivity requirement: dragging the slider or clicking the bifurcation diagram immediately updates both the live classification label and the diverging trajectory panel, giving continuous visible feedback linking a single parameter to a qualitative change in long-term behavior.

Color scheme: bifurcation diagram points in the book's neutral node blue, the two trajectory lines in contrasting reinforcing-red and balancing-green so their divergence is easy to track, chaotic-range background tinted a very light red to visually flag the zone.

Implementation: p5.js sketch iterating \( x_{n+1} = r x_n(1-x_n) \) each frame for both the bifurcation diagram (discarding an initial transient before plotting) and the two trajectory panels; classification logic checks how many distinct values the last 60 iterations cluster into, within a small tolerance, to label fixed/periodic/chaotic.
```

## Related Resources

- [Chapter 6: Growth Patterns and Nonlinear Behavior](../../chapters/06-growth-patterns-and-nonlinear-behavior/index.md)
