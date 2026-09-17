# Chapter 2: Graph Databases

Chapter Overview

* What are graph databases?
* What problems do graph databases solve?
* How are graph databases different from relational databases?

## What are graph databases?

* Vertices and edges
* Both may have attributes
* A universal structure for representing knowledge
* Many implementations
  * RDF
  * LPG
* Neo4j Championed the native LPG data model
  * Pointer Hopping is roughly 1,000 the performance of RDBMS JOIN operation
* TigerGraph championed the distributed native LPG model
  * No more concerns about scale-out graphs
  * Scale out over 100 nodes allows a 100x performance speedup
* Intel and other companies working on 1,000x performance speedup of native labeled property graphs
* Combined, these three technologies offer a 10,000,000x performance speedup
* Key limitations are the cost of integrating data

## What problems do graph databases solve?

* Performance on edge traversals
* Work well with highly connected data sets
* Excellent at modeling complex Relationships
* Precise models are more shareable across multiple business units

## How are graph databases different from relational databases?


## Graph timelines

* The seven bridges of Konigsberg
* The Samenatic Web - 2001
* RDF
* SPARQL
* Neo4j - The LPG data model