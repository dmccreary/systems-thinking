---
title: "Data Ingestion Pipeline -- From Lake to Warehouse to Mart"
description: "Sequence a data lake, ETL, warehouse and marts, and look inside the warehouse's star schema."
image: /sims/data-warehouse-pipeline/data-warehouse-pipeline.png
og:image: /sims/data-warehouse-pipeline/data-warehouse-pipeline.png
twitter:image: /sims/data-warehouse-pipeline/data-warehouse-pipeline.png
social:
  cards: false
status: implemented
library: p5.js
bloom_level: Understand
bloom_verb: Sequence
chapter: 18
---

# Data Ingestion Pipeline -- From Lake to Warehouse to Mart

<iframe src="main.html" width="100%" height="502" scrolling="no"></iframe>

[Run the Data Ingestion Pipeline -- From Lake to Warehouse to Mart MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Each stage of an analytics pipeline exists because the previous one could not do something. The lake adds optionality, ETL adds agreement, the warehouse adds a shared version of the truth, and the marts add speed for one audience. Click any stage to see what it contributes, and click the small star diagram to look inside the warehouse itself.

**Learning objective:** Given a data pipeline from raw source to analytical storage, the learner will sequence a data lake, an ETL process, a central data warehouse, a data mart and a star schema in their correct order and explain what each stage adds.

**Bloom's Taxonomy level:** Understand (Sequence)

## How To Use

- Click each of the five stage boxes to see what that stage adds to the pipeline.
- Click the small star-schema diagram beneath the warehouse for the fact-table versus dimension-table distinction.
- Press "Animate Flow" to send a data packet through all five stages in order.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/data-warehouse-pipeline/main.html"
        width="100%" height="502" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows what a database is
- Has heard the terms ETL or data warehouse

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Sequence the five pipeline stages correctly
- State what each stage adds that the previous one could not
- Distinguish a fact table from a dimension table in a star schema

### Suggested Activity (12 minutes)

1. Show the five boxes unlabeled and ask learners to order them.
2. Click each stage and check the ordering against the explanations.
3. Click the star schema and ask why the shape has one central table.
4. Ask what goes wrong if a mart is loaded directly from the source rather than from the warehouse.
5. Ask what a data lake becomes if nothing downstream ever imposes meaning.

### Assessment

Ask learners to name the stage where two departments' definitions of 'customer' get reconciled, and to explain what happens if that stage is skipped.

### Discussion Questions

- Why is a mart loaded independently of the warehouse a silo in disguise?
- What is the real cost of a data lake with no governance?
- Where in this pipeline would you put a data steward?

## Specification

The specification below was extracted from
[Chapter 18: Data Management and Governance](../../chapters/18-data-management-and-governance/index.md).

```text
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
```

## References

- [Data warehouse - Wikipedia](https://en.wikipedia.org/wiki/Data_warehouse) - The architecture this pipeline builds toward.
- [Star schema](https://en.wikipedia.org/wiki/Star_schema) - The fact-and-dimension structure shown in the inset.
- [Extract, transform, load](https://en.wikipedia.org/wiki/Extract,_transform,_load) - What happens at the ETL stage and why it matters.

## Related Resources

- [Chapter 18: Data Management and Governance](../../chapters/18-data-management-and-governance/index.md)
- [All MicroSims in this book](../index.md)
