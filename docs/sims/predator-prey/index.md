---
title: "Predator-Prey Population Dynamics"
description: "Watch predator and prey populations oscillate out of phase in an animated Lotka-Volterra meadow."
image: /sims/predator-prey/predator-prey.png
og:image: /sims/predator-prey/predator-prey.png
twitter:image: /sims/predator-prey/predator-prey.png
social:
  cards: false
status: implemented
library: p5.js
bloom_level: Understand
bloom_verb: Explain
chapter: 27
---

# Predator-Prey Population Dynamics

<iframe src="main.html" width="100%" height="697" scrolling="no"></iframe>

[Run the Predator-Prey Population Dynamics MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Reused from this author's MicroSim catalog. An animated meadow with real-time population graphs, implementing the Lotka-Volterra equations. The phase lag is the teaching point: predators peak after prey peak, because the predator population responds to a prey abundance that has already passed - which is the same delay that produced overshoot back in Chapter 6.

**Learning objective:** Given the animated predator and prey populations, the learner will explain why the two populations oscillate out of phase over time in a balancing feedback system.

**Bloom's Taxonomy level:** Understand (Explain)

## How To Use

- Start the simulation and watch both populations move in the meadow and on the graphs.
- Compare the two peaks on the graph: the predator peak always comes after the prey peak.
- Adjust the parameters and watch how the oscillation's amplitude and period change.
- Note that neither population settles - the balancing loop cycles rather than converging.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/predator-prey/main.html"
        width="100%" height="697" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows what a balancing loop is
- Has seen a time-series graph

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Explain why the two populations oscillate out of phase
- Identify the feedback delay that produces the phase lag
- Recognize the same delay-driven oscillation in non-ecological systems

### Suggested Activity (12 minutes)

1. Run the simulation and ask learners which population peaks first.
2. Ask why the predator peak lags rather than coinciding.
3. Ask what would happen if predators could respond instantly to prey abundance.
4. Connect back to the logistic growth explorer: it is the same delay mechanism.
5. Ask learners to name a business cycle with the same phase-lagged structure.

### Assessment

Show a phase-lagged pair of curves and ask learners to identify which is the predator and to justify the answer from the lag.

### Discussion Questions

- Why does this balancing loop oscillate rather than settle?
- What is the predator-prey equivalent in a hiring market, or in inventory management?
- What would damp the oscillation?

## Specification

The specification below was extracted from
[Chapter 27: Systems Thinking Across Disciplines](../../chapters/27-systems-thinking-across-disciplines/index.md).

```text
Type: microsim
**sim-id:** predator-prey<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/ecology/sims/predator-prey/main.html<br/>
**Source Repo:** https://github.com/dmccreary/ecology/tree/main/docs/sims/predator-prey

Reused from the cross-book MicroSim catalog (WHAT match score 0.7805, verified live). An interactive MicroSim modeling Lotka-Volterra predator-prey oscillations with an animated meadow and real-time population graphs. Learning objective: given the animated predator and prey populations, the learner will explain why the two populations oscillate out of phase over time in a balancing feedback system (Bloom: Understanding).
```

## References

- [Lotka-Volterra equations - Wikipedia](https://en.wikipedia.org/wiki/Lotka%E2%80%93Volterra_equations) - The model this simulation implements.
- [Predation](https://en.wikipedia.org/wiki/Predation) - The ecological relationship being modeled.
- [Source MicroSim](https://dmccreary.github.io/ecology/sims/predator-prey/main.html) - The original version of this simulation.

## Related Resources

- [Chapter 27: Systems Thinking Across Disciplines](../../chapters/27-systems-thinking-across-disciplines/index.md)
- [All MicroSims in this book](../index.md)
