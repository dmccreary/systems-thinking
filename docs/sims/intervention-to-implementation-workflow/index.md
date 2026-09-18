---
title: "From Intervention Point to Implementation"
description: "Sequence five design steps from choosing an intervention point to closing the feedback loop, with a hospital-scheduling example at each step."
image: /sims/intervention-to-implementation-workflow/intervention-to-implementation-workflow.png
og:image: /sims/intervention-to-implementation-workflow/intervention-to-implementation-workflow.png
twitter:image: /sims/intervention-to-implementation-workflow/intervention-to-implementation-workflow.png
social:
  cards: false
status: implemented
library: Mermaid
bloom_level: Analyze
bloom_verb: Sequence
chapter: 25
---

# From Intervention Point to Implementation

<iframe src="main.html" width="100%" height="442" scrolling="no"></iframe>

[Run the From Intervention Point to Implementation MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Each step in this workflow exists to catch something the step before it cannot. Anticipating side effects catches what choosing an intervention point misses; designing the feedback mechanism catches what anticipation misses; and the closing step catches an intervention that improved every metric and still made things worse. The same hospital-scheduling example runs through all five.

**Learning objective:** Given a proposed system change, the learner will sequence the design steps from choosing an intervention point through closing the feedback loop, and explain what each step is meant to catch that the previous step could miss.

**Bloom's Taxonomy level:** Analyze (Sequence)

## How To Use

- Click each step in order for its definition and its hospital-scheduling example.
- Notice the dashed arrow from the last step back to the first - the workflow closes rather than ends.
- For each step, ask what it catches that the previous step could not.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/intervention-to-implementation-workflow/main.html"
        width="100%" height="442" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows what a leverage point is
- Has proposed or observed an organizational change

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Sequence the five design steps correctly
- Explain what each step catches that the previous one misses
- Describe why the workflow loops rather than terminates

### Suggested Activity (12 minutes)

1. Present a proposed change and ask learners what they would do first.
2. Click through the five steps in order.
3. At Step 2, ask learners to brainstorm side effects for the hospital example before reading the one given.
4. At Step 5, ask what it means that wait times fell 30 percent and patients over 70 wait longer.
5. Apply all five steps to a change learners are actually considering.

### Assessment

Give learners a proposed change and ask them to write one sentence per step, ending with what the flourishing check would look for.

### Discussion Questions

- Why is the last step separate from the feedback mechanism in step 3?
- What would it take for an organization to actually revise after the data surprised them?
- Which of the five steps gets skipped most often, and what does skipping it cost?

## Specification

The specification below was extracted from
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

## References

- [Leverage points - Wikipedia](https://en.wikipedia.org/wiki/Twelve_leverage_points) - Meadows' ranking, used in step 1.
- [Unintended consequences](https://en.wikipedia.org/wiki/Unintended_consequences) - What step 2 is designed to catch.
- [Pilot experiment](https://en.wikipedia.org/wiki/Pilot_experiment) - The implementation strategy recommended in step 4.

## Related Resources

- [Chapter 25: Systems Design, Emerging Technology, and Practice](../../chapters/25-systems-design-emerging-technology-and-practice/index.md)
- [All MicroSims in this book](../index.md)
