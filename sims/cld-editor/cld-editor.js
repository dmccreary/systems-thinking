/* main JavaScript for CLD Editor application */
/* note that this file requires vis-network library the vis CSS and a local css to work */
let network = null;
let cldData = null;
let nodes, edges;

async function loadExamplesList() {
    // TODO: Change this to list all the files in the examples directory
    // Only load files that end id the suffis "-cld.json"
    // For now, hardcode the list
    // You can add more examples by adding more JSON files to the examples directory
    // and adding them to this list
    const examples = [
        { id: 'bank-balance-cld', title: 'Bank Balance' },
        { id: 'ai-flywheel-v1-cld', title: 'AI Flywheel V1' },
        { id: 'thermostat-cld', title: 'Thermostat' },
        { id: 'population-cld', title: 'Population' },
        { id: 'tragedy-of-the-commons-cld', title: 'Tragedy of the Commons' },
        { id: 'misinformation-cld', title: 'Misinformation to Undecided Voters' },


        { id: 'ai-training-cld', title: 'AI Training' },
        { id: 'banning-books-cld', title: 'Book Banning' },
        { id: 'educational-funding-cld', title: 'Educational Funding' },
        { id: 'technology-platform-cld', title: 'Technology Platform Growth'}
    ];
    return examples;
}

async function loadCLDFromFile(filename) {
    try {
        const response = await fetch(`examples/${filename}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load ${filename}.json: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error loading CLD file: ${error.message}`);
    }
}

function initializeNetwork() {
    const container = document.getElementById('network');
    const options = {
        manipulation: {
            enabled: true,               // Enable the manipulation toolbar
            initiallyActive: true,       // Start with toolbar shown
            addNode: addNewNode,         // Custom function for adding new nodes
            addEdge: addNewEdge,         // Custom function for adding new edges
            editNode: editSelectedNode,  // Custom function for editing a selected node
            editEdge: editSelectedEdge,  // Custom function for editing a selected  edge
            deleteNode: deleteNodeFromToolbar,  // Custom function for deleting nodes
            deleteEdge: deleteEdgeFromToolbar,  // Custom function for deleting edges
            controlNodeStyle: {          // Style for control nodes during edge editing
                // All node styling options are valid here
            }
        },
        layout: {
            improvedLayout: false
        },
        physics: {
            enabled: false
        },
        interaction: {
            selectConnectedEdges: false
        },
        nodes: {
            shape: 'box',
            margin: 10,
            font: {
                size: 20,
                face: 'Arial'
            },
            borderWidth: 2,
            shadow: true,
            color: {
                background: 'white',
                border: 'dodgerblue',
                highlight: {
                    background: 'lightskyblue',
                    border: 'darkblue'
                }
            }
        },
        edges: {
            arrows: {
                to: { enabled: true, scaleFactor: 1.2 }
            },
            color: {
                color: 'gray',
                highlight: 'blue'
            },
            width: 2,
            smooth: {
                type: 'curvedCW',
                // changed from 0.3 to 0.4 to make curves more pronounced for two node loops
                roundness: 0.4
            },
            font: {
                size: 48,
                strokeWidth: 3,
                strokeColor: 'white'
            }
        }
    };

    network = new vis.Network(container, {}, options);

    network.on('click', function(params) {
        if (params.nodes.length > 0) {
            showNodeDetails(params.nodes[0]);
        } else if (params.edges.length > 0) {
            showEdgeDetails(params.edges[0]);
        } else {
            showDefaultDetails();
        }
    });
    
    // Update positions when nodes are dragged
    network.on('dragEnd', function(params) {
        if (params.nodes.length > 0) {
            const positions = network.getPositions(params.nodes);
            
            params.nodes.forEach(nodeId => {
                const position = positions[nodeId];
                
                // Check if it's a loop node
                if (nodeId.startsWith('loop_')) {
                    const loopId = nodeId.replace('loop_', '');
                    const loop = cldData.loops.find(l => l.id === loopId);
                    if (loop && position) {
                        loop.position.x = position.x;
                        loop.position.y = position.y;
                    }
                } else {
                    // Regular node
                    const node = cldData.nodes.find(n => n.id === nodeId);
                    if (node && position) {
                        node.position.x = position.x;
                        node.position.y = position.y;
                    }
                }
            });
        }
    });
}

