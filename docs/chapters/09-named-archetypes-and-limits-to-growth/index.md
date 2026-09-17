---
title: Named Archetypes and Limits to Growth
description: A catalog of the ten named systems archetypes, followed by a full worked case study of Limits to Growth and a survey of the physical, economic, computational, and social limits that actually constrain real-world growth.
generated_by: claude skill chapter-content-generator
date: 2026-09-17 15:15:00
version: 1.10
---

# Named Archetypes and Limits to Growth

## Summary

This chapter introduces the ten named systems archetypes as a catalog of recurring behavior patterns, then works through Limits to Growth as the first fully developed case study. Students see how a reinforcing growth loop runs into a balancing constraint, producing slowing or reversing growth. After this chapter, students will be able to name the ten archetypes and diagram a Limits to Growth situation.

## Concepts Covered

This chapter covers the following 19 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Limits To Growth Archetype | 28 |
| Fixes That Fail Archetype | 42 |
| Shifting The Burden Archetype | 7 |
| Tragedy Of The Commons Archetype | 51 |
| Success To Successful Archetype | 58 |
| Drifting Goals Archetype | 3 |
| Escalation Archetype | 3 |
| Accidental Adversaries Archetype | 2 |
| Underinvestment Archetype | 3 |
| Seeking The Wrong Goal Archetype | 3 |
| Moore's Law | 2 |
| Scaling Laws | 13 |
| Dunbar's Number | 3 |
| Attention Economy | 3 |
| Computational Resource Limit | 2 |
| Unsustainable Growth | 2 |
| Sustainable Growth | 1 |
| Physical Limits | 2 |
| Economic Limits | 2 |

## Prerequisites

This chapter builds on concepts from:

- [3. Causal Loop Diagram Notation and Loop Identification](../03-cld-notation-and-loop-identification/index.md)
- [4. Feedback, Delay, and Loop Dynamics](../04-feedback-delay-and-loop-dynamics/index.md)
- [5. Stocks, Flows, and System Dynamics](../05-stocks-flows-and-system-dynamics/index.md)
- [6. Growth Patterns and Nonlinear Behavior](../06-growth-patterns-and-nonlinear-behavior/index.md)
- [7. Feedback Resilience and Robustness](../07-feedback-resilience-and-robustness/index.md)
- [8. Systems Archetypes: Cross-Cutting Vocabulary](../08-systems-archetypes-cross-cutting-vocabulary/index.md)

---

## Introduction

Chapter 8 gave you the vocabulary — quick fixes, externalities, compounding advantage, goal erosion — without attaching any of it to a specific named shape. This chapter attaches names. Systems thinkers have converged on ten of these shapes as the most common and most useful to recognize by name, and this chapter introduces all ten before taking the first one all the way through a full worked example.

!!! mascot-welcome "Ten Names Worth Memorizing"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    You already know the vocabulary — now you get the ten names that vocabulary assembles into. By the end of this chapter you'll be able to name a pattern the moment you spot its shape, the same way a doctor names a syndrome from a handful of symptoms. Let's zoom out and see the whole system!

## Ten Recurring Shapes

A **systems archetype**, as Chapter 8 defined it, is a generic loop structure that recurs across unrelated domains. Systems thinkers — most influentially Peter Senge, and later Daniel Kim and the systems dynamics community that expanded his original list — have named and cataloged ten of these structures as the ones that show up often enough, in businesses, ecosystems, and everyday life, to be worth learning by name rather than rediscovering from scratch each time.

The **Limits To Growth Archetype** describes a reinforcing growth loop that runs into a balancing loop tied to some finite condition, causing growth to slow, flatten, or reverse — the exact S-curve and carrying-capacity mechanics Chapter 6 already worked through mathematically. This chapter gives it the full case-study treatment below.

The **Fixes That Fail Archetype** describes a quick fix that relieves a symptom in the short term while an unintended consequence of that same fix makes the underlying problem worse over the long term — often the same fix reapplied again and again, each time buying less relief than the last. Chapter 7's highway-widening story is a fixes-that-fail archetype in disguise: the "fix" (more lanes) produced real, immediate relief, but the unintended consequence (induced demand from new commuters) undid the relief within a year or two, leaving the city with a wider highway and the same congestion it started with. Chapter 10 dedicates a full section to exactly this archetype, including the specific laws that explain why the fix backfires.

The **Shifting The Burden Archetype** describes a system that repeatedly reaches for a quick fix to relieve a symptom instead of building the fundamental capability that would resolve it permanently, with each use of the quick fix further eroding that capability — this is Chapter 8's addiction cycle, elevated to full archetype status. Chapter 10 also gives this one a full section.

