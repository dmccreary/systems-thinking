---
title: Leverage Points Iceberg
description: An interactive visualization of Donella Meadows' 12 Leverage Points using the iceberg metaphor, showing that deep interventions are hidden but transformative.
---

# Leverage Points Iceberg

<iframe src="main.html" height="560" width="100%" scrolling="no"></iframe>

[Run the Leverage Iceberg MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This Visualization

This interactive iceberg diagram illustrates **Donella Meadows' 12 Leverage Points**—a framework for understanding where to intervene in complex systems to create meaningful change.

### The Iceberg Metaphor

Just like a real iceberg, the most visible interventions (numbers, regulations, quick fixes) are above the waterline—easy to see and reach, but representing only a fraction of the system's dynamics.

The deeper you go:

- **Harder to reach** — requires more effort, time, and persistence
- **More transformative** — creates lasting, systemic change
- **Less visible** — operates on structures, goals, and beliefs that most people never question

### How to Use

1. **Hover** over any layer of the iceberg to see detailed information about that leverage point
2. **Click** any layer to navigate to its full explanation in [Chapter 6: Looking for Leverage](../../chapters/06-looking-for-leverage/index.md)
3. Notice how the iceberg **widens** as you go deeper—representing the expanding scope of impact

### The Four Zones

| Zone | Levels | Description |
|------|--------|-------------|
| **Shallow** | 12-10 | Parameters, stocks, regulations—easy but limited impact |
| **Structural** | 9-7 | Feedback loops, information, rules—harder but lasting |
| **Deep** | 6-5 | Power structures, system goals—systemic transformation |
| **Transformative** | 4-1 | Paradigms and transcendence—revolutionary change |

## Embedding This MicroSim

You can include this visualization on your website using the following iframe:

```html
<iframe
  src="https://dmccreary.github.io/ethics-course/sims/leverage-iceberg/main.html"
  height="660"
  width="100%"
  scrolling="no"
  style="border: 1px solid #ddd; border-radius: 8px;">
</iframe>
```

## Educational Context

### Learning Objectives

By interacting with this visualization, students will:

- Understand the hierarchy of intervention effectiveness in complex systems
- Recognize why surface-level interventions often fail to create lasting change
- Identify which leverage level is appropriate for different change strategies
- Connect each leverage point to real-world examples and actors

### Bloom's Taxonomy Levels

- **Understand (L2)**: Grasp the hierarchy and why some interventions are more powerful
- **Apply (L3)**: Use the framework to analyze intervention strategies
- **Analyze (L4)**: Evaluate which leverage points apply to specific problems

### Related Concepts

- [Donella Meadows' 12 Leverage Points](../../chapters/06-looking-for-leverage/index.md#donella-meadows-12-leverage-points-your-field-guide)
- [Systemic Drivers of Harm](../../chapters/06-looking-for-leverage/index.md#systemic-drivers-of-harm-beyond-individual-industries)
- Systems Archetypes
- Feedback Loops
- Paradigm Shifts

## Source

Based on Donella Meadows' seminal essay "Leverage Points: Places to Intervene in a System" (1999), later expanded in her book *Thinking in Systems: A Primer* (2008).

## Technical Notes

- Built with p5.js 1.11.10
- Width-responsive design
- Animated waterline and deep-layer glow effects
- Click navigation to chapter anchors
