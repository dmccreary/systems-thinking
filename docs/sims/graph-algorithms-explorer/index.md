---
title: Graph Algorithms Explorer
description: given a sample network, the learner will apply community detection to identify densely connected clusters and apply link prediction to identify a plausible missing edge, then interpret both results (Bloom: Apply).
status: scaffold
library: vis-network
bloom_level: TBD
---

# Graph Algorithms Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 26: Knowledge Graph Applications and Data Architecture](../../chapters/26-knowledge-graph-applications-and-data-architecture/index.md).

```text
Type: graph-model
**sim-id:** graph-algorithms-explorer<br/>
**Library:** vis-network<br/>
**Template:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/network-community-detection-graph-model<br/>
**Status:** Specified

Learning objective: given a sample network, the learner will apply community detection to identify densely connected clusters and apply link prediction to identify a plausible missing edge, then interpret both results (Bloom: Apply).

Canvas: responsive vis-network container, minimum 520px height, full container width, with a window `resize` listener calling `network.redraw()` and `network.fit()`.

Visual elements: an 18-node sample network with two visually separable but lightly interconnected clusters (representing, for example, two overlapping social or organizational groups), rendered with vis-network's default force-directed physics.

Controls: a "Detect Communities" button that runs a simple modularity-based clustering over the current node/edge dataset and recolors each detected cluster in a distinct color; a "Predict Missing Link" button that computes a common-neighbors score for every non-adjacent node pair and highlights the single highest-scoring pair with a dashed, pulsing edge, labeled with its predicted-likelihood score.

Interactivity requirement: every node is clickable, opening an infobox listing that node's community assignment (once detected) and its degree (number of connections); the predicted dashed edge is hoverable, showing a tooltip explaining the shared neighbors driving that prediction.

Color scheme: each detected community rendered in a distinct pastel color; the predicted link rendered in the book's accent orange to stand out from confirmed edges, which remain neutral gray.

Implementation: vis-network `DataSet` objects for nodes and edges, a simple in-browser modularity or connected-components-based clustering function for the community-detection button, and a common-neighbors scoring function for the link-prediction button, both computed client-side over the fixed sample dataset.
```

## Related Resources

- [Chapter 26: Knowledge Graph Applications and Data Architecture](../../chapters/26-knowledge-graph-applications-and-data-architecture/index.md)