The **Tragedy Of The Commons Archetype** describes multiple independent parties sharing a common pool resource, each acting in their own rational self-interest, collectively depleting or degrading the resource faster than it can replenish. A fishery in which every boat owner reasons "if I don't catch these fish, someone else will" is the textbook case: each individual choice is locally rational, and the collective result — a collapsed fishery — is worse for every single boat owner than if they had all restrained themselves together. Chapter 11 works through this archetype, and a hands-on simulation of it, in full.

The **Success To Successful Archetype** describes two parties competing for a shared, limited resource, where whichever party performs better early receives a disproportionate share of the resource going forward, widening its lead further with each round — this is Chapter 8's compounding advantage, elevated to full archetype status, with two named competitors rather than one generic leader. A streaming platform's recommendation algorithm routing more promotion toward whichever new show already has slightly more viewers is a clean modern instance. Chapter 11 gives this one a full section as well.

The **Drifting Goals Archetype** is exactly the goal-erosion loop Chapter 8 diagrammed in detail: a persistent goal-performance gap gets closed by quietly lowering the goal rather than by improving performance, so that the system's standards ratchet downward, one small, defensible-looking adjustment at a time.

The **Escalation Archetype** is exactly the two-competitor structure Chapter 8 diagrammed for misaligned incentives: each side responds to the other's last move by escalating further, since falling behind — even briefly — is treated as more costly than the escalation itself.

The **Accidental Adversaries Archetype** describes two parties who begin as collaborators with a shared interest in each other's success, but whose individually reasonable actions gradually undermine one another until they behave like rivals, without either side ever intending to become one. A manufacturer and its retail partner make a clean example: the manufacturer, wanting to boost its own sales, begins selling directly to consumers online, which erodes the retailer's business — the retailer never chose to become an adversary, and neither did the manufacturer, but each side's activities in pursuit of its own success are what damaged the other's.

#### Diagram: Accidental Adversaries Archetype

<iframe src="../../sims/cld-viewer/main.html?file=accidental-adversaries-cld.json" width="100%" height="500px" scrolling="no"></iframe>

[Run the CLD Viewer fullscreen](../../sims/cld-viewer/main.html?file=accidental-adversaries-cld.json){ .md-button }

<details markdown="1">
<summary>Accidental Adversaries Archetype (reused MicroSim)</summary>
Type: graph-model
**sim-id:** cld-viewer<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** ../../sims/cld-viewer/main.html?file=accidental-adversaries-cld.json<br/>
**Source Repo:** local — docs/sims/cld-viewer (examples/accidental-adversaries-cld.json)

Reused from this book's own CLD Viewer tool, loaded with its four-node "A's Success / A's Activities / B's Activities / B's Success" example. Hovering over either "Activities" node shows a tooltip explaining how an action taken in pursuit of one party's own success ends up undercutting the other party's success. Learning objective: given a two-party relationship that has soured over time, the learner will determine whether the cause was a deliberate rivalry or an accidental-adversaries dynamic (Bloom: Analyzing).
</details>

The **Underinvestment Archetype** describes a system that withholds investment in capacity until demand clearly justifies it, but demand never grows enough to justify the investment precisely because the capacity to serve that demand was never built — a self-fulfilling failure to invest. A regional airline that refuses to add flights to a route until ridership is already high enough to guarantee profitability may never see that ridership materialize, since infrequent, inconvenient service is exactly what keeps travelers from choosing that route in the first place.

The **Seeking The Wrong Goal Archetype** describes a system that optimizes hard for an easily measured proxy instead of the harder-to-measure outcome the proxy was only ever supposed to stand in for, eventually improving the proxy while the real goal stagnates or declines. A school system that optimizes for standardized test scores can improve those scores substantially while student curiosity and deep understanding — the actual goal the test was meant to approximate — quietly stagnate. Chapter 10's discussion of proxy metrics and Goodhart's Law explains exactly why this substitution goes wrong so reliably.

The table below reinforces all ten now that each has been introduced, and points ahead to where the two getting full case-study treatment are covered.

| Archetype | One-line pattern | Covered in depth |
|---|---|---|
| Limits to Growth | Growth loop meets a balancing constraint | This chapter, below |
| Fixes That Fail | Quick fix's side effect makes the problem worse later | Chapter 10 |
| Shifting the Burden | Quick fix crowds out the fundamental capability | Chapter 10 |
| Tragedy of the Commons | Shared resource depleted by rational self-interest | Chapter 11 |
| Success to the Successful | Early winner keeps getting more of a shared resource | Chapter 11 |
| Drifting Goals | Standard quietly lowered instead of performance raised | Chapter 8 |
| Escalation | Two rivals keep outdoing each other's last move | Chapter 8 |
| Accidental Adversaries | Partners' own success-seeking undermines each other | This chapter |
| Underinvestment | Capacity withheld until demand proves itself, which it can't | This chapter |
| Seeking the Wrong Goal | A measurable proxy replaces the real, harder-to-measure goal | Chapter 10 |

