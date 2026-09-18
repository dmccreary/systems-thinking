// Graph Algorithms Explorer - vis-network
// CANVAS_HEIGHT: 560
// Chapter 26: Knowledge Graph Applications and Data Architecture
// Learning objective: apply community detection to identify densely connected
// clusters and apply link prediction to identify a plausible missing edge, then
// interpret both results (Bloom: Apply).

var NEUTRAL_BG = '#E3E7EB';
var NEUTRAL_BORDER = '#8A97A5';
var PASTELS = ['#BBD7EF', '#C6E6CE', '#F3D9B4', '#E0CCEA'];
var PASTEL_BORDERS = ['#1F6FB2', '#2E8B57', '#B8611A', '#6A4C93'];
var PREDICT_COLOR = '#E8871A';

// An 18-person network: two working groups that overlap only through a couple
// of people who sit on both.
var PEOPLE = [
    'Ana', 'Ben', 'Cara', 'Dev', 'Elena', 'Femi', 'Gita', 'Hugo', 'Ines',
    'Jonas', 'Kira', 'Luis', 'Mei', 'Nils', 'Omar', 'Pia', 'Quinn', 'Rosa'
];

var PAIRS = [
    // Group 1 (Ana..Ines) - a dense product team. Gita, Hugo and Ines are tied
    // back into the rest of the team deliberately: without those edges the
    // weakest cut in the whole network falls INSIDE this group rather than at
    // the two bridges, and community detection splits it in the wrong place.
    ['Ana', 'Ben'], ['Ana', 'Cara'], ['Ana', 'Dev'], ['Ben', 'Cara'],
    ['Ben', 'Elena'], ['Cara', 'Dev'], ['Cara', 'Femi'], ['Dev', 'Elena'],
    ['Elena', 'Femi'], ['Femi', 'Gita'], ['Gita', 'Hugo'], ['Hugo', 'Ines'],
    ['Gita', 'Ines'], ['Ben', 'Gita'], ['Elena', 'Gita'], ['Dev', 'Hugo'],
    ['Ana', 'Ines'], ['Cara', 'Hugo'],
    // Group 2 (Jonas..Rosa) - a dense platform team
    ['Jonas', 'Kira'], ['Jonas', 'Luis'], ['Kira', 'Luis'], ['Kira', 'Mei'],
    ['Luis', 'Nils'], ['Mei', 'Nils'], ['Mei', 'Omar'], ['Nils', 'Pia'],
    ['Omar', 'Pia'], ['Omar', 'Quinn'], ['Pia', 'Rosa'], ['Quinn', 'Rosa'],
    ['Jonas', 'Quinn'], ['Jonas', 'Mei'], ['Luis', 'Pia'], ['Kira', 'Quinn'],
    ['Nils', 'Rosa'], ['Omar', 'Luis'],
    // The two bridges between the groups
    ['Ines', 'Jonas'], ['Hugo', 'Kira']
];

// Leave a margin around the force-directed layout so no node lands on the
// canvas edge or under the navigation buttons.
var FIT_SCALE = 0.94;

// Seed each team in its own ring before physics runs. From a cold start the
// force-directed layout strings all 18 nodes into one diagonal band, which
// both wastes the canvas and hides the two-cluster structure the sim teaches.
function seedPosition(index) {
    var group = index < 9 ? 0 : 1;
    var withinGroup = index % 9;
    var angle = (2 * Math.PI * withinGroup) / 9;
    var cx = group === 0 ? -185 : 185;
    return { x: cx + 115 * Math.cos(angle), y: 115 * Math.sin(angle) };
}

var GRAPH = {
    nodes: PEOPLE.map(function (p, i) {
        var pos = seedPosition(i);
        return { id: p, label: p, shape: 'dot', size: 15, x: pos.x, y: pos.y,
                 font: { size: 14, face: 'Arial' },
                 color: { background: NEUTRAL_BG, border: NEUTRAL_BORDER } };
    }),
    edges: PAIRS.map(function (pair, i) {
        return { id: 'e' + i, from: pair[0], to: pair[1] };
    })
};

var communities = null;     // set once "Detect Communities" runs
var predicted = null;       // set once "Predict Missing Link" runs

