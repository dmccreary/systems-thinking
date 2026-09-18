---
title: "Emergence Simulator (Flocking)"
description: "Watch coordinated flock-level movement appear from agents that each follow only local rules, with no central controller."
image: /sims/emergence-simulator/emergence-simulator.png
og:image: /sims/emergence-simulator/emergence-simulator.png
twitter:image: /sims/emergence-simulator/emergence-simulator.png
social:
  cards: false
status: implemented
library: p5.js
bloom_level: Understand
bloom_verb: Explain
chapter: 2
---

# Emergence Simulator (Flocking)

<iframe src="main.html" width="100%" height="517" scrolling="no"></iframe>

[Run the Emergence Simulator (Flocking) MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Reused from this author's MicroSim catalog. Each agent steers using only what it can see nearby. Nobody is in charge, no agent knows the shape of the flock, and yet flock-level coordination appears anyway. That gap between what the parts know and what the whole does is what the word emergence names.

**Learning objective:** Given a flock of simple agents each following local rules, the learner will explain how coordinated, flock-level movement emerges with no central controller.

**Bloom's Taxonomy level:** Understand (Explain)

## How To Use

- Start the simulation and watch the group behavior form.
- Adjust the rule weights and watch the global pattern change in response.
- Remember while watching: every agent is running the same small rule set, and none of them can see the flock.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/emergence-simulator/main.html"
        width="100%" height="517" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows what an agent is in a simulation
- Has seen at least one system whose behavior comes from interactions rather than parts

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Explain emergence as behavior of the whole that is not present in any part
- Describe how local rules can produce a global pattern
- Recognize that the absence of a controller is not the absence of organization

### Suggested Activity (10 minutes)

1. Ask learners to predict what a hundred agents following only local rules will do.
2. Run the simulation and compare the result to the prediction.
3. Ask: which agent is deciding where the flock goes? Sit with the discomfort of the answer.
4. Have learners name a human system where coordinated behavior appears without a coordinator.

### Assessment

Ask learners to explain, in two sentences, how the flock moves as a unit when no agent knows what the flock is doing. A correct answer references local interaction rather than shared information.

### Discussion Questions

- Traffic jams form with no one organizing them. What are the local rules?
- If emergence needs no controller, what does a manager actually add to an organization?
- Can emergent behavior be designed, or only encouraged?

## Specification

The specification below was extracted from
[Chapter 2: Mental Models and Systems Analysis Tools](../../chapters/02-mental-models-and-systems-analysis-tools/index.md).

```text
Type: microsim
**sim-id:** emergence-simulator<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/ecology/sims/emergence-simulator/<br/>
**Source Repo:** https://github.com/dmccreary/ecology/tree/main/docs/sims/emergence-simulator

Reused from the MicroSim catalog (WHAT match score 0.83). Learning objective: given a flock of simple agents each following local rules, the learner will explain how coordinated, flock-level movement emerges with no central controller (Bloom: Understanding).
```

## References

- [Boids - Wikipedia](https://en.wikipedia.org/wiki/Boids) - Craig Reynolds' 1986 flocking model, the basis of this simulation.
- [Emergence](https://en.wikipedia.org/wiki/Emergence) - How properties of a whole arise from interactions among parts.
- [Source MicroSim](https://dmccreary.github.io/ecology/sims/emergence-simulator/) - The original version of this simulation in the Ecology textbook.

## Related Resources

- [Chapter 2: Mental Models and Systems Analysis Tools](../../chapters/02-mental-models-and-systems-analysis-tools/index.md)
- [All MicroSims in this book](../index.md)
