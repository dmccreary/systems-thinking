# Learning Graph for Systems Thinking in the Age of AI

[Open Learning Graph Viewer Fullscreen](../sims/graph-viewer/main.html){ .md-button .md-button--primary }

<iframe src="../sims/graph-viewer/main.html" width="100%" height="600px" frameborder="0"></iframe>

This section contains the learning graph for this textbook. A learning graph is
a graph of concepts used in this textbook. Each concept is represented by a
node in a network graph. Concepts are connected by directed edges that indicate
what concepts each node depends on before that concept is understood by the student.

A learning graph is the foundational data structure for intelligent textbooks that can recommend learning paths.
A learning graph is like a roadmap of concepts to help students arrive at their learning goals.

At the left of the learning graph are prerequisite or foundational concepts. They
have no outbound edges. They only have inbound edges for other concepts that depend on
understanding these foundational prerequisite concepts. At the far right
we have the most advanced concepts in the course. To master these concepts you
must understand all the concepts that they point to.

Here are other files used by the learning graph.

## Course Descriptions

This book serves seven audiences, each with its own [Course Description](../course-descriptions/index.md)
(Junior High through Executive Overview). Rather than generating concepts from a single course
description, this learning graph was built by scanning every chapter, archetype case study, causal
loop diagram, capability-maturity page, story, and simulation already in the book, so the concepts
reflect what the book actually teaches across all seven audiences.

## List of Concepts

We use generative AI to scan the book's content and produce a [Concept List](./concept-list.md).
Each concept is a short Title Case label, with most labels under 32 characters long.

## Concept Dependency List

We next use generative AI to create a Directed Acyclic Graph (DAG). DAGs do not have cycles where
concepts depend on themselves. We provide the DAG in two formats. One is a [CSV file](learning-graph.csv) and the other
format is a [JSON file](learning-graph.json) that uses the vis-network JavaScript library format. The vis-network format uses `nodes`, `edges` and `metadata`
elements with edges containing `from` and `to` properties. This makes it easy for you to view and edit the learning
graph using an editor built with the vis-network tools.

## Analysis & Documentation

### Learning Graph Quality Validation

This report gives you an overall assessment of the quality of the learning graph.
It uses graph algorithms to look for specific quality patterns in the graph.

- Graph structure validation - all concepts are connected
- DAG validation (no cycles detected)
- Foundational concepts: 6 entry points
- Indegree distribution analysis
- Longest dependency chains
- Connectivity: percent of nodes connected to the main cluster

[View the Learning Graph Quality Validation](quality-metrics.md)

### Concept Taxonomy

In order to see patterns in the learning graph, it is useful to assign colors
to each concept based on the concept type. We use generative AI to
create about a dozen categories for our concepts and then place each concept
into a single primary classifier.

- A concept classifier taxonomy with 13 categories
- Category organization - foundational elements first, applied/capstone topics last
- Balanced categories (2.5% - 18.4% each)
- All categories under the 30% threshold
- Clear 3-5 letter abbreviations for use in the CSV file

[View the Concept Taxonomy](concept-taxonomy.md)

### Taxonomy Distribution

This report shows how many concepts fit into each category of the taxonomy.
Our goal is a somewhat balanced taxonomy where each category holds a
reasonable number of concepts. We also don't want any category to contain
over 30% of our concepts.

- Statistical breakdown
- Detailed concept listing by category
- Visual distribution table
- Balance verification

[View the Taxonomy Distribution Report](./taxonomy-distribution.md)

### Interactive Graph Viewer

The full learning graph can be explored interactively, with nodes colored by taxonomy category,
in the [Learning Graph Viewer](../sims/graph-viewer/index.md) MicroSim.
