// Product Space Explorer - vis-network
// CANVAS_HEIGHT: 560
// Chapter 24: Knowledge Systems and Economic Complexity
// Learning objective: analyze which unexported products are most reachable from
// a country's current export basket by tracing relatedness edges, and justify
// why one candidate is a better diversification target than another
// (Bloom: Analyze).

var CLUSTER_STYLE = {
    textiles:  { bg: '#BBD7EF', border: '#1F6FB2', name: 'Textiles' },
    machinery: { bg: '#C6E6CE', border: '#2E8B57', name: 'Machinery / Electronics' },
    commodity: { bg: '#F3D9B4', border: '#B8611A', name: 'Raw Commodities' }
};
var EXPORTED_BORDER = '#C62828';
var REACHABLE_COLOR = '#E8871A';
var UNREACHABLE_BG = '#EFF1F3';
var UNREACHABLE_BORDER = '#CBD1D7';

var PRODUCTS = [
    { id: 'cotton',   label: 'Raw Cotton',        cluster: 'textiles',
      cap: 'Land, climate and basic harvesting — almost no manufactured capability.' },
    { id: 'fabric',   label: 'Woven Fabric',      cluster: 'textiles',
      cap: 'Loom operation, fiber handling and consistent tension control.' },
    { id: 'knit',     label: 'Knit Garments',     cluster: 'textiles',
      cap: 'Precision stitching, sizing standards and batch quality control.' },
    { id: 'sewing',   label: 'Industrial Sewing Equipment', cluster: 'textiles',
      cap: 'Light machining plus intimate knowledge of what garment factories need.' },
    { id: 'dye',      label: 'Dyes and Finishing', cluster: 'textiles',
      cap: 'Applied chemistry, effluent handling and color consistency.' },

    { id: 'parts',    label: 'Basic Machine Parts', cluster: 'machinery',
      cap: 'Metal cutting to tolerance, materials handling and shop-floor QC.' },
    { id: 'machinery', label: 'Industrial Machinery', cluster: 'machinery',
      cap: 'Assembly of many precision parts, plus service and maintenance networks.' },
    { id: 'boards',   label: 'Circuit Boards',    cluster: 'machinery',
      cap: 'Cleanroom discipline, etching chemistry and electrical testing.' },
    { id: 'semi',     label: 'Semiconductors',    cluster: 'machinery',
      cap: 'Extreme process control, deep capital, and a long-trained workforce.' },
    { id: 'software', label: 'Software Services', cluster: 'machinery',
      cap: 'Formal education pipelines, English-language business ties, low capital.' },
    { id: 'instr',    label: 'Measuring Instruments', cluster: 'machinery',
      cap: 'Calibration culture and fine mechanical and electronic assembly.' },
    { id: 'motors',   label: 'Electric Motors',   cluster: 'machinery',
      cap: 'Winding, magnetics and the same tolerance machining as basic parts.' },

    { id: 'ore',      label: 'Unprocessed Ore',   cluster: 'commodity',
      cap: 'Extraction and bulk logistics. Little of it transfers to anything else.' },
    { id: 'timber',   label: 'Raw Timber',        cluster: 'commodity',
      cap: 'Forestry and haulage — again, few capabilities that carry over.' },
    { id: 'oil',      label: 'Crude Petroleum',   cluster: 'commodity',
      cap: 'Drilling, pipelines and export terminals. The classic isolated node.' },
    { id: 'sawn',     label: 'Sawn Lumber',       cluster: 'commodity',
      cap: 'Milling and drying — one modest step beyond raw timber.' }
];

