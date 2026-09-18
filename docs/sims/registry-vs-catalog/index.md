---
title: "Metadata Registry vs. Catalog"
description: "Compare a governed metadata registry against a discovery catalog, and follow the dashed link that keeps a found field traceable to its definition."
image: /sims/registry-vs-catalog/registry-vs-catalog.png
og:image: /sims/registry-vs-catalog/registry-vs-catalog.png
twitter:image: /sims/registry-vs-catalog/registry-vs-catalog.png
social:
  cards: false
status: implemented
library: vis-network
bloom_level: Analyze
bloom_verb: Distinguish
chapter: 17
---

# Metadata Registry vs. Catalog

<iframe src="main.html" width="100%" height="582" scrolling="no"></iframe>

[Run the Metadata Registry vs. Catalog MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Reused from this author's MicroSim catalog. A registry says what a data element is supposed to mean; a catalog says what a crawler actually found in a live system. Organizations routinely buy one and assume they got both. The dashed orange link between the panels is the part that matters: it is what keeps a discovered field connected to its authoritative definition.

**Learning objective:** Given a metadata registry and a metadata catalog shown side by side, the learner will distinguish what each one is responsible for and explain how the dashed link between them keeps a discovered field's meaning traceable to its governed definition.

**Bloom's Taxonomy level:** Analyze (Distinguish)

## How To Use

- Click any node on the left Registry panel to see what that piece of a governed definition means.
- Click any node on the right Catalog panel to see what a discovery tool actually found.
- Click the dashed orange link between the panels for how the two connect.
- Press "Reset View" to clear the selection.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/registry-vs-catalog/main.html"
        width="100%" height="582" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows what metadata is
- Has seen a data dictionary or a data catalog tool

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Distinguish a registry's responsibility from a catalog's
- Explain the role of the link between a discovered field and its governed definition
- Recognize the failure mode of having one without the other

### Suggested Activity (12 minutes)

1. Show both panels and ask learners which one they think their organization has.
2. Click through the registry side: registration authority, data element, value domain, version history.
3. Click through the catalog side: crawler, discovered table, quality score.
4. Click the dashed link and ask what is lost if it does not exist.
5. Ask what a catalog alone tells you, and what it cannot tell you.

### Assessment

Ask learners to name one question only a registry can answer and one only a catalog can answer.

### Discussion Questions

- Why do organizations so often buy a catalog and call the governance problem solved?
- Who has the authority to change a registry definition, and what breaks if anyone can?
- Can a crawler ever discover what a field is supposed to mean?

## Specification

The specification below was extracted from
[Chapter 17: Knowledge Representation and Metadata](../../chapters/17-knowledge-representation-and-metadata/index.md).

```text
Type: graph-model
**sim-id:** registry-vs-catalog<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/context-graph/sims/registry-vs-catalog/main.html<br/>
**Source Repo:** https://github.com/dmccreary/context-graph/tree/main/docs/sims/registry-vs-catalog

Reused from the MicroSim catalog (WHAT match score 0.7565; both catalog and live URL verified working, and the underlying script confirmed generic -- a Registration Authority, Data Element, Value Domain, and Version History on the registry side, a Crawler Bot, discovered table, and quality score on the catalog side, none of it specific to the source repository's own subject area). Clicking any node on the left "Registry" panel reveals what that piece of a governed data-element definition means; clicking any node on the right "Catalog" panel reveals what a discovery tool actually found in a live system; clicking the dashed orange cross-panel link explains how a catalog field's discovered name connects back to the registry's authoritative definition. Learning objective: given a metadata registry and a metadata catalog shown side by side, the learner will distinguish what each one is responsible for and explain how the dashed link between them keeps a discovered field's meaning traceable to its governed definition (Bloom: Analyzing).
```

## References

- [Metadata registry - Wikipedia](https://en.wikipedia.org/wiki/Metadata_registry) - ISO/IEC 11179 and what a registry is responsible for.
- [Data catalog](https://en.wikipedia.org/wiki/Data_catalog) - Discovery-oriented metadata tooling.
- [Source MicroSim](https://dmccreary.github.io/context-graph/sims/registry-vs-catalog/main.html) - The original version of this simulation.

## Related Resources

- [Chapter 17: Knowledge Representation and Metadata](../../chapters/17-knowledge-representation-and-metadata/index.md)
- [All MicroSims in this book](../index.md)
