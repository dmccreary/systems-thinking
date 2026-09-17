---
title: Systems Map Example — Coffee Shop
description: Given a familiar small business, the learner will illustrate how people, resources, and information connect across a systems map (Bloom: Understanding).
status: scaffold
library: vis-network
bloom_level: Understand
---

# Systems Map Example — Coffee Shop



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: Mental Models and Systems Analysis Tools](../../chapters/02-mental-models-and-systems-analysis-tools/index.md).

```text
Type: graph-model
**sim-id:** systems-map-coffee-shop<br/>
**Library:** vis-network<br/>
**Template:** https://github.com/dmccreary/organizational-analytics/tree/main/docs/sims/capstone-component-map<br/>
**Status:** Specified

Purpose: Show a systems map of a small coffee shop (Customers, Baristas, Cash Register, Inventory, Supplier, Espresso Machine) with labeled connections for money, goods, and information flow, so learners see a systems map is broader than a single-relationship diagram.

Bloom Taxonomy Level: Understand
Bloom Taxonomy Verb: Illustrate

Learning Objective: Given a familiar small business, the learner will illustrate how people, resources, and information connect across a systems map (Bloom: Understanding).

Canvas: full-width responsive `vis-network` container, 500px tall, calling `network.fit()` on a window `resize` listener.

Visual elements:
- Six nodes: Customers, Baristas, Cash Register, Inventory, Supplier, Espresso Machine, laid out with `vis-network`'s physics-based layout so the learner can also drag nodes freely.
- Edges labeled by flow type using different line styles: solid for money flow (Customers → Cash Register, Cash Register → Supplier), dashed for goods flow (Supplier → Inventory, Inventory → Espresso Machine), dotted for information flow (Baristas → Inventory, labeled "restock request").
- A small legend box in the corner of the canvas explaining the three line styles.

Controls:
- Clicking any node opens an infobox describing that part's role in the coffee shop system.
- Clicking any edge opens an infobox naming the flow type (money, goods, or information) and explaining, in one sentence, why that flow matters to the shop staying open.
- A "Rearrange" button, implemented as an HTML button, that re-runs the `vis-network` physics layout (`network.stabilize()`) so nodes settle into a fresh, non-overlapping arrangement.

Interactivity requirement: every node and every edge is clickable, satisfying the interactivity bar with an infobox on each click.

Color scheme: warm brown tones for goods-related nodes (Inventory, Supplier, Espresso Machine) and cool blue tones for people/money nodes (Customers, Baristas, Cash Register), consistent with the book's existing palette conventions.

Implementation: `vis-network` `DataSet` objects for nodes and edges with a `dashes` property set per edge to control line style, and a `network.on("click", ...)` handler that looks up the clicked node or edge ID in a small JavaScript object of infobox text.
```

## Related Resources

- [Chapter 2: Mental Models and Systems Analysis Tools](../../chapters/02-mental-models-and-systems-analysis-tools/index.md)
