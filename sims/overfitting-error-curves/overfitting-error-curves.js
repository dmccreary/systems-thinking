// Training vs. Validation Error - Spotting the Overfitting Point - Chart.js
// CANVAS_HEIGHT: 520
// Chapter 22: Artificial Intelligence and Machine Learning Foundations
// Learning objective: identify the epoch where continued training begins to
// overfit, and explain why the two curves diverge after that point
// (Bloom: Analyze).

(function () {
    'use strict';

    var TRAIN_COLOR = '#2E5A87';
    var VAL_COLOR = '#C62828';
    var MARKER_COLOR = '#E8871A';
    var ZONE_FILL = 'rgba(232, 135, 26, 0.12)';

    var MAX_EPOCH = 50;

    // Training error: a smooth monotonic decay toward zero. The model keeps
    // getting better at the data it can see, forever.
    function trainingError(e) {
        return 0.70 * Math.exp(-e / 9) + 0.03;
    }

    // Validation error: the same decay while the model is learning real signal,
    // plus a rising term once it starts memorizing noise. The sum turns upward
    // near epoch 15.
    function validationError(e) {
        return 0.70 * Math.exp(-e / 9) + 0.10 + 0.0042 * Math.pow(Math.max(0, e - 4), 1.35);
    }

    var epochs = [];
    var trainData = [];
    var valData = [];
    for (var e = 0; e <= MAX_EPOCH; e++) {
        epochs.push(e);
        trainData.push(trainingError(e));
        valData.push(validationError(e));
    }

    // The overfitting point is where validation error bottoms out.
    var overfitEpoch = valData.indexOf(Math.min.apply(null, valData));

    var playheadEpoch = 15;
    var showZone = false;
    var chart = null;

    /** Draws the dashed "Overfitting Begins Here" marker, the optional shaded
     *  overfitting zone, and the slider playhead. */
    var markerPlugin = {
        id: 'overfitMarker',
        beforeDatasetsDraw: function (c) {
            if (!showZone) { return; }
            var x = c.scales.x, y = c.scales.y;
            var ctx = c.ctx;
            ctx.save();
            ctx.fillStyle = ZONE_FILL;
            var left = x.getPixelForValue(overfitEpoch);
            ctx.fillRect(left, y.top, x.right - left, y.bottom - y.top);
            ctx.restore();
        },
        afterDatasetsDraw: function (c) {
            var x = c.scales.x, y = c.scales.y;
            var ctx = c.ctx;

            // The overfitting marker.
            var mx = x.getPixelForValue(overfitEpoch);
            ctx.save();
            ctx.setLineDash([7, 5]);
            ctx.lineWidth = 2.5;
            ctx.strokeStyle = MARKER_COLOR;
            ctx.beginPath();
            ctx.moveTo(mx, y.top);
            ctx.lineTo(mx, y.bottom);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.fillStyle = MARKER_COLOR;
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = mx > (x.left + x.right) / 2 ? 'right' : 'left';
            ctx.fillText('Overfitting Begins Here (epoch ' + overfitEpoch + ')',
                         mx + (ctx.textAlign === 'left' ? 6 : -6), y.top + 14);

            // The slider playhead.
            var px = x.getPixelForValue(playheadEpoch);
            ctx.setLineDash([3, 4]);
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = '#6c757d';
            ctx.beginPath();
            ctx.moveTo(px, y.top);
            ctx.lineTo(px, y.bottom);
            ctx.stroke();
            ctx.setLineDash([]);

            [[trainData[playheadEpoch], TRAIN_COLOR],
             [valData[playheadEpoch], VAL_COLOR]].forEach(function (pair) {
                var py = y.getPixelForValue(pair[0]);
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
                labels: epochs,
                datasets: [
                    {
                        label: 'Training Error',
                        data: trainData,
                        borderColor: TRAIN_COLOR,
                        backgroundColor: TRAIN_COLOR,
                        borderWidth: 3,
                        pointRadius: 0,
                        tension: 0.25
                    },
                    {
                        label: 'Validation Error',
                        data: valData,
                        borderColor: VAL_COLOR,
                        backgroundColor: VAL_COLOR,
                        borderWidth: 3,
                        pointRadius: 0,
                        tension: 0.25
                    }
                ]
            },
            plugins: [markerPlugin],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                scales: {
                    x: {
                        title: { display: true, text: 'Training Epoch', font: { size: 13 } },
                        ticks: {
                            font: { size: 12 },
                            callback: function (v, i) { return i % 5 === 0 ? epochs[i] : ''; }
                        }
                    },
                    y: {
                        min: 0,
                        max: 0.85,
                        title: { display: true, text: 'Error Rate', font: { size: 13 } },
                        ticks: { font: { size: 12 } }
                    }
                },
                plugins: {
                    legend: { labels: { font: { size: 13 }, usePointStyle: true } },
                    tooltip: {
                        callbacks: {
                            title: function (items) { return 'Epoch ' + items[0].label; },
                            label: function (item) {
                                return item.dataset.label + ': ' + item.parsed.y.toFixed(3);
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
        label.setAttribute('for', 'epoch');
        label.textContent = 'Training Epoch';
        box.appendChild(label);

        var slider = document.createElement('input');
        slider.type = 'range';
        slider.id = 'epoch';
        slider.min = '0';
        slider.max = String(MAX_EPOCH);
        slider.step = '1';
        slider.value = String(playheadEpoch);
        slider.addEventListener('input', function () {
            playheadEpoch = Number(slider.value);
            chart.update('none');
            updateReadout();
        });
        box.appendChild(slider);

        var btn = document.createElement('button');
        btn.id = 'zone-btn';
        btn.textContent = 'Highlight Overfitting Zone';
        btn.addEventListener('click', function () {
            showZone = !showZone;
            btn.classList.toggle('active', showZone);
            btn.textContent = showZone ? 'Hide Overfitting Zone'
                                       : 'Highlight Overfitting Zone';
            chart.update('none');
            updateReadout();
        });
        box.appendChild(btn);
    }

    function updateReadout() {
        var t = trainData[playheadEpoch];
        var v = valData[playheadEpoch];
        var gap = v - t;
        var phase = playheadEpoch < overfitEpoch
            ? 'Still learning — both curves are falling, so the model is picking ' +
              'up patterns that generalize.'
            : (playheadEpoch === overfitEpoch
                ? 'This is the turning point — validation error is at its minimum. ' +
                  'Stop training here.'
                : 'Now overfitting — training error keeps falling while validation ' +
                  'error rises. The model is memorizing noise in the training set ' +
                  'that is not present in data it has never seen.');

        document.getElementById('readout').innerHTML =
            'At epoch <span class="val">' + playheadEpoch + '</span> &mdash; ' +
            '<span style="color:' + TRAIN_COLOR + '">Training error: ' +
            '<span class="val">' + t.toFixed(3) + '</span></span> &nbsp;|&nbsp; ' +
            '<span style="color:' + VAL_COLOR + '">Validation error: ' +
            '<span class="val">' + v.toFixed(3) + '</span></span> &nbsp;|&nbsp; ' +
            'gap <span class="val">' + gap.toFixed(3) + '</span><br>' + phase;
    }

    document.addEventListener('DOMContentLoaded', function () {
        buildChart();
        buildControls();
        updateReadout();
    });
})();
