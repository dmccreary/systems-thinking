// Systems Map Example - Coffee Shop - vis-network
// CANVAS_HEIGHT: 520
// Chapter 2: Mental Models and Systems Analysis Tools
// Learning objective: illustrate how people, resources and information connect
// across a systems map (Bloom: Understand).

var PEOPLE_BG = '#D3E5F5';
var PEOPLE_BORDER = '#1F6FB2';
var GOODS_BG = '#E8D5BE';
var GOODS_BORDER = '#8B5E28';

var MONEY_COLOR = '#2E7D32';
var GOODS_COLOR = '#8B5E28';
var INFO_COLOR = '#6A4C93';

function peopleNode(id, label, x, y) {
    return { id: id, label: label, shape: 'box', margin: 11, x: x, y: y,
             color: { background: PEOPLE_BG, border: PEOPLE_BORDER } };
}
function goodsNode(id, label, x, y) {
    return { id: id, label: label, shape: 'box', margin: 11, x: x, y: y,
             color: { background: GOODS_BG, border: GOODS_BORDER } };
}

// Leave a margin around the force-directed layout so no node lands on the
// canvas edge or under the navigation buttons.
var FIT_SCALE = 0.88;

var GRAPH = {
    nodes: [
        // Laid out as a ring so every flow is a short, readable arc.
        peopleNode('customers', 'Customers',        -215,   10),
        peopleNode('baristas',  'Baristas',          -20,  145),
        peopleNode('register',  'Cash Register',    -150, -145),
        goodsNode('inventory',  'Inventory',         165, -140),
        goodsNode('supplier',   'Supplier',           35, -215),
        goodsNode('machine',    'Espresso Machine',  185,  105)
    ],
    edges: [
        // solid = money
        { id: 'm1', from: 'customers', to: 'register', label: 'payment',
          color: { color: MONEY_COLOR, highlight: MONEY_COLOR },
          font: { color: MONEY_COLOR }, width: 3 },
        { id: 'm2', from: 'register', to: 'supplier', label: 'purchase orders',
          color: { color: MONEY_COLOR, highlight: MONEY_COLOR },
          font: { color: MONEY_COLOR }, width: 3 },
        // dashed = goods
        { id: 'g1', from: 'supplier', to: 'inventory', label: 'beans, milk, cups',
          dashes: true, color: { color: GOODS_COLOR, highlight: GOODS_COLOR },
          font: { color: GOODS_COLOR }, width: 3 },
        { id: 'g2', from: 'inventory', to: 'machine', label: 'beans loaded',
          dashes: true, color: { color: GOODS_COLOR, highlight: GOODS_COLOR },
          font: { color: GOODS_COLOR }, width: 3 },
        { id: 'g3', from: 'machine', to: 'customers', label: 'espresso',
          dashes: true, color: { color: GOODS_COLOR, highlight: GOODS_COLOR },
          font: { color: GOODS_COLOR }, width: 3 },
        // dotted = information
        { id: 'i1', from: 'baristas', to: 'inventory', label: 'restock request',
          dashes: [2, 6], color: { color: INFO_COLOR, highlight: INFO_COLOR },
          font: { color: INFO_COLOR }, width: 2 },
        { id: 'i2', from: 'customers', to: 'baristas', label: 'order',
          dashes: [2, 6], color: { color: INFO_COLOR, highlight: INFO_COLOR },
          font: { color: INFO_COLOR }, width: 2 },
        { id: 'i3', from: 'baristas', to: 'machine', label: 'grind and pull settings',
          dashes: [2, 6], color: { color: INFO_COLOR, highlight: INFO_COLOR },
          font: { color: INFO_COLOR }, width: 2 }
    ]
};

function nodeInfo(title, body) {
    return { tag: 'Part of the system', tagColor: PEOPLE_BORDER, title: title, body: body };
}
function flowInfo(kind, color, title, body) {
    return { tag: kind + ' flow', tagColor: color, title: title, body: body };
}

