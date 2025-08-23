#!/usr/bin/env python3
"""
cld_graph_check.py — Structural checks for Causal Loop Diagram (CLD) JSON files.

Checks (in order):
  1) Every node is connected to at least two other nodes.
  2) Every edge connects two existing nodes in the CLD.
  3) Every loop is a closed loop (no dangling nodes or missing edges).
  4) Every loop is labeled as Reinforcing or Balancing.

Usage:
  python cld_graph_check.py path/to/your.cld.json [--schema path/to/cld-schema.json]

Notes:
  - The optional --schema flag will validate basic JSON structure with jsonschema
    if the 'jsonschema' package is installed. If not installed, the script will
    continue with graph checks.
"""

import argparse
import json
import sys
from collections import defaultdict

CHECK = "✅"
X = "❌"

def load_json(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"{X} Could not read JSON file '{path}': {e}")
        sys.exit(2)

def maybe_schema_validate(doc, schema_path):
    if not schema_path:
        return True, None
    try:
        import jsonschema  # optional
    except ImportError:
        return False, "jsonschema not installed; skipping schema validation."

    schema = load_json(schema_path)
    try:
        jsonschema.validate(instance=doc, schema=schema)
        return True, None
    except jsonschema.exceptions.ValidationError as ve:
        return False, f"Schema validation failed: {ve.message}"

def index_graph(doc):
    nodes = doc.get("nodes", [])
    edges = doc.get("edges", [])
    loops = doc.get("loops", [])

    node_ids = {n["id"] for n in nodes if "id" in n}

    # Directed adjacency for edge existence checks; undirected neighbor sets for degree
    out_edges = defaultdict(set)   # u -> {v, ...}
    in_edges = defaultdict(set)    # v -> {u, ...}
    undirected_neighbors = defaultdict(set)  # u -> {neighbors}

    edge_list = []
    for e in edges:
        eid = e.get("id")
        u = e.get("source")
        v = e.get("target")
        edge_list.append((eid, u, v))
        if u is not None and v is not None:
            out_edges[u].add(v)
            in_edges[v].add(u)
            if u != v:
                undirected_neighbors[u].add(v)
                undirected_neighbors[v].add(u)
            else:
                # self-loop counts as only 1 unique neighbor (itself),
                # which does NOT help reach the "two other nodes" requirement.
                pass
    return node_ids, edge_list, out_edges, in_edges, undirected_neighbors, loops

def check_1_min_degree(node_ids, undirected_neighbors):
    """Every node is connected to at least two other nodes (unique neighbors >= 2)."""
    failing = []
    for n in sorted(node_ids):
        deg = len(undirected_neighbors[n])
        if deg < 2:
            failing.append((n, deg))
    if failing:
        print(f"{X} Test 1: Every node has >= 2 unique neighbors — FAIL")
        for n, deg in failing:
            print(f"    - Node '{n}' has only {deg} unique neighbor(s): "
                  f"{sorted(undirected_neighbors[n])}")
        return False
    else:
        print(f"{CHECK} Test 1: Every node has >= 2 unique neighbors — PASS")
        return True

def check_2_edges_connect_existing_nodes(node_ids, edge_list):
    """Every edge connects two nodes in the CLD (no dangling endpoints)."""
    failing = []
    for (eid, u, v) in edge_list:
        missing = []
        if u not in node_ids:
            missing.append(f"source '{u}'")
        if v not in node_ids:
            missing.append(f"target '{v}'")
        if missing:
            failing.append((eid, ", ".join(missing)))
    if failing:
        print(f"{X} Test 2: Every edge connects two existing nodes — FAIL")
        for eid, what in failing:
            print(f"    - Edge '{eid}' references missing {what}")
        return False
    else:
        print(f"{CHECK} Test 2: Every edge connects two existing nodes — PASS")
        return True

def edge_exists(out_edges, u, v):
    """Directed edge existence u -> v."""
    return v in out_edges.get(u, set())

