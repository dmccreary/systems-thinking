# Causal Loop Editor Nodes

## Turn Manipulation On

```js
var options = {
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
    }
};
```

## Sample Functions for Editing the Selected Node

```js
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
```

## Sample Function to Edit the Selected Edge

```js
// A function to edit the selected edge in the #selected-item-panel
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
```

