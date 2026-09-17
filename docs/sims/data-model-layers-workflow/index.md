---
title: Conceptual, Logical, and Physical Data Models
description: given a single business relationship, the learner will trace how it is represented differently at the conceptual, logical, and physical modeling layers, and explain what new detail each layer adds (Bloom: Analyze).
status: scaffold
library: Mermaid
bloom_level: TBD
---

# Conceptual, Logical, and Physical Data Models



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 26: Knowledge Graph Applications and Data Architecture](../../chapters/26-knowledge-graph-applications-and-data-architecture/index.md).

```text
Type: workflow
**sim-id:** data-model-layers-workflow<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Learning objective: given a single business relationship, the learner will trace how it is represented differently at the conceptual, logical, and physical modeling layers, and explain what new detail each layer adds (Bloom: Analyze).

Visual style: Mermaid flowchart, `graph TD`, three stacked nodes labeled "Conceptual Data Model," "Logical Data Model," and "Physical Data Model," connected top to bottom by arrows labeled "adds attributes and relationships" and "adds technology-specific implementation."

Interactivity requirement: every node MUST have a Mermaid `click` directive wired to a `showInfo(id)` callback that opens an infobox showing that layer's definition plus its version of the retailer "Customer places Order" example (e.g., clicking "Physical Data Model" shows the actual node/edge or table/foreign-key implementation from this chapter's prose).

Color scheme: a gradient from light slate-blue (Conceptual, most abstract) to the book's accent orange (Physical, most concrete), visually reinforcing the increasing specificity at each layer.

Implementation: Mermaid `graph TD` syntax embedded in the page's generated sim wrapper, sharing the `showInfo(id)` JavaScript helper already used by this book's other clickable Mermaid diagrams.
```

## Related Resources

- [Chapter 26: Knowledge Graph Applications and Data Architecture](../../chapters/26-knowledge-graph-applications-and-data-architecture/index.md)
