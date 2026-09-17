---
title: Three Feedback Loops Behind Algorithmic Disparate Impact
description: given three named high-stakes algorithmic systems, the learner will trace each one's feedback loop from historical training data back to a new decision, and explain why each loop is reinforcing rather than self-correcting without a deliberate intervention (Bloom: Analyzing).
status: scaffold
library: vis-network
bloom_level: TBD
---

# Three Feedback Loops Behind Algorithmic Disparate Impact



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
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

## Related Resources

- [Chapter 23: AI Systems Dynamics](../../chapters/23-ai-systems-dynamics/index.md)