// Relatedness: pairs of products that draw on overlapping capabilities.
// Weight is the edge thickness; the label names the shared capability.
var RELATED = [
    ['cotton', 'fabric', 4, 'shared: fiber handling and grading'],
    ['fabric', 'knit', 6, 'shared skill: precision stitching and quality control'],
    ['knit', 'sewing', 3, 'shared: knowing what a garment line actually needs'],
    ['fabric', 'dye', 4, 'shared: fiber chemistry and color consistency'],
    ['knit', 'dye', 3, 'shared: batch color matching'],
    ['sewing', 'parts', 4, 'shared: metal cutting to tolerance'],
    ['parts', 'machinery', 6, 'shared: precision assembly and shop-floor QC'],
    ['parts', 'motors', 5, 'shared: tolerance machining and materials handling'],
    ['machinery', 'motors', 4, 'shared: multi-part assembly and service networks'],
    ['machinery', 'instr', 3, 'shared: calibration and fine assembly'],
    ['boards', 'instr', 4, 'shared: electrical test and measurement'],
    ['boards', 'semi', 5, 'shared: cleanroom discipline and process control'],
    ['boards', 'motors', 2, 'shared: electrical assembly'],
    ['software', 'boards', 2, 'shared: embedded systems know-how'],
    ['software', 'instr', 2, 'shared: firmware and data handling'],
    ['timber', 'sawn', 4, 'shared: forestry logistics'],
    ['ore', 'oil', 2, 'shared: extraction and bulk export logistics'],
    ['ore', 'timber', 2, 'shared: bulk haulage']
];

var BASKETS = {
    textile: { label: 'Textile Exporter', ids: ['cotton', 'fabric', 'parts'] },
    commodity: { label: 'Raw Commodity Exporter', ids: ['ore', 'timber', 'oil'] }
};

var currentBasket = 'textile';

// Leave a margin around the force-directed layout so no node lands on the
// canvas edge or under the navigation buttons.
var FIT_SCALE = 0.94;

var GRAPH = {
    nodes: PRODUCTS.map(function (p) {
        var st = CLUSTER_STYLE[p.cluster];
        return { id: p.id, label: p.label, shape: 'box', margin: 9,
                 font: { size: 12 },
                 color: { background: st.bg, border: st.border } };
    }),
    edges: RELATED.map(function (r, i) {
        return { id: 'r' + i, from: r[0], to: r[1], width: r[2],
                 title: r[3],
                 color: { color: '#c3c9d0', highlight: REACHABLE_COLOR } };
    })
};

var INFO = {};
PRODUCTS.forEach(function (p) {
    INFO[p.id] = {
        tag: CLUSTER_STYLE[p.cluster].name,
        tagColor: CLUSTER_STYLE[p.cluster].border,
        title: p.label,
        body: '<p>' + p.cap + '</p>'
    };
});
RELATED.forEach(function (r, i) {
    INFO['r' + i] = {
        tag: 'Relatedness', tagColor: '#5B7FA6',
        title: r[0] + ' — ' + r[1],
        body: '<p>' + r[3] + '</p><p>Thicker edges mean more capability overlap, so ' +
              'the jump between those two products is a shorter one.</p>'
    };
});

var PLACEHOLDER = 'Pick a starting export basket, then press "Show Reachable ' +
                  'Products". Click any product for the capabilities it represents.';

var LEGEND =
    '<div class="legend-item"><span class="legend-swatch" style="background:' + CLUSTER_STYLE.textiles.bg + ';border-color:' + CLUSTER_STYLE.textiles.border + '"></span>Textiles</div>' +
    '<div class="legend-item"><span class="legend-swatch" style="background:' + CLUSTER_STYLE.machinery.bg + ';border-color:' + CLUSTER_STYLE.machinery.border + '"></span>Machinery / Electronics</div>' +
    '<div class="legend-item"><span class="legend-swatch" style="background:' + CLUSTER_STYLE.commodity.bg + ';border-color:' + CLUSTER_STYLE.commodity.border + '"></span>Raw Commodities</div>' +
    '<div class="legend-item"><span class="legend-swatch" style="border-color:' + EXPORTED_BORDER + ';background:white;border-width:3px"></span>Already exported</div>' +
    '<div class="legend-item"><span class="legend-swatch" style="background:' + REACHABLE_COLOR + '"></span>Newly reachable</div>';

var OPTIONS = {
    physics: {
        enabled: true,
        barnesHut: { gravitationalConstant: -3600, springLength: 88, springConstant: 0.055 },
        stabilization: { iterations: 300 }
    },
    edges: { arrows: { to: { enabled: false } } },
    nodes: { scaling: { label: { drawThreshold: 2 } } },
    interaction: { dragNodes: true, hover: true, tooltipDelay: 120 }
};

