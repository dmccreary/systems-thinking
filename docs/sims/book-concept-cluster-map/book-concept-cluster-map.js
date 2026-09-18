// The Book's Concept Clusters, Connected - vis-network
// CANVAS_HEIGHT: 560
// Chapter 27: Systems Thinking Across Disciplines
// Learning objective: trace how each cluster builds on the ones before it and
// synthesize which cluster equipped the reader to understand each domain
// surveyed in this final chapter (Bloom: Create).

// The ten clusters, in reading order. Color runs as a smooth gradient from the
// book's slate-blue (Chapter 1) to its accent orange (this chapter), so the
// circle itself shows the book's progression from vocabulary to application.
var CLUSTERS = [
    { id: 'c1', name: 'Systems Vocabulary\n& Feedback', chapters: 'Chapters 1-4',
      idea: 'A system is a set of interconnected parts whose behavior comes from how ' +
            'they are connected, and feedback loops are how that behavior is produced.',
      example: 'The bank-balance causal loop diagram from Chapter 3 — interest earned ' +
               'feeding back into the balance that earns it.' },
    { id: 'c2', name: 'Growth, Resilience\n& Archetypes', chapters: 'Chapters 5-12',
      idea: 'Stocks accumulate, growth runs into limits, and a small number of loop ' +
            'structures recur so often they have names.',
      example: 'The tragedy of the commons simulation from Chapter 11, where each ' +
               'herder’s locally rational choice collapses the shared pasture.' },
    { id: 'c3', name: 'Leverage Points', chapters: 'Chapters 13-14',
      idea: 'Interventions differ enormously in power: parameters are weak, rules are ' +
            'stronger, and paradigms are strongest of all.',
      example: 'The iceberg model from Chapters 13-14 — events on the surface, ' +
               'patterns below, structure below that, mental models at the bottom.' },
    { id: 'c4', name: 'Graphs & Knowledge\nRepresentation', chapters: 'Chapters 15-19',
      idea: 'Graphs are the natural data structure for systems, because they store ' +
            'relationships as first-class things rather than as joins.',
      example: 'The Seven Bridges of Konigsberg from Chapter 16 — the moment ' +
               'connection became more important than geography.' },
    { id: 'c5', name: 'Organizational Practice\n& Maturity', chapters: 'Chapters 20-21',
      idea: 'Silos are produced by structure, not by bad people, and an organization ' +
            'can be assessed on how systemically it thinks.',
      example: 'The silo reinforcing loop from Chapter 20, broken at the incentive ' +
               'link rather than at the behavior it produces.' },
    { id: 'c6', name: 'AI Systems', chapters: 'Chapters 22-23',
      idea: 'Machine learning systems sit inside feedback loops, so their outputs ' +
            'become their next inputs.',
      example: 'The three algorithmic disparity loops from Chapter 23 — admissions, ' +
               'credit and hiring, all the same shape.' },
    { id: 'c7', name: 'Knowledge Systems &\nEconomic Complexity', chapters: 'Chapter 24',
      idea: 'Knowledge lives in people and networks, not in documents, and what a ' +
            'place can make next depends on what it can already make.',
      example: 'The product space from Chapter 24, where the next export is the one ' +
               'closest to the capabilities you already have.' },
    { id: 'c8', name: 'Design, Emerging Tech\n& Personal Practice', chapters: 'Chapter 25',
      idea: 'Designing an intervention means anticipating side effects and building ' +
            'the feedback mechanism that will tell you if you were wrong.',
      example: 'The intervention-to-implementation workflow from Chapter 25, which ' +
               'ends by looping back rather than by finishing.' },
    { id: 'c9', name: 'Knowledge Graph\nApplications', chapters: 'Chapter 26',
      idea: 'Conceptual, logical and physical models are three views of one ' +
            'relationship, and graph algorithms turn a model into an answer.',
      example: 'Community detection and link prediction from Chapter 26, run over ' +
               'the same sample network.' },
    { id: 'c10', name: 'Cross-Disciplinary\nSynthesis', chapters: 'Chapter 27 (this chapter)',
      idea: 'The same lens — stocks, flows, loops, delays, leverage — reads ecology, ' +
            'medicine, economics and software equally well.',
      example: 'The predator-prey model in this chapter, which is the bathtub from ' +
               'Chapter 5 with two stocks instead of one.' }
];

var DEPENDENCIES = [
    'feedback loops are the building block every archetype is made of',
    'you cannot find a leverage point until you can name the loop it sits in',
    'leverage points need a representation that stores relationships, not rows',
    'a knowledge graph is only useful once an organization can act on what it shows',
    'AI systems are the organizational practice problem at machine speed',
    'the same loops govern how knowledge itself accumulates in an economy',
    'knowing how knowledge moves is what makes an intervention designable',
    'designed interventions need real applications to be tested against',
    'applications across one domain set up the comparison across all of them'
];

