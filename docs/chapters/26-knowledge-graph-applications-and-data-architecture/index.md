---
title: Knowledge Graph Applications and Data Architecture
description: Applying knowledge graphs to concrete enterprise problems -- master data management, a single view of the customer, semantic layers, and linked data -- plus graph algorithms, graph neural networks, and graph analytics, with use cases in fraud detection, recommendation, and supply-chain graphs.
generated_by: claude skill chapter-content-generator
date: 2026-09-17 18:02:12
version: 1.10
---

# Knowledge Graph Applications and Data Architecture

## Summary

This chapter applies knowledge graphs to concrete enterprise problems: master data management, a single view of the customer, semantic layers, and linked data. It covers graph algorithms, graph neural networks, and graph analytics, with use cases in fraud detection, recommendation, and supply-chain graphs. Students completing this chapter will be able to match a business problem to an appropriate knowledge-graph application pattern.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Data Silo | 4 |
| Single View Of Customer | 3 |
| Customer 360 | 1 |
| Golden Record | 1 |
| Master Data | 3 |
| Reference Data | 1 |
| Data Domain | 1 |
| Conceptual Data Model | 3 |
| Logical Data Model | 2 |
| Physical Data Model | 1 |
| Semantic Layer | 1 |
| Linked Data | 2 |
| FAIR Data Principles | 1 |
| Data Provenance | 1 |
| Graph Algorithms | 9 |
| Graph Neural Networks | 2 |
| Graph Analytics | 6 |
| Community Detection | 2 |
| Link Prediction | 1 |
| Recommendation Engine | 1 |
| Fraud Detection Graph | 1 |
| Supply Chain Graph | 1 |
| Knowledge Base Reasoning | 2 |
| Inference Engine | 1 |
| Context Graph | 1 |

## Prerequisites

This chapter builds on concepts from:

- [12. Named Laws, Technology Archetypes, and Complexity Modeling](../12-named-laws-technology-archetypes-and-complexity-modeling/index.md)
- [15. Graph Theory Fundamentals](../15-graph-theory-fundamentals/index.md)
- [16. Graph Database Architecture](../16-graph-database-architecture/index.md)
- [17. Knowledge Representation and Metadata](../17-knowledge-representation-and-metadata/index.md)
- [18. Data Management and Governance](../18-data-management-and-governance/index.md)
- [19. Enterprise Knowledge Graphs](../19-enterprise-knowledge-graphs/index.md)
- [20. Organizational Silos and Silo Busting](../20-organizational-silos-and-silo-busting/index.md)
- [22. Artificial Intelligence and Machine Learning Foundations](../22-ai-and-machine-learning-foundations/index.md)
- [25. Systems Design, Emerging Technology, and Practice](../25-systems-design-emerging-technology-and-practice/index.md)

---

## Introduction

Chapter 19 introduced the enterprise knowledge graph as a concept; this chapter puts it to work on the concrete data problems that make organizations reach for one in the first place. You will see how master data management turns scattered, duplicate records into one trusted version, how a data architecture is layered from a business-friendly sketch down to an actual implementation, and how graph algorithms turn a knowledge graph's connections into fraud alerts, recommendations, and supply-chain visibility.

!!! mascot-welcome "From Concept to Concrete Application"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    You already know what a knowledge graph is -- now you'll see exactly what problems it's built to solve, from reconciling scattered customer records to catching a ring of fraudulent accounts hiding in plain sight. Let's zoom out and see the whole system!

## Breaking Down Silos With Master Data

Chapter 20 diagnosed organizational silos; this chapter names their technical counterpart. A **data silo** is an isolated collection of data controlled by a single team or system that is not easily accessible to, or integrated with, the rest of an organization's data -- the direct technical symptom of the organizational silos Chapter 20 already described, and often the reason they persist. Organizations manage this by first organizing their data conceptually. A **data domain** is a logical grouping of related data entities that share a common business meaning or ownership, such as a "Customer" domain, a "Product" domain, or a "Finance" domain, giving data governance a natural unit smaller than "the whole company" but larger than "one database table."