function neighborsOf(id) {
    var out = [];
    PAIRS.forEach(function (p) {
        if (p[0] === id) { out.push(p[1]); }
        if (p[1] === id) { out.push(p[0]); }
    });
    return out;
}

function degreeOf(id) { return neighborsOf(id).length; }

/**
 * Girvan-Newman community detection.
 *
 * Repeatedly removes the edge with the highest betweenness -- the edge that
 * the most shortest paths run through, which is almost always a bridge
 * between groups -- until the network falls apart into separate components.
 * Those components are the communities.
 *
 * Label propagation was the obvious cheaper choice here and it is not usable:
 * on a graph with a couple of bridges a single label sweeps across both teams
 * and it reports one community covering everybody.
 */
function detectCommunities() {
    // Work on a mutable copy of the edge list.
    var edgeList = PAIRS.map(function (p) { return [p[0], p[1]]; });

    for (var round = 0; round < PAIRS.length; round++) {
        var comps = componentsOf(edgeList);
        if (comps.count > 1) { return comps.labels; }
        var worst = highestBetweennessEdge(edgeList);
        if (!worst) { break; }
        edgeList.splice(worst, 1);
    }
    return componentsOf(edgeList).labels;
}

/** Adjacency list for a given edge list. */
function adjacencyOf(edgeList) {
    var adj = {};
    PEOPLE.forEach(function (p) { adj[p] = []; });
    edgeList.forEach(function (e) { adj[e[0]].push(e[1]); adj[e[1]].push(e[0]); });
    return adj;
}

/** Connected components, returned as {labels: {node: index}, count: n}. */
function componentsOf(edgeList) {
    var adj = adjacencyOf(edgeList);
    var labels = {};
    var next = 0;
    PEOPLE.forEach(function (start) {
        if (start in labels) { return; }
        var queue = [start];
        labels[start] = next;
        while (queue.length) {
            var cur = queue.shift();
            adj[cur].forEach(function (n) {
                if (!(n in labels)) { labels[n] = next; queue.push(n); }
            });
        }
        next++;
    });
    return { labels: labels, count: next };
}

/**
 * Index of the edge with the highest betweenness, using Brandes' algorithm
 * accumulated onto edges rather than nodes.
 */
function highestBetweennessEdge(edgeList) {
    var adj = adjacencyOf(edgeList);
    var score = {};
    edgeList.forEach(function (e, i) { score[i] = 0; });

    // Look up an edge's index from its endpoints, in either order.
    var indexOfEdge = {};
    edgeList.forEach(function (e, i) {
        indexOfEdge[e[0] + '|' + e[1]] = i;
        indexOfEdge[e[1] + '|' + e[0]] = i;
    });

    PEOPLE.forEach(function (source) {
        var stack = [];
        var preds = {}, sigma = {}, dist = {}, delta = {};
        PEOPLE.forEach(function (v) { preds[v] = []; sigma[v] = 0; dist[v] = -1; delta[v] = 0; });
        sigma[source] = 1;
        dist[source] = 0;

        var queue = [source];
        while (queue.length) {
            var v = queue.shift();
            stack.push(v);
            adj[v].forEach(function (w) {
                if (dist[w] < 0) { dist[w] = dist[v] + 1; queue.push(w); }
                if (dist[w] === dist[v] + 1) {
                    sigma[w] += sigma[v];
                    preds[w].push(v);
                }
            });
        }

        while (stack.length) {
            var w = stack.pop();
            preds[w].forEach(function (v) {
                var c = (sigma[v] / sigma[w]) * (1 + delta[w]);
                delta[v] += c;
                var idx = indexOfEdge[v + '|' + w];
                if (idx !== undefined) { score[idx] += c; }
            });
        }
    });

    var best = null, bestScore = -1;
    edgeList.forEach(function (e, i) {
        if (score[i] > bestScore) { bestScore = score[i]; best = i; }
    });
    return best;
}

/**
 * Link prediction by common neighbors: for every pair that is NOT already
 * connected, count how many neighbors they share. The highest score is the
 * most plausible missing edge.
 */
