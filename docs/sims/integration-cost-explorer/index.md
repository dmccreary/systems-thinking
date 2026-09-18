---
title: "Point-to-Point vs. Hub Integration Cost"
description: "Move one slider and watch point-to-point connections grow as N(N-1)/2 while hub connections grow as N."
image: /sims/integration-cost-explorer/integration-cost-explorer.png
og:image: /sims/integration-cost-explorer/integration-cost-explorer.png
twitter:image: /sims/integration-cost-explorer/integration-cost-explorer.png
social:
  cards: false
status: implemented
library: p5.js
bloom_level: Apply
bloom_verb: Calculate
chapter: 18
---

# Point-to-Point vs. Hub Integration Cost

<iframe src="main.html" width="100%" height="507" scrolling="no"></iframe>

[Run the Point-to-Point vs. Hub Integration Cost MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Point-to-point integration feels reasonable at three systems and is unmanageable at twenty, and the reason is arithmetic rather than judgment. This MicroSim puts both architectures on screen with the same N and lets you drag the slider until the difference stops being arguable.

**Learning objective:** Given a number of systems needing to exchange data, the learner will calculate the number of connections required under a point-to-point architecture versus a hub architecture, and explain why the hub scales better.

**Bloom's Taxonomy level:** Apply (Calculate)

## How To Use

- Drag the "Number of Systems" slider from 3 upward.
- Watch both panels redraw and both counts update live.
- Compare the two formulas shown under each panel: N(N-1)/2 against N.
- Push the slider to 20 and read how many connections the point-to-point architecture needs.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/integration-cost-explorer/main.html"
        width="100%" height="507" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Can read a simple formula
- Knows what a system integration is

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Calculate the connection count for both architectures at a given N
- Explain why quadratic growth makes point-to-point unmanageable
- Recognize the hub pattern when it appears in other contexts

### Suggested Activity (10 minutes)

1. Set N to 3 and ask which architecture learners would choose. Most say point-to-point, reasonably.
2. Set N to 6 and ask again.
3. Set N to 20 and read both numbers aloud.
4. Ask at what N the hub becomes worth its own cost and complexity.
5. Ask learners to count the actual integrations in their own organization.

### Assessment

Ask learners to compute both counts for N = 12 without the slider, then check.

### Discussion Questions

- What does the hub cost that point-to-point does not?
- Why do organizations end up with point-to-point integration even when they know the arithmetic?
- Where else does this same N-versus-N-squared pattern show up?

## Specification

The specification below was extracted from
[Chapter 18: Data Management and Governance](../../chapters/18-data-management-and-governance/index.md).

```text
Type: microsim
**sim-id:** integration-cost-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: given a number of systems needing to exchange data, the learner will calculate the number of connections required under a point-to-point architecture versus a hub architecture, and explain why the hub scales better (Bloom: Applying).

Canvas: 700x500 pixels, responsive -- recompute canvas width from the containing element on window resize.

Visual design: two side-by-side panels. The left "Point-to-Point" panel draws N small system icons arranged in a circle with a direct line connecting every pair. The right "Hub" panel draws the same N system icons arranged in a circle around one central hub icon, each connected only to the hub.

Controls (p5.js built-in controls only, per this book's control conventions): a `createSlider()` labeled "Number of Systems (N)" ranging from 3 to 20, defaulting to 6, redrawing both panels live as it moves.

Behavior: a text readout below each panel updates with the live connection count -- the point-to-point panel shows \( \binom{N}{2} \) and the hub panel shows \( N \) -- so moving the slider from a small N to a large one visibly shows point-to-point connections growing far faster than the hub's straight-line growth.

Implementation: p5.js, canvas parented to `document.querySelector('main')`, `updateCanvasSize()` called first in `setup()` per this book's MicroSim conventions, connection lines and counts recomputed every time the slider changes.
```

## References

- [Enterprise service bus - Wikipedia](https://en.wikipedia.org/wiki/Enterprise_service_bus) - The hub architecture applied to enterprise integration.
- [Hub-and-spoke](https://en.wikipedia.org/wiki/Spoke%E2%80%93hub_distribution_paradigm) - The same pattern in logistics.
- [Combination](https://en.wikipedia.org/wiki/Combination) - Where the N(N-1)/2 figure comes from.

## Related Resources

- [Chapter 18: Data Management and Governance](../../chapters/18-data-management-and-governance/index.md)
- [All MicroSims in this book](../index.md)
