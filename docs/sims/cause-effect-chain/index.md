---
title: "Cause-and-Effect Chain"
description: "Trace a printer that jams every afternoon back through four intermediate causes to its root cause."
image: /sims/cause-effect-chain/cause-effect-chain.png
og:image: /sims/cause-effect-chain/cause-effect-chain.png
twitter:image: /sims/cause-effect-chain/cause-effect-chain.png
social:
  cards: false
status: implemented
library: Mermaid
bloom_level: Analyze
bloom_verb: Trace
chapter: 1
---

# Cause-and-Effect Chain

<iframe src="main.html" width="100%" height="522" scrolling="no"></iframe>

[Run the Cause-and-Effect Chain MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

The symptom is what gets reported; the root cause is what actually has to change. This chain runs from a printer positioned near a sunny window all the way to the jams users complain about. Each click explains why that link leads to the next, so the reasoning is visible rather than asserted.

**Learning objective:** Given a chain of events, the learner will trace each cause to its effect and identify which link in the chain is the root cause versus a surface-level symptom.

**Bloom's Taxonomy level:** Analyze (Trace)

## How To Use

- Click any box to see why it leads to the next one in the chain.
- Start at the bottom (the symptom) and work upward, the way a real investigation goes.
- Note the color coding: orange marks the root cause, red marks the symptom, gray marks the links in between.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/cause-effect-chain/main.html"
        width="100%" height="522" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Can distinguish a cause from an effect
- Has encountered a recurring problem that was "fixed" more than once

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Trace a multi-step causal chain from symptom back to root cause
- Distinguish a root cause from an intermediate cause and from a symptom
- Explain why treating a symptom lets the problem recur

### Suggested Activity (10 minutes)

1. Present only the last box - "Printer jams" - and ask learners what they would do about it.
2. Reveal the chain one box at a time, top to bottom, having learners predict the next link.
3. Ask which link a technician would most likely see, and why that link is still not the root cause.
4. Ask what happens if the company buys a new printer and puts it in the same place.
5. Have learners build a five-link chain for a recurring problem in their own experience.

### Assessment

Give learners a different symptom and ask them to propose a three-link chain ending in a root cause. Check that the proposed root cause is something that could actually be changed.

### Discussion Questions

- Why do organizations keep fixing symptoms even when the root cause is known?
- How many "whys" is enough before you have reached a root cause?
- Can a chain have more than one root cause? What would that look like?

## Specification

The specification below was extracted from
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

## References

- [Root cause analysis - Wikipedia](https://en.wikipedia.org/wiki/Root_cause_analysis) - Formal methods for tracing symptoms back to root causes.
- [Five whys](https://en.wikipedia.org/wiki/Five_whys) - The iterative questioning technique this chain illustrates.
- [Causal chain](https://en.wikipedia.org/wiki/Causality) - Background on causal reasoning and its pitfalls.

## Related Resources

- [Chapter 1: Foundations of Systems Thinking](../../chapters/01-foundations-of-systems-thinking/index.md)
- [All MicroSims in this book](../index.md)
