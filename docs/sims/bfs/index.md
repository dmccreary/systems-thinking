---
title: "Breadth-First Search Step-by-Step"
description: "Advance breadth-first search one ring at a time and predict which vertices it must visit next."
image: /sims/bfs/bfs.png
og:image: /sims/bfs/bfs.png
twitter:image: /sims/bfs/bfs.png
social:
  cards: false
status: implemented
library: p5.js
bloom_level: Apply
bloom_verb: Predict
chapter: 15
---

# Breadth-First Search Step-by-Step

<iframe src="main.html" width="100%" height="525" scrolling="no"></iframe>

[Run the Breadth-First Search Step-by-Step MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Breadth-first search has one invariant worth internalizing: it finishes every vertex at distance d before touching any vertex at distance d+1. This MicroSim lays the graph out in concentric rings so that hop distance is also visual distance, then asks you to predict the next ring before revealing it.

**Learning objective:** Given a starting vertex, the learner will predict which vertex breadth-first search visits next at each step, based on hop distance from the start.

**Bloom's Taxonomy level:** Apply (Predict)

## How To Use

- Read the prompt under the graph before pressing anything - it asks you to predict.
- Press "Next Step" to reveal the next ring of the search.
- Each visited vertex is labeled with its hop distance d from the start.
- Press "Finish" to complete the traversal, or "Restart" to reset every vertex to unvisited.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/bfs/main.html"
        width="100%" height="525" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows what a vertex and an edge are
- Can follow a path through a graph

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Predict the next vertices BFS will visit
- Explain the distance-d-before-distance-d+1 invariant
- Recognize that BFS computes shortest hop distances as a side effect

### Suggested Activity (12 minutes)

1. Ask learners to predict which vertices BFS reaches first, before any clicking.
2. Step through one ring at a time, pausing for a prediction at each step.
3. Point at a far vertex with a tempting direct-looking edge and ask whether BFS will jump to it.
4. At the end, ask what the d labels mean and why they are the shortest distances.
5. Contrast with depth-first search: what would change about the order?

### Assessment

Point at a vertex mid-traversal and ask the learner whether BFS visits it on the next step, with a justification in terms of hop distance.

### Discussion Questions

- Why does BFS find shortest paths while depth-first search does not?
- What does hop distance mean in a social network? In a supply chain?
- Where have you seen 'degrees of separation' used as a real measure?

## Specification

The specification below was extracted from
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

## References

- [Breadth-first search - Wikipedia](https://en.wikipedia.org/wiki/Breadth-first_search) - The algorithm and its shortest-path property.
- [Graph traversal](https://en.wikipedia.org/wiki/Graph_traversal) - How BFS compares to depth-first search.
- [Source MicroSim](https://dmccreary.github.io/graph-algorithms/sims/bfs/bfs.html) - The original version of this simulation.

## Related Resources

- [Chapter 15: Graph Theory Fundamentals](../../chapters/15-graph-theory-fundamentals/index.md)
- [All MicroSims in this book](../index.md)
