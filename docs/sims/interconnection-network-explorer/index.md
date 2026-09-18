---
title: "Interconnection Network Explorer"
description: "Click any node in a six-stage supply chain to trace which parts a disruption there would reach, directly and indirectly."
image: /sims/interconnection-network-explorer/interconnection-network-explorer.png
og:image: /sims/interconnection-network-explorer/interconnection-network-explorer.png
twitter:image: /sims/interconnection-network-explorer/interconnection-network-explorer.png
social:
  cards: false
status: implemented
library: vis-network
bloom_level: Analyze
bloom_verb: Trace
chapter: 1
---

# Interconnection Network Explorer

<iframe src="main.html" width="100%" height="522" scrolling="no"></iframe>

[Run the Interconnection Network Explorer MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Interconnection means two things are linked. Interdependence means a change in one actually reaches the other, sometimes several steps away. This MicroSim separates the two: clicking a node runs a breadth-first search over the edges and distinguishes what that node touches directly from what the disruption can still reach by traveling further down the chain.

**Learning objective:** Given a supply-chain network diagram, the learner will trace which nodes are affected, directly and indirectly, by a disruption at a chosen node.

**Bloom's Taxonomy level:** Analyze (Trace)

## How To Use

- Click any node to highlight it and everything downstream of it.
- Read the panel on the right: it separates directly affected nodes from ones reached only through interdependence.
- Notice the dashed red edge from the semiconductor factory straight to the dealership - real networks are rarely a single clean chain.
- Press "Reset Highlighting" and try a different starting node.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/interconnection-network-explorer/main.html"
        width="100%" height="522" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows what a node and an edge are
- Has seen a system drawn as a diagram of connected parts

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Trace the downstream reach of a disruption through a network
- Distinguish direct effects from indirect effects
- Explain why a node with few direct connections can still have wide reach

### Suggested Activity (12 minutes)

1. Ask learners to predict which single node's failure would affect the most others.
2. Click the Semiconductor Factory and compare the result to the prediction.
3. Click the Shipping Company and ask why its reach is smaller despite sitting in the middle of the chain.
4. Ask what the dashed direct route changes about the dealership's exposure.
5. Have learners redraw the chain with one extra supplier and predict how reach changes.

### Assessment

Give learners a node and ask them to list the directly affected nodes and then the indirectly affected ones, without clicking. Check whether they follow the dashed edge as well as the main chain.

### Discussion Questions

- Why did the 2021 chip shortage surprise car manufacturers who had no direct relationship with chip factories?
- If you could add one connection to make this network more resilient, where would you add it?
- Does being upstream always mean having more influence?

## Specification

The specification below was extracted from
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

## References

- [Supply chain - Wikipedia](https://en.wikipedia.org/wiki/Supply_chain) - How multi-stage supply networks are structured.
- [Breadth-first search](https://en.wikipedia.org/wiki/Breadth-first_search) - The traversal algorithm this MicroSim runs when you click a node.
- [2020-2023 global chip shortage](https://en.wikipedia.org/wiki/2020%E2%80%932023_global_chip_shortage) - A real disruption that propagated exactly along these paths.

## Related Resources

- [Chapter 1: Foundations of Systems Thinking](../../chapters/01-foundations-of-systems-thinking/index.md)
- [All MicroSims in this book](../index.md)
