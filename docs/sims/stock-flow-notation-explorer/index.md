---
title: Stock and Flow Notation Explorer
description: Given a simple causal loop diagram, the learner will identify the corresponding stock, inflow, and outflow in an equivalent stock-and-flow diagram (Bloom: Understanding).
status: scaffold
library: p5.js
bloom_level: Understand
---

# Stock and Flow Notation Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 4: Feedback, Delay, and Loop Dynamics](../../chapters/04-feedback-delay-and-loop-dynamics/index.md).

```text
Type: microsim
**sim-id:** stock-flow-notation-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Let learners map the bank-balance causal loop diagram from Chapter 3 onto its stock-and-flow equivalent by clicking each labeled part of a bathtub-style diagram and reading how it corresponds to a CLD element.

Bloom Taxonomy Level: Understand
Bloom Taxonomy Verb: Map / Translate

Learning Objective: Given a simple causal loop diagram, the learner will identify the corresponding stock, inflow, and outflow in an equivalent stock-and-flow diagram (Bloom: Understanding).

Canvas: 700x420 default, responsive — recompute the tub rectangle's position and pipe lengths as a proportion of `canvas.width` inside a `windowResized()` handler.

Visual elements:
- A rectangular "tub" outline labeled "Bank Balance" on the left half of the canvas, filled to roughly 40% height with a light-blue rectangle representing the current stock level.
- An inflow pipe entering the top of the tub, labeled "Interest Earned," with a small valve icon and a cloud symbol at its far end.
- An outflow pipe exiting the bottom of the tub, labeled "Withdrawals," with a valve icon and a cloud symbol at its far end.
- A small side panel on the right showing the equivalent Chapter 3 causal loop diagram (two boxes, two labeled arrows) for side-by-side comparison, grayed out until the matching stock-and-flow part is clicked.

Controls:
- Clicking the tub rectangle highlights "Bank Balance" in both diagrams and shows an info-panel sentence: "This rectangle is a stock — an accumulating quantity, the same role Chapter 3's 'Bank Balance' node played."
- Clicking the inflow pipe highlights "Interest Earned" in both diagrams with the sentence: "This pipe is an inflow — it adds to the stock, playing the same role as the CLD's positive edge into Bank Balance."
- Clicking the outflow pipe highlights "Withdrawals" with the sentence: "This pipe is an outflow — a flow this simple CLD never showed, because CLDs don't distinguish rate of change from accumulated amount."
- A "Reset" button, built with `createButton()`, that un-highlights all parts and clears the info panel.

Interactivity requirement: every labeled part (tub, inflow pipe, outflow pipe) is clickable, highlights its CLD counterpart, and reveals an explanatory info-panel sentence — satisfying the interactivity bar with immediate, comparative feedback.

Color scheme: stock rectangle in the book's neutral node blue; inflow pipe and valve in the positive-link green; outflow pipe and valve in a muted amber (introducing a third color, since an outflow is neither a positive nor a negative causal link — it's a different kind of notation entirely).

Implementation: p5.js sketch with hit-testing rectangles over each drawn part, a shared highlight-state variable, and a text-wrapping info panel drawn below the canvas.
```

## Related Resources

- [Chapter 4: Feedback, Delay, and Loop Dynamics](../../chapters/04-feedback-delay-and-loop-dynamics/index.md)
