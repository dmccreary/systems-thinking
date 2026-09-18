---
title: "Emergence From Local Rules"
description: "Weight three local steering rules and predict the flock-level pattern that no individual agent computes."
image: /sims/emergence-local-rules/emergence-local-rules.png
og:image: /sims/emergence-local-rules/emergence-local-rules.png
twitter:image: /sims/emergence-local-rules/emergence-local-rules.png
social:
  cards: false
status: implemented
library: p5.js
bloom_level: Analyze
bloom_verb: Predict
chapter: 14
---

# Emergence From Local Rules

<iframe src="main.html" width="100%" height="620" scrolling="no"></iframe>

[Run the Emergence From Local Rules MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Rules are a high-leverage place to intervene precisely because small rule changes produce large behavioral changes. Here you control the weight of three local rules - separation, alignment and cohesion - and the flock-level pattern that results. The infobox describes what the flock is doing, computed from global information that no individual agent has access to.

**Learning objective:** Given a small set of local interaction rules, the learner will predict the emergent global pattern the agents will produce as a group, then compare that prediction against the running simulation.

**Bloom's Taxonomy level:** Analyze (Predict)

## How To Use

- Press Start, then adjust the three rule-weight sliders and watch the group pattern respond.
- Check "Show One Agent's Local Radius" to see exactly how little any single agent can see.
- Read the infobox below the canvas: it names the current flock-level pattern.
- Press "Scatter Agents" to randomize everything and watch the pattern re-form from scratch.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/emergence-local-rules/main.html"
        width="100%" height="620" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Has seen an agent-based simulation
- Knows what emergence means

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Predict a global pattern from a set of local rule weights
- Explain why changing a rule is a stronger intervention than changing a parameter
- Distinguish information available to an agent from information available to an observer

### Suggested Activity (15 minutes)

1. Set alignment high and cohesion low. Ask learners to predict the pattern, then run.
2. Reverse the two and predict again.
3. Set separation to zero and ask what will go wrong.
4. Turn on the local radius circle and ask: how does this agent know where the flock is going? It does not.
5. Ask learners which single slider, changed by one step, most changes the outcome.

### Assessment

Give learners a set of three slider values and ask them to describe the resulting flock pattern in one sentence before running it.

### Discussion Questions

- Meadows ranks rules above parameters as leverage points. Does this simulation support that?
- What are the three local rules in a busy hallway or a checkout queue?
- If you wanted to change the flock's shape, would you rather change a rule or add a leader?

## Specification

The specification below was extracted from
[Chapter 14: Leverage Points -- Rules, Paradigms, and Emergence](../../chapters/14-leverage-points-rules-paradigms-and-emergence/index.md).

```text
Type: microsim
**sim-id:** emergence-local-rules<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/ecology/tree/main/docs/sims/emergence-simulator

Learning objective: given a small set of local interaction rules, the learner will predict the emergent global pattern the agents will produce as a group, then compare that prediction against the running simulation (Bloom: Analyzing).

Canvas: 700x500 pixels, responsive -- recompute canvas width from the containing element's width on window resize and redraw at the new size, exactly as this book's other p5.js MicroSims do.

Visual design: 80-120 small triangular agents ("boids") move across the canvas, each colored a neutral slate-blue. Each agent's own heading is drawn as its triangle's point direction so its current local decision is visible at a glance.

Behavior: each agent updates its heading every frame using only the positions and headings of agents within a small local radius (drawn as a faint, togglable circle around one selected agent for illustration) -- never using any global information about the whole flock. Three local rules combine to set each agent's next heading: separation (steer away from local neighbors that are too close), alignment (steer toward the average heading of local neighbors), and cohesion (steer toward the average position of local neighbors). No agent knows or computes the group's overall shape.

Controls (p5.js built-in controls only, per this book's control conventions):

- Three `createSlider()` sliders labeled "Separation," "Alignment," and "Cohesion," each ranging 0-100, defaulting to 50, controlling the relative weight of each of the three local rules.
- A `createButton()` labeled "Scatter Agents" that randomizes every agent's position and heading, useful for watching the global pattern re-emerge from scratch.
- A `createButton()` labeled "Pause / Resume" that freezes and unfreezes the simulation.
- A `createCheckbox()` labeled "Show One Agent's Local Radius" that toggles the faint local-interaction circle described above.

Infobox: a text panel below the canvas updates every few seconds with a plain-language description of the current emergent global pattern (e.g., "The flock has split into two loosely connected clusters" or "The flock is moving as one tight, aligned group"), so the reader can compare the system-level description against what any single agent could have known.

Implementation: p5.js boids algorithm (Craig Reynolds' 1986 formulation), canvas parented to `document.querySelector('main')`, `updateCanvasSize()` called first in `setup()` per this book's MicroSim conventions.
```

## References

- [Boids - Wikipedia](https://en.wikipedia.org/wiki/Boids) - Craig Reynolds' three local rules, implemented here.
- [Leverage point](https://en.wikipedia.org/wiki/Twelve_leverage_points) - Meadows' ranking, which places rules above parameters.
- [Self-organization](https://en.wikipedia.org/wiki/Self-organization) - Order arising without external direction.

## Related Resources

- [Chapter 14: Leverage Points -- Rules, Paradigms, and Emergence](../../chapters/14-leverage-points-rules-paradigms-and-emergence/index.md)
- [All MicroSims in this book](../index.md)
