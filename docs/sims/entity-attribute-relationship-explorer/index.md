---
title: "Entity-Attribute-Relationship Explorer"
description: "Classify every piece of a small knowledge representation as an entity, an attribute, or a relationship - including the attribute that belongs to the edge."
image: /sims/entity-attribute-relationship-explorer/entity-attribute-relationship-explorer.png
og:image: /sims/entity-attribute-relationship-explorer/entity-attribute-relationship-explorer.png
twitter:image: /sims/entity-attribute-relationship-explorer/entity-attribute-relationship-explorer.png
social:
  cards: false
status: implemented
library: vis-network
bloom_level: Analyze
bloom_verb: Classify
chapter: 17
---

# Entity-Attribute-Relationship Explorer

<iframe src="main.html" width="100%" height="502" scrolling="no"></iframe>

[Run the Entity-Attribute-Relationship Explorer MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Entities, attributes and relationships are easy to define and easy to misapply. The hard case is the attribute that belongs to a relationship rather than to either thing it connects: Ana did not start in 2020, and neither did Acme Corp - the employment did. This MicroSim puts that case on screen in its own color.

**Learning objective:** Given a small worked example, the learner will classify each labeled piece of a knowledge representation as an entity, an attribute, or a relationship, and identify which attributes belong to an entity versus to a relationship.

**Bloom's Taxonomy level:** Analyze (Classify)

## How To Use

- Click either large blue box to classify it as an entity and list its attributes.
- Click any small green circle to see which entity that attribute belongs to.
- Click the orange circle and read why 'since: 2020' belongs to the relationship, not to either entity.
- Click the WORKS_AT arrow itself for the definition of a relationship.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/entity-attribute-relationship-explorer/main.html"
        width="100%" height="502" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Has seen a data model with tables or nodes
- Knows what a field or property is

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Classify an element as an entity, an attribute, or a relationship
- Identify which thing a given attribute belongs to
- Explain why relationship attributes are awkward in models that only allow entity attributes

### Suggested Activity (12 minutes)

1. Show the diagram with all labels hidden and ask learners to classify each shape.
2. Click each element in turn and compare to the classification.
3. Ask the test question: start of what? The answer names the relationship.
4. Ask how a relational database would store 'since: 2020' and what it would have to invent.
5. Have learners model a fact from their own work with at least one relationship attribute.

### Assessment

Give learners a sentence such as 'Sam has been borrowing this book since March' and ask them to name the entities, the relationship, and which attribute belongs where.

### Discussion Questions

- Why do relationship attributes force relational models to invent extra tables?
- What other real facts belong to a relationship rather than to either party?
- When is it worth promoting a relationship to an entity of its own?

## Specification

The specification below was extracted from
[Chapter 17: Knowledge Representation and Metadata](../../chapters/17-knowledge-representation-and-metadata/index.md).

```text
Type: graph-model
**sim-id:** entity-attribute-relationship-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Learning objective: given a small worked example, the learner will classify each labeled piece of a knowledge representation as an entity, an attribute, or a relationship, and identify which attributes belong to an entity versus to a relationship (Bloom: Analyzing).

Canvas: responsive vis-network container, minimum 480px height, full container width, recomputed on window resize.

Visual design: two large rounded-rectangle vertices labeled "Ana : Person" and "Acme Corp : Company," connected by one labeled directed edge reading "WORKS_AT." Each entity vertex has two small satellite circles drawn near it representing its attributes ("name: Ana," "age: 34" near the Ana vertex; "name: Acme Corp," "industry: Manufacturing" near the Acme Corp vertex). The WORKS_AT edge has one small satellite circle of its own, colored differently from the entity attributes, labeled "since: 2020" -- visually distinguishing an entity's attribute from a relationship's attribute.

Interaction: clicking either large entity vertex opens an infobox reading "Entity: a distinct, identifiable thing being represented" and lists its attributes. Clicking any small attribute circle opens an infobox reading "Attribute: a named property describing a characteristic" and states which entity or relationship it belongs to. Clicking the WORKS_AT edge opens an infobox reading "Relationship: a named, meaningful association between entities" and notes that this relationship itself carries the `since` attribute, not either entity.

Implementation: vis-network with a fixed node/edge dataset (no physics simulation needed), a click event handler bound to every node and edge that populates a shared infobox panel below the canvas.
```

## References

- [Entity-relationship model - Wikipedia](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model) - Peter Chen's model and its three basic constructs.
- [Property graph](https://en.wikipedia.org/wiki/Graph_database) - The model where edges can carry properties natively.
- [Associative entity](https://en.wikipedia.org/wiki/Associative_entity) - The workaround relational models need for relationship attributes.

## Related Resources

- [Chapter 17: Knowledge Representation and Metadata](../../chapters/17-knowledge-representation-and-metadata/index.md)
- [All MicroSims in this book](../index.md)
