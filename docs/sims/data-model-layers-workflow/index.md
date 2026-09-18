---
title: "Conceptual, Logical, and Physical Data Models"
description: "Trace one retailer relationship through conceptual, logical and physical models and see what each layer adds."
image: /sims/data-model-layers-workflow/data-model-layers-workflow.png
og:image: /sims/data-model-layers-workflow/data-model-layers-workflow.png
twitter:image: /sims/data-model-layers-workflow/data-model-layers-workflow.png
social:
  cards: false
status: implemented
library: Mermaid
bloom_level: Analyze
bloom_verb: Trace
chapter: 26
---

# Conceptual, Logical, and Physical Data Models

<iframe src="main.html" width="100%" height="442" scrolling="no"></iframe>

[Run the Conceptual, Logical, and Physical Data Models MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

One relationship - Customer places Order - shown three times at increasing specificity. The conceptual layer is what a store manager can check; the logical layer pins down attributes and cardinality; the physical layer commits to a technology, and is shown here both relationally and as a graph so the commitment is visible as a choice.

**Learning objective:** Given a single business relationship, the learner will trace how it is represented differently at the conceptual, logical, and physical modeling layers, and explain what new detail each layer adds.

**Bloom's Taxonomy level:** Analyze (Trace)

## How To Use

- Click each layer for its definition and its version of the Customer places Order example.
- Read the arrow labels: they name exactly what the next layer adds.
- At the physical layer, compare the relational and graph implementations of the same relationship.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/data-model-layers-workflow/main.html"
        width="100%" height="442" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Has seen a database table or a graph node
- Knows what a business relationship is

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Trace one relationship across all three modeling layers
- State what each layer adds
- Explain why keeping the layers separate is worth the effort

### Suggested Activity (10 minutes)

1. Click the conceptual layer and ask whether a non-technical stakeholder could check it.
2. Click the logical layer and identify what had to be decided that the conceptual layer glossed over.
3. Click the physical layer and compare the two implementations.
4. Ask what changes if you switch databases - and which layers do not change at all.
5. Have learners model a relationship from their own work at all three layers.

### Assessment

Give learners a business relationship and ask for all three representations, checking that no technology appears above the physical layer.

### Discussion Questions

- Why do so many projects start at the physical layer and skip the other two?
- What is lost when the conceptual model exists only in someone's head?
- Does the graph implementation change the logical model, or only the physical one?

## Specification

The specification below was extracted from
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

## References

- [Data model - Wikipedia](https://en.wikipedia.org/wiki/Data_model) - The three-layer modeling convention.
- [Conceptual schema](https://en.wikipedia.org/wiki/Conceptual_schema) - The most abstract layer and its audience.
- [ANSI-SPARC architecture](https://en.wikipedia.org/wiki/ANSI-SPARC_Architecture) - The standard that formalized the separation of layers.

## Related Resources

- [Chapter 26: Knowledge Graph Applications and Data Architecture](../../chapters/26-knowledge-graph-applications-and-data-architecture/index.md)
- [All MicroSims in this book](../index.md)
