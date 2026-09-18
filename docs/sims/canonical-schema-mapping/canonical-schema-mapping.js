// Mapping Two Schemas to a Canonical Schema - vis-network
// CANVAS_HEIGHT: 500
// Chapter 17: Knowledge Representation and Metadata
// Learning objective: identify which fields correspond to the same canonical
// concept and state the transformation rule that maps one to the other
// (Bloom: Apply).

var A_COLOR = '#1F6FB2';
var B_COLOR = '#2E8B57';
var CANON_COLOR = '#B8611A';
var MAP_COLOR = '#8E7CC3';

function col(id, label, x, y, color, bg) {
    return { id: id, label: label, x: x, y: y, fixed: true, shape: 'box',
             margin: 11, font: { size: 14, face: 'Courier New' },
             color: { background: bg, border: color } };
}

var GRAPH = {
    nodes: [
        { id: 'hdrA', label: 'System A: Sales', x: -260, y: -175, fixed: true,
          shape: 'text', font: { size: 15, color: A_COLOR } },
        { id: 'hdrB', label: 'System B: Support', x: 0, y: -175, fixed: true,
          shape: 'text', font: { size: 15, color: B_COLOR } },
        { id: 'hdrC', label: 'Canonical Schema: Person', x: 265, y: -175, fixed: true,
          shape: 'text', font: { size: 15, color: CANON_COLOR } },

        col('a_name',  'cust_name',     -260, -40, A_COLOR, '#D3E5F5'),
        col('a_email', 'cust_email',    -260,  60, A_COLOR, '#D3E5F5'),
        col('b_name',  'full_name',        0, -40, B_COLOR, '#D5EDDF'),
        col('b_email', 'email_address',    0,  60, B_COLOR, '#D5EDDF'),
        col('c_name',  'name',           265, -40, CANON_COLOR, '#F8E3CE'),
        col('c_email', 'email',          265,  60, CANON_COLOR, '#F8E3CE')
    ],
    edges: [
        // The System A mappings are bowed away from the middle column. Drawn
        // straight they pass through the System B boxes and the diagram reads
        // as a chain A -> B -> canonical, which is the opposite of the point:
        // both source systems map independently onto the canonical field.
        { id: 'm1', from: 'a_name',  to: 'c_name',  dashes: true,
          smooth: { type: 'curvedCW', roundness: 0.32 } },
        { id: 'm2', from: 'b_name',  to: 'c_name',  dashes: true },
        { id: 'm3', from: 'a_email', to: 'c_email', dashes: true,
          smooth: { type: 'curvedCCW', roundness: 0.32 } },
        { id: 'm4', from: 'b_email', to: 'c_email', dashes: true }
    ]
};

var MATCH_BODY =
    '<strong>Schema matching</strong> is the step of deciding that two ' +
    'differently-named fields mean the same thing.<br><br>This field was matched ' +
    'to the canonical <code>{{canon}}</code> field because both represent the same ' +
    'real-world concept despite different naming.<br><br>Matching is a judgment ' +
    'about meaning, not about spelling — which is why it cannot be fully automated ' +
    'and why a registry of governed definitions is worth keeping.';

function fieldInfo(title, system, canon, note) {
    return {
        tag: system, tagColor: system.indexOf('A') > -1 ? A_COLOR : B_COLOR,
        title: title,
        body: MATCH_BODY.replace('{{canon}}', canon) + '<br><br>' + note
    };
}

