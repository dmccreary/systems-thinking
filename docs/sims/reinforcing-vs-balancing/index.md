---
title: "Reinforcing vs. Balancing Loop Simulator"
description: "Compare a reinforcing loop's runaway growth curve against a balancing loop's goal-seeking convergence, side by side."
image: /sims/reinforcing-vs-balancing/reinforcing-vs-balancing.png
og:image: /sims/reinforcing-vs-balancing/reinforcing-vs-balancing.png
twitter:image: /sims/reinforcing-vs-balancing/reinforcing-vs-balancing.png
social:
  cards: false
status: implemented
library: p5.js
bloom_level: Analyze
bloom_verb: Compare
chapter: 3
---

# Reinforcing vs. Balancing Loop Simulator

<iframe src="main.html" width="100%" height="582" scrolling="no"></iframe>

[Run the Reinforcing vs. Balancing Loop Simulator MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Reused from this author's MicroSim catalog. A loop's structure predicts its behavior over time, and the two loop types have signatures you can learn to recognize on sight: reinforcing loops produce accelerating growth or collapse, balancing loops produce convergence toward a goal. Seeing both curves drawn on the same run is what makes the signatures stick.

**Learning objective:** Given animated behavior-over-time graphs, the learner will compare the characteristic signature of a reinforcing loop against that of a balancing loop.

**Bloom's Taxonomy level:** Analyze (Compare)

## How To Use

- Set the initial value and loop strength, then run the simulation.
- Watch both time-series graphs fill in together.
- Compare the shapes rather than the numbers - the shape is the diagnostic.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/reinforcing-vs-balancing/main.html"
        width="100%" height="582" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Can classify a loop as reinforcing or balancing
- Has seen a behavior-over-time graph

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Recognize a reinforcing loop from its behavior-over-time signature
- Recognize a balancing loop from its convergence toward a goal
- Predict loop type from a behavior graph alone

### Suggested Activity (12 minutes)

1. Run the simulation once and ask learners to describe each curve in words.
2. Increase loop strength and ask how each curve changes, and how each does not.
3. Show only one curve and ask learners to name the loop type that produced it.
4. Ask learners to sketch what a system with both loops running at once would look like.

### Assessment

Show learners an unlabeled behavior-over-time curve and ask them to name the loop type and justify it from the shape.

### Discussion Questions

- Why does a balancing loop settle at a value rather than at zero?
- What real systems show an accelerating curve, and how long can that last?
- If you only had the behavior graph and not the diagram, what could you still infer?

## Specification

The specification below was extracted from
[Chapter 3: Causal Loop Diagram Notation and Loop Identification](../../chapters/03-cld-notation-and-loop-identification/index.md).

```text
Type: microsim
**sim-id:** reinforcing-vs-balancing<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/infographics/sims/reinforcing-vs-balancing/<br/>
**Source Repo:** https://github.com/dmccreary/infographics/tree/main/docs/sims/reinforcing-vs-balancing

Reused from the MicroSim catalog (WHAT match score 0.81). Side-by-side causal loop diagrams paired with animated time-series graphs, contrasting a reinforcing loop's unconstrained growth curve with a balancing loop's goal-seeking convergence curve. Learning objective: given animated behavior-over-time graphs, the learner will compare the characteristic signature of a reinforcing loop against that of a balancing loop (Bloom: Analyzing).
```

## References

- [Feedback - Wikipedia](https://en.wikipedia.org/wiki/Feedback) - The two basic feedback types and their dynamics.
- [Exponential growth](https://en.wikipedia.org/wiki/Exponential_growth) - The reinforcing loop's characteristic curve.
- [Source MicroSim](https://dmccreary.github.io/infographics/sims/reinforcing-vs-balancing/) - The original version of this simulation.

## Related Resources

- [Chapter 3: Causal Loop Diagram Notation and Loop Identification](../../chapters/03-cld-notation-and-loop-identification/index.md)
- [All MicroSims in this book](../index.md)
