---
title: Systems Archetypes - Cross-Cutting Vocabulary
description: The shared vocabulary behind every systems archetype -- quick fixes versus fundamental solutions, externalities, misaligned incentives, collective action, compounding advantage, and the goal-erosion and capability-erosion dynamics that recur across archetypes.
generated_by: claude skill chapter-content-generator
date: 2026-09-17 15:12:00
version: 1.10
---

# Systems Archetypes: Cross-Cutting Vocabulary

## Summary

This chapter defines the vocabulary shared across every systems archetype: quick fixes versus fundamental solutions, side effects and externalities, misaligned incentives, and the collective action problem. It also introduces the specific dynamics of goal erosion, learned helplessness, and capability erosion that recur across multiple archetypes. Students completing this chapter will be able to recognize the building blocks of an archetype before learning the archetypes themselves.

## Concepts Covered

This chapter covers the following 26 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Systems Archetype | 845 |
| Quick Fix | 152 |
| Symptomatic Solution | 60 |
| Root Cause Solution | 44 |
| Fundamental Solution | 43 |
| Initial Success | 2 |
| Side Effect | 2 |
| Negative Externality | 73 |
| Positive Externality | 4 |
| Free Rider Problem | 69 |
| Common Pool Resource | 66 |
| Collective Action Problem | 3 |
| Misaligned Incentive | 14 |
| Winner-Take-All Dynamics | 2 |
| Compounding Advantage | 84 |
| Self-Fulfilling Prophecy | 61 |
| Resource Allocation | 10 |
| Resource Concentration | 9 |
| Goal Erosion | 12 |
| Eroding Goals | 4 |
| Corrective Action | 2 |
| Goal-Performance Gap | 4 |
| Crisis Point | 4 |
| Learned Helplessness | 3 |
| Capability Erosion | 12 |
| Addiction Cycle | 2 |

## Prerequisites

This chapter builds on concepts from:

- [1. Foundations of Systems Thinking](../01-foundations-of-systems-thinking/index.md)
- [3. Causal Loop Diagram Notation and Loop Identification](../03-cld-notation-and-loop-identification/index.md)
- [4. Feedback, Delay, and Loop Dynamics](../04-feedback-delay-and-loop-dynamics/index.md)
- [5. Stocks, Flows, and System Dynamics](../05-stocks-flows-and-system-dynamics/index.md)
- [6. Growth Patterns and Nonlinear Behavior](../06-growth-patterns-and-nonlinear-behavior/index.md)
- [7. Feedback Resilience and Robustness](../07-feedback-resilience-and-robustness/index.md)

---

## Introduction

Chapter 7 ended on a habit: always ask what the rest of the system will do in response to a fix. That habit turns out to be the seed of something bigger. Systems thinkers have spent decades cataloging the specific ways systems respond badly to well-meaning intervention, and they keep finding the same handful of shapes over and over — a fix that works for a while and then stops, two competitors whose independent choices make things worse for both, an early advantage that snowballs into an unbeatable lead. This chapter builds the shared vocabulary those shapes are described with, before the next three chapters name and diagram the shapes themselves.

!!! mascot-welcome "The Vocabulary Behind Every Archetype"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    You're about to learn words that will pay off for the rest of this book — and honestly, for the rest of your career. Once you can name a "quick fix," a "free rider problem," or "compounding advantage" on sight, you'll start spotting them everywhere, from your own team's sprint retros to the news. Let's zoom out and see the whole system!

## What Is a Systems Archetype?

A **systems archetype** is a generic causal loop structure — a specific arrangement of reinforcing loops, balancing loops, and delays — that recurs across many unrelated real-world situations, producing a recognizably similar pattern of behavior each time despite completely different surface content. The word "archetype" is doing real work here: it means an original pattern or model that other things are copies of, and that is exactly the claim systems thinkers make about these loop structures — they are the mold, and any specific situation you encounter is a casting from it. Peter Senge's *The Fifth Discipline*, one of the books most responsible for popularizing this idea in organizations, catalogued about a dozen of these recurring molds after finding the same handful of structures showing up again and again in completely unrelated corporate case studies.

Consider three situations that could not sound more different on the surface. A software team, under deadline pressure, skips writing automated tests to ship a feature faster. A national government, facing a politically painful industry decline, offers subsidies to keep failing factories running rather than retraining displaced workers. A person with a tension headache reaches for a painkiller instead of drinking water and taking a walk. Told as three news stories, these share no characters, no industry, and no unit of measurement. Drawn as causal loop diagrams, however, all three collapse into the identical shape: a symptom appears, a fast fix relieves it, the fix's side effect quietly erodes the capability that would have solved the problem for good, and the underlying problem returns — usually worse, because the eroded capability now has to be rebuilt before anyone can even attempt the real fix.