function lerpHex(a, b, t) {
    function p(h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16),
                            parseInt(h.slice(5, 7), 16)]; }
    var ca = p(a), cb = p(b);
    var out = ca.map(function (v, i) { return Math.round(v + (cb[i] - v) * t); });
    return '#' + out.map(function (v) { return ('0' + v.toString(16)).slice(-2); }).join('');
}

var START_COLOR = '#2E5A87';   // the book's slate-blue
var END_COLOR = '#E8871A';     // the book's accent orange

var RADIUS = 250;
var nodeList = CLUSTERS.map(function (c, i) {
    var a = -Math.PI / 2 + (2 * Math.PI * i) / CLUSTERS.length;
    var t = i / (CLUSTERS.length - 1);
    var border = lerpHex(START_COLOR, END_COLOR, t);
    return {
        id: c.id, label: c.name,
        x: RADIUS * Math.cos(a), y: RADIUS * Math.sin(a),
        fixed: true, shape: 'box', margin: 11,
        font: { size: 12 },
        color: { background: lerpHex('#D8E3EE', '#FBE2C6', t), border: border },
        borderWidth: 3
    };
});

var edgeList = [];
for (var i = 0; i < CLUSTERS.length - 1; i++) {
    edgeList.push({
        id: 'd' + i,
        from: CLUSTERS[i].id, to: CLUSTERS[i + 1].id,
        title: DEPENDENCIES[i],
        color: { color: lerpHex(START_COLOR, END_COLOR, i / (CLUSTERS.length - 1)),
                 highlight: '#E8871A' },
        width: 2,
        smooth: { type: 'curvedCW', roundness: 0.13 }
    });
}
// The closing edge: the final cluster hands the lens back to the first.
edgeList.push({
    id: 'dloop',
    from: 'c10', to: 'c1',
    label: 'the same lens, applied anywhere',
    title: 'the same lens, applied anywhere',
    dashes: true, width: 3,
    color: { color: END_COLOR, highlight: END_COLOR },
    // Bowed well clear of the circle and labelled above the line: at the
    // default roundness the closing arrow runs between two adjacent nodes and
    // its label disappeared behind them.
    font: { size: 13, color: END_COLOR, strokeWidth: 6, strokeColor: 'white',
            align: 'top' },
    smooth: { type: 'curvedCCW', roundness: 0.55 }
});

var GRAPH = { nodes: nodeList, edges: edgeList };

var INFO = {};
CLUSTERS.forEach(function (c, i) {
    INFO[c.id] = {
        tag: c.chapters,
        tagColor: lerpHex(START_COLOR, END_COLOR, i / (CLUSTERS.length - 1)),
        title: c.name.replace(/\n/g, ' '),
        body: '<p><strong>Core idea:</strong> ' + c.idea + '</p>' +
              '<p><strong>Already seen in this book:</strong> ' + c.example + '</p>' +
              (i > 0 ? '<p><strong>Builds on the previous cluster because:</strong> ' +
                       DEPENDENCIES[i - 1] + '.</p>' : '')
    };
});
edgeList.forEach(function (e, i) {
    INFO[e.id] = {
        tag: 'Dependency', tagColor: '#5B7FA6',
        title: e.id === 'dloop' ? 'Back to the beginning' : 'What this arrow carries',
        body: e.id === 'dloop'
            ? 'The final cluster does not add new machinery. It hands the same lens ' +
              'back to Chapter 1’s vocabulary and points it at ecology, ' +
              'medicine, economics and software in turn.'
            : DEPENDENCIES[i].charAt(0).toUpperCase() + DEPENDENCIES[i].slice(1) + '.'
    };
});

var PLACEHOLDER = 'Click a cluster to see its chapters, its core idea, and an ' +
                  'example already used in the book. Hover an arrow for the ' +
                  'dependency it carries.';

var LEGEND =
    '<div class="legend-item"><span class="legend-swatch" style="background:' + START_COLOR + '"></span>Foundational vocabulary</div>' +
    '<div class="legend-item"><span class="legend-swatch" style="background:' + END_COLOR + '"></span>Cross-disciplinary application</div>';

var OPTIONS = {
    edges: { arrows: { to: { enabled: true, scaleFactor: 0.7 } } },
    interaction: { hover: true, tooltipDelay: 120 }
};

var CONTROLS = [
    {
        id: 'clear', label: 'Clear Selection', className: 'secondary',
        onClick: function (api) { api.showPlaceholder(); }
    }
];

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
