---
title: Stocks, Flows, and System Dynamics
description: The stock-and-flow model of system structure -- inflows, outflows, bottlenecks, and constraints -- connected to control-system concepts like homeostasis, set points, and goal-seeking behavior.
generated_by: claude skill chapter-content-generator
date: 2026-09-17 14:52:00
version: 1.10
---

# Stocks, Flows, and System Dynamics

## Summary

This chapter builds the stock-and-flow model of system structure, covering inflows, outflows, buffers, bottlenecks, and constraints, along with more advanced patterns like aging chains and co-flows. It connects this structure to control-system concepts such as homeostasis, set points, and goal-seeking behavior. Students completing this chapter will be able to model a system as stocks and flows and identify its constraints.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Stock | 729 |
| Flow | 991 |
| Inflow | 2 |
| Outflow | 2 |
| Buffer | 3 |
| Bottleneck | 95 |
| Constraint | 98 |
| Limiting Factor | 94 |
| Stock And Flow Model | 216 |
| Aging Chain | 3 |
| Co-Flow | 206 |
| Conveyor Model | 2 |
| Accumulation | 1 |
| Rate Of Change | 565 |
| Systems Dynamics | 205 |
| Dynamic Equilibrium | 204 |
| Steady State | 101 |
| Equilibrium | 100 |
| Homeostasis | 91 |
| Set Point | 90 |
| Goal-Seeking Behavior | 36 |
| Self-Correcting System | 3 |
| Sensor (Control) | 26 |
| Actuator (Control) | 26 |
| Control System | 25 |

## Prerequisites

This chapter builds on concepts from:

- [1. Foundations of Systems Thinking](../01-foundations-of-systems-thinking/index.md)
- [4. Feedback, Delay, and Loop Dynamics](../04-feedback-delay-and-loop-dynamics/index.md)

---

## Introduction

Chapter 4 closed with a preview: causal loop diagrams show a loop's structure beautifully, but they're silent about *how much* is accumulating and *how fast*. This chapter puts that missing piece in place. You'll learn to model a system as stocks — accumulated quantities — connected by flows that add to or drain them, and you'll see why this simple pair of ideas explains constraints, bottlenecks, and the goal-seeking behavior of a thermostat or a thermostat-like body, all with the same small vocabulary.

!!! mascot-welcome "The Missing Piece: How Much, How Fast"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Ready to add numbers to your loops? Stocks and flows are how systems thinkers turn "this causes that" into "and here's exactly how much, and how quickly." Let's zoom out and see the whole system!

## Stock and Flow: The Two Building Blocks

A **stock** is a quantity that accumulates over time and can be measured at a single instant, even if every process feeding or draining it stopped completely right now. A **flow** is a rate of movement into or out of a stock, measured not at an instant but over an interval of time — you can't meaningfully ask "how much flow is there right now," only "how much flow per minute, or per year."

The distinction is easiest to feel through a photograph-versus-video test. A stock is like something a single photograph can capture completely: the water level in a bathtub, the number of people in a building, the dollar amount in a bank account. Freeze time, and the stock's value is still perfectly well-defined. A flow is like something only a video can capture: the rate water is running from the faucet, the rate people are walking through a door, the rate interest is being credited. Freeze time on a flow, and the question stops making sense — a single instant has no "per minute" in it.

