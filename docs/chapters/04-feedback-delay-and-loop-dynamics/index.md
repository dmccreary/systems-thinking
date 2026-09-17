---
title: Feedback, Delay, and Loop Dynamics
description: What feedback loops do over time -- positive and negative feedback, loop dominance, and how delays turn goal-seeking behavior into overshoot and oscillation.
generated_by: claude skill chapter-content-generator
date: 2026-09-17 14:48:00
version: 1.10
---

# Feedback, Delay, and Loop Dynamics

## Summary

This chapter examines what feedback loops do over time: how positive and negative feedback produce vicious and virtuous cycles, how loop dominance shifts as a system evolves, and how delays separate a system's actions from their consequences. Students completing this chapter will be able to explain why a system's behavior can lag its causes and how dominance shifts between competing loops.

## Concepts Covered

This chapter covers the following 17 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Feedback | 1065 |
| Feedback Loop | 394 |
| Positive Feedback | 261 |
| Negative Feedback | 409 |
| Vicious Cycle | 4 |
| Virtuous Cycle | 4 |
| Loop Dominance | 7 |
| Shifting Dominance | 2 |
| Influence Diagram | 2 |
| Stock And Flow Diagram | 1721 |
| Delay | 20 |
| Feedback Delay | 2 |
| Time Delay | 6 |
| System Delay | 6 |
| Variable (CLD) | 12 |
| Condition | 6 |
| Outcome | 5 |

## Prerequisites

This chapter builds on concepts from:

- [1. Foundations of Systems Thinking](../01-foundations-of-systems-thinking/index.md)
- [2. Mental Models and Systems Analysis Tools](../02-mental-models-and-systems-analysis-tools/index.md)
- [3. Causal Loop Diagram Notation and Loop Identification](../03-cld-notation-and-loop-identification/index.md)

---

## Introduction

Chapter 3 gave you a precise notation for reading any causal loop diagram: nodes, signed edges, and the negative-link counting rule that tells you in seconds whether a loop is reinforcing or balancing. That's a snapshot skill — it lets you look at a drawing and correctly name its shape. This chapter asks a different question: once you know a loop's shape, what does it actually *do* as time passes? Along the way, two vocabularies that describe the same loops get untangled — the reinforcing/balancing language from Chapter 3 and the positive/negative feedback language you'll hear from engineers and biologists — and a feature the thermostat loop only mentioned in passing gets the full treatment it deserves: the delay between an action and its effect, which turns out to be exactly what separates a loop that settles smoothly from one that overshoots and oscillates.

!!! mascot-welcome "From Shape to Behavior"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Welcome back! You can already read a loop's shape on paper — now let's find out what that shape predicts about how a real system behaves minute to minute, year to year. Let's zoom out and see the whole system!

## Feedback: When Output Becomes Input Again

**Feedback** is the general process by which a system's own output circles back around to influence its future input. It's a broader idea than any single diagram: feedback exists any time information about a result flows backward and changes what happens next, whether or not anyone has drawn it as a loop.

You've almost certainly experienced feedback outside of any systems-thinking context. Hand a microphone too close to the speaker it's plugged into, and you get a rising electronic squeal: the speaker's output sound re-enters the microphone as new input, the amplifier boosts it again, and the louder result re-enters the microphone once more. Nobody drew that as a diagram, but it's feedback in the strict sense this book uses — a system's own output looping back as its own input.

A **feedback loop** is what you get when that general feedback relationship is represented as a closed chain of causes and effects — which is exactly what a causal loop diagram draws. Chapter 3's thermostat is a feedback loop: room temperature (an effect) eventually feeds back to influence the heater (a cause) that produced it in the first place. Every causal loop diagram from Chapter 3 was, in this sense, a picture of some real system's feedback.

Before looking at the diagram again, it's worth being precise about what "feeds back" actually crosses: not the physical heat itself, but *information* — a measurement, a signal, a comparison against a target. The heater doesn't literally receive warm air back; a sensor detects the new room temperature and that reading is what re-enters the loop. This is why systems thinkers describe feedback as an information process even when the underlying system, like a furnace, is entirely physical.

#### Diagram: Thermostat Loop as Feedback

<iframe src="../../sims/cld-viewer/main.html?file=thermostat-cld.json" width="100%" height="500px" scrolling="no"></iframe>

