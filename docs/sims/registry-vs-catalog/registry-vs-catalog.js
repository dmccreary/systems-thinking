// Registry vs. Catalog Architecture — side-by-side network comparison
// CANVAS_HEIGHT: 580

const NODES = [
    // Left panel — Registry (around x = -250)
    { id: 'L-hdr',  label: 'Registry — authoritative definitions', x: -250, y: -260, shape: 'text',
      font: { size: 14, color: '#1a237e', face: 'Arial', bold: true } },
    { id: 'L-auth', label: 'Registration\nAuthority',  x: -250, y: -180, shape: 'box', group: 'auth',
      desc: '<strong>Registration Authority</strong> — the governing body that approves data elements. Versions everything; nothing changes without an explicit decision trail.' },
    { id: 'L-de',   label: 'Data Element\nCust. Annual Revenue',  x: -250, y: -60,  shape: 'ellipse', group: 'de',
      desc: '<strong>Data Element</strong> — the authoritative, approved unit. Tells consumers what the field <em>should</em> mean (definition, units, version).' },
    { id: 'L-dec',  label: 'Data Element Concept\nCustomer Revenue', x: -380, y: 70, shape: 'ellipse', group: 'dec',
      desc: '<strong>DEC</strong> — the abstract pairing of Object Class (Customer) and Property (Revenue). Implementation-free.' },
    { id: 'L-vd',   label: 'Value Domain\nDecimal, USD, TTM', x: -250, y: 90, shape: 'ellipse', group: 'dec',
      desc: '<strong>Value Domain</strong> — how the DEC is represented in storage. Combined with DEC to produce a Data Element.' },
    { id: 'L-cl',   label: 'Code List\nIndustry v3',   x: -120, y: 70, shape: 'box', group: 'cl',
      desc: '<strong>Code List</strong> — an enumerated set of permissible values; versioned alongside the Data Element that references it.' },
    { id: 'L-vh',   label: 'Version History',          x: -110, y: -60, shape: 'box', group: 'vh',
      desc: '<strong>Version History</strong> — every change to the Data Element is logged: who approved it, when, and what changed.' },

    // Right panel — Catalog (around x = 230)
    { id: 'R-hdr',  label: 'Catalog — discovery & documentation', x: 230, y: -260, shape: 'text',
      font: { size: 14, color: '#1a237e', face: 'Arial', bold: true } },
    { id: 'R-bot',  label: 'Crawler Bot',              x: 230, y: -180, shape: 'box', group: 'bot',
      desc: '<strong>Crawler Bot</strong> — automated discovery of datasets and fields across the enterprise. Updates continuously; no human gate.' },
    { id: 'R-tbl',  label: 'CRM Table:\ncustomers',    x: 230, y: -60, shape: 'ellipse', group: 'tbl',
      desc: '<strong>Discovered Table</strong> — a real table the crawler found in the CRM. The catalog records what <em>is</em>, not what should be.' },
    { id: 'R-fa',   label: 'Field:\nannual_revenue',   x: 130, y: 60,  shape: 'ellipse', group: 'field',
      desc: '<strong>Catalog Field</strong> — one column in the discovered table. The catalog has its name and basic profile data; the registry has its meaning.' },
    { id: 'R-fb',   label: 'Field:\ncustomer_id',      x: 330, y: 60,  shape: 'ellipse', group: 'field',
      desc: '<strong>Catalog Field</strong> — primary-key column. The catalog stores quality metrics on it; the registry would carry its formal definition.' },
    { id: 'R-q',    label: 'Quality\nScore: 0.92',     x: 80,  y: 170, shape: 'box', group: 'q',
      desc: '<strong>Quality Score</strong> — operational metric computed by data-quality rules. Lives in the catalog, not the registry.' },
    { id: 'R-own',  label: 'Owner:\nRevenue Ops',      x: 180, y: 170, shape: 'box', group: 'own',
      desc: '<strong>Owner</strong> — accountable team for the field, captured by the catalog. The registry separately records the registration authority.' }
];