def check_3_loops_closed(node_ids, out_edges, loops):
    """
    Every loop is a closed loop (no dangling nodes). For each loop:
      - All nodes in path exist.
      - For each consecutive pair (path[i] -> path[i+1]) an edge exists.
      - And there is closure back to the start (either the path repeats start at end,
        or an explicit edge last -> first exists).
    """
    if not loops:
        # If there are no loops declared, the condition "every loop is closed" is vacuously true.
        print(f"{CHECK} Test 3: Every loop is a closed loop — PASS (no loops declared)")
        return True

    failing = []
    for L in loops:
        lid = L.get("id", "<missing-id>")
        path = L.get("path", [])
        reasons = []

        if not path or len(path) < 3:
            reasons.append(f"path too short (len={len(path)})")
        else:
            # 3a) all nodes exist
            missing_nodes = [n for n in path if n not in node_ids]
            if missing_nodes:
                reasons.append(f"missing node(s) in path: {missing_nodes}")

            # 3b) consecutive edges (including closure) exist
            # Determine whether path already includes closure repetition
            repeats_start = (len(path) >= 2 and path[0] == path[-1])

            # If repeated, we check pairs (i -> i+1) for i in [0..len(path)-2]
            # Else we check all pairs and additionally last -> first
            pairs = []
            if repeats_start:
                pairs = list(zip(path[:-1], path[1:]))
            else:
                pairs = list(zip(path, path[1:])) + [(path[-1], path[0])]

            missing_edges = [(u, v) for (u, v) in pairs if not edge_exists(out_edges, u, v)]
            if missing_edges:
                reasons.append(f"missing directed edge(s): {missing_edges}")

        if reasons:
            failing.append((lid, reasons))

    if failing:
        print(f"{X} Test 3: Every loop is a closed loop — FAIL")
        for lid, reasons in failing:
            for r in reasons:
                print(f"    - Loop '{lid}': {r}")
        return False
    else:
        print(f"{CHECK} Test 3: Every loop is a closed loop — PASS")
        return True

def check_4_loops_labeled(loops):
    """Every loop is labeled as Reinforcing or Balancing (type ∈ {reinforcing, balancing})."""
    if not loops:
        print(f"{CHECK} Test 4: Every loop is labeled Reinforcing or Balancing — PASS (no loops declared)")
        return True

    valid = {"reinforcing", "balancing"}
    failing = []
    for L in loops:
        lid = L.get("id", "<missing-id>")
        t = L.get("type")
        if t not in valid:
            failing.append((lid, t))
    if failing:
        print(f"{X} Test 4: Every loop is labeled Reinforcing or Balancing — FAIL")
        for lid, t in failing:
            print(f"    - Loop '{lid}' has invalid or missing type: {t!r} "
                  f"(expected one of {sorted(valid)})")
        return False
    else:
        print(f"{CHECK} Test 4: Every loop is labeled Reinforcing or Balancing — PASS")
        return True

def main():
    ap = argparse.ArgumentParser(description="CLD graph-structure checker")
    ap.add_argument("cld_json", help="Path to CLD JSON file")
    ap.add_argument("--schema", help="Optional path to JSON Schema (cld-schema.json)", default=None)
    args = ap.parse_args()

    doc = load_json(args.cld_json)

    # Optional: basic JSON Schema validation first (does not replace graph checks)
    ok, msg = maybe_schema_validate(doc, args.schema)
    if args.schema:
        if ok and msg is None:
            print(f"{CHECK} Schema validation — PASS")
        else:
            if msg:
                print(f"{X} Schema validation — {msg}")
            # Continue with graph checks regardless

    node_ids, edge_list, out_edges, in_edges, undirected_neighbors, loops = index_graph(doc)

    # Run checks in order
    overall_ok = True
    overall_ok &= check_1_min_degree(node_ids, undirected_neighbors)
    overall_ok &= check_2_edges_connect_existing_nodes(node_ids, edge_list)
    overall_ok &= check_3_loops_closed(node_ids, out_edges, loops)
    overall_ok &= check_4_loops_labeled(loops)

    # Exit code summarizing outcome
    sys.exit(0 if overall_ok else 1)

if __name__ == "__main__":
    main()
