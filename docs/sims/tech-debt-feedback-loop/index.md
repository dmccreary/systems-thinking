---
title: "The Technical Debt Feedback Loop"
description: "Explore the technical debt doom loop and three leverage-point interventions that break it."
image: /sims/tech-debt-feedback-loop/tech-debt-feedback-loop.png
og:image: /sims/tech-debt-feedback-loop/tech-debt-feedback-loop.png
twitter:image: /sims/tech-debt-feedback-loop/tech-debt-feedback-loop.png
social:
  cards: false
status: implemented
library: vis-network
bloom_level: Analyze
bloom_verb: Identify
chapter: 20
---

# The Technical Debt Feedback Loop

<iframe src="main.html" width="100%" height="632" scrolling="no"></iframe>

[Run the The Technical Debt Feedback Loop MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Reused from this author's MicroSim catalog. Shortcuts accumulate, the codebase gets harder to change, and harder-to-change code invites more shortcuts. This interactive causal loop diagram adds three clickable leverage-point interventions so the question shifts from 'is this bad?' to 'where exactly would you cut?'

**Learning objective:** Given the technical-debt reinforcing loop, the learner will identify which leverage-point intervention would most effectively break the cycle for a system already showing signs of being a legacy system.

**Bloom's Taxonomy level:** Analyze (Identify)

## How To Use

- Read the loop and follow the coral arrows around the reinforcing cycle.
- Press "Add Leverage Points" to reveal the three interventions.
- Click each node and each intervention for its explanation in the side panel.
- Note the color convention: coral arrows reinforce, green arrows balance.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/tech-debt-feedback-loop/main.html"
        width="100%" height="632" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows what technical debt means
- Can read a causal loop diagram

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Trace the technical debt reinforcing loop
- Compare three candidate interventions by where they cut the loop
- Justify an intervention choice for a system already showing legacy symptoms

### Suggested Activity (12 minutes)

1. Read the loop without the interventions and ask learners what they would do.
2. Press "Add Leverage Points" and click each intervention.
3. Ask which intervention is cheapest and which is most effective - they are not the same.
4. Ask what changes about the answer when the system is already legacy rather than merely aging.
5. Have learners identify the equivalent loop in a codebase they know.

### Assessment

Give learners a described legacy system and ask which of the three interventions they would fund first, with a justification tied to where it cuts the loop.

### Discussion Questions

- Why does 'we'll clean it up next sprint' almost never happen?
- Is technical debt always bad, or is some of it a reasonable trade?
- What is the organizational equivalent of technical debt?

## Specification

The specification below was extracted from
[Chapter 20: Organizational Silos and Silo Busting](../../chapters/20-organizational-silos-and-silo-busting/index.md).

```text
Type: graph-model
**sim-id:** tech-debt-feedback-loop<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/information-systems/sims/tech-debt-feedback-loop/main.html<br/>
**Source Repo:** https://github.com/dmccreary/information-systems/tree/main/docs/sims/tech-debt-feedback-loop

Reused from the MicroSim catalog (WHAT match score 0.905). This interactive causal-loop diagram shows the technical-debt "doom loop" -- shortcuts accumulate, the legacy codebase grows harder to change, harder-to-change code invites more shortcuts -- along with three clickable leverage-point interventions that break the loop. Learning objective: given the technical-debt reinforcing loop, the learner will identify which leverage-point intervention would most effectively break the cycle for a system already showing signs of being a legacy system (Bloom: Analyzing).
```

## References

- [Technical debt - Wikipedia](https://en.wikipedia.org/wiki/Technical_debt) - Ward Cunningham's metaphor and its limits.
- [Legacy system](https://en.wikipedia.org/wiki/Legacy_system) - What a system becomes at the end of this loop.
- [Source MicroSim](https://dmccreary.github.io/information-systems/sims/tech-debt-feedback-loop/main.html) - The original version of this simulation.

## Related Resources

- [Chapter 20: Organizational Silos and Silo Busting](../../chapters/20-organizational-silos-and-silo-busting/index.md)
- [All MicroSims in this book](../index.md)