Within these domains, two very different kinds of data play very different roles. **Master data** is the set of core, high-value business entities -- customers, products, employees, suppliers -- that many different systems across an organization need to share and reuse consistently, rather than each system maintaining its own separate copy. **Reference data** is comparatively static, standardized lists of values used to categorize or classify master data and everyday transactions, such as country codes, currency codes, or units of measure -- reference data rarely changes and is often defined outside the organization entirely, unlike master data, which the organization actively creates and updates.

Reconciling scattered master data into one trustworthy version is the core work of master data management. A **golden record** is the single, trusted, authoritative version of a master data entity's record, produced by matching, merging, and de-duplicating data about that same real-world entity as it appears across multiple source systems. Applied specifically to customer data, this produces a **single view of customer**: one consistent, unified representation of a customer's identity pulled together from every system that touches them. **Customer 360** takes that same unified identity and layers behavioral and interaction data on top of it -- purchase history, support tickets, marketing engagement -- so that sales, service, and marketing teams can act on one shared, complete picture rather than three partial ones.

A worked example ties the whole cluster together. Suppose a company's sales system lists a customer as "Jon Smith," its billing system lists the same person as "J. Smith," and its support system lists them as "Jonathan Smith," each with slightly different contact details. A master data management process matches these three records as the same real person and merges them into one golden record. Applying that golden record specifically to customer identity produces the company's single view of customer. A marketing team then builds a dashboard on top of that single view, adding in this customer's purchase and support history, and calls the resulting dashboard their Customer 360 view -- three increasingly specific ideas, built one on top of the last.

!!! mascot-tip "Ask Which of the Three You Actually Mean"
    ![Sage pointing helpfully](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    These three terms get used loosely in real organizations, so when someone says "we need a 360 view," ask a clarifying question: do they mean the underlying golden record (an identity-matching problem), the single view of customer built from it (an integration problem), or a full Customer 360 dashboard (an application built on top of both)? Each answer points to a completely different project.

## Three Layers of Data Modeling

Designing any data architecture, including one built around a knowledge graph, moves through three progressively more concrete layers of description. A **conceptual data model** is a high-level description of an organization's business entities and the relationships between them, deliberately leaving out data types, keys, and any other implementation detail, so that business stakeholders without a technical background can validate that it captures their world correctly. A **logical data model** adds the next layer of detail -- specific attributes, relationships, and normalization rules -- while still remaining independent of any particular database technology, describing *what* the data looks like without committing to *how* it will be stored. A **physical data model** finally commits to that "how": the implementation-specific model that specifies actual tables, columns, and data types for a relational database, or actual node labels, edge types, and properties for a graph database.

A single example threads through all three layers. At the conceptual level, a retailer might state simply: "A Customer places an Order." At the logical level, that same idea gains detail: a Customer entity with attributes customer_id, name, and email; an Order entity with attributes order_id, date, and total; and a one-to-many relationship connecting them. At the physical level, a team implementing this on a graph database creates actual Customer and Order nodes with those properties, connected by a directed PLACED edge -- or, on a relational database, two actual tables joined by a foreign key. The conceptual model never changes when the technology choice changes; the physical model changes constantly as technology does.

The diagram below lets you click through this progression using the retailer example.

#### Diagram: Conceptual, Logical, and Physical Data Models

<iframe src="../../sims/data-model-layers-workflow/main.html" width="100%" height="500px" scrolling="no"></iframe>

[Run the Conceptual, Logical, and Physical Data Models MicroSim fullscreen](../../sims/data-model-layers-workflow/main.html){ .md-button }

<details markdown="1">
<summary>Conceptual, Logical, and Physical Data Models</summary>
Type: workflow
**sim-id:** data-model-layers-workflow<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Learning objective: given a single business relationship, the learner will trace how it is represented differently at the conceptual, logical, and physical modeling layers, and explain what new detail each layer adds (Bloom: Analyze).

Visual style: Mermaid flowchart, `graph TD`, three stacked nodes labeled "Conceptual Data Model," "Logical Data Model," and "Physical Data Model," connected top to bottom by arrows labeled "adds attributes and relationships" and "adds technology-specific implementation."

Interactivity requirement: every node MUST have a Mermaid `click` directive wired to a `showInfo(id)` callback that opens an infobox showing that layer's definition plus its version of the retailer "Customer places Order" example (e.g., clicking "Physical Data Model" shows the actual node/edge or table/foreign-key implementation from this chapter's prose).

