---
title: "Loop Polarity Counter"
description: "Click each link of a four-node causal loop to reveal its polarity, then let the running tally decide whether the loop is reinforcing or balancing."
image: /sims/loop-polarity-counter/loop-polarity-counter.png
og:image: /sims/loop-polarity-counter/loop-polarity-counter.png
twitter:image: /sims/loop-polarity-counter/loop-polarity-counter.png
social:
  cards: false
status: implemented
library: p5.js
bloom_level: Apply
bloom_verb: Classify
chapter: 3
---

# Loop Polarity Counter

<iframe src="main.html" width="100%" height="547" scrolling="no"></iframe>

[Run the Loop Polarity Counter MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

The rule for classifying a loop is simple to state and easy to get wrong under pressure: count the opposite-direction links, and an even count (including zero) makes the loop reinforcing. This MicroSim makes you apply the rule rather than read it. Each click reveals one link's polarity with a justification, and the R or B marker at the center only fills in once all four are revealed.

**Learning objective:** Given a causal loop diagram, the learner will classify the loop as reinforcing or balancing by counting its opposite-direction links.

**Bloom's Taxonomy level:** Apply (Classify)

## How To Use

- Click each "?" badge on the loop to reveal that link's polarity.
- Read the justification sentence that appears below the diagram after each click.
- Watch the opposite-direction tally. The marker at the center fills in only when all four links are revealed.
- Press "New Scenario" for a different four-link loop, or "Reset This Loop" to try the same one again.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/loop-polarity-counter/main.html"
        width="100%" height="547" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows what a causal loop diagram is
- Can read a + or - polarity on a single link

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Classify a loop as reinforcing or balancing by counting negative links
- Justify each link's polarity in terms of direction of change
- Explain why the count, not the number of links, determines loop type

### Suggested Activity (15 minutes)

1. Start with the Word-of-Mouth Growth scenario and have learners predict the loop type before clicking.
2. Reveal the links one at a time, pausing to let learners justify each polarity themselves.
3. Switch to the Hiring scenario, which has exactly one negative link, and predict again.
4. Switch to Price and Demand, which has three, and ask learners to predict before revealing.
5. Ask learners to construct a four-link loop with two negative links and predict its type.

### Assessment

Give learners a written four-link loop and ask for the type plus the count. Check whether they count negative links rather than counting arrows or guessing from the topic.

### Discussion Questions

- Why does an even number of negative links produce reinforcement rather than cancellation?
- Can a loop with no negative links ever be balancing?
- What happens to the classification if you reverse the direction of one arrow?

## Specification

The specification below was extracted from
[Chapter 3: Causal Loop Diagram Notation and Loop Identification](../../chapters/03-cld-notation-and-loop-identification/index.md).

```text
Type: microsim
**sim-id:** loop-polarity-counter<br/>
**Library:** p5.js<br/>
**Template:** https://github.com/dmccreary/infographics/tree/main/docs/sims/cld-builder<br/>
**Status:** Specified

Purpose: Let learners apply the negative-link counting rule step by step on a four-node causal loop by clicking each edge in sequence around the loop and watching a running tally of same-direction (S) and opposite-direction (O) links, culminating in the automatically revealed loop marker.

Bloom Taxonomy Level: Apply
Bloom Taxonomy Verb: Classify

Learning Objective: Given a causal loop diagram, the learner will classify the loop as reinforcing or balancing by counting its opposite-direction links (Bloom: Applying).

Canvas: 700x480 default, responsive — recompute node positions around a circle of radius proportional to `canvas.width` inside a `windowResized()` handler so the loop stays centered and legible at any container width.

Visual elements:
- Four nodes arranged in a circle (default scenario: "Advertising Spend," "New Customers," "Word of Mouth," "Revenue"), connected by four curved directed edges forming one closed loop, each edge labeled with a "+"/S or "−"/O badge once revealed.
- A running tally panel beside the canvas reading "Opposite-direction links found: N" that increments only when the learner clicks an unrevealed edge whose polarity is negative.
- A large loop-marker circle at the loop's center, initially blank/gray, that fills in with a red "R" or green "B" (matching this chapter's color convention) only after all four edges have been clicked/revealed.

Controls:
- Clicking an unrevealed edge reveals its polarity badge (S or O) with a short one-sentence justification appearing in an info panel below the canvas (e.g., "More advertising spend causes more new customers — same direction").
- A "New Scenario" button, built with `createButton()`, that swaps in one of three preloaded four-edge loops (a mix of reinforcing and balancing examples) with freshly randomized node positions.
- A "Reset This Loop" button that re-hides all edge badges and empties the tally without changing the current scenario.

Interactivity requirement: every edge is clickable and reveals a labeled badge plus an explanatory info-panel sentence; the loop-marker circle updates live based on the tally, satisfying the interactivity bar with immediate, teaching feedback on every click.

Color scheme: same-direction (S) badges in the book's positive-link green, opposite-direction (O) badges in the negative-link red, and the final loop marker filled in the matching reinforcing-red or balancing-green used throughout this chapter's other diagrams for visual consistency.

Implementation: p5.js sketch with an array of edge objects (endpoints, true polarity, revealed state) drawn as curved Bezier arrows, `mousePressed()` hit-testing against each edge's curve midpoint, and a small state machine tracking revealed count and running negative-link tally to trigger the final marker reveal.
```

## References

- [Causal loop diagram - Wikipedia](https://en.wikipedia.org/wiki/Causal_loop_diagram) - Notation and the link-polarity counting rule.
- [Positive feedback](https://en.wikipedia.org/wiki/Positive_feedback) - Why reinforcing loops amplify rather than stabilize.
- [Negative feedback](https://en.wikipedia.org/wiki/Negative_feedback) - The goal-seeking behavior of balancing loops.

## Related Resources

- [Chapter 3: Causal Loop Diagram Notation and Loop Identification](../../chapters/03-cld-notation-and-loop-identification/index.md)
- [All MicroSims in this book](../index.md)
