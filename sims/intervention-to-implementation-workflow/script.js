/* Shared click-to-explain script for this book's Mermaid MicroSims.
 *
 * Each diagram's main.html defines a `nodeInfo` object (in nodeinfo.js) that
 * maps a Mermaid node id to { tag, title, description, example }. Mermaid
 * `click NodeId showInfo "id"` directives call showInfo() below, which fills
 * the info panel on the right.
 */

const infoDisplay = document.getElementById('info-display');
const defaultContent =
    '<p class="info-placeholder">Click any box in the diagram to see what it means.</p>';

/**
 * Populate the info panel for one diagram node.
 * Exposed on window so Mermaid's `click ... call showInfo()` directives find it.
 */
function showInfo(nodeId) {
    const info = (typeof nodeInfo !== 'undefined') ? nodeInfo[nodeId] : null;
    if (!info) { return; }
    let html = '';
    if (info.tag) {
        const bg = info.tagColor ? ' style="background-color:' + info.tagColor + '"' : '';
        html += '<span class="info-tag"' + bg + '>' + info.tag + '</span>';
    }
    html += '<div class="info-title">' + info.title + '</div>';
    html += '<div class="info-content"><p>' + info.description + '</p>';
    if (info.example) {
        html += '<div class="example">' + info.example + '</div>';
    }
    html += '</div>';
    infoDisplay.innerHTML = html;
}
window.showInfo = showInfo;

/** Reset the panel to its starting prompt. */
function clearInfo() {
    infoDisplay.innerHTML = defaultContent;
}
window.clearInfo = clearInfo;

/**
 * Mermaid renders asynchronously, so poll until the SVG nodes exist before
 * wiring hover styling. The click behavior itself comes from Mermaid's own
 * `click` directives, which survive re-renders.
 */
function waitForMermaid() {
    const nodes = document.querySelectorAll('.mermaid .node');
    if (nodes.length > 0) {
        nodes.forEach(function (node) { node.style.cursor = 'pointer'; });
        return;
    }
    setTimeout(waitForMermaid, 100);
}

setTimeout(waitForMermaid, 150);
