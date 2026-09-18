// Data Lineage and Stewardship Along a Pipeline - vis-network
// CANVAS_HEIGHT: 500
// Chapter 18: Data Management and Governance
// Learning objective: trace a field's data lineage from source system to report
// and identify which stage a named data steward is accountable for
// (Bloom: Analyze).

var CHAIN_COLOR = '#1F6FB2';
var STEWARD_COLOR = '#B8611A';
var HILITE = '#E8871A';

var GRAPH = {
    nodes: [
        { id: 'crm',   label: 'CRM System\n(source)',      x: -340, y: -40, fixed: true },
        { id: 'etl',   label: 'ETL Transform',             x: -170, y: -40, fixed: true },
        { id: 'dw',    label: 'Central Data\nWarehouse',   x:    0, y: -40, fixed: true },
        { id: 'mart',  label: 'Sales Data Mart',           x:  175, y: -40, fixed: true },
        { id: 'rpt',   label: 'Executive Report',          x:  345, y: -40, fixed: true },
        { id: 'stew',  label: 'Data Steward:\nSales Ops',  x:   88, y: 130, fixed: true,
          color: { background: '#F8E3CE', border: STEWARD_COLOR },
          font: { size: 13 } }
    ],
    edges: [
        { id: 'l1', from: 'crm',  to: 'etl'  },
        { id: 'l2', from: 'etl',  to: 'dw'   },
        { id: 'l3', from: 'dw',   to: 'mart' },
        { id: 'l4', from: 'mart', to: 'rpt'  },
        { id: 's1', from: 'stew', to: 'dw',   dashes: true, label: 'accountable for',
          arrows: { to: { enabled: true, scaleFactor: 0.6 } },
          color: { color: STEWARD_COLOR, highlight: STEWARD_COLOR },
          font: { size: 11, color: STEWARD_COLOR } },
        { id: 's2', from: 'stew', to: 'mart', dashes: true, label: 'accountable for',
          arrows: { to: { enabled: true, scaleFactor: 0.6 } },
          color: { color: STEWARD_COLOR, highlight: STEWARD_COLOR },
          font: { size: 11, color: STEWARD_COLOR } }
    ]
};

function stageInfo(title, body) {
    return { tag: 'Lineage stage', tagColor: CHAIN_COLOR, title: title, body: body };
}

var INFO = {
    crm: stageInfo('CRM System (source)',
        'Lineage starts here. At this stage lineage records <em>where the value was ' +
        'first entered</em> — which system, which field, and by whom. When an ' +
        'executive disputes a number, this is the stage that answers "who typed ' +
        'it in?"'),
    etl: stageInfo('ETL Transform',
        'Lineage at this stage records <em>what was done to the value</em>. Here the ' +
        'customer region code is standardized and deduplicated against the master ' +
        'list. Transformations are where numbers silently change meaning, so an ' +
        'undocumented ETL step is the most common reason two reports disagree.'),
    dw: stageInfo('Central Data Warehouse',
        'Lineage records <em>which table and column</em> the value landed in, and ' +
        'when the load ran. This is the first stage where the value is shared ' +
        'across departments, so it is also the first stage where a mistake stops ' +
        'being one team’s problem.'),
    mart: stageInfo('Sales Data Mart',
        'Lineage records <em>which subset and which aggregation</em> was applied for ' +
        'the sales audience. A mart is a filtered, reshaped view, so a number here ' +
        'can differ legitimately from the warehouse — lineage is what proves the ' +
        'difference is legitimate.'),
    rpt: stageInfo('Executive Report',
        'The end of the chain. Lineage lets you click any figure here and walk all ' +
        'the way back to the CRM record that produced it. Without that path, ' +
        'disputes about a number turn into disputes about whose team is more ' +
        'trustworthy.'),
    stew: {
        tag: 'Data stewardship', tagColor: STEWARD_COLOR, title: 'Data Steward: Sales Ops',
        body: '<strong>Data stewardship</strong> is named human accountability for ' +
              'the quality and meaning of data at a specific stage — not ownership ' +
              'of the data, and not responsibility for the servers.<br><br>' +
              'This steward owns two stages: <strong>Central Data Warehouse</strong> ' +
              'and <strong>Sales Data Mart</strong>.<br><br>Note what they do ' +
              '<em>not</em> own: the CRM system where the value was typed, and the ' +
              'executive report where it is finally read. Governance fails most ' +
              'often at the stages nobody was named for.'
    }
};

var PLACEHOLDER = 'Click any stage to see what lineage records there, or click the ' +
                  'steward to see which stages they are accountable for.';

var LEGEND =
    '<div class="legend-item"><span class="legend-line" style="border-top-color:#6c757d"></span>Lineage (data flows this way)</div>' +
    '<div class="legend-item"><span class="legend-line" style="border-top-style:dashed;border-top-color:' + STEWARD_COLOR + '"></span>Stewardship accountability</div>';

var OPTIONS = {
    nodes: { widthConstraint: { minimum: 108, maximum: 128 }, font: { size: 13 } }
};

var CONTROLS = [
    {
        id: 'trace-btn', label: 'Trace Full Lineage',
        onClick: function (api) {
            ['l1', 'l2', 'l3', 'l4'].forEach(function (id) {
                api.edges.update({ id: id, width: 4,
                    color: { color: HILITE, highlight: HILITE } });
            });
            api.setInfo('Full lineage path',
                '<span class="tag" style="background-color:' + HILITE + '">5 stages</span>' +
                '<p><strong>CRM System &rarr; ETL Transform &rarr; Central Data ' +
                'Warehouse &rarr; Sales Data Mart &rarr; Executive Report</strong></p>' +
                '<p>That is the whole answer to "where did this number come from?" ' +
                'Every stage on the path can change the value, and every stage needs ' +
                'a named steward — here, only two of the five have one.</p>');
        }
    },
    {
        id: 'reset-btn', label: 'Reset', className: 'secondary',
        onClick: function (api) {
            ['l1', 'l2', 'l3', 'l4'].forEach(function (id) {
                api.edges.update({ id: id, width: 2,
                    color: { color: '#6c757d', highlight: HILITE } });
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
