---
title: "Logistic Map Bifurcation Explorer"
description: "Drag one parameter through the logistic map's route to chaos and watch two near-identical trajectories separate."
image: /sims/logistic-map-bifurcation-explorer/logistic-map-bifurcation-explorer.png
og:image: /sims/logistic-map-bifurcation-explorer/logistic-map-bifurcation-explorer.png
twitter:image: /sims/logistic-map-bifurcation-explorer/logistic-map-bifurcation-explorer.png
social:
  cards: false
status: implemented
library: p5.js
bloom_level: Analyze
bloom_verb: Classify
chapter: 6
---

# Logistic Map Bifurcation Explorer

<iframe src="main.html" width="100%" height="538" scrolling="no"></iframe>

[Run the Logistic Map Bifurcation Explorer MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

One parameter, one line of arithmetic, and the long-term behavior changes qualitatively as you turn the dial: a single settling value, then an alternation between two, then four, then no pattern at all. The right panel runs two trajectories seeded one ten-thousandth apart, which stay together in the periodic regime and become unrelated in the chaotic one.

**Learning objective:** Given a range of parameter values for the logistic map, the learner will classify the resulting long-term behavior as a fixed point, a periodic cycle, or chaos.

**Bloom's Taxonomy level:** Analyze (Classify)

## How To Use

- Drag the r slider slowly from 2.4 upward and watch the classification label change.
- Click anywhere in the bifurcation diagram to jump r to that value.
- Watch the two trajectory panels on the right. In the chaotic range they separate within a few dozen steps.
- Press "Reset Trajectories" to reseed them at the same r.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/logistic-map-bifurcation-explorer/main.html"
        width="100%" height="538" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Can read a line graph
- Knows that a simple rule can be applied repeatedly

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Classify long-term behavior as fixed point, periodic, or chaotic
- Explain sensitivity to initial conditions from the two trajectory panels
- Recognize that deterministic does not mean predictable

### Suggested Activity (15 minutes)

1. Set r to 2.6 and ask what the long-term behavior is.
2. Raise r slowly and have learners call out each bifurcation as it happens.
3. Set r to 3.9 and ask learners to compare the two trajectory panels.
4. Ask: both panels run the exact same equation. Why do they differ?
5. Discuss what this means for weather forecasting.

### Assessment

Give learners three r values and ask for the classification of each. Then ask what the two trajectory panels would look like at each value.

### Discussion Questions

- If the equation is fully deterministic, in what sense is the result unpredictable?
- What is the practical difference between random and chaotic?
- Why does more precise measurement not solve the forecasting problem?

## Specification

The specification below was extracted from
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

## References

- [Logistic map - Wikipedia](https://en.wikipedia.org/wiki/Logistic_map) - The equation and its period-doubling route to chaos.
- [Butterfly effect](https://en.wikipedia.org/wiki/Butterfly_effect) - Sensitivity to initial conditions, demonstrated in the right panel.
- [Robert May](https://en.wikipedia.org/wiki/Robert_May,_Baron_May_of_Oxford) - The ecologist whose 1976 paper made the logistic map famous.

## Related Resources

- [Chapter 6: Growth Patterns and Nonlinear Behavior](../../chapters/06-growth-patterns-and-nonlinear-behavior/index.md)
- [All MicroSims in this book](../index.md)
