---
title: Graph Theory Fundamentals
description: The mathematical foundations of graphs -- vertices, edges, directed and undirected graphs, weighted and property graphs, RDF and ontologies -- and graph traversal as the core operation for navigating connected data.
generated_by: claude skill chapter-content-generator
date: 2026-09-17 17:15:00
version: 1.10
---

# Graph Theory Fundamentals

## Summary

This chapter establishes the mathematical foundations of graphs: vertices, edges, directed and undirected graphs, weighted and property graphs, and the RDF and ontology standards used to represent knowledge formally. It introduces graph traversal as the core operation for navigating connected data. Students completing this chapter will be able to describe a dataset as a graph and choose an appropriate graph model for it.

## Concepts Covered

This chapter covers the following 16 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Graph (Data Structure) | 2391 |
| Vertex | 1452 |
| Edge (Graph) | 728 |
| Directed Graph | 1 |
| Undirected Graph | 1 |
| Weighted Graph | 1 |
| Property Graph | 176 |
| Labeled Property Graph | 1 |
| RDF | 209 |
| Reification Challenges | 1 |
| Cypher | 170 |
| GQL | 1 |
| Semantic Web | 103 |
| Ontology | 102 |
| Taxonomy | 1 |
| Graph Traversal | 373 |

## Prerequisites

This chapter assumes only the prerequisites listed in the [course descriptions](../../course-descriptions/index.md).

---

## Introduction

Every chapter so far has built on the one before it -- but this chapter is different, and it's worth pausing to say why. Chapters 1 through 14 developed one continuous strand: systems thinking, causal loop diagrams, feedback, archetypes, and leverage points. This chapter opens a second strand -- graphs, knowledge representation, and the technology that lets machines reason over connected data -- and it does not assume you remember any archetype names or feedback vocabulary to follow along. If you skipped straight here, you can still start.

That said, the two strands aren't unrelated. Chapter 3's causal loop diagrams already drew circles connected by arrows to represent a system -- you just didn't yet have the formal, mathematical vocabulary to describe exactly what you were drawing. This chapter supplies that vocabulary, and by the end of it you'll be able to look back at any causal loop diagram in this book and describe it with mathematical precision instead of only visually.

!!! mascot-welcome "A Fresh Foundation, Built on Something You Already Know"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    New strand, same Sage -- and good news: you've secretly been drawing graphs since Chapter 3, you just called them causal loop diagrams. This chapter gives you the formal name for that circles-and-arrows habit, plus the vocabulary the rest of this book's second half will build on. Let's zoom out and see the whole system!

## What Is a Graph? Vertices and Edges

A **graph (data structure)** is a mathematical structure made of two parts: a set of distinct things, and a set of connections between pairs of those things. Formally, a graph is written as \( G = (V, E) \), where \( V \) is the set of things and \( E \) is the set of connections between them. That's the entire definition -- deceptively simple, and exactly what makes graphs so widely applicable: anything you can describe as "a bunch of things, some of which are connected to some others" is a graph, whether the things are people, web pages, chemical compounds, or, as Chapter 3 already showed you, the variables in a causal loop diagram.

That simplicity is precisely why the graph is one of only a handful of concepts in this entire book with no prerequisite of its own -- everything from here to the end of the book builds on it. A road network is a graph: intersections are vertices, roads are edges. A social network is a graph: people are vertices, friendships are edges. A citation network, a molecule's atomic structure, an org chart, the World Wide Web's own hyperlinks -- each one is the identical two-part structure wearing different clothes. Once you can recognize that structure, you can bring every tool this chapter introduces to bear on a problem, regardless of what field it came from.

Each individual thing in that set has its own formal name. A **vertex** (plural: vertices, and often called a "node" in software contexts) is a single distinct entity in a graph -- one person, one web page, one variable. A vertex can carry a label identifying what it represents, and it can carry additional data about itself, but at its core a vertex is simply one member of the set \( V \). One useful number describes each vertex's own place in the graph: the **degree** of a vertex is the count of edges directly connected to it, written \( \deg(v) \). A vertex with a high degree sits at a busy junction of the graph; a vertex with a degree of zero is disconnected from everything else in it.

