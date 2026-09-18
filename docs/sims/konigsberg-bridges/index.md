---
title: "The Seven Bridges of Konigsberg"
description: "Compute each landmass's degree and apply Euler's odd-degree rule to see why the famous walk is impossible."
image: /sims/konigsberg-bridges/konigsberg-bridges.png
og:image: /sims/konigsberg-bridges/konigsberg-bridges.png
twitter:image: /sims/konigsberg-bridges/konigsberg-bridges.png
social:
  cards: false
status: implemented
library: vis-network
bloom_level: Analyze
bloom_verb: Apply
chapter: 16
---

# The Seven Bridges of Konigsberg

<iframe src="main.html" width="100%" height="582" scrolling="no"></iframe>

[Run the The Seven Bridges of Konigsberg MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

In 1736 Euler proved that the citizens of Konigsberg could not walk a route crossing all seven bridges exactly once. His insight - that the shapes of the landmasses and the lengths of the bridges are irrelevant, and only the connections matter - is the moment graph theory begins, and it is the same insight every graph database is built on.

**Learning objective:** Given the Konigsberg bridge layout redrawn as a graph, the learner will compute each landmass's degree and apply Euler's odd-degree rule to explain why no solution exists.

**Bloom's Taxonomy level:** Analyze (Apply)

## How To Use

- Click any landmass to see its degree, the number of bridges touching it.
- Press "Check for a Solution" to color every odd-degree vertex red and every even-degree one green.
- Read the rule that appears: zero or two odd-degree vertices are required, and this graph has four.
- Press "Reset Colors" to try the reasoning again from the start.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/konigsberg-bridges/main.html"
        width="100%" height="582" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows what a vertex and an edge are
- Can count connections at a point

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Compute the degree of a vertex
- Apply Euler's rule to decide whether an Eulerian path exists
- Explain why geometry is irrelevant to the answer

### Suggested Activity (12 minutes)

1. Show the graph and let learners try to trace a route crossing every edge once. Let them fail for a few minutes.
2. Click each landmass in turn and record the degrees.
3. Ask learners to articulate why an odd degree is a problem, in terms of entering and leaving.
4. Press "Check for a Solution" and compare to their reasoning.
5. Ask: if one bridge were removed, would a walk become possible? Which one?

### Assessment

Give learners a different small graph and ask whether an Eulerian path exists, with the degree counts as justification.

### Discussion Questions

- Why is 'you must leave every place you enter' the whole proof?
- What made Euler's abstraction away from geography so powerful?
- Where else does only-the-connections-matter reasoning apply?

## Specification

The specification below was extracted from
[Chapter 16: Graph Database Architecture](../../chapters/16-graph-database-architecture/index.md).

```text
Type: graph-model
**sim-id:** konigsberg-bridges<br/>
**Library:** vis-network<br/>
**Status:** Specified

Learning objective: given the Konigsberg bridge layout redrawn as a graph, the learner will compute each landmass's degree and apply Euler's odd-degree rule to explain why no solution exists (Bloom: Analyzing).

Canvas: responsive vis-network container, minimum 500px height, full container width, recomputed on window resize.

Visual design: four circular vertices labeled "Kneiphof Island," "North Bank," "South Bank," and "East Bank," positioned to loosely mirror the real 1736 map. Seven curved edges connect them: two edges between Kneiphof Island and North Bank, two between Kneiphof Island and South Bank, one between Kneiphof Island and East Bank, one between North Bank and East Bank, and one between South Bank and East Bank -- reproducing the real bridge layout, where curved parallel edges represent the two separate bridges between the same pair of landmasses.

Interaction: clicking any vertex opens an infobox showing its label and its degree (the count of edges touching it: Kneiphof Island = 5, North Bank = 3, South Bank = 3, East Bank = 3). A "Check for a Solution" button recolors every odd-degree vertex red and every even-degree vertex green, then displays Euler's rule in a text panel below the canvas: "A walk crossing every edge exactly once exists only if the graph has zero or two odd-degree vertices. This graph has four -- so no such walk is possible." A "Reset Colors" button restores the default vertex coloring.

Implementation: vis-network with a fixed node/edge dataset (no physics simulation needed since the layout is historically fixed), click event handler bound to each node for the infobox, a separate DOM button wired to a function that recolors nodes by parity of their computed degree.
```

## References

- [Seven Bridges of Konigsberg - Wikipedia](https://en.wikipedia.org/wiki/Seven_Bridges_of_K%C3%B6nigsberg) - The historical problem and Euler's solution.
- [Eulerian path](https://en.wikipedia.org/wiki/Eulerian_path) - The general rule about odd-degree vertices.
- [Leonhard Euler](https://en.wikipedia.org/wiki/Leonhard_Euler) - The mathematician whose 1736 paper founded graph theory.

## Related Resources

- [Chapter 16: Graph Database Architecture](../../chapters/16-graph-database-architecture/index.md)
- [All MicroSims in this book](../index.md)
