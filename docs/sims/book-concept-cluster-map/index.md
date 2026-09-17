---
title: The Book's Concept Clusters, Connected
description: given the book's ten major concept clusters, the learner will trace how each cluster builds on the ones before it and synthesize which cluster equipped them to understand each domain surveyed in this final chapter (Bloom: Create).
status: scaffold
library: vis-network
bloom_level: TBD
---

# The Book's Concept Clusters, Connected



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
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

## Related Resources

- [Chapter 27: Systems Thinking Across Disciplines](../../chapters/27-systems-thinking-across-disciplines/index.md)