!!! mascot-tip "The One-Question Stock-or-Flow Test"
    ![Sage pointing helpfully](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Unsure whether something is a stock or a flow? Ask: "Could I measure this with a single frozen snapshot?" If yes, it's a stock. If the quantity only makes sense measured over a stretch of time — a *per* something — it's a flow.

An **inflow** is a flow that adds to a stock, increasing its accumulated amount. An **outflow** is a flow that drains a stock, decreasing its accumulated amount. In a bank account, a paycheck deposit is an inflow; a rent payment is an outflow. In a bathtub, the faucet is an inflow and the drain is an outflow. **Accumulation** is the process by which a stock's level changes over time as the net result of its inflows and outflows — mathematically, a stock at any moment equals whatever it started at, plus everything that has flowed in, minus everything that has flowed out, up to that moment:

\[ \text{Stock}(t) = \text{Stock}(0) + \int_0^t \big(\text{Inflow}(\tau) - \text{Outflow}(\tau)\big)\, d\tau \]

That equation looks more intimidating than the idea actually is. Suppose a bank account starts with $500, and receives a steady $200 inflow each month while a fixed $50 outflow leaves each month for a subscription. After 3 months, accumulation is just arithmetic: $500 + (3 × $200) − (3 × $50) = $500 + $600 − $150 = $950. The integral sign in the equation above is only doing, for a continuously flowing quantity, what that multiplication just did for three discrete months — adding up net flow over an interval.

The MicroSim below is the bathtub metaphor made interactive: drag the source and drain sliders and watch the water level — the stock — respond, while a chart tracks its height over time so you can see accumulation happening rather than just calculating it.

#### Diagram: Bathtub Stock and Flow Simulator

<iframe src="https://dmccreary.github.io/microsims/sims/bathtub/bathtub.html" width="100%" height="480px" scrolling="no"></iframe>

[Run the Bathtub MicroSim fullscreen](https://dmccreary.github.io/microsims/sims/bathtub/bathtub.html){ .md-button }

<details markdown="1">
<summary>Bathtub Stock and Flow Simulator (reused MicroSim)</summary>
Type: microsim
**sim-id:** bathtub<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/microsims/sims/bathtub/bathtub.html<br/>
**Source Repo:** https://github.com/dmccreary/microsims/tree/main/docs/sims/bathtub

Reused from the MicroSim catalog (WHAT match score 0.78). A source-flow-rate slider and a drain-flow-rate slider each control a pipe into and out of a drawn bathtub; the water height (the stock) updates live and a running chart plots height over time, making accumulation directly visible rather than merely described. Learning objective: given independently adjustable inflow and outflow rates, the learner will predict whether a stock rises, falls, or holds steady (Bloom: Applying).
</details>

## Buffers: A Stock That Absorbs Variability

A **buffer** is a stock whose main job is absorbing the difference between an uneven inflow and a steadier required outflow (or the reverse), so that variability upstream doesn't have to be handled downstream. A warehouse's inventory shelf is a buffer: a factory might ship products in irregular batches — 400 units one week, 150 the next — but the inventory buffer lets a store sell at a steady 50-units-a-day pace regardless, because the shelf absorbs the mismatch between lumpy arrivals and smooth demand. Without that buffering stock, every hiccup in the factory's shipping schedule would immediately become a hiccup on the store's shelves, and a bad shipping week would mean empty shelves that same week rather than a manageable dip in the warehouse's reserve.

## Rate of Change and the Bigger Picture

A **rate of change** is how quickly a quantity's value is increasing or decreasing, and for a stock, it's nothing more than the net of its flows — inflow minus outflow at that moment. Try this directly on the simulator above: set the source slider higher than the drain slider, and the water height's rate of change is positive (rising); set them equal, and the rate of change is zero even though water is still actively moving through the tub.

Once you can see any system as stocks accumulating through flows, you have the core move behind an entire field. **Systems dynamics** (sometimes called "system dynamics") is the discipline of modeling and simulating real systems as networks of interacting stocks and flows, in order to understand and predict their behavior over time — a discipline founded by Jay Forrester at MIT in the 1950s, originally to help a manufacturer understand why its inventory kept swinging wildly even though nobody was doing anything obviously wrong. A **stock and flow model** is the specific structure at the center of that discipline: a complete diagram showing every relevant stock, every inflow and outflow connected to it, and the rules governing how fast each flow moves — the systems-dynamics equivalent of a causal loop diagram, but numeric enough to actually simulate rather than only reason about qualitatively.

A small supply chain shows what a stock and flow model looks like once it has more than one stock in it. "Raw Materials" is a stock that an ordering flow fills and a manufacturing flow drains; the manufacturing flow is simultaneously the inflow to a second stock, "Finished Goods," which a shipping flow then drains. Nothing here is more complicated than the bathtub — it's simply two bathtubs, plumbed so that one tub's drain is the next tub's faucet. Forrester's original manufacturer discovered exactly this kind of chained structure was the culprit behind its swinging inventory: a delay in the ordering flow (Chapter 4's system delay again) meant raw materials kept arriving based on demand from weeks earlier, well after that demand had already changed.

## Three Advanced Stock-and-Flow Patterns

Beyond a single stock with a couple of flows, systems dynamicists have named a few recurring structural patterns worth recognizing on sight.

An **aging chain** is a sequence of stocks connected end to end, where a flow moves members from one stock into the next as they age or advance through defined stages — a structure that shows up whenever a population moves through ordered categories over time. A university models its student body as an aging chain: a stock of freshmen flows into a stock of sophomores a year later, sophomores flow into juniors, juniors into seniors, and seniors eventually flow out as graduates.

A **co-flow** is a second, linked stock that accumulates in parallel with a primary stock, tracking some attribute that travels along with the primary quantity rather than driving it directly. A factory tracking both "units produced" (the primary stock) and "cumulative defects produced" (the co-flow) is a common example: every unit that flows into the first stock carries some probability of also contributing to the second, so the two stocks move together without either one causing the other outright.

A **conveyor model** is a stock-and-flow structure representing a delay with a fixed transit time — everything that enters takes exactly the same amount of time to come back out, like items riding a physical conveyor belt from one end to the other. This is Chapter 4's system delay given precise mathematical form: instead of just saying "there's a delay," a conveyor model specifies exactly how long, and guarantees that whatever went in first comes out first. A mortgage is an everyday conveyor model: a 30-year fixed loan is a stock of unpaid principal that a fixed monthly outflow drains on a rigid schedule — the transit time (30 years) is set the day the loan is signed and doesn't shift with anything that happens afterward, unlike an aging chain, where members can move between stages at a rate that varies with real-world conditions.

The following table reinforces how these three patterns differ, now that each has been defined and illustrated in prose:

| Pattern | What moves | Defining feature |
|---|---|---|
| Aging chain | Members progress through ordered stocks | Advancement is staged (freshman → sophomore → …) |
| Co-flow | A tracked attribute travels alongside a primary stock | Two stocks move together, one riding on the other |
| Conveyor model | Items travel a fixed transit time | Guarantees a specific, uniform delay length |

## Bottlenecks, Constraints, and Limiting Factors

Every flow in a real system has a maximum rate it can sustain, and when several flows are chained together, the slowest one determines what the whole chain can actually produce. A **bottleneck** is the specific stage in a chain of connected processes whose maximum flow rate is lower than every other stage's, so that it alone limits the throughput of the entire chain regardless of how fast the other stages could go. A **constraint** is the more general term for anything that limits a system's flow rate or performance, whether or not it's part of a visible chain of stages — a bottleneck is always a constraint, but a constraint (a permit requirement, a safety regulation, a fixed budget) doesn't have to be a stage in a pipeline. A **limiting factor** is the specific input or resource, out of everything a process needs, that runs out first and thereby caps output — a term borrowed from biology, where it originally described whichever nutrient a plant runs short of first, no matter how much of everything else is available.

A coffee shop assembly line makes the distinctions concrete. Suppose the espresso machine can produce 40 shots per hour, the barista steaming milk can prepare 30 drinks per hour, and the register can ring up 60 orders per hour. The milk-steaming stage is the bottleneck — at 30 drinks per hour, it caps the whole shop's output below what either the espresso machine or the register could otherwise sustain, even though neither of those other stages is doing anything wrong. If a new city ordinance also capped the shop at 25 customers seated at once, that ordinance would be a constraint on the business, but not a bottleneck, since it isn't a stage in the drink-making chain at all — it constrains the business a different way. And if the shop simply ran out of milk entirely one morning, milk would be that day's limiting factor: the one input that ran out first and set that day's true ceiling, regardless of the shop's normal bottleneck.

| Term | Scope | Coffee shop example |
|---|---|---|
| Bottleneck | The slowest stage in a chain of processes | Milk-steaming station (30 drinks/hour) |
| Constraint | Anything limiting performance, chain or not | A seating-capacity ordinance |
| Limiting factor | Whichever needed input runs out first | Running out of milk for the day |

!!! mascot-tip "Find the Bottleneck by Finding the Line"
    ![Sage pointing helpfully](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Want to find a bottleneck fast in any real process? Look for where things pile up and wait. Whatever stage has the longest queue building up in front of it is almost always the one capping the whole system's throughput.

## Equilibrium, Steady State, and Dynamic Equilibrium

Three closely related terms describe a system that has, in some sense, stopped changing — but they emphasize slightly different things, and it's worth keeping them straight. **Equilibrium** is the general condition in which a stock's inflow exactly equals its outflow, so the stock's net change is zero at that moment — the broadest of the three terms, borrowed from physics and economics as much as from systems dynamics. **Dynamic equilibrium** is the specific, more interesting case of equilibrium in which that balance is maintained by active, ongoing, nonzero flows rather than by everything simply stopping — the bathtub simulator above sits in dynamic equilibrium whenever you set both sliders to the same nonzero value, with water constantly moving through the tub even as its level holds perfectly steady. **Steady state** is a systems-level term for a system, often containing many stocks and flows at once, whose overall pattern of behavior has settled and stopped changing over an extended interval — a factory can be described as running in a steady state once its daily output, staffing, and inventory levels have all stopped drifting, even though within any single day plenty of individual units are still being made, shipped, and consumed.

!!! mascot-thinking "Equilibrium Doesn't Mean Nothing Is Happening"
    ![Sage thinking with a raised wing](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Here's the idea worth sitting with: a system can be in perfect equilibrium while enormous amounts of activity are underway inside it. A packed highway moving at a constant, unchanging traffic density is in dynamic equilibrium — cars are continuously entering and exiting, yet the *stock* of cars on that stretch of road never changes. Equilibrium describes the stock, not the flows.

A subscription business makes the same point with numbers instead of cars. Suppose a streaming service gains 1,200 new subscribers every month and loses 1,200 existing subscribers to cancellation every month. Its stock of total subscribers is in dynamic equilibrium — flat as a line on a chart — even though 2,400 people are actively signing up or leaving each month. Contrast that with a business that gains zero and loses zero: also equilibrium by the definition above, but a static, trivial version of it, with no activity to speak of. Both companies show the identical flat line in their monthly subscriber report; only one of them has an active churn problem worth investigating.

!!! mascot-warning "Don't Mistake Equilibrium for a Frozen System"
    ![Sage holding up a wing in caution](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common mistake is assuming a system at equilibrium has no flows worth analyzing, and stopping your investigation there. Always check whether the balance is trivial (both flows near zero, truly static) or dynamic (real flows, actively matched) — the two look identical on a graph of the stock's level, but they respond very differently to a disruption of just one flow.

## Homeostasis, Set Points, and Goal-Seeking Behavior

Some systems don't just happen to sit at equilibrium — they're structured specifically to seek one out and return to it after a disturbance. **Homeostasis** is the maintenance of a stable internal state by an organism or system through active self-regulation, the biological name for exactly this behavior — your body sweating to cool down, a company adjusting staffing to hold a target headcount, both count. A **set point** is the specific target value that a self-regulating system is structured to hold or return to — the reference value everything else in the system is measured against. Human body temperature is a textbook set point: the body is built to hold roughly 98.6°F (37°C), and a fever of 101°F doesn't reset that target, it's a sign the regulating system is temporarily fighting to hold the set point against an infection. **Goal-seeking behavior** is the observable pattern that results: a system's stock moving toward its set point whenever a disturbance pushes it away, the exact behavior Chapter 3 described as a balancing loop's signature and Chapter 4 connected to negative feedback. A car's cruise control shows the same pattern outside biology: set a target speed of 65 mph, and hitting a hill that would normally slow the car down instead triggers more throttle, automatically, until the car's speed is back at 65 — the "goal" of 65 mph is never written down anywhere physical, yet the system's whole behavior bends toward it.

A **self-correcting system** is a system that displays goal-seeking behavior automatically, without any outside intervention needed once it's built — the correction is built into the system's own structure rather than supplied by a person watching and adjusting it each time. Recall the thermostat loop from Chapters 3 and 4: nobody has to notice the room getting cold and manually flip the heater on. The loop's own structure — sensing, comparing to a set point, and acting — does that work by itself.

That sensing-comparing-acting structure has its own standard vocabulary, borrowed from control engineering. A **sensor (control)** is the component of a control system that measures the current value of the variable being regulated. An **actuator (control)** is the component that carries out the corrective action once a gap between the current value and the set point has been detected. A **control system** is the complete arrangement of sensor, set point, comparison, and actuator working together to hold a variable at or near its target. The following table maps this vocabulary onto the thermostat loop you've now seen three times, reinforcing terms already defined above rather than introducing anything new:

| Control-system term | Role in the thermostat loop |
|---|---|
| Set point | Desired Temperature Setpoint |
| Sensor | The thermometer detecting Room Temperature |
| Actuator | The heater producing Heater Output |
| Control system | The full loop: sensor, set point comparison, and actuator together |

!!! mascot-encourage "A Lot of New Structural Vocabulary at Once"
    ![Sage giving an encouraging nod](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    Aging chains, co-flows, conveyor models, sensors, actuators — that's a genuine pile of new terms in one chapter. If they're starting to blur together, that's completely normal; go back to the thermostat and the bathtub, since every single term above can be pointed to on one of those two familiar examples.

## Key Takeaways

You can now model a system's structure with numbers, not just arrows:

- A **stock** accumulates and can be measured at an instant; a **flow** — an **inflow** or **outflow** — is a rate, measured only over an interval. **Accumulation** is a stock's level changing as the net result of its flows over time.
- A **buffer** is a stock that absorbs variability between an uneven process and a steadier one; the **rate of change** of any stock is simply its net flow.
- **Systems dynamics** is the discipline of modeling systems as **stock and flow models**; **aging chains**, **co-flows**, and **conveyor models** are recurring structural patterns within that modeling approach.
- A **bottleneck** is the slowest stage in a chain; a **constraint** is anything limiting performance, chain or not; a **limiting factor** is whichever needed input runs out first.
- **Equilibrium** means a stock's net change is zero; **dynamic equilibrium** means that balance is held by active, matched, nonzero flows; **steady state** describes a whole system's settled pattern over time.
- **Homeostasis**, a **set point**, and **goal-seeking behavior** describe a **self-correcting system** — one built with a **sensor**, an **actuator**, and a **control system** that returns it to target without outside help.

!!! mascot-celebration "You Can Now Model a System, Not Just Describe It"
    ![Sage celebrating with wings raised](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Whoo-hoo! You just went from drawing loops to modeling stocks and flows well enough to spot a bottleneck, tell true equilibrium from a frozen system, and name every part of a self-correcting control loop. Chapter 6 uses this exact structure to explain why growth so often surprises us.
