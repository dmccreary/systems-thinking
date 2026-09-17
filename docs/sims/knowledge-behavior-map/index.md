---
title: How Embodied Knowledge Moves, Fades, and Leaks
description: given a central embodied-knowledge example, the learner will classify four ways that knowledge can move, fade, or transfer beyond its original holder, and distinguish cross-generational transfer (intentional) from knowledge spillover (unintentional) (Bloom: Analyze).
status: scaffold
library: Mermaid
bloom_level: TBD
---

# How Embodied Knowledge Moves, Fades, and Leaks



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 24: Knowledge Systems and Economic Complexity](../../chapters/24-knowledge-systems-and-economic-complexity/index.md).

```text
Type: diagram
**sim-id:** knowledge-behavior-map<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Learning objective: given a central embodied-knowledge example, the learner will classify four ways that knowledge can move, fade, or transfer beyond its original holder, and distinguish cross-generational transfer (intentional) from knowledge spillover (unintentional) (Bloom: Analyze).

Visual style: Mermaid flowchart, `graph TD`, with one central node "Knowledge Embodiment (e.g., a company's manufacturing process)" connected outward to four surrounding nodes: "Cross-Generational Knowledge," "Geographic Knowledge Stickiness," "Knowledge Decay," and "Knowledge Spillover."

Interactivity requirement: every node, including the central one, MUST have a Mermaid `click` directive wired to a JavaScript `showInfo(id)` callback that opens an infobox with that concept's one-sentence definition, drawn from this chapter's own wording, plus one concrete example distinct from the ones already used in the surrounding prose (e.g., clicking "Knowledge Decay" shows a radiologist's diagnostic skill growing rusty after years away from reading scans).

Color scheme: the central node in the book's accent orange; the two "intentional/controlled" outward nodes (Cross-Generational Knowledge, Geographic Knowledge Stickiness) in a cool slate-blue; the two "unintentional/lossy" outward nodes (Knowledge Decay, Knowledge Spillover) in a warning amber, so the color coding itself previews the analytical distinction the learner is meant to draw.

Implementation: Mermaid `graph TD` syntax embedded in the page's generated sim wrapper, sharing the `showInfo(id)` JavaScript helper already used by this book's other clickable Mermaid diagrams, populating a shared infobox `<div>` below the diagram.
```

## Related Resources

- [Chapter 24: Knowledge Systems and Economic Complexity](../../chapters/24-knowledge-systems-and-economic-complexity/index.md)