That shared shape is the entire point of learning archetypes at all. Once you recognize the pattern in one domain, you do not have to rediscover it from scratch in the next one — you can predict, before it happens, that skipping tests, propping up a failing industry, and reaching for a painkiller will each produce a return of the original symptom, and you can ask the diagnostic questions that reveal it earlier. This predictive power is also why archetypes are worth memorizing by name rather than just understanding loosely: a name like "Shifting the Burden" (Chapter 10) compresses an entire causal story into two words that a colleague across the table can instantly recognize, the same way "reinforcing loop" compressed an entire growth story back in Chapter 3.

The table below makes that shared structure concrete by lining the three stories up side by side, before this chapter starts naming each individual piece formally in the sections that follow.

| Domain | Fast relief | What quietly erodes | What returns |
|---|---|---|---|
| Software team | Ship without tests | Team's testing discipline and test-suite coverage | Bugs, now harder to trace |
| National economy | Subsidize the factory | Workers' incentive to retrain for other industries | Industry decline, later and larger |
| Headache | Take a painkiller | Awareness of the dehydration causing the pain | The headache, once the pill wears off |

!!! mascot-thinking "One Shape, Many Costumes"
    ![Sage thinking with a raised wing](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that none of these three stories mention the word "loop." That's deliberate — archetypes hide in plain language, dressed up as headaches and factory subsidies. Learning to translate a plain-language story into its underlying loop shape, the way Chapter 3 taught you to translate sentences into diagrams, is the actual skill this chapter and the next three are building.

## From Symptom to Fix: Quick Fixes and Fundamental Solutions

Every archetype in this book distinguishes between two fundamentally different ways of responding to a problem, and the vocabulary for that distinction is worth learning precisely, because the two responses look identical in the moment they're applied and only diverge afterward.

A **quick fix** is an intervention that relieves a problem's visible symptom rapidly, usually with little cost or effort, but without addressing whatever is actually generating that symptom. A **symptomatic solution** is the more formal name for exactly this kind of intervention — one aimed at the symptom rather than its origin — and the two terms are used interchangeably in most systems-thinking writing. The painkiller from the previous section is a quick fix and a symptomatic solution at once: it makes the headache go away without touching the dehydration causing it.

A **root cause solution** targets the actual underlying condition generating the problem rather than its visible symptom, and a **fundamental solution** is a root cause solution substantial enough to permanently resolve the problem rather than merely suppress it for a while. Drinking a glass of water is a fundamental solution to a dehydration headache: it addresses the actual cause, so the headache does not return once its effect wears off, the way it would after a painkiller. A second example, drawn from the software team above, makes the pair concrete in a technical setting: a quick fix for a slow web page might be adding more server hardware so requests process faster despite inefficient code; a fundamental solution would be actually rewriting the inefficient query that's causing the slowness. Both make the page faster today. Only the second one keeps it fast as traffic grows.

Two more terms describe what happens right after a quick fix is applied, before its downside becomes visible. **Initial success** is the genuine, real short-term improvement a quick fix produces immediately after being applied — it is not an illusion or a trick, the symptom really does improve, the page really does load faster, the headache really does go away. A **side effect** is any additional consequence of an action beyond the one it was intended to produce, and in a quick-fix situation, the side effect is usually the very thing that undermines the fix later — the extra server hardware's side effect is that nobody feels urgency to fix the slow query anymore, since the symptom it caused has quietly stopped bothering anyone.

The reason quick fixes get chosen so often, even by people who know better, is that fundamental solutions are almost always slower and harder, and the two options are rarely compared fairly: a fundamental solution's cost is paid immediately and its benefit arrives later, while a quick fix's benefit arrives immediately and its cost — the side effect — arrives later, often long after the person who chose it has moved on to a different project. Retraining an entire workforce takes years; writing a comprehensive automated test suite takes real engineering time up front; shipping without tests or subsidizing a factory can happen this quarter. Faced with a visible deadline and an invisible future cost, most decision-makers, most of the time, reach for the option that pays off today. The table below reinforces the contrast now that all four terms have been defined.

| Approach | Targets | Speed | What happens later |
|---|---|---|---|
| Quick fix / symptomatic solution | The visible symptom | Fast, low effort | Symptom returns once the fix's effect fades |
| Root cause / fundamental solution | The underlying condition | Slow, higher effort | Problem stays resolved |

!!! mascot-tip "Ask What the Fix Is Actually Touching"
    ![Sage pointing helpfully](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    When you're not sure whether something is a quick fix or a fundamental solution, ask: "If I stopped doing this tomorrow, would the original problem come back immediately?" If yes, you're looking at a symptomatic solution — useful for buying time, but not a substitute for the slower work underneath it.

## Shared Resources and Misaligned Incentives

A second family of vocabulary describes what happens when a resource, or an outcome, is shared among multiple independent parties whose individual choices affect everyone else.

A **common pool resource** is a resource that is available to multiple users, is costly or impossible to restrict access to, but becomes depleted or degraded as more people draw on it. An office's shared wifi bandwidth is a small, everyday common pool resource: nobody can easily be shut out, but everyone's video calls slow down once too many people stream at once. A much larger, and much more consequential, example is an ocean fishery: no fence can be built around open water, yet each additional boat's catch reduces the fish available to every other boat and to the fishery's own ability to replenish itself — exactly the structure Chapter 11 examines in full as the Tragedy of the Commons.

A **negative externality** is a cost imposed on people who did not choose to bear it, created as a side effect of someone else's otherwise unrelated decision. The videoconference lag imposed on a colleague because you decided to also stream music in the background is a small negative externality; a factory's downstream water pollution, borne by communities who never bought anything the factory produced, is a much larger one. A **positive externality** works in the opposite direction: a benefit received by people who did not pay for it or ask for it. A colleague who writes up a tricky bug fix in detail creates a positive externality for every future engineer who searches the codebase and finds the answer already documented; a homeowner's decision to get vaccinated against a contagious illness creates a positive externality for everyone nearby who is now less likely to be exposed, whether or not they contributed to that decision at all.

The **free rider problem** is what happens when people can benefit from a shared resource or collective effort without contributing to its cost or upkeep, which tends to reduce everyone's incentive to contribute in the first place. A small number of open-source maintainers doing unpaid work that thousands of companies build commercial products on top of, without any of those companies contributing code, money, or bug reports back, is the free rider problem in its purest modern form — and it is not a hypothetical: several widely used open-source projects have publicly reported maintainer burnout traced directly to this exact imbalance. The **collective action problem** is the broader difficulty this creates: getting a group of independent, self-interested people to cooperate toward a shared goal even when cooperation would leave everyone better off than the alternative, precisely because each individual has a private incentive to hold back their own contribution while still enjoying everyone else's. Coordinating a neighborhood to reduce water use during a drought is a textbook collective action problem: everyone benefits if the reservoir lasts through the summer, but any single household's individual conservation makes a negligible difference to that outcome, so the private incentive to actually cut back is weak even though the collective interest in doing so is strong.

A closely related but distinct failure occurs when the incentives different parties face are not simply misaligned with the group's interest, but actively pit the parties against each other. A **misaligned incentive** is a reward structure that motivates a person or organization to act in a way that serves their own measured interest while working against the interest of the larger system they belong to. Two ride-sharing companies competing for the same city's drivers by repeatedly undercutting each other's fares are each behaving rationally by their own incentive — win more drivers this quarter — while jointly driving the fare structure both companies depend on into the ground. That mutual, incentive-driven escalation is called **winner-take-all dynamics**: a competitive structure in which relative standing, not absolute performance, determines the payoff, so that each competitor is rewarded for outdoing the other rather than for reaching any particular fixed standard — a structure that rewards continuing to escalate, since falling behind the other competitor, even by a little, can cost everything.

The diagram below shows exactly this escalating structure in its most generic, stripped-down form: two actors, X and Y, each acting to improve their own results relative to the other, with a comparison step that feeds each side's next action.

#### Diagram: Escalation Structure Behind Misaligned Incentives

<iframe src="../../sims/cld-viewer/main.html?file=escalation-cld.json" width="100%" height="500px" scrolling="no"></iframe>

[Run the CLD Viewer fullscreen](../../sims/cld-viewer/main.html?file=escalation-cld.json){ .md-button }

<details markdown="1">
<summary>Escalation Structure Behind Misaligned Incentives (reused MicroSim)</summary>
Type: graph-model
**sim-id:** cld-viewer<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** ../../sims/cld-viewer/main.html?file=escalation-cld.json<br/>
**Source Repo:** local — docs/sims/cld-viewer (examples/escalation-cld.json)

Reused from this book's own CLD Viewer tool, loaded with its five-node "Action by X / Action by Y / Results Comparison" example. Hovering over "Action by X" or "Action by Y" shows a tooltip naming a real-world pair this structure fits (rival ride-share fares, a national arms race, competing discount wars), and hovering over "Results Comparison" explains why each side keeps re-escalating rather than settling. Learning objective: given a two-party competitive structure, the learner will identify the misaligned incentive driving continued escalation rather than de-escalation (Bloom: Understanding).
</details>

!!! mascot-tip "Spot a Common Pool Resource by Asking Who Can Say No"
    ![Sage pointing helpfully](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    A quick test for a common pool resource: can any one user be easily and cheaply excluded from using it? If the honest answer is "not really" — shared bandwidth, a public fishery, an open community forum — you're looking at a common pool resource, and the free rider problem is worth checking for next.

## Advantage That Compounds

A third family of vocabulary describes what happens when an early, often small, advantage sets off a self-reinforcing cycle that grows the advantage further over time — the seed of an archetype this book returns to in full in Chapter 11.

**Compounding advantage** is the process by which an early edge in some resource or outcome increases a system's access to further resources, which in turn widens the original edge even more, round after round — precisely the reinforcing-loop compounding Chapter 6 introduced with interest, except now the growing quantity is status, funding, or attention rather than money. **Resource allocation** is the general process of deciding how a shared or limited resource gets distributed among competing claims, and **resource concentration** is the specific outcome that results when that allocation process keeps routing more of the resource toward whichever claim already holds the most of it — the mechanism, not just the result, behind phrases like "the rich get richer." A video-sharing platform's recommendation algorithm shows resource concentration clearly: a video that starts with slightly more views gets recommended to more viewers, which produces still more views, which earns it a further boost in the recommendation queue — the resource being allocated is attention, not money, but the reinforcing shape is identical to compound interest.

A **self-fulfilling prophecy** is a belief or expectation that causes people to act in ways that make the belief come true, even though it might not have come true on its own. Compounding advantage and self-fulfilling prophecy often travel together: a student mistakenly placed in an "advanced" track based on a single early test score gets more attentive instruction and higher teacher expectations as a resource allocation decision; that additional resource genuinely improves their later performance, which then appears to confirm that the original placement decision correctly identified a more capable student — even though the advantage, not any innate difference, produced the outcome. Nothing about this requires anyone to act unfairly on purpose; the loop runs on its own once the first resource-allocation decision is made, which is exactly what makes compounding advantage so difficult to catch and correct in practice — by the time the gap is large enough to notice, it looks like it must reflect a real difference in merit.

!!! mascot-thinking "Watch the Resource, Not Just the Outcome"
    ![Sage thinking with a raised wing](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    When a gap between two people, teams, or products keeps widening, resist the urge to explain it purely by their starting abilities. Ask instead what resource — attention, funding, visibility, practice time — has been quietly flowing more toward the leader with every round. Chapter 11 gives this exact loop a full diagram and a name of its own.

## When Goals Quietly Slip

The final cluster of vocabulary in this chapter describes a subtler failure than a single quick fix or a single misaligned incentive: a slow, often unnoticed erosion of the standard a system is trying to hold itself to.

A **goal-performance gap** is the difference between where a system's own stated target says it should be and where it actually is — a sprint team that commits to shipping ten features but ships six has a goal-performance gap of four. There are exactly two structurally different ways to close that gap. A **corrective action** closes it by improving actual performance — the team diagnoses whatever is slowing it down and ships more next sprint. **Goal erosion**, also called **eroding goals**, closes the identical gap the opposite way: by lowering the goal itself to match whatever performance already is, rather than fixing performance to match the goal. Both actions make the gap on the dashboard shrink to zero. Only one of them makes the team actually better.

Goal erosion is dangerous precisely because it is quiet and repeatable: lowering a target by a small, defensible-sounding amount rarely triggers alarm the way an outright missed deadline would, so a team, a company, or a person can ratchet a standard down gradually, sprint after sprint, without ever experiencing a single moment that feels like failure. The diagram below shows the generic loop structure behind this: a goal, an actual performance level, the gap between them, and — crucially — a second pathway by which pressure from that gap can lower the goal instead of closing it through real corrective action.

#### Diagram: The Drifting-Goal Loop

<iframe src="../../sims/cld-viewer/main.html?file=drifting-goals-cld.json" width="100%" height="500px" scrolling="no"></iframe>

[Run the CLD Viewer fullscreen](../../sims/cld-viewer/main.html?file=drifting-goals-cld.json){ .md-button }

<details markdown="1">
<summary>The Drifting-Goal Loop (reused MicroSim)</summary>
Type: graph-model
**sim-id:** cld-viewer<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** ../../sims/cld-viewer/main.html?file=drifting-goals-cld.json<br/>
**Source Repo:** local — docs/sims/cld-viewer (examples/drifting-goals-cld.json)

Reused from this book's own CLD Viewer tool, loaded with its five-node "Goal / Actual / Gap / Pressure to Lower Goal / Corrective Action" example. Hovering over "Pressure to Lower Goal" versus "Corrective Action" shows the two competing pathways a goal-performance gap can be closed through, with a real-world example attached to each. Learning objective: given a system with a persistent goal-performance gap, the learner will distinguish a corrective-action response from a goal-erosion response (Bloom: Analyzing).
</details>

If goal erosion continues unchecked long enough, it can produce a **crisis point** — the moment at which the accumulated gap between an eroded goal and the system's real, underlying needs becomes too large to paper over any further, forcing an abrupt and often costly reckoning rather than the gradual adjustments that led there. A city that repeatedly delays bridge maintenance by extending the inspection interval, rather than fixing the funding shortfall behind the delays, is engaged in goal erosion; the crisis point arrives the day a bridge actually fails, and the resulting repair bill dwarfs what the deferred maintenance would ever have cost.

Repeated goal erosion has a psychological cousin worth naming on its own. **Learned helplessness** is a state in which repeated experience of a gap that never closes through one's own effort — because the target keeps being quietly lowered instead of actually met — leads a person or team to stop trying to close gaps at all, even when a real opportunity to succeed later appears. A team whose sprint targets have been lowered five times in a row can start to disengage from planning altogether, not because they've become lazy, but because their own experience has taught them that effort and outcome are disconnected.

**Capability erosion** is the loss, over time, of a system's own ability to perform some function, usually because that function has been consistently outsourced to a quick fix instead of being exercised and maintained. A team that always calls in a contractor to handle database migrations never builds its own migration expertise, so its in-house capability quietly erodes even while every individual migration succeeds — the exact same "erodes the capability that would have solved the problem for good" mechanism from this chapter's opening three stories, now given its own formal name. Capability erosion and quick fixes reinforce one another in a way that deserves a name of its own too: an **addiction cycle** is a repeating pattern in which a quick fix's initial success creates just enough relief to make the underlying problem tolerable, which removes the motivation to pursue a fundamental solution, so the quick fix gets applied again next time — and each repetition further erodes the very capability that a fundamental solution would have required, making the fundamental solution progressively harder to reach for as time goes on. The contractor-dependent team's next migration is, if anything, more likely to call the contractor again than the last one was, not less — the capability gap has only widened.

!!! mascot-warning "Lowering the Bar Feels Like Progress — It Isn't"
    ![Sage holding up a wing in caution](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A shrinking goal-performance gap looks identical on a dashboard whether it came from real improvement or from a quietly lowered target. Before celebrating a closed gap, always check which side of the gap actually moved — the goal, or the performance. Only one of those is good news.

Recognizing your own team, or even yourself, in the goal-erosion or addiction-cycle pattern just described can be an uncomfortable moment, but it is also a genuinely useful one rather than a verdict on anyone's character or effort.

!!! mascot-encourage "Naming the Pattern Is Already Progress"
    ![Sage giving an encouraging nod](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    The whole reason this vocabulary exists is that the pattern is common and reversible — the next three chapters give you concrete, worked-through strategies for breaking exactly this cycle, starting with Fixes That Fail and Shifting the Burden in Chapter 10.

## Key Takeaways

You now have the shared vocabulary every archetype in the next three chapters will assume:

- A **systems archetype** is a generic loop structure that recurs across unrelated domains, producing a recognizable pattern of behavior each time.
- A **quick fix** (or **symptomatic solution**) relieves a symptom fast but leaves its cause untouched; a **root cause solution** (or **fundamental solution**) resolves the cause itself. Every quick fix produces genuine **initial success** bundled with a **side effect** that often undermines it later.
- A **common pool resource** invites the **free rider problem** and the broader **collective action problem**; a **negative externality** imposes uncompensated costs on others, a **positive externality** hands out uncompensated benefits, and a **misaligned incentive** can escalate into **winner-take-all dynamics** between competitors.
- **Compounding advantage**, often amplified by a **self-fulfilling prophecy**, routes more and more **resource allocation** toward whichever side already holds an edge, producing **resource concentration**.
- A **goal-performance gap** can be closed by real **corrective action** or masked by **goal erosion**, which can escalate to a **crisis point** and, if repeated, to **learned helplessness**; leaning on quick fixes instead of exercising a capability produces **capability erosion**, which can lock a system into a repeating **addiction cycle**.

!!! mascot-celebration "You Now Have the Building Blocks"
    ![Sage celebrating with wings raised](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Whoo-hoo! You just learned the exact vocabulary — quick fixes, externalities, compounding advantage, goal erosion — that every named archetype in the next three chapters is built from. Chapter 9 starts naming the shapes themselves.
