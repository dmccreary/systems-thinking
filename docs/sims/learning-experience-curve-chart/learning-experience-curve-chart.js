// Learning Curve vs. Experience Curve - Chart.js
// CANVAS_HEIGHT: 520
// Chapter 24: Knowledge Systems and Economic Complexity
// Learning objective: compare the learning curve (labor time only) against the
// experience curve (total unit cost) and explain why the experience curve
// typically declines faster (Bloom: Analyze).
//
// Both series follow the standard power-law form C(n) = C0 * n^log2(r), where r
// is the fraction of cost retained per doubling of cumulative output. r = 0.80
// for the learning curve and r = 0.65 for the experience curve.

(function () {
    'use strict';

    var C0 = 100;                 // starting relative unit cost, in percent
    var R_LEARNING = 0.80;        // labor time retained per doubling
    var R_EXPERIENCE = 0.65;      // total unit cost retained per doubling

    var LEARNING_COLOR = '#2E5A87';
    var EXPERIENCE_COLOR = '#E8871A';
    var PLAYHEAD_COLOR = '#C62828';

    /** Power-law cost at cumulative volume n. */
    function costAt(n, r) {
        return C0 * Math.pow(n, Math.log2(r));
    }

    // Sample the log-scaled x-axis evenly in log space so both curves stay
    // smooth from 1 unit all the way out to 100,000.
    var POINTS = 90;
    var xs = [];
    for (var i = 0; i < POINTS; i++) {
        var t = i / (POINTS - 1);
        xs.push(Math.pow(10, t * 5));     // 10^0 .. 10^5
    }

    var learningData = xs.map(function (n) { return { x: n, y: costAt(n, R_LEARNING) }; });
    var experienceData = xs.map(function (n) { return { x: n, y: costAt(n, R_EXPERIENCE) }; });

    var playheadX = 1000;         // current slider position, in cumulative units
    var chart = null;

    /** Draws the vertical playhead at the slider's current volume. */
    var playheadPlugin = {
        id: 'playhead',
        afterDatasetsDraw: function (c) {
            var xScale = c.scales.x;
            var yScale = c.scales.y;
            var px = xScale.getPixelForValue(playheadX);
            if (!isFinite(px)) { return; }

            var ctx = c.ctx;
            ctx.save();
            ctx.setLineDash([6, 5]);
            ctx.lineWidth = 2;
            ctx.strokeStyle = PLAYHEAD_COLOR;
            ctx.beginPath();
            ctx.moveTo(px, yScale.top);
            ctx.lineTo(px, yScale.bottom);
            ctx.stroke();
            ctx.setLineDash([]);

            // Mark where the playhead meets each curve.
            [[costAt(playheadX, R_LEARNING), LEARNING_COLOR],
             [costAt(playheadX, R_EXPERIENCE), EXPERIENCE_COLOR]].forEach(function (pair) {
                var py = yScale.getPixelForValue(pair[0]);
                ctx.fillStyle = pair[1];
                ctx.beginPath();
                ctx.arc(px, py, 5, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 2;
                ctx.stroke();
            });
            ctx.restore();
        }
    };

    function buildChart() {
        var ctx = document.getElementById('chart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'Learning Curve (labor time only)',
                        data: learningData,
                        borderColor: LEARNING_COLOR,
                        backgroundColor: LEARNING_COLOR,
                        borderWidth: 3,
                        pointRadius: 0,
                        tension: 0.1
                    },
                    {
                        label: 'Experience Curve (total unit cost)',
                        data: experienceData,
                        borderColor: EXPERIENCE_COLOR,
                        backgroundColor: EXPERIENCE_COLOR,
                        borderWidth: 3,
                        pointRadius: 0,
                        tension: 0.1
                    }
                ]
            },
            plugins: [playheadPlugin],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'nearest', intersect: false, axis: 'x' },
                scales: {
                    x: {
                        type: 'logarithmic',
                        min: 1,
                        max: 100000,
                        title: { display: true, text: 'Cumulative Units Produced',
                                 font: { size: 13 } },
                        ticks: {
                            callback: function (value) {
                                var allowed = [1, 10, 100, 1000, 10000, 100000];
                                return allowed.indexOf(value) > -1 ? value.toLocaleString() : '';
                            },
                            font: { size: 12 }
                        }
                    },
                    y: {
                        min: 0,
                        max: 105,
                        title: { display: true, text: 'Relative Unit Cost (%, starting at 100)',
                                 font: { size: 13 } },
                        ticks: { font: { size: 12 } }
                    }
                },
                plugins: {
                    legend: { labels: { font: { size: 13 }, usePointStyle: true } },
                    tooltip: {
                        callbacks: {
                            title: function (items) {
                                return Math.round(items[0].parsed.x).toLocaleString() +
                                       ' cumulative units';
                            },
                            label: function (item) {
                                return item.dataset.label + ': ' +
                                       item.parsed.y.toFixed(1) + '% of starting cost';
                            }
                        }
                    }
                }
            }
        });
    }

    function buildControls() {
        var box = document.getElementById('controls');

        var label = document.createElement('label');
        label.setAttribute('for', 'volume');
        label.textContent = 'Cumulative Units Produced';
        box.appendChild(label);

        var slider = document.createElement('input');
        slider.type = 'range';
        slider.id = 'volume';
        slider.min = '0';
        slider.max = '100';
        slider.step = '1';
        slider.value = '60';        // 10^3 = 1,000 units
        slider.addEventListener('input', function () {
            playheadX = Math.pow(10, (Number(slider.value) / 100) * 5);
            chart.update('none');
            updateReadout();
        });
        box.appendChild(slider);
    }

    function updateReadout() {
        var learning = costAt(playheadX, R_LEARNING);
        var experience = costAt(playheadX, R_EXPERIENCE);
        var gap = learning - experience;
        document.getElementById('readout').innerHTML =
            'At <span class="val">' + Math.round(playheadX).toLocaleString() +
            '</span> cumulative units &mdash; ' +
            '<span style="color:' + LEARNING_COLOR + '">Learning curve: ' +
            '<span class="val">' + learning.toFixed(1) + '%</span></span> &nbsp;|&nbsp; ' +
            '<span style="color:' + EXPERIENCE_COLOR + '">Experience curve: ' +
            '<span class="val">' + experience.toFixed(1) + '%</span></span>' +
            '<br>The experience curve is <span class="val">' + gap.toFixed(1) +
            '</span> percentage points lower, because it counts process, ' +
            'supply-chain and equipment improvements on top of the labor time the ' +
            'learning curve measures on its own.';
    }

    document.addEventListener('DOMContentLoaded', function () {
        buildChart();
        buildControls();
        updateReadout();
    });
})();
