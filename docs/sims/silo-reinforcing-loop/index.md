---
title: The Organizational Silo Reinforcing Loop
description: given a diagram of the causal chain that keeps a silo intact, the learner will trace the reinforcing loop from a bounded-rational local decision back to itself, and identify which single link a silo-busting intervention should target (Bloom: Analyzing).
status: scaffold
library: vis-network
bloom_level: TBD
---

# The Organizational Silo Reinforcing Loop



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
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

## Related Resources

- [Chapter 20: Organizational Silos and Silo Busting](../../chapters/20-organizational-silos-and-silo-busting/index.md)
