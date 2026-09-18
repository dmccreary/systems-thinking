---
title: "Bathtub Stock and Flow Simulator"
description: "Set inflow and outflow rates independently and predict whether the stock rises, falls, or holds steady."
image: /sims/bathtub/bathtub.png
og:image: /sims/bathtub/bathtub.png
twitter:image: /sims/bathtub/bathtub.png
social:
  cards: false
status: implemented
library: p5.js
bloom_level: Apply
bloom_verb: Predict
chapter: 5
---

# Bathtub Stock and Flow Simulator

<iframe src="main.html" width="100%" height="568" scrolling="no"></iframe>

[Run the Bathtub Stock and Flow Simulator MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

The bathtub is the canonical stock-and-flow example because it makes one point impossible to miss: the level is not set by the tap or by the drain, only by the difference between them. A large inflow does not mean a rising stock. This MicroSim lets you set both rates and watch the level chart confirm or refute your prediction.

**Learning objective:** Given independently adjustable inflow and outflow rates, the learner will predict whether a stock rises, falls, or holds steady.

**Bloom's Taxonomy level:** Apply (Predict)

## How To Use

- Set the inflow and outflow rates with the two sliders.
- Press "Start" and watch the water level and the chart respond.
- Read the verdict line under the tub: rising, falling, or holding steady.
- Try setting both rates high and equal - a lot of water moving, and a level that does not change at all.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/bathtub/main.html"
        width="100%" height="568" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows what a stock and a flow are
- Can compare two numbers

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Predict the direction of change in a stock from its inflow and outflow rates
- Explain dynamic equilibrium as equal flows rather than as no flow
- Recognize that stock level and flow rate are different quantities

### Suggested Activity (12 minutes)

1. Set inflow to 1.5 and outflow to 0.2. Ask learners to predict before pressing Start.
2. Reverse the two and predict again.
3. Set both to 1.5 and ask what will happen. Many learners predict a rise because the inflow is large.
4. Ask learners to find two different settings that both hold the level steady.
5. Connect to a real stock: a bank balance, a reservoir, atmospheric carbon.

### Assessment

Give learners three inflow/outflow pairs on paper and ask for the direction of change in each. The equal-and-large pair is the one that discriminates.

### Discussion Questions

- Why is "we cut emissions" not the same as "the amount in the atmosphere went down"?
- Can a stock fall while its inflow is increasing?
- What is the drain in your organization's hiring pipeline?

## Specification

The specification below was extracted from
[Chapter 5: Stocks, Flows, and System Dynamics](../../chapters/05-stocks-flows-and-system-dynamics/index.md).

```text
Type: microsim
**sim-id:** bathtub<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/microsims/sims/bathtub/bathtub.html<br/>
**Source Repo:** https://github.com/dmccreary/microsims/tree/main/docs/sims/bathtub

Reused from the MicroSim catalog (WHAT match score 0.78). A source-flow-rate slider and a drain-flow-rate slider each control a pipe into and out of a drawn bathtub; the water height (the stock) updates live and a running chart plots height over time, making accumulation directly visible rather than merely described. Learning objective: given independently adjustable inflow and outflow rates, the learner will predict whether a stock rises, falls, or holds steady (Bloom: Applying).
```

## References

- [Stock and flow - Wikipedia](https://en.wikipedia.org/wiki/Stock_and_flow) - The accumulation relationship this simulation implements.
- [John Sterman's bathtub studies](https://en.wikipedia.org/wiki/John_Sterman) - Research showing that even graduate students systematically misjudge accumulation.
- [Source MicroSim](https://dmccreary.github.io/microsims/sims/bathtub/bathtub.html) - The original version of this simulation.

## Related Resources

- [Chapter 5: Stocks, Flows, and System Dynamics](../../chapters/05-stocks-flows-and-system-dynamics/index.md)
- [All MicroSims in this book](../index.md)