[Run the CLD Viewer fullscreen](../../sims/cld-viewer/main.html?file=thermostat-cld.json){ .md-button }

<details markdown="1">
<summary>Thermostat Loop as Feedback (reused MicroSim)</summary>
Type: graph-model
**sim-id:** cld-viewer<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** ../../sims/cld-viewer/main.html?file=thermostat-cld.json<br/>
**Source Repo:** local — docs/sims/cld-viewer (examples/thermostat-cld.json)

Reused from this book's own CLD Viewer, loaded again with the five-node thermostat example from Chapter 3. This time, hover over "Room Temperature" and "Heater Output" and notice the information that actually crosses the loop: a measurement of temperature, not heat itself. Learning objective: given a physical feedback system, the learner will distinguish the physical process (heating) from the information that feeds back to control it (Bloom: Understanding).
</details>

## Two Names for the Same Two Behaviors

Chapter 3 classified loops as reinforcing or balancing using the negative-link counting rule — a naming tradition that comes from systems dynamics. Engineers, biologists, and control theorists studying the exact same behaviors often reach for a different pair of names: **positive feedback** and **negative feedback**. These aren't competing ideas needing to be reconciled — they're the same two behaviors, named by two different academic traditions that grew up studying them independently.

Positive feedback is feedback in which a change, moving through the loop, produces a further change in the *same* direction — the exact behavior Chapter 3 called a reinforcing loop. A classroom standing ovation is a clean example: one enthusiastic person stands and claps, which makes it easier and less awkward for the next few people to also stand, which makes it easier still for everyone else — each additional person standing amplifies the pressure on those still seated. Negative feedback is feedback in which a change, moving through the loop, produces a further change in the *opposite* direction, pushing the system back toward some prior state — exactly what Chapter 3 called a balancing loop. Running a fever demonstrates this well: a rising body temperature triggers sweating, and sweating cools the body back down, opposing the very rise that triggered it.

| Systems-dynamics name (Ch. 3) | Control-theory name | Net effect |
|---|---|---|
| Reinforcing loop | Positive feedback | Amplifies an initial change, no built-in limit |
| Balancing loop | Negative feedback | Opposes an initial change, seeks a goal |