var INFO = {
    a_name: fieldInfo('cust_name', 'System A: Sales', 'name',
        'Sales prefixes everything with <code>cust_</code> because in their world ' +
        'every person is a customer. That assumption is invisible until you try to ' +
        'merge with a system where some people are not.'),
    a_email: fieldInfo('cust_email', 'System A: Sales', 'email',
        'Same prefix convention, same hidden assumption.'),
    b_name: fieldInfo('full_name', 'System B: Support', 'name',
        'Support calls it <code>full_name</code> to distinguish it from a display ' +
        'handle. The extra word encodes a distinction Sales never had to make.'),
    b_email: fieldInfo('email_address', 'System B: Support', 'email',
        'Spelled out rather than abbreviated. Nothing about the data differs — only ' +
        'the naming habit of the team that built the table.'),
    c_name: {
        tag: 'Canonical field', tagColor: CANON_COLOR, title: 'name',
        body: 'The single agreed definition that both source fields map onto. ' +
              'Two source fields map into this one canonical field.<br><br>The ' +
              'canonical schema is what lets you add a third system later without ' +
              'renegotiating with the first two.'
    },
    c_email: {
        tag: 'Canonical field', tagColor: CANON_COLOR, title: 'email',
        body: 'The single agreed definition for an electronic mail address. Two ' +
              'source fields map into this one canonical field.'
    },
    m1: {
        tag: 'Mapping rule', tagColor: MAP_COLOR, title: 'cust_name → name',
        body: '<strong>Schema mapping</strong> is the executable rule that carries ' +
              'data from a source field into a canonical field.<br><br>' +
              '<code>Rule: canonical name = System A’s cust_name</code><br><br>' +
              'A direct copy, because the values are already in the same form.'
    },
    m2: {
        tag: 'Mapping rule', tagColor: MAP_COLOR, title: 'full_name → name',
        body: '<code>Rule: canonical name = System B’s full_name</code><br><br>' +
              'Also a direct copy. Matching told us these fields mean the same thing; ' +
              'mapping is what actually moves the value.'
    },
    m3: {
        tag: 'Mapping rule', tagColor: MAP_COLOR, title: 'cust_email → email',
        body: '<code>Rule: canonical email = lowercase(System A’s cust_email)</code>' +
              '<br><br>A transformation, not just a copy: mail addresses are ' +
              'case-insensitive, so normalizing case prevents the same person ' +
              'appearing twice after the merge.'
    },
    m4: {
        tag: 'Mapping rule', tagColor: MAP_COLOR, title: 'email_address → email',
        body: '<code>Rule: canonical email = lowercase(trim(System B’s ' +
              'email_address))</code><br><br>Support’s field sometimes carries ' +
              'trailing spaces from a web form, so the rule trims as well as ' +
              'lowercases. Two fields can mean the same thing and still need ' +
              'different cleanup.'
    }
};

var PLACEHOLDER = 'Click a field box to see why it was matched, or a dashed arrow ' +
                  'to see the transformation rule it stands for.';

var LEGEND =
    '<div class="legend-item"><span class="legend-swatch" style="background:#D3E5F5;border-color:' + A_COLOR + '"></span>System A: Sales</div>' +
    '<div class="legend-item"><span class="legend-swatch" style="background:#D5EDDF;border-color:' + B_COLOR + '"></span>System B: Support</div>' +
    '<div class="legend-item"><span class="legend-swatch" style="background:#F8E3CE;border-color:' + CANON_COLOR + '"></span>Canonical schema</div>';

var OPTIONS = {
    edges: { color: { color: '#9a8fbf', highlight: MAP_COLOR }, width: 2,
             smooth: { type: 'cubicBezier', forceDirection: 'horizontal', roundness: 0.5 } }
};

var CONTROLS = [
    {
        id: 'show-all', label: 'Show All Mappings',
        onClick: function (api) {
            api.edges.forEach(function (e) {
                api.edges.update({ id: e.id, width: 4,
                    color: { color: MAP_COLOR, highlight: MAP_COLOR } });
            });
            api.setInfo('All mappings',
                '<span class="tag" style="background-color:' + MAP_COLOR + '">4 mapping rules</span>' +
                '<p>Source fields mapping into each canonical field:</p>' +
                '<ul><li><code>name</code> &larr; <strong>2</strong> source fields ' +
                '(<code>cust_name</code>, <code>full_name</code>)</li>' +
                '<li><code>email</code> &larr; <strong>2</strong> source fields ' +
                '(<code>cust_email</code>, <code>email_address</code>)</li></ul>' +
                '<p>Two systems needed 4 rules. A third system would need 2 more — ' +
                'not 4 more — because every system negotiates only with the ' +
                'canonical schema, never with the other systems directly.</p>');
        }
    },
    {
        id: 'reset-btn', label: 'Reset', className: 'secondary',
        onClick: function (api) {
            api.edges.forEach(function (e) {
                api.edges.update({ id: e.id, width: 2,
                    color: { color: '#9a8fbf', highlight: MAP_COLOR } });
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
