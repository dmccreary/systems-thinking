---
title: "Growth Rate Comparison"
description: "Zoom the x-axis out and watch logarithmic, linear and exponential curves that looked similar separate dramatically."
image: /sims/growth-rates/growth-rates.png
og:image: /sims/growth-rates/growth-rates.png
twitter:image: /sims/growth-rates/growth-rates.png
social:
  cards: false
status: implemented
library: p5.js
bloom_level: Analyze
bloom_verb: Predict
chapter: 6
---

# Growth Rate Comparison

<iframe src="main.html" width="100%" height="522" scrolling="no"></iframe>

[Run the Growth Rate Comparison MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Reused from this author's MicroSim catalog. Over a short interval, a logarithmic curve, a polynomial and an exponential can look comparably sized. Zoom out and they separate so dramatically that the first two flatten against the axis. This is why extrapolating from a short window is one of the most reliable ways to be wrong about a system.

**Learning objective:** Given several growth patterns that appear similar over a short interval, the learner will predict which one dominates over a much longer interval.

**Bloom's Taxonomy level:** Analyze (Predict)

## How To Use

- Start with the x-axis at its narrowest range and compare the three curves.
- Zoom the x-axis out step by step and watch the ordering become unmistakable.
- Note how much of the zoomed-out chart is taken up by the exponential alone.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/growth-rates/main.html"
        width="100%" height="522" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Has seen a line graph with two or more series
- Knows roughly what exponential means

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Predict which growth pattern dominates at scale
- Explain why a short observation window hides growth-rate differences
- Recognize the risk of extrapolating from a narrow range

### Suggested Activity (10 minutes)

1. At the narrow range, ask learners to rank the three curves by size.
2. Ask them to predict the ranking at a thousand times the range.
3. Zoom out and compare to the prediction.
4. Ask what this implies about a technology whose adoption has grown for six months.

### Assessment

Show learners a short segment of two curves and ask which will dominate at scale, with a justification based on growth type rather than current value.

### Discussion Questions

- Why do exponential processes feel slow right up until they feel sudden?
- What in your work is growing logarithmically, and what is growing exponentially?
- How would you tell the difference from six months of data?

## Specification

The specification below was extracted from
[Chapter 6: Growth Patterns and Nonlinear Behavior](../../chapters/06-growth-patterns-and-nonlinear-behavior/index.md).

```text
Type: chart
**sim-id:** growth-rates<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/calculus/sims/growth-rates/<br/>
**Source Repo:** https://github.com/dmccreary/calculus/tree/main/docs/sims/growth-rates

Reused from the MicroSim catalog (WHAT match score 0.76). Plots logarithmic, linear/polynomial, and exponential quantities on the same axes and lets the viewer zoom the x-axis from x=1-10 out to x=100-1000, showing that functions which look comparably sized up close separate dramatically at scale. Learning objective: given several growth patterns that appear similar over a short interval, the learner will predict which one dominates over a much longer interval (Bloom: Analyzing).
```

## References

- [Exponential growth - Wikipedia](https://en.wikipedia.org/wiki/Exponential_growth) - Why exponentials eventually dominate any polynomial.
- [Logarithmic growth](https://en.wikipedia.org/wiki/Logarithmic_growth) - The slowest of the three growth patterns shown.
- [Source MicroSim](https://dmccreary.github.io/calculus/sims/growth-rates/) - The original version of this simulation.

## Related Resources

- [Chapter 6: Growth Patterns and Nonlinear Behavior](../../chapters/06-growth-patterns-and-nonlinear-behavior/index.md)
- [All MicroSims in this book](../index.md)
