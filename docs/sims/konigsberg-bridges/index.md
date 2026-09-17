---
title: The Seven Bridges of Konigsberg
description: given the Konigsberg bridge layout redrawn as a graph, the learner will compute each landmass's degree and apply Euler's odd-degree rule to explain why no solution exists (Bloom: Analyzing).
status: scaffold
library: vis-network
bloom_level: TBD
---

# The Seven Bridges of Konigsberg



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 16: Graph Database Architecture](../../chapters/16-graph-database-architecture/index.md).

```text
Type: graph-model
**sim-id:** konigsberg-bridges<br/>
**Library:** vis-network<br/>
**Status:** Specified

Learning objective: given the Konigsberg bridge layout redrawn as a graph, the learner will compute each landmass's degree and apply Euler's odd-degree rule to explain why no solution exists (Bloom: Analyzing).

Canvas: responsive vis-network container, minimum 500px height, full container width, recomputed on window resize.

Visual design: four circular vertices labeled "Kneiphof Island," "North Bank," "South Bank," and "East Bank," positioned to loosely mirror the real 1736 map. Seven curved edges connect them: two edges between Kneiphof Island and North Bank, two between Kneiphof Island and South Bank, one between Kneiphof Island and East Bank, one between North Bank and East Bank, and one between South Bank and East Bank -- reproducing the real bridge layout, where curved parallel edges represent the two separate bridges between the same pair of landmasses.

Interaction: clicking any vertex opens an infobox showing its label and its degree (the count of edges touching it: Kneiphof Island = 5, North Bank = 3, South Bank = 3, East Bank = 3). A "Check for a Solution" button recolors every odd-degree vertex red and every even-degree vertex green, then displays Euler's rule in a text panel below the canvas: "A walk crossing every edge exactly once exists only if the graph has zero or two odd-degree vertices. This graph has four -- so no such walk is possible." A "Reset Colors" button restores the default vertex coloring.

Implementation: vis-network with a fixed node/edge dataset (no physics simulation needed since the layout is historically fixed), click event handler bound to each node for the infobox, a separate DOM button wired to a function that recolors nodes by parity of their computed degree.
```

## Related Resources

- [Chapter 16: Graph Database Architecture](../../chapters/16-graph-database-architecture/index.md)
