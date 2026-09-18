// The Seven Bridges of Konigsberg - vis-network
// CANVAS_HEIGHT: 580
// Chapter 16: Graph Database Architecture
// Learning objective: compute each landmass's degree and apply Euler's
// odd-degree rule to explain why no solution exists (Bloom: Analyze).

var ODD_COLOR = '#C62828';
var EVEN_COLOR = '#2E7D32';
var DEFAULT_BG = '#D6E3F0';
var DEFAULT_BORDER = '#5B7FA6';

// Positions loosely mirror the 1736 map: the island in the middle of the river,
// the two banks above and below it, and the east bank downstream.
var GRAPH = {
    nodes: [
        { id: 'north',  label: 'North Bank',      x: -120, y: -150, fixed: true },
        { id: 'island', label: 'Kneiphof Island', x: -120, y:    0, fixed: true },
        { id: 'south',  label: 'South Bank',      x: -120, y:  150, fixed: true },
        { id: 'east',   label: 'East Bank',       x:  180, y:    0, fixed: true }
    ],
    edges: [
        // Two separate bridges between the island and each river bank.
        { id: 'b1', from: 'island', to: 'north', label: 'bridge 1', smooth: { type: 'curvedCW',  roundness: 0.35 } },
        { id: 'b2', from: 'island', to: 'north', label: 'bridge 2', smooth: { type: 'curvedCCW', roundness: 0.35 } },
        { id: 'b3', from: 'island', to: 'south', label: 'bridge 3', smooth: { type: 'curvedCW',  roundness: 0.35 } },
        { id: 'b4', from: 'island', to: 'south', label: 'bridge 4', smooth: { type: 'curvedCCW', roundness: 0.35 } },
        { id: 'b5', from: 'island', to: 'east',  label: 'bridge 5', smooth: { type: 'curvedCW',  roundness: 0.12 } },
        { id: 'b6', from: 'north',  to: 'east',  label: 'bridge 6', smooth: { type: 'curvedCW',  roundness: 0.25 } },
        { id: 'b7', from: 'south',  to: 'east',  label: 'bridge 7', smooth: { type: 'curvedCCW', roundness: 0.25 } }
    ]
};

var DEGREES = { island: 5, north: 3, south: 3, east: 3 };

var INFO = {
    island: {
        tag: 'Degree 5 (odd)', tagColor: ODD_COLOR, title: 'Kneiphof Island',
        body: 'The island in the middle of the Pregel. Five bridges touch it: two ' +
              'to the north bank, two to the south bank, and one east. Degree 5 is ' +
              'odd, so any walk must either start here or finish here.'
    },
    north: {
        tag: 'Degree 3 (odd)', tagColor: ODD_COLOR, title: 'North Bank',
        body: 'Three bridges touch the north bank: two to the island and one to the ' +
              'east bank. Every time you walk in you must walk out, so an odd count ' +
              'leaves one bridge stranded unless you begin or end here.'
    },
    south: {
        tag: 'Degree 3 (odd)', tagColor: ODD_COLOR, title: 'South Bank',
        body: 'Three bridges touch the south bank: two to the island and one to the ' +
              'east bank. Same parity problem as the north bank.'
    },
    east: {
        tag: 'Degree 3 (odd)', tagColor: ODD_COLOR, title: 'East Bank',
        body: 'Three bridges touch the east bank: one from the island, one from the ' +
              'north bank and one from the south bank.'
    }
};
['b1','b2','b3','b4','b5','b6','b7'].forEach(function (id, i) {
    INFO[id] = {
        tag: 'Edge', tagColor: '#5B7FA6', title: 'Bridge ' + (i + 1),
        body: 'One bridge is one edge. Two bridges between the same pair of ' +
              'landmasses are two separate edges, not one — which is exactly why ' +
              'the curved parallel edges matter to the count.'
    };
});

var PLACEHOLDER = 'Click a landmass to see how many bridges touch it, then press ' +
                  '"Check for a Solution".';

var LEGEND =
    '<div class="legend-item"><span class="legend-swatch" style="background:' + ODD_COLOR + '"></span>Odd degree</div>' +
    '<div class="legend-item"><span class="legend-swatch" style="background:' + EVEN_COLOR + '"></span>Even degree</div>';

var OPTIONS = {
    nodes: { shape: 'ellipse', font: { size: 14 }, widthConstraint: { minimum: 110 } },
    edges: { arrows: { to: { enabled: false } }, font: { size: 10 } }
};

var CONTROLS = [
    {
        id: 'check-btn', label: 'Check for a Solution',
        onClick: function (api) {
            Object.keys(DEGREES).forEach(function (id) {
                var odd = DEGREES[id] % 2 === 1;
                api.nodes.update({
                    id: id,
                    color: { background: odd ? '#F5D0D0' : '#D3EDD9',
                             border: odd ? ODD_COLOR : EVEN_COLOR },
                    label: api.nodes.get(id).label.split(' (')[0] + ' (' + DEGREES[id] + ')'
                });
            });
            var oddCount = Object.keys(DEGREES).filter(function (id) {
                return DEGREES[id] % 2 === 1;
            }).length;
            api.setInfo('Euler’s rule',
                '<span class="tag" style="background-color:' + ODD_COLOR + '">No solution</span>' +
                '<p>A walk crossing every edge exactly once exists only if the graph ' +
                'has zero or two odd-degree vertices. This graph has <strong>' +
                oddCount + '</strong> — so no such walk is possible.</p>' +
                '<p>Degrees: Kneiphof Island 5, North Bank 3, South Bank 3, East Bank 3. ' +
                'All four are odd.</p>' +
                '<p>Euler’s insight in 1736 was that the shapes of the ' +
                'landmasses and the lengths of the bridges are irrelevant. Only the ' +
                'connections matter — and that is the idea every graph database is ' +
                'built on.</p>');
        }
    },
    {
        id: 'reset-btn', label: 'Reset Colors', className: 'secondary',
        onClick: function (api) {
            Object.keys(DEGREES).forEach(function (id) {
                api.nodes.update({
                    id: id,
                    color: { background: DEFAULT_BG, border: DEFAULT_BORDER },
                    label: api.nodes.get(id).label.split(' (')[0]
                });
            });
            api.showPlaceholder();
        }
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
