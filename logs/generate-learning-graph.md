# Session Log: Learning Graph Generation

**Date:** 2026-09-17
**Project:** Systems Thinking in the Age of AI (`/Users/dan/Documents/ws/systems-thinking`)
**Goal:** Regenerate the book's entire concept inventory from scratch (as the first step of rebuilding the chapter structure), then run it through the full `learning-graph-generator` pipeline: concept list → dependency graph → taxonomy → `learning-graph.json` → interactive graph viewer.

**Final state:** 528 concepts, 975 dependency edges, 13 taxonomy categories, valid DAG (0 cycles, 0 orphaned nodes), 148 terminal nodes (28.0%), interactive graph viewer installed and verified live in the browser.

---

## 1. Concept List Generation

**User prompt (verbatim):**
> I have decided to regenerate the entire book chapter structure from scratch. To begin, please generate a new inventory of ALL the concepts we have discussed in the current textbook. Scan all the markdown files in the @docs dir and also include concepts within the causal loop diagrams that are not specific to a specific diagram. Then put a list of all these concepts ordered from foundations to advanced in the file @docs/learning-graph/concept-list.md - our target is about 500 concepts total for this book, but you are free to add up to 600 concepts total.

### Approach

Scanning 205 markdown files directly would have blown the context budget, so the work was split into **3 parallel `general-purpose` research agents**, each given explicit inclusion/exclusion rules and asked to return a flat grouped list (no file writes):

1. **Chapters agent** — all 14 numbered chapters plus `chapters/graph/*.md`, preface/forward. Primary narrative source (~202 raw concepts).
2. **Archetypes agent** — `archetypes/` overview pages plus every case study across all 10 archetype families (~65 case studies). Explicitly instructed to extract only *general, reusable* systems-thinking vocabulary and *named, recurring* laws/effects — and to **exclude** narrow one-off case-specific nouns (e.g. "Ban The Box", "Bacteria Growth") that are illustration subject-matter, not teachable vocabulary (~64 concepts).
3. **CLD/CMM/sims/stories/course-descriptions agent** — causal loop diagram notation pages, capability-maturity pages, narrative stories, simulation index pages, and the 7 audience-specific course descriptions, filtered for generic teaching vocabulary and excluding implementation/UI details (~125 concepts).

Running all three agents in the **foreground in a single message** (rather than backgrounding them) was a deliberate choice: nothing else useful could happen until all three research passes completed, so there was no benefit to async dispatch.

### Design decisions considered

