---
title: "The Generic Software Capability Maturity Model"
description: "Hover the five ascending maturity levels to place an organizational behavior at the right step."
image: /sims/cmm-template/cmm-template.png
og:image: /sims/cmm-template/cmm-template.png
twitter:image: /sims/cmm-template/cmm-template.png
social:
  cards: false
status: implemented
library: p5.js
bloom_level: Understand
bloom_verb: Place
chapter: 21
---

# The Generic Software Capability Maturity Model

<iframe src="main.html" width="100%" height="552" scrolling="no"></iframe>

[Run the The Generic Software Capability Maturity Model MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Reused from this book's own MicroSim library. Five ascending steps - Initial Awareness, Repeatable, Defined, Managed, and Optimizing - drawn as rising colored bars. The ordering is the content: each level presupposes the one below it, which is why organizations cannot skip steps however much they would like to.

**Learning objective:** Given the five generic maturity-level names, the learner will place a described organizational behavior at the correct step in the ascending sequence.

**Bloom's Taxonomy level:** Understand (Place)

## How To Use

- Hover over any step to reveal that maturity level's name.
- Work from the bottom up - each level assumes the one beneath it is already in place.
- Try to place a behavior from your own organization before reading the level names.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/cmm-template/main.html"
        width="100%" height="552" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Has worked in or observed an organization with repeated processes

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Name the five generic maturity levels in order
- Place a described behavior at the correct level
- Explain why maturity levels cannot be skipped

### Suggested Activity (8 minutes)

1. Show the steps with labels hidden and ask learners to guess what distinguishes each.
2. Hover each step in turn from the bottom up.
3. Give learners three described behaviors and have them place each.
4. Ask which level their own team is at, and what the next level would require.
5. Ask why an organization cannot jump from Initial to Managed.

### Assessment

Describe an organizational behavior and ask learners to name its level and justify it against the level below.

### Discussion Questions

- What does it take to move from Repeatable to Defined?
- Is Optimizing an end state or a permanent activity?
- Can one part of an organization be at a different level than another?

## Specification

The specification below was extracted from
[Chapter 21: Capability Maturity Model for Systems Thinking](../../chapters/21-capability-maturity-model-for-systems-thinking/index.md).

```text
Type: diagram
**sim-id:** cmm-template<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** local docs/sims/cmm-template<br/>
**Source Repo:** local — docs/sims/cmm-template

Reused from this book's own MicroSim library: five ascending steps -- Initial Awareness, Repeatable, Defined, Managed, and Optimizing -- drawn as rising colored bars. Hovering over any step reveals that level's name. Learning objective: given the five generic maturity-level names, the learner will place a described organizational behavior at the correct step in the ascending sequence (Bloom: Understanding).
```

## References

- [Capability Maturity Model - Wikipedia](https://en.wikipedia.org/wiki/Capability_Maturity_Model) - The original five-level model from the SEI.
- [CMMI](https://en.wikipedia.org/wiki/Capability_Maturity_Model_Integration) - The successor framework and its process areas.
- [Watts Humphrey](https://en.wikipedia.org/wiki/Watts_Humphrey) - The engineer who developed the original maturity framework.

## Related Resources

- [Chapter 21: Capability Maturity Model for Systems Thinking](../../chapters/21-capability-maturity-model-for-systems-thinking/index.md)
- [All MicroSims in this book](../index.md)
