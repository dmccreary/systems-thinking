---
title: Data Ingestion Pipeline -- From Lake to Warehouse to Mart
description: given a data pipeline from raw source to analytical storage, the learner will sequence a data lake, an ETL process, a central data warehouse, a data mart, and a star schema in their correct order and explain what each stage adds (Bloom: Understanding).
status: scaffold
library: p5.js
bloom_level: TBD
---

# Data Ingestion Pipeline -- From Lake to Warehouse to Mart



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
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

## Related Resources

- [Chapter 18: Data Management and Governance](../../chapters/18-data-management-and-governance/index.md)
