---
title: "The Book's Concept Clusters, Connected"
description: "Walk the book's ten concept clusters around a circle and see how each one builds on the last."
image: /sims/book-concept-cluster-map/book-concept-cluster-map.png
og:image: /sims/book-concept-cluster-map/book-concept-cluster-map.png
twitter:image: /sims/book-concept-cluster-map/book-concept-cluster-map.png
social:
  cards: false
status: implemented
library: vis-network
bloom_level: Create
bloom_verb: Synthesize
chapter: 27
---

# The Book's Concept Clusters, Connected

<iframe src="main.html" width="100%" height="562" scrolling="no"></iframe>

[Run the The Book's Concept Clusters, Connected MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

The book's ten clusters arranged in reading order around a circle, colored by a gradient from the slate-blue of Chapter 1 to the accent orange of Chapter 27. Each arrow names the specific dependency it carries, and the final dashed arrow back to the start reads "the same lens, applied anywhere" - which is the book's whole argument in one edge.

**Learning objective:** Given the book's ten major concept clusters, the learner will trace how each cluster builds on the ones before it and synthesize which cluster equipped them to understand each domain surveyed in this final chapter.

**Bloom's Taxonomy level:** Create (Synthesize)

## How To Use

- Click any cluster for its chapters, its core idea, and an example already used in the book.
- Hover any arrow for the specific dependency it carries.
- Follow the color gradient around the circle - it tracks the book's progression from vocabulary to application.
- Click the final dashed arrow for why the book closes rather than ends.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/book-concept-cluster-map/main.html"
        width="100%" height="562" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Has read or surveyed most of the book

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Trace how each cluster depends on the ones before it
- Name which cluster supplied the tools for a given application
- Synthesize the book's structure into a single argument

### Suggested Activity (15 minutes)

1. Ask learners to name the book's major sections from memory before opening the map.
2. Click each cluster in reading order and check against the recollection.
3. Hover each arrow and ask whether the stated dependency is real - argue the ones that seem weak.
4. For each domain in Chapter 27, ask which cluster supplied the lens.
5. Ask learners to write the book's argument in three sentences.

### Assessment

Ask learners to pick any two non-adjacent clusters and explain the path of dependencies that connects them.

### Discussion Questions

- Could the book have been ordered differently? What would break?
- Which cluster did the most work for you personally?
- What would an eleventh cluster be?

## Specification

The specification below was extracted from
[Chapter 27: Systems Thinking Across Disciplines](../../chapters/27-systems-thinking-across-disciplines/index.md).

```text
Type: graph-model
**sim-id:** book-concept-cluster-map<br/>
**Library:** vis-network<br/>
**Template:** https://github.com/dmccreary/economics-course/tree/main/docs/sims/feedback-loops<br/>
**Status:** Specified

Learning objective: given the book's ten major concept clusters, the learner will trace how each cluster builds on the ones before it and synthesize which cluster equipped them to understand each domain surveyed in this final chapter (Bloom: Create).

Canvas: responsive vis-network container, minimum 560px height, full container width, with a window `resize` listener calling `network.redraw()` and `network.fit()`.

Visual elements: ten nodes arranged in a circular layout representing this book's major clusters, in reading order: "Systems Vocabulary & Feedback" (Ch 1-4), "Growth, Resilience & Archetypes" (Ch 5-12), "Leverage Points" (Ch 13-14), "Graphs & Knowledge Representation" (Ch 15-19), "Organizational Practice & Maturity" (Ch 20-21), "AI Systems" (Ch 22-23), "Knowledge Systems & Economic Complexity" (Ch 24), "Design, Emerging Tech & Personal Practice" (Ch 25), "Knowledge Graph Applications" (Ch 26), and "Cross-Disciplinary Synthesis" (Ch 27, this chapter). Sequential arrows connect each node to the next around the circle, and the final node connects with a distinct dashed arrow back to the first, labeled "the same lens, applied anywhere."

Interactivity requirement: every node is clickable, opening an infobox naming that cluster's chapters, its one-sentence core idea, and one example already used somewhere in the book (e.g., clicking "Leverage Points" shows the iceberg model from Chapters 13-14). Hovering any arrow shows a tooltip naming the specific dependency (e.g., the arrow from "Systems Vocabulary & Feedback" to "Growth, Resilience & Archetypes" reads "feedback loops are the building block every archetype is made of").

Color scheme: a smooth color gradient running around the circle from the book's original slate-blue (Chapter 1's cluster) through to the accent orange (this chapter's cluster), visually representing the book's own progression from foundational vocabulary to cross-disciplinary application.

Implementation: vis-network with a fixed circular-layout node/edge dataset (no physics simulation needed, positions computed directly from each node's index around a circle), click handlers populating a shared infobox panel below the canvas, and a CSS or JavaScript color-interpolation helper computing each node's gradient color from its position in the sequence.
```

## References

- [Concept map - Wikipedia](https://en.wikipedia.org/wiki/Concept_map) - The representation used here for the book's structure.
- [Systems thinking](https://en.wikipedia.org/wiki/Systems_thinking) - The lens the final dashed arrow refers to.
- [Learning graph](https://en.wikipedia.org/wiki/Knowledge_graph) - How concept dependencies are modeled in intelligent textbooks.

## Related Resources

- [Chapter 27: Systems Thinking Across Disciplines](../../chapters/27-systems-thinking-across-disciplines/index.md)
- [All MicroSims in this book](../index.md)