function loadCLD(data) {
    try {
        cldData = data;
        
        document.getElementById('diagram-title').textContent = data.metadata.title;

        const visNodes = data.nodes.map(node => ({
            id: node.id,
            label: wrapText(node.label, 20),
            x: node.position.x,
            y: node.position.y,
            title: node.description || `${node.label} (${node.type || 'variable'})`,
            originalData: node
        }));

        const visEdges = data.edges.map(edge => {
            const edgeConfig = {
                id: edge.id,
                from: edge.source,
                to: edge.target,
                label: edge.polarity === 'positive' ? '+' : '-',
                color: edge.polarity === 'positive' ? '#28a745' : '#dc3545',
                title: edge.description || `${edge.polarity === 'positive' ? 'Positive (+)' : 'Negative (-)'} relationship from ${edge.source} to ${edge.target}`,
                originalData: edge
            };

            // Add custom curve direction if specified
            if (edge.curve) {
                edgeConfig.smooth = {
                    type: edge.curve.type || 'curvedCW',
                    roundness: edge.curve.roundness || 0.4
                };
            }

            return edgeConfig;
        });

        // Load Loops and annotation nodes
        // Convert loops with R or B in them to special nodes at the center of the loop
        // Note that the circle shape has a centering bug with the label
        if (data.loops) {
            data.loops.forEach(loop => {
                if (loop.position) {
                    visNodes.push({
                        id: 'loop_' + loop.id,
                        label: loop.type === 'reinforcing' ? 'R' : 'B',
                        x: loop.position.x,
                        y: loop.position.y,
                        shape: 'ellipse',
                        size: 30,
                        color: {
                            background: loop.type === 'reinforcing' ? '#dc3545' : '#28a745',
                            border: 'black'
                        },
                        font: {
                            color: 'white',
                            size: 16,
                            face: 'Arial'
                        },
                        margin: {
                            left: Math.round(30 * 0.1)
                        },
                        title: loop.description || `${loop.type === 'reinforcing' ? 'Reinforcing' : 'Balancing'} Loop: ${loop.label || loop.id}`,
                        originalData: loop,
                        isLoop: true
                    });
                }
            });
        }

        nodes = new vis.DataSet(visNodes);
        edges = new vis.DataSet(visEdges);

        network.setData({ nodes: nodes, edges: edges });
        
        showDefaultDetails();
        
    } catch (error) {
        showError('Error loading CLD data: ' + error.message);
    }
}

function wrapText(text, maxLength) {
    if (text.length <= maxLength) return text;
    
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    
    for (const word of words) {
        if ((currentLine + ' ' + word).length <= maxLength) {
            currentLine += (currentLine ? ' ' : '') + word;
        } else {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
        }
    }
    if (currentLine) lines.push(currentLine);
    
    return lines.join('\n');
}

function showNodeDetails(nodeId) {
    const nodeData = nodes.get(nodeId);
    if (!nodeData) return;

    if (nodeData.isLoop) {
        showLoopEditForm(nodeData);
    } else {
        showNodeEditForm(nodeData);
    }
}

function showEdgeDetails(edgeId) {
    const edgeData = edges.get(edgeId);
    if (!edgeData) return;

    showEdgeEditForm(edgeData);
}

function showDefaultDetails() {
    if (cldData) {
        showDiagramEditForm();
    } else {
        document.getElementById('details-content').innerHTML = '<p>Load a diagram to start editing</p>';
    }
}

function showError(message) {
    document.getElementById('details-content').innerHTML = `<div class="error">${message}</div>`;
}

async function loadSample(sampleName) {
    try {
        const data = await loadCLDFromFile(sampleName);
        loadCLD(data);
    } catch (error) {
        showError(error.message);
    }
}

async function initializeSampleButtons() {
    try {
        const examples = await loadExamplesList();
        const buttonsContainer = document.querySelector('.sample-buttons');
        buttonsContainer.innerHTML = '';
        
        examples.forEach(example => {
            const button = document.createElement('button');
            button.className = 'sample-btn';
            button.textContent = example.title;
            button.onclick = () => loadSample(example.id);
            buttonsContainer.appendChild(button);
        });
    } catch (error) {
        console.error('Error loading examples list:', error);
    }
}

document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                loadCLD(data);
            } catch (error) {
                showError('Invalid JSON file: ' + error.message);
            }
        };
        reader.readAsText(file);
    }
});

function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