- **Raw yield (~330 unique concepts after dedup) fell short of the 500 target.** Rather than artificially padding with trivia, the shortfall was filled with concepts that are clearly *implied* by material the book already teaches heavily but hadn't been enumerated as discrete vocabulary — e.g. graph database/knowledge-representation terms (the book's explicit throughline per its own `AGENTS.md` description: "using systems thinking to promote enterprise knowledge graphs"), and AI/ML foundations (the book uses AI examples constantly: AI flywheel, algorithmic bias, LLMs, banning/cutting AI training). This is consistent with how the `learning-graph-generator` skill is meant to work generatively, not just via literal string-matching.
- **Rejected:** inventing ungrounded trivia (e.g., named historical figures like Jay Forrester never mentioned in the book) just to hit a round number — decided this violated the "inventory what's actually discussed" spirit of the request even though the skill nominally allows up to 600.
- **Format:** a single continuous numbered list (`1.` … `526.`) broken by `## <Roman numeral>. <Section Name>` headers for human review, organized into 30 thematic sections ordered foundational → advanced. Verified that CommonMark/python-markdown restart list numbering from the first explicit number after a heading, so interrupting a numbered list with headers is safe as long as downstream tooling parses "`N. Label`" lines directly (regex) rather than relying on rendered HTML numbering.
- **Label constraints applied:** Title Case, target ≤32 characters (the skill's stated limit for graph-viewer legibility). Several initial labels were manually shortened during drafting to fit (e.g. "Employment Recommendation Platform" → "Job Recommendation Platform"; "Regulating Negative Feedback Loops" → "Negative Feedback Strength").

### Outcome

Wrote **526 concepts** across 30 sections to `docs/learning-graph/concept-list.md`. Added a new `Learning Graph` nav section to `mkdocs.yml`.

---

## 2. Dependency Graph Generation

**User prompt (verbatim):**
> Go ahead and generate the dependency graph now

### Approach

Copied the skill's supporting Python scripts (`analyze-graph.py`, `csv-to-json.py`, `add-taxonomy.py`, `taxonomy-distribution.py`, `validate-learning-graph.py/.sh`, `learning-graph-schema.json`, `index-template.md`) from `~/.claude/skills/learning-graph-generator/` into `docs/learning-graph/`.

### Key design decision: backward-only dependency references

Rather than allowing dependencies to point to any `ConceptID` and then separately running cycle-detection, every dependency was constrained by construction to reference a **strictly lower** `ConceptID` than the concept itself (i.e. a concept can only depend on something introduced earlier in the foundational→advanced ordering). This makes the DAG property mathematically guaranteed — a graph where every edge points from a higher ID to a lower ID cannot contain a cycle, by simple induction — so no separate cycle-checking pass was needed during authoring (though `analyze-graph.py` was still run afterward to confirm and to check other quality dimensions).

All 526 rows were hand-authored (grouped by the same 30 sections) with this constraint in mind.

### Quality iteration

First `analyze-graph.py` pass surfaced two problems:

| Metric | First draft | Issue |
|---|---|---|
| Terminal nodes | 240 (45.6%) | Above the skill's healthy 5–40% range |
| Orphaned nodes | 1 (`Stakeholder`) | Had been left with zero dependencies entirely |
| Foundational concepts | Only 1 (`System`) | Very thin single-root structure |

**Options considered for the single-root issue:** leave `System` as the only zero-dependency concept vs. designate multiple independent "track" roots. Chose to make **6 concepts** foundational — `System`, `Cause And Effect`, `Graph (Data Structure)`, `Entity`, `Artificial Intelligence`, `Algorithm` — one per genuinely independent subject track (systems thinking, graph theory, data modeling, AI), since a student could plausibly start learning any of these without first knowing the others.

**Fix for the terminal-node rate:** rather than guessing at scale, wrote ~64 targeted dependency additions (each pointing an existing higher-ID concept at a lower-ID terminal concept it plausibly builds on — e.g. tying `Vicious Cycle` into `Addiction Cycle` and `Habit Formation Loop`, tying named laws like `Moore's Law`/`Scaling Laws` into `Quantum Computing`) via a Python script, re-ran the validator, and iterated once more. This pulled terminal nodes from 45.6% down to **27.9%**, comfortably inside range, and eliminated the orphan.

**Bug found during a final integrity sweep:** a self-written structural checker (verifying every dependency ID is `< ` its own row's ID) caught one manual transcription error — `Bottleneck` (ID 82) had listed `Constraint` (ID 83) as a dependency, a forward reference that had slipped past manual section-by-section review earlier. Fixed by dropping that one edge.

### Outcome

`learning-graph.csv` (526 rows, `ConceptID,ConceptLabel,Dependencies`), valid DAG, 0 cycles, 0 orphans, 1 connected component, 147→149 terminal nodes as later edits landed (final count below).

---

## 3. Concept Replacement: RDF Triple → Reification Challenges, SPARQL → Cypher + GQL

**User prompt (verbatim):**
> Please replace the concept 'RDF Triple' with 'Reification Challenges' in the concept list and the concept graph. Replace "SPARQL" with "Cypher" and and "GQL" after Cypher.

### Decisions

- Interpreted this as a genuine identity swap for two concepts (not just a text rename): `RDF Triple` → `Reification Challenges` keeps its RDF-track position (reification — representing statements-about-statements — is specifically an RDF weakness, so keeping the dependency on `RDF` still made sense unchanged). `SPARQL` → `Cypher` is a paradigm shift (RDF query language → property-graph query language), so its *dependency* needed to change too — from the old RDF Triple slot to `Property Graph`.
- **Inserting "GQL" "after Cypher"** required renumbering every concept from that point on (528 → the whole tail shifts +1), since the skill's convention is strict sequential integer IDs with no gaps. Wrote a reusable Python renumbering script: build an old-ID → new-ID mapping (identity below the insertion point, `+1` above it), remap every dependency list through that mapping, and insert the new row at the freed slot. This became the standard technique for all later mid-list insertions in the session.
- **Cascading semantic fixes required by the relabeling** (found by grep-searching for every row that depended on the old `RDF Triple`/`SPARQL` slots before touching anything):
  - `Semantic Web` no longer made sense depending on "Cypher" (a property-graph language) — repointed to depend on `RDF` directly.
  - `Triple Store` no longer made sense depending on the old "RDF Triple" slot (now a critique concept, not a definition) — repointed to `RDF` directly.
  - `Graph Query Language` (general concept) was **left unchanged**, still depending on the renamed `Cypher` — a concrete-example-before-abstraction relationship that still holds.

### Flagged, not auto-fixed

Noted to the user that the list already had `Cypher Query Language` (505) and `Gremlin Query Language` (506) later in the "Knowledge Graph Applications" section, creating a near-duplicate with the new standalone `Cypher` concept — flagged rather than silently touched, since it was outside the literal scope of the request. (This later became the basis for request #5.)

### Outcome

527 concepts. Re-validated: 0 cycles, 0 orphans, 28.3% terminal (still healthy).

---

## 4. Add "Education" Domain

**User prompt (verbatim):**
> Add one more domain of "Education" in ## XXX. Systems Thinking Across Disciplines

### Decisions

- Matched the existing domain-list naming pattern in that section (`Economic System`, `Ecological System`, `Social System`, etc.) → labeled it **`Education System`**.
- Placement: inserted after `Political System` and before `Market System` (education and political/public systems are commonly studied together) rather than appending at the very end of the section.
- Dependencies: `System` (1) and `Systems Thinking` (10) — identical pattern to its sibling domain concepts, all of which are deliberately terminal (nothing depends on them; they're capstone "systems thinking applies to X" concepts, not prerequisites for anything else in the graph).
- Used the same renumber-via-script technique from step 3.

### Outcome

528 concepts. Well-grounded given how much of the book's archetype material already lives in education (grade inflation, standardized testing, banning books, cutting STEM, EdTech funding gap, college cramming, AI homework).

---

## 5. Relabel Cypher/Gremlin Query Language → Graph Algorithms / Graph Neural Networks

**User prompt (verbatim):**
> Change concept "Cypher Query Language" to be "Graph Algorithms" and change "Gremlin Query Language" to be "Graph Neural Networks" and update their relationships

### Decisions

This directly resolved the near-duplicate flagged in step 3. No renumbering needed — pure in-place relabel since nothing pointed to either row.

- **Graph Algorithms** (505): rewired its own dependencies from the old `Native Graph Database | Graph Query Language` pair to `Graph Traversal | Shortest Path | Centrality` — the actual algorithmic primitives that "graph algorithms" as a category is built from.
- **Graph Neural Networks** (506): rewired to depend on `Neural Network` + `Graph Algorithms` — a GNN needs both a neural-network foundation and graph-algorithmic grounding.
- **Downstream rewiring** (the "update their relationships" part, read as applying to the surrounding graph, not just the two renamed rows): `Graph Analytics` (507) was re-pointed to depend on the new `Graph Algorithms` directly instead of the raw `Graph Traversal | Centrality` pair it previously cited — now more specific and meaningful. `Recommendation Engine` (510) gained an additional dependency on `Graph Neural Networks`, reflecting that GNN-based recommenders are a standard real-world pattern.

### Outcome

Still 528 concepts (pure relabel, no insertion). Re-validated clean.

---

## 6. Relabel Triple Store → Context Graph

**User prompt (verbatim):**
> Change "Triple Store" to be "Context Graph"

### Decisions

- Nothing depended on the old `Triple Store` row, so this was a clean in-place relabel.
- Its own dependencies (`RDF`, `Data Lake` — appropriate for an RDF storage technology) no longer fit "Context Graph," a more current concept describing a graph structure that grounds AI/LLM systems in enterprise-specific, retrievable context. Rewired to depend on `Enterprise Knowledge Graph`, `Large Language Model`, and `Vector Database` — reflecting how context graphs typically pair with vector retrieval to ground LLM outputs (the RAG/grounding pattern).

### Outcome

528 concepts, unchanged count. Re-validated clean.

---

## 7. Relabel Quantum Computing → Quantum Computing Claims

**User prompt (verbatim):**
> Change "Quantum Computing" to be "Quantum Computing Claims"

### Decisions

- Nothing depended on this row either — clean in-place relabel.
- Kept its existing prerequisites (`Moore's Law`, `Computational Resource Limit`, `Artificial Intelligence`, `Emerging Technology System`) since they're still relevant grounding for evaluating the technology.
- Added a new dependency on `Exponential Blind Spot` (105) — the rename shifts the concept's framing from "the technology" to "critically evaluating hyped claims about it," and the exponential-blind-spot concept (over-extrapolating exponential curves) is exactly the reasoning tool needed to evaluate those claims, matching the book's established critical-evaluation throughline (Proxy Metric, Measurement Trap, Streetlight Effect, etc.).

### Outcome

528 concepts, unchanged count. Re-validated clean.

---

## 8. Taxonomy Generation

**User prompt (verbatim):**
> Go ahead and generate the taxonomy now

### Approach

The skill targets ~12 categories (±2–3). Rather than starting from scratch, consolidated the concept list's existing **30 thematic sections** into taxonomy categories, since those boundaries were already coherent and foundational→advanced ordered.

### Design decision: category boundaries must be contiguous ID ranges

`add-taxonomy.py` (the skill's range-based classifier script) only supports **one contiguous `ConceptID` range per taxonomy key** — it can't assign two disjoint ranges to the same category. This mattered because the natural thematic grouping ("CLD notation" + "stocks/flows" + "growth/nonlinear" + "feedback/resilience" = sections II+III+IV+V) was *not* contiguous once "Growth, Delay & Nonlinear Behavior" was considered a separate category from its neighbors.

**Resolved by merging Growth into the surrounding Dynamics category** (sections II–V → one `DYNM` category spanning IDs 44–140, 97 concepts) rather than fighting the tool — growth/nonlinear behavior is thematically close enough to stocks/flows/feedback that this was a clean merge, not a compromise. This dropped the category count from a planned 14 down to **13**, still within the skill's ±2–3 tolerance.

### Final category design (all contiguous ranges, largest 18.4% — well under the 30% cap)

| Category | ID | Range | Count | % |
|---|---|---|---|---|
| Systems Thinking Foundations | FOUND | 1–43 | 43 | 8.1% |
| System Dynamics & Feedback | DYNM | 44–140 | 97 | 18.4% |
| Systems Archetypes | ARCH | 141–176 | 36 | 6.8% |
| Archetype Case Studies & Named Laws | CASE | 177–245 | 69 | 13.1% |
| Leverage Points & Emergence | LEVR | 246–287 | 42 | 8.0% |
| Graph Theory & Graph Databases | GRPH | 288–319 | 32 | 6.1% |
| Knowledge Representation & Data Management | KREP | 320–358 | 39 | 7.4% |
| Enterprise Knowledge Graphs & Silos | ENTK | 359–406 | 48 | 9.1% |
| Artificial Intelligence Systems | ARTI | 407–444 | 38 | 7.2% |
| Knowledge Systems & Economic Complexity | KSEC | 445–464 | 20 | 3.8% |
| Systems Design & Future Practice | DSGN | 465–490 | 26 | 4.9% |
| Knowledge Graph Applications | KGAP | 491–515 | 25 | 4.7% |
| Systems Thinking Across Disciplines | DISC | 516–528 | 13 | 2.5% |

### Color palette

Assigned colors **positionally** from the skill's recommended 24-color palette (its own documented fallback behavior when no prior `color-config.json` exists), rather than hand-optimizing every hue pairing up front — verified and fixed collisions reactively once they were visible in the rendered legend (see sections 10–11 below), which proved more reliable than trying to eyeball hue-distance from color names alone.

### Files created

`concept-taxonomy.md` (category descriptions + ID ranges), `taxonomy-names.json` (ID → display name), `color-config.json` (ID → color), `taxonomy-config.json` (ID → range config fed to `add-taxonomy.py`), `taxonomy-distribution.md` (balance report — confirmed no over-represented categories). Added a `TaxonomyID` 4th column to `learning-graph.csv`. Added both new reports to the `mkdocs.yml` nav.

---

## 9. `learning-graph.json` Generation + Graph Viewer MicroSim

**User prompt (verbatim):**
> Yes, go ahead and also generate the graph viewer microsim

*(Follows directly from the assistant's own offer at the end of step 8 to generate the JSON next — the user's "Yes" confirms that offer, and adds the viewer request.)*

### `learning-graph.json`

Created `metadata.json` (title/creator/license from the book's own `mkdocs.yml`), then ran `csv-to-json.py` with `color-config.json`, `metadata.json`, and `taxonomy-names.json`.

**Sanity check performed:** inspected the top-10 concepts by Concept Impact Score (CIS — a recursive "how much of the book's understanding transitively rests on this concept" measure). Top results were `System`, `Subsystem`, `Interconnection`, `Cause And Effect`, `Systems Thinking`, `Systems Map`, `Causal Loop Diagram`, `Node`, `Edge (CLD)`, `Causal Link` — all genuinely foundational concepts with many transitive dependents. This is the standard check the skill recommends for catching an *inverted* edge direction (if a narrow/advanced concept had topped the list, it would mean dependencies were pointing the wrong way); it passed cleanly, confirming the backward-only-reference DAG design from step 2 produced correct semantics, not just a valid DAG shape.

Validated against `learning-graph-schema.json` via `validate-learning-graph.sh` — passed (528 nodes, 975 edges, 13 groups, 0 orphaned nodes).

### Graph Viewer MicroSim

Invoked the `book-installer` skill, routed to `learning-graph-viewer.md`. Followed its steps exactly:

1. Verified `classifierName` values were human-readable (not raw taxonomy IDs) for all 13 groups.
2. Copied the 4 template files (`main.html`, `script.js`, `local.css`, `index.md`) from `$BK_HOME/skills/book-installer/references/assets/` into `docs/sims/graph-viewer/`.
3. Replaced the `TITLE` placeholder with the book's actual title.
4. **Reordered the JSON's `groups` object** to match `concept-taxonomy.md`'s category order (foundational→advanced) rather than the CSV's arbitrary first-appearance order, so the sidebar legend reads in a sensible sequence.
5. Added a fullscreen-link button + embedded `<iframe>` to the top of `docs/learning-graph/index.md`.
6. Wired the new MicroSim into the `mkdocs.yml` `MicroSims` nav section.

### Live verification

Rather than declaring success from file existence alone, opened the book's already-running `mkdocs serve` instance (per project convention: never start/stop that process yourself) in the built-in browser and checked:

- Legend renders all 13 categories with correct counts/colors.
- Force-directed graph loads and stabilizes with all 528 nodes visible.
- Search-and-autocomplete correctly tags results by category (tested "Leverage" → 7 matches, all correctly tagged `Leverage Points & Emergence`).
- Clicking a search result highlights its real dependency chain (tested `Leverage Point` → correctly traced back through `Feedback Loop`, `Causal Loop Diagram`, `Interconnection`, `System`, etc.).
- No console errors on either the standalone `main.html` page or the embedded iframe on `learning-graph/index.md`.
- Checked network requests directly — the one 404 that appeared in console logs was traced to the assistant's own earlier mistyped test URL (missing the `/systems-thinking/` site prefix), not a real asset failure; every actual page load returned 200 OK.

Also created `docs/learning-graph/index.md` from the skill's `index-template.md`, adapted since this project doesn't use a single `course-description.md` (it has 7 audience-specific descriptions) — rewrote that section to explain that concepts were derived by scanning existing book content across all 7 audiences rather than from one course description.

---

## 10. Color Fix: System Dynamics & Feedback vs. Systems Thinking Across Disciplines

**User prompt (verbatim):**
> There are two categories that have almost identical colors: System Dynamics & Feedback and Systems Thinking Across Disciplines are both purple. Please make one of them a distinct color.

### Decision

`DYNM` (`DarkSlateBlue`, RGB 72,61,139) and `DISC` (`Indigo`, RGB 75,0,130) are close enough in hue and lightness to be genuinely hard to distinguish at legend-swatch size. Left the larger, more central category (`DYNM`, 97 concepts) unchanged and changed the smaller one (`DISC`, 13 concepts) to **`DimGray`** — chosen because (a) it reads as clearly distinct from every blue/purple/red already in the 13-color palette, and (b) its "emerging/miscellaneous/broad" connotation in the skill's suggested palette semantics fits a closing "applies across many other disciplines" capstone category reasonably well.

Also proactively noted (but did not act on) that `KGAP` (`MediumPurple`) is a *third* purple-family color, judged as visually distinguishable enough given its lighter/more-saturated tone — flagged for the user's awareness rather than changed unrequested.

### Process (established as the repeatable pattern for both color fixes)

1. Edit `color-config.json`.
2. Re-run `csv-to-json.py` (regenerates the full JSON from the CSV + configs).
3. Re-run the group-reorder script (regeneration resets group key order; must reapply the taxonomy-order sort each time).
4. Re-run `validate-learning-graph.sh`.
5. Reload the live viewer in the browser and visually confirm.

### Outcome

Verified live: swatches clearly separated; spot-checked with a search for an unrelated `DISC` concept.

---

## 11. Color Fix: Systems Archetypes vs. Knowledge Representation & Data Management

**User prompt (verbatim):**
> Systems Archetypes and Knowledge Representation & Data Management also have an almost identical green. Make one of these two more distinct.

### Decision

`ARCH` (`DarkGreen`) and `KREP` (`Teal`) are both dark, medium-saturation green-family colors. Changed **`KREP`** to **`Peru`** (a warm tan/brown) — chosen specifically to move it out of the green/blue-green family entirely rather than picking another shade of green, since the underlying problem was hue proximity, not just lightness. `ARCH`'s `DarkGreen` was left alone since "Systems Archetypes" is a large, central category better served by staying put.

Followed the same 5-step process as step 10. Confirmed the `csv-to-json.py` auto-font-color logic correctly assigned `Peru` a **black** font (it's a light-background color in the skill's dark/light palette split) without manual intervention.

### Outcome

Verified live: the two swatches are now a clear dark green vs. warm brown, unambiguous. User response: "nice!"

---

## 12. Design Question: Should "Feedback" Be Foundational?

**User prompt (verbatim):**
> Should "Feedback" be a foundational concept?

### Analysis performed (not a file change — an analysis/discussion turn)

Checked `Feedback`'s (ID 60) actual dependency: `Cause And Effect` (ID 18). Argued **against** making it a zero-dependency root:

- It has a real, legitimate prerequisite already in the graph — understanding feedback (an effect looping back to become a cause) requires first grasping that A causes B. Collapsing that edge would remove a genuine teaching dependency, not just tidy up the graph.
- Distinguished two different properties that are easy to conflate: **"foundational"** (zero prerequisites — an entry point requiring no prior concept from this graph) vs. **"important/central"** (high indegree / high CIS — many other concepts transitively depend on it). Feedback is clearly the second, not really the first.
- Backed this with data: computed Feedback's CIS rank directly from `learning-graph.json` — **#24 of 528** (top 5%), with 3 direct dependents (`Feedback Loop`, `Positive Feedback`, `Negative Feedback`) and the entire 97-concept `DYNM` category and everything built on loops/archetypes transitively resting on it.
- Listed the graph's actual 6 foundational (zero-dependency) concepts for contrast: `System`, `Cause And Effect`, `Graph (Data Structure)`, `Entity`, `Artificial Intelligence`, `Algorithm` — each the true entry point of a genuinely independent subject track.

**User's decision:** agreed to keep as-is — no change made.

---

## 13. Session Log

**User prompt (verbatim):**
> No, keep it as-is - I am super-happy with this new learning graph. Please create a detailed session log and include exactly what I asked for in my prompts. Record all your decisions and design options you considered. Write the session log to logs/generate-learning-graph.md

This document.

---

## Final Deliverables

| File | Purpose |
|---|---|
| `docs/learning-graph/concept-list.md` | 528 concepts, 30 thematic sections, foundational → advanced order |
| `docs/learning-graph/learning-graph.csv` | `ConceptID, ConceptLabel, Dependencies, TaxonomyID` — 528 rows |
| `docs/learning-graph/quality-metrics.md` | DAG validation report (0 cycles, 0 orphans, 148 terminal nodes / 28.0%) |
| `docs/learning-graph/concept-taxonomy.md` | 13 categories, descriptions, ID ranges |
| `docs/learning-graph/taxonomy-names.json` | TaxonomyID → display name |
| `docs/learning-graph/color-config.json` | TaxonomyID → color (final, collision-free) |
| `docs/learning-graph/taxonomy-config.json` | TaxonomyID → ID-range config for `add-taxonomy.py` |
| `docs/learning-graph/taxonomy-distribution.md` | Category balance report |
| `docs/learning-graph/metadata.json` | Book metadata for the JSON generator |
| `docs/learning-graph/learning-graph.json` | Full vis-network graph (528 nodes, 975 edges, 13 groups, CIS scores) |
| `docs/learning-graph/index.md` | Section landing page with embedded viewer |
| `docs/sims/graph-viewer/` | Interactive MicroSim (main.html, script.js, local.css, index.md) |
| `mkdocs.yml` | Nav updated: new `Learning Graph` section, `Learning Graph Viewer` under `MicroSims` |

## Cross-Cutting Techniques Established This Session

1. **Backward-only dependency references** (dependency `ConceptID` must be `<` the concept's own ID) — guarantees a valid DAG by construction; used throughout instead of allow-then-detect-cycles.
2. **Full renumbering script for mid-list insertions** — build an old→new ID mapping, remap every dependency list through it, insert the new row at the freed slot. Used for the GQL and Education System insertions.
3. **In-place relabel for same-slot concept swaps** — no renumbering needed when nothing downstream is structurally affected; just update the label and reconsider that row's own dependencies (and any rows that depended on it, found via grep before editing).
4. **5-step color-fix loop**: edit `color-config.json` → regenerate JSON via `csv-to-json.py` → reapply the taxonomy-order group sort → re-validate against the schema → reload and visually confirm in the live browser.
5. **Live browser verification** for every structural or visual change to the graph viewer, using the project's already-running `mkdocs serve` instance rather than starting a new one.
