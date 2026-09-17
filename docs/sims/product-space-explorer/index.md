---
title: Product Space Explorer
description: given a simplified product space network, the learner will analyze which unexported products are most reachable from a country's current export basket by tracing relatedness edges, and justify why one candidate product is a better diversification target than another (Bloom: Analyze).
status: scaffold
library: vis-network
bloom_level: TBD
---

# Product Space Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 24: Knowledge Systems and Economic Complexity](../../chapters/24-knowledge-systems-and-economic-complexity/index.md).

```text
Type: graph-model
**sim-id:** product-space-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Learning objective: given a simplified product space network, the learner will analyze which unexported products are most reachable from a country's current export basket by tracing relatedness edges, and justify why one candidate product is a better diversification target than another (Bloom: Analyze).

Canvas: responsive vis-network container, minimum 520px height, full container width, with a window `resize` listener calling `network.redraw()` and `network.fit()`.

Visual elements:
- Roughly 16 product nodes grouped into three visually clustered regions: a "Textiles" cluster (Raw Cotton, Woven Fabric, Knit Garments, Industrial Sewing Equipment), a "Machinery/Electronics" cluster (Basic Machine Parts, Industrial Machinery, Circuit Boards, Semiconductors, Software Services), and a "Raw Commodities" cluster (Unprocessed Ore, Raw Timber, Crude Petroleum), positioned using vis-network's force-directed physics so related products naturally cluster.
- Edges connecting products that share underlying capabilities, drawn thicker for stronger relatedness (e.g., Woven Fabric — Knit Garments is a thick edge; Raw Cotton — Semiconductors has no edge at all).
- One highlighted starting country's current export basket, pre-selected as three nodes (Raw Cotton, Woven Fabric, Basic Machine Parts) shown with a bright colored border.

Controls:
- A "Show Reachable Products" button that highlights, in a distinct accent color, every unexported node directly connected by an edge to the current export-basket nodes, simulating one round of the relatedness principle.
- A dropdown to switch the starting country's export basket between two presets ("Textile Exporter" and "Raw Commodity Exporter"), demonstrating that the set of reachable next products differs sharply depending on the starting basket.

Interactivity requirement: every node is clickable, opening an infobox with the product's name, its cluster, and one sentence on what capabilities it represents; every edge is hoverable, showing a tooltip naming the shared capability driving that relatedness link (e.g., "shared skill: precision stitching and quality control").

Color scheme: three distinct pastel colors for the three clusters, a bright accent color (this book's existing orange) for the "already exported" and "newly reachable" highlight states, and low-opacity gray for currently unreachable nodes.

Implementation: vis-network `DataSet` objects for nodes and edges with physics-based clustering enabled, a click handler populating a shared infobox `<div>`, and a button handler that recolors nodes based on graph adjacency to the currently selected export-basket set.
```

## Related Resources

- [Chapter 24: Knowledge Systems and Economic Complexity](../../chapters/24-knowledge-systems-and-economic-complexity/index.md)
