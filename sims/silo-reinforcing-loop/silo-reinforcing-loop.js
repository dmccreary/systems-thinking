// The Organizational Silo Reinforcing Loop - vis-network
// CANVAS_HEIGHT: 500
// Chapter 20: Organizational Silos and Silo Busting
// Learning objective: trace the reinforcing loop from a bounded-rational local
// decision back to itself, and identify which single link a silo-busting
// intervention should target (Bloom: Analyze).

var LOOP_COLOR = '#1F6FB2';
var BADGE_COLOR = '#C62828';
var FIX_COLOR = '#2E8B57';

// Five loop vertices on a circle, the R badge at the center, and the
// intervention vertex parked outside the loop on the right.
var STAGES = [
    { id: 's1', label: 'Bounded-Rational\nLocal Decision' },
    { id: 's2', label: 'Department Optimizes\nIts Own Metric' },
    { id: 's3', label: 'Incentive Structure\nRewards the Local Win' },
    { id: 's4', label: 'Organizational\nSilo Deepens' },
    { id: 's5', label: 'Accidental Competitor\nEmerges Elsewhere' }
];

var RADIUS = 175;
var loopNodes = STAGES.map(function (s, i) {
    var a = -Math.PI / 2 + (2 * Math.PI * i) / STAGES.length;
    return {
        id: s.id, label: s.label,
        x: RADIUS * Math.cos(a), y: RADIUS * Math.sin(a),
        fixed: true, shape: 'box', margin: 10,
        font: { size: 12 },
        color: { background: '#D3E5F5', border: LOOP_COLOR }
    };
});

var loopEdges = STAGES.map(function (s, i) {
    var next = STAGES[(i + 1) % STAGES.length];
    return {
        id: s.id + '-' + next.id, from: s.id, to: next.id, label: '+',
        font: { size: 17, color: '#2E7D32', strokeWidth: 4, strokeColor: 'white' },
        smooth: { type: 'curvedCW', roundness: 0.2 }
    };
});

var GRAPH = {
    nodes: loopNodes.concat([
        { id: 'badge', label: 'R', x: 0, y: 0, fixed: true, shape: 'circle',
          font: { size: 22, color: 'white' },
          color: { background: BADGE_COLOR, border: '#8E1B1B' },
          widthConstraint: { minimum: 38 } },
        { id: 'fix', label: 'Silo-Busting Intervention\n(Shared Metrics +\nCross-Functional Team)',
          x: 430, y: 130, fixed: true, shape: 'box', margin: 11,
          font: { size: 12 },
          color: { background: '#D5EDDF', border: FIX_COLOR } }
    ]),
    edges: loopEdges.concat([
        { id: 'breaks', from: 'fix', to: 's3', dashes: true, label: 'breaks',
          width: 3,
          color: { color: FIX_COLOR, highlight: FIX_COLOR },
          font: { size: 13, color: FIX_COLOR },
          smooth: { type: 'curvedCCW', roundness: 0.2 } }
    ])
};

var INFO = {
    s1: { tag: 'Stage 1', tagColor: LOOP_COLOR, title: 'Bounded-Rational Local Decision',
          body: 'A manager decides using only the information, time and incentives ' +
                'available inside their own department. The decision is rational ' +
                '<em>given what they can see</em> — which is exactly why blaming ' +
                'individuals never fixes a silo.' },
    s2: { tag: 'Stage 2', tagColor: LOOP_COLOR, title: 'Department Optimizes Its Own Metric',
          body: 'The department gets measurably better at the thing it is measured ' +
                'on: tickets closed, cost per unit, leads generated. Local ' +
                'improvement is real, which is what makes this loop so hard to ' +
                'argue against.' },
    s3: { tag: 'Stage 3 — the leverage point', tagColor: '#E8871A',
          title: 'Incentive Structure Rewards the Local Win',
          body: 'Bonuses, promotions and praise attach to the local metric. This is ' +
                'the link the intervention targets, because it is the only link in ' +
                'the loop an organization can change by decision rather than by ' +
                'persuasion.' },
    s4: { tag: 'Stage 4', tagColor: LOOP_COLOR, title: 'Organizational Silo Deepens',
          body: 'Tools, vocabulary, data and budgets specialize around the local ' +
                'metric. Each round of specialization raises the cost of working ' +
                'across the boundary, so the boundary hardens.' },
    s5: { tag: 'Stage 5', tagColor: LOOP_COLOR, title: 'Accidental Competitor Emerges Elsewhere',
          body: 'Another department, solving its own version of the same problem, ' +
                'builds a duplicate capability. Nobody intended to compete — the ' +
                'structure produced two rivals out of one organization, and each ' +
                'now has more reason to make locally rational decisions.' },
    badge: { tag: 'Reinforcing loop', tagColor: BADGE_COLOR,
             title: 'Why this loop is reinforcing, not balancing',
             body: 'Every link in the loop carries a <strong>+</strong>: more of one ' +
                   'stage produces more of the next. A balancing loop would contain ' +
                   'at least one link that pushes back, so the system settles toward ' +
                   'a goal. Nothing here pushes back.<br><br>Each trip around the ' +
                   'loop makes the next trip more likely, which is why silos do not ' +
                   'drift back toward collaboration on their own and why waiting for ' +
                   'them to self-correct is not a strategy.' },
    fix: { tag: 'Intervention', tagColor: FIX_COLOR,
           title: 'Silo-Busting Intervention',
           body: 'Replacing a local-only incentive with a shared metric breaks the ' +
                 'loop at <strong>Incentive Structure Rewards the Local Win</strong> ' +
                 '— and it has to be that link, not any other.<br><br>' +
                 'You cannot intervene at Stage 1: bounded rationality is a fact ' +
                 'about human attention, not a policy. You cannot intervene at ' +
                 'Stage 2: nobody will argue for making a department worse at its ' +
                 'job. Stage 4 and Stage 5 are consequences, so cutting them treats ' +
                 'symptoms while the loop keeps turning.<br><br>Stage 3 is the one ' +
                 'link that is <em>designed</em> rather than emergent, which makes ' +
                 'it the only place a decision can actually land.' },
    breaks: { tag: 'Intervention link', tagColor: FIX_COLOR,
              title: 'Where the intervention cuts',
              body: 'A shared metric means the local win no longer pays unless the ' +
                    'cross-functional outcome also improves. The link from Stage 2 ' +
                    'to Stage 3 stops carrying a <strong>+</strong>, and a ' +
                    'reinforcing loop with one broken link is no longer a loop.' }
};

var PLACEHOLDER = 'Click any stage, the red R badge, or the green intervention box ' +
                  'to see what it means.';

var LEGEND =
    '<div class="legend-item"><span class="legend-swatch" style="background:#D3E5F5;border-color:' + LOOP_COLOR + '"></span>Loop stage</div>' +
    '<div class="legend-item"><span class="legend-swatch" style="background:' + BADGE_COLOR + '"></span>R = reinforcing loop</div>' +
    '<div class="legend-item"><span class="legend-swatch" style="background:#D5EDDF;border-color:' + FIX_COLOR + '"></span>Intervention</div>';

var CONTROLS = [
    {
        id: 'lev-btn', label: 'Where Should the Fix Go?',
        onClick: function (api) {
            api.nodes.update({ id: 's3',
                color: { background: '#F8E3CE', border: '#E8871A' } });
            api.showElement('fix');
        }
    },
    {
        id: 'reset-btn', label: 'Reset', className: 'secondary',
        onClick: function (api) {
            api.nodes.update({ id: 's3',
                color: { background: '#D3E5F5', border: LOOP_COLOR } });
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
