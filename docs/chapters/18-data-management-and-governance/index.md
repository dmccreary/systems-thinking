---
title: Data Management and Governance
description: The relational database concepts, warehousing architecture, integration practices, and data governance disciplines an enterprise typically has in place before adopting a knowledge graph.
generated_by: claude skill chapter-content-generator
date: 2026-09-17 17:27:00
version: 1.10
---

# Data Management and Governance

## Summary

This chapter covers the relational database concepts -- primary and foreign keys, normalization, star schemas, and data warehousing -- an enterprise typically has in place before adopting a knowledge graph, along with ETL, data integration, and API-based interoperability. It closes with the data governance and quality practices, including data stewardship and lineage, needed to keep a knowledge graph trustworthy. Students completing this chapter will be able to describe the data quality and governance practices that make a knowledge graph reliable.

## Concepts Covered

This chapter covers the following 24 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Relational Database | 23 |
| Primary Key | 2 |
| Foreign Key | 1 |
| Normalized Data Model | 18 |
| Denormalized Data Model | 8 |
| Star Schema | 6 |
| Data Mart | 3 |
| Central Data Warehouse | 2 |
| Data Lake | 1 |
| Data Integration | 24 |
| Data Integration Cost | 1 |
| ETL Process | 1 |
| API | 2 |
| Interoperability | 1 |
| Single Source Of Truth | 1 |
| Data Quality | 15 |
| Data Governance | 13 |
| Data Stewardship | 2 |
| Data Steward | 1 |
| Data Lineage | 2 |
| Entity Resolution | 10 |
| Master Data Management | 7 |
| Low-Resolution Data Model | 1 |
| Data Denormalization | 1 |

## Prerequisites

This chapter builds on concepts from:

- [16. Graph Database Architecture](../16-graph-database-architecture/index.md)
- [17. Knowledge Representation and Metadata](../17-knowledge-representation-and-metadata/index.md)

---

## Introduction

Chapters 16 and 17 described graph databases and the entity-attribute-relationship vocabulary used to model knowledge. Almost no organization builds a knowledge graph on a blank slate, though -- it gets layered on top of decades of relational databases, spreadsheets, warehouses, and integration pipelines that already exist. This chapter surveys that existing terrain: the relational habits most enterprises already have, the practices that move data between systems, and the governance disciplines that keep all of it trustworthy enough to build anything reliable on top of.

!!! mascot-welcome "The Foundation Already Under Your Feet"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Before any organization adds a shiny new knowledge graph, it has years of relational databases, warehouses, and governance habits already running -- and understanding those habits is what makes a knowledge graph project succeed instead of becoming one more disconnected silo. Let's zoom out and see the whole system!

## Relational Databases: The Foundation Most Enterprises Already Have

Chapter 16 introduced graph databases by contrasting them with an older, far more common kind of database. A **relational database** is a database that organizes data into tables of rows and columns, with relationships between tables expressed through shared key values rather than through direct pointer references -- the RDBMS whose JOIN operations Chapter 16 already examined. Nearly every enterprise application built before the last decade, and a great many built since, stores its data this way.

Two special kinds of column make relational tables work at all. A **primary key** is a column, or combination of columns, whose value uniquely identifies each row in a table -- no two rows may share the same primary key value, which is what lets other tables refer to a specific row unambiguously. A **foreign key** is a column in one table that stores the primary key value of a row in another table, creating a reference between the two rows without duplicating the referenced row's data. A Customers table might use `customer_id` as its primary key; an Orders table then stores that same `customer_id` value as a foreign key in each order row, letting the database know precisely which customer placed which order without repeating that customer's name and address on every single order.

## Shaping the Model: Normalization and Denormalization

Once primary and foreign keys let tables reference each other, a designer still has to decide how much to split data across separate tables versus how much to combine into fewer, wider ones -- and that decision has real performance and maintenance consequences in both directions. A **normalized data model** is a relational design that splits data into multiple linked tables specifically to eliminate redundant storage of the same fact, so that each piece of information is recorded in exactly one place and updating it never requires touching more than one row. Storing a customer's address once in a Customers table, referenced by every order through a foreign key, rather than repeating that address on every order row, is normalization in action -- change the address once, and every order automatically reflects the update.