var INFO = {
    customers: nodeInfo('Customers',
        'The reason the system exists. Customers supply money and orders and take ' +
        'away coffee — notice they appear at both ends of the map, which is what ' +
        'makes this a system rather than a line.'),
    baristas: nodeInfo('Baristas',
        'The people who turn inventory into a drink. They are also the shop’s ' +
        'main sensor: they notice the milk running low long before any report does.'),
    register: nodeInfo('Cash Register',
        'Where money enters and leaves. It is the only node that touches both the ' +
        'customer side and the supplier side, which makes it the shop’s ' +
        'financial bottleneck and its best early-warning signal.'),
    inventory: nodeInfo('Inventory',
        'The stock of beans, milk and cups on hand. Inventory is an accumulation: ' +
        'it rises with deliveries and falls with sales, and it is the buffer that ' +
        'keeps a late delivery from immediately becoming a lost sale.'),
    supplier: nodeInfo('Supplier',
        'Outside the shop but inside the system. The shop does not control the ' +
        'supplier, yet a delay here reaches the customer within days — that gap ' +
        'between control and influence is what a systems map is for.'),
    machine: nodeInfo('Espresso Machine',
        'The equipment that converts inputs into the product. One broken machine ' +
        'stops the whole shop, which is the visual definition of a single point ' +
        'of failure.'),

    m1: flowInfo('Money', MONEY_COLOR, 'Customers → Cash Register',
        'Money in. Without this flow nothing else in the map can keep running for ' +
        'more than a few weeks.'),
    m2: flowInfo('Money', MONEY_COLOR, 'Cash Register → Supplier',
        'Money out. The shop stays open only while money in exceeds money out over ' +
        'the same stretch of time.'),
    g1: flowInfo('Goods', GOODS_COLOR, 'Supplier → Inventory',
        'Deliveries. This flow has a delay built into it, which is why the shop ' +
        'must order before it runs out rather than when it runs out.'),
    g2: flowInfo('Goods', GOODS_COLOR, 'Inventory → Espresso Machine',
        'Beans move from storage into production. This is where stock becomes ' +
        'something a customer can buy.'),
    g3: flowInfo('Goods', GOODS_COLOR, 'Espresso Machine → Customers',
        'The finished drink. This is the only flow the customer actually sees, ' +
        'which is why customers are bad at diagnosing why a shop is slow.'),
    i1: flowInfo('Information', INFO_COLOR, 'Baristas → Inventory',
        'The restock request. Information flows are invisible and unpriced, but a ' +
        'shop that loses this one flow runs out of milk on a Saturday morning.'),
    i2: flowInfo('Information', INFO_COLOR, 'Customers → Baristas',
        'The order. Information, not goods — nothing physical has moved yet, but ' +
        'everything downstream depends on it being accurate.'),
    i3: flowInfo('Information', INFO_COLOR, 'Baristas → Espresso Machine',
        'Grind and pull settings. Knowing how to run the machine is part of the ' +
        'system even though it never appears on any inventory list.')
};

var PLACEHOLDER = 'Click any node or any arrow. Solid = money, dashed = goods, ' +
                  'dotted = information.';

var LEGEND =
    '<div class="legend-item"><span class="legend-line" style="border-top-color:' + MONEY_COLOR + '"></span>Money flow (solid)</div>' +
    '<div class="legend-item"><span class="legend-line" style="border-top-style:dashed;border-top-color:' + GOODS_COLOR + '"></span>Goods flow (dashed)</div>' +
    '<div class="legend-item"><span class="legend-line" style="border-top-style:dotted;border-top-color:' + INFO_COLOR + '"></span>Information flow (dotted)</div>';

// Physics on, so learners can drag nodes and re-run the layout.
var OPTIONS = {
    // randomSeed makes the starting layout reproducible; avoidOverlap stops
    // two boxes settling on top of each other, which happened with Baristas
    // and the Espresso Machine.
    // Physics starts OFF so the designed ring is what a reader first sees.
    // "Rearrange" switches it on, which is what the button is for.
    physics: {
        enabled: false,
        barnesHut: {
            gravitationalConstant: -8500,
            springLength: 150,
            springConstant: 0.045,
            avoidOverlap: 0.85
        },
        stabilization: { iterations: 400 }
    },
    nodes: { font: { size: 14 }, scaling: { label: { drawThreshold: 2 } } },
    interaction: { dragNodes: true }
};

var CONTROLS = [
    {
        id: 'rearrange', label: 'Rearrange',
        onClick: function (api) {
            var net = api.getNetwork();
            net.setOptions({ physics: { enabled: true } });
            net.stabilize(220);
            api.setInfo('Rearranged',
                '<p>The layout engine re-ran. The <em>positions</em> changed but the ' +
                '<em>connections</em> did not — a systems map is about what is ' +
                'connected to what, not about where the boxes sit.</p>');
        }
    },
    {
        id: 'clear', label: 'Clear Selection', className: 'secondary',
        onClick: function (api) { api.showPlaceholder(); }
    }
];

// Freeze physics once the first layout settles, so the map stops drifting
// while a learner is reading it.
function onReady(api) {
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