Each connection between two vertices has its own formal name too. An **edge (graph)** is a connection between exactly two vertices, representing some relationship between them -- one member of the set \( E \). An edge is typically written as a pair, \( e = (u, v) \), naming the two vertices \( u \) and \( v \) it connects. A graph is rarely kept in a computer's memory as a hand-drawn picture; instead, it is usually stored as an **adjacency list** -- a simple lookup table listing, for each vertex, the other vertices it directly connects to -- which is exactly the machine-readable form every edge ultimately takes once you move past the diagram and into code.

Let's make all four of these concrete with one small worked example that will carry through the rest of this section. Suppose you want to represent four coworkers and who has directly collaborated with whom on a project: Ana, Ben, Cho, and Dev. The vertex set is \( V = \{Ana, Ben, Cho, Dev\} \) -- four vertices, one per person. Say Ana has collaborated with Ben, Ben has collaborated with Cho, and Cho has collaborated with Dev. The edge set is \( E = \{(Ana, Ben), (Ben, Cho), (Cho, Dev)\} \) -- three edges, one per collaboration. That's a complete graph, formally: \( G = (V, E) \) with four vertices and three edges, fully specified by two short lists. Ben's degree is \( \deg(Ben) = 2 \), since exactly two edges -- to Ana and to Cho -- touch him, while Ana and Dev each have a degree of only 1. Stored as an adjacency list, the same graph becomes four short lines: Ana: [Ben]; Ben: [Ana, Cho]; Cho: [Ben, Dev]; Dev: [Cho] -- the everyday format a real graph database keeps on disk.

The diagram below lets you explore a much larger, real example of exactly this structure: this very book's own learning graph, where each vertex is one of the roughly 500 concepts you've been learning, and each edge is a "depends on" relationship between two concepts.

#### Diagram: This Book's Learning Graph as a Graph

<iframe src="../../sims/graph-viewer/main.html" width="100%" height="600px" scrolling="no"></iframe>

[Open the Learning Graph Viewer fullscreen](../../sims/graph-viewer/main.html){ .md-button }

<details markdown="1">
<summary>This Book's Learning Graph as a Graph (reused MicroSim)</summary>
Type: graph-model
**sim-id:** graph-viewer<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** local docs/sims/graph-viewer<br/>
**Source Repo:** local — docs/sims/graph-viewer

Reused from this book's own sims collection: every concept in this book is drawn as a vertex, and every "depends on" relationship between two concepts is drawn as an edge. Type in the search box to find and focus on a single vertex, use the category checkboxes to show or hide groups of vertices, and click any vertex to select it and highlight every edge directly connected to it -- a hands-on way to see a vertex's own connections rather than just reading a definition of one. The sidebar's live statistics panel counts the currently visible vertices, edges, and foundational (zero-prerequisite) vertices. Learning objective: given this book's own concept-dependency data rendered as a graph, the learner will locate a specific vertex, identify its directly connected edges, and distinguish a foundational vertex from a dependent one (Bloom: Analyzing).
</details>

