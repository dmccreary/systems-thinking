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
        { id: 'ai-flywheel-v1-cld', title: 'AI Flywheel V1' },
        { id: 'ai-training-cld', title: 'AI Training Example' },
        { id: 'bank-balance-cld', title: 'Bank Balance Example' },
        { id: 'banning-books-cld', title: 'Book Banning Example' },
        { id: 'educational-funding-cld', title: 'Educational Funding' },
        { id: 'technology-platform-cld', title: 'Technology Platform Growth'},
        { id: 'thermostat-cld', title: 'Thermostat Example' }
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
                size: 14,
                face: 'Arial'
            },
            borderWidth: 2,
            shadow: true,
            color: {
                background: '#E8F4FD',
                border: '#4A90E2',
                highlight: {
                    background: '#D1E7DD',
                    border: '#198754'
                }
            }
        },
        edges: {
            arrows: {
                to: { enabled: true, scaleFactor: 1.2 }
            },
            color: {
                color: '#848484',
                highlight: '#198754'
            },
            width: 2,
            // Enhanced smooth curves for better circular appearance
            smooth: {
                enabled: true,
                type: 'curvedCW',
                roundness: 0.5  // Increased from 0.2 to 0.5 for more pronounced curves
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
            title: node.description || '',
            originalData: node
        }));

        // Enhanced edge creation with better curve handling
        const visEdges = data.edges.map((edge, index) => {
            // Check if this edge is part of a two-node loop (common in simple CLDs)
            const reverseEdge = data.edges.find(e => 
                e.source === edge.target && e.target === edge.source
            );
            
            let smoothSettings = {
                enabled: true,
                type: 'curvedCW',
                roundness: 0.5
            };
            
            // If there's a reverse edge, create distinct curves by manipulating the edge differently
            if (reverseEdge) {
                const edges = data.edges;
                const currentIndex = edges.indexOf(edge);
                const reverseIndex = edges.indexOf(reverseEdge);
                const isFirstEdge = currentIndex < reverseIndex;
                
                // For the first edge, use a large positive curve
                // For the second edge, use a large negative curve to force opposite direction
                if (isFirstEdge) {
                    smoothSettings = {
                        enabled: true,
                        type: 'cubicBezier',
                        roundness: 0.8
                    };
                } else {
                    smoothSettings = {
                        enabled: true,
                        type: 'cubicBezier', 
                        roundness: -0.8  // Large negative value to force downward curve
                    };
                }
            }
            
            const baseEdge = {
                id: edge.id,
                from: edge.source,
                to: edge.target,
                label: edge.polarity === 'positive' ? '+' : '-',
                color: edge.polarity === 'positive' ? '#28a745' : '#dc3545',
                title: edge.description || `${edge.polarity === 'positive' ? 'Positive' : 'Negative'} relationship`,
                originalData: edge,
                smooth: smoothSettings
            };
            
            // If vis.js still doesn't respect negative roundness, add a manual offset
            if (reverseEdge && data.edges.indexOf(edge) >= data.edges.indexOf(reverseEdge)) {
                // Force this edge to use a different visual approach
                baseEdge.chosen = {
                    edge: function(values, id, selected, hovering) {
                        values.shadowSize = 0;
                        values.shadowX = 0;
                        values.shadowY = 15; // Offset to simulate lower curve
                    }
                };
            }
            
            return baseEdge;
        });

        if (data.loops) {
            data.loops.forEach(loop => {
                if (loop.position) {
                    visNodes.push({
                        id: 'loop_' + loop.id,
                        label: loop.type === 'reinforcing' ? 'R' : 'B',
                        x: loop.position.x,
                        y: loop.position.y,
                        shape: 'circle',
                        size: 30,
                        color: {
                            background: loop.type === 'reinforcing' ? '#dc3545' : '#28a745',
                            border: '#000000'
                        },
                        font: {
                            color: 'white',
                            size: 16,
                            face: 'Arial bold'
                        },
                        title: loop.description || '',
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

window.addEventListener('load', function() {
    initializeNetwork();
    initializeSampleButtons();
    showDefaultDetails();
});