---
title: "Training vs. Validation Error -- Spotting the Overfitting Point"
description: "Slide through 50 training epochs and find the exact point where validation error turns upward."
image: /sims/overfitting-error-curves/overfitting-error-curves.png
og:image: /sims/overfitting-error-curves/overfitting-error-curves.png
twitter:image: /sims/overfitting-error-curves/overfitting-error-curves.png
social:
  cards: false
status: implemented
library: Chart.js
bloom_level: Analyze
bloom_verb: Identify
chapter: 22
---

# Training vs. Validation Error -- Spotting the Overfitting Point

<iframe src="main.html" width="100%" height="522" scrolling="no"></iframe>

[Run the Training vs. Validation Error -- Spotting the Overfitting Point MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Training error falls forever; validation error does not. The gap between them is the whole diagnostic. This chart marks the epoch where validation error bottoms out, and the slider lets you walk across that boundary and read both values at each step - including the uncomfortable stretch where the model is visibly getting better and actually getting worse.

**Learning objective:** Given a live chart of training error and validation error over training time, the learner will identify the specific point where continued training begins to overfit the model, and explain why the two curves diverge after that point.

**Bloom's Taxonomy level:** Analyze (Identify)

## How To Use

- Drag the Training Epoch slider and read both error values at each position.
- Watch the phase line under the chart change from "still learning" to "now overfitting".
- Press "Highlight Overfitting Zone" to shade everything after the marker.
- Hover either curve for exact values at any epoch.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/overfitting-error-curves/main.html"
        width="100%" height="522" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows that a model is trained on data
- Can read a two-series line chart

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Identify the overfitting point from two error curves
- Explain why training error keeps falling after that point
- Describe what early stopping does and why it works

### Suggested Activity (12 minutes)

1. Show only the training error curve and ask learners when to stop training. Most say never.
2. Reveal the validation curve and ask again.
3. Have learners find the exact epoch where validation error is lowest.
4. Ask what the model is learning between epoch 15 and epoch 50.
5. Ask why you need a validation set that the model never trains on.

### Assessment

Give learners a pair of error curves and ask for the stopping epoch plus a one-sentence reason.

### Discussion Questions

- Why does a model that fits the training data perfectly generalize badly?
- What is the human equivalent of overfitting?
- Why is holding out data an inconvenience worth paying for?

## Specification

The specification below was extracted from
[Chapter 22: Artificial Intelligence and Machine Learning Foundations](../../chapters/22-ai-and-machine-learning-foundations/index.md).

```text
Type: chart
**sim-id:** overfitting-error-curves<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: given a live chart of training error and validation error over training time, the learner will identify the specific point where continued training begins to overfit the model, and explain why the two curves diverge after that point (Bloom: Analyzing).

Canvas: responsive Chart.js line chart, full container width, fixed 400px height, redrawn on window resize.

Visual design: an x-axis labeled "Training Epoch" from 0 to 50, and a y-axis labeled "Error Rate." Two lines: "Training Error" (declining smoothly and continuously toward zero as epochs increase) and "Validation Error" (declining alongside training error until roughly epoch 15, then turning upward and increasing steadily afterward). A vertical dashed marker line is drawn automatically at the epoch where validation error reaches its minimum, labeled "Overfitting Begins Here."

Controls (p5.js-style built-in equivalents adapted for a Chart.js context): a `createSlider()`-style range control labeled "Training Epoch," from 0 to 50, that moves a vertical playhead across the chart; a text readout beside the slider reports both curves' current error value at the selected epoch.

Interaction: hovering over either line at any epoch shows a tooltip with that curve's exact error value at that point. A "Highlight Overfitting Zone" button shades the region after the dashed marker line, visually distinguishing "still learning" from "now overfitting."

Implementation: Chart.js line chart with two pre-computed data series (a smooth monotonic decay for training error, a decay-then-rise curve for validation error), a custom Chart.js plugin drawing the dashed vertical marker at the validation-error minimum, canvas resized via Chart.js's built-in `responsive: true` option.
```

## References

- [Overfitting - Wikipedia](https://en.wikipedia.org/wiki/Overfitting) - Why fitting training data too well hurts generalization.
- [Early stopping](https://en.wikipedia.org/wiki/Early_stopping) - The technique the dashed marker recommends.
- [Training, validation, and test sets](https://en.wikipedia.org/wiki/Training,_validation,_and_test_data_sets) - Why the held-out split exists.

## Related Resources

- [Chapter 22: Artificial Intelligence and Machine Learning Foundations](../../chapters/22-ai-and-machine-learning-foundations/index.md)
- [All MicroSims in this book](../index.md)
