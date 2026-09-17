---
title: Fixes That Fail and Shifting the Burden
description: Two archetypes where a well-intentioned fix backfires or creates dependency, illustrated with Campbell's Law, Goodhart's Law, the streetlight effect, and modern AI-dependence examples.
generated_by: claude skill chapter-content-generator
date: 2026-09-17 15:18:00
version: 1.10
---

# Fixes That Fail and Shifting the Burden

## Summary

This chapter works through two archetypes where a well-intentioned fix backfires or creates dependency: Fixes That Fail, illustrated with Campbell's Law, Goodhart's Law, and the streetlight effect, and Shifting the Burden. Students examine how proxy metrics distort behavior and how symptomatic relief can crowd out a fundamental solution. Students completing this chapter will be able to identify when a quick fix is creating a hidden dependency.

## Concepts Covered

This chapter covers the following 12 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Campbell's Law | 18 |
| Goodhart's Law | 9 |
| Induced Demand | 2 |
| Brain Drain | 2 |
| Proxy Metric | 8 |
| Measurement Trap | 6 |
| Streetlight Effect | 2 |
| Authentic Assessment | 3 |
| Portfolio Assessment | 2 |
| Human-AI Collaboration | 2 |
| AI Dependence | 2 |
| Symptom Relief | 2 |

## Prerequisites

This chapter builds on concepts from:

- [6. Growth Patterns and Nonlinear Behavior](../06-growth-patterns-and-nonlinear-behavior/index.md)
- [7. Feedback Resilience and Robustness](../07-feedback-resilience-and-robustness/index.md)
- [8. Systems Archetypes: Cross-Cutting Vocabulary](../08-systems-archetypes-cross-cutting-vocabulary/index.md)
- [9. Named Archetypes and Limits to Growth](../09-named-archetypes-and-limits-to-growth/index.md)

---

## Introduction

Chapter 9 named ten archetypes but only worked one — Limits to Growth — all the way through. This chapter gives the same full treatment to two more: Fixes That Fail, where a quick fix's own side effect quietly makes the original problem worse, and Shifting the Burden, where a quick fix crowds out the fundamental capability that would have solved the problem for good. Both archetypes appeared in outline back in Chapters 8 and 9; this chapter supplies the specific, named mechanisms — laws, traps, and modern examples — that explain exactly why each one keeps happening.

!!! mascot-welcome "Two Fixes, Two Different Ways to Backfire"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Get ready to meet two of the sneakiest archetypes in the whole catalog — the kind that can make a genuinely smart person look foolish in hindsight, purely because the backfire takes so long to show up. Let's zoom out and see the whole system!

## Fixes That Fail: When the Cure Feeds the Disease

The **Fixes That Fail Archetype**, introduced by name in Chapter 9, has a simple three-part shape: a problem prompts a quick fix, the quick fix produces genuine short-term relief, and that same quick fix generates an unintended consequence that makes the original problem return — often worse than before, and often demanding the identical fix again. The diagram below shows this generic shape stripped down to its three essential roles.

#### Diagram: Fixes That Fail Archetype — Generic Structure

<iframe src="../../sims/cld-viewer/main.html?file=fixes-that-fail-cld.json" width="100%" height="500px" scrolling="no"></iframe>

[Run the CLD Viewer fullscreen](../../sims/cld-viewer/main.html?file=fixes-that-fail-cld.json){ .md-button }

<details markdown="1">
<summary>Fixes That Fail Archetype — Generic Structure (reused MicroSim)</summary>
Type: graph-model
**sim-id:** cld-viewer<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** ../../sims/cld-viewer/main.html?file=fixes-that-fail-cld.json<br/>
**Source Repo:** local — docs/sims/cld-viewer (examples/fixes-that-fail-cld.json)

Reused from this book's own CLD Viewer tool, loaded with its three-node "Problem / Quick Fix / Unintended Consequences" example. Hovering over "Quick Fix" shows a tooltip listing this chapter's three worked examples (highway widening, standardized testing, cutting a training budget) mapped onto the same three roles. Learning objective: given a short narrative describing an intervention and its later reversal, the learner will map the story onto the Problem / Quick Fix / Unintended Consequences structure (Bloom: Applying).
</details>

