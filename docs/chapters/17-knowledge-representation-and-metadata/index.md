---
title: Knowledge Representation and Metadata
description: Entities, attributes, and relationships as the building blocks of knowledge representation, and how schemas, metadata registries, and business glossaries make that representation shareable across an organization.
generated_by: claude skill chapter-content-generator
date: 2026-09-17 17:23:46
version: 1.10
---

# Knowledge Representation and Metadata

## Summary

This chapter introduces entities, attributes, and relationships as the building blocks of knowledge representation, and shows how schemas, metadata registries, and business glossaries make that representation shareable across an organization. It bridges the mathematical graph theory of the previous chapters to enterprise data practice. Students completing this chapter will be able to model a simple domain as entities and relationships with a supporting schema.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Knowledge Representation | 98 |
| Knowledge Base | 3 |
| Entity | 585 |
| Attribute | 175 |
| Relationship (Data Modeling) | 199 |
| Schema | 174 |
| Canonical Schema | 58 |
| Schema Matching | 2 |
| Schema Mapping | 1 |
| Metadata | 67 |
| Metadata Registry | 61 |
| ISO Definition | 5 |
| Data Dictionary | 3 |
| Data Standards | 57 |
| Business Glossary | 2 |

## Prerequisites

This chapter builds on concepts from:

- [1. Foundations of Systems Thinking](../01-foundations-of-systems-thinking/index.md)
- [15. Graph Theory Fundamentals](../15-graph-theory-fundamentals/index.md)
- [16. Graph Database Architecture](../16-graph-database-architecture/index.md)

---

## Introduction

Chapters 15 and 16 gave you the mathematics and the machinery of graphs: vertices, edges, and the databases built to traverse them at speed. This chapter turns to a more human question -- once an organization decides to represent what it knows as a graph, what exactly goes inside each vertex, and how does everyone agree on what those contents mean? That question turns out to have a well-developed answer, borrowed from decades of enterprise data-modeling practice.

!!! mascot-welcome "From Graph Math to Real Knowledge"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    You know how to store a graph -- now let's fill it with something worth knowing. This chapter hands you the building blocks and the shared-meaning tools an entire organization needs before its graph becomes trustworthy. Let's zoom out and see the whole system!

## Knowledge Representation and Knowledge Bases

Before an organization can put anything useful into a graph, it needs a general answer to a foundational question: how should facts about the world be encoded so that a computer can store, retrieve, and reason over them? **Knowledge representation** is the field concerned with encoding facts, concepts, and their relationships in a form that a computer system can store and process -- everything Chapter 15 covered, from RDF triples to ontologies, is one particular technique for doing exactly this. Knowledge representation is the umbrella discipline; RDF, property graphs, and ontologies are specific tools underneath it.

Once facts have actually been encoded this way and collected together, the resulting collection has its own name. A **knowledge base** is a structured collection of facts and relationships, represented so that software can query and reason over it, rather than a loose pile of documents a human must read to extract meaning. A company's product catalog stored as connected, machine-readable facts -- this product *hasComponent* that part, this part *suppliedBy* that vendor -- is a knowledge base; the same information as a stack of PDF spec sheets is not, even though a human reader could extract identical facts from either one.

## Entities, Attributes, and Relationships: The Building Blocks

Every knowledge base, no matter how it is technically stored, is built from the same three ingredients, and getting comfortable with this vocabulary is the single most useful skill this chapter offers. An **entity** is a distinct, identifiable thing that an organization wants to represent and reason about -- a customer, a product, an employee, a supplier, a piece of equipment. An entity is the data-modeling world's name for exactly what Chapter 15 called a vertex: one member of the set of things being represented, just described in the vocabulary a business analyst rather than a mathematician would use.

An entity on its own is nearly empty -- useful modeling requires describing what is actually true about it. An **attribute** is a named property that describes a characteristic of an entity, holding a specific value for that entity -- a Customer entity's `name`, `email`, and `signup date` are each attributes, and for any one specific customer those attributes hold specific values like "Ana Reyes," "ana@example.com," and "2020-03-14." And entities rarely stand alone: a **relationship (data modeling)** is a named, meaningful association between two or more entities, capturing how they relate to each other in the domain being modeled -- a Customer *placedOrder* an Order, an Employee *worksAt* a Department, exactly the kind of connection an edge represents in the underlying graph.

