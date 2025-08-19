# Simple Causal Loop Viewer Using Vis.js

[Run the Simple CLD Viewer](cld.html)

This program reads a graph from `graph.json` in the current directory

# Causal Loop Diagram
[Causal Loop Diagram](./cld.html)

## Prompt

!!! prompt
    Create a causal loop diagram for the AI flywheel in a JSON format 
    that can be read by a vis.js program. Here is the Reinforcing loop:

    Data -> Model -> Prediction -> Feedback -> Data

###### ChatGPT said:

ChatGPT

Here's a simple JSON format for a **causal loop diagram** that 
represents the **AI Flywheel** with the loop: 

**Data -> Model -> Feedback -> Data**. 

This can be used with **vis.js** to create a network diagram:


```json
{
  "nodes": [
    { "id": 1, "label": "Data" },
    { "id": 2, "label": "Model" },
    { "id": 3, "label": "Prediction" },
    { "id": 4, "label": "Feedback" }
  ],
  "edges": [
    { "from": 1, "to": 2, "label": "Trains", "arrows": "to" },
    { "from": 2, "to": 3, "label": "Generates", "arrows": "to" },
    { "from": 3, "to": 4, "label": "Produces", "arrows": "to" },
    { "from": 4, "to": 1, "label": "Improves", "arrows": "to" }
  ]
}
```

### Explanation:

-   **Nodes**:
    -   `Data` (id: 1)
    -   `Model` (id: 2)
    -   `Prediction` (id: 3)
    -   `Feedback` (id: 4)
-   **Edges** (relationships between the nodes):
    -   Data **trains** the Model.
    -   The Model **generates** Prediction.
    -   Prediction **produces** Feedback.
    -   Feedback **improves** Data, closing the loop.

This expanded loop incorporates **Prediction** into the cycle, reflecting how the model generates predictions that are then validated or refined by feedback, which ultimately improves the underlying data for future cycles.

##  Prompt

!!! prompt
    Create a vis.js script called cdl.js to read this file.
    The script to reads the JSON from file "graph.json".
    The causal loop diagram will be generated, and the number of nodes and edges will be shown below it.

    Assume the following HTML

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Causal Loop Diagram</title>
        <script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script> 
    <style>
        body { font-family: Arial, Helvetica, sans-serif; }
        #network { width: 90%; height: 600px; border: 1px solid lightgray; }
    </style>
</head> 
<body>
    <h4>Causal Loop Diagram in vis.js</h4> 
    <a href=".">Back to Lesson Plan</a>  
    <div id="load-stats"></div> 
    <script src="./cld.js"></script>
    </body>
