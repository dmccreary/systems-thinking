---
title: "Data Lineage and Stewardship Along a Pipeline"
description: "Trace a field from CRM to executive report and see which two stages a named data steward is accountable for."
image: /sims/lineage-stewardship-explorer/lineage-stewardship-explorer.png
og:image: /sims/lineage-stewardship-explorer/lineage-stewardship-explorer.png
twitter:image: /sims/lineage-stewardship-explorer/lineage-stewardship-explorer.png
social:
  cards: false
status: implemented
library: vis-network
bloom_level: Analyze
bloom_verb: Trace
chapter: 18
---

# Data Lineage and Stewardship Along a Pipeline

<iframe src="main.html" width="100%" height="502" scrolling="no"></iframe>

[Run the Data Lineage and Stewardship Along a Pipeline MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## About This MicroSim

Lineage answers 'where did this number come from?' Stewardship answers 'who is accountable for it here?' They are different questions, and governance fails most often at the stages nobody was named for. This MicroSim shows a five-stage pipeline with a steward accountable for only two of them.

**Learning objective:** Given a field's path from source system to report, the learner will trace its data lineage and identify which stage a named data steward is accountable for.

**Bloom's Taxonomy level:** Analyze (Trace)

## How To Use

- Click any stage in the main chain to see what lineage records at that point.
- Click the Data Steward vertex to see which stages that steward owns - and which they do not.
- Press "Trace Full Lineage" to highlight the whole path and print it as text.
- Notice that the source system and the final report have no named steward.

## Embedding This MicroSim

Copy this iframe into any page to embed the MicroSim:

```html
<iframe src="https://dmccreary.github.io/systems-thinking/sims/lineage-stewardship-explorer/main.html"
        width="100%" height="502" scrolling="no"></iframe>
```

## Lesson Plan

### Audience

This MicroSim is written to work across the book's full audience range, from junior high through executive workshops. Adjust the depth of the discussion questions rather than the activity itself.

### Prerequisites

- Knows what a data pipeline is
- Has seen a report whose numbers were disputed

### Learning Objectives

After working with this MicroSim, learners will be able to:

- Trace a field's lineage from source to report
- Identify which stages a named steward is accountable for
- Explain why unstewarded stages are where governance fails

### Suggested Activity (12 minutes)

1. Ask learners what they would do if two reports disagreed about a sales figure.
2. Click through the five stages and ask what could change the value at each.
3. Click the steward and list the two owned stages.
4. Ask which unstewarded stage worries them most, and why.
5. Have learners map the lineage of one number they actually use.

### Assessment

Give learners a disputed figure and ask which stage they would investigate first, and who they would ask.

### Discussion Questions

- Why is stewardship about meaning rather than about servers?
- What makes the source system so hard to steward?
- Should the person who reads a number be accountable for it?

## Specification

The specification below was extracted from
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

## References

- [Data lineage - Wikipedia](https://en.wikipedia.org/wiki/Data_lineage) - Tracking data's origins and transformations.
- [Data steward](https://en.wikipedia.org/wiki/Data_steward) - The accountability role and what it covers.
- [Data governance](https://en.wikipedia.org/wiki/Data_governance) - The broader discipline these two practices belong to.

## Related Resources

- [Chapter 18: Data Management and Governance](../../chapters/18-data-management-and-governance/index.md)
- [All MicroSims in this book](../index.md)