Return to the Ana-and-Acme example Chapter 15 used to introduce property graphs, and every one of these three terms is already visible in it: Ana is an entity, her `age` and `name` are attributes, Acme Corp is a second entity, and `worksAt` is the relationship connecting them -- with its own `since` attribute describing the relationship itself. The diagram below lets you click through this exact example and see each piece labeled.

#### Diagram: Entity-Attribute-Relationship Explorer

<details markdown="1">
<summary>Entity-Attribute-Relationship Explorer</summary>
Type: graph-model
**sim-id:** entity-attribute-relationship-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Learning objective: given a small worked example, the learner will classify each labeled piece of a knowledge representation as an entity, an attribute, or a relationship, and identify which attributes belong to an entity versus to a relationship (Bloom: Analyzing).

Canvas: responsive vis-network container, minimum 480px height, full container width, recomputed on window resize.

Visual design: two large rounded-rectangle vertices labeled "Ana : Person" and "Acme Corp : Company," connected by one labeled directed edge reading "WORKS_AT." Each entity vertex has two small satellite circles drawn near it representing its attributes ("name: Ana," "age: 34" near the Ana vertex; "name: Acme Corp," "industry: Manufacturing" near the Acme Corp vertex). The WORKS_AT edge has one small satellite circle of its own, colored differently from the entity attributes, labeled "since: 2020" -- visually distinguishing an entity's attribute from a relationship's attribute.

Interaction: clicking either large entity vertex opens an infobox reading "Entity: a distinct, identifiable thing being represented" and lists its attributes. Clicking any small attribute circle opens an infobox reading "Attribute: a named property describing a characteristic" and states which entity or relationship it belongs to. Clicking the WORKS_AT edge opens an infobox reading "Relationship: a named, meaningful association between entities" and notes that this relationship itself carries the `since` attribute, not either entity.

Implementation: vis-network with a fixed node/edge dataset (no physics simulation needed), a click event handler bound to every node and edge that populates a shared infobox panel below the canvas.
</details>