async function loadFileFromURL() {
    const filename = getURLParameter('file');
    if (filename) {
        try {
            // Remove .json extension if it was included in the URL parameter
            const cleanFilename = filename.replace('.json', '');
            const data = await loadCLDFromFile(cleanFilename);
            loadCLD(data);
        } catch (error) {
            showError(`Failed to load file from URL parameter: ${error.message}`);
        }
    }
}

// A function to edit the selected node in the #selected-item-panel
function editSelectedNode() {
    var selectedNodes = network.getSelectedNodes();
    if (selectedNodes.length === 1) {
        var nodeId = selectedNodes[0];
        var nodeData = nodes.get(nodeId);
        editNodeProperties(nodeData, function(updatedData) {
            if (updatedData) {
                nodes.update(updatedData);
            }
        });
    } else {
        alert('Please select exactly one node to edit.');
    }
}


function editSelectedEdge() {
    var selectedEdges = network.getSelectedEdges();
    if (selectedEdges.length === 1) {
        var edgeId = selectedEdges[0];
        var edgeData = edges.get(edgeId);
        editEdgeProperties(edgeData, function(updatedData) {
            if (updatedData) {
                edges.update(updatedData);
            }
        });
    } else {
        alert('Please select exactly one edge to edit.');
    }
}

function editNodeProperties(nodeData, callback) {
    // Simple prompt-based editing for now
    const newLabel = prompt('Enter node label:', nodeData.label);
    const newDescription = prompt('Enter node description:', nodeData.originalData?.description || '');
    
    if (newLabel !== null) {
        const updatedNode = {
            ...nodeData,
            label: newLabel,
            title: newDescription || `${newLabel} (${nodeData.originalData?.type || 'variable'})`,
            originalData: {
                ...nodeData.originalData,
                label: newLabel,
                description: newDescription
            }
        };
        callback(updatedNode);
    }
}

function editEdgeProperties(edgeData, callback) {
    // Simple prompt-based editing for now
    const polarity = confirm('Is this a positive relationship? (Cancel for negative)') ? 'positive' : 'negative';
    const newDescription = prompt('Enter edge description:', edgeData.originalData?.description || '');
    
    const updatedEdge = {
        ...edgeData,
        label: polarity === 'positive' ? '+' : '-',
        color: polarity === 'positive' ? '#28a745' : '#dc3545',
        title: newDescription || `${polarity === 'positive' ? 'Positive (+)' : 'Negative (-)'} relationship`,
        originalData: {
            ...edgeData.originalData,
            polarity: polarity,
            description: newDescription
        }
    };
    callback(updatedEdge);
}

function showDiagramEditForm() {
    const metadata = cldData.metadata;
    const content = `
        <h4>Diagram Metadata</h4>
        <form id="metadata-form">
            <div class="form-group">
                <label for="meta-title">Title:</label>
                <input type="text" id="meta-title" value="${metadata.title || ''}" />
            </div>
            <div class="form-group">
                <label for="meta-id">ID:</label>
                <input type="text" id="meta-id" value="${metadata.id || ''}" />
            </div>
            <div class="form-group">
                <label for="meta-archetype">Archetype:</label>
                <select id="meta-archetype">
                    <option value="">Select archetype...</option>
                    <option value="limits-to-growth" ${metadata.archetype === 'limits-to-growth' ? 'selected' : ''}>Limits to Growth</option>
                    <option value="shifting-the-burden" ${metadata.archetype === 'shifting-the-burden' ? 'selected' : ''}>Shifting the Burden</option>
                    <option value="tragedy-of-commons" ${metadata.archetype === 'tragedy-of-commons' ? 'selected' : ''}>Tragedy of Commons</option>
                    <option value="success-to-successful" ${metadata.archetype === 'success-to-successful' ? 'selected' : ''}>Success to Successful</option>
                    <option value="fixes-that-fail" ${metadata.archetype === 'fixes-that-fail' ? 'selected' : ''}>Fixes that Fail</option>
                    <option value="growth-and-underinvestment" ${metadata.archetype === 'growth-and-underinvestment' ? 'selected' : ''}>Growth and Underinvestment</option>
                </select>
            </div>
            <div class="form-group">
                <label for="meta-description">Description:</label>
                <textarea id="meta-description" rows="4">${metadata.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="meta-author">Author:</label>
                <input type="text" id="meta-author" value="${metadata.author || ''}" />
            </div>
            <div class="form-group">
                <label for="meta-version">Version:</label>
                <input type="text" id="meta-version" value="${metadata.version || '1.0.0'}" />
            </div>
            <div class="button-container">
                <button type="button" class="save-btn" onclick="saveMetadataForm()">Save Changes</button>
                <button type="button" onclick="addNewLoop()">Add New Loop</button>
            </div>
        </form>
        <div class="section">
            <h4>Existing Loops</h4>
            <div id="loops-list">
                ${cldData.loops ? cldData.loops.map(loop => `
                    <div class="loop-item">
                        <span>${loop.label || loop.id} (${loop.type})</span>
                        <button onclick="editLoop('${loop.id}')">Edit</button>
                    </div>
                `).join('') : '<p>No loops defined</p>'}
            </div>
        </div>
    `;
    document.getElementById('details-content').innerHTML = content;
}

