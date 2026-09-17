---
title: Fishbone Diagram — Cart Abandonment
description: Given a list of candidate causes for a problem, the learner will categorize each cause onto the correct bone of a fishbone diagram (Bloom: Analyzing).
status: scaffold
library: p5.js
bloom_level: Analyze
---

# Fishbone Diagram — Cart Abandonment



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
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

## Related Resources

- [Chapter 2: Mental Models and Systems Analysis Tools](../../chapters/02-mental-models-and-systems-analysis-tools/index.md)