!!! mascot-tip "Match the Story to the Shape, Not the Industry"
    ![Sage pointing helpfully](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    When you're trying to identify which archetype fits a real situation, ignore the industry entirely and ask two questions instead: how many independent parties are involved, and is a fix, a resource, or a goal doing the damage? Those two answers narrow ten possibilities down to one or two almost every time.

## Limits to Growth: A Full Worked Example

Return now to the archetype named first in the catalog above, and follow it all the way from its generic structure to a fully worked, concrete case.

The Limits to Growth Archetype's generic structure has exactly four roles: a **system condition** that a reinforcing loop is driving upward, a **growing action** that is the mechanism doing the driving, a **limiting condition** that constrains how far the system condition can rise, and a **slowing action** — a balancing loop — that engages more strongly the closer the system condition gets to that limit. This is the identical structure Chapter 6 gave you mathematically as the logistic growth equation; this chapter gives it its formal archetype name and reuses the same diagram to make the connection explicit.

#### Diagram: Limits to Growth Archetype — Generic Structure

<iframe src="../../sims/cld-viewer/main.html?file=limits-to-growth-cld.json" width="100%" height="500px" scrolling="no"></iframe>

[Run the CLD Viewer fullscreen](../../sims/cld-viewer/main.html?file=limits-to-growth-cld.json){ .md-button }

<details markdown="1">
<summary>Limits to Growth Archetype — Generic Structure (reused MicroSim)</summary>
Type: graph-model
**sim-id:** cld-viewer<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** ../../sims/cld-viewer/main.html?file=limits-to-growth-cld.json<br/>
**Source Repo:** local — docs/sims/cld-viewer (examples/limits-to-growth-cld.json)

Reused a second time from this book's own CLD Viewer — first shown in Chapter 6 to explain the mathematics of the S-curve, now revisited here as the named Limits to Growth Archetype itself. Hovering over each node shows the same real-world examples as before (population size, revenue, market penetration), plus this chapter's own worked example below. Learning objective: given a growth story with a named reinforcing driver and a named limiting condition, the learner will map both onto the archetype's four generic roles (Bloom: Applying).
</details>

Now walk the generic structure through a fresh, concrete case, chosen to match this book's own subject matter. An enterprise rolls out a shared knowledge graph platform, and business units start connecting their own data to it because doing so is genuinely useful — the **system condition** is the number of connected business units, and the **growing action** is word-of-mouth adoption: each successful connection makes the next business unit more eager to join, a reinforcing loop identical in shape to the population-growth loop from Chapter 3. For the first dozen business units, growth looks close to exponential, exactly matching Chapter 6's early-S-curve behavior.

But the platform's small central data-curation team can only onboard, clean, and document a limited number of new data sources per month — that fixed onboarding capacity is the **limiting condition**. As more business units join, the curation team's backlog grows, onboarding slows, and word-of-mouth adoption itself slows down along with it, since prospective business units start hearing about the wait rather than the success stories — that backlog-driven slowdown is the **slowing action**, a balancing loop that strengthens exactly as the system condition approaches the limiting condition, the same throttling term Chapter 6's logistic equation modeled directly.

Whether this ends as a smooth S-curve or as an overshoot depends on how the organization responds once the backlog appears. If leadership catches the signal early and either expands the curation team's capacity (raising the limiting condition) or slows the pace of new onboarding requests to match it, adoption settles into a **sustainable growth** pattern — one that stays within what the limiting condition can support indefinitely. If leadership instead keeps pushing new business units to connect regardless of the backlog, quality corners get cut to keep pace, poorly curated data erodes trust in the platform, and adoption can overshoot and then collapse as business units abandon a platform that has stopped delivering — an **unsustainable growth** pattern, in Chapter 6's stricter sense of growth that exceeds what its own limiting condition can support without damaging it.

!!! mascot-thinking "The Limit Was Always There — You Just Couldn't See It Yet"
    ![Sage thinking with a raised wing](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    A limiting condition rarely announces itself in advance. The curation team's capacity limit existed on day one of the rollout — it just had no visible effect until growth caught up to it. Whenever a growth story looks unstoppable, the useful systems-thinking question isn't "will this keep growing?" but "what condition, invisible today, will this growth eventually run into?"

## What Actually Limits Growth

The enterprise knowledge-graph example above named one specific limiting condition — a team's onboarding capacity — but real limiting conditions come in several recognizably different flavors, each worth knowing by name since each suggests a different response.

**Physical limits** are constraints imposed directly by finite physical resources or the laws of physics — a factory can only be as large as the land it sits on, and a battery can only store so much energy per unit of weight given the chemistry involved. **Economic limits** are different: the resource may still be physically obtainable, but the cost of obtaining more of it rises faster than the value gained, so growth stops being worthwhile long before it becomes physically impossible — a mine could technically keep extracting ore from ever-deeper, ever-more-remote deposits, but does not, once the cost per ton extracted exceeds what the ore is worth.

Two limits are specific to computing and to human attention, both highly relevant to any technology-driven growth story. A **computational resource limit** is a ceiling imposed by available processing power, memory, storage, or energy — training a state-of-the-art AI model requires computing resources that grow far faster than the model's performance does, eventually running into real hardware and energy ceilings no algorithm can think its way around. The **attention economy** names a related but distinctly human limit: a person's attention is a fixed, non-renewable-per-day resource, so any growth strategy that depends on capturing ever more of it — a new app competing for the same 24 hours already divided among a dozen other apps — eventually runs into how much attention actually exists to be captured, no matter how good the app becomes.

A closely related social limit has its own well-known name. **Dunbar's number** is the approximate upper bound — commonly cited as around 150 — on the number of stable social relationships a human being can realistically maintain at once, a cognitive rather than physical or economic limit that shows up directly in organizational design: a company that keeps growing past a few hundred people in one office tends to need formal departments and management layers precisely because informal, everyone-knows-everyone coordination runs into this same cognitive ceiling.

**Moore's law** — the historical observation that the number of transistors on an affordable computer chip roughly doubles every two years — is a useful case study in how limits interact, because it has spent decades looking like it might be exempt from physical limits before recently slowing as transistor sizes approach the scale of individual atoms. **Scaling laws** are the broader category Moore's Law belongs to: empirically observed relationships describing how a system's performance changes as some input resource is scaled up, often following a predictable mathematical pattern for a long stretch before a physical, economic, or computational limit finally bends the curve — exactly the kind of Chapter 6 growth curve this chapter has spent its entire second half naming the limiting conditions for.

The table below reinforces these limit types now that each has been defined and illustrated.

| Type of limit | What actually constrains growth | Example |
|---|---|---|
| Physical limits | Finite physical resources or hard physical laws | Land, raw materials, battery chemistry |
| Economic limits | Rising cost per unit outpaces the value gained | Ore from an ever-deeper mine |
| Computational resource limit | Available compute, memory, storage, or energy | Training a large AI model |
| Attention economy | Finite human attention across all competing demands | An app competing for limited daily screen time |
| Dunbar's number | Cognitive limit on stable social relationships (~150) | Informal coordination breaking down as a company grows |

!!! mascot-warning "Don't Assume Every Limit Is Physical"
    ![Sage holding up a wing in caution](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A team facing slowing growth often looks for a physical or computational bottleneck to fix first, since those feel the most concrete. Before you invest in more hardware or more headcount, check whether the actual limiting condition is economic (rising cost per unit) or social (Dunbar's number) instead — those call for a completely different fix.

## Key Takeaways

You can now name every one of the ten systems archetypes, and you have worked one of them all the way through a full concrete case:

- The ten named archetypes are **Limits to Growth**, **Fixes That Fail**, **Shifting the Burden**, **Tragedy of the Commons**, **Success to the Successful**, **Drifting Goals**, **Escalation**, **Accidental Adversaries**, **Underinvestment**, and **Seeking the Wrong Goal** — each a specific named instance of Chapter 8's generic systems archetype idea.
- The **Limits to Growth Archetype** maps a reinforcing growth loop and a balancing loop onto a **system condition**, a **growing action**, a **limiting condition**, and a **slowing action** — the same structure Chapter 6 gave you mathematically as the logistic equation.
- How a system responds to an approaching limit determines whether it settles into **sustainable growth** or overshoots into **unsustainable growth**.
- Real limiting conditions come in recognizably different flavors: **physical limits**, **economic limits**, **computational resource limits**, the **attention economy**, and cognitive/social limits like **Dunbar's number** — with **Moore's law** and **scaling laws** showing how a growth curve can look exempt from limits for a long time before finally bending.

!!! mascot-celebration "You Can Now Name Every Archetype in the Catalog"
    ![Sage celebrating with wings raised](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Whoo-hoo! Ten names, one full worked case study, and a whole taxonomy of what actually stops growth in its tracks — that's this chapter handled. Chapters 10 and 11 now take four of these ten archetypes and give each one the same full treatment Limits to Growth just got.

