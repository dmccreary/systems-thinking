---
title: Logistic Growth S-Curve Explorer
description: Given a carrying capacity and a feedback-delay setting, the learner will predict whether a growing quantity settles into a smooth S-curve, overshoots and recovers, or overshoots and collapses (Bloom: Analyzing).
status: scaffold
library: p5.js
bloom_level: Analyze
---

# Logistic Growth S-Curve Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 6: Growth Patterns and Nonlinear Behavior](../../chapters/06-growth-patterns-and-nonlinear-behavior/index.md).

```text
Type: microsim
**sim-id:** logistic-growth-explorer<br/>
**Library:** p5.js<br/>
**Template:** https://github.com/dmccreary/ecology/tree/main/docs/sims/population-growth<br/>
**Status:** Specified

Purpose: Let learners compare pure exponential growth against logistic (S-curve) growth, and see how response delay turns a smooth S-curve into overshoot or overshoot-and-collapse.

Bloom Taxonomy Level: Analyze
Bloom Taxonomy Verb: Compare / Predict

Learning Objective: Given a carrying capacity and a feedback-delay setting, the learner will predict whether a growing quantity settles into a smooth S-curve, overshoots and recovers, or overshoots and collapses (Bloom: Analyzing).

Canvas: 700x460 default, responsive — recompute plot axes as a proportion of `canvas.width` inside a `windowResized()` handler.

Visual elements:
- A single time-series chart plotting quantity (y-axis) against time (x-axis), with a dashed horizontal line marking the current carrying capacity K.
- Three selectable trace colors: pure exponential (light gray, for reference, uncapped), logistic S-curve (green), and the current delay-affected run (blue), all drawn on the same axes for direct comparison.
- A live readout showing current value, percent of carrying capacity, and elapsed time steps.

Controls:
- A growth-rate slider (`createSlider()`, range 0.05-0.5) setting \( r \).
- A carrying-capacity slider (range 50-500) setting \( K \).
- A response-delay slider (range 0-15 time steps) determining how many steps elapse between the stock exceeding K and the balancing term fully engaging; at delay 0 the curve is a textbook smooth S-curve, at moderate delay it overshoots and settles back near K, and at high delay combined with a "fragile limit" checkbox it overshoots and collapses to well below K (simulating capacity damage).
- A "fragile limit" checkbox (`createCheckbox()`) that, when checked and combined with a high delay, permanently lowers K after an overshoot, producing the overshoot-and-collapse pattern rather than mere overshoot.
- A "Run" button and a "Reset" button built with `createButton()`.

Interactivity requirement: every slider and checkbox immediately changes the plotted curve and live readout on the next simulation step, giving direct, visible feedback tying delay and limit fragility to the resulting growth shape.

Color scheme: exponential reference trace in neutral gray, logistic S-curve in the book's balancing-loop green, delay-affected run in the reinforcing-loop red once it exceeds K (to visually flag overshoot), carrying-capacity line as a dashed dark gray.

Implementation: p5.js sketch computing the logistic difference equation \( N_{t+1} = N_t + rN_t(1 - N_t/K)\,\Delta t \) each frame, with a delay buffer storing past \((1-N/K)\) terms so the currently applied balancing strength lags behind the current stock by the slider's delay amount; a "fragile limit" flag reduces K once N exceeds it by more than a set margin.
```

## Related Resources

- [Chapter 6: Growth Patterns and Nonlinear Behavior](../../chapters/06-growth-patterns-and-nonlinear-behavior/index.md)
