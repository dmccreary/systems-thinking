---
title: "Graph Algorithms Explorer"
description: "Run community detection and link prediction on an 18-node network and interpret both results."
image: /sims/graph-algorithms-explorer/graph-algorithms-explorer.png
og:image: /sims/graph-algorithms-explorer/graph-algorithms-explorer.png
twitter:image: /sims/graph-algorithms-explorer/graph-algorithms-explorer.png
social:
  cards: false
status: implemented
library: vis-network
bloom_level: Apply
bloom_verb: Apply
chapter: 26
---

# Graph Algorithms Explorer

<iframe src="main.html" width="100%" height="562" scrolling="no"></iframe>

[Run the Graph Algorithms Explorer MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Two graph algorithms that answer questions a table cannot. Label propagation finds communities by repeatedly asking each node which group most of its neighbors belong to. Common-neighbors link prediction proposes the most plausible missing edge - a hypothesis worth checking, not a fact. Both run client-side over the same 18-node network.

**Learning objective:** Given a sample network, the learner will apply community detection to identify densely connected clusters and apply link prediction to identify a plausible missing edge, then interpret both results.

**Bloom's Taxonomy level:** Apply (Apply)

## How To Use

- Click any node to see its degree and, once detected, its community assignment.
- Press "Detect Communities" to run label propagation and recolor each cluster.
- Press "Predict Missing Link" to score every non-adjacent pair by shared neighbors and highlight the winner.
- Hover the predicted dashed edge to see which shared neighbors drove the prediction.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/graph-algorithms-explorer/main.html"
        width="100%" height="562" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows what a node, an edge and a degree are
- Has seen a network diagram

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Apply community detection and interpret the resulting clusters
- Apply link prediction and interpret the score
- Explain why a predicted link is a hypothesis rather than a fact

### Suggested Activity (15 minutes)

1. Ask learners to eyeball the network and guess how many communities there are.
2. Press "Detect Communities" and compare to the guess.
3. Ask which nodes bridge the communities, and why those few people matter so much.
4. Press "Predict Missing Link" and ask whether the prediction is plausible.
5. Ask what it would mean, ethically, to act on a prediction like this in a real system.

### Assessment

Ask learners to name the bridging nodes and to explain what removing one of them would do to the network's structure.

### Discussion Questions

- Why does label propagation find the same communities a human would?
- What is the difference between a prediction being likely and being true?
- Where would acting on link prediction be helpful, and where would it be intrusive?

## Specification

The specification below was extracted from
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

## References

- [Community structure - Wikipedia](https://en.wikipedia.org/wiki/Community_structure) - What community detection algorithms look for.
- [Link prediction](https://en.wikipedia.org/wiki/Link_prediction) - The common-neighbors heuristic used here.
- [Label propagation algorithm](https://en.wikipedia.org/wiki/Label_propagation_algorithm) - The specific clustering method this MicroSim runs.

## Related Resources

- [Chapter 26: Knowledge Graph Applications and Data Architecture](../../chapters/26-knowledge-graph-applications-and-data-architecture/index.md)
- [All MicroSims in this book](../index.md)