function showNodeEditForm(nodeData) {
    const node = nodeData.originalData || {};
    const examplesText = node.examples ? node.examples.join(', ') : '';
    
    const content = `
        <h4>Edit Node: ${nodeData.label}</h4>
        <form id="node-form">
            <div class="form-group">
                <label for="node-id">ID:</label>
                <input type="text" id="node-id" value="${node.id || ''}" />
            </div>
            <div class="form-group">
                <label for="node-label">Label:</label>
                <input type="text" id="node-label" value="${node.label || ''}" />
            </div>
            <div class="form-group">
                <label for="node-type">Type:</label>
                <select id="node-type">
                    <option value="variable" ${node.type === 'variable' ? 'selected' : ''}>Variable</option>
                    <option value="stock" ${node.type === 'stock' ? 'selected' : ''}>Stock</option>
                    <option value="flow" ${node.type === 'flow' ? 'selected' : ''}>Flow</option>
                    <option value="condition" ${node.type === 'condition' ? 'selected' : ''}>Condition</option>
                    <option value="constant" ${node.type === 'constant' ? 'selected' : ''}>Constant</option>
                </select>
            </div>
            <div class="form-group">
                <label for="node-description">Description:</label>
                <textarea id="node-description" rows="3">${node.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="node-examples">Examples (comma-separated):</label>
                <textarea id="node-examples" rows="2">${examplesText}</textarea>
            </div>
            <div class="form-group">
                <label for="node-measurement">Measurement:</label>
                <input type="text" id="node-measurement" value="${node.measurement || ''}" />
            </div>
            <div class="form-group">
                <label for="node-color">Color:</label>
                <input type="color" id="node-color" value="${nodeData.color?.background || '#ffffff'}" />
            </div>
            <div class="button-container">
                <button type="button" class="save-btn" onclick="saveNodeForm('${nodeData.id}')">Save Changes</button>
                <button type="button" class="cancel-btn" onclick="showDefaultDetails()">Cancel</button>
                <button type="button" onclick="deleteNode('${nodeData.id}')">Delete Node</button>
            </div>
        </form>
    `;
    document.getElementById('details-content').innerHTML = content;
}

