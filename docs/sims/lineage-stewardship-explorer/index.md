---
title: Data Lineage and Stewardship Along a Pipeline
description: given a field's path from source system to report, the learner will trace its data lineage and identify which stage a named data steward is accountable for (Bloom: Analyzing).
status: scaffold
library: vis-network
bloom_level: TBD
---

# Data Lineage and Stewardship Along a Pipeline



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 18: Data Management and Governance](../../chapters/18-data-management-and-governance/index.md).

```text
Type: graph-model
**sim-id:** lineage-stewardship-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Learning objective: given a field's path from source system to report, the learner will trace its data lineage and identify which stage a named data steward is accountable for (Bloom: Analyzing).

Canvas: responsive vis-network container, minimum 480px height, full container width, recomputed on window resize.

Visual design: five vertices in a left-to-right chain: "CRM System (source)," "ETL Transform," "Central Data Warehouse," "Sales Data Mart," "Executive Report." Each vertex is connected to the next by a directed edge. A sixth vertex, "Data Steward: Sales Ops," sits below the chain with dashed edges connecting it to the Central Data Warehouse and Sales Data Mart vertices, showing which stages that steward is accountable for.

Interaction: clicking any vertex in the main chain opens an infobox stating what data lineage tracks at that stage (for example, clicking "ETL Transform" explains what transformation was applied). Clicking the Data Steward vertex opens an infobox explaining data stewardship and listing the two stages this steward owns. A "Trace Full Lineage" button highlights every edge in the main chain simultaneously and displays the full path as text: "CRM System -> ETL Transform -> Central Data Warehouse -> Sales Data Mart -> Executive Report."

Implementation: vis-network with a fixed node/edge dataset (no physics simulation needed), click handlers bound to every node populating a shared infobox panel, a separate button handler for the full-trace highlight.
```

## Related Resources

- [Chapter 18: Data Management and Governance](../../chapters/18-data-management-and-governance/index.md)
