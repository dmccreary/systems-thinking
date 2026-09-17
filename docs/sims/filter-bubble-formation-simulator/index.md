---
title: Filter Bubble Formation Simulator
description: given a simulated content feed, the learner will apply the social feed ranking loop by repeatedly selecting content, and observe the resulting decline in topic diversity that defines a filter bubble (Bloom: Apply).
status: scaffold
library: p5.js
bloom_level: TBD
---

# Filter Bubble Formation Simulator



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
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

## Related Resources

- [Chapter 25: Systems Design, Emerging Technology, and Practice](../../chapters/25-systems-design-emerging-technology-and-practice/index.md)