</html>
```

### JavaScript

```js
// Wait for the DOM to fully load
window.onload = function() {
  // Fetch the graph data from graph.json
  fetch('graph.json')
    .then(response => response.json())
    .then(causalLoopData => {
      // Create an instance of the vis Network
      const container = document.getElementById('network');

      // Parse the nodes and edges from the fetched JSON
      const data = {
        nodes: new vis.DataSet(causalLoopData.nodes),
        edges: new vis.DataSet(causalLoopData.edges)
      };

      // Define the options for visualization
      const options = {
        edges: {
          arrows: {
            to: {enabled: true, scaleFactor: 1.2}
          },
          font: {
            align: 'middle'
          }
        },
        nodes: {
          shape: 'box',
          font: {
            size: 18
          }
        },
        physics: {
          enabled: true
        }
      };

      // Initialize the network
      const network = new vis.Network(container, data, options);

      // Show the number of nodes and edges
      const statsDiv = document.getElementById('load-stats');
      statsDiv.innerHTML = `<p>Number of nodes: ${causalLoopData.nodes.length}</p>
                            <p>Number of edges: ${causalLoopData.edges.length}</p>`;
    })
    .catch(error => {
      console.error('Error loading the graph data:', error);
      document.getElementById('load-stats').innerHTML = 'Error loading graph data.';
    });
};
```

### Explanation of Changes:

1.  **`fetch('graph.json')`**: This asynchronously fetches the JSON file `graph.json` located in the same directory as the HTML file.

2.  **Promise Handling**:

    -   When the file is successfully fetched, it is converted into a JSON object using `.json()`.
    -   The `then()` method handles the creation of the vis.js network based on the loaded data.
    -   If there's an error (e.g., the file doesn't exist or cannot be read), it's caught by the `.catch()` method, and an error message is displayed in the `load-stats` div.
3.  **Nodes and Edges**: After the JSON is loaded, the script passes the nodes and edges data to `vis.DataSet()` to render the network.

### JSON File (`graph.json`)

Make sure that your `graph.json` file is structured like this:

```json
{
  "nodes": [
    { "id": 1, "label": "Data" },
    { "id": 2, "label": "Model" },
    { "id": 3, "label": "Prediction" },
    { "id": 4, "label": "Feedback" }
  ],
  "edges": [
    { "from": 1, "to": 2, "label": "Trains", "arrows": "to" },
    { "from": 2, "to": 3, "label": "Generates", "arrows": "to" },
    { "from": 3, "to": 4, "label": "Produces", "arrows": "to" },
    { "from": 4, "to": 1, "label": "Improves", "arrows": "to" }
  ]
}
```

### How to Use:

1.  **Save** the `graph.json` file in the same directory as your HTML and `cld.js`.
2.  **Include** the updated `cld.js` script in your HTML file as before.
3.  When the page is loaded, the diagram will be rendered based on the external `graph.json` file.

This approach allows for dynamic loading of the graph data, which makes it easier to update or modify the diagram without changing the script itself.

### You said:

Add a vis.js option to space the nodes further apart.

### ChatGPT said:

To space the nodes further apart in **vis.js**, you can modify the physics settings, particularly the `repulsion` option within the `physics` configuration. This option controls how much nodes repel each other, effectively spacing them further apart. Below is the updated `cld.js` script with the added configuration to increase the node spacing.

### Updated `cld.js`

```javascript
// Wait for the DOM to fully load
window.onload = function() {
  // Fetch the graph data from graph.json
  fetch('graph.json')
    .then(response => response.json())
    .then(causalLoopData => {
      // Create an instance of the vis Network
      const container = document.getElementById('network');

      // Parse the nodes and edges from the fetched JSON
      const data = {
        nodes: new vis.DataSet(causalLoopData.nodes),
        edges: new vis.DataSet(causalLoopData.edges)
      };

      // Define the options for visualization with more spacing between nodes
      const options = {
        edges: {
          arrows: {
            to: {enabled: true, scaleFactor: 1.2}
          },
          font: {
            align: 'middle'
          }
        },
        nodes: {
          shape: 'box',
          font: {
            size: 18
          }
        },
        physics: {
          enabled: true,
          solver: 'repulsion',
          repulsion: {
            nodeDistance: 200, // Minimum distance between nodes
            centralGravity: 0.1,
            springLength: 200,
            springConstant: 0.05,
            damping: 0.09
          }
        }
      };

      // Initialize the network
      const network = new vis.Network(container, data, options);

      // Show the number of nodes and edges
      const statsDiv = document.getElementById('load-stats');
      statsDiv.innerHTML = `<p>Number of nodes: ${causalLoopData.nodes.length}</p>
                            <p>Number of edges: ${causalLoopData.edges.length}</p>`;
    })
    .catch(error => {
      console.error('Error loading the graph data:', error);
      document.getElementById('load-stats').innerHTML = 'Error loading graph data.';
    });
};
```

### Key Changes:

1.  **`repulsion` Physics Solver**:

    -   `nodeDistance: 200`: Specifies a minimum distance between the nodes, effectively spacing them further apart. You can increase this value if you want the nodes to be spaced even more.
    -   `centralGravity`: Controls how strongly the nodes are pulled toward the center of the layout. A lower value keeps them further apart.
    -   `springLength` and `springConstant`: Adjusts the length of the spring connecting the nodes and the force exerted by it. These values help control the overall layout dynamics.
    -   `damping`: This reduces the oscillations of the nodes after they are positioned.
2.  **Physics**: The `physics` section is enabled and configured to use `repulsion`, which naturally spaces the nodes apart as they repel each other.

### How to Use:

1.  Make sure your HTML still includes the `div` with the id `network`.
2.  Include the updated `cld.js` script in your HTML file.
3.  Load your `graph.json` file and open the HTML page.

The nodes in the causal loop diagram will now be spaced further apart, giving a clearer, more visually appealing layout with more room between the elements. You can tweak the `nodeDistance` and other parameters to further adjust the layout as needed.

### You said:

!!! prompt
    enlarge the font on the edges

### ChatGPT said:

To enlarge the font on the edges (the labels on the arrows) in **vis.js**, 
you can modify the `font` settings under the `edges` configuration. 
Here's the updated `cld.js` script that increases the font size of the edge labels.

### Updated `cld.js` with Enlarged Edge Font

```javascript
// Wait for the DOM to fully load
window.onload = function() {
  // Fetch the graph data from graph.json
  fetch('graph.json')
    .then(response => response.json())
    .then(causalLoopData => {
      // Create an instance of the vis Network
      const container = document.getElementById('network');

      // Parse the nodes and edges from the fetched JSON
      const data = {
        nodes: new vis.DataSet(causalLoopData.nodes),
        edges: new vis.DataSet(causalLoopData.edges)
      };

      // Define the options for visualization with more spacing between nodes
      const options = {
        edges: {
          arrows: {
            to: {enabled: true, scaleFactor: 1.2}
          },
          font: {
            size: 18,  // Enlarged font size for edge labels
            align: 'middle'
          }
        },
        nodes: {
          shape: 'box',
          font: {
            size: 18
          }
        },
        physics: {
          enabled: true,
          solver: 'repulsion',
          repulsion: {
            nodeDistance: 200, // Minimum distance between nodes
            centralGravity: 0.1,
            springLength: 200,
            springConstant: 0.05,
            damping: 0.09
          }
        }
      };

      // Initialize the network
      const network = new vis.Network(container, data, options);

      // Show the number of nodes and edges
      const statsDiv = document.getElementById('load-stats');
      statsDiv.innerHTML = `<p>Number of nodes: ${causalLoopData.nodes.length}</p>
                            <p>Number of edges: ${causalLoopData.edges.length}</p>`;
    })
    .catch(error => {
      console.error('Error loading the graph data:', error);
      document.getElementById('load-stats').innerHTML = 'Error loading graph data.';
    });
};
```

### Key Changes:

1.  **Font Size for Edges**:
    -   In the `edges` section, I added the `font` option with `size: 18` to enlarge the font for the edge labels. You can increase this value to make the text larger if needed.

### How to Use:

1.  Use the same HTML setup and `graph.json` file.
2.  Include this updated `cld.js` file in your HTML.
3.  When the page loads, the edge labels (e.g., "Trains", "Generates", "Produces", "Improves") will appear with the larger font.

This should give you clearer and more readable labels on the edges of your causal loop diagram.

### You said:

!!! prompt
    Can you add a symbol for reinforcing loop at (0,0)?

### ChatGPT said:

To add a **reinforcing loop symbol** at the coordinates `(0,0)`, 
we can use **vis.js's** capability to render custom shapes or icons 
by adding an additional node with an appropriate symbol, 
such as an "R" inside a circle, which is commonly used 
to represent reinforcing loops.

### Updated `cld.js` with a Reinforcing Loop Symbol

```javascript
// Wait for the DOM to fully load
window.onload = function() {
  // Fetch the graph data from graph.json
  fetch('graph.json')
    .then(response => response.json())
    .then(causalLoopData => {
      // Create an instance of the vis Network
      const container = document.getElementById('network');

      // Parse the nodes and edges from the fetched JSON
      const data = {
        nodes: new vis.DataSet([
          ...causalLoopData.nodes,
          { id: 5, label: 'R', x: 0, y: 0, shape: 'circle', font: { size: 30 }, color: { background: '#f7f7f7', border: '#000000' } }
        ]),
        edges: new vis.DataSet(causalLoopData.edges)
      };

      // Define the options for visualization with more spacing between nodes and enlarged font on edges
      const options = {
        edges: {
          arrows: {
            to: {enabled: true, scaleFactor: 1.2}
          },
          font: {
            size: 18,  // Enlarged font size for edge labels
            align: 'middle'
          }
        },
        nodes: {
          shape: 'box',
          font: {
            size: 18
          }
        },
        physics: {
          enabled: true,
          solver: 'repulsion',
          repulsion: {
            nodeDistance: 200, // Minimum distance between nodes
            centralGravity: 0.1,
            springLength: 200,
            springConstant: 0.05,
            damping: 0.09
          }
        }
      };

      // Initialize the network
      const network = new vis.Network(container, data, options);

      // Show the number of nodes and edges
      const statsDiv = document.getElementById('load-stats');
      statsDiv.innerHTML = `<p>Number of nodes: ${causalLoopData.nodes.length + 1}</p>
                            <p>Number of edges: ${causalLoopData.edges.length}</p>`;
    })
    .catch(error => {
      console.error('Error loading the graph data:', error);
      document.getElementById('load-stats').innerHTML = 'Error loading graph data.';
    });
};
```

### Key Changes:

1.  **Reinforcing Loop Symbol**:
    -   A new node is added at coordinates `(0, 0)` with `id: 5` and the label `'R'`, which represents a reinforcing loop symbol.
    -   The node is styled as a **circle** with a larger font size (`font: { size: 30 }`) to make it more prominent.
    -   The color of the node has a white background (`#f7f7f7`) and a black border (`#000000`).
