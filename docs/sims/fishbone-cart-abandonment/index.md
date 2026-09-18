---
title: "Fishbone Diagram — Cart Abandonment"
description: "Drag ten candidate causes of cart abandonment onto the People, Process, Technology or Cost bone they belong to."
image: /sims/fishbone-cart-abandonment/fishbone-cart-abandonment.png
og:image: /sims/fishbone-cart-abandonment/fishbone-cart-abandonment.png
twitter:image: /sims/fishbone-cart-abandonment/fishbone-cart-abandonment.png
social:
  cards: false
status: implemented
library: p5.js
bloom_level: Analyze
bloom_verb: Categorize
chapter: 2
---

# Fishbone Diagram — Cart Abandonment

<iframe src="main.html" width="100%" height="561" scrolling="no"></iframe>

[Run the Fishbone Diagram — Cart Abandonment MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

A brainstormed list of causes is just a list. A fishbone diagram is what turns it into an analysis, because sorting a cause forces you to decide what kind of thing it is. This MicroSim makes the sorting the activity: drag each cause onto a bone, and a wrong drop bounces back so you have to think again.

**Learning objective:** Given a list of candidate causes for a problem, the learner will categorize each cause onto the correct bone of a fishbone diagram.

**Bloom's Taxonomy level:** Analyze (Categorize)

## How To Use

- Drag a cause label from the pool onto the bone you think it belongs to.
- A correct drop snaps into place with a checkmark; a wrong drop bounces back with a shake.
- Click any placed label to read why it fits that category.
- Press "Reveal All" to see the finished diagram, or "Reset" to start over.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/fishbone-cart-abandonment/main.html"
        width="100%" height="561" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Has seen a problem with more than one plausible cause
- Knows that causes can be grouped by type

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Categorize causes by type rather than by how obvious they are
- Explain why some causes legitimately straddle two categories
- Read a crowded bone as a finding about where to investigate

### Suggested Activity (15 minutes)

1. Show only the problem box and have learners brainstorm causes before seeing the label pool.
2. Let learners sort the ten labels individually or in pairs.
3. After sorting, ask which bone ended up most crowded and what that suggests.
4. Discuss "Surprise shipping fee" - is the fee a Cost cause or is the surprise a Process cause?
5. Have learners build a fishbone for a problem in their own organization.

### Assessment

Give learners three new candidate causes and ask which bone each belongs on, with a one-sentence justification. The justification matters more than the placement.

### Discussion Questions

- Which bone tends to get blamed first in your organization, and is that where the causes actually are?
- What is lost when a cause could reasonably go on two bones and you have to pick one?
- Why does the diagram deliberately include a cause the business cannot control?

## Specification

The specification below was extracted from
[Chapter 2: Mental Models and Systems Analysis Tools](../../chapters/02-mental-models-and-systems-analysis-tools/index.md).

```text
Type: diagram
**sim-id:** fishbone-cart-abandonment<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Draw a fishbone (Ishikawa) diagram for the problem "Customers abandon their shopping cart before checkout," with four category bones (People, Process, Technology, Cost) each holding two or three candidate causes, so learners see how the diagram organizes brainstormed causes rather than just listing them.

Bloom Taxonomy Level: Analyze
Bloom Taxonomy Verb: Categorize

Learning Objective: Given a list of candidate causes for a problem, the learner will categorize each cause onto the correct bone of a fishbone diagram (Bloom: Analyzing).

Canvas: 750x420 default, responsive — all bone and label positions computed as fractions of `canvas.width` inside `windowResized()`.

Visual elements:
- A horizontal center "spine" arrow pointing right to a box labeled "Customers Abandon Cart" (the problem/effect).
- Four diagonal "bones" branching off the spine, two above and two below, labeled People, Process, Technology, and Cost.
- Small labeled circles along each bone representing candidate causes, for example under Technology: "Slow page load," "Payment error"; under Cost: "Surprise shipping fee," "No guest checkout option."

Controls:
- A pool of 8-10 draggable cause labels below the canvas that the learner drags onto the bone they believe is the correct category, using p5.js `mouseDragged`/`mouseReleased` events with simple rectangle hit-testing against each bone's drop zone.
- On drop, the label snaps into place if correct (a small green checkmark appears) or bounces back with a gentle shake animation if placed on the wrong bone, prompting the learner to try again.
- A "Reveal All" button, built with `createButton()`, that snaps every remaining label into its correct position for learners who want to see the finished diagram.

Interactivity requirement: every placed cause label is clickable after being placed, opening an infobox with one sentence explaining why that cause fits its category; the drag-and-categorize interaction itself is the primary interactivity, satisfying the minimum bar.

Color scheme: each of the four bones and its category label share a distinct color (matching the book's palette), and cause labels take on their bone's color once correctly placed, staying neutral gray while still in the unsorted pool.

Implementation: p5.js sketch with an array of bone-rectangle hit zones, an array of draggable label objects tracking correct-category assignment, and simple animation via `lerp()` for the snap-into-place and shake-back behaviors.
```

## References

- [Ishikawa diagram - Wikipedia](https://en.wikipedia.org/wiki/Ishikawa_diagram) - The fishbone diagram and its standard cause categories.
- [Kaoru Ishikawa](https://en.wikipedia.org/wiki/Kaoru_Ishikawa) - The quality engineer who developed the method.
- [Shopping cart abandonment](https://en.wikipedia.org/wiki/Abandonment_rate) - Background on the e-commerce problem used as the example.

## Related Resources

- [Chapter 2: Mental Models and Systems Analysis Tools](../../chapters/02-mental-models-and-systems-analysis-tools/index.md)
- [All MicroSims in this book](../index.md)