!!! mascot-warning "Positive Feedback Isn't a Compliment"
    ![Sage holding up a wing in caution](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    It's tempting to hear "positive feedback" and assume something good is happening — the same trap Chapter 3 warned about with "+" links. A bank run is positive feedback: fear of a bank failing causes withdrawals, and withdrawals make the failure more likely, causing more fear. Amplifying is not the same as improving.

## Vicious Cycles and Virtuous Circles

Outside of formal systems language, people already have everyday names for a reinforcing loop, depending on whether they like where it's heading. A **vicious cycle** is the everyday name for a reinforcing loop whose amplification is unwelcome — each pass around the loop makes an already-bad situation worse. A **virtuous cycle** is the same loop shape with the opposite value judgment attached: each pass makes an already-good situation better.

Falling behind on credit card debt is a familiar vicious cycle: a balance that isn't paid off accrues interest, the growing balance makes the minimum payment harder to afford, and a missed or reduced payment lets the balance grow further still. Building an exercise habit can run the same loop shape in reverse as a virtuous cycle: a short daily walk improves mood and energy, better mood and energy make it easier to walk the next day too, and each easy day makes the habit more likely to stick. Same reinforcing structure in both cases — only the direction anyone would want it to go has changed.

## Naming the Parts of a Loop

Chapter 3 briefly sorted CLD nodes into three informal types — stock, variable, and condition — to help you read diagrams faster. This chapter names two of those roles precisely, and adds a third that Chapter 3 didn't need yet.

A **variable (CLD)** is a node in a causal loop diagram representing a quantity that the loop itself computes or updates each cycle, as opposed to a quantity that simply accumulates over time (that accumulating kind is a *stock*, which Chapter 5 covers in full). A **condition** is a node representing an externally set target, threshold, or state that the loop treats as a given rather than something the loop's own dynamics produce — a value someone or something outside the loop chose. An **outcome** is the specific variable in a diagram whose behavior over time is what you, the analyst, actually care about observing or predicting — the node the whole diagram exists to explain.

These three roles aren't mutually exclusive labels stamped once and forever; the same node can be a condition in one analysis and an outcome in another, depending on what question you're asking. In the thermostat loop above, "Desired Temperature Setpoint" is a condition — nobody in the loop's own dynamics changes it, a person turns the dial. "Thermostat Signal" is a variable — it's recalculated fresh each cycle from the temperature gap, rather than accumulating. And if your question is "will the room actually reach a comfortable temperature," then "Room Temperature" is your outcome — the node whose behavior over time answers the question you started with. Ask a different question — "how hard is the heater working?" — and "Heater Output" becomes the outcome instead, with everything else in the diagram now serving as its explanation.

!!! mascot-tip "Find the Outcome First"
    ![Sage pointing helpfully](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    When you're handed an unfamiliar diagram, don't start by labeling every node. Start by asking "which node's behavior is this diagram trying to explain?" That's your outcome. Everything else earns its label — condition or variable — in relation to it.

## A Cousin Notation: Influence Diagrams

Causal loop diagrams aren't the only arrow-and-box notation you'll run into. An **influence diagram** is a related diagramming style, popular in decision analysis and probability, that shows how decisions, uncertain quantities, and results influence one another — but using distinct node shapes (often a rectangle for a decision, an oval for an uncertain quantity, and a diamond for a value or outcome) instead of the uniform rectangles and plain "+"/"−" polarity signs a CLD uses.

The family resemblance is real: both notations are directed graphs of things influencing other things. The difference in purpose explains the difference in shape. A CLD is built to answer "what does this loop do over time?" — so it emphasizes polarity and closed cycles. An influence diagram is built to answer "given this decision, what result should I expect?" — so it emphasizes the type of each node (is it a choice I control, an uncertainty, or a result?) and rarely closes into loops at all. You won't need to draw influence diagrams in this book, but recognizing one when a colleague hands you one — and not mistaking its diamond-shaped "value" node for a CLD's condition — will save you a confusing meeting.

## When Loops Compete: Dominance and Its Shifts

Real systems rarely contain just one loop. The population diagram from Chapter 3 already had two, sharing the "Population" node — a reinforcing birth loop and a balancing death loop. When two or more loops act on the same variable at once, they don't necessarily contribute equally at every moment.

**Loop dominance** is the condition in which one loop in a system with multiple interacting loops produces a substantially stronger effect on the shared variable than the others, so that the system's overall behavior at that moment resembles the dominant loop's behavior almost by itself. **Shifting dominance** is what happens when that balance of power changes over time — a loop that was dominant weakens or a previously weak loop strengthens, until a different loop takes over as the one shaping the system's behavior.

An outbreak of a contagious illness in a fully susceptible population shows both ideas clearly. Early on, the reinforcing loop dominates: each infected person exposes several others, so infections grow at an accelerating rate almost exactly as the bank-balance loop from Chapter 3 compounded. But a second, balancing loop is quietly present the entire time — as more people catch the illness and recover with immunity, fewer susceptible people remain for the reinforcing loop to reach. Nothing about either loop's *structure* changes, but as the pool of susceptible people shrinks, the balancing loop's effect grows relative to the reinforcing loop's, dominance shifts, and the outbreak's growth rate slows and eventually reverses. Chapter 6 returns to this exact pattern — it's what produces an S-shaped curve rather than runaway exponential growth forever.

!!! mascot-thinking "A System's Behavior Isn't Fixed — It's Whichever Loop Is Winning"
    ![Sage thinking with a raised wing](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Here's the mental shift worth pausing on: a system with two loops doesn't have one fixed behavior. It has a behavior that depends on which loop currently dominates — and that can change while you're watching, with no change to the diagram at all.

## Delay: The Gap Between Action and Effect

A **delay** is the time interval that passes between a cause occurring and its effect actually taking place. Chapter 3's thermostat loop already contained one without naming it — turn the heater on, and the room doesn't warm up instantly; heat has to actually transfer into the air, which takes real time. Delay is easy to overlook on a static diagram, since an arrow drawn on paper takes zero time to travel, but it's rarely zero in the system the arrow represents.

Delay matters because it breaks the tight, instant connection between action and feedback that makes a balancing loop behave smoothly. Picture an old shower with a long pipe run between the faucet and the showerhead. You turn the handle toward hot, feel nothing change for several seconds because the warm water hasn't traveled the length of the pipe yet, so you turn the handle further toward hot — and then all of that heat arrives at once, scalding you, so you yank the handle toward cold, wait through the same delay feeling nothing, overcorrect toward cold, and get blasted with cold water. The balancing loop's goal — a comfortable temperature — never actually changed. What changed is that the delay between your action and its effect caused you to keep correcting *before* the last correction had even arrived, and the result is oscillation instead of a smooth approach to the target.

Not every delay works the same way or comes from the same place, so it's worth distinguishing three sources. A **time delay** is the generic term for any gap between cause and effect, regardless of where it comes from — the broadest of the three terms. A **system delay** is a time delay that comes from the physical structure of the system itself — the literal travel time of water through a pipe, the months it takes to build a new factory, the years it takes a planted tree to mature. A **feedback delay** is a time delay that occurs specifically within a loop's return path — the gap between an effect actually happening and the loop *noticing* it, such as the lag between a company's sales dropping and that drop actually showing up in a monthly sales report someone reads.

The following table reinforces the distinction between these three delay terms, all of which you've now seen defined:

| Term | What it describes | Example from above |
|---|---|---|
| Time delay | Any gap between cause and effect (general term) | Turning the shower handle and feeling the temperature change |
| System delay | Delay from the system's physical structure | Water's travel time through a long pipe |
| Feedback delay | Delay specifically in a loop's return/detection path | A sales drop not appearing in a report until month's end |

!!! mascot-encourage "Predicting Delayed Systems Takes Real Practice"
    ![Sage giving an encouraging nod](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If it feels genuinely hard to predict how a delayed system will behave, that's not a gap in your understanding — it's a famously difficult skill even for experienced engineers, which is exactly why "figure out the delay before you touch the controls" is standard advice in process industries. Start by just asking "how long between my action and its visible effect?" before predicting anything further.

## Previewing a New Notation: The Stock and Flow Diagram

Causal loop diagrams are excellent at showing a loop's *structure* — which variables affect which others, and with what polarity. They're less good at showing something delay just made obviously important: *how much* accumulates, and *how fast*. A CLD's arrow from "Interest Earned" to "Bank Balance" tells you the direction of the effect, but nothing on the diagram shows you the actual dollar amount sitting in the account at any moment, or how quickly it's changing. A **stock and flow diagram** is a different kind of systems diagram, built specifically to show accumulation over time: it draws a **stock** as a rectangle representing a quantity that accumulates, connected to pipe-and-valve arrows called flows that add to or drain that quantity, so that both the current amount and its rate of change are visible on the same page.

The most common version of this notation uses a physical metaphor almost everyone already understands: a bathtub. The water level in the tub is the stock — the accumulated quantity. A pipe pouring water in through the faucet is an inflow, adding to the level. A drain letting water out is an outflow, subtracting from it. A small cloud symbol at either end of a pipe marks a boundary of the diagram — a source or sink the diagram isn't bothering to model in detail, like "wherever the tap water comes from" or "wherever drained water goes."

Converting Chapter 3's bank-balance loop into this new notation makes the difference concrete. As a CLD, it was two boxes and two arrows showing that balance and interest cause each other. As a stock and flow diagram, "Bank Balance" becomes a rectangle (the stock), "Interest Earned" becomes an inflow pipe feeding into it, and a withdrawal you might make becomes a second, outflow pipe draining it — with the rectangle's fill level actually representing the dollar amount at any moment, something the CLD never attempted to show.

The MicroSim below lets you click through exactly that conversion, one labeled part at a time.

#### Diagram: Stock and Flow Notation Explorer

<iframe src="../../sims/stock-flow-notation-explorer/main.html" width="100%" height="480px" scrolling="no"></iframe>

[Run the Stock and Flow Notation Explorer fullscreen](../../sims/stock-flow-notation-explorer/main.html){ .md-button }

<details markdown="1">
<summary>Stock and Flow Notation Explorer</summary>
Type: microsim
**sim-id:** stock-flow-notation-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Let learners map the bank-balance causal loop diagram from Chapter 3 onto its stock-and-flow equivalent by clicking each labeled part of a bathtub-style diagram and reading how it corresponds to a CLD element.

Bloom Taxonomy Level: Understand
Bloom Taxonomy Verb: Map / Translate

Learning Objective: Given a simple causal loop diagram, the learner will identify the corresponding stock, inflow, and outflow in an equivalent stock-and-flow diagram (Bloom: Understanding).

Canvas: 700x420 default, responsive — recompute the tub rectangle's position and pipe lengths as a proportion of `canvas.width` inside a `windowResized()` handler.

Visual elements:
- A rectangular "tub" outline labeled "Bank Balance" on the left half of the canvas, filled to roughly 40% height with a light-blue rectangle representing the current stock level.
- An inflow pipe entering the top of the tub, labeled "Interest Earned," with a small valve icon and a cloud symbol at its far end.
- An outflow pipe exiting the bottom of the tub, labeled "Withdrawals," with a valve icon and a cloud symbol at its far end.
- A small side panel on the right showing the equivalent Chapter 3 causal loop diagram (two boxes, two labeled arrows) for side-by-side comparison, grayed out until the matching stock-and-flow part is clicked.

Controls:
- Clicking the tub rectangle highlights "Bank Balance" in both diagrams and shows an info-panel sentence: "This rectangle is a stock — an accumulating quantity, the same role Chapter 3's 'Bank Balance' node played."
- Clicking the inflow pipe highlights "Interest Earned" in both diagrams with the sentence: "This pipe is an inflow — it adds to the stock, playing the same role as the CLD's positive edge into Bank Balance."
- Clicking the outflow pipe highlights "Withdrawals" with the sentence: "This pipe is an outflow — a flow this simple CLD never showed, because CLDs don't distinguish rate of change from accumulated amount."
- A "Reset" button, built with `createButton()`, that un-highlights all parts and clears the info panel.

Interactivity requirement: every labeled part (tub, inflow pipe, outflow pipe) is clickable, highlights its CLD counterpart, and reveals an explanatory info-panel sentence — satisfying the interactivity bar with immediate, comparative feedback.

Color scheme: stock rectangle in the book's neutral node blue; inflow pipe and valve in the positive-link green; outflow pipe and valve in a muted amber (introducing a third color, since an outflow is neither a positive nor a negative causal link — it's a different kind of notation entirely).

Implementation: p5.js sketch with hit-testing rectangles over each drawn part, a shared highlight-state variable, and a text-wrapping info panel drawn below the canvas.
</details>

Chapter 5 puts this new notation to work for real, with a full interactive bathtub simulator where you set the inflow and outflow rates yourself and watch the stock level respond — including what happens when a delay, exactly like the one you just met in the shower example, sits inside the pipe.

## Key Takeaways

You now have the vocabulary to describe not just a loop's shape, but what it does over time:

- **Feedback** is a system's output looping back to influence its own future input; a **feedback loop** is that relationship drawn as a closed causal chain.
- **Positive feedback** and **negative feedback** are the control-theory names for exactly the reinforcing and balancing loops Chapter 3 taught — amplifying an initial change versus opposing it. The everyday names **vicious cycle** and **virtuous cycle** describe a reinforcing loop with, respectively, an unwelcome or welcome direction.
- Every node in a loop can be understood as a **variable** (recalculated each cycle), a **condition** (an externally set target), or the **outcome** (whichever variable's behavior you're actually trying to explain) — roles that shift depending on the question being asked.
- **Loop dominance** explains why a system with multiple loops behaves like whichever loop currently has the strongest effect; **shifting dominance** is what happens when a different loop takes over as conditions change.
- A **delay** — whether a **system delay** built into physical structure or a **feedback delay** in a loop's own detection path — breaks the tight link between action and effect, and is exactly what turns smooth goal-seeking into overshoot and oscillation.
- The **stock and flow diagram** extends causal notation to show accumulation directly, using a stock (rectangle) and flows (pipes) — the notation Chapter 5 builds on in full.

!!! mascot-celebration "You Can Now Predict Behavior, Not Just Read Shape"
    ![Sage celebrating with wings raised](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Whoo! You went from naming a loop's shape to predicting what it actually does over time — including why delay turns a well-intentioned correction into an overcorrection. That's exactly the instinct Chapter 5's stocks and flows will let you make precise.
