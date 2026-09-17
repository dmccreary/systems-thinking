---
title: Interconnection Network Explorer
description: Given a supply-chain network diagram, the learner will trace which nodes are affected, directly and indirectly, by a disruption at a chosen node (Bloom: Analyzing).
status: scaffold
library: vis-network
bloom_level: Analyze
---

# Interconnection Network Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 1: Foundations of Systems Thinking](../../chapters/01-foundations-of-systems-thinking/index.md).

```text
Type: graph-model
**sim-id:** interconnection-network-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Purpose: Depict a small six-node supply-chain network (Semiconductor Factory, Parts Supplier, Car Manufacturer, Shipping Company, Dealership, Customer) so learners can click any node and see it highlighted along with every node it is directly and indirectly connected to, distinguishing mere interconnection from true interdependence.

Bloom Taxonomy Level: Analyze
Bloom Taxonomy Verb: Trace

Learning Objective: Given a supply-chain network diagram, the learner will trace which nodes are affected, directly and indirectly, by a disruption at a chosen node (Bloom: Analyzing).

Canvas: full-width responsive vis-network container, 500px tall, with `network.on("resize")` and a window `resize` listener calling `network.redraw()` and `network.fit()` so the graph re-centers on any viewport width.

Visual elements:
- Six nodes labeled Semiconductor Factory, Parts Supplier, Car Manufacturer, Shipping Company, Dealership, and Customer, laid out left to right in that supply-flow order using `vis-network`'s hierarchical layout option.
- Directed edges showing the flow of goods: Semiconductor Factory → Parts Supplier → Car Manufacturer → Shipping Company → Dealership → Customer.
- One additional edge, styled with a dashed line and a distinct warning color, from Semiconductor Factory directly to Dealership, labeled "also ships specialty parts directly," to show that real networks are rarely a single clean chain.

Controls:
- Clicking any node fires a `click` event handler that highlights that node in a bright accent color and highlights every node reachable from it (using a breadth-first traversal of the `vis-network` `DataSet` edges) in a lighter shade of the same color, while dimming unrelated nodes to low opacity.
- A "Reset Highlighting" button, implemented as an HTML button outside the network `div`, that calls a function to restore all nodes and edges to their default colors.
- A text panel beneath the network that updates on each click to read: "If [Node] stops working, it directly affects: [list]. Because of interdependence, the disruption can also reach: [extended list]."

Interactivity requirement: every node is clickable per the behavior above, satisfying the minimum interactivity bar with visible, teaching feedback (the highlight plus the explanatory text panel).

Color scheme: `vis-network` default node color for unaffected nodes, the book's accent orange for the clicked node, and a lighter orange for downstream-affected nodes, keeping consistent contrast in both light and dark MkDocs Material themes.

Implementation: `vis-network` `DataSet`/`DataView` objects for nodes and edges, a `network.on("click", ...)` handler performing a breadth-first search over the edge list from the clicked node, and `network.setOptions()` calls to restyle node colors on each interaction.
```

## Related Resources

- [Chapter 1: Foundations of Systems Thinking](../../chapters/01-foundations-of-systems-thinking/index.md)