function predictLink() {
    var connected = {};
    PAIRS.forEach(function (p) {
        connected[p[0] + '|' + p[1]] = true;
        connected[p[1] + '|' + p[0]] = true;
    });

    var best = null;
    for (var i = 0; i < PEOPLE.length; i++) {
        for (var j = i + 1; j < PEOPLE.length; j++) {
            var a = PEOPLE[i], b = PEOPLE[j];
            if (connected[a + '|' + b]) { continue; }
            var na = neighborsOf(a), nb = neighborsOf(b);
            var shared = na.filter(function (n) { return nb.indexOf(n) !== -1; });
            if (!best || shared.length > best.shared.length) {
                best = { a: a, b: b, shared: shared };
            }
        }
    }
    return best;
}

// Node details are assembled live in onReady() below, because a node's
// community assignment is not known until the detection algorithm has run.
var INFO = {};

var PLACEHOLDER = 'Click a node for its degree, then run the two algorithms to ' +
                  'see what a graph database can compute that a table cannot.';

var LEGEND =
    '<div class="legend-item"><span class="legend-swatch" style="background:' + PASTELS[0] + ';border-color:' + PASTEL_BORDERS[0] + '"></span>Community 1</div>' +
    '<div class="legend-item"><span class="legend-swatch" style="background:' + PASTELS[1] + ';border-color:' + PASTEL_BORDERS[1] + '"></span>Community 2</div>' +
    '<div class="legend-item"><span class="legend-line" style="border-top-style:dashed;border-top-color:' + PREDICT_COLOR + '"></span>Predicted link</div>';

var OPTIONS = {
    physics: {
        enabled: true,
        barnesHut: { gravitationalConstant: -3800, springLength: 82,
                     springConstant: 0.05, avoidOverlap: 0.55 },
        stabilization: { iterations: 420 }
    },
    edges: { arrows: { to: { enabled: false } }, color: { color: '#adb5bd', highlight: '#E8871A' }, width: 1.5 },
    nodes: { scaling: { label: { drawThreshold: 2 } } },
    interaction: { dragNodes: true, hover: true, tooltipDelay: 120 }
};

var CONTROLS = [
    {
        id: 'detect-btn', label: 'Detect Communities',
        onClick: function (api) {
            communities = detectCommunities();
            var sizes = {};
            PEOPLE.forEach(function (p) {
                var c = communities[p];
                sizes[c] = (sizes[c] || 0) + 1;
                api.nodes.update({
                    id: p,
                    color: { background: PASTELS[c % PASTELS.length],
                             border: PASTEL_BORDERS[c % PASTEL_BORDERS.length] },
                    borderWidth: 3
                });
            });
            // Edges that stay inside a community vs. edges that bridge two.
            var bridges = PAIRS.filter(function (p) {
                return communities[p[0]] !== communities[p[1]];
            });
            var list = Object.keys(sizes).map(function (c) {
                return 'Community ' + (Number(c) + 1) + ': <strong>' + sizes[c] + '</strong> members';
            }).join('<br>');
            api.setInfo('Community detection',
                '<span class="tag">' + Object.keys(sizes).length + ' communities found</span>' +
                '<p>' + list + '</p>' +
                '<p>Girvan\u2013Newman found these by repeatedly removing the edge that ' +
                'group do most of my neighbors belong to?" Nobody labeled the groups ' +
                'in advance — the structure of the connections was enough.</p>' +
                '<p><strong>' + bridges.length + ' edges bridge the two communities:</strong> ' +
                bridges.map(function (p) { return p[0] + '–' + p[1]; }).join(', ') +
                '. Those few people are why this is one network and not two.</p>');
        }
    },
    {
        id: 'predict-btn', label: 'Predict Missing Link',
        onClick: function (api) {
            predicted = predictLink();
            if (!predicted) { return; }
            if (api.edges.get('predicted')) { api.edges.remove('predicted'); }
            var score = predicted.shared.length;
            api.edges.add({
                id: 'predicted',
                from: predicted.a, to: predicted.b,
                dashes: true, width: 4,
                label: 'predicted (score ' + score + ')',
                color: { color: PREDICT_COLOR, highlight: PREDICT_COLOR },
                font: { size: 12, color: PREDICT_COLOR, strokeWidth: 5, strokeColor: 'white' },
                title: 'Shared neighbors driving this prediction: ' + predicted.shared.join(', ')
            });
            api.setInfo('Link prediction',
                '<span class="tag" style="background-color:' + PREDICT_COLOR + '">Highest score</span>' +
                '<p><strong>' + predicted.a + ' — ' + predicted.b + '</strong> is the ' +
                'most plausible missing connection, with a common-neighbors score of ' +
                '<strong>' + score + '</strong>.</p>' +
                '<p>Shared neighbors: ' + predicted.shared.join(', ') + '.</p>' +
                '<p>The reasoning is the one you already use socially: if several of ' +
                'your friends all know the same person, you probably know them too. ' +
                'A prediction is a <em>hypothesis</em>, not a fact — it says this ' +
                'edge is worth checking, not that it exists.</p>');
        }
    },
    {
        id: 'reset-btn', label: 'Reset', className: 'secondary',
        onClick: function (api) {
            communities = null;
            predicted = null;
            if (api.edges.get('predicted')) { api.edges.remove('predicted'); }
            PEOPLE.forEach(function (p) {
                api.nodes.update({ id: p, borderWidth: 1,
                    color: { background: NEUTRAL_BG, border: NEUTRAL_BORDER } });
            });
            api.showPlaceholder();
        }
    }
];