Chapter 7's highway-widening story already walked through one instance of this shape in full: congestion (problem) prompts adding lanes (quick fix), which relieves congestion immediately, but the easier driving conditions attract new commuters who previously avoided the route. That specific mechanism has its own name. **Induced demand** is the increase in usage of a resource that occurs specifically because expanding its capacity made using it more attractive, so that the expanded capacity fills back up rather than providing lasting relief — the unintended consequence in the highway story, and in any situation where adding capacity changes people's behavior enough to consume the new capacity.

A second instance of the same shape shows up wherever performance is judged by a **proxy metric** — a measurable stand-in used in place of a true goal that is harder or more expensive to measure directly, like using a standardized test score as a proxy for the harder-to-measure goal of genuine student learning. **Campbell's law**, named for the social scientist Donald Campbell, states that the more a quantitative measure is used to make important decisions, the more it becomes subject to distortion and the more it corrupts the very process it was meant to track. A school system that starts basing funding and staffing decisions heavily on standardized test scores (the quick fix: an easy, comparable, quantitative measure) soon sees teachers narrowing instruction toward tested material and away from the broader curriculum the test was only ever supposed to approximate — the unintended consequence Campbell's law predicts by name.

**Goodhart's law** captures the same failure in a shorter, closely related form: once a measure becomes a target that people are evaluated against, it stops being a reliable measure of the thing it was tracking, because people begin optimizing the measure itself rather than the underlying goal. The **measurement trap** is the general name for the situation both laws describe: the moment a system starts managing to the proxy metric instead of the real goal the metric was meant to approximate, since the two inevitably start to diverge under sustained optimization pressure.

A third instance of Fixes That Fail is worth naming because it applies even when no one is deliberately gaming a metric. The **streetlight effect** is the tendency to look for a solution where looking is easiest, rather than where the actual answer is most likely to be found — named for the old joke about a person searching for lost keys under a streetlight, not because that's where the keys were dropped, but because that's where the light is. A company that "improves customer satisfaction" by fixing whatever issues appear most often in its ticket-tracking software, rather than investigating the issues customers cared about most but never bothered to report, is falling for the streetlight effect: the quick fix targets whatever is easiest to see, not necessarily what matters most.

A fourth instance shows the same shape playing out over months or years rather than weeks. **Brain drain** is the departure of a system's most skilled people toward better opportunities elsewhere, frequently triggered by a cost-cutting quick fix that made staying less attractive. A company that freezes training budgets and promotion opportunities to hit this quarter's cost target (the quick fix) often sees its most capable, most employable people leave first, since they have the easiest time finding opportunities elsewhere — the unintended consequence is a company that now has to pay recruiters and higher salaries to replace exactly the expertise it just let walk out the door, an outcome more expensive than the training budget it originally tried to save.

