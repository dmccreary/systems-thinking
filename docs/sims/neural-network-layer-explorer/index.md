---
title: "Inside a Neural Network Layer"
description: "Move seven sliders and watch a neural network layer's weighted sum and sigmoid activation recompute live."
image: /sims/neural-network-layer-explorer/neural-network-layer-explorer.png
og:image: /sims/neural-network-layer-explorer/neural-network-layer-explorer.png
twitter:image: /sims/neural-network-layer-explorer/neural-network-layer-explorer.png
social:
  cards: false
status: implemented
library: p5.js
bloom_level: Apply
bloom_verb: Compute
chapter: 22
---

# Inside a Neural Network Layer

<iframe src="main.html" width="100%" height="540" scrolling="no"></iframe>

[Run the Inside a Neural Network Layer MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

A neural network layer is multiplication and addition followed by a squashing function, and seeing the arithmetic printed on screen while you move the sliders is usually enough to dissolve the mystery. The output node brightens as the activation approaches one, so the number and its consequence stay visible together.

**Learning objective:** Given a small neural network layer with adjustable input values and weights, the learner will compute the weighted sum, apply an activation function, and explain how changing one weight changes the layer's output.

**Bloom's Taxonomy level:** Apply (Compute)

## How To Use

- Move the x1, x2 and x3 sliders to set the inputs.
- Move the w1, w2 and w3 sliders to set the weights. Edge thickness tracks weight magnitude.
- Move the bias slider and watch the output shift without any input changing.
- Read the weighted-sum line: every term is printed so you can check the arithmetic yourself.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/neural-network-layer-explorer/main.html"
        width="100%" height="540" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Can multiply and add decimals
- Has heard the term neural network

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Compute a weighted sum from inputs, weights and a bias
- Describe what a sigmoid activation does to that sum
- Explain how one weight controls how much one input matters

### Suggested Activity (12 minutes)

1. Set all weights to 1 and all inputs to 1, and have learners predict the sum.
2. Drag w2 to zero and ask what happened to x2's influence.
3. Drag w1 negative and ask what that means about the input's role.
4. Push the weighted sum far positive, then far negative, and describe what the sigmoid does at the extremes.
5. Ask what training a network actually adjusts - and note that it is these weights.

### Assessment

Give learners three inputs, three weights and a bias on paper and ask for the weighted sum and roughly what the sigmoid output will be.

### Discussion Questions

- What does a negative weight mean about an input's role?
- Why squash the output into a range at all?
- If training adjusts weights, what is the network actually learning?

## Specification

The specification below was extracted from
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

## References

- [Artificial neuron - Wikipedia](https://en.wikipedia.org/wiki/Artificial_neuron) - The weighted-sum-plus-activation structure shown here.
- [Sigmoid function](https://en.wikipedia.org/wiki/Sigmoid_function) - The activation function this layer applies.
- [Perceptron](https://en.wikipedia.org/wiki/Perceptron) - Rosenblatt's 1958 predecessor to this layer.

## Related Resources

- [Chapter 22: Artificial Intelligence and Machine Learning Foundations](../../chapters/22-ai-and-machine-learning-foundations/index.md)
- [All MicroSims in this book](../index.md)