function showEdgeEditForm(edgeData) {
    const edge = edgeData.originalData || {};
    
    const content = `
        <h4>Edit Edge</h4>
        <form id="edge-form">
            <div class="form-group">
                <label for="edge-id">ID:</label>
                <input type="text" id="edge-id" value="${edge.id || ''}" />
            </div>
            <div class="form-group">
                <label for="edge-source">From Node:</label>
                <input type="text" id="edge-source" value="${edge.source || ''}" readonly />
            </div>
            <div class="form-group">
                <label for="edge-target">To Node:</label>
                <input type="text" id="edge-target" value="${edge.target || ''}" readonly />
            </div>
            <div class="form-group">
                <label for="edge-polarity">Polarity:</label>
                <select id="edge-polarity">
                    <option value="positive" ${edge.polarity === 'positive' ? 'selected' : ''}>Positive (+)</option>
                    <option value="negative" ${edge.polarity === 'negative' ? 'selected' : ''}>Negative (-)</option>
                </select>
            </div>
            <div class="form-group">
                <label for="edge-description">Description:</label>
                <textarea id="edge-description" rows="3">${edge.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="edge-strength">Strength:</label>
                <select id="edge-strength">
                    <option value="" ${!edge.strength ? 'selected' : ''}>Not specified</option>
                    <option value="weak" ${edge.strength === 'weak' ? 'selected' : ''}>Weak</option>
                    <option value="moderate" ${edge.strength === 'moderate' ? 'selected' : ''}>Moderate</option>
                    <option value="strong" ${edge.strength === 'strong' ? 'selected' : ''}>Strong</option>
                </select>
            </div>
            <div class="form-group">
                <label for="edge-delay-present">Has Delay:</label>
                <input type="checkbox" id="edge-delay-present" ${edge.delay?.present ? 'checked' : ''} onchange="toggleDelayFields()" />
            </div>
            <div id="delay-fields" style="display: ${edge.delay?.present ? 'block' : 'none'}">
                <div class="form-group">
                    <label for="edge-delay-duration">Delay Duration:</label>
                    <input type="text" id="edge-delay-duration" value="${edge.delay?.duration || ''}" />
                </div>
                <div class="form-group">
                    <label for="edge-delay-description">Delay Description:</label>
                    <textarea id="edge-delay-description" rows="2">${edge.delay?.description || ''}</textarea>
                </div>
            </div>
            <div class="form-group">
                <label for="edge-curve-type">Curve Type:</label>
                <select id="edge-curve-type">
                    <option value="" ${!edge.curve ? 'selected' : ''}>Default</option>
                    <option value="curvedCW" ${edge.curve?.type === 'curvedCW' ? 'selected' : ''}>Curved Clockwise</option>
                    <option value="curvedCCW" ${edge.curve?.type === 'curvedCCW' ? 'selected' : ''}>Curved Counter-Clockwise</option>
                    <option value="horizontal" ${edge.curve?.type === 'horizontal' ? 'selected' : ''}>Horizontal</option>
                </select>
            </div>
            <div class="form-group">
                <label for="edge-roundness">Curve Roundness:</label>
                <input type="range" id="edge-roundness" min="0" max="1" step="0.1" value="${edge.curve?.roundness || 0.4}" />
                <span id="roundness-value">${edge.curve?.roundness || 0.4}</span>
            </div>
            <div class="button-container">
                <button type="button" class="save-btn" onclick="saveEdgeForm('${edgeData.id}')">Save Changes</button>
                <button type="button" class="cancel-btn" onclick="showDefaultDetails()">Cancel</button>
                <button type="button" onclick="deleteEdge('${edgeData.id}')">Delete Edge</button>
            </div>
        </form>
    `;
    document.getElementById('details-content').innerHTML = content;
    
    // Add event listener for roundness slider
    document.getElementById('edge-roundness').addEventListener('input', function(e) {
        document.getElementById('roundness-value').textContent = e.target.value;
    });
}

function showLoopEditForm(nodeData) {
    const loop = nodeData.originalData || {};
    const pathText = loop.path ? loop.path.join(', ') : '';
    
    const content = `
        <h4>Edit Loop: ${loop.label || loop.id}</h4>
        <form id="loop-form">
            <div class="form-group">
                <label for="loop-id">ID:</label>
                <input type="text" id="loop-id" value="${loop.id || ''}" />
            </div>
            <div class="form-group">
                <label for="loop-label">Label:</label>
                <input type="text" id="loop-label" value="${loop.label || ''}" />
            </div>
            <div class="form-group">
                <label for="loop-type">Type:</label>
                <select id="loop-type">
                    <option value="reinforcing" ${loop.type === 'reinforcing' ? 'selected' : ''}>Reinforcing (R)</option>
                    <option value="balancing" ${loop.type === 'balancing' ? 'selected' : ''}>Balancing (B)</option>
                </select>
            </div>
            <div class="form-group">
                <label for="loop-description">Description:</label>
                <textarea id="loop-description" rows="3">${loop.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="loop-behavior-pattern">Behavior Pattern:</label>
                <textarea id="loop-behavior-pattern" rows="2">${loop.behavior_pattern || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="loop-path">Path (comma-separated node IDs):</label>
                <textarea id="loop-path" rows="2">${pathText}</textarea>
            </div>
            <div class="form-group">
                <label for="loop-primary">Is Primary Loop:</label>
                <input type="checkbox" id="loop-primary" ${loop.is_primary ? 'checked' : ''} />
            </div>
            <div class="button-container">
                <button type="button" class="save-btn" onclick="saveLoopForm('${nodeData.id}')">Save Changes</button>
                <button type="button" class="cancel-btn" onclick="showDefaultDetails()">Cancel</button>
                <button type="button" onclick="deleteLoop('${nodeData.id}')">Delete Loop</button>
            </div>
        </form>
    `;
    document.getElementById('details-content').innerHTML = content;
}

