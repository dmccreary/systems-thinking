// Three Reinforcing Loops Behind Knowledge Graph Adoption - vis-network
// CANVAS_HEIGHT: 625
// Chapter 19: Enterprise Knowledge Graphs
// Learning objective: trace each loop's causal chain back to its starting point
// and explain why each is reinforcing rather than balancing (Bloom: Analyze).

var COMPARE_LABEL = 'Highlight All Loops';

var COMPARE_MESSAGE =
    '<p>Each loop is now drawn in its own color. Look past the labels at the ' +
    '<strong>shape</strong>: all three are the same three-stage reinforcing loop, ' +
    'where every link carries a <strong>+</strong> and the last stage feeds the first.</p>' +
    '<p>That is the point. Sponsorship, careers and integration cost sound like ' +
    'three unrelated organizational problems, but structurally they are one problem ' +
    'repeated three times — which is also why one stalled stage can quietly stall ' +
    'the whole adoption effort.</p>';

var LOOPS = [
    {
        id: 'cio',
        title: 'CIO Influence Diagram',
        color: '#1F6FB2',
        fill: '#D3E5F5',
        badge: 'Nothing in this loop pushes back. A visible early win makes the CIO ' +
               'more willing to sponsor the next phase, which buys more funding and ' +
               'visibility, which makes the next win easier to produce. Each trip ' +
               'around the loop amplifies the last one, so it is reinforcing rather ' +
               'than balancing — and it runs just as fast in reverse if an early ' +
               'pilot fails publicly.',
        stages: [
            { id: 'cio-1', label: 'CIO Sponsorship',
              body: 'An executive sponsor who will defend the knowledge graph budget ' +
                    'in a room where nobody else understands it yet. Without this ' +
                    'stage, the loop never starts turning.' },
            { id: 'cio-2', label: 'Pilot Funding and Visibility',
              body: 'Sponsorship converts into money, staff and a place on the ' +
                    'quarterly roadmap. Visibility matters as much as funding: a ' +
                    'well-funded invisible project produces no ammunition for the ' +
                    'next stage.' },
            { id: 'cio-3', label: 'Visible Early Win',
              body: 'A concrete result someone outside the project team can point ' +
                    'at — a question answered in minutes that used to take weeks. ' +
                    'This is what feeds back into sponsorship.' }
        ]
    },
    {
        id: 'career',
        title: 'Employee Career Path Loop',
        color: '#2E8B57',
        fill: '#D5EDDF',
        badge: 'Employees keep their skill data current because the graph gives them ' +
               'something back — visible internal career paths. Current data makes ' +
               'the graph more accurate, which makes the career paths more credible, ' +
               'which brings more employees in. The loop pays its own maintenance ' +
               'cost, which is exactly why it reinforces instead of decaying.',
        stages: [
            { id: 'career-1', label: 'Employees Using the Graph for Career Paths',
              body: 'People open the graph to see which roles their current skills ' +
                    'lead toward. This is the loop’s entry point: usage driven ' +
                    'by self-interest, not by a compliance mandate.' },
            { id: 'career-2', label: 'Employees Keep Skill Data Current',
              body: 'Because the recommendations are only as good as the profile ' +
                    'behind them, people update their own skills. The organization ' +
                    'gets data quality it could never have mandated.' },
            { id: 'career-3', label: 'Graph Accuracy',
              body: 'Accurate, current skill data makes every downstream answer ' +
                    'better — staffing, succession planning, and the very career ' +
                    'paths that drew people in.' }
        ]
    },
    {
        id: 'std',
        title: 'Data Standardization Cycle',
        color: '#B8611A',
        fill: '#F8E3CE',
        badge: 'Each system that adopts the shared standard makes the standard more ' +
               'valuable to the next system, because more of the mapping work is ' +
               'already done. Cost per integration falls as adoption rises, so ' +
               'adoption rises further. This is the same network effect that makes ' +
               'a common language spread, and it is reinforcing in both directions.',
        stages: [
            { id: 'std-1', label: 'Systems Adopting the Shared Standard',
              body: 'Each system that maps its fields onto the canonical model joins ' +
                    'the shared vocabulary instead of adding another dialect.' },
            { id: 'std-2', label: 'Lower Marginal Integration Cost',
              body: 'Once several systems speak the standard, connecting one more ' +
                    'means writing one mapping rather than one mapping per existing ' +
                    'partner — the hub advantage, made concrete.' },
            { id: 'std-3', label: 'Attractiveness to the Next System',
              body: 'A cheap, well-trodden integration path is an easy decision for ' +
                    'the next team. Attractiveness is what converts falling cost ' +
                    'back into more adoption.' }
        ]
    }
];