const EDGES = [
    // Registry edges
    { from: 'L-auth', to: 'L-de',  label: 'approved' },
    { from: 'L-de',  to: 'L-dec',  label: 'instantiates' },
    { from: 'L-de',  to: 'L-vd',   label: 'uses' },
    { from: 'L-de',  to: 'L-cl',   label: 'references' },
    { from: 'L-de',  to: 'L-vh',   label: 'has-history' },
    // Catalog edges
    { from: 'R-bot', to: 'R-tbl',  label: 'discovered' },
    { from: 'R-tbl', to: 'R-fa',   label: 'has-field' },
    { from: 'R-tbl', to: 'R-fb',   label: 'has-field' },
    { from: 'R-fa',  to: 'R-q',    label: 'has-score' },
    { from: 'R-fa',  to: 'R-own',  label: 'owned-by' },
    // Cross-panel integration (dashed orange)
    { from: 'R-fa',  to: 'L-de',   label: 'defined-by', cross: true,
      desc: 'This is the integration link between catalog and registry. The catalog field links to the registry\'s authoritative definition, so any consumer reading the catalog field knows exactly what it means.' }
];

const GROUP_COLORS = {
    auth:  { background: '#fff3c4', border: '#e9c46a' },
    de:    { background: '#c5cae9', border: '#3949ab' },
    dec:   { background: '#a7e5dc', border: '#00897b' },
    cl:    { background: '#cbd9ee', border: '#5b7fbd' },
    vh:    { background: '#cfd8dc', border: '#90a4ae' },
    bot:   { background: '#cbd9ee', border: '#5b7fbd' },
    tbl:   { background: '#fff3c4', border: '#e9c46a' },
    field: { background: '#a7e5dc', border: '#00897b' },
    q:     { background: '#ffd3c3', border: '#e76f51' },
    own:   { background: '#c8e6c9', border: '#2e7d32' }
};

const CROSS_DESC = EDGES.find(e => e.cross).desc;

function isInIframe() { try { return window.self !== window.top; } catch (e) { return true; } }

let network;

function init() {
    const nodes = NODES.map(n => {
        const palette = GROUP_COLORS[n.group] || { background: '#eceff1', border: '#90a4ae' };
        const base = {
            id: n.id, label: n.label, shape: n.shape || 'box',
            x: n.x, y: n.y, fixed: { x: true, y: true },
            font: n.font || { size: 10, color: '#212121', face: 'Arial' },
            borderWidth: 2
        };
        if (n.shape !== 'text') {
            base.color = { background: palette.background, border: palette.border,
                            highlight: { background: palette.border, border: '#000' } };
            base.widthConstraint = 130;
            base.heightConstraint = 40;
        }
        return base;
    });
    const edges = EDGES.map((e, i) => ({
        id: 'e' + i, from: e.from, to: e.to, label: e.label,
        font: { size: 9, color: e.cross ? '#e76f51' : '#546e7a', strokeWidth: 3, strokeColor: '#ffffff', align: 'middle' },
        color: { color: e.cross ? '#e76f51' : '#90a4ae', highlight: '#e76f51' },
        dashes: !!e.cross,
        arrows: { to: { enabled: true, scaleFactor: 0.7 } },
        width: e.cross ? 2 : 1.4, smooth: { type: 'continuous' }
    }));
    const allowMouse = !isInIframe();
    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: { hover: true, selectConnectedEdges: false, dragNodes: false,
            zoomView: allowMouse, dragView: allowMouse, navigationButtons: true, keyboard: { enabled: false } }
    };
    network = new vis.Network(document.getElementById('network'),
        { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) }, options);
    network.once('afterDrawing', () => {
        network.fit({ animation: false, padding: 30 });
    });
    network.on('selectNode', (p) => {
        if (p.nodes.length) {
            const n = NODES.find(x => x.id === p.nodes[0]);
            if (n && n.desc) document.getElementById('db').innerHTML = n.desc;
        }
    });
    network.on('selectEdge', (p) => {
        if (p.nodes.length === 0 && p.edges.length > 0) {
            const idx = parseInt(p.edges[0].slice(1));
            const e = EDGES[idx];
            if (e && e.cross) document.getElementById('db').innerHTML = '<strong>defined-by (integration link)</strong><br><br>' + CROSS_DESC;
        }
    });
    network.on('deselectNode', () => {
        if (!network.getSelectedNodes().length && !network.getSelectedEdges().length) reset();
    });
    document.getElementById('reset-btn').addEventListener('click', () => {
        network.unselectAll(); reset();
        network.fit({ animation: { duration: 300 }, padding: 30 });
    });
}

function reset() {
    document.getElementById('db').innerHTML =
        'Click any node or the orange dashed link to see how registry and catalog work together.';
}

document.addEventListener('DOMContentLoaded', init);
