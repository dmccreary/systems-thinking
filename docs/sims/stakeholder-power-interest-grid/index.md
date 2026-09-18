---
title: "Stakeholder Power-Interest Grid"
description: "Place stakeholders on a power-interest grid and justify a different engagement strategy for each quadrant."
image: /sims/stakeholder-power-interest-grid/stakeholder-power-interest-grid.png
og:image: /sims/stakeholder-power-interest-grid/stakeholder-power-interest-grid.png
twitter:image: /sims/stakeholder-power-interest-grid/stakeholder-power-interest-grid.png
social:
  cards: false
status: implemented
library: p5.js
bloom_level: Analyze
bloom_verb: Classify
chapter: 25
---

# Stakeholder Power-Interest Grid

<iframe src="main.html" width="100%" height="602" scrolling="no"></iframe>

[Run the Stakeholder Power-Interest Grid MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Reused from this author's MicroSim catalog. An interactive 2x2 grid with draggable stakeholder dots, attitude coloring for supportive, neutral and opposed positions, and a what-if scenario control. The quadrant a stakeholder lands in determines the engagement strategy, which is why the placing argument matters more than the placement.

**Learning objective:** Given a set of stakeholders in a system-design scenario, the learner will classify each one by power and interest and justify a prioritized engagement strategy for each quadrant.

**Bloom's Taxonomy level:** Analyze (Classify)

## How To Use

- Drag each stakeholder dot to the power and interest position you think it belongs at.
- Use the attitude coloring to note who is supportive, neutral or opposed.
- Try the what-if scenario control and see which stakeholders move.
- Name the engagement strategy for each quadrant before reading it.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/stakeholder-power-interest-grid/main.html"
        width="100%" height="602" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Has worked on a project with more than one interested party
- Can read a 2x2 matrix

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Classify stakeholders by power and interest
- Name an appropriate engagement strategy for each quadrant
- Explain why a high-power low-interest stakeholder is the dangerous one

### Suggested Activity (15 minutes)

1. Have learners place all stakeholders before any discussion.
2. Compare placements across the group and argue the disagreements - the argument is the exercise.
3. Ask which quadrant gets ignored most often in practice.
4. Run the what-if scenario and ask who moved and why.
5. Have learners build a grid for a project they are actually working on.

### Assessment

Ask learners to justify one stakeholder's placement and to state the engagement strategy that follows from it.

### Discussion Questions

- Why is a high-power, low-interest stakeholder the one most likely to derail a project late?
- Does attitude change the strategy, or only the effort required?
- How often should a grid like this be redrawn?

## Specification

The specification below was extracted from
[Chapter 25: Systems Design, Emerging Technology, and Practice](../../chapters/25-systems-design-emerging-technology-and-practice/index.md).

```text
Type: matrix
**sim-id:** stakeholder-power-interest-grid<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/information-systems/sims/stakeholder-power-interest-grid/main.html<br/>
**Source Repo:** https://github.com/dmccreary/information-systems/tree/main/docs/sims/stakeholder-power-interest-grid

Reused from the cross-book MicroSim catalog (WHAT match score 0.8463, verified live). An interactive 2x2 power-interest grid with draggable stakeholder dots, attitude coloring (supportive, neutral, opposed), and a what-if scenario control. Learning objective: given a set of stakeholders in a system-design scenario, the learner will classify each one by power and interest and justify a prioritized engagement strategy for each quadrant (Bloom: Analyzing).
```

## References

- [Stakeholder analysis - Wikipedia](https://en.wikipedia.org/wiki/Stakeholder_analysis) - The power-interest grid and its quadrant strategies.
- [Stakeholder theory](https://en.wikipedia.org/wiki/Stakeholder_theory) - The broader framework the grid belongs to.
- [Source MicroSim](https://dmccreary.github.io/information-systems/sims/stakeholder-power-interest-grid/main.html) - The original version of this simulation.

## Related Resources

- [Chapter 25: Systems Design, Emerging Technology, and Practice](../../chapters/25-systems-design-emerging-technology-and-practice/index.md)
- [All MicroSims in this book](../index.md)