!!! mascot-thinking "Entity-Attribute-Relationship Is Graph Vocabulary in Business Clothes"
    ![Sage thinking with a raised wing](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that nothing here is actually new math: an entity is a vertex, a relationship is an edge, and an attribute is exactly the key-value property Chapter 15's property graph already gave both of them. Data modelers and graph theorists arrived at the identical structure from two different directions and gave it two different vocabularies -- once you can translate between them, you can read either community's documentation.

## Schemas: The Blueprint Entities Follow

Knowing that "Customer" is an entity with certain attributes is only useful if that definition is written down somewhere and applied consistently every time a Customer entity is created. A **schema** is the formal structure that defines which entity types, attributes, and relationships are permitted in a knowledge representation, and what data type or constraint each attribute must satisfy -- a schema might state that every Customer entity must have a `name` attribute of type text and may optionally have an `age` attribute of type integer, ruling out a Customer entity with no name at all.

Large organizations rarely have just one schema, and that turns out to be a real problem. Two different departments almost always model the same real-world concept slightly differently -- a sales system's "Client" and a support system's "Customer" may describe the identical person with different field names, different formats, and different optional attributes. A **canonical schema** is a single, organization-wide schema that every department's local schema is expected to map onto, serving as the shared, authoritative structure that lets data from different systems be combined without ambiguity about what each field means.

Getting from several local schemas to one canonical schema requires two distinct steps, each with its own name. **Schema matching** is the process of identifying which fields or entity types in two different schemas correspond to the same real-world concept, even when they are named differently -- recognizing that "Client" in one system and "Customer" in another both refer to the same underlying entity type. **Schema mapping** is the resulting set of explicit transformation rules that convert data from one schema's structure into another's, once schema matching has identified which fields correspond -- the concrete rule "copy `client_full_name` into `customer.name`" is a schema mapping, while the act of figuring out that those two fields *should* be connected in the first place was schema matching.

The diagram below works through exactly this two-step process using two small sample systems and a canonical target schema.

#### Diagram: Mapping Two Schemas to a Canonical Schema

<details markdown="1">
<summary>Mapping Two Schemas to a Canonical Schema</summary>
Type: graph-model
**sim-id:** canonical-schema-mapping<br/>
**Library:** vis-network<br/>
**Status:** Specified

Learning objective: given two source schemas with differently-named fields, the learner will identify which fields correspond to the same canonical concept and state the transformation rule that maps one to the other (Bloom: Applying).

Canvas: responsive vis-network container, minimum 480px height, full container width, recomputed on window resize.

Visual design: three columns of boxes. Left column labeled "System A: Sales" contains fields `cust_name` and `cust_email`. Middle column labeled "System B: Support" contains fields `full_name` and `email_address`. Right column labeled "Canonical Schema: Person" contains fields `name` and `email`. Dashed arrows connect `cust_name` and `full_name` to `name`, and `cust_email` and `email_address` to `email`.

Interaction: clicking any field box in System A or System B opens an infobox describing schema matching: "This field was matched to the canonical `name`/`email` field because both represent the same real-world concept despite different naming." Clicking any dashed arrow opens an infobox describing schema mapping: the exact transformation rule the arrow represents (for example, "Rule: canonical `name` = System A's `cust_name`" ). A "Show All Mappings" button highlights every arrow simultaneously and displays a summary count of how many source fields map into each canonical field.

Implementation: vis-network with a fixed three-column node layout (no physics simulation needed), click handlers bound to both nodes and edges populating a shared infobox panel.
</details>

The table below reinforces this four-concept cluster now that each has been defined and demonstrated.

| Concept | What it is | Sales/Support example |
|---|---|---|
| Schema | The formal structure entities must follow | System A's own definition of a Client record |
| Canonical schema | The single shared, organization-wide schema | The target "Person" schema both systems map onto |
| Schema matching | Identifying which fields correspond | Recognizing `cust_name` and `full_name` mean the same thing |
| Schema mapping | The resulting transformation rule | "Copy `cust_name` into canonical `name`" |

!!! mascot-encourage "Matching and Mapping Are Easy to Mix Up -- That's Normal"
    ![Sage giving an encouraging nod](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If schema matching and schema mapping keep blurring together in your mind, you are in good company -- even experienced data architects use the two terms loosely in conversation. One memory anchor that helps: matching answers "do these correspond?", while mapping answers "how exactly do I convert one into the other?" Matching comes first; mapping is what you build once matching gives you an answer.

## Metadata: Data About Data

A schema tells software what shape an entity must take, but it does not by itself tell a human reader what a field actually *means* in plain language, who owns it, or where its permitted values came from. That broader layer of description has its own long-established name. **Metadata** is data that describes other data -- a field's name, its definition, its data type, its permitted values, its owner, and its origin, none of which is the data itself, all of which is necessary to use that data correctly.

Metadata is only useful at scale if it is collected somewhere consistent rather than scattered across individual developers' memories and outdated wiki pages. A **metadata registry** is a governed, authoritative system of record that stores the approved definitions, formats, and permitted values for an organization's data elements, along with a version history of who approved each definition and when -- the single place a data element's *intended* meaning lives, independent of any one system that happens to store it. This differs sharply from a data catalog, a related but distinct tool that instead records what data actually exists across an organization's systems by scanning and documenting it as it is found -- a metadata registry describes what a field *should* mean; a catalog describes what a field, as actually implemented somewhere, *does* contain.

Writing a good definition for a metadata registry entry is harder than it sounds, and an international standard exists specifically to guide it. An **ISO definition** is a definition written according to ISO/IEC 11179's rules for metadata: precise, concise, and non-circular, meaning it must not use the term being defined, or an obvious variant of it, anywhere in its own text. A poorly written definition of "Customer" as "a person or organization that is a customer of the company" is circular and useless; an ISO-style definition instead reads "a person or organization that has purchased, or is authorized to purchase, a product or service from the organization" -- precise enough to settle a real dispute about who counts.

A simpler, less formally governed cousin of the metadata registry is worth distinguishing too. A **data dictionary** is a document or lightweight tool listing an organization's data elements along with brief definitions and basic format information, without the registry's full versioning, approval workflow, or authority structure -- useful as a quick reference, but not the kind of governed source of truth a metadata registry is built to be.

The diagram below lets you explore how a registry's authoritative definitions and a catalog's discovered, real-world data connect to each other.

#### Diagram: Metadata Registry vs. Catalog

<iframe src="https://dmccreary.github.io/context-graph/sims/registry-vs-catalog/main.html" width="100%" height="580px" scrolling="no"></iframe>

[Run the Registry vs. Catalog MicroSim fullscreen](https://dmccreary.github.io/context-graph/sims/registry-vs-catalog/main.html){ .md-button }

<details markdown="1">
<summary>Metadata Registry vs. Catalog (reused MicroSim)</summary>
Type: graph-model
**sim-id:** registry-vs-catalog<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/context-graph/sims/registry-vs-catalog/main.html<br/>
**Source Repo:** https://github.com/dmccreary/context-graph/tree/main/docs/sims/registry-vs-catalog

Reused from the MicroSim catalog (WHAT match score 0.7565; both catalog and live URL verified working, and the underlying script confirmed generic -- a Registration Authority, Data Element, Value Domain, and Version History on the registry side, a Crawler Bot, discovered table, and quality score on the catalog side, none of it specific to the source repository's own subject area). Clicking any node on the left "Registry" panel reveals what that piece of a governed data-element definition means; clicking any node on the right "Catalog" panel reveals what a discovery tool actually found in a live system; clicking the dashed orange cross-panel link explains how a catalog field's discovered name connects back to the registry's authoritative definition. Learning objective: given a metadata registry and a metadata catalog shown side by side, the learner will distinguish what each one is responsible for and explain how the dashed link between them keeps a discovered field's meaning traceable to its governed definition (Bloom: Analyzing).
</details>

!!! mascot-tip "Write Definitions the ISO Way: Cover the Term's Hand"
    ![Sage pointing helpfully](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    A quick self-check for writing an ISO definition: after drafting it, literally cover up the term you just defined and read only the definition back. If the definition still needs that hidden term, or an obvious variant of it, to make sense, it is circular -- rewrite it using only other, already-understood words.

## Sharing Meaning Across the Organization

Individually governed definitions only deliver their full value once they are applied consistently across every system and every team, which is exactly what the final two concepts in this chapter accomplish. **Data standards** are agreed-upon, often industry-wide conventions for how data should be formatted, coded, or structured -- an ISO 8601 date written as `2026-09-17` rather than "9/17/26" or "17 Sept '26" is a data standard in action, and Chapter 12's discussion of shared, open protocols enabling self-organizing structure applies just as directly to data formats as it did to network protocols.

A **business glossary** is an organization-wide, plain-language reference of business terms and their agreed meanings, written for business staff rather than for database engineers -- where a metadata registry's ISO definition of "Customer" is precise enough to resolve a technical dispute, a business glossary entry for the same term is written so that a sales representative, a finance analyst, and a customer-support agent can all read it and agree they mean the same thing by the word.

The table below reinforces this closing cluster of concepts, tying the whole chapter's building blocks together.

| Concept | Scope | Written for |
|---|---|---|
| Metadata | A single field's descriptive facts | Whoever needs that one field's details |
| Metadata registry | An organization's governed, versioned field definitions | Data architects and stewards |
| Data dictionary | A lightweight, informal field reference | Developers needing a quick lookup |
| Data standards | Shared formatting and coding conventions | Every system exchanging data |
| Business glossary | Plain-language term definitions | Business staff across departments |

## Key Takeaways

You can now model a simple domain with the standard building blocks of knowledge representation, and describe the shared-meaning infrastructure that keeps that model consistent across an organization:

- **Knowledge representation** encodes facts so software can reason over them, producing a **knowledge base** built from three ingredients: **entities**, their **attributes**, and the **relationships (data modeling)** connecting them -- the same structure Chapter 15 called vertices, properties, and edges.
- A **schema** defines what shape those entities must take; a **canonical schema** gives an entire organization one shared shape to map onto, reached through **schema matching** (finding correspondences) followed by **schema mapping** (writing the transformation rules).
- **Metadata** describes data about data, governed authoritatively in a **metadata registry** and written precisely using **ISO definition** style, or kept more informally in a **data dictionary**.
- **Data standards** and a **business glossary** extend consistent meaning beyond any one system, to every team and every format an organization uses.

!!! mascot-celebration "You Can Now Model a Domain and Govern Its Meaning"
    ![Sage celebrating with wings raised](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Whoo-hoo! From a single entity's attributes all the way to an organization-wide business glossary, you now have the full knowledge-representation toolkit -- and you can explain not just how to model a domain, but how to keep everyone's understanding of it aligned. Next up: the relational-database habits and governance practices most organizations already have in place before they ever add a knowledge graph.