!!! mascot-tip "Ask What Gets Optimized Once People Notice the Metric"
    ![Sage pointing helpfully](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before adopting any new performance metric, ask: "If people started optimizing this number directly, what's the laziest way to raise it without actually improving the real goal?" If you can answer that question easily, Campbell's law and Goodhart's law both predict someone eventually will.

## Shifting the Burden: When the Fix Replaces the Muscle

The **Shifting The Burden Archetype**, also named in Chapter 9, describes a related but structurally distinct failure: instead of a fix backfiring through an unintended consequence, the fix simply keeps being chosen over and over, in place of building the fundamental capability that would have solved the problem for good — and each time it is chosen, that fundamental capability atrophies a little further, making it even less likely to be chosen next time.

#### Diagram: Shifting the Burden Archetype — Generic Structure

<iframe src="../../sims/cld-viewer/main.html?file=shifting-the-burden-cld.json" width="100%" height="500px" scrolling="no"></iframe>

[Run the CLD Viewer fullscreen](../../sims/cld-viewer/main.html?file=shifting-the-burden-cld.json){ .md-button }

<details markdown="1">
<summary>Shifting the Burden Archetype — Generic Structure (reused MicroSim)</summary>
Type: graph-model
**sim-id:** cld-viewer<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** ../../sims/cld-viewer/main.html?file=shifting-the-burden-cld.json<br/>
**Source Repo:** local — docs/sims/cld-viewer (examples/shifting-the-burden-cld.json)

Reused from this book's own CLD Viewer tool, loaded with its four-node "Problem Symptom / Treat Symptom / Root Cause Capability / Unintended Side Effects" example. Hovering over "Root Cause Capability" shows a tooltip explaining how each pass through "Treat Symptom" weakens that same capability node. Learning objective: given a repeated reliance on a quick fix, the learner will identify which underlying capability is eroding as a result (Bloom: Analyzing).
</details>

**Symptom relief** is the short-term comfort this archetype's quick fix provides — genuinely real, exactly like Chapter 8's initial success, but here specifically named for how it substitutes for the harder work of building a root-cause capability rather than merely delaying it once.

A timely modern instance of this archetype involves relying on AI tools for cognitive work. **AI dependence** is a pattern in which a person or team routes a task — writing code, drafting a document, debugging an error — entirely through an AI tool without maintaining their own underlying skill at that task, so that the human capability quietly erodes exactly the way Chapter 8's capability erosion describes, leaving the person less able to catch the tool's mistakes or work effectively when the tool is unavailable. **Human-AI collaboration** describes the healthier alternative: using an AI tool to amplify a skill the person actively maintains and continues to exercise, rather than to replace that skill entirely — a developer who uses an AI assistant to draft boilerplate code but still reads, understands, and could rewrite every line herself is engaged in collaboration; a developer who ships code she cannot explain is shifting the burden onto the tool.

The standardized-testing example from the previous section has a genuine fundamental-solution alternative worth naming here, since it shows what treating the root cause actually looks like in practice rather than only in theory. **Authentic assessment** evaluates a student's real, demonstrated ability to perform a meaningful task — writing an actual research report, building an actual working project — rather than a standardized proxy for that ability. **Portfolio assessment** is a specific, common form of authentic assessment: evaluating a curated collection of a student's actual work produced over time, rather than a single test score captured on one day. Both cost more teacher time to design and grade than a multiple-choice test — the same speed-versus-effort tradeoff Chapter 8 described between quick fixes and fundamental solutions — but both directly measure the capability the test score was only ever a proxy for, sidestepping Campbell's law and Goodhart's law entirely rather than merely managing around them.

!!! mascot-warning "A Tool That Works Every Time Can Still Be Eroding You"
    ![Sage holding up a wing in caution](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    AI dependence is easy to miss precisely because the quick fix keeps working — there's no dramatic failure to notice, only a slow erosion of a skill you're no longer exercising. Periodically try the task yourself, without the tool, purely as a diagnostic. If it's become noticeably harder than it used to be, that's the root-cause capability already eroding.

## Key Takeaways

You can now name the specific mechanisms behind two of the most common failed-intervention archetypes:

- The **Fixes That Fail Archetype** turns a quick fix's own unintended consequence into a return of the original problem — through **induced demand**, through a **proxy metric** distorted under **Campbell's law** and **Goodhart's law** (the **measurement trap**), or through the **streetlight effect** and long-run **brain drain**.
- The **Shifting the Burden Archetype** substitutes **symptom relief** for a fundamental solution repeatedly, eroding the underlying capability — **AI dependence** is a live modern instance, with **human-AI collaboration** as its healthier counterpart, and **authentic assessment** or **portfolio assessment** showing what a genuine root-cause alternative to a proxy metric looks like.

!!! mascot-celebration "You Can Now Spot a Hidden Dependency"
    ![Sage celebrating with wings raised](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Whoo! You just learned to tell a fix that will boomerang back on you apart from a fix that's quietly hollowing out the skill you'll need later. Chapter 11 takes on the last two archetypes — Tragedy of the Commons and Success to the Successful — where the damage spreads across many people at once instead of just one system.
