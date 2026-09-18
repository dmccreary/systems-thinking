# Glossary Quality Report

Generated: 2026-09-18 by the `glossary-generator` skill from `docs/learning-graph/learning-graph.csv` (528 concepts).

## Summary

| Metric | Value |
|--------|-------|
| Concepts in learning graph | 528 |
| Glossary entries | 528 (100% coverage) |
| Missing / duplicate / unknown entries | 0 / 0 / 0 |
| Alphabetical ordering | 100% (pass) |
| Average definition length | 27.7 words |
| Definitions within 20–50 words | 528 (100%) |
| Entries with an example | 375 (71%) |
| "See also" links | 543 |
| "Contrast with" links | 54 |
| Entries with at least one cross-reference | 327 (62%) |
| Broken cross-references | 0 |
| Entries linked to their chapter | 528 (100%) |
| Definitions containing business rules (must/shall/should) | 0 |
| Average ISO 11179 score (heuristic) | 99.7 / 100 |
| Definitions scoring below 85 | 0 |

## ISO 11179 Compliance

Each definition was scored on four 25-point criteria, with a deduction for business rules:

1. **Precision** — the definition is substantive (12+ words) and written in the sense used by the chapter that teaches it.
2. **Conciseness** — full marks for 20–50 words.
3. **Distinctiveness** — definitions are compared pairwise; pairs sharing more than 60% of their content words are flagged.
4. **Non-circularity** — flagged when every distinctive word of the term reappears in the first sentence of its definition.
5. **Unencumbered by business rules** — flagged when a definition uses "must", "shall", or "should".

These scores are automated heuristics, not a human review.

### Flagged items (reviewed)

- **Possible circularity (8):** Campbell's Law, ETL Process, Goodhart's Law, Graph (Data Structure), Graph Database, Metcalfe's Law, Moore's Law, Thurstone's Law. All were reviewed and are false positives: named laws include the person's name (for example, "stated by social scientist Donald Campbell"), "ETL Process" spells out its own acronym, and the two graph entries use "data structure" or "database" as the genus term.
- **Similar definitions (3 pairs):** Balancing Loop Label / Reinforcing Loop Label; Negative Causal Link / Positive Causal Link; Vicious Cycle / Virtuous Cycle. These are deliberate paired opposites written in parallel structure, and each pair is linked with "Contrast with".

## Example Coverage by Category

| Taxonomy Category | Terms | With Example | Coverage |
|-------------------|-------|--------------|----------|
| System Dynamics & Feedback | 97 | 62 | 64% |
| Archetype Case Studies & Named Laws | 69 | 51 | 74% |
| Enterprise Knowledge Graphs & Silos | 48 | 31 | 65% |
| Systems Thinking Foundations | 43 | 34 | 79% |
| Leverage Points & Emergence | 42 | 30 | 71% |
| Knowledge Representation & Data Management | 39 | 29 | 74% |
| Artificial Intelligence Systems | 38 | 23 | 61% |
| Systems Archetypes | 36 | 26 | 72% |
| Graph Theory & Graph Databases | 32 | 21 | 66% |
| Systems Design & Future Practice | 26 | 21 | 81% |
| Knowledge Graph Applications | 25 | 20 | 80% |
| Knowledge Systems & Economic Complexity | 20 | 17 | 85% |
| Systems Thinking Across Disciplines | 13 | 10 | 77% |

## Readability

| Text | Flesch-Kincaid Grade (est.) |
|------|-----------------------------|
| Definitions | 15.4 |
| Examples | 11.0 |

The definitions score high because ISO 11179 favors single, dense sentences (about 28 words each), which pushes up grade-level formulas. The examples are written in plainer language and serve as the entry point for junior-high and high-school readers. This spread suits the book's audience range (8th grade through executives), but younger readers may need a teacher's help with the definitions.

## Links

- Every entry ends with a **Covered in:** link to the chapter that teaches the concept (from each chapter's *Concepts Covered* table).
- Thirteen archetype terms also link to their archetype example pages in `docs/archetypes/`.
- Cross-references use in-page anchors (for example, `#balancing-loop`) that match MkDocs' default heading slugs.
- Inbound links from other pages that used old anchors (`#archetype`, `#causal-loop-diagrams`) or wrong relative paths were updated.

## Items for Author Review

- **Book-specific terms:** Law Of Time, Law Of Space, Law Of Value, Infinite Alphabet Metaphor, and Thurstone's Law were defined from how the chapters use them.
- **Near-synonym pairs:** Goal Erosion / Eroding Goals, Positive Causal Link / Same-Direction Link, Delay / Time Delay, and Quick Fix / Symptomatic Solution were given distinct angles. Consider merging these in a future concept-list revision.
- **Lowest example coverage:** the System Dynamics & Feedback category is the best place to add more examples.

## Companion File

`docs/learning-graph/glossary-cross-ref.json` lists each term's anchor, related terms, contrasting terms, taxonomy category, and chapter, for use in search or concept-relationship visualizations.