!!! mascot-thinking "You Were Already Reading Graphs in Chapter 3"
    ![Sage thinking with a raised wing](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Go back and glance at any causal loop diagram earlier in this book. Every circle was a vertex. Every arrow was an edge. You've been reading and drawing graphs since Chapter 3 -- this chapter just gave the habit its formal name and its formal notation, \( G = (V, E) \), so you can now describe precisely what you were only able to sketch before.

## Variations on the Basic Graph

The four-coworker example above happened to treat every collaboration as a plain, symmetric connection -- but real relationships aren't always symmetric, and real connections aren't always equally strong. Three variations on the basic graph capture these differences.

A **directed graph** is a graph in which each edge has a direction, pointing from one specific vertex to another, so that \( (u, v) \) is a different edge from \( (v, u) \) -- drawn with an arrowhead rather than a plain line. The learning-graph viewer above is a directed graph: an edge points from a dependent concept to the prerequisite it depends on, and that direction matters -- reversing it would incorrectly claim the prerequisite depends on the dependent concept instead. An **undirected graph** is a graph in which each edge simply connects two vertices with no direction implied -- \( (u, v) \) and \( (v, u) \) mean exactly the same thing. The four-coworker example is naturally undirected: if Ana collaborated with Ben, Ben necessarily collaborated with Ana too, so a plain line without an arrowhead is the accurate representation.

A **weighted graph** is a graph in which each edge carries a numeric value representing something like distance, cost, capacity, or strength, rather than just indicating that a connection exists at all. Adding weights to the coworker example could capture how many joint projects each pair actually completed together -- an edge weight of 5 between Ana and Ben would show a much deeper collaboration history than a weight of 1 between Cho and Dev, a distinction a plain unweighted edge could never express.

The table below reinforces all three variations using the same running coworker example.

| Variation | What it adds | Coworker-example instance |
|---|---|---|
| Directed graph | Edges point in a specific direction | A learning graph's "depends on" edges |
| Undirected graph | Edges carry no direction | Ana and Ben's mutual collaboration |
| Weighted graph | Edges carry a numeric value | Number of joint projects per pair |

## Traversing a Graph

Once data is stored as a graph, the single most fundamental operation you can perform on it is moving through its connections systematically, and that operation has its own name. **Graph traversal** is the process of visiting the vertices of a graph in a systematic order by following its edges, typically to search for a specific vertex, explore everything reachable from a starting point, or find a path between two vertices. Two traversal strategies dominate in practice, differing only in which vertex they choose to visit next.

**Breadth-first search** visits a starting vertex, then all of its immediate neighbors, then all of *their* unvisited neighbors, expanding outward one full "ring" at a time -- the natural strategy when you want the shortest path measured in number of edges. **Depth-first search** instead follows one path as far as it can go before backtracking to try another branch -- the natural strategy when you want to explore an entire connected region rather than find the nearest vertex. Both strategies visit every reachable vertex exactly once and run in time proportional to \( O(|V| + |E|) \) -- the size of the vertex set plus the size of the edge set -- which is why graph traversal scales comfortably even to graphs with millions of vertices.

Walk through a small worked example using the coworker graph from earlier, starting a breadth-first search at Ana. Step one visits Ana herself. Step two visits everyone directly connected to Ana -- just Ben. Step three visits everyone directly connected to Ben who hasn't been visited yet -- just Cho, since Ana is already visited. Step four visits everyone directly connected to Cho who hasn't been visited yet -- just Dev. The visiting order is Ana, Ben, Cho, Dev -- and notice this order exactly matches each person's distance, in number of edges, from Ana, which is precisely what makes breadth-first search the right tool whenever "closest first" is the actual goal.

The MicroSim below lets you drive this same process yourself, one step at a time, on a slightly larger example graph.

#### Diagram: Breadth-First Search Step-by-Step

<iframe src="https://dmccreary.github.io/graph-algorithms/sims/bfs/bfs.html" width="100%" height="500px" scrolling="no"></iframe>

[Run the Breadth-First Search MicroSim fullscreen](https://dmccreary.github.io/graph-algorithms/sims/bfs/bfs.html){ .md-button }

<details markdown="1">
<summary>Breadth-First Search Step-by-Step (reused MicroSim)</summary>
Type: microsim
**sim-id:** bfs<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/graph-algorithms/sims/bfs/bfs.html<br/>
**Source Repo:** https://github.com/dmccreary/graph-algorithms/tree/main/docs/sims/bfs

Reused from the MicroSim catalog (WHAT match score 0.8154; note the catalog's listed fullscreen URL pointed at a stale `main.html` path that returns a 404 -- the correct, verified live file is `bfs.html`, used above). A central starting vertex and its surrounding neighbor vertices are drawn on canvas; "Next Step" advances the search one ring at a time, coloring each newly visited vertex and labeling it with its hop distance from the start, "Finish" completes the traversal instantly, and "Restart" resets every vertex to unvisited. Learning objective: given a starting vertex, the learner will predict which vertex breadth-first search visits next at each step, based on hop distance from the start (Bloom: Applying).
</details>

!!! mascot-tip "Ask 'Closest First or Explore Everything' to Pick the Algorithm"
    ![Sage pointing helpfully](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    When you're not sure whether a problem calls for breadth-first or depth-first search, ask what you actually need: the *shortest* path to something means breadth-first, while exploring an *entire* connected region -- even if it means going deep down one branch first -- means depth-first. That one question resolves the choice almost every time.

## Property Graphs and Their Query Languages

The coworker and learning-graph examples so far attached only a label to each vertex and edge. Real-world graph databases usually need to store more -- and the most common way to do that is the property graph. A **property graph** is a graph model in which both vertices and edges can carry an arbitrary set of key-value properties in addition to their basic structure -- not just "Ana is connected to Ben," but "Ana, a Person with age 34, WORKS_AT Acme Corp, a Company, since the year 2020."

Most real property-graph databases go one step further and let a vertex carry one or more category labels alongside its properties. A **labeled property graph** is a property graph in which each vertex is tagged with one or more labels identifying its type -- `:Person` or `:Company` in the Ana example -- so that a query can efficiently restrict itself to "all vertices labeled Person" instead of scanning every vertex in the graph.

Storing this richly structured data is only useful if there's a convenient way to ask questions of it, and property graphs have their own purpose-built query language. **Cypher**, originally developed for the Neo4j graph database, is a declarative query language that lets you describe the *pattern* you're looking for using an ASCII-art-like syntax -- parentheses for vertices, square brackets for edges, and arrows for direction -- rather than writing step-by-step instructions for how to find it. Finding every person who works at Acme Corp in Cypher looks like this:

```
MATCH (p:Person)-[:WORKS_AT]->(c:Company)
WHERE c.name = "Acme Corp"
RETURN p.name
```

Read the pattern the way it's drawn: `(p:Person)` is a vertex labeled Person, `-[:WORKS_AT]->` is a directed edge labeled WORKS_AT, and `(c:Company)` is a vertex labeled Company -- the query is a literal picture, in text, of the sub-graph it's searching for.

Cypher's popularity and readability made it the strongest influence on a newer, vendor-neutral standard. **GQL** (Graph Query Language) is an international standard query language for property graphs, formally adopted in 2024 to do for graph databases what SQL has long done for relational databases -- provide one common language that works across different vendors' products, rather than locking every query into one company's proprietary syntax.

The table below reinforces this cluster of four concepts now that each has been defined.

| Concept | What it is | Ana/Acme example |
|---|---|---|
| Property graph | Vertices and edges hold key-value properties | Ana has an `age` property; the edge has a `since` property |
| Labeled property graph | Vertices also carry type labels | Ana is labeled `:Person`; Acme is labeled `:Company` |
| Cypher | Neo4j's pattern-matching query language | `MATCH (p:Person)-[:WORKS_AT]->(c:Company)` |
| GQL | The 2024 vendor-neutral standard influenced by Cypher | A query that runs the same way across different graph databases |

## RDF, the Semantic Web, and Formal Meaning

Property graphs aren't the only way to formalize a graph, and a much older standard takes a stricter approach. **RDF** (Resource Description Framework) is a World Wide Web Consortium standard for representing data as a set of triples -- subject, predicate, object -- each triple forming one directed, labeled edge in a graph. The Ana-and-Acme relationship in RDF looks like a single triple: `<Ana> <worksAt> <AcmeCorp>`, read exactly like a simple sentence: subject Ana, predicate worksAt, object AcmeCorp.

Notice something the property-graph example could do trivially that this triple cannot: attach a "since 2020" property directly to the WORKS_AT relationship itself. A bare RDF triple has no place to attach a property to an edge -- edges in RDF carry only their predicate label, nothing more. **Reification challenges** are the practical difficulties this creates: to describe a property *of* a relationship rather than a property of a vertex, RDF has to turn the relationship itself into its own resource that other triples then describe (several extra triples just to say "this particular WORKS_AT relationship started in 2020"), a verbose workaround compared to a property graph's edge simply holding a `since` property natively.

RDF's real purpose isn't a single company's database -- it's the web itself. The **Semantic Web** is a vision, championed by web inventor Tim Berners-Lee, for extending the web so that data itself, not just human-readable documents, is published in a machine-readable, linked form using standards like RDF, so that software can automatically combine data from independent sources the way a browser today already combines linked documents. A company publishing its product catalog as linked RDF data, connectable without custom integration code to a public government dataset about material safety, is the Semantic Web working as intended -- the same search-and-reuse payoff Chapter 12 described for a shared internal hub, now extended to the entire public web.

None of this linking works if two different publishers mean different things by the same word, which is why formal meaning has to be specified explicitly. An **ontology** is a formal, explicit specification of the categories, properties, and relationships that exist within a domain, giving shared, machine-checkable meaning to the vertices and edges in a knowledge graph -- an ontology might state that "Person" is a specific kind of "Agent," and that a "worksAt" relationship is only valid when it points from a Person to an Organization, letting software catch a nonsensical triple the same way a spell-checker catches a typo. A **taxonomy** is a simpler, more restricted relative of an ontology: a purely hierarchical classification of categories connected only by "is-a" relationships, without an ontology's richer variety of relationship types -- a product catalog's Electronics > Computers > Laptops classification is a taxonomy, useful for browsing and organizing, but far less expressive than a full ontology that could additionally define how a Laptop relates to its Manufacturer, its ReplacementParts, or its CompatibleAccessories.

!!! mascot-warning "Don't Reach for RDF When You Need Rich Edge Properties"
    ![Sage holding up a wing in caution](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common mistake is choosing RDF for a project that actually needs to track a lot of information *about* its relationships -- confidence scores, timestamps, weights -- and then fighting reification challenges the entire way through. If your relationships need real properties of their own, a labeled property graph and Cypher will very likely save you a great deal of unnecessary complexity.

## Key Takeaways

You can now describe any connected dataset with formal graph vocabulary, and choose an appropriate graph model for it:

- A **graph (data structure)** is formally \( G = (V, E) \): a set of **vertices** connected by a set of **edges** -- exactly the structure every causal loop diagram in this book has been drawing since Chapter 3.
- A graph can be **directed** or **undirected**, and its edges can be **weighted** to capture strength, cost, or distance.
- **Graph traversal** -- breadth-first or depth-first search -- systematically visits every reachable vertex in \( O(|V| + |E|) \) time, the core operation behind navigating any connected dataset.
- A **property graph**, often a **labeled property graph**, stores rich key-value data directly on vertices and edges, queried with languages like **Cypher** or the newer, vendor-neutral **GQL** standard.
- **RDF** represents data as subject-predicate-object triples powering the **Semantic Web**, at the cost of **reification challenges** when a relationship itself needs properties; an **ontology** (or the simpler **taxonomy**) supplies the shared, formal meaning that lets independently published graph data actually interoperate.

!!! mascot-celebration "You Can Now Speak the Language of Graphs"
    ![Sage celebrating with wings raised](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Whoo-hoo! From a four-person coworker graph all the way to the standards behind the Semantic Web, you now have the formal vocabulary this book's entire second half will build on -- and you can already look back at every causal loop diagram you've drawn and name exactly what it was made of. The chapters ahead put this vocabulary to work on real knowledge graphs and the AI systems built on top of them.


