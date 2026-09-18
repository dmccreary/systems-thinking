// Three Feedback Loops Behind Algorithmic Disparate Impact - vis-network
// CANVAS_HEIGHT: 625
// Chapter 23: AI Systems Dynamics
// Learning objective: trace each system's feedback loop from historical training
// data back to a new decision, and explain why each loop is reinforcing rather
// than self-correcting without a deliberate intervention (Bloom: Analyze).

var COMPARE_LABEL = 'Compare All Three';

var COMPARE_MESSAGE =
    '<p>All three loops are now drawn in their own colors. Ignore the domain labels ' +
    'and look at the <strong>shape</strong>: historical data &rarr; prediction &rarr; ' +
    'a new decision that becomes tomorrow’s historical data.</p>' +
    '<p>Admissions, credit and hiring are unrelated industries with different ' +
    'regulators and different data. Structurally they are the same loop. That is ' +
    'why a fix aimed at one model’s accuracy does not help: the problem is in ' +
    'the loop, not in the model.</p>' +
    '<p>Nothing in any of these loops pushes back on its own. Breaking one takes a ' +
    'deliberate intervention — auditing outcomes, holding out a control group, or ' +
    'refusing to feed a model its own past decisions.</p>';

var LOOPS = [
    {
        id: 'adm',
        title: 'College Admissions Algorithm',
        color: '#1F6FB2',
        fill: '#D3E5F5',
        badge: 'The loop reinforces whichever applicant profile the school admitted ' +
               'in the past. If one kind of applicant was historically under-admitted, ' +
               'the model learns that pattern as fact, predicts a poorer fit for ' +
               'similar applicants, admits fewer of them, and next year’s training ' +
               'data confirms the model was "right." Nothing in the loop can notice ' +
               'the applicants who were never given a chance to succeed.',
        stages: [
            { id: 'adm-1', label: 'Historical Admissions Data',
              body: 'Past applications and outcomes. This record is not a neutral ' +
                    'measurement of applicant quality — it is a record of past ' +
                    'decisions, including their blind spots.' },
            { id: 'adm-2', label: 'Predicted Applicant Fit',
              body: 'The model scores each applicant by similarity to students the ' +
                    'school admitted and graduated before. Similarity to the past is ' +
                    'the only signal it has.' },
            { id: 'adm-3', label: 'Admission Decision',
              body: 'This year’s decisions. The critical step is what happens ' +
                    'next: these decisions are filed away and become next year’s ' +
                    'training data.' }
        ]
    },
    {
        id: 'cred',
        title: 'Credit Scoring System',
        color: '#2E8B57',
        fill: '#D5EDDF',
        badge: 'Someone denied credit generates no repayment history, so the model ' +
               'never learns they would have repaid. The absence of evidence is read ' +
               'as evidence of risk. Each cycle the model grows more confident about ' +
               'a group it has systematically stopped observing, which is the ' +
               'signature of a reinforcing loop rather than a self-correcting one.',
        stages: [
            { id: 'cred-1', label: 'Historical Credit-Access Data',
              body: 'Records of who was previously granted credit and how they ' +
                    'repaid. Applicants who were denied leave no repayment record ' +
                    'at all — a gap the data cannot describe.' },
            { id: 'cred-2', label: 'Predicted Creditworthiness',
              body: 'A score built from that partial history. Thin files score ' +
                    'poorly, and the thinnest files belong to people the system ' +
                    'already declined to lend to.' },
            { id: 'cred-3', label: 'Credit Decision',
              body: 'Approve or decline. A decline writes nothing useful back into ' +
                    'the record, so the gap that caused it stays exactly as wide ' +
                    'next cycle.' }
        ]
    },
    {
        id: 'job',
        title: 'Job Recommendation Platform',
        color: '#B8611A',
        fill: '#F8E3CE',
        badge: 'The platform recommends candidates who resemble people hired before ' +
               'for that role. Those recommendations shape who gets interviewed, who ' +
               'gets hired, and therefore what the next round of "successful hire" ' +
               'data looks like. The loop is reinforcing because the model’s own ' +
               'output is the main thing determining its next input.',
        stages: [
            { id: 'job-1', label: 'Historical Hiring Data',
              body: 'Who was hired for this role before, and how their reviews went. ' +
                    'Reviews themselves come from managers whose judgments the data ' +
                    'never questions.' },
            { id: 'job-2', label: 'Predicted Candidate Fit',
              body: 'A similarity score against past hires. Anything that made a ' +
                    'past hire unusual is, to the model, a reason to rank a ' +
                    'candidate lower.' },
            { id: 'job-3', label: 'Who Gets Recommended',
              body: 'Recruiters mostly contact the top of the list, so the ' +
                    'recommendation is close to the decision. Those hires become ' +
                    'the next training set.' }
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
