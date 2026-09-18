---
title: "Mapping Two Schemas to a Canonical Schema"
description: "Match differently-named fields from two source systems to a canonical schema and read each transformation rule."
image: /sims/canonical-schema-mapping/canonical-schema-mapping.png
og:image: /sims/canonical-schema-mapping/canonical-schema-mapping.png
twitter:image: /sims/canonical-schema-mapping/canonical-schema-mapping.png
social:
  cards: false
status: implemented
library: vis-network
bloom_level: Apply
bloom_verb: Identify
chapter: 17
---

# Mapping Two Schemas to a Canonical Schema

<iframe src="main.html" width="100%" height="502" scrolling="no"></iframe>

[Run the Mapping Two Schemas to a Canonical Schema MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Schema matching decides that two differently-named fields mean the same thing. Schema mapping is the executable rule that actually moves the value. This MicroSim separates them: click a field for the matching judgment, click a dashed arrow for the transformation rule - and notice that two fields meaning the same thing can still need different cleanup.

**Learning objective:** Given two source schemas with differently-named fields, the learner will identify which fields correspond to the same canonical concept and state the transformation rule that maps one to the other.

**Bloom's Taxonomy level:** Apply (Identify)

## How To Use

- Click any field box in System A or System B to see why it was matched to a canonical field.
- Click any dashed arrow to see the exact transformation rule it stands for.
- Press "Show All Mappings" for a count of how many source fields feed each canonical field.
- Compare the two email rules - both map to the same field and neither rule is the same.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/canonical-schema-mapping/main.html"
        width="100%" height="502" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows what a database field is
- Has seen two systems that store overlapping data

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Identify which source fields correspond to the same canonical concept
- State the transformation rule for a given mapping
- Explain why matching is a judgment about meaning rather than about spelling

### Suggested Activity (12 minutes)

1. Show only the two source column lists and ask learners which fields correspond.
2. Reveal the canonical column and click through the four matches.
3. Click the two email arrows and ask why the rules differ.
4. Ask how many new rules a third system would require, and why it is two rather than four.
5. Ask what happens if two teams disagree about whether two fields mean the same thing.

### Assessment

Give learners a third source system with fields like customer_full_name and contact_email, and ask for the two mapping rules including any needed transformation.

### Discussion Questions

- Who decides what the canonical definition of 'customer' is?
- What is lost when two fields are declared equivalent and they are not quite?
- Why does the hub pattern from Chapter 18 reappear here?

## Specification

The specification below was extracted from
[Chapter 17: Knowledge Representation and Metadata](../../chapters/17-knowledge-representation-and-metadata/index.md).

```text
Type: graph-model
**sim-id:** canonical-schema-mapping<br/>
**Library:** vis-network<br/>
**Status:** Specified

Learning objective: given two source schemas with differently-named fields, the learner will identify which fields correspond to the same canonical concept and state the transformation rule that maps one to the other (Bloom: Applying).

Canvas: responsive vis-network container, minimum 480px height, full container width, recomputed on window resize.

Visual design: three columns of boxes. Left column labeled "System A: Sales" contains fields `cust_name` and `cust_email`. Middle column labeled "System B: Support" contains fields `full_name` and `email_address`. Right column labeled "Canonical Schema: Person" contains fields `name` and `email`. Dashed arrows connect `cust_name` and `full_name` to `name`, and `cust_email` and `email_address` to `email`.

Interaction: clicking any field box in System A or System B opens an infobox describing schema matching: "This field was matched to the canonical `name`/`email` field because both represent the same real-world concept despite different naming." Clicking any dashed arrow opens an infobox describing schema mapping: the exact transformation rule the arrow represents (for example, "Rule: canonical `name` = System A's `cust_name`" ). A "Show All Mappings" button highlights every arrow simultaneously and displays a summary count of how many source fields map into each canonical field.

Implementation: vis-network with a fixed three-column node layout (no physics simulation needed), click handlers bound to both nodes and edges populating a shared infobox panel.
```

## References

- [Schema matching - Wikipedia](https://en.wikipedia.org/wiki/Schema_matching) - Deciding which elements of two schemas correspond.
- [Canonical model](https://en.wikipedia.org/wiki/Canonical_model) - The design pattern behind a canonical schema.
- [Data mapping](https://en.wikipedia.org/wiki/Data_mapping) - How mapping rules are expressed and executed.

## Related Resources

- [Chapter 17: Knowledge Representation and Metadata](../../chapters/17-knowledge-representation-and-metadata/index.md)
- [All MicroSims in this book](../index.md)