// Node clicks report degree and (once detected) community membership.
function onReady(api) {
    api.getNetwork().on('click', function (params) {
        if (!params.nodes.length) { return; }
        var id = params.nodes[0];
        if (PEOPLE.indexOf(id) === -1) { return; }
        var comm = communities
            ? 'Community <strong>' + (communities[id] + 1) + '</strong>'
            : 'Community <em>not yet detected</em> — press "Detect Communities"';
        api.setInfo(id,
            '<span class="tag">Node</span>' +
            '<p>Degree: <strong>' + degreeOf(id) + '</strong> connections</p>' +
            '<p>' + comm + '</p>' +
            '<p>Connected to: ' + neighborsOf(id).join(', ') + '</p>');
    });

    api.getNetwork().once('stabilizationIterationsDone', function () {
        api.getNetwork().setOptions({ physics: { enabled: false } });
        api.fit();
    });
}

// ---------------------------------------------------------------------------
// Shared vis-network plumbing for this book's graph-model MicroSims.
//
// The block above this line supplies the content:
//   GRAPH        { nodes: [...], edges: [...] }  vis-network DataSet input
//   INFO         { elementId: { tag, tagColor, title, body } }
//   PLACEHOLDER  prompt shown in the info panel before anything is clicked
//   LEGEND       optional legend HTML (or '')
//   CONTROLS     [ { id, label, className, onClick(api) } ]
//   OPTIONS      optional vis-network options merged over the defaults
//
// Everything below lays the graph out, wires click handling to the info panel,
// and hands each control an `api` handle for its own behavior.
// ---------------------------------------------------------------------------
(function () {
    'use strict';

    var nodes = new vis.DataSet(GRAPH.nodes);
    var edges = new vis.DataSet(GRAPH.edges);
    var network = null;

    function isInIframe() {
        try { return window.self !== window.top; } catch (e) { return true; }
    }

    function deepMerge(base, extra) {
        Object.keys(extra || {}).forEach(function (k) {
            if (extra[k] && typeof extra[k] === 'object' && !Array.isArray(extra[k]) &&
                base[k] && typeof base[k] === 'object' && !Array.isArray(base[k])) {
                deepMerge(base[k], extra[k]);
            } else {
                base[k] = extra[k];
            }
        });
        return base;
    }

    function setInfo(title, html) {
        document.getElementById('info-title').textContent = title;
        document.getElementById('info-body').innerHTML = html;
    }

    function showPlaceholder() {
        setInfo('Details', '<p class="info-placeholder">' + PLACEHOLDER + '</p>');
    }

    function showElement(id) {
        var info = INFO[id];
        if (!info) { return false; }
        var html = '';
        if (info.tag) {
            html += '<span class="tag" style="background-color:' +
                    (info.tagColor || '#1a3a6c') + '">' + info.tag + '</span>';
        }
        html += '<p>' + info.body + '</p>';
        setInfo(info.title, html);
        return true;
    }

    /** vis-network's fit() caps at 100% by default, which strands a small
     *  graph in a large container; raise the cap a little. */
    function fitNetwork() {
        if (!network) { return; }
        network.fit({ maxZoomLevel: 1.3, animation: false });
        // fit() alone leaves a flat, wide graph sitting low in a tall
        // container, so re-center explicitly on the node bounding box.
        var pos = network.getPositions();
        var ids = Object.keys(pos);
        if (!ids.length) { return; }
        var xs = ids.map(function (i) { return pos[i].x; });
        var ys = ids.map(function (i) { return pos[i].y; });
        // FIT_SCALE < 1 leaves a margin around the graph. Without it a
        // force-directed layout ends up with nodes touching the canvas edge
        // and sitting under the navigation buttons.
        var pad = (typeof FIT_SCALE === 'number') ? FIT_SCALE : 1;
        network.moveTo({
            position: {
                x: (Math.min.apply(null, xs) + Math.max.apply(null, xs)) / 2,
                y: (Math.min.apply(null, ys) + Math.max.apply(null, ys)) / 2
            },
            scale: network.getScale() * pad,
            animation: false
        });
    }

    var api = {
        nodes: nodes,
        edges: edges,
        setInfo: setInfo,
        showPlaceholder: showPlaceholder,
        showElement: showElement,
        fit: fitNetwork,
        getNetwork: function () { return network; }
    };

    function init() {
        var mouseOk = !isInIframe();
        var options = {
            layout: { improvedLayout: false },
            physics: { enabled: false },
            nodes: {
                shape: 'box',
                margin: 9,
                font: { size: 13, face: 'Arial' },
                color: { background: '#D6E3F0', border: '#5B7FA6' }
            },
            edges: {
                arrows: { to: { enabled: true, scaleFactor: 0.75 } },
                color: { color: '#6c757d', highlight: '#E8871A' },
                width: 2,
                font: { size: 12, color: '#495057', strokeWidth: 4, strokeColor: 'white' }
            },
            interaction: {
                dragView: mouseOk,
                zoomView: mouseOk,
                navigationButtons: true,
                selectConnectedEdges: false,
                hover: true,
                keyboard: { enabled: false }
            }
        };
        deepMerge(options, typeof OPTIONS !== 'undefined' ? OPTIONS : {});

        network = new vis.Network(document.getElementById('network'),
                                  { nodes: nodes, edges: edges }, options);
        api.network = network;
        // Exposed so screenshot and layout-review tooling can inspect the view.
        window.__microsimNetwork = network;

        network.on('click', function (params) {
            if (params.nodes.length > 0) {
                if (showElement(params.nodes[0])) { return; }
            }
            if (params.edges.length > 0) {
                showElement(params.edges[0]);
            }
        });

        network.once('afterDrawing', fitNetwork);
        setTimeout(fitNetwork, 400);
        window.addEventListener('resize', function () {
            network.redraw();
            fitNetwork();
        });

        // The grid container has no final height until layout settles, and
        // vis-network sizes its canvas at construction time. Without this the
        // view ends up centered on a stale canvas height and the graph renders
        // roughly 100px too low, clipping the bottom row.
        if (window.ResizeObserver) {
            new ResizeObserver(function () {
                network.redraw();
                fitNetwork();
            }).observe(document.getElementById('network'));
        }

        if (typeof onReady === 'function') { onReady(api); }
    }

    function buildControls() {
        var box = document.getElementById('controls');
        (typeof CONTROLS !== 'undefined' ? CONTROLS : []).forEach(function (c) {
            if (c.type === 'select') {
                var label = document.createElement('label');
                label.textContent = c.label;
                box.appendChild(label);
                var sel = document.createElement('select');
                sel.id = c.id;
                c.options.forEach(function (o) {
                    var opt = document.createElement('option');
                    opt.value = o.value;
                    opt.textContent = o.label;
                    sel.appendChild(opt);
                });
                sel.addEventListener('change', function () { c.onChange(api, sel.value); });
                box.appendChild(sel);
                return;
            }
            var btn = document.createElement('button');
            btn.id = c.id;
            btn.textContent = c.label;
            if (c.className) { btn.className = c.className; }
            btn.addEventListener('click', function () { c.onClick(api); });
            box.appendChild(btn);
        });

        if (typeof LEGEND !== 'undefined' && LEGEND) {
            var legend = document.createElement('div');
            legend.className = 'legend';
            legend.innerHTML = LEGEND;
            box.appendChild(legend);
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        buildControls();
        showPlaceholder();
        init();
    });
})();