That same design has a cost: answering "show me each order's full shipping address" now requires an RDBMS JOIN back to the Customers table, and Chapter 16 already showed how expensive repeated joins become. A **denormalized data model** is a relational design that deliberately combines data from multiple tables into fewer, wider tables, accepting some redundant storage in exchange for faster reads that avoid joins altogether. **Data denormalization** is the specific act of transforming a normalized model into a denormalized one -- typically performed when a reporting or analytics workload cares more about read speed than about storage efficiency or update simplicity. A **low-resolution data model** takes this trade-off one step further by discarding row-level detail entirely, storing only pre-aggregated summaries -- a table of monthly sales totals per region, for instance, rather than every individual transaction -- trading the ability to answer detailed questions for dramatically smaller storage and faster answers to the aggregate questions it was built for.

The table below reinforces this trade-off cluster using one running example: a company's order history.

| Model | Order-history example | Optimized for |
|---|---|---|
| Normalized data model | Customers, Orders, and OrderItems in three linked tables | Consistent updates, no redundant data |
| Denormalized data model | One wide table combining customer name, order, and item data | Fast reads, fewer joins |
| Low-resolution data model | One row per region per month, pre-summed | Very fast aggregate reporting only |

!!! mascot-thinking "Normalize for Writes, Denormalize for Reads"
    ![Sage thinking with a raised wing](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Here is the mental model worth keeping: normalization optimizes for a system that updates data constantly and needs every update to be consistent everywhere at once, while denormalization optimizes for a system that reads far more often than it writes and can tolerate some redundancy. Neither one is simply "better" -- the right choice depends entirely on whether your workload writes or reads more.

## Analytical Storage: Warehouses, Marts, Lakes, and Star Schemas

Operational databases like the normalized Orders table above are built to process one transaction at a time quickly. Answering big-picture analytical questions -- total revenue by region over the last five years -- usually means copying data out of many operational systems into storage purpose-built for analysis instead. A **central data warehouse** is a large, organization-wide repository that consolidates data from many operational systems into one place, structured specifically to support analytical queries across the whole enterprise rather than the fast single-record lookups an operational database favors. A **data mart** is a smaller, department- or subject-specific subset of a data warehouse, built to serve one team's analytical needs -- a marketing data mart, drawn from the central warehouse, without every table the finance team also relies on.

Not every organization pours data straight into a structured warehouse before analyzing it. A **data lake** is a large storage repository that holds data in its original, raw format -- structured, semi-structured, or entirely unstructured -- without requiring it to be organized into a predefined schema before it is stored, deferring that structuring decision until the data is actually used. A data lake trades the data warehouse's immediate, query-ready structure for the flexibility to store anything first and decide how to model it later.

Within a data warehouse or mart, one particular table layout is common enough to have its own name. A **star schema** is a data-warehouse table design with one central "fact" table of measurable events (like individual sales) surrounded by several "dimension" tables of descriptive context (like product, customer, and date), resembling a star when diagrammed, and optimized specifically for the kind of aggregate, slice-and-dice analytical queries a data warehouse exists to answer.

The diagram below traces data's full journey from raw source through this analytical storage layer.

#### Diagram: Data Ingestion Pipeline -- From Lake to Warehouse to Mart

<details markdown="1">
<summary>Data Ingestion Pipeline -- From Lake to Warehouse to Mart</summary>
Type: diagram
**sim-id:** data-warehouse-pipeline<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/organizational-analytics/tree/main/docs/sims/data-ingestion-pipeline

Learning objective: given a data pipeline from raw source to analytical storage, the learner will sequence a data lake, an ETL process, a central data warehouse, a data mart, and a star schema in their correct order and explain what each stage adds (Bloom: Understanding).

Canvas: 700x420 pixels, responsive -- recompute canvas width from the containing element on window resize.

Visual design: five labeled boxes arranged left to right and connected by arrows: "Source Systems," "Data Lake (raw)," "ETL Process," "Central Data Warehouse (star schema)," and "Data Marts (Marketing, Finance)." The Central Data Warehouse box contains a small inset star-schema icon: one fact-table box surrounded by four smaller dimension-table boxes.

Interaction: clicking any of the five main boxes opens an infobox defining that stage and naming the concept it represents. Clicking the inset star-schema icon opens a second-level infobox distinguishing the central fact table from its surrounding dimension tables. A "Animate Flow" button animates a small data-packet icon traveling left to right through all five stages in sequence, pausing briefly at each one.

Implementation: p5.js, canvas parented to `document.querySelector('main')`, `updateCanvasSize()` called first in `setup()` per this book's MicroSim conventions, fixed layout (no physics simulation required).
</details>

## Getting Data From Everywhere: Integration, ETL, APIs, and Interoperability

Filling a data lake or warehouse in the first place means pulling data out of many separate operational systems, and that process is itself a major discipline. **Data integration** is the practice of combining data from multiple, separately built systems into a unified view, resolving differences in format, meaning, and structure along the way -- exactly the schema-matching and schema-mapping work Chapter 17 described, now applied at the scale of an entire organization's systems. The concrete mechanism most commonly used to move and reshape that data is an **ETL process**: Extract data from a source system, Transform it into the target structure, and Load it into its destination -- a data warehouse, a data lake, or another operational system.

Two systems rarely exchange data by directly reading each other's internal databases; instead, they typically expose a controlled, well-documented interface for the purpose. An **API** (Application Programming Interface) is a defined set of rules and endpoints that lets one software system request data or functionality from another without needing to know how that other system stores or computes it internally. When many systems can exchange data and functionality this way without custom, one-off translation code for every single pair, an organization has achieved **interoperability**: the capacity of different systems to work together and exchange data effectively, typically enabled by shared APIs and shared data standards like the ones Chapter 17 introduced.

Integration cost does not grow gently as more systems join the picture -- it grows the same way edge count grows in a graph, and Chapter 15's own vocabulary explains exactly why. **Data integration cost** is the total effort required to build and maintain the connections between an organization's systems, and it rises sharply as the number of systems grows if each pair of systems is connected directly: with \( n \) systems each needing a direct, custom connection to every other system, the number of connections required is \( \binom{n}{2} = \frac{n(n-1)}{2} \) -- 10 systems require 45 separate point-to-point connections, and 20 systems require 190. Introducing one shared hub that every system connects to instead -- exactly the canonical-schema role Chapter 17 described -- reduces that same 20-system organization to just 20 connections, one per system, no matter how many systems eventually join.

That hub is only worth building if everyone agrees to treat it as authoritative once it exists. A **single source of truth** is the principle that for any given piece of data, one designated system or record is treated as the authoritative version, with every other copy understood to be derived from it rather than an independent, equally valid alternative -- without this agreement, a hub just becomes one more copy to reconcile rather than the copy everyone defers to.

#### Diagram: Point-to-Point vs. Hub Integration Cost

<details markdown="1">
<summary>Point-to-Point vs. Hub Integration Cost</summary>
Type: microsim
**sim-id:** integration-cost-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: given a number of systems needing to exchange data, the learner will calculate the number of connections required under a point-to-point architecture versus a hub architecture, and explain why the hub scales better (Bloom: Applying).

Canvas: 700x500 pixels, responsive -- recompute canvas width from the containing element on window resize.

Visual design: two side-by-side panels. The left "Point-to-Point" panel draws N small system icons arranged in a circle with a direct line connecting every pair. The right "Hub" panel draws the same N system icons arranged in a circle around one central hub icon, each connected only to the hub.

Controls (p5.js built-in controls only, per this book's control conventions): a `createSlider()` labeled "Number of Systems (N)" ranging from 3 to 20, defaulting to 6, redrawing both panels live as it moves.

Behavior: a text readout below each panel updates with the live connection count -- the point-to-point panel shows \( \binom{N}{2} \) and the hub panel shows \( N \) -- so moving the slider from a small N to a large one visibly shows point-to-point connections growing far faster than the hub's straight-line growth.

Implementation: p5.js, canvas parented to `document.querySelector('main')`, `updateCanvasSize()` called first in `setup()` per this book's MicroSim conventions, connection lines and counts recomputed every time the slider changes.
</details>

!!! mascot-warning "A Single Source of Truth Is an Agreement, Not Just a Database"
    ![Sage holding up a wing in caution](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common mistake is assuming that designating a single source of truth is purely a technical task -- point every report at one database and you're done. The harder part is organizational: every team that currently trusts its own local copy has to agree to defer to the new authoritative source, including when it disagrees with the numbers they are used to. Skipping that agreement just produces a second, competing "truth."

## Governance: Keeping Data Trustworthy

None of the architecture covered so far matters if the data flowing through it cannot be trusted, which is why every mature data organization builds an explicit governance layer around it. **Data quality** is the degree to which data is accurate, complete, consistent, and fit for its intended use -- a customer record missing a required field, or an order total that does not match its line items, is a data-quality defect regardless of how well-designed the surrounding warehouse or pipeline is. **Data governance** is the overall system of policies, roles, and decision rights an organization uses to manage its data as a valued asset -- who is allowed to change a schema, who approves a new data standard, who is accountable when data quality slips. Read against Chapter 14's leverage-points vocabulary, data governance policies are quite literally rules of the system: they define what any participant in the organization's data ecosystem is permitted, rewarded, or corrected for doing.

Governance policies need real people executing them, not just documents describing them. **Data stewardship** is the ongoing practice of applying an organization's governance policies to a specific dataset or domain -- defining its data quality rules, approving changes to its schema, resolving disputes about its meaning. A **data steward** is the specific person or role accountable for a dataset's quality and definitions under that stewardship practice -- typically a subject-matter expert from the business side, not a database administrator, since knowing what "Customer" *should* mean is a business judgment, not a technical one.

Trusting a number in a report also means being able to answer where it came from. **Data lineage** is the traceable record of a piece of data's origin and every transformation it passed through on its way to its current form -- knowing that a revenue figure in an executive dashboard originated in the Orders table, was aggregated by a specific ETL process, and loaded into a specific data mart lets an analyst investigate a suspicious number instead of simply trusting or discarding it.

The diagram below traces one field's lineage from its source system through governance touchpoints to a final report.

#### Diagram: Data Lineage and Stewardship Along a Pipeline

<details markdown="1">
<summary>Data Lineage and Stewardship Along a Pipeline</summary>
Type: graph-model
**sim-id:** lineage-stewardship-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Learning objective: given a field's path from source system to report, the learner will trace its data lineage and identify which stage a named data steward is accountable for (Bloom: Analyzing).

Canvas: responsive vis-network container, minimum 480px height, full container width, recomputed on window resize.

Visual design: five vertices in a left-to-right chain: "CRM System (source)," "ETL Transform," "Central Data Warehouse," "Sales Data Mart," "Executive Report." Each vertex is connected to the next by a directed edge. A sixth vertex, "Data Steward: Sales Ops," sits below the chain with dashed edges connecting it to the Central Data Warehouse and Sales Data Mart vertices, showing which stages that steward is accountable for.

Interaction: clicking any vertex in the main chain opens an infobox stating what data lineage tracks at that stage (for example, clicking "ETL Transform" explains what transformation was applied). Clicking the Data Steward vertex opens an infobox explaining data stewardship and listing the two stages this steward owns. A "Trace Full Lineage" button highlights every edge in the main chain simultaneously and displays the full path as text: "CRM System -> ETL Transform -> Central Data Warehouse -> Sales Data Mart -> Executive Report."

Implementation: vis-network with a fixed node/edge dataset (no physics simulation needed), click handlers bound to every node populating a shared infobox panel, a separate button handler for the full-trace highlight.
</details>

!!! mascot-thinking "Data Governance Is Rules of the System, Applied to Data"
    ![Sage thinking with a raised wing](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Chapter 14 named rules of the system as a deep leverage point -- the constraints defining what any participant is allowed, rewarded, or corrected for doing. Data governance is that exact same leverage point, aimed specifically at an organization's data: a governance policy shapes every future decision made about a dataset, the same way any other deep rule shapes every future decision made under it.

## Knowing It's the Same Thing Twice: Entity Resolution and Master Data Management

Even excellent governance cannot prevent the same real-world entity from ending up recorded more than once across an organization's systems -- a customer who signs up through a website, calls a support line, and visits a physical store may generate three separate, differently formatted records for the identical person. Reconciling that is its own discipline. **Entity resolution** is the process of determining whether two or more records from different sources refer to the same real-world entity, and if so, merging them into a single, consistent record -- deciding that "J. Smith, 555-0142" and "John Smith, jsmith@example.com" are actually the same customer, based on matching evidence like a shared phone number or address, even though neither individual field matches exactly.

| Source record | Name | Contact | Resolved to |
|---|---|---|---|
| Website signup | J. Smith | 555-0142 | Master Customer #4471 |
| Support call log | John Smith | jsmith@example.com | Master Customer #4471 |
| Store visit | J. R. Smith | 555-0142 | Master Customer #4471 |

Performing entity resolution once is useful; performing it consistently, forever, across every system that touches a given kind of entity is a bigger, ongoing commitment. **Master data management** is the discipline of creating and maintaining one authoritative, deduplicated record for each of an organization's most important shared entities -- customers, products, employees, suppliers -- and ensuring every system across the organization references that single master record rather than maintaining its own independent copy. Master data management is entity resolution's single-source-of-truth counterpart: entity resolution answers "are these the same thing?" for a specific set of records, while master data management is the standing organizational commitment to keep asking and answering that question correctly, indefinitely, for the entities that matter most.

!!! mascot-encourage "Entity Resolution Rarely Has a Clean, Certain Answer"
    ![Sage giving an encouraging nod](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If matching "J. Smith" to "John Smith" with confidence feels uncomfortably fuzzy compared to the clean, exact-match joins earlier in this chapter, that discomfort is appropriate -- entity resolution is genuinely a best-evidence judgment call, not a guaranteed-correct lookup. Most real systems assign a confidence score rather than a flat yes-or-no, and treat low-confidence matches as a queue for a human data steward to review.

## Key Takeaways

You can now describe the data quality and governance practices that make a knowledge graph reliable, built on top of the relational and integration infrastructure most enterprises already run:

- A **relational database** organizes data with **primary keys** and **foreign keys**; a **normalized data model** eliminates redundancy while a **denormalized data model** (produced by **data denormalization**) or a **low-resolution data model** trades some of that consistency for faster reads.
- Analytical workloads run on a **central data warehouse**, smaller **data marts**, a schema-flexible **data lake**, and often a **star schema** for fast aggregate queries.
- **Data integration** moves data between systems via an **ETL process** and **APIs**, achieving **interoperability** -- but **data integration cost** grows quadratically without a hub enforcing a **single source of truth**.
- **Data governance** sets the rules, **data stewardship** and **data stewards** apply them, **data quality** measures whether they are working, and **data lineage** makes a data value's history traceable.
- **Entity resolution** merges duplicate records of the same real-world thing; **master data management** makes that merging an ongoing, organization-wide discipline.

!!! mascot-celebration "You Can Now Judge Whether a Knowledge Graph Is Built on Solid Ground"
    ![Sage celebrating with wings raised](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Whoo-hoo! From primary keys all the way to master data management, you now understand the entire data-management foundation a knowledge graph gets layered onto -- and you can spot exactly where that foundation is solid or shaky. Next up: bringing everything from this chapter and the last two together into the enterprise knowledge graph itself.