function createEmptyDiagram() {
    const emptyData = {
        metadata: {
            title: "New Causal Loop Diagram",
            description: "Click + Add Node to start building your diagram",
            id: "new-diagram",
            version: "1.0.0",
            author: ""
        },
        nodes: [],
        edges: [],
        loops: []
    };
    loadCLD(emptyData);
}

function saveCurrentDiagram() {
    if (!cldData) {
        alert('No diagram to save');
        return;
    }
    
    // Update positions from current network state
    const positions = network.getPositions();
    
    // Update regular node positions
    cldData.nodes.forEach(node => {
        if (positions[node.id]) {
            node.position.x = positions[node.id].x;
            node.position.y = positions[node.id].y;
        }
    });
    
    // Update loop node positions
    if (cldData.loops) {
        cldData.loops.forEach(loop => {
            const loopNodeId = 'loop_' + loop.id;
            if (positions[loopNodeId]) {
                loop.position.x = positions[loopNodeId].x;
                loop.position.y = positions[loopNodeId].y;
            }
        });
    }
    
    // Update node and edge data from the current network state
    const currentNodes = nodes.getIds();
    const currentEdges = edges.getIds();
    
    // Update nodes with any changes made through editing
    currentNodes.forEach(nodeId => {
        const nodeData = nodes.get(nodeId);
        const originalNode = cldData.nodes.find(n => n.id === nodeId);
        if (originalNode && nodeData.originalData) {
            // Preserve all original data including examples
            Object.assign(originalNode, nodeData.originalData);
        }
    });
    
    // Update edges with any changes made through editing
    currentEdges.forEach(edgeId => {
        const edgeData = edges.get(edgeId);
        const originalEdge = cldData.edges.find(e => e.id === edgeId);
        if (originalEdge && edgeData.originalData) {
            // Preserve all original data including examples
            Object.assign(originalEdge, edgeData.originalData);
        }
    });
    
    const dataStr = JSON.stringify(cldData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${cldData.metadata.id || 'diagram'}-cld.json`;
    link.click();
    
    URL.revokeObjectURL(url);
}

window.addEventListener('load', function() {
    initializeNetwork();
    
    // Add event listeners for toolbar buttons
    document.getElementById('new-btn').addEventListener('click', createEmptyDiagram);
    document.getElementById('save-btn').addEventListener('click', saveCurrentDiagram);
    
    // Check for file parameter in URL and load it, otherwise create empty diagram
    const filename = getURLParameter('file');
    if (filename) {
        loadFileFromURL();
    } else {
        // Load a sample diagram to demonstrate the editor
        loadSample('bank-balance-cld');
    }
});

// Form save functions
function saveMetadataForm() {
    cldData.metadata.title = document.getElementById("meta-title").value;
    cldData.metadata.id = document.getElementById("meta-id").value;
    cldData.metadata.archetype = document.getElementById("meta-archetype").value;
    cldData.metadata.description = document.getElementById("meta-description").value;
    cldData.metadata.author = document.getElementById("meta-author").value;
    cldData.metadata.version = document.getElementById("meta-version").value;
    cldData.metadata.updated_date = new Date().toISOString();
    
    document.getElementById("diagram-title").textContent = cldData.metadata.title;
    showDefaultDetails();
}

function saveNodeForm(nodeId) {
    const nodeData = nodes.get(nodeId);
    const formData = {
        id: document.getElementById("node-id").value,
        label: document.getElementById("node-label").value,
        type: document.getElementById("node-type").value,
        description: document.getElementById("node-description").value,
        examples: document.getElementById("node-examples").value.split(",").map(s => s.trim()).filter(s => s),
        measurement: document.getElementById("node-measurement").value
    };
    
    const color = document.getElementById("node-color").value;
    
    Object.assign(nodeData.originalData, formData);
    
    // Get current position from network to preserve it
    const currentPositions = network.getPositions([nodeId]);
    const currentPosition = currentPositions[nodeId];
    
    const updatedNode = {
        ...nodeData,
        label: formData.label,
        title: formData.description || `${formData.label} (${formData.type})`,
        color: { background: color, border: nodeData.color?.border || "dodgerblue" },
        // Preserve current position
        x: currentPosition ? currentPosition.x : nodeData.x,
        y: currentPosition ? currentPosition.y : nodeData.y
    };
    
    nodes.update(updatedNode);
    
    const originalNode = cldData.nodes.find(n => n.id === nodeId);
    if (originalNode) {
        Object.assign(originalNode, formData);
    } else {
        // This is a new node created through manipulation toolbar
        // Get current position and add to main data structure
        const currentPositions = network.getPositions([nodeId]);
        const currentPosition = currentPositions[nodeId];
        
        const newNodeData = {
            ...formData,
            position: { 
                x: currentPosition ? currentPosition.x : 0, 
                y: currentPosition ? currentPosition.y : 0 
            }
        };
        
        cldData.nodes = cldData.nodes || [];
        cldData.nodes.push(newNodeData);
    }
    
    showDefaultDetails();
}

function saveEdgeForm(edgeId) {
    const edgeData = edges.get(edgeId);
    const formData = {
        id: document.getElementById("edge-id").value,
        polarity: document.getElementById("edge-polarity").value,
        description: document.getElementById("edge-description").value,
        strength: document.getElementById("edge-strength").value || undefined
    };
    
    const hasDelay = document.getElementById("edge-delay-present").checked;
    if (hasDelay) {
        formData.delay = {
            present: true,
            duration: document.getElementById("edge-delay-duration").value,
            description: document.getElementById("edge-delay-description").value
        };
    }
    
    const curveType = document.getElementById("edge-curve-type").value;
    if (curveType) {
        formData.curve = {
            type: curveType,
            roundness: parseFloat(document.getElementById("edge-roundness").value)
        };
    }
    
    Object.assign(edgeData.originalData, formData);
    
    const updatedEdge = {
        ...edgeData,
        label: formData.polarity === "positive" ? "+" : "-",
        color: formData.polarity === "positive" ? "#28a745" : "#dc3545",
        title: formData.description || `${formData.polarity === "positive" ? "Positive (+)" : "Negative (-)"} relationship`
    };
    
    if (formData.curve) {
        updatedEdge.smooth = {
            type: formData.curve.type,
            roundness: formData.curve.roundness
        };
    }
    
    edges.update(updatedEdge);
    
    const originalEdge = cldData.edges.find(e => e.id === edgeId);
    if (originalEdge) {
        Object.assign(originalEdge, formData);
    } else {
        // This is a new edge created through manipulation toolbar
        cldData.edges = cldData.edges || [];
        cldData.edges.push(formData);
    }
    
    showDefaultDetails();
}

function toggleDelayFields() {
    const delayFields = document.getElementById("delay-fields");
    const checkbox = document.getElementById("edge-delay-present");
    delayFields.style.display = checkbox.checked ? "block" : "none";
}

function deleteNode(nodeId) {
    if (confirm("Are you sure you want to delete this node?")) {
        nodes.remove(nodeId);
        cldData.nodes = cldData.nodes.filter(n => n.id !== nodeId);
        showDefaultDetails();
    }
}

function deleteEdge(edgeId) {
    if (confirm("Are you sure you want to delete this edge?")) {
        edges.remove(edgeId);
        cldData.edges = cldData.edges.filter(e => e.id !== edgeId);
        showDefaultDetails();
    }
}

function addNewLoop() {
    const newLoopId = "loop_" + Date.now();
    const newLoop = {
        id: newLoopId.replace("loop_", ""),
        type: "reinforcing",
        label: "New Loop",
        description: "",
        behavior_pattern: "",
        path: [],
        position: { x: 0, y: 0 },
        is_primary: false
    };
    
    cldData.loops = cldData.loops || [];
    cldData.loops.push(newLoop);
    
    const newVisNode = {
        id: newLoopId,
        label: "R",
        x: 0,
        y: 0,
        shape: "ellipse",
        size: 30,
        color: {
            background: "#dc3545",
            border: "black"
        },
        font: {
            color: "white",
            size: 16,
            face: "Arial"
        },
        title: "New Reinforcing Loop",
        originalData: newLoop,
        isLoop: true
    };
    
    nodes.add(newVisNode);
    showLoopEditForm(newVisNode);
}

function editLoop(loopId) {
    const nodeId = "loop_" + loopId;
    const nodeData = nodes.get(nodeId);
    if (nodeData) {
        showLoopEditForm(nodeData);
    }
}

function saveLoopForm(nodeId) {
    const nodeData = nodes.get(nodeId);
    const formData = {
        id: document.getElementById("loop-id").value,
        label: document.getElementById("loop-label").value,
        type: document.getElementById("loop-type").value,
        description: document.getElementById("loop-description").value,
        behavior_pattern: document.getElementById("loop-behavior-pattern").value,
        path: document.getElementById("loop-path").value.split(",").map(s => s.trim()).filter(s => s),
        is_primary: document.getElementById("loop-primary").checked
    };
    
    Object.assign(nodeData.originalData, formData);
    
    // Get current position from network to preserve it
    const currentPositions = network.getPositions([nodeId]);
    const currentPosition = currentPositions[nodeId];
    
    const updatedNode = {
        ...nodeData,
        label: formData.type === "reinforcing" ? "R" : "B",
        title: formData.description || `${formData.type === "reinforcing" ? "Reinforcing" : "Balancing"} Loop: ${formData.label}`,
        color: {
            background: formData.type === "reinforcing" ? "#dc3545" : "#28a745",
            border: "black"
        },
        // Preserve current position
        x: currentPosition ? currentPosition.x : nodeData.x,
        y: currentPosition ? currentPosition.y : nodeData.y
    };
    
    nodes.update(updatedNode);
    
    const originalLoop = cldData.loops.find(l => l.id === formData.id);
    if (originalLoop) {
        Object.assign(originalLoop, formData);
    }
    
    showDefaultDetails();
}

function deleteLoop(nodeId) {
    if (confirm("Are you sure you want to delete this loop?")) {
        nodes.remove(nodeId);
        const loopId = nodeId.replace("loop_", "");
        cldData.loops = cldData.loops.filter(l => l.id !== loopId);
        showDefaultDetails();
    }
}

// Add dragEnd event handler for real-time position updates
function addDragEndHandler() {
    network.on("dragEnd", function(params) {
        if (params.nodes.length > 0) {
            const positions = network.getPositions(params.nodes);
            
            params.nodes.forEach(nodeId => {
                const position = positions[nodeId];
                
                // Check if it is a loop node
                if (nodeId.startsWith("loop_")) {
                    const loopId = nodeId.replace("loop_", "");
                    const loop = cldData.loops.find(l => l.id === loopId);
                    if (loop && position) {
                        loop.position.x = position.x;
                        loop.position.y = position.y;
                    }
                } else {
                    // Regular node
                    const node = cldData.nodes.find(n => n.id === nodeId);
                    if (node && position) {
                        node.position.x = position.x;
                        node.position.y = position.y;
                    }
                }
            });
        }
    });
}

// Manipulation toolbar functions
function addNewNode(data, callback) {
    // Create a unique ID for the new node
    const newNodeId = "node_" + Date.now();
    
    // Create the node data structure
    const newNode = {
        id: newNodeId,
        label: "New Node",
        type: "variable",
        description: "",
        examples: [],
        measurement: "",
        position: { x: data.x || 0, y: data.y || 0 }
    };
    
    // Add to main data structure
    cldData.nodes = cldData.nodes || [];
    cldData.nodes.push(newNode);
    
    // Create vis.js node
    const visNode = {
        id: newNodeId,
        label: "New Node",
        x: data.x || 0,
        y: data.y || 0,
        title: "New variable node",
        originalData: newNode
    };
    
    callback(visNode);
}

function addNewEdge(data, callback) {
    // Create a unique ID for the new edge
    const newEdgeId = "edge_" + Date.now();
    
    // Create the edge data structure
    const newEdge = {
        id: newEdgeId,
        source: data.from,
        target: data.to,
        polarity: "positive",
        description: "",
        strength: "moderate"
    };
    
    // Add to main data structure
    cldData.edges = cldData.edges || [];
    cldData.edges.push(newEdge);
    
    // Create vis.js edge
    const visEdge = {
        id: newEdgeId,
        from: data.from,
        to: data.to,
        label: "+",
        color: "#28a745",
        title: "New positive relationship",
        originalData: newEdge
    };
    
    callback(visEdge);
}

function deleteNodeFromToolbar(data, callback) {
    data.nodes.forEach(nodeId => {
        // Check if it is a loop node
        if (nodeId.startsWith("loop_")) {
            const loopId = nodeId.replace("loop_", "");
            cldData.loops = cldData.loops.filter(l => l.id !== loopId);
        } else {
            // Regular node
            cldData.nodes = cldData.nodes.filter(n => n.id !== nodeId);
        }
    });
    callback(data);
}

function deleteEdgeFromToolbar(data, callback) {
    data.edges.forEach(edgeId => {
        cldData.edges = cldData.edges.filter(e => e.id !== edgeId);
    });
    callback(data);
}