// ---------------------------------------------------------------------------
// Shared three-loop rendering. LOOPS (above) supplies the content; everything
// below lays the loops out, wires the click handlers, and drives the
// "compare all" highlight.
// ---------------------------------------------------------------------------
(function () {
    'use strict';

    var NEUTRAL_BG = '#D6E3F0';
    var NEUTRAL_BORDER = '#5B7FA6';
    var BADGE_BG = '#C62828';

    var nodes = new vis.DataSet();
    var edges = new vis.DataSet();
    var infoMap = {};
    var network = null;
    var comparing = false;

    // Lay each loop out as a triangle with its R badge at the centroid.
    function buildData() {
        var clusterWidth = 300;
        var radius = 100;

        LOOPS.forEach(function (loop, li) {
            var ox = li * clusterWidth;
            var n = loop.stages.length;

            // Cluster caption, drawn as a label-only node above the loop.
            nodes.add({
                id: loop.id + '-title',
                label: loop.title,
                x: ox, y: -radius - 62,
                fixed: true,
                shape: 'text',
                font: { size: 13, color: '#1a3a6c', face: 'Arial' }
            });

            loop.stages.forEach(function (stage, si) {
                var angle = -Math.PI / 2 + (2 * Math.PI * si) / n;
                nodes.add({
                    id: stage.id,
                    label: wrapLabel(stage.label),
                    x: ox + radius * Math.cos(angle),
                    y: radius * Math.sin(angle),
                    fixed: true,
                    shape: 'box',
                    margin: 9,
                    widthConstraint: { minimum: 96, maximum: 116 },
                    font: { size: 11, face: 'Arial' },
                    color: { background: NEUTRAL_BG, border: NEUTRAL_BORDER }
                });
                infoMap[stage.id] = {
                    tag: 'Stage ' + (si + 1) + ' of ' + n,
                    tagColor: loop.color,
                    title: stage.label,
                    body: stage.body
                };

                var next = loop.stages[(si + 1) % n];
                edges.add({
                    id: stage.id + '->' + next.id,
                    from: stage.id,
                    to: next.id,
                    label: '+',
                    font: { size: 17, color: '#2E7D32', strokeWidth: 4, strokeColor: 'white' },
                    color: { color: '#6c757d', highlight: loop.color },
                    width: 2,
                    smooth: { type: 'curvedCW', roundness: 0.22 },
                    loopId: loop.id
                });
            });

            // The R badge at the center of the loop.
            nodes.add({
                id: loop.id + '-badge',
                label: 'R',
                x: ox, y: 0,
                fixed: true,
                shape: 'circle',
                font: { size: 20, color: 'white', face: 'Arial' },
                color: { background: BADGE_BG, border: '#8E1B1B' },
                widthConstraint: { minimum: 34 }
            });
            infoMap[loop.id + '-badge'] = {
                tag: 'Reinforcing loop',
                tagColor: BADGE_BG,
                title: loop.title + ' — why it is reinforcing',
                body: loop.badge
            };
        });
    }

    // vis-network does not wrap box labels for us, so break long labels by hand.
    function wrapLabel(text) {
        var words = text.split(' ');
        var lines = [];
        var line = '';
        words.forEach(function (w) {
            if ((line + ' ' + w).trim().length > 15) {
                lines.push(line.trim());
                line = w;
            } else {
                line = (line + ' ' + w).trim();
            }
        });
        if (line) { lines.push(line); }
        return lines.join('\n');
    }

    function isInIframe() {
        try { return window.self !== window.top; } catch (e) { return true; }
    }

    function init() {
        var mouseOk = !isInIframe();
        network = new vis.Network(
            document.getElementById('network'),
            { nodes: nodes, edges: edges },
            {
                layout: { improvedLayout: false },
                physics: { enabled: false },
                edges: { arrows: { to: { enabled: true, scaleFactor: 0.75 } } },
                interaction: {
                    dragView: mouseOk,
                    zoomView: mouseOk,
                    navigationButtons: true,
                    selectConnectedEdges: false,
                    dragNodes: false,
                    keyboard: { enabled: false }
                }
            }
        );

        // Exposed so screenshot and layout-review tooling can inspect the view.
        window.__microsimNetwork = network;

        network.on('click', function (params) {
            if (params.nodes.length > 0) { showNode(params.nodes[0]); }
        });

        network.once('afterDrawing', fitNetwork);
        setTimeout(fitNetwork, 300);
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

    function showNode(id) {
        var info = infoMap[id];
        if (!info) { return; }
        var html = '<span class="tag" style="background-color:' + info.tagColor + '">' +
                   info.tag + '</span><p>' + info.body + '</p>';
        setInfo(info.title, html);
    }

    function setInfo(title, html) {
        document.getElementById('info-title').textContent = title;
        document.getElementById('info-body').innerHTML = html;
    }

    /** Color each loop separately so their identical structure is obvious. */
    function toggleCompare() {
        comparing = !comparing;
        LOOPS.forEach(function (loop) {
            loop.stages.forEach(function (stage) {
                nodes.update({
                    id: stage.id,
                    color: comparing
                        ? { background: loop.fill, border: loop.color }
                        : { background: NEUTRAL_BG, border: NEUTRAL_BORDER }
                });
            });
        });
        edges.forEach(function (e) {
            if (!e.loopId) { return; }
            var loop = LOOPS.filter(function (l) { return l.id === e.loopId; })[0];
            edges.update({
                id: e.id,
                color: { color: comparing ? loop.color : '#6c757d', highlight: loop.color },
                width: comparing ? 3 : 2
            });
        });

        document.getElementById('compare-btn').textContent =
            comparing ? 'Show Loops Separately' : COMPARE_LABEL;

        if (comparing) {
            setInfo('All three loops share one structure', COMPARE_MESSAGE);
        }
    }

    function buildControls() {
        var box = document.getElementById('controls');
        var btn = document.createElement('button');
        btn.id = 'compare-btn';
        btn.textContent = COMPARE_LABEL;
        btn.addEventListener('click', toggleCompare);
        box.appendChild(btn);

        var legend = document.createElement('div');
        legend.className = 'legend';
        legend.innerHTML = LOOPS.map(function (l) {
            return '<div class="legend-item"><span class="legend-swatch" style="background:' +
                   l.color + '"></span>' + l.title + '</div>';
        }).join('') +
        '<div class="legend-item"><span class="legend-swatch" style="background:' + BADGE_BG +
        '"></span>R = reinforcing loop</div>';
        box.appendChild(legend);
    }

    document.addEventListener('DOMContentLoaded', function () {
        buildData();
        buildControls();
        init();
    });
})();
