---
title: "Vertical vs Scale-Out Graph Architecture"
description: "Toggle between one large graph server and a three-shard cluster, and see why a cross-shard edge costs so much more."
image: /sims/graph-scale-out-architecture/graph-scale-out-architecture.png
og:image: /sims/graph-scale-out-architecture/graph-scale-out-architecture.png
twitter:image: /sims/graph-scale-out-architecture/graph-scale-out-architecture.png
social:
  cards: false
status: implemented
library: p5.js
bloom_level: Analyze
bloom_verb: Compare
chapter: 16
---

# Vertical vs Scale-Out Graph Architecture

<iframe src="main.html" width="100%" height="507" scrolling="no"></iframe>

[Run the Vertical vs Scale-Out Graph Architecture MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Graph databases are unusual among distributed systems: sharding them is genuinely hard, because a traversal that stays in one machine's memory is a pointer dereference while one that leaves the machine is a network round-trip. The same nine vertices are drawn both ways here, and the dashed orange edges are the bill the cluster pays for its extra memory.

**Learning objective:** Given a growing graph dataset, the learner will compare a single graph-optimized-hardware server against a distributed scale-out cluster and identify why a cross-server edge traversal costs more than a local one.

**Bloom's Taxonomy level:** Analyze (Compare)

## How To Use

- Press "Switch View" to toggle between the single server and the three-shard cluster.
- Hover any vertex to see which server or shard holds it.
- Hover any edge to see whether it is a local hop or a cross-shard hop, and its relative cost.
- In the cluster view, press "Highlight Cross-Shard Edges" to pulse every edge that crosses a boundary.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/graph-scale-out-architecture/main.html"
        width="100%" height="507" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows what a graph traversal is
- Has a rough sense that network calls are slower than memory access

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Compare vertical scaling against scale-out for graph workloads
- Explain why a cross-shard traversal costs orders of magnitude more than a local one
- Recognize that shard placement is a design decision with performance consequences

### Suggested Activity (12 minutes)

1. Start in the single-server view and have learners count the edges.
2. Switch to the cluster and ask what changed about the graph. Nothing - only where it lives.
3. Press "Highlight Cross-Shard Edges" and count them.
4. Ask learners to propose a different assignment of vertices to shards that reduces cross-shard edges.
5. Discuss when a cluster is worth it despite the cost.

### Assessment

Give learners a small graph and three shards and ask them to assign vertices so as to minimize cross-shard edges, then to justify the assignment.

### Discussion Questions

- Why is sharding a graph harder than sharding a table of independent rows?
- What kinds of queries would make the cluster's extra memory worth the cross-shard cost?
- Is there a workload where the single server simply cannot win?

## Specification

The specification below was extracted from
[Chapter 16: Graph Database Architecture](../../chapters/16-graph-database-architecture/index.md).

```text
Type: diagram
**sim-id:** graph-scale-out-architecture<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/organizational-analytics/tree/main/docs/sims/graph-scalability

Learning objective: given a growing graph dataset, the learner will compare a single graph-optimized-hardware server against a distributed, scale-out cluster and identify why a cross-server edge traversal costs more than a local one (Bloom: Analyzing).

Canvas: 700x450 pixels, responsive -- recompute canvas width from the containing element on window resize.

Visual design: two side-by-side panels, toggled by a button rather than shown simultaneously. The "Graph-Optimized Hardware" panel draws one large server icon holding a small sample graph (8-10 vertices, all edges drawn as solid lines, since every vertex lives in the same machine's memory). The "Scale-Out Cluster" panel draws the same 8-10 vertices split across three smaller server icons (shards), with edges between vertices on the same shard drawn as solid lines and edges between vertices on different shards drawn as dashed lines in a warning-orange color.

Controls (p5.js built-in controls only, per this book's control conventions): a `createButton()` labeled "Switch View" that toggles between the two panels; a `createButton()` labeled "Highlight Cross-Shard Edges" that, only in the Scale-Out Cluster panel, pulses every dashed edge and updates a text infobox reading "Cross-shard edges require a network round-trip -- much slower than a local pointer hop."

Interaction: hovering any vertex shows an infobox naming which server (or shard) holds it; hovering any edge shows whether it is a local hop or a cross-shard hop and its relative cost.

Implementation: p5.js, canvas parented to `document.querySelector('main')`, `updateCanvasSize()` called first in `setup()` per this book's MicroSim conventions, fixed sample layout (no physics simulation required).
```

## References

- [Shard (database architecture) - Wikipedia](https://en.wikipedia.org/wiki/Shard_(database_architecture)) - How data is partitioned across servers.
- [Graph database](https://en.wikipedia.org/wiki/Graph_database) - Why index-free adjacency makes local traversal so cheap.
- [Scalability](https://en.wikipedia.org/wiki/Scalability) - Vertical versus horizontal scaling trade-offs.

## Related Resources

- [Chapter 16: Graph Database Architecture](../../chapters/16-graph-database-architecture/index.md)
- [All MicroSims in this book](../index.md)
