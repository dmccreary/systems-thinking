---
title: "Logistic Growth S-Curve Explorer"
description: "Add response delay to logistic growth and watch a smooth S-curve turn into overshoot, then into collapse."
image: /sims/logistic-growth-explorer/logistic-growth-explorer.png
og:image: /sims/logistic-growth-explorer/logistic-growth-explorer.png
twitter:image: /sims/logistic-growth-explorer/logistic-growth-explorer.png
social:
  cards: false
status: implemented
library: p5.js
bloom_level: Analyze
bloom_verb: Predict
chapter: 6
---

# Logistic Growth S-Curve Explorer

<iframe src="main.html" width="100%" height="548" scrolling="no"></iframe>

[Run the Logistic Growth S-Curve Explorer MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Every real limit has a delay attached: the signal that you have passed it arrives late. This MicroSim lets you dial that delay in. At zero delay you get the textbook S-curve. At moderate delay the quantity sails past the limit and settles back. At high delay with a fragile limit, the overshoot damages the limit itself and the system collapses to well below where it started heading.

**Learning objective:** Given a carrying capacity and a feedback-delay setting, the learner will predict whether a growing quantity settles into a smooth S-curve, overshoots and recovers, or overshoots and collapses.

**Bloom's Taxonomy level:** Analyze (Predict)

## How To Use

- Set the growth rate and carrying capacity, then press Run.
- Compare the three traces: gray exponential reference, green textbook logistic, blue your run.
- Raise the response delay and run again. Watch where the blue trace turns red as it exceeds K.
- Check "Fragile limit" with a high delay to produce overshoot-and-collapse rather than mere overshoot.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/logistic-growth-explorer/main.html"
        width="100%" height="548" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Has seen exponential growth
- Knows what a carrying capacity is

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Predict growth shape from the delay setting
- Explain why delay causes overshoot even when the limit is known
- Distinguish overshoot-and-recover from overshoot-and-collapse

### Suggested Activity (15 minutes)

1. Run at delay 0 and have learners describe the shape.
2. Raise delay to 6 and ask for a prediction before running.
3. Raise delay to 14 and predict again.
4. Enable "Fragile limit" at high delay and ask what changed about the ending.
5. Ask learners to name a real system with a fragile limit and a long feedback delay.

### Assessment

Give learners a delay setting and a fragile-limit state and ask them to sketch the resulting curve before running it.

### Discussion Questions

- Why does knowing the limit not prevent overshooting it?
- Which real limits are fragile, and which recover?
- What would shorten the feedback delay in a system you work with?

## Specification

The specification below was extracted from
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

## References

- [Logistic function - Wikipedia](https://en.wikipedia.org/wiki/Logistic_function) - The S-curve equation this simulation iterates.
- [Overshoot (population)](https://en.wikipedia.org/wiki/Overshoot_(population)) - What happens when a population passes its carrying capacity.
- [Carrying capacity](https://en.wikipedia.org/wiki/Carrying_capacity) - Why limits can themselves be damaged by overshoot.

## Related Resources

- [Chapter 6: Growth Patterns and Nonlinear Behavior](../../chapters/06-growth-patterns-and-nonlinear-behavior/index.md)
- [All MicroSims in this book](../index.md)
