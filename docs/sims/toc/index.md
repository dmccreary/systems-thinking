---
title: "Tragedy of the Commons Agent-Based Simulation"
description: "Add cows to a shared pasture and find the herd size at which the grass stops recovering between grazing cycles."
image: /sims/toc/toc.png
og:image: /sims/toc/toc.png
twitter:image: /sims/toc/toc.png
social:
  cards: false
status: implemented
library: p5.js
bloom_level: Analyze
bloom_verb: Identify
chapter: 11
---

# Tragedy of the Commons Agent-Based Simulation

<iframe src="main.html" width="100%" height="462" scrolling="no"></iframe>

[Run the Tragedy of the Commons Agent-Based Simulation MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Reused from this book's own sims collection. Each individual herder gains fully from adding one more cow and bears only a share of the cost to the pasture. Every herder reasoning that way is acting rationally, and the pasture still collapses. This simulation lets you find the threshold where regrowth stops keeping up - and notice that past it, every cow starves, not just the extra ones.

**Learning objective:** Given control over the size of a shared herd, the learner will identify the herd size at which the pasture stops recovering between grazing cycles.

**Bloom's Taxonomy level:** Analyze (Identify)

## How To Use

- Use the slider to set how many cows share the pasture.
- Press Start and watch the grass regrow between grazing passes.
- Raise the herd size gradually and find the point where the grass no longer recovers.
- Press Reset and try approaching the threshold from above instead of below.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/toc/main.html"
        width="100%" height="462" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows what a shared resource is
- Has seen a reinforcing loop

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Identify the threshold herd size at which a commons stops recovering
- Explain why individually rational choices produce a collectively irrational outcome
- Recognize that past the threshold the cost falls on everyone, not just the last entrant

### Suggested Activity (15 minutes)

1. Run with a small herd and confirm the grass keeps up.
2. Raise the herd by a few cows at a time, running each setting to a steady state.
3. Have learners record the threshold they find.
4. Ask: at the threshold, what would each individual herder gain by adding one more cow? What would they lose?
5. Discuss what institution would have to exist to stop the collapse.

### Assessment

Ask learners to state the threshold they found and to explain why no individual herder has a reason to stop below it.

### Discussion Questions

- Why does dividing the pasture into private plots change the outcome?
- What are the commons in your organization - meeting time, shared databases, on-call capacity?
- Elinor Ostrom found real communities that avoid this collapse. What do they have that this simulation does not?

## Specification

The specification below was extracted from
[Chapter 11: Tragedy of the Commons and Success to the Successful](../../chapters/11-tragedy-of-commons-and-success-to-successful/index.md).

```text
Type: microsim
**sim-id:** toc<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** ../../sims/toc/toc.html<br/>
**Source Repo:** local — docs/sims/toc

Reused from this book's own sims collection: a pasture of grass, grazed by a population of cow agents. A slider controls how many cows are added to the shared pasture, and Start/Stop and Reset buttons control the run. Watch how grass regrowth keeps pace with a small herd but collapses once the herd crosses a threshold, after which every cow — not just the extra ones — starts to starve. Learning objective: given control over the size of a shared herd, the learner will identify the herd size at which the pasture stops recovering between grazing cycles (Bloom: Analyzing).
```

## References

- [Tragedy of the commons - Wikipedia](https://en.wikipedia.org/wiki/Tragedy_of_the_commons) - Hardin's 1968 formulation of the archetype.
- [Elinor Ostrom](https://en.wikipedia.org/wiki/Elinor_Ostrom) - Nobel-winning work on communities that successfully govern commons.
- [Common-pool resource](https://en.wikipedia.org/wiki/Common-pool_resource) - The economic category this pasture belongs to.

## Related Resources

- [Chapter 11: Tragedy of the Commons and Success to the Successful](../../chapters/11-tragedy-of-commons-and-success-to-successful/index.md)
- [All MicroSims in this book](../index.md)
