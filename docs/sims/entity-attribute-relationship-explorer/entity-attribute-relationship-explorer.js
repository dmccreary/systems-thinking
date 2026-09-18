// Entity-Attribute-Relationship Explorer - vis-network
// CANVAS_HEIGHT: 500
// Chapter 17: Knowledge Representation and Metadata
// Learning objective: classify each labeled piece of a knowledge representation
// as an entity, an attribute, or a relationship, and identify which attributes
// belong to an entity versus to a relationship (Bloom: Analyze).

var ENTITY_COLOR = '#1F6FB2';
var ATTR_COLOR = '#2E8B57';
var REL_ATTR_COLOR = '#B8611A';

var GRAPH = {
    nodes: [
        { id: 'ana', label: 'Ana : Person', x: -190, y: 0, fixed: true,
          shape: 'box', margin: 14, font: { size: 16, color: 'white' },
          color: { background: ENTITY_COLOR, border: '#14517F' } },
        { id: 'acme', label: 'Acme Corp : Company', x: 190, y: 0, fixed: true,
          shape: 'box', margin: 14, font: { size: 16, color: 'white' },
          color: { background: ENTITY_COLOR, border: '#14517F' } },

        // Attributes of the Ana entity
        { id: 'ana-name', label: 'name: Ana', x: -290, y: -130, fixed: true,
          shape: 'ellipse', font: { size: 12 },
          color: { background: '#D5EDDF', border: ATTR_COLOR } },
        { id: 'ana-age', label: 'age: 34', x: -290, y: 130, fixed: true,
          shape: 'ellipse', font: { size: 12 },
          color: { background: '#D5EDDF', border: ATTR_COLOR } },

        // Attributes of the Acme Corp entity
        { id: 'acme-name', label: 'name: Acme Corp', x: 300, y: -130, fixed: true,
          shape: 'ellipse', font: { size: 12 },
          color: { background: '#D5EDDF', border: ATTR_COLOR } },
        { id: 'acme-ind', label: 'industry:\nManufacturing', x: 300, y: 130, fixed: true,
          shape: 'ellipse', font: { size: 12 },
          color: { background: '#D5EDDF', border: ATTR_COLOR } },

        // The attribute that belongs to the relationship, not to either entity
        { id: 'since', label: 'since: 2020', x: 0, y: 135, fixed: true,
          shape: 'ellipse', font: { size: 12 },
          color: { background: '#F8E3CE', border: REL_ATTR_COLOR } }
    ],
    edges: [
        { id: 'works-at', from: 'ana', to: 'acme', label: 'WORKS_AT',
          width: 3, font: { size: 14, color: '#14517F' },
          color: { color: ENTITY_COLOR, highlight: '#E8871A' } },

        { id: 'a1', from: 'ana', to: 'ana-name', dashes: true, width: 1,
          arrows: { to: { enabled: false } }, color: { color: ATTR_COLOR } },
        { id: 'a2', from: 'ana', to: 'ana-age', dashes: true, width: 1,
          arrows: { to: { enabled: false } }, color: { color: ATTR_COLOR } },
        { id: 'a3', from: 'acme', to: 'acme-name', dashes: true, width: 1,
          arrows: { to: { enabled: false } }, color: { color: ATTR_COLOR } },
        { id: 'a4', from: 'acme', to: 'acme-ind', dashes: true, width: 1,
          arrows: { to: { enabled: false } }, color: { color: ATTR_COLOR } },

        // The "since" attribute hangs off the relationship's midpoint, drawn as a
        // dashed line down from each endpoint so it visually belongs to the edge.
        { id: 'a5', from: 'ana', to: 'since', dashes: [2, 6], width: 1,
          arrows: { to: { enabled: false } }, color: { color: REL_ATTR_COLOR } },
        { id: 'a6', from: 'acme', to: 'since', dashes: [2, 6], width: 1,
          arrows: { to: { enabled: false } }, color: { color: REL_ATTR_COLOR } }
    ]
};

function entityInfo(name, attrs) {
    return {
        tag: 'Entity', tagColor: ENTITY_COLOR, title: name,
        body: '<strong>Entity: a distinct, identifiable thing being represented.</strong>' +
              '<br><br>Its attributes are: ' + attrs + '.<br><br>You can point at it, ' +
              'name it, and count it — that is the test for an entity.'
    };
}

function attrInfo(name, owner) {
    return {
        tag: 'Attribute', tagColor: ATTR_COLOR, title: name,
        body: '<strong>Attribute: a named property describing a characteristic.</strong>' +
              '<br><br>This attribute belongs to the <strong>' + owner + '</strong> entity. ' +
              'It has no independent existence: delete the entity and the attribute ' +
              'goes with it.'
    };
}

var INFO = {
    ana: entityInfo('Ana : Person', 'name: Ana, age: 34'),
    acme: entityInfo('Acme Corp : Company', 'name: Acme Corp, industry: Manufacturing'),
    'ana-name': attrInfo('name: Ana', 'Ana : Person'),
    'ana-age': attrInfo('age: 34', 'Ana : Person'),
    'acme-name': attrInfo('name: Acme Corp', 'Acme Corp : Company'),
    'acme-ind': attrInfo('industry: Manufacturing', 'Acme Corp : Company'),
    since: {
        tag: 'Attribute of a relationship', tagColor: REL_ATTR_COLOR,
        title: 'since: 2020',
        body: '<strong>This attribute belongs to the WORKS_AT relationship, not to ' +
              'either entity.</strong><br><br>Ana did not start in 2020 and neither ' +
              'did Acme Corp — the <em>employment</em> started in 2020. Ask "start of ' +
              'what?" and the answer names the relationship, which is the test for ' +
              'whether an attribute belongs on an edge instead of a node.'
    },
    'works-at': {
        tag: 'Relationship', tagColor: '#E8871A', title: 'WORKS_AT',
        body: '<strong>Relationship: a named, meaningful association between ' +
              'entities.</strong><br><br>Note that this relationship carries the ' +
              '<code>since</code> attribute itself. A model that can only put ' +
              'attributes on entities has nowhere to record when the employment ' +
              'began without inventing an artificial "Employment" entity.'
    }
};

var PLACEHOLDER = 'Click a blue box, a green circle, the orange circle, or the ' +
                  'WORKS_AT arrow to classify it.';

var LEGEND =
    '<div class="legend-item"><span class="legend-swatch" style="background:' + ENTITY_COLOR + '"></span>Entity</div>' +
    '<div class="legend-item"><span class="legend-swatch" style="background:#D5EDDF;border-color:' + ATTR_COLOR + '"></span>Attribute of an entity</div>' +
    '<div class="legend-item"><span class="legend-swatch" style="background:#F8E3CE;border-color:' + REL_ATTR_COLOR + '"></span>Attribute of a relationship</div>';

var CONTROLS = [
    {
        id: 'reset-btn', label: 'Clear Selection', className: 'secondary',
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
