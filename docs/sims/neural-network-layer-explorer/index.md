---
title: Inside a Neural Network Layer
description: given a small neural network layer with adjustable input values and weights, the learner will compute the weighted sum, apply an activation function, and explain how changing one weight changes the layer's output (Bloom: Applying).
status: scaffold
library: p5.js
bloom_level: TBD
---

# Inside a Neural Network Layer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 22: Artificial Intelligence and Machine Learning Foundations](../../chapters/22-ai-and-machine-learning-foundations/index.md).

```text
Type: diagram
**sim-id:** neural-network-layer-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/linear-algebra/tree/main/docs/sims/neural-network-layer

Learning objective: given a small neural network layer with adjustable input values and weights, the learner will compute the weighted sum, apply an activation function, and explain how changing one weight changes the layer's output (Bloom: Applying).

Canvas: 700x420 pixels, responsive -- recompute canvas width from the containing element on window resize.

Visual design: three input nodes on the left labeled \( x_1, x_2, x_3 \), each connected by a labeled weighted edge (\( w_1, w_2, w_3 \)) to one output node on the right labeled \( y \). A small bias box feeds into the output node alongside the three weighted edges.

Controls (p5.js built-in controls only, per this book's control conventions): three `createSlider()` controls for \( x_1, x_2, x_3 \) (range -5 to 5), three more for \( w_1, w_2, w_3 \) (range -2 to 2), and one for the bias \( b \) (range -5 to 5), all defaulting to values that produce a clearly positive output.

Behavior: as any slider moves, the diagram recomputes the weighted sum live, displays it as text ("Weighted sum = 3.20"), passes it through a sigmoid activation function, and displays the final output \( y \) both as a number and as the output node's fill brightness (brighter for values closer to 1, dimmer for values closer to 0).

Implementation: p5.js, canvas parented to `document.querySelector('main')`, `updateCanvasSize()` called first in `setup()` per this book's MicroSim conventions, weighted sum and sigmoid activation recomputed on every slider change.
```

## Related Resources

- [Chapter 22: Artificial Intelligence and Machine Learning Foundations](../../chapters/22-ai-and-machine-learning-foundations/index.md)
