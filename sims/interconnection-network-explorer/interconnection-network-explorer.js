// Interconnection Network Explorer - vis-network
// CANVAS_HEIGHT: 520
// Chapter 1: Foundations of Systems Thinking
// Learning objective: trace which nodes are affected, directly and indirectly,
// by a disruption at a chosen node (Bloom: Analyze).
//
// Six supply-chain nodes are laid out left to right in flow order. Clicking any
// node runs a breadth-first search over the edge list and highlights everything
// downstream of it, separating what it touches directly from what interdependence
// carries further along.

(function () {
    'use strict';

    // ---- colors ----
    var DEFAULT_BG = '#D6E3F0';
    var DEFAULT_BORDER = '#5B7FA6';
    var SELECTED_BG = '#E8871A';       // the book's accent orange
    var SELECTED_BORDER = '#A85D06';
    var DOWNSTREAM_BG = '#F7CB96';     // lighter orange: reached indirectly
    var DOWNSTREAM_BORDER = '#D89545';
    var DIM_BG = '#EDEFF2';
    var DIM_BORDER = '#C4C9D0';

    var nodeInfo = {
        semi: {
            title: 'Semiconductor Factory',
            body: 'Fabricates the chips that end up in engine controllers, sensors and ' +
                  'infotainment units. It sits at the head of the chain, so a stoppage ' +
                  'here eventually reaches every node downstream of it.'
        },
        parts: {
            title: 'Parts Supplier',
            body: 'Assembles chips and raw materials into the subassemblies a car plant ' +
                  'bolts together. It depends on the factory upstream and is depended on ' +
                  'by the manufacturer downstream.'
        },
        maker: {
            title: 'Car Manufacturer',
            body: 'Builds finished vehicles. Because it draws on many suppliers at once, ' +
                  'it is the point where several separate disruptions can arrive together.'
        },
        ship: {
            title: 'Shipping Company',
            body: 'Moves finished vehicles from the plant to dealerships. It adds delay ' +
                  'to the chain, which is what makes an upstream disruption show up late ' +
                  'and unexpectedly at the far end.'
        },
        dealer: {
            title: 'Dealership',
            body: 'Holds inventory and sells to customers. It has two suppliers here ' +
                  'the normal shipping route and a direct specialty-parts line from the ' +
                  'chip factory.'
        },
        cust: {
            title: 'Customer',
            body: 'The end of the chain. A customer waiting months for a car is usually ' +
                  'experiencing a disruption that started several nodes away, which is ' +
                  'exactly why single-cause explanations fail here.'
        }
    };

    var nodes = new vis.DataSet([
        { id: 'semi',   label: 'Semiconductor\nFactory', level: 0 },
        { id: 'parts',  label: 'Parts\nSupplier',        level: 1 },
        { id: 'maker',  label: 'Car\nManufacturer',      level: 2 },
        { id: 'ship',   label: 'Shipping\nCompany',      level: 3 },
        { id: 'dealer', label: 'Dealership',             level: 4 },
        { id: 'cust',   label: 'Customer',               level: 5 }
    ]);

    var edges = new vis.DataSet([
        { id: 'e1', from: 'semi',   to: 'parts'  },
        { id: 'e2', from: 'parts',  to: 'maker'  },
        { id: 'e3', from: 'maker',  to: 'ship'   },
        { id: 'e4', from: 'ship',   to: 'dealer' },
        { id: 'e5', from: 'dealer', to: 'cust'   },
        {
            id: 'e6', from: 'semi', to: 'dealer',
            label: 'also ships specialty parts directly',
            dashes: true,
            color: { color: '#C62828', highlight: '#C62828' },
            font: { size: 12, color: '#C62828', align: 'top',
                    strokeWidth: 5, strokeColor: 'white' },
            smooth: { type: 'curvedCCW', roundness: 0.45 }
        }
    ]);

    var network = null;

    function isInIframe() {
        try { return window.self !== window.top; } catch (e) { return true; }
    }

    function baseNodeStyle() {
        return {
            shape: 'box',
            margin: 10,
            widthConstraint: { minimum: 92, maximum: 120 },
            font: { size: 13, face: 'Arial', multi: false },
            color: { background: DEFAULT_BG, border: DEFAULT_BORDER }
        };
    }

    function init() {
        var mouseOk = !isInIframe();
        var options = {
            layout: {
                hierarchical: {
                    enabled: true,
                    direction: 'LR',
                    sortMethod: 'directed',
                    levelSeparation: 150,
                    nodeSpacing: 110
                }
            },
            physics: { enabled: false },
            nodes: baseNodeStyle(),
            edges: {
                arrows: { to: { enabled: true, scaleFactor: 0.8 } },
                color: { color: '#6c757d', highlight: '#E8871A' },
                width: 2,
                smooth: { type: 'cubicBezier', forceDirection: 'horizontal', roundness: 0.4 }
            },
            interaction: {
                dragView: mouseOk,
                zoomView: mouseOk,
                navigationButtons: true,
                selectConnectedEdges: false,
                keyboard: { enabled: false }
            }
        };

        network = new vis.Network(document.getElementById('network'),
                                  { nodes: nodes, edges: edges }, options);

        network.on('click', function (params) {
            if (params.nodes.length > 0) {
                highlightFrom(params.nodes[0]);
            }
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

    /** Re-center and scale the graph. vis-network caps fit() at 100% by
     *  default, which leaves a small graph stranded in a large container. */
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

    /** Direct successors of a node, read straight off the edge list. */
    function directSuccessors(id) {
        return edges.get({ filter: function (e) { return e.from === id; } })
                    .map(function (e) { return e.to; });
    }

    /** Breadth-first search over the edge list from `start`, excluding `start`. */
    function reachableFrom(start) {
        var seen = {};
        var queue = [start];
        var order = [];
        seen[start] = true;
        while (queue.length) {
            var cur = queue.shift();
            directSuccessors(cur).forEach(function (next) {
                if (!seen[next]) {
                    seen[next] = true;
                    order.push(next);
                    queue.push(next);
                }
            });
        }
        return order;
    }

    function labelOf(id) {
        return nodeInfo[id] ? nodeInfo[id].title : id;
    }

    function highlightFrom(start) {
        var direct = directSuccessors(start);
        var all = reachableFrom(start);
        var indirect = all.filter(function (id) { return direct.indexOf(id) === -1; });

        nodes.forEach(function (n) {
            var update = { id: n.id };
            if (n.id === start) {
                update.color = { background: SELECTED_BG, border: SELECTED_BORDER };
                update.font = { size: 13, color: 'white' };
            } else if (all.indexOf(n.id) !== -1) {
                update.color = { background: DOWNSTREAM_BG, border: DOWNSTREAM_BORDER };
                update.font = { size: 13, color: '#212529' };
            } else {
                update.color = { background: DIM_BG, border: DIM_BORDER };
                update.font = { size: 13, color: '#adb5bd' };
            }
            nodes.update(update);
        });

        var info = nodeInfo[start];
        var html = '<span class="tag">Disruption at this node</span>';
        html += '<p><strong>' + info.title + '</strong> — ' + info.body + '</p>';
        html += '<p>If <strong>' + info.title + '</strong> stops working, it directly affects: ' +
                (direct.length ? '<strong>' + direct.map(labelOf).join(', ') + '</strong>' : 'nothing directly') + '.</p>';
        html += '<p>Because of interdependence, the disruption can also reach: ' +
                (indirect.length ? '<strong>' + indirect.map(labelOf).join(', ') + '</strong>' : 'nothing further') + '.</p>';
        setInfo('Tracing a disruption', html);
    }

    function resetHighlighting() {
        nodes.forEach(function (n) {
            nodes.update({
                id: n.id,
                color: { background: DEFAULT_BG, border: DEFAULT_BORDER },
                font: { size: 13, color: '#212529' }
            });
        });
        setInfo('Details',
            '<p class="info-placeholder">Click any node to see which parts of the ' +
            'chain a disruption there would reach.</p>');
    }

    function setInfo(title, html) {
        document.getElementById('info-title').textContent = title;
        document.getElementById('info-body').innerHTML = html;
    }

    function buildControls() {
        var box = document.getElementById('controls');
        var reset = document.createElement('button');
        reset.textContent = 'Reset Highlighting';
        reset.className = 'secondary';
        reset.addEventListener('click', resetHighlighting);
        box.appendChild(reset);

        var legend = document.createElement('div');
        legend.className = 'legend';
        legend.innerHTML =
            '<div class="legend-item"><span class="legend-swatch" style="background:' + SELECTED_BG + '"></span>Disrupted node</div>' +
            '<div class="legend-item"><span class="legend-swatch" style="background:' + DOWNSTREAM_BG + '"></span>Reached by the disruption</div>' +
            '<div class="legend-item"><span class="legend-line" style="border-top-style:dashed;border-top-color:#C62828"></span>Direct specialty-parts route</div>';
        box.appendChild(legend);
    }

    document.addEventListener('DOMContentLoaded', function () {
        buildControls();
        init();
        resetHighlighting();
    });
})();
