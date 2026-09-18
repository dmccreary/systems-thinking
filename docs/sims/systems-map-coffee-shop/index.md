---
title: "Systems Map Example — Coffee Shop"
description: "Explore a coffee shop as a systems map, with money, goods and information flows drawn in three distinct line styles."
image: /sims/systems-map-coffee-shop/systems-map-coffee-shop.png
og:image: /sims/systems-map-coffee-shop/systems-map-coffee-shop.png
twitter:image: /sims/systems-map-coffee-shop/systems-map-coffee-shop.png
social:
  cards: false
status: implemented
library: vis-network
bloom_level: Understand
bloom_verb: Illustrate
chapter: 2
---

# Systems Map Example — Coffee Shop

<iframe src="main.html" width="100%" height="522" scrolling="no"></iframe>

[Run the Systems Map Example — Coffee Shop MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

A causal loop diagram shows one kind of relationship. A systems map is broader: it shows people, physical goods, money and information all on the same picture, which is why it is usually the first thing to draw when you are still figuring out what the system even is. Every node and every arrow here is clickable.

**Learning objective:** Given a familiar small business, the learner will illustrate how people, resources and information connect across a systems map.

**Bloom's Taxonomy level:** Understand (Illustrate)

## How To Use

- Click any node to see that part's role in the shop.
- Click any arrow to see which kind of flow it is and why that flow keeps the shop open.
- Compare the three line styles: solid for money, dashed for goods, dotted for information.
- Press "Rearrange" to re-run the layout - the positions change but the connections do not.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/systems-map-coffee-shop/main.html"
        width="100%" height="522" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows what a node and an edge represent
- Has been inside a small business

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Distinguish money, goods and information flows in one diagram
- Explain why information flows matter even though they carry nothing physical
- Identify a single point of failure from a systems map

### Suggested Activity (12 minutes)

1. Ask learners to list everything a coffee shop needs before showing the map.
2. Click through the six nodes and compare to the list.
3. Ask learners to find the only information flow that, if lost, would cause the shop to run out of milk.
4. Ask which single node's failure stops the whole shop, and why that is visible on the map.
5. Have learners draw a systems map of their school cafeteria or a local business.

### Assessment

Ask learners to add one node and two arrows to this map (for example, a landlord or a delivery app) and to label each new arrow's flow type. Correct flow typing is the thing to check.

### Discussion Questions

- The supplier is outside the shop but inside the system. What else is like that in your organization?
- Why are information flows the easiest to cut and the most damaging to lose?
- What does this map leave out, and does leaving it out matter?

## Specification

The specification below was extracted from
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

## References

- [Systems mapping - Wikipedia](https://en.wikipedia.org/wiki/Systems_thinking) - Where systems maps sit among systems-thinking tools.
- [Value stream mapping](https://en.wikipedia.org/wiki/Value-stream_mapping) - A related mapping technique focused on flow of value.
- [Single point of failure](https://en.wikipedia.org/wiki/Single_point_of_failure) - Why the espresso machine matters more than its cost suggests.

## Related Resources

- [Chapter 2: Mental Models and Systems Analysis Tools](../../chapters/02-mental-models-and-systems-analysis-tools/index.md)
- [All MicroSims in this book](../index.md)
