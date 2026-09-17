---
title: Vertical vs Scale-Out Graph Architecture
description: given a growing graph dataset, the learner will compare a single graph-optimized-hardware server against a distributed, scale-out cluster and identify why a cross-server edge traversal costs more than a local one (Bloom: Analyzing).
status: scaffold
library: p5.js
bloom_level: TBD
---

# Vertical vs Scale-Out Graph Architecture



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
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

## Related Resources

- [Chapter 16: Graph Database Architecture](../../chapters/16-graph-database-architecture/index.md)
