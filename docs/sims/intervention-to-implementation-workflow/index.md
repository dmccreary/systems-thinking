---
title: From Intervention Point to Implementation
description: given a proposed system change, the learner will sequence the design steps from choosing an intervention point through closing the feedback loop, and explain what each step is meant to catch that the previous step could miss (Bloom: Analyze).
status: scaffold
library: Mermaid
bloom_level: TBD
---

# From Intervention Point to Implementation



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 25: Systems Design, Emerging Technology, and Practice](../../chapters/25-systems-design-emerging-technology-and-practice/index.md).

```text
Type: workflow
**sim-id:** intervention-to-implementation-workflow<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Learning objective: given a proposed system change, the learner will sequence the design steps from choosing an intervention point through closing the feedback loop, and explain what each step is meant to catch that the previous step could miss (Bloom: Analyze).

Visual style: Mermaid flowchart, `graph LR`, five rectangular nodes in sequence: "Choose Intervention Point" -> "Anticipate Side Effects" -> "Design Feedback Mechanism" -> "Select Implementation Strategy" -> "Human Flourishing Feedback," with a dashed arrow looping from the last node back to the first, labeled "revise if the data surprises you."

Interactivity requirement: every node MUST have a Mermaid `click` directive wired to a `showInfo(id)` callback opening an infobox with that node's one-sentence definition from this chapter, plus the hospital-scheduling example applied to that specific step (e.g., clicking "Select Implementation Strategy" shows: "Pilot the new system at one clinic before a hospital-wide rollout").

Color scheme: neutral slate-blue for the four sequential steps, the book's accent orange for the "Human Flourishing Feedback" closing node, so the diagram visually emphasizes that the loop is meant to close rather than end.

Implementation: Mermaid `graph LR` syntax embedded in the page's generated sim wrapper, sharing the `showInfo(id)` JavaScript helper already used by this book's other clickable Mermaid diagrams.
```

## Related Resources

- [Chapter 25: Systems Design, Emerging Technology, and Practice](../../chapters/25-systems-design-emerging-technology-and-practice/index.md)
