---
title: Training vs. Validation Error -- Spotting the Overfitting Point
description: given a live chart of training error and validation error over training time, the learner will identify the specific point where continued training begins to overfit the model, and explain why the two curves diverge after that point (Bloom: Analyzing).
status: scaffold
library: Chart.js
bloom_level: TBD
---

# Training vs. Validation Error -- Spotting the Overfitting Point



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
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

## Related Resources

- [Chapter 22: Artificial Intelligence and Machine Learning Foundations](../../chapters/22-ai-and-machine-learning-foundations/index.md)
