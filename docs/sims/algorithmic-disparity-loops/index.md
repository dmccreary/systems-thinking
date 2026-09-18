---
title: "Three Feedback Loops Behind Algorithmic Disparate Impact"
description: "Trace three high-stakes algorithmic systems and discover all three are the same reinforcing loop."
image: /sims/algorithmic-disparity-loops/algorithmic-disparity-loops.png
og:image: /sims/algorithmic-disparity-loops/algorithmic-disparity-loops.png
twitter:image: /sims/algorithmic-disparity-loops/algorithmic-disparity-loops.png
social:
  cards: false
status: implemented
library: vis-network
bloom_level: Analyze
bloom_verb: Trace
chapter: 23
---

# Three Feedback Loops Behind Algorithmic Disparate Impact

<iframe src="main.html" width="100%" height="627" scrolling="no"></iframe>

[Run the Three Feedback Loops Behind Algorithmic Disparate Impact MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Admissions, credit and hiring have different regulators, different data and different vendors. Drawn as loops they are structurally identical: historical data feeds a prediction, the prediction shapes a decision, and the decision becomes tomorrow's historical data. That is why fixing one model's accuracy does not help - the problem is in the loop, not the model.

**Learning objective:** Given three named high-stakes algorithmic systems, the learner will trace each one's feedback loop from historical training data back to a new decision, and explain why each loop is reinforcing rather than self-correcting without a deliberate intervention.

**Bloom's Taxonomy level:** Analyze (Trace)

## How To Use

- Click any vertex to see what that stage means in its system.
- Click a red R badge for what historical pattern that loop risks reinforcing.
- Press "Compare All Three" to color the loops separately and compare their shapes rather than their labels.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/algorithmic-disparity-loops/main.html"
        width="100%" height="627" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows that models are trained on historical data
- Can classify a loop as reinforcing or balancing

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Trace an algorithmic feedback loop from training data back to a new decision
- Explain why these loops are reinforcing rather than self-correcting
- Recognize one structure across three unrelated domains

### Suggested Activity (15 minutes)

1. Ask learners what makes an algorithm 'biased' before showing anything.
2. Click through the credit loop and stop at the point where a declined applicant leaves no record.
3. Ask what evidence the model would need to correct itself, and whether the loop can ever produce it.
4. Press "Compare All Three" and ask what the three share.
5. Ask what deliberate intervention would break each loop.

### Assessment

Give learners a fourth system (say, predictive policing) and ask them to draw its three-stage loop and name what it risks reinforcing.

### Discussion Questions

- Why can a model with no protected attributes still produce disparate outcomes?
- What would a balancing link in one of these loops look like?
- Who is responsible when no individual in the loop intended the outcome?

## Specification

The specification below was extracted from
[Chapter 23: AI Systems Dynamics](../../chapters/23-ai-systems-dynamics/index.md).

```text
Type: graph-model
**sim-id:** algorithmic-disparity-loops<br/>
**Library:** vis-network<br/>
**Status:** Specified

Learning objective: given three named high-stakes algorithmic systems, the learner will trace each one's feedback loop from historical training data back to a new decision, and explain why each loop is reinforcing rather than self-correcting without a deliberate intervention (Bloom: Analyzing).

Canvas: responsive vis-network container, minimum 560px height, full container width, recomputed on window resize.

Visual design: three separate closed-loop clusters arranged left to right, following this book's existing causal-loop-diagram convention of labeled vertices connected by arrows marked with a polarity sign, with an "R" badge vertex at the center of each loop.

- Loop 1, "College Admissions Algorithm": Historical Admissions Data (+) -> Predicted Applicant Fit (+) -> Admission Decision (+) -> back to Historical Admissions Data (this year's decisions become next year's training data).
- Loop 2, "Credit Scoring System": Historical Credit-Access Data (+) -> Predicted Creditworthiness (+) -> Credit Decision (+) -> back to Historical Credit-Access Data.
- Loop 3, "Job Recommendation Platform": Historical Hiring Data (+) -> Predicted Candidate Fit (+) -> Who Gets Recommended (+) -> back to Historical Hiring Data.

Interaction: clicking any vertex opens an infobox with a one-sentence definition of that stage, drawn from this chapter's own wording for that system. Clicking the central "R" badge of any loop opens an infobox explaining specifically what historical pattern that loop risks reinforcing. A "Compare All Three" button highlights all three loops simultaneously in different colors, making visible that all three share the identical three-stage structure (historical data -> prediction -> new decision that becomes tomorrow's historical data) despite operating in three unrelated domains.

Implementation: vis-network with a fixed three-cluster node/edge dataset (no physics simulation needed), click handlers bound to every node and to each loop's central badge vertex, populating a shared infobox panel below the canvas.
```

## References

- [Algorithmic bias - Wikipedia](https://en.wikipedia.org/wiki/Algorithmic_bias) - How feedback loops produce disparate outcomes.
- [Feedback loop (machine learning)](https://en.wikipedia.org/wiki/Feedback) - Why a model's output becoming its input is the core problem.
- [Cathy O'Neil, Weapons of Math Destruction](https://en.wikipedia.org/wiki/Weapons_of_Math_Destruction) - Book-length treatment of exactly these self-confirming loops.

## Related Resources

- [Chapter 23: AI Systems Dynamics](../../chapters/23-ai-systems-dynamics/index.md)
- [All MicroSims in this book](../index.md)
