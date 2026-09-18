---
title: "How Embodied Knowledge Moves, Fades, and Leaks"
description: "Classify four ways knowledge moves, fades or leaks, and separate intentional transfer from unintentional spillover."
image: /sims/knowledge-behavior-map/knowledge-behavior-map.png
og:image: /sims/knowledge-behavior-map/knowledge-behavior-map.png
twitter:image: /sims/knowledge-behavior-map/knowledge-behavior-map.png
social:
  cards: false
status: implemented
library: Mermaid
bloom_level: Analyze
bloom_verb: Classify
chapter: 24
---

# How Embodied Knowledge Moves, Fades, and Leaks

<iframe src="main.html" width="100%" height="482" scrolling="no"></iframe>

[Run the How Embodied Knowledge Moves, Fades, and Leaks MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Embodied knowledge lives in people and routines, not in manuals, and it behaves in four distinct ways. Two of them are things an organization chooses; two of them just happen. The color coding previews the distinction the learner is meant to draw, and the central node names the knowledge all four are acting on.

**Learning objective:** Given a central embodied-knowledge example, the learner will classify four ways that knowledge can move, fade, or transfer beyond its original holder, and distinguish cross-generational transfer (intentional) from knowledge spillover (unintentional).

**Bloom's Taxonomy level:** Analyze (Classify)

## How To Use

- Click the orange central node first, for what embodied knowledge actually is.
- Click each of the four outward nodes for its definition plus a concrete example.
- Note the color coding: blue for intentional and controlled, amber for unintentional and lossy.
- Compare Cross-Generational Knowledge against Knowledge Spillover - the distinction is who decided.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/knowledge-behavior-map/main.html"
        width="100%" height="482" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows the difference between explicit and tacit knowledge
- Has seen an organization lose capability when someone left

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Classify four knowledge behaviors correctly
- Distinguish intentional transfer from unintentional spillover
- Explain why embodied knowledge does not transfer through documentation alone

### Suggested Activity (12 minutes)

1. Click the central node and ask learners to apply the test: what would not survive if the whole team left?
2. Click each of the four outward nodes in turn.
3. Ask learners to place a real example of their own on each node.
4. Ask what distinguishes spillover from cross-generational transfer, given that both move knowledge.
5. Ask which of the four their organization actively manages.

### Assessment

Give learners four short scenarios and ask which node each belongs to, with the intentional-versus-unintentional judgment stated explicitly.

### Discussion Questions

- Why can a competitor copy a documented process and still fail to match the results?
- Is knowledge spillover a cost to the firm or a benefit to the economy?
- What would it cost to prevent decay in a capability you rarely use?

## Specification

The specification below was extracted from
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

## References

- [Tacit knowledge - Wikipedia](https://en.wikipedia.org/wiki/Tacit_knowledge) - Polanyi's idea that we know more than we can tell.
- [Knowledge spillover](https://en.wikipedia.org/wiki/Knowledge_spillover) - The unintentional diffusion of knowledge between firms.
- [Economic complexity index](https://en.wikipedia.org/wiki/Economic_Complexity_Index) - Why embodied knowledge sticks to places.

## Related Resources

- [Chapter 24: Knowledge Systems and Economic Complexity](../../chapters/24-knowledge-systems-and-economic-complexity/index.md)
- [All MicroSims in this book](../index.md)
