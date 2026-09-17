---
title: Mapping Two Schemas to a Canonical Schema
description: given two source schemas with differently-named fields, the learner will identify which fields correspond to the same canonical concept and state the transformation rule that maps one to the other (Bloom: Applying).
status: scaffold
library: vis-network
bloom_level: TBD
---

# Mapping Two Schemas to a Canonical Schema



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
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

## Related Resources

- [Chapter 17: Knowledge Representation and Metadata](../../chapters/17-knowledge-representation-and-metadata/index.md)
