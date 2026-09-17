---
title: Multi-Hop Query Performance, RDBMS vs Graph Database
description: Multi-Hop Query Performance, RDBMS vs Graph Database
status: scaffold
library: Chart.js
bloom_level: TBD
---

# Multi-Hop Query Performance, RDBMS vs Graph Database



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 16: Graph Database Architecture](../../chapters/16-graph-database-architecture/index.md).

```text
Type: chart
**sim-id:** multi-hop-performance<br/>
**Library:** Chart.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/organizational-analytics/sims/multi-hop-performance/main.html<br/>
**Source Repo:** https://github.com/dmccreary/organizational-analytics/tree/main/docs/sims/multi-hop-performance

Reused from the MicroSim catalog (WHAT match score 0.8371; both catalog and live URL verified working). A grouped bar chart plots RDBMS join response time against graph-database traversal time for query depths of 1 through 5 hops -- the RDBMS bars grow from 10 milliseconds at one hop to over 13 minutes at five hops, while the graph-database bars stay near flat, from 5 to 18 milliseconds. A "Y-Axis Scale" toggle button switches between a logarithmic and a linear view, changing what the same data visually communicates. Learning objective: given response-time data at increasing traversal depth, the learner will explain why RDBMS JOIN cost grows so much faster than graph-database traversal cost as connection depth increases (Bloom: Analyzing).
```

## Related Resources

- [Chapter 16: Graph Database Architecture](../../chapters/16-graph-database-architecture/index.md)
