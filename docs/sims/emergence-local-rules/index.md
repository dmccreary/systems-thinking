---
title: Emergence From Local Rules
description: given a small set of local interaction rules, the learner will predict the emergent global pattern the agents will produce as a group, then compare that prediction against the running simulation (Bloom: Analyzing).
status: scaffold
library: p5.js
bloom_level: TBD
---

# Emergence From Local Rules



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
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

## Related Resources

- [Chapter 14: Leverage Points -- Rules, Paradigms, and Emergence](../../chapters/14-leverage-points-rules-paradigms-and-emergence/index.md)
