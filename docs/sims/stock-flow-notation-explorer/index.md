---
title: "Stock and Flow Notation Explorer"
description: "Click parts of a bathtub-style stock-and-flow diagram to see how each maps onto the causal loop diagram from Chapter 3."
image: /sims/stock-flow-notation-explorer/stock-flow-notation-explorer.png
og:image: /sims/stock-flow-notation-explorer/stock-flow-notation-explorer.png
twitter:image: /sims/stock-flow-notation-explorer/stock-flow-notation-explorer.png
social:
  cards: false
status: implemented
library: p5.js
bloom_level: Understand
bloom_verb: Map
chapter: 4
---

# Stock and Flow Notation Explorer

<iframe src="main.html" width="100%" height="512" scrolling="no"></iframe>

[Run the Stock and Flow Notation Explorer MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

A causal loop diagram tells you which way things push each other. A stock-and-flow diagram adds what a CLD leaves out: what accumulates, and at what rate. This MicroSim puts the two side by side using the same bank account, so the translation is a click rather than an explanation.

**Learning objective:** Given a simple causal loop diagram, the learner will identify the corresponding stock, inflow and outflow in an equivalent stock-and-flow diagram.

**Bloom's Taxonomy level:** Understand (Map)

## How To Use

- Click the tub to highlight the stock in both diagrams.
- Click the inflow pipe to see how it maps onto the CLD's positive edge.
- Click the outflow pipe and notice that the CLD has no counterpart for it at all.
- Press "Reset" to clear the highlighting.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/stock-flow-notation-explorer/main.html"
        width="100%" height="512" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Has read a causal loop diagram
- Knows that some quantities accumulate over time

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Map a CLD node onto its stock-and-flow counterpart
- Identify the stock, the inflow and the outflow in a stock-and-flow diagram
- Explain what a stock-and-flow diagram shows that a CLD cannot

### Suggested Activity (10 minutes)

1. Show the CLD side alone and ask learners what it does and does not tell them.
2. Click the tub and ask which CLD element it corresponds to.
3. Click the outflow and ask learners to find its CLD counterpart. There isn't one - that is the lesson.
4. Ask learners to draw the stock-and-flow version of a CLD they have seen elsewhere.

### Assessment

Give learners a two-node CLD and ask them to name the stock, the inflow, and any outflow the CLD failed to show.

### Discussion Questions

- Why would you ever use a CLD if a stock-and-flow diagram carries more information?
- What real quantities in your work are stocks, and which are flows?
- Why is confusing a stock with a flow such a common and costly error?

## Specification

The specification below was extracted from
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

## References

- [Stock and flow - Wikipedia](https://en.wikipedia.org/wiki/Stock_and_flow) - The notation and its distinction from causal loop diagrams.
- [System dynamics](https://en.wikipedia.org/wiki/System_dynamics) - Jay Forrester's field, where stock-and-flow notation originates.
- [Jay Wright Forrester](https://en.wikipedia.org/wiki/Jay_Wright_Forrester) - The MIT engineer who created the notation.

## Related Resources

- [Chapter 4: Feedback, Delay, and Loop Dynamics](../../chapters/04-feedback-delay-and-loop-dynamics/index.md)
- [All MicroSims in this book](../index.md)