2.  **Coordinates**:
    -   The reinforcing loop symbol is fixed at coordinates `x: 0` and `y: 0`.

### How to Use:

1.  Ensure that `graph.json` is structured as before.
2.  Include this updated `cld.js` file in your HTML.
3.  When the page loads, you'll see the reinforcing loop symbol ("R") displayed at the `(0,0)` coordinates along with the rest of the causal loop diagram.

This will give you a visual marker at `(0,0)` to represent the reinforcing loop in your diagram. You can further adjust the size, color, and other properties of the symbol to fit your design preferences.

### You said:

![Uploaded image](https://files.oaiusercontent.com/file-2BR3woPMNhHtw8ItzCc5YTCC?se=2024-10-09T19%3A12%3A34Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D299%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dimage.png&sig=%2B8YZCH5odEch/6VCoUh%2BGvqKfjcPE8C9r0MYL3rd4GE%3D)

assume there is a 250x250 image called reenforceing-loop-cw.png in the same directory as the javascript file. Put this image at (0,0).

### ChatGPT said:

Here is the updated JavaScript (`cld.js`) that will display the reinforcing loop image (`reinforceing-loop-cw.png`) at coordinates `(0,0)` within the **vis.js** network diagram.

### Updated `cld.js`

```javascript
// Wait for the DOM to fully load
window.onload = function() {
  // Fetch the graph data from graph.json
  fetch('graph.json')
    .then(response => response.json())
    .then(causalLoopData => {
      // Create an instance of the vis Network
      const container = document.getElementById('network');

      // Parse the nodes and edges from the fetched JSON
      const data = {
        nodes: new vis.DataSet([
          ...causalLoopData.nodes,
          {
            id: 5,
            label: '',  // Empty label because we're using an image
            shape: 'image',  // Specify image type node
            image: 'reinforceing-loop-cw.png',  // Path to the reinforcing loop image
            x: 0,
            y: 0,
            size: 50,  // Size of the image node
          }
        ]),
        edges: new vis.DataSet(causalLoopData.edges)
      };

      // Define the options for visualization with more spacing between nodes and enlarged font on edges
      const options = {
        edges: {
          arrows: {
            to: {enabled: true, scaleFactor: 1.2}
          },
          font: {
            size: 18,  // Enlarged font size for edge labels
            align: 'middle'
          }
        },
        nodes: {
          shape: 'box',
          font: {
            size: 18
          }
        },
        physics: {
          enabled: true,
          solver: 'repulsion',
          repulsion: {
            nodeDistance: 200, // Minimum distance between nodes
            centralGravity: 0.1,
            springLength: 200,
            springConstant: 0.05,
            damping: 0.09
          }
        }
      };

      // Initialize the network
      const network = new vis.Network(container, data, options);

      // Show the number of nodes and edges
      const statsDiv = document.getElementById('load-stats');
      statsDiv.innerHTML = `<p>Number of nodes: ${causalLoopData.nodes.length + 1}</p>
                            <p>Number of edges: ${causalLoopData.edges.length}</p>`;
    })
    .catch(error => {
      console.error('Error loading the graph data:', error);
      document.getElementById('load-stats').innerHTML = 'Error loading graph data.';
    });
};
```

### Key Changes:

1.  **Reinforcing Loop Image as Node**:

    -   The reinforcing loop image (`reinforceing-loop-cw.png`) is added as a node with `shape: 'image'`.
    -   The image node has coordinates `x: 0` and `y: 0` and a `size` of `50`, which you can adjust if you want the image to be larger or smaller.
2.  **Image Path**:

    -   The image is located in the same directory as the JavaScript file, so the path to the image is `'reinforceing-loop-cw.png'`.

### How to Use:

1.  Make sure your image file is named **exactly** as `'reinforceing-loop-cw.png'` and is located in the same directory as your `cld.js` script.
2.  Include this updated `cld.js` file in your HTML file.
3.  When the page loads, the reinforcing loop image will be displayed at `(0,0)` in the network diagram.

This will render your reinforcing loop image at the specified location, giving a visual representation of the loop within the causal loop diagram.

### You said:


{ id: 5, label: '', // Empty label because we're using an image shape: 'image', // Specify image type node image: 'reinforceing-loop-cw.png', // Path to the reinforcing loop image x: 0, y: 0, size: 50, // Size of the image node }

### Circle Shape

```json
{
    "id": 5, 
    "label": "R", 
    "x": 0, "y": 0, 
    "shape": "circle", 
    "font": { "size": 40 }, 
    "color": { "background": "#f7f7f7", "border": "#000000" } }

```

### Image

reinforcing loop

```json
{ 
    "id": 5, 
    "label": "",  // Empty label because we're using an image
    "shape": "image",  // Specify image type node
    "image": "reinforcing-loop-cw.png",  // Path to the reinforcing loop image
    "x": 0, 
    "y": 0, 
    "size": 50  // Size of the image node
}
```

```json
{ 
    "id": 5, 
    "label": "",
    "shape": "image",
    "image": "reinforcing-loop-cw.png",
    "x": 0,
    "y": 0, 
    "size": 50,
    "fixed": { "x": true, "y": true },
    "scaling": {
        "min": 10,
        "max": 200
    }
}
```

## References

[CDL Guidelines](https://www.cs.toronto.edu/~sme/SystemsThinking/GuidelinesforDrawingCausalLoopDiagrams.pdf)

