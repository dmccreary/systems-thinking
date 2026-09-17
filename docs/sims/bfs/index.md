---
title: Breadth-First Search Step-by-Step
description: Breadth-First Search Step-by-Step
status: scaffold
library: p5.js
bloom_level: TBD
---

# Breadth-First Search Step-by-Step



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 15: Graph Theory Fundamentals](../../chapters/15-graph-theory-fundamentals/index.md).

```text
Type: microsim
**sim-id:** bfs<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/graph-algorithms/sims/bfs/bfs.html<br/>
**Source Repo:** https://github.com/dmccreary/graph-algorithms/tree/main/docs/sims/bfs

Reused from the MicroSim catalog (WHAT match score 0.8154; note the catalog's listed fullscreen URL pointed at a stale `main.html` path that returns a 404 -- the correct, verified live file is `bfs.html`, used above). A central starting vertex and its surrounding neighbor vertices are drawn on canvas; "Next Step" advances the search one ring at a time, coloring each newly visited vertex and labeling it with its hop distance from the start, "Finish" completes the traversal instantly, and "Restart" resets every vertex to unvisited. Learning objective: given a starting vertex, the learner will predict which vertex breadth-first search visits next at each step, based on hop distance from the start (Bloom: Applying).
```

## Related Resources

- [Chapter 15: Graph Theory Fundamentals](../../chapters/15-graph-theory-fundamentals/index.md)
