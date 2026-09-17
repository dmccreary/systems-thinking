---
title: Cause-and-Effect Chain
description: Given a chain of events, the learner will trace each cause to its effect and identify which link in the chain is the root cause versus a surface-level symptom (Bloom: Analyzing).
status: scaffold
library: Mermaid
bloom_level: Analyze
---

# Cause-and-Effect Chain



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 1: Foundations of Systems Thinking](../../chapters/01-foundations-of-systems-thinking/index.md).

```text
Type: diagram
**sim-id:** cause-effect-chain<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Purpose: Show a real multi-step cause-and-effect chain (a printer that jams every afternoon, traced back through its intermediate causes to its root cause) so learners can click each step to reveal why it leads to the next.

Bloom Taxonomy Level: Analyze
Bloom Taxonomy Verb: Trace

Learning Objective: Given a chain of events, the learner will trace each cause to its effect and identify which link in the chain is the root cause versus a surface-level symptom (Bloom: Analyzing).

Visual style: Mermaid flowchart, top-to-bottom (`graph TD`), five rectangular nodes connected by arrows in a single chain: "Printer positioned near a sunny window" → "Afternoon sun warms the room" → "Paper stored nearby absorbs humidity" → "Damp paper sheets stick together" → "Printer jams (the symptom users report)."

Interactivity requirement: every node MUST have a Mermaid `click` directive (`click NodeId call showInfo("node-id")`) wired to a JavaScript callback that opens an infobox with that node's one-sentence explanation of why it leads to the next node in the chain. Clicking the final "Printer jams" node opens an infobox that explicitly labels it "Symptom — treating this alone does not stop it from recurring," and clicking the first node opens an infobox labeled "Root cause — removing this stops the whole chain."

Key labels and annotations: color the first node (the root cause) in a distinct accent color and the last node (the symptom) in a different accent color, with a small legend below the diagram reading "Root cause" and "Symptom" in matching colors, so the two ends of the chain are visually distinguishable even before clicking anything.

Color scheme: neutral gray for the three intermediate nodes, the book's accent orange for the root-cause node, and a warning red for the symptom node.

Implementation: Mermaid `graph TD` syntax embedded in the page's generated sim wrapper, with a small companion JavaScript `showInfo(id)` function (shared with other clickable-Mermaid diagrams in this book) that populates a `<div>` info panel below the diagram on each click.
```

## Related Resources

- [Chapter 1: Foundations of Systems Thinking](../../chapters/01-foundations-of-systems-thinking/index.md)
