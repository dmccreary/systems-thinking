---
title: Point-to-Point vs. Hub Integration Cost
description: given a number of systems needing to exchange data, the learner will calculate the number of connections required under a point-to-point architecture versus a hub architecture, and explain why the hub scales better (Bloom: Applying).
status: scaffold
library: p5.js
bloom_level: TBD
---

# Point-to-Point vs. Hub Integration Cost



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
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

## Related Resources

- [Chapter 18: Data Management and Governance](../../chapters/18-data-management-and-governance/index.md)
