---
title: Entity-Attribute-Relationship Explorer
description: given a small worked example, the learner will classify each labeled piece of a knowledge representation as an entity, an attribute, or a relationship, and identify which attributes belong to an entity versus to a relationship (Bloom: Analyzing).
status: scaffold
library: vis-network
bloom_level: TBD
---

# Entity-Attribute-Relationship Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
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

## Related Resources

- [Chapter 17: Knowledge Representation and Metadata](../../chapters/17-knowledge-representation-and-metadata/index.md)
