---
title: "Learning Curve vs. Experience Curve"
description: "Compare the learning curve against the experience curve on a log-scaled production axis and see why one falls faster."
image: /sims/learning-experience-curve-chart/learning-experience-curve-chart.png
og:image: /sims/learning-experience-curve-chart/learning-experience-curve-chart.png
twitter:image: /sims/learning-experience-curve-chart/learning-experience-curve-chart.png
social:
  cards: false
status: implemented
library: Chart.js
bloom_level: Analyze
bloom_verb: Compare
chapter: 24
---

# Learning Curve vs. Experience Curve

<iframe src="main.html" width="100%" height="522" scrolling="no"></iframe>

[Run the Learning Curve vs. Experience Curve MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Both curves follow the same power law and differ only in what they measure. The learning curve tracks labor time and retains about 80 percent of its cost per doubling; the experience curve tracks total unit cost and retains about 65 percent, because it also captures process, supply-chain and equipment improvements. The gap between them is the part that is not about workers getting faster.

**Learning objective:** Given live cost-versus-cumulative-production curves, the learner will compare the learning curve (labor time only) and the experience curve (total unit cost) and explain why the experience curve typically declines faster.

**Bloom's Taxonomy level:** Analyze (Compare)

## How To Use

- Drag the Cumulative Units slider and read both curves' values at the playhead.
- Read the gap figure under the chart - it is the part of cost reduction that is not labor.
- Hover either line for exact values at any production volume.
- Note the log x-axis: each step right is a tenfold increase in cumulative output.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/learning-experience-curve-chart/main.html"
        width="100%" height="522" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Can read a line chart
- Knows what unit cost means

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Compare the two curves at a given cumulative volume
- Explain why the experience curve declines faster
- Interpret a logarithmic production axis correctly

### Suggested Activity (12 minutes)

1. Set the slider to 100 units and read both values.
2. Move to 10,000 and read again, then compute how much each fell.
3. Ask what the gap between the two curves represents.
4. Ask why the x-axis is logarithmic rather than linear.
5. Apply to a real product: what would 100,000 cumulative units mean for its price?

### Assessment

Ask learners to predict both curves' values at a volume not shown, using the doubling rule, then check with the slider.

### Discussion Questions

- Why does cost fall per doubling rather than per unit?
- What happens to the curve when a product is redesigned?
- Can an organization buy its way down the experience curve?

## Specification

The specification below was extracted from
[Chapter 24: Knowledge Systems and Economic Complexity](../../chapters/24-knowledge-systems-and-economic-complexity/index.md).

```text
Type: chart
**sim-id:** learning-experience-curve-chart<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: given live cost-versus-cumulative-production curves, the learner will compare the learning curve (labor time only) and the experience curve (total unit cost) and explain why the experience curve typically declines faster (Bloom: Analyze).

Canvas: responsive Chart.js line chart, full container width, fixed 400px height, log-scaled x-axis, redrawn on window resize.

Visual design: x-axis labeled "Cumulative Units Produced" (log scale, 1 to 100,000), y-axis labeled "Relative Unit Cost (%, starting at 100)." Two lines: "Learning Curve (labor time only)" declining to about 65% of its starting value by 100,000 units, and "Experience Curve (total unit cost)" declining more steeply, to about 35% of its starting value over the same range, reflecting the added contribution of process, supply-chain, and equipment improvements.

Controls: a slider labeled "Cumulative Units Produced" that moves a vertical playhead across the log-scaled x-axis; a text readout beside the slider reports both curves' current relative-cost value at the selected production volume.

Interaction: hovering either line at any point on the x-axis shows a tooltip with that curve's precise relative-cost value and the underlying cumulative-unit count.

Implementation: Chart.js line chart with a logarithmic x-axis scale, two pre-computed data series following a standard power-law decay formula \( C(n) = C_0 \cdot n^{\log_2(r)} \), where \( C_0 \) is the starting unit cost, \( n \) is cumulative units produced, and \( r \) is the retention fraction per doubling (0.80 for the learning curve, 0.65 for the experience curve), canvas resized via Chart.js's built-in `responsive: true` option.
```

## References

- [Experience curve effects - Wikipedia](https://en.wikipedia.org/wiki/Experience_curve_effects) - The power law and the two curve variants.
- [Learning curve](https://en.wikipedia.org/wiki/Learning_curve) - The labor-time-only version.
- [Wright's law](https://en.wikipedia.org/wiki/Experience_curve_effects) - The 1936 aircraft-manufacturing origin of the formula.

## Related Resources

- [Chapter 24: Knowledge Systems and Economic Complexity](../../chapters/24-knowledge-systems-and-economic-complexity/index.md)
- [All MicroSims in this book](../index.md)