function neighborsOf(id) {
    var out = [];
    RELATED.forEach(function (r) {
        if (r[0] === id) { out.push(r[1]); }
        if (r[1] === id) { out.push(r[0]); }
    });
    return out;
}

function labelOf(id) {
    var p = PRODUCTS.filter(function (x) { return x.id === id; })[0];
    return p ? p.label : id;
}

function paintBasket(api) {
    var basket = BASKETS[currentBasket].ids;
    PRODUCTS.forEach(function (p) {
        var st = CLUSTER_STYLE[p.cluster];
        var inBasket = basket.indexOf(p.id) !== -1;
        api.nodes.update({
            id: p.id,
            color: { background: st.bg, border: inBasket ? EXPORTED_BORDER : st.border },
            borderWidth: inBasket ? 4 : 1
        });
    });
}

var CONTROLS = [
    {
        type: 'select', id: 'basket-select', label: 'Starting export basket',
        options: [
            { value: 'textile', label: 'Textile Exporter' },
            { value: 'commodity', label: 'Raw Commodity Exporter' }
        ],
        onChange: function (api, value) {
            currentBasket = value;
            paintBasket(api);
            api.setInfo('Export basket changed',
                '<p>Now starting from the <strong>' + BASKETS[value].label +
                '</strong> basket: ' + BASKETS[value].ids.map(labelOf).join(', ') +
                '.</p><p>Press "Show Reachable Products" to see what this basket ' +
                'puts within reach.</p>');
        }
    },
    {
        id: 'reach-btn', label: 'Show Reachable Products',
        onClick: function (api) {
            var basket = BASKETS[currentBasket].ids;
            var reachable = [];
            basket.forEach(function (id) {
                neighborsOf(id).forEach(function (n) {
                    if (basket.indexOf(n) === -1 && reachable.indexOf(n) === -1) {
                        reachable.push(n);
                    }
                });
            });

            PRODUCTS.forEach(function (p) {
                var st = CLUSTER_STYLE[p.cluster];
                if (basket.indexOf(p.id) !== -1) {
                    api.nodes.update({ id: p.id, borderWidth: 4,
                        color: { background: st.bg, border: EXPORTED_BORDER } });
                } else if (reachable.indexOf(p.id) !== -1) {
                    api.nodes.update({ id: p.id, borderWidth: 3,
                        color: { background: '#FBE2C6', border: REACHABLE_COLOR } });
                } else {
                    api.nodes.update({ id: p.id, borderWidth: 1,
                        color: { background: UNREACHABLE_BG, border: UNREACHABLE_BORDER } });
                }
            });

            var far = PRODUCTS.filter(function (p) {
                return basket.indexOf(p.id) === -1 && reachable.indexOf(p.id) === -1;
            });

            api.setInfo(BASKETS[currentBasket].label + ': one round of relatedness',
                '<span class="tag" style="background-color:' + REACHABLE_COLOR + '">' +
                reachable.length + ' products within reach</span>' +
                '<p><strong>Currently exported:</strong> ' + basket.map(labelOf).join(', ') + '</p>' +
                '<p><strong>Reachable next:</strong> ' +
                (reachable.length ? reachable.map(labelOf).join(', ') : 'nothing adjacent') + '</p>' +
                '<p><strong>Still out of reach this round:</strong> ' +
                far.map(labelOf).join(', ') + '</p>' +
                '<p>Compare the two baskets. The textile basket sits next to a dense ' +
                'neighborhood, so one step opens several options. The commodity basket ' +
                'sits in a sparse corner, so the same single step opens almost ' +
                'nothing — which is the whole argument of the product space: <em>what ' +
                'you can make next depends on what you already make</em>, not on how ' +
                'much your current exports are worth.</p>');
        }
    },
    {
        id: 'reset-btn', label: 'Reset', className: 'secondary',
        onClick: function (api) {
            paintBasket(api);
            api.showPlaceholder();
        }
    }
];

function onReady(api) {
    paintBasket(api);
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
