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
            enabled: true,                // Enable the manipulation toolbar
            initiallyActive: true,       // Start with toolbar shown
            addNode: true,               // Enable "Add Node" functionality
            addEdge: true,               // Enable "Add Edge" functionality
            editNode: editSelectedNode,  // Custom function for editing a selected node
            editEdge: editSelectedEdge,  // Custom function for editing a selected  edge
            deleteNode: true,            // Enable "Delete Node" functionality
            deleteEdge: true,            // Enable "Delete Edge" functionality
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

    let content = '';
    
    if (nodeData.isLoop) {
        const loop = nodeData.originalData;
        content = `
            <div class="loop-info ${loop.type}">
                <h4>${loop.label || loop.id}</h4>
                <p><span class="label">Type:</span> ${loop.type === 'reinforcing' ? 'Reinforcing (R)' : 'Balancing (B)'}</p>
                <p><span class="label">Description:</span> ${loop.description || 'No description available'}</p>
                ${loop.behavior_pattern ? `<p><span class="label">Behavior Pattern:</span> ${loop.behavior_pattern}</p>` : ''}
                ${loop.path ? `<p><span class="label">Path:</span> ${loop.path.join(' → ')}</p>` : ''}
            </div>
        `;
    } else {
        const node = nodeData.originalData;
        content = `
            <h4>${node.label}</h4>
            <p><span class="label">Type:</span> ${node.type || 'variable'}</p>
            <p><span class="label">Description:</span> ${node.description || 'No description available'}</p>
            ${node.examples ? `<p><span class="label">Examples:</span> ${node.examples.join(', ')}</p>` : ''}
            ${node.measurement ? `<p><span class="label">Measurement:</span> ${node.measurement}</p>` : ''}
        `;
    }

    document.getElementById('details-content').innerHTML = content;
}

function showEdgeDetails(edgeId) {
    const edgeData = edges.get(edgeId);
    if (!edgeData) return;

    const edge = edgeData.originalData;
    const sourceNode = cldData.nodes.find(n => n.id === edge.source);
    const targetNode = cldData.nodes.find(n => n.id === edge.target);

    const content = `
        <h4>Causal Relationship</h4>
        <p><span class="label">From:</span> ${sourceNode ? sourceNode.label : edge.source}</p>
        <p><span class="label">To:</span> ${targetNode ? targetNode.label : edge.target}</p>
        <p><span class="label">Polarity:</span> ${edge.polarity === 'positive' ? 'Positive (+)' : 'Negative (-)'}</p>
        <p><span class="label">Description:</span> ${edge.description || 'No description available'}</p>
        ${edge.strength ? `<p><span class="label">Strength:</span> ${edge.strength}</p>` : ''}
        ${edge.delay && edge.delay.present ? `<p><span class="label">Delay:</span> ${edge.delay.duration || 'Present'}</p>` : ''}
    `;

    document.getElementById('details-content').innerHTML = content;
}

function showDefaultDetails() {
    let content = '<p>Click on a node, edge, or loop symbol to see details here.</p>';
    
    if (cldData) {
        content += `
            <h4>System Overview</h4>
            <p><span class="label">Archetype:</span> ${cldData.metadata.archetype || 'Not specified'}</p>
            <p><span class="label">Description:</span> ${cldData.metadata.description || 'No description available'}</p>
        `;
        
        if (cldData.loops && cldData.loops.length > 0) {
            content += '<h4>Feedback Loops</h4>';
            cldData.loops.forEach(loop => {
                content += `
                    <div class="loop-info ${loop.type}">
                        <strong>${loop.label || loop.id}</strong> (${loop.type === 'reinforcing' ? 'R' : 'B'})
                        <br>${loop.description || 'No description'}
                    </div>
                `;
            });
        }
    }

    document.getElementById('details-content').innerHTML = content;
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

function createEmptyDiagram() {
    const emptyData = {
        metadata: {
            title: "New Causal Loop Diagram",
            description: "Click + Add Node to start building your diagram"
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
    cldData.nodes.forEach(node => {
        if (positions[node.id]) {
            node.position.x = positions[node.id].x;
            node.position.y = positions[node.id].y;
        }
    });
    
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