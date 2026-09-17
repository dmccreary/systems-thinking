---
title: Capability Maturity Model for Systems Thinking
description: A capability maturity model for assessing and growing an organization's systems-thinking and knowledge-graph practice, from a generic Repeatable-and-Defined maturity scale through this book's own Linear-to-Transformative five levels.
generated_by: claude skill chapter-content-generator
date: 2026-09-17 17:43:33
version: 1.10
---

# Capability Maturity Model for Systems Thinking

## Summary

This chapter presents a capability maturity model for assessing and growing an organization's systems-thinking and knowledge-graph practice, from aware and repeatable levels through integrated and transformative levels. It gives students a framework for benchmarking organizational maturity rather than treating adoption as all-or-nothing. Students completing this chapter will be able to assess an organization's maturity level and identify the next step in its progression.

## Concepts Covered

This chapter covers the following 13 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Capability Maturity Model | 13 |
| Maturity Level | 10 |
| Maturity Assessment | 1 |
| Organizational Maturity | 1 |
| Repeatable Maturity Level | 2 |
| Defined Maturity Level | 1 |
| Linear Maturity Level | 5 |
| Aware Maturity Level | 4 |
| Analytical Maturity Level | 3 |
| Integrated Maturity Level | 2 |
| Transformative Maturity Level | 1 |
| Microstrategy | 2 |
| Code Reuse | 1 |

## Prerequisites

This chapter builds on concepts from:

- [8. Systems Archetypes: Cross-Cutting Vocabulary](../08-systems-archetypes-cross-cutting-vocabulary/index.md)
- [12. Named Laws, Technology Archetypes, and Complexity Modeling](../12-named-laws-technology-archetypes-and-complexity-modeling/index.md)
- [20. Organizational Silos and Silo Busting](../20-organizational-silos-and-silo-busting/index.md)

---

## Introduction

Chapter 20 gave you the vocabulary to diagnose a silo and propose a fix. A fair question follows immediately: how do you know whether an organization is actually getting *better* at this over time, rather than just fixing one silo while three more quietly form elsewhere? Adoption of systems thinking, like adoption of any organizational capability, is not all-or-nothing -- it happens in recognizable stages, and this chapter gives you a framework for placing any organization on that path and naming its next step.

!!! mascot-welcome "Maturity Isn't All-or-Nothing"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    An organization doesn't wake up one day fully systems-thinking-literate -- it climbs a recognizable ladder, one level at a time, and you're about to learn exactly what each rung looks like. Let's zoom out and see the whole system!

## The Capability Maturity Model

A **capability maturity model** is a structured framework that describes an organization's proficiency in a given capability as a sequence of discrete, ordered stages, each one building on the practices established in the stage before it. The idea originated in software engineering, where organizations needed a way to describe how disciplined their development process was without reducing the answer to a single pass-or-fail grade. Each distinct stage in such a framework is called a **maturity level**: a defined, ordered step in a capability maturity model, characterized by a specific, describable set of practices and behaviors that distinguish it from the levels immediately above and below it.

The original software-engineering model named its levels **Repeatable maturity level** and **Defined maturity level** among others: a repeatable level means a process has been performed successfully more than once and could reasonably be expected to succeed again, while a defined level means that process has been documented, standardized, and is understood well enough to be taught to a new team member rather than existing only in one expert's head. The jump from repeatable to defined matters because "we did it right last time" is a much weaker organizational asset than "we wrote down exactly how, so anyone can do it right this time."

Consider a worked example. A company's data team can back up a production database successfully -- that's repeatable, since they've done it more than once without failure. Once they write a step-by-step runbook that any on-call engineer, not just the original expert, can follow to perform the same backup correctly, that same capability has advanced to defined. The underlying skill didn't change; what changed is whether the organization's *capability* survives any one person leaving the room.

#### Diagram: The Generic Software Capability Maturity Model

<iframe src="../../sims/cmm-template/cmm.html" width="100%" height="500px" scrolling="no"></iframe>

[Run the Generic CMM MicroSim fullscreen](../../sims/cmm-template/cmm.html){ .md-button }

<details markdown="1">
<summary>Generic Capability Maturity Model (reused MicroSim)</summary>
Type: diagram
**sim-id:** cmm-template<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** local docs/sims/cmm-template<br/>
**Source Repo:** local — docs/sims/cmm-template

Reused from this book's own MicroSim library: five ascending steps -- Initial Awareness, Repeatable, Defined, Managed, and Optimizing -- drawn as rising colored bars. Hovering over any step reveals that level's name. Learning objective: given the five generic maturity-level names, the learner will place a described organizational behavior at the correct step in the ascending sequence (Bloom: Understanding).
</details>

!!! mascot-thinking "Order Matters More Than the Names"
    ![Sage thinking with a raised wing](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Don't fixate on memorizing five specific level names -- different capability maturity models use different labels for the same underlying idea. What matters is the *ordering principle*: each level requires the disciplines of every level below it, plus one new one. You cannot skip from ad hoc straight to optimized any more than you can run before you've learned to stand.

## This Book's Five Levels: Linear Through Transformative

The generic software-engineering scale above describes *process discipline* in general. Systems thinking specifically calls for its own adapted scale, since the capability being measured here isn't "can this team repeat a deployment" but "how deeply does this organization actually reason about feedback, structure, and leverage points when it makes a real decision." This book uses a five-level adaptation built for exactly that purpose.

At the **linear maturity level**, an organization makes decisions based on direct, immediate cause-and-effect thinking, with strategic planning that focuses on obvious, near-term outcomes and little awareness of feedback loops or unintended consequences elsewhere in the system -- the "if we do X, Y will happen" thinking Chapter 1 first cautioned against. At the **aware maturity level**, leadership has begun recognizing that organizational issues are interconnected; some secondary effects are discussed before a decision is made, though the analysis behind that discussion remains limited and mostly informal.

At the **analytical maturity level**, an organization systematically maps key relationships and feedback loops before major decisions, root-cause analysis is standard practice rather than an occasional exception, and teams routinely distinguish a symptom from the deeper structure producing it -- the fixes-that-fail and shifting-the-burden discipline of Chapter 10, now a habitual practice rather than a one-off analysis. At the **integrated maturity level**, systems thinking tools -- feedback loops, the archetypes from Chapters 9 through 11, and the leverage points from Chapter 14 -- are embedded throughout strategic decision-making, and cross-functional collaboration (Chapter 20's own silo-busting tool) runs on a shared systems-thinking vocabulary as a matter of course. At the **transformative maturity level**, systems thinking has become part of the organization's identity itself: strategic decisions consistently optimize for whole-system performance even when that means accepting a worse outcome for one local unit, and the organization actively reshapes the wider industry or environment it operates in rather than merely reacting to it.

The interactive infographic below lets you explore all five of this book's levels in detail, including the specific decision-making, problem-solving, and learning behaviors that distinguish each one.

#### Diagram: Capability Maturity Model for Systems Thinking

<iframe src="../../sims/cmm-for-systems-thinking/main.html" height="500px" scrolling="no"></iframe>

[Run the Systems Thinking CMM MicroSim fullscreen](../../sims/cmm-for-systems-thinking/main.html){ .md-button }

<details markdown="1">
<summary>Capability Maturity Model for Systems Thinking (reused MicroSim)</summary>
Type: infographic
**sim-id:** cmm-for-systems-thinking<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** local docs/sims/cmm-for-systems-thinking<br/>
**Source Repo:** local — docs/sims/cmm-for-systems-thinking

Reused from this book's own MicroSim library: an interactive infographic showing this chapter's five levels -- Linear, Aware, Analytical, Integrated, Transformative -- as ascending steps, each revealing a detailed behavioral description on hover across five assessment dimensions (decision-making, problem-solving, strategic planning, learning from outcomes, time horizon). Learning objective: given a described organizational decision-making behavior, the learner will classify it at the correct one of the five systems-thinking maturity levels and justify the classification using the level's defining characteristics (Bloom: Evaluating).
</details>

The table below reinforces this five-level scale now that each level has been explained, using the same decision-making lens throughout.

| Level | Decision-making style | Awareness of feedback |
|---|---|---|
| Linear | Immediate cause-and-effect only | Little to none |
| Aware | Some secondary effects discussed | Informal, inconsistent |
| Analytical | Systematic relationship mapping | Feedback loops identified explicitly |
| Integrated | Archetypes and leverage points embedded in strategy | Routine, cross-functional |
| Transformative | Whole-system optimization over local optimization | Continuous, identity-level |

!!! mascot-warning "Every Organization Rates Itself Higher Than the Evidence Supports"
    ![Sage holding up a wing in caution](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common mistake when self-assessing against this scale is rounding up -- claiming "integrated" because one team once used a leverage-points diagram in a single meeting. Anchor your assessment in *routine, organization-wide* behavior, not a best-case anecdote from your most systems-savvy colleague. A single good meeting doesn't move an organization's maturity level; a repeated, organization-wide habit does.

## Assessing and Naming Where an Organization Stands

Placing a real organization on this five-level scale is itself a deliberate practice, not a snap judgment. A **maturity assessment** is the structured process of evaluating an organization's current practices against a capability maturity model's defined levels, typically by gathering evidence across several dimensions -- decision-making process, problem-solving approach, strategic planning method -- rather than relying on a single overall impression. The result of that assessment is a statement about **organizational maturity**: the overall level of capability and discipline an organization has actually reached in a given practice, as distinct from what any one skilled individual inside it personally knows. An organization can employ several systems-thinking experts and still have low organizational maturity, if that expertise never spreads into routine, shared practice -- exactly the knowledge path dependence problem Chapter 12 described, trapped this time inside individual people rather than individual technology platforms.

## Climbing the Levels: Small Bets and Reuse

Moving up one level rarely happens through one large, organization-wide mandate -- it happens through small, deliberately chosen moves that get repeated until they become the new normal. A **microstrategy** is a small-scale, low-risk strategic move or pilot -- one team's experiment, one department's trial -- undertaken specifically to test whether a new practice works before committing the whole organization to it. An analytical-level team piloting a single leverage-points review on one project, before proposing it organization-wide, is a microstrategy: contained enough to fail cheaply, informative enough to justify the next, larger step if it succeeds.

One specific microstrategy shows up again and again in organizations climbing toward the integrated level. **Code reuse** is the practice of applying an existing software component, model, or solution to a new problem instead of building an equivalent solution from scratch -- the same search-and-reuse discipline Chapter 12 named as the payoff of a well-built shared hub, now viewed as a maturity signal in its own right. An organization where teams routinely search for and reuse what a colleague already built, rather than quietly rebuilding it, is demonstrating exactly the cross-team, shared-vocabulary behavior that defines the integrated maturity level -- reuse is what a mature information ecosystem looks like from the inside, one small decision at a time.

## Key Takeaways

You can now assess an organization's maturity level and identify the next concrete step in its progression:

- A **capability maturity model** organizes a **maturity level** into an ordered sequence, from a generic **repeatable maturity level** and **defined maturity level** up through fully **managed** and **optimizing** practice.
- This book's own scale runs from the **linear maturity level** through **aware**, **analytical**, and **integrated maturity levels** to the **transformative maturity level**, each one adding routine, organization-wide habits the level below it lacked.
- A **maturity assessment** measures **organizational maturity** as an organization-wide pattern, not the knowledge of any one skilled individual.
- Organizations climb the scale through small, deliberate **microstrategy** pilots, with **code reuse** as one of the clearest everyday signals that a more integrated practice has actually taken hold.

!!! mascot-celebration "You Can Now Place Any Organization on the Maturity Ladder"
    ![Sage celebrating with wings raised](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Whoo-hoo! From a generic repeatable-versus-defined distinction all the way to this book's own transformative level, you can now assess where a real organization actually stands -- and name the next small, reusable step that moves it up one rung. Next up: the foundational vocabulary of artificial intelligence and machine learning that the rest of this book's AI chapters build on.
