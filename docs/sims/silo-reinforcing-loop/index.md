---
title: "The Organizational Silo Reinforcing Loop"
description: "Trace the five-stage loop that keeps an organizational silo intact, and find the one link an intervention can actually cut."
image: /sims/silo-reinforcing-loop/silo-reinforcing-loop.png
og:image: /sims/silo-reinforcing-loop/silo-reinforcing-loop.png
twitter:image: /sims/silo-reinforcing-loop/silo-reinforcing-loop.png
social:
  cards: false
status: implemented
library: vis-network
bloom_level: Analyze
bloom_verb: Trace
chapter: 20
---

# The Organizational Silo Reinforcing Loop

<iframe src="main.html" width="100%" height="502" scrolling="no"></iframe>

[Run the The Organizational Silo Reinforcing Loop MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Silos are produced by structure, not by bad people, which is why exhortations to collaborate do nothing. This loop runs from a locally rational decision all the way around to an accidental competitor, and only one of its five links is a thing an organization actually designs. That link is where the intervention has to land.

**Learning objective:** Given a diagram of the causal chain that keeps a silo intact, the learner will trace the reinforcing loop from a bounded-rational local decision back to itself, and identify which single link a silo-busting intervention should target.

**Bloom's Taxonomy level:** Analyze (Trace)

## How To Use

- Click any stage in the loop to see what it means.
- Click the red R badge at the center for why the loop reinforces rather than balances.
- Click the green intervention box for why the fix targets the incentive link specifically.
- Press "Where Should the Fix Go?" to highlight the leverage point directly.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/silo-reinforcing-loop/main.html"
        width="100%" height="502" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows what a reinforcing loop is
- Has worked in or observed an organization with departments

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Trace the silo loop back to its starting point
- Explain why the loop is reinforcing rather than balancing
- Justify why the incentive link is the only workable intervention point

### Suggested Activity (15 minutes)

1. Ask learners to name a silo they have experienced and who they blamed at the time.
2. Click through the five stages in order.
3. For each stage, ask: could you intervene here? Work out why four of the five resist intervention.
4. Click the intervention box and compare to the group's reasoning.
5. Ask what shared metric would actually break the loop in their own organization.

### Assessment

Give learners a described silo and ask which link they would target and why the other links are poor choices.

### Discussion Questions

- If nobody in the loop is behaving badly, who is responsible for the silo?
- Why does 'we should communicate more' fail as an intervention here?
- What makes an incentive the designable link rather than an emergent one?

## Specification

The specification below was extracted from
[Chapter 20: Organizational Silos and Silo Busting](../../chapters/20-organizational-silos-and-silo-busting/index.md).

```text
Type: graph-model
**sim-id:** silo-reinforcing-loop<br/>
**Library:** vis-network<br/>
**Status:** Specified

Learning objective: given a diagram of the causal chain that keeps a silo intact, the learner will trace the reinforcing loop from a bounded-rational local decision back to itself, and identify which single link a silo-busting intervention should target (Bloom: Analyzing).

Canvas: responsive vis-network container, minimum 480px height, full container width, recomputed on window resize.

Visual design: five vertices arranged in a closed loop, each connected to the next by a directed edge marked with a polarity sign (+ for reinforcing): "Bounded-Rational Local Decision" (+) -> "Department Optimizes Its Own Metric" (+) -> "Incentive Structure Rewards the Local Win" (+) -> "Organizational Silo Deepens" (+) -> "Accidental Competitor Emerges Elsewhere" (+) -> back to "Bounded-Rational Local Decision". An "R" badge vertex sits at the loop's center. A sixth vertex, "Silo-Busting Intervention (Shared Metrics + Cross-Functional Team)," sits outside the loop with a dashed edge pointing at the "Incentive Structure Rewards the Local Win" vertex, labeled "breaks."

Interaction: clicking any vertex in the main loop opens an infobox with a one-sentence definition of that stage, drawn from this chapter's own wording. Clicking the "R" badge opens an infobox explaining why the loop is reinforcing rather than balancing. Clicking the "Silo-Busting Intervention" vertex opens an infobox explaining specifically why replacing a local-only incentive with a shared metric breaks the loop at that exact link rather than at any other point.

Implementation: vis-network with a fixed node/edge dataset (no physics simulation needed), click handlers bound to every node populating a shared infobox panel below the canvas, dashed-edge styling for the intervention link distinct from the loop's solid reinforcing edges.
```

## References

- [Organizational silo - Wikipedia](https://en.wikipedia.org/wiki/Information_silo) - How silos form and persist.
- [Bounded rationality](https://en.wikipedia.org/wiki/Bounded_rationality) - Herbert Simon's concept, the loop's first stage.
- [Goodhart's law](https://en.wikipedia.org/wiki/Goodhart%27s_law) - Why optimizing a local metric stops measuring what it measured.

## Related Resources

- [Chapter 20: Organizational Silos and Silo Busting](../../chapters/20-organizational-silos-and-silo-busting/index.md)
- [All MicroSims in this book](../index.md)
