---
title: Three Reinforcing Loops Behind Knowledge Graph Adoption
description: given three named organizational feedback loops behind knowledge graph adoption, the learner will trace each loop's causal chain back to its starting point and explain why each is reinforcing rather than balancing (Bloom: Analyzing).
status: scaffold
library: vis-network
bloom_level: TBD
---

# Three Reinforcing Loops Behind Knowledge Graph Adoption



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 19: Enterprise Knowledge Graphs](../../chapters/19-enterprise-knowledge-graphs/index.md).

```text
Type: graph-model
**sim-id:** ekg-adoption-loops<br/>
**Library:** vis-network<br/>
**Status:** Specified

Learning objective: given three named organizational feedback loops behind knowledge graph adoption, the learner will trace each loop's causal chain back to its starting point and explain why each is reinforcing rather than balancing (Bloom: Analyzing).

Canvas: responsive vis-network container, minimum 560px height, full container width, recomputed on window resize.

Visual design: three separate closed-loop clusters arranged left to right, each following this book's existing causal-loop-diagram convention of labeled vertices connected by arrows marked with a polarity sign (+ for reinforcing influence), with an "R" badge vertex at the center of each loop.

- Loop 1, "CIO Influence Diagram": CIO Sponsorship (+) -> Pilot Funding and Visibility (+) -> Visible Early Win (+) -> back to CIO Sponsorship.
- Loop 2, "Employee Career Path Loop": Employees Using the Graph for Career Paths (+) -> Employees Keep Skill Data Current (+) -> Graph Accuracy (+) -> back to Employees Using the Graph for Career Paths.
- Loop 3, "Data Standardization Cycle": Systems Adopting the Shared Standard (+) -> Lower Marginal Integration Cost (+) -> Attractiveness to the Next System (+) -> back to Systems Adopting the Shared Standard.

Interaction: clicking any vertex opens an infobox with a one-sentence definition of that stage in its loop. Clicking the central "R" badge of any loop opens an infobox summarizing why the loop reinforces itself, using this chapter's own wording for that loop. A "Highlight All Loops" button colors each of the three loops a different color simultaneously, making it easy to see that all three loops are structurally identical (each is a plain reinforcing loop of three linked stages) despite describing completely different organizational dynamics.

Implementation: vis-network with a fixed three-cluster node/edge dataset (no physics simulation needed), click handlers bound to every node and to each loop's central badge vertex, populating a shared infobox panel below the canvas.
```

## Related Resources

- [Chapter 19: Enterprise Knowledge Graphs](../../chapters/19-enterprise-knowledge-graphs/index.md)
