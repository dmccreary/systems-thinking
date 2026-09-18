---
title: "Multi-Hop Query Performance, RDBMS vs Graph Database"
description: "Compare RDBMS join time against graph traversal time from one to five hops, on a log or a linear axis."
image: /sims/multi-hop-performance/multi-hop-performance.png
og:image: /sims/multi-hop-performance/multi-hop-performance.png
twitter:image: /sims/multi-hop-performance/multi-hop-performance.png
social:
  cards: false
status: implemented
library: Chart.js
bloom_level: Analyze
bloom_verb: Explain
chapter: 16
---

# Multi-Hop Query Performance, RDBMS vs Graph Database

<iframe src="main.html" width="100%" height="482" scrolling="no"></iframe>

[Run the Multi-Hop Query Performance, RDBMS vs Graph Database MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Reused from this author's MicroSim catalog. At one hop, a relational join and a graph traversal are indistinguishable. At five hops the relational query takes minutes while the graph query is still in milliseconds. The axis toggle matters as much as the data: the same numbers tell a very different story on a log scale than on a linear one.

**Learning objective:** Given response-time data at increasing traversal depth, the learner will explain why RDBMS JOIN cost grows so much faster than graph-database traversal cost as connection depth increases.

**Bloom's Taxonomy level:** Analyze (Explain)

## How To Use

- Read the grouped bars at each query depth from one to five hops.
- Press the Y-Axis Scale toggle to switch between logarithmic and linear views.
- Notice how the linear view makes the first four depths look identical, and the log view makes all five legible.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/multi-hop-performance/main.html"
        width="100%" height="482" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows what a database join is
- Has seen a bar chart

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Explain why join cost compounds with depth while traversal cost does not
- Read the same data correctly on both a log and a linear axis
- Recognize when a log scale is the honest choice

### Suggested Activity (10 minutes)

1. Show the linear view first and ask what learners conclude.
2. Switch to log and ask what they missed.
3. Ask why the relational bars grow so steeply - what happens at each additional join?
4. Ask what workload would make the relational database the better choice.

### Assessment

Ask learners to predict the six-hop values for both systems and to say which axis they would use to present the result, and why.

### Discussion Questions

- When is a logarithmic axis clarifying, and when is it hiding the story?
- At what query depth does switching database technology become worth the migration cost?
- Why does index-free adjacency make depth nearly free?

## Specification

The specification below was extracted from
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

## References

- [Graph database - Wikipedia](https://en.wikipedia.org/wiki/Graph_database) - Index-free adjacency and its performance consequences.
- [Join (SQL)](https://en.wikipedia.org/wiki/Join_(SQL)) - Why each additional join multiplies the work.
- [Logarithmic scale](https://en.wikipedia.org/wiki/Logarithmic_scale) - When a log axis is the appropriate representation.

## Related Resources

- [Chapter 16: Graph Database Architecture](../../chapters/16-graph-database-architecture/index.md)
- [All MicroSims in this book](../index.md)
