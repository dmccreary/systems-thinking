---
title: Metadata Registry vs. Catalog
description: Metadata Registry vs. Catalog
status: scaffold
library: vis-network
bloom_level: TBD
---

# Metadata Registry vs. Catalog



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 17: Knowledge Representation and Metadata](../../chapters/17-knowledge-representation-and-metadata/index.md).

```text
Type: graph-model
**sim-id:** registry-vs-catalog<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/context-graph/sims/registry-vs-catalog/main.html<br/>
**Source Repo:** https://github.com/dmccreary/context-graph/tree/main/docs/sims/registry-vs-catalog

Reused from the MicroSim catalog (WHAT match score 0.7565; both catalog and live URL verified working, and the underlying script confirmed generic -- a Registration Authority, Data Element, Value Domain, and Version History on the registry side, a Crawler Bot, discovered table, and quality score on the catalog side, none of it specific to the source repository's own subject area). Clicking any node on the left "Registry" panel reveals what that piece of a governed data-element definition means; clicking any node on the right "Catalog" panel reveals what a discovery tool actually found in a live system; clicking the dashed orange cross-panel link explains how a catalog field's discovered name connects back to the registry's authoritative definition. Learning objective: given a metadata registry and a metadata catalog shown side by side, the learner will distinguish what each one is responsible for and explain how the dashed link between them keeps a discovered field's meaning traceable to its governed definition (Bloom: Analyzing).
```

## Related Resources

- [Chapter 17: Knowledge Representation and Metadata](../../chapters/17-knowledge-representation-and-metadata/index.md)
