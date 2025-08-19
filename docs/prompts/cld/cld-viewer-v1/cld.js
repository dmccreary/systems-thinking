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
              size: 24,  // Enlarged font size for edge labels
              align: 'middle'
            }
          },
          nodes: {
            shape: 'box',
            font: {
              size: 24
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
  