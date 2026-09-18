---
title: "Product Space Explorer"
description: "Pick a starting export basket and see how many products relatedness puts within one step's reach."
image: /sims/product-space-explorer/product-space-explorer.png
og:image: /sims/product-space-explorer/product-space-explorer.png
twitter:image: /sims/product-space-explorer/product-space-explorer.png
social:
  cards: false
status: implemented
library: vis-network
bloom_level: Analyze
bloom_verb: Analyze
chapter: 24
---

# Product Space Explorer

<iframe src="main.html" width="100%" height="562" scrolling="no"></iframe>

[Run the Product Space Explorer MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

What a place can make next depends on what it can already make, not on what its current exports are worth. This MicroSim makes that argument visible: switch between a textile basket and a raw-commodity basket, press the same button, and watch one basket open several options while the other opens almost nothing.

**Learning objective:** Given a simplified product space network, the learner will analyze which unexported products are most reachable from a country's current export basket by tracing relatedness edges, and justify why one candidate product is a better diversification target than another.

**Bloom's Taxonomy level:** Analyze (Analyze)

## How To Use

- Pick a starting export basket from the dropdown.
- Press "Show Reachable Products" to highlight everything one relatedness step away.
- Click any product for the capabilities it represents; hover any edge for the shared capability driving that link.
- Switch baskets and press the button again - the contrast is the point.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/product-space-explorer/main.html"
        width="100%" height="562" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows what an export is
- Has seen a network diagram with clusters

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Identify which products are reachable from a given export basket
- Justify one diversification target over another using relatedness
- Explain why a sparse neighborhood limits future options regardless of current revenue

### Suggested Activity (15 minutes)

1. Start with the Textile Exporter basket and press the button. Count the reachable products.
2. Switch to Raw Commodity Exporter and press again. Count again.
3. Ask why the second basket is so much worse positioned despite crude petroleum being valuable.
4. Ask learners to pick the single best next product from the textile basket and defend the choice.
5. Connect to careers: what is your own capability neighborhood?

### Assessment

Give learners a basket and ask for a ranked list of the two best diversification targets, with the shared capability named for each.

### Discussion Questions

- Why does an oil-rich country stay undiversified despite enormous revenue?
- Should industrial policy target the nearest product or the most valuable one?
- Does the same logic apply to a company's product line, or to a person's career?

## Specification

The specification below was extracted from
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

## References

- [Product space - Wikipedia](https://en.wikipedia.org/wiki/Product_space) - Hidalgo and Hausmann's network of product relatedness.
- [Economic complexity index](https://en.wikipedia.org/wiki/Economic_Complexity_Index) - How capability breadth is measured.
- [Cesar Hidalgo](https://en.wikipedia.org/wiki/C%C3%A9sar_A._Hidalgo) - Co-author of the product space research.

## Related Resources

- [Chapter 24: Knowledge Systems and Economic Complexity](../../chapters/24-knowledge-systems-and-economic-complexity/index.md)
- [All MicroSims in this book](../index.md)
