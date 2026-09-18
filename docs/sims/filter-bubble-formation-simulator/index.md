---
title: "Filter Bubble Formation Simulator"
description: "Click the content you would actually open and watch topic diversity collapse over a handful of rounds."
image: /sims/filter-bubble-formation-simulator/filter-bubble-formation-simulator.png
og:image: /sims/filter-bubble-formation-simulator/filter-bubble-formation-simulator.png
twitter:image: /sims/filter-bubble-formation-simulator/filter-bubble-formation-simulator.png
social:
  cards: false
status: implemented
library: p5.js
bloom_level: Apply
bloom_verb: Apply
chapter: 25
---

# Filter Bubble Formation Simulator

<iframe src="main.html" width="100%" height="474" scrolling="no"></iframe>

[Run the Filter Bubble Formation Simulator MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

The ranking rule in this simulation contains no bias of any kind: it shows more of what you engaged with, which is exactly what a reasonable engineer would build. Run it for five rounds while clicking honestly and watch categories disappear from your feed that you never chose to stop seeing. The narrowing comes from the loop, not the rule.

**Learning objective:** Given a simulated content feed, the learner will apply the social feed ranking loop by repeatedly selecting content, and observe the resulting decline in topic diversity that defines a filter bubble.

**Bloom's Taxonomy level:** Apply (Apply)

## How To Use

- Click the cards you would actually open - answer honestly, the effect depends on it.
- Press "Next Round" to get a fresh row of eight cards, sampled from the updated weights.
- Watch the bar chart below narrow round by round, and the diversity percentage fall.
- Press "Reset Feed" to return to a uniform mix across all five categories.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/filter-bubble-formation-simulator/main.html"
        width="100%" height="474" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Has used a social media or recommendation feed
- Knows what a reinforcing loop is

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Apply a feed ranking loop by making repeated selections
- Observe and describe the resulting loss of topic diversity
- Explain how a filter bubble forms without deliberate bias in the ranking rule

### Suggested Activity (15 minutes)

1. Have each learner run five rounds independently, clicking honestly.
2. Compare final diversity percentages across the group.
3. Ask who deliberately chose to stop seeing a category. Nobody did.
4. Ask what a single rule change would slow the narrowing.
5. Discuss the difference between what you clicked and what you would have wanted to see.

### Assessment

Ask learners to explain, in three sentences, how an unbiased ranking rule produced a narrowed feed. The explanation must reference the loop rather than the rule.

### Discussion Questions

- Whose responsibility is the filter bubble - the engineer's, the user's, or nobody's?
- Would you want a feed that deliberately showed you things you would not click?
- What is the equivalent loop in how you choose what to read professionally?

## Specification

The specification below was extracted from
[Chapter 25: Systems Design, Emerging Technology, and Practice](../../chapters/25-systems-design-emerging-technology-and-practice/index.md).

```text
Type: microsim
**sim-id:** filter-bubble-formation-simulator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: given a simulated content feed, the learner will apply the social feed ranking loop by repeatedly selecting content, and observe the resulting decline in topic diversity that defines a filter bubble (Bloom: Apply).

Canvas: 700x450 default, responsive -- recompute layout from container width inside `updateCanvasSize()`, called first in `setup()` per this book's MicroSim conventions; canvas parented to `document.querySelector('main')`.

Visual elements: a row of 8 content cards per "round," each labeled with one of five topic categories (Sports, Politics, Cooking, Technology, Travel) and a distinct color per category; a horizontal bar chart below the cards showing the current topic-diversity distribution of what the feed is now showing, recalculated after every round.

Controls: built with p5.js's own controls per this book's control conventions -- clicking a content card counts as "engaging" with it; a `createButton()` labeled "Next Round" regenerates the next row of 8 cards, biased increasingly toward whichever categories were clicked most in previous rounds (implementing the reinforcing ranking loop); a `createButton()` labeled "Reset Feed" returns the distribution to a uniform mix across all five categories.

Behavior: after each round, the algorithm recomputes each category's selection probability as a weighted function of its cumulative click count, so categories that were never clicked become increasingly rare and eventually disappear from the feed entirely after several rounds, visibly narrowing the bar chart -- concretely demonstrating a filter bubble forming from ordinary engagement-following behavior, with no deliberate bias in the ranking rule itself.

Implementation: p5.js, an array of category weights updated each round using a simple reinforcement formula (`weight += clicks * learningRate`), card colors and the diversity bar chart redrawn every round, `windowResized()` recalculating card layout from current container width.
```

## References

- [Filter bubble - Wikipedia](https://en.wikipedia.org/wiki/Filter_bubble) - Eli Pariser's term and the mechanism behind it.
- [Recommender system](https://en.wikipedia.org/wiki/Recommender_system) - How engagement-based ranking actually works.
- [Echo chamber](https://en.wikipedia.org/wiki/Echo_chamber_(media)) - The related social phenomenon.

## Related Resources

- [Chapter 25: Systems Design, Emerging Technology, and Practice](../../chapters/25-systems-design-emerging-technology-and-practice/index.md)
- [All MicroSims in this book](../index.md)