Color scheme: a gradient from light slate-blue (Conceptual, most abstract) to the book's accent orange (Physical, most concrete), visually reinforcing the increasing specificity at each layer.

Implementation: Mermaid `graph TD` syntax embedded in the page's generated sim wrapper, sharing the `showInfo(id)` JavaScript helper already used by this book's other clickable Mermaid diagrams.
</details>

!!! mascot-thinking "Same Relationship, Three Honest Descriptions"
    ![Sage thinking with a raised wing](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that "Customer places Order" never actually changes across all three layers -- what changes is only how much implementation detail is visible. A conceptual model isn't a simplified lie the logical and physical models later correct; it's the same truth, described at the level of detail its audience actually needs.

## Semantic Layers, Linked Data, and Trustworthy Provenance

A physical data model alone does not guarantee that data means the same thing to everyone who touches it. A **semantic layer** is a layer of an information architecture that maps an organization's underlying technical data structures to consistent, business-friendly terms and relationships, so that "customer lifetime value" means exactly the same thing whether it's queried from the sales system or the finance system -- the same consistent-meaning goal Chapter 17's knowledge representation and metadata concepts were built to support, now applied specifically at the layer where people actually query the data.

That same demand for consistent meaning scales up beyond a single organization's walls. **Linked data** is a method of publishing structured data using standard web identifiers so that individual data items can be linked to, and cross-referenced against, related data published by entirely different organizations -- rather than each organization's data remaining an island only it can query. The **FAIR data principles** give this practice a memorable, widely adopted shorthand: data should be Findable, Accessible, Interoperable, and Reusable, a standard now common in scientific and research data management specifically because it makes linked data actually usable in practice, not just technically publishable.

None of this consistency matters if the data itself cannot be trusted, which is where the final concept in this cluster comes in. **Data provenance** is the documented history of where a specific piece of data came from and what transformations it has undergone before reaching its current form -- essential for auditing a decision, and, echoing Chapter 22's concern about training data quality, essential for trusting any AI system that was trained on or retrieves from that data.

The table below reinforces the FAIR data principles now that the surrounding concepts have been explained.

| Principle | What it requires | Everyday illustration |
|---|---|---|
| Findable | Data can be located through a search or a registered identifier | A dataset has a persistent, citable identifier |
| Accessible | Data can be retrieved once found, under clear conditions | A documented access protocol, even if authorization is required |
| Interoperable | Data uses standard formats and vocabularies | Two organizations' datasets can be combined without manual translation |
| Reusable | Data is documented well enough to be reused correctly elsewhere | Clear licensing and provenance let a second team reuse it confidently |

!!! mascot-warning "Accessible Does Not Mean Public"
    ![Sage holding up a wing in caution](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common mistake is assuming FAIR data must be freely open to everyone. Accessible only means that a clear, documented process exists for retrieving the data once it's found -- that process can absolutely include authorization, licensing fees, or a data-sharing agreement. Confusing "accessible" with "public" leads teams to either overshare sensitive data or needlessly avoid the FAIR principles for data that was never meant to be unrestricted.

## Graph Algorithms and Analytics at Scale

Chapter 15 introduced graph theory's basic vocabulary of nodes, edges, and paths. **Graph algorithms** are the family of computational procedures built on that vocabulary that operate directly on a graph's structure to answer questions no single record could answer alone -- the shortest path between two nodes, which node is most central, which nodes are reachable from a given starting point. **Graph analytics** is the broader practice of applying graph algorithms to real organizational data to generate actionable business insight, treating the algorithms themselves as tools within a larger analytical workflow rather than as the end goal.

Two specific graph algorithms recur constantly across real applications. **Community detection** identifies clusters of nodes that are more densely connected to each other than to the rest of the graph, surfacing natural groupings that were never explicitly labeled anywhere in the data -- a social network's community detection algorithm might reveal a tight-knit friend group nobody manually tagged as one. **Link prediction** estimates the likelihood that a currently missing edge between two nodes should actually exist, or soon will, based purely on the graph's existing structure -- the algorithm behind a "people you may know" suggestion, which reasons from shared connections rather than from any explicit statement that two people know each other.

A more recent development lets a graph directly power a machine-learning model rather than just being queried by traditional algorithms. **Graph neural networks** are a class of neural network, building on Chapter 22's neural-network vocabulary, that operate directly on graph-structured data by having each node aggregate information from its neighbors, learning a representation of that node useful for prediction tasks such as link prediction or classifying what type of node it is -- effectively teaching a neural network to "read" a graph's structure the way a standard neural network reads a fixed list of numeric inputs.

The MicroSim below lets you run community detection and link prediction yourself on a sample network.

#### Diagram: Graph Algorithms Explorer

<iframe src="../../sims/graph-algorithms-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

[Run the Graph Algorithms Explorer MicroSim fullscreen](../../sims/graph-algorithms-explorer/main.html){ .md-button }

<details markdown="1">
<summary>Graph Algorithms Explorer</summary>
Type: graph-model
**sim-id:** graph-algorithms-explorer<br/>
**Library:** vis-network<br/>
**Template:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/network-community-detection-graph-model<br/>
**Status:** Specified

Learning objective: given a sample network, the learner will apply community detection to identify densely connected clusters and apply link prediction to identify a plausible missing edge, then interpret both results (Bloom: Apply).

Canvas: responsive vis-network container, minimum 520px height, full container width, with a window `resize` listener calling `network.redraw()` and `network.fit()`.

Visual elements: an 18-node sample network with two visually separable but lightly interconnected clusters (representing, for example, two overlapping social or organizational groups), rendered with vis-network's default force-directed physics.

Controls: a "Detect Communities" button that runs a simple modularity-based clustering over the current node/edge dataset and recolors each detected cluster in a distinct color; a "Predict Missing Link" button that computes a common-neighbors score for every non-adjacent node pair and highlights the single highest-scoring pair with a dashed, pulsing edge, labeled with its predicted-likelihood score.

Interactivity requirement: every node is clickable, opening an infobox listing that node's community assignment (once detected) and its degree (number of connections); the predicted dashed edge is hoverable, showing a tooltip explaining the shared neighbors driving that prediction.

Color scheme: each detected community rendered in a distinct pastel color; the predicted link rendered in the book's accent orange to stand out from confirmed edges, which remain neutral gray.

Implementation: vis-network `DataSet` objects for nodes and edges, a simple in-browser modularity or connected-components-based clustering function for the community-detection button, and a common-neighbors scoring function for the link-prediction button, both computed client-side over the fixed sample dataset.
</details>

!!! mascot-encourage "The Math Underneath Is Deeper Than the Idea You Need Today"
    ![Sage giving an encouraging nod](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If graph neural networks feel like a lot stacked on top of an already-new neural network vocabulary, that reaction is fair -- the underlying math genuinely is more involved than a standard neural network's. You don't need to derive it to use the idea correctly: a graph neural network is a neural network that learns from a node's neighbors instead of from a fixed list of inputs, and that one sentence will carry you through everything else in this book.

## Matching a Business Problem to a Knowledge Graph Pattern

The payoff of graph algorithms and analytics shows up clearest in three recurring application patterns, each matched to a specific kind of business problem. A **recommendation engine** builds a graph connecting users, items, and past interactions, then applies link prediction and similarity-based graph analytics to suggest items a given user is statistically likely to want next -- the same underlying mechanism as Chapter 23's recommendation system refinement loop, now viewed from the data-architecture side rather than the feedback-loop side. A **fraud detection graph** connects accounts, transactions, and shared devices or contact details into a single graph, so that community detection can reveal a coordinated ring of fraudulent accounts that share suspicious connections -- a pattern invisible if each transaction is reviewed only in isolation, since no single transaction in the ring looks unusual on its own.

A **supply chain graph** connects suppliers, components, and manufacturers, letting graph analytics trace multi-tier dependencies across an entire supply network -- directly extending the interconnected six-node supply example from Chapter 1, now applied at the scale of an entire industry's actual supplier relationships, to answer questions like "which of our products would be affected if this one supplier failed" long before that failure actually happens.

The table below reinforces this cluster now that all three patterns have been explained individually.

| Business problem | Knowledge graph pattern | Typical algorithm applied |
|---|---|---|
| Suggesting relevant products or content | Recommendation engine | Link prediction, similarity scoring |
| Spotting coordinated fraudulent activity | Fraud detection graph | Community detection |
| Assessing multi-tier supplier risk | Supply chain graph | Path analysis, centrality |

## Reasoning Over a Knowledge Graph

A knowledge graph's value is not limited to the facts explicitly stored in it. **Knowledge base reasoning** is the process of deriving new facts from a knowledge graph's existing facts and its defined rules or ontological relationships, producing conclusions that were never directly entered by anyone. The **inference engine** is the specific software component that actually carries out knowledge base reasoning, applying logical rules to a graph's stated facts to generate new, derived facts on demand -- if a knowledge graph states that "Component X is part of Product Y" and a general rule states "a defect in any part of a product is a defect risk for that product," an inference engine can derive "Component X is a defect risk for Product Y" without anyone ever entering that specific fact directly.

A **context graph** applies this same reasoning machinery to a narrower, more immediate purpose: it is a knowledge graph structured specifically to represent the surrounding context of a particular situation or query -- a user's recent activity, their location, related entities relevant right now -- so that an application retrieves not just a bare fact, but a fact appropriately framed by its context. Paired with the vector database and embeddings Chapter 25 introduced, a context graph is increasingly how modern AI systems ground a large language model's response in an organization's actual, current, trustworthy data rather than in the model's own general training data alone.

## Key Takeaways

You can now match a business problem to an appropriate knowledge-graph application pattern:

- A **data silo** is the technical counterpart of an organizational silo; **master data**, organized by **data domain** and distinguished from **reference data**, gets reconciled into a **golden record**, applied to customers as a **single view of customer**, and extended into a **Customer 360** view.
- A **conceptual data model**, **logical data model**, and **physical data model** describe the same data at progressively more concrete levels of detail.
- A **semantic layer** and **linked data**, held to the **FAIR data principles** and backed by trustworthy **data provenance**, keep data meaningful and trustworthy across systems and organizations.
- **Graph algorithms** and **graph analytics** -- including **community detection**, **link prediction**, and **graph neural networks** -- turn a knowledge graph's structure into insight, applied concretely through a **recommendation engine**, a **fraud detection graph**, and a **supply chain graph**.
- **Knowledge base reasoning**, carried out by an **inference engine** and focused for a specific situation through a **context graph**, lets a knowledge graph produce facts nobody entered directly.

!!! mascot-celebration "You Can Now Match Any Business Problem to Its Graph Pattern"
    ![Sage celebrating with wings raised](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Whoo-hoo! From reconciling three messy customer records into one golden record, all the way to an inference engine deriving a fact nobody typed in, you can now match a real business problem to the right knowledge-graph application pattern and defend why it fits. Next up: the book's final chapter, where every tool you've built gets carried out beyond information technology entirely.
