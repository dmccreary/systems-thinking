---
title: "Three Reinforcing Loops Behind Knowledge Graph Adoption"
description: "Trace three reinforcing loops behind knowledge graph adoption and see that all three share one structure."
image: /sims/ekg-adoption-loops/ekg-adoption-loops.png
og:image: /sims/ekg-adoption-loops/ekg-adoption-loops.png
twitter:image: /sims/ekg-adoption-loops/ekg-adoption-loops.png
social:
  cards: false
status: implemented
library: vis-network
bloom_level: Analyze
bloom_verb: Trace
chapter: 19
---

# Three Reinforcing Loops Behind Knowledge Graph Adoption

<iframe src="main.html" width="100%" height="627" scrolling="no"></iframe>

[Run the Three Reinforcing Loops Behind Knowledge Graph Adoption MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Sponsorship, careers and integration cost sound like three unrelated organizational problems. Drawn as loops, they turn out to be the same three-stage reinforcing structure repeated three times - which is also why one stalled stage can quietly stall an entire adoption effort.

**Learning objective:** Given three named organizational feedback loops behind knowledge graph adoption, the learner will trace each loop's causal chain back to its starting point and explain why each is reinforcing rather than balancing.

**Bloom's Taxonomy level:** Analyze (Trace)

## How To Use

- Click any vertex to see what that stage means in its loop.
- Click a red R badge at a loop's center to see why that loop reinforces itself.
- Press "Highlight All Loops" to color the three loops separately and compare their shapes.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/ekg-adoption-loops/main.html"
        width="100%" height="627" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Can classify a loop as reinforcing or balancing
- Knows what an enterprise knowledge graph is meant to do

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Trace a three-stage reinforcing loop back to its start
- Explain why each loop lacks a balancing link
- Recognize one structure appearing across three unrelated contexts

### Suggested Activity (15 minutes)

1. Ask learners which of the three loops they think matters most, before exploring.
2. Click through the CIO loop stage by stage.
3. Press "Highlight All Loops" and ask what the three have in common structurally.
4. Ask what happens to each loop if it runs backward - a failed pilot, a stale skill profile, a system that refuses the standard.
5. Ask which stage in which loop they would invest in first.

### Assessment

Ask learners to draw a fourth reinforcing loop from their own organization using the same three-stage template.

### Discussion Questions

- Reinforcing loops run just as fast in reverse. Which of these three is most fragile?
- Why does the career-path loop pay its own maintenance cost?
- What would a balancing loop on knowledge graph adoption look like?

## Specification

The specification below was extracted from
[Chapter 19: Enterprise Knowledge Graphs](../../chapters/19-enterprise-knowledge-graphs/index.md).

```text
Type: graph-model
**sim-id:** ekg-adoption-loops<br/>
**Library:** vis-network<br/>
**Status:** Specified

Learning objective: given three named organizational feedback loops behind knowledge graph adoption, the learner will trace each loop's causal chain back to its starting point and explain why each is reinforcing rather than balancing (Bloom: Analyzing).

Canvas: responsive vis-network container, minimum 560px height, full container width, recomputed on window resize.

Visual design: three separate closed-loop clusters arranged left to right, each following this book's existing causal-loop-diagram convention of labeled vertices connected by arrows marked with a polarity sign (+ for reinforcing influence), with an "R" badge vertex at the center of each loop.

- Loop 1, "CIO Influence Diagram": CIO Sponsorship (+) -> Pilot Funding and Visibility (+) -> Visible Early Win (+) -> back to CIO Sponsorship.
- Loop 2, "Employee Career Path Loop": Employees Using the Graph for Career Paths (+) -> Employees Keep Skill Data Current (+) -> Graph Accuracy (+) -> back to Employees Using the Graph for Career Paths.
- Loop 3, "Data Standardization Cycle": Systems Adopting the Shared Standard (+) -> Lower Marginal Integration Cost (+) -> Attractiveness to the Next System (+) -> back to Systems Adopting the Shared Standard.

Interaction: clicking any vertex opens an infobox with a one-sentence definition of that stage in its loop. Clicking the central "R" badge of any loop opens an infobox summarizing why the loop reinforces itself, using this chapter's own wording for that loop. A "Highlight All Loops" button colors each of the three loops a different color simultaneously, making it easy to see that all three loops are structurally identical (each is a plain reinforcing loop of three linked stages) despite describing completely different organizational dynamics.

Implementation: vis-network with a fixed three-cluster node/edge dataset (no physics simulation needed), click handlers bound to every node and to each loop's central badge vertex, populating a shared infobox panel below the canvas.
```

## References

- [Knowledge graph - Wikipedia](https://en.wikipedia.org/wiki/Knowledge_graph) - What enterprise knowledge graphs are and do.
- [Network effect](https://en.wikipedia.org/wiki/Network_effect) - The mechanism behind the data standardization loop.
- [Positive feedback](https://en.wikipedia.org/wiki/Positive_feedback) - Why each of these loops amplifies rather than settles.

## Related Resources

- [Chapter 19: Enterprise Knowledge Graphs](../../chapters/19-enterprise-knowledge-graphs/index.md)
- [All MicroSims in this book](../index.md)
