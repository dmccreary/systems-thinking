# Using Vis.js to Render Causal Loop Diagrams

## Why Vis.js is Preferred for Drawing Causal Loop Diagrams with AI
Vis.js is a powerful graph network visualization tool that has many
easy-to-use features and options for fine control of directed arrow positioning between
nodes in a graph.  Because of these features it is often the preferred
tool for automating the drawing of aesthetically pleasing causal loop diagram (CLD) layouts.

For example, here is a quick summary table of the many ways an edge can be configured to
connect two nodes.

| Smooth Type | Description | Routes Around Nodes | Uses Roundness Parameter |
|-------------|-------------|---------------------|--------------------------|
| dynamic | Automatically chooses the best smoothing algorithm based on the network structure | Yes | Yes |
| continuous | Creates smooth curves that adapt continuously to node positions | Yes | Yes |
| discrete | Uses predefined curve points that remain fixed regardless of node movement | No | No |
| diagonalCross | Creates straight diagonal lines that cross through intermediate space | No | No |
| straightCross | Draws completely straight lines directly between nodes | No | No |
| horizontal | Forces edges to follow horizontal then vertical paths in step-like patterns | Yes | Yes |
| vertical | Forces edges to follow vertical then horizontal paths in step-like patterns | Yes | Yes |
| curvedCW | Creates curved edges that bend in a clockwise direction | No | Yes |
| curvedCCW | Creates curved edges that bend in a counter-clockwise direction | No | Yes |
| cubicBezier | Uses cubic Bezier curves with customizable control points for precise curve shaping | No | No |

Note the three different edge types in our Tragedy of the Commons example:

![Tragedy of the Commons](toc-example.png)

1. The upper left corner has the reinforcing loop for Farmer A.  These use the curved counter clockwise `curvedCCW` edges.
2. The lower left corner has the reinforcing loop for Farmer B.  These use the curved clockwise `curvedCW` edges.
3. The top balancing loop for Farmer A uses curved counter clockwise `curvedCCW` edges on the top edge of the loop.
4. The lower balancing loop for Farmer B uses curved clockwise `curvedCW` edges on the bottom edge of the loop.
5. The rightmost three edges are connected using two `horizontal` smooth types. 
6. The use of both types of curves preserves a symmetry so that total cattle stock, pasture heath and overgrazing limit can be place in the vertical center if the diagram.  This symmetry shows how both Farmer A and Farmer B have similar dynamics.

## Synergistic Use with LLMs

Although LLMs are good at predicting the next word or token, they are not good at automatic layout.
Unlike humans, they have a limited ability to evaluate the quality of a layout they generate.
To get quality results using LLMs to generate high quality CLD layouts, we need to provide it guardrails.

Vis.js can be used with LLMs to automatically give you a reasonable layout of
a first draft of a causal-loop diagram.  You can then use an editor to
make the final changes.

When we use vis.js to render a CLD, we need to first understand how to configure vis.js

## Using Vis.js With A Deterministic CLD Strategy

When we specify a new CLD using text, we want to focus on **what** the CLD should show, not **how** it
should draw it.  We can use vis.js in combination with a CLD JSON schema to help LLMs generate
a CLD and have downstream tools help with placement and editing.  This deterministic approach
also makes our CLDs easier to maintain, modify and customize.

## Network Graph Drawing Background

Network graph drawing libraries allow the user to specify a list of nodes and edges.  The Javascript
libraries then can be used to either automatically place the nodes on the drawing canvas and
connect them, or you can specify the exact location of the nodes on a X,Y coordinate grid.

LLMs can also be used to "guess" the initial position of nodes.  However, they frequently need to be
edited by hand.

## CLD Defaults

Vis.js has hundreds of features and options it uses to render network graphs.  Our first
task is to find sensible defaults for rendering high-quality CLD diagrams.

Below is a crisp, step‑by‑step guide you can apply directly to your `main.html`. 
We’ll start from the default behaviors in vis‑network, then show how to override 
them at the **global** level (in `options`) and at the **per‑node / per‑edge** level. 
I’ll also highlight how the `title` field turns into hover tooltips for quick, inline explanations of nodes and edges.

## Step 1: Include the vis.js JavaScript library, CSS file and prepare the canvas

### Vis.js Library Loading

In your HTML head/body you will want to include links to the main vis.js JavaScript library.  The example
below uses the clouudflare.com references content distribution network.

```html
<head>
  <link rel="preconnect" href="https://unpkg.com" crossorigin>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/vis-network@9.1.9/dist/vis-network.min.css">
 <script src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>

</head>
<body>
  <div id="network" style="height: 600px"></div>
</body>
```

Note that the `unpkg.com` link has no version number in the path.  This will always fetch the latest version.

Here is the fixed version from `cloudflare.com `unpkg.com` link:

```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js"></script>
```

You can use this if you have a fixed version to reference.

### Preconnect

To speed the initial load of the vis.js library, we suggest you use the HTML ```preconnect``` link:

```html
<link rel="preconnect" href="https://unpkg.com" crossorigin>
```

This line does the following:

1. **DNS resolution:** Resolves unpkg.com domain early
2. **TCP handshake:** Establishes connection before resources are needed
3. **SSL negotiation:** Completes HTTPS setup in advance
4. **Performance gain:** Can save 100-300ms on first request

### CSS File

The vis.min.css file is large and many of the rules are rarely used.

Here are the CDN link size estimates:

-   **Minified**: ~15-20KB
-   **Gzipped**: ~4-6KB

#### Tradeoffs of Including vis.css

##### **Advantages:**

-   **Essential functionality**: Required for tooltips/hovers to display properly
-   **Small size**: Only ~4-6KB gzipped is very reasonable
-   **Complete styling**: Handles all visual states (hover, selection, etc.)
-   **Cross-browser compatibility**: Tested styling across different browsers
-   **Professional appearance**: Consistent, polished look

##### **Disadvantages:**

-   **External dependency**: Another HTTP request (though small)
-   **Unused styles**: May include CSS for vis.js features you're not using
-   **CDN dependency**: Relies on external service availability
-   **Version coupling**: CSS version must match JS version

#### Impact Assessment

For our CLD viewers, the CSS file is **definitely worth including** because:

1.  **Critical functionality**: Without it, hover tooltips won't work properly
2.  **Minimal cost**: 4-6KB gzipped is negligible in modern web context
3.  **User experience**: Hover details are essential for educational CLDs
4.  **Maintenance**: Much easier than recreating all the necessary styles

See the [vis.js docs site](https://visjs.github.io)

## Step 2: Create data sets for nodes and edges

```js
const nodes = new vis.DataSet([
  { id: 'bank',     label: 'Bank\nBalance', title: 'Stock of money in the account' },
  { id: 'interest', label: 'Interest\nEarned', title: 'Flow that increases balance' }
]);

const edges = new vis.DataSet([
  { from: 'bank', to: 'interest', label: '+', title: 'More balance → more interest' },
  { from: 'interest', to: 'bank', label: '+', title: 'Interest increases balance' }
]);

const data = { nodes, edges };
```

Vis uses `DataSet` for dynamic, mutable collections of nodes/edges.


## Step 3: Start from clean global defaults in `options`

```js
const options = {
  physics: false,                  // CLDs are usually “diagrammed”, not simulated
  interaction: { hover: true },    // enable hover events/tooltips (see §7)
  nodes: {                         // GLOBAL node defaults
    shape: 'box',
    font: { size: 18 }
  },
  edges: {                         // GLOBAL edge defaults
    arrows: { to: { enabled: true } },
    smooth: { enabled: true, type: 'curvedCW', roundness: 0.4 },
    width: 2,
    font: { size: 20, vadjust: -8 }
  },
  layout: { improvedLayout: false }
};

const network = new vis.Network(document.getElementById('network'), data, options);
```


* Node options go in `options.nodes`. These apply to **all** nodes, but any property defined **on a node itself** overrides the global value (same for edges). ([visjs.github.io][4])
* Smooth/curved edges can be configured with `type` and `roundness`; static types like `curvedCW` are great when `physics:false`. ([visjs.github.io][5], [CRAN][6])


## Step 4: Override **per‑node** styling and behavior

Global node defaults keep your diagram consistent. Override only when needed:

```js
nodes.update([
  { id: 'bank',
    shape: 'box', color: { background: 'white', border: 'black' },
    font: { size: 18 },
    fixed: { x: true, y: true }, x: -120, y: 0,     // manual placement
    title: 'The amount of money in the bank account'
  },
  { id: 'interest',
    shape: 'box', color: { background: 'white', border: 'black' },
    font: { size: 18 },
    fixed: { x: true, y: true }, x: 120, y: 0,
    title: 'The interest earned on the balance'
  },
  { id: 'loopIcon',
    shape: 'image', image: 'reinforcing-loop-cw.png',
    size: 20, shadow: false, borderWidth: 0,
    fixed: { x: true, y: true }, x: 0, y: 0,
    title: 'Reinforcing loop symbol'
  }
]);
```

* **Manual positions** (`x`, `y`, `fixed`) work best with `physics:false` for CLD layouts. You can also programmatically adjust the camera with `network.moveTo({ position, scale })`. ([visjs.github.io][7], [Stack Overflow][8])
* Any property set on the node object (e.g., `shape`, `font`, `color`) **overrides** the global `options.nodes`. ([visjs.github.io][4])

---

## Step 5: Override **per‑edge** properties

Global edge styling keeps a consistent visual language for polarity and delays. Override selectively:

```js
// Make one edge thicker and with larger label
edges.update({ id: 'bank→interest', from: 'bank', to: 'interest',
  label: '+', title: 'Higher balance raises interest (same direction)',
  width: 3, font: { size: 22 }
});

// Dashed edge to annotate a delay in causation
edges.update({ id: 'interest→bank', from: 'interest', to: 'bank',
  label: '+', title: 'Interest raises balance; effect accumulates over time',
  dashes: true
});

// Use color coding for polarity if you like (e.g., green “+”, red “−”)
edges.update({ id: 'someNegativeLink', from: 'X', to: 'Y',
  label: '−', color: { color: '#b00020', hover: '#d23f31', highlight: '#d23f31' }
});
```

* `smooth.type: 'curvedCW' | 'curvedCCW' | …` and `roundness` let you route edges around a center icon or avoid overlap. Defaults and tuning are documented in the edge options. ([visjs.github.io][5], [CRAN][6])

Possible options for the smooth.type are: 
'dynamic', 'continuous', 'discrete', 'diagonalCross', 'straightCross', 'horizontal', 'vertical', 'curvedCW', 'curvedCCW', 'cubicBezier'. 

Take a look at this example to see what these look like and pick the one that you like best!


[Edge Smooth Type Demo](https://visjs.github.io/vis-network/examples/network/edgeStyles/smooth.html)

## Dynamic Smoothing Types

One of vis.js greatest strengths is it large library of ways you can
connect two nodes with an edge.  There are thee basic smoothing types (dynamic, continius and discrete), four Cross-Pattern Types (diagonal, straight, vertical and horizontal) and
three curved types of smoothing types.  Only the curved types use the additional roundness parameter to change the curvature of the curves.

### 'dynamic'

-   **Behavior**: Automatically calculates smooth curves based on node positions and network layout
-   **Use Case**: Best for networks where you want vis.js to handle curve calculations automatically
-   **Visual**: Creates curved paths that avoid overlapping with nodes when possible

Note that this is a computationally intensive task.

### 'continuous'

-   **Behavior**: Creates smooth, flowing curves using mathematical interpolation
-   **Use Case**: Good for organic-looking networks where you want natural, flowing connections
-   **Visual**: Produces gentle, continuous curves without sharp angles

### 'discrete'

-   **Behavior**: Creates curves with specific control points at discrete intervals
-   **Use Case**: Useful when you need more predictable curve behavior with defined waypoints
-   **Visual**: Curves that follow predetermined path segments

## Cross-Pattern Types

### 'diagonalCross'

-   **Behavior**: Routes edges diagonally across the network space
-   **Use Case**: Helpful for hierarchical layouts where you want diagonal connections
-   **Visual**: Creates diagonal paths that can cross each other at angles

### 'straightCross'

-   **Behavior**: Uses straight lines that can intersect with other edges
-   **Use Case**: When you want direct connections but allow edge crossings
-   **Visual**: Simple straight lines between nodes, regardless of overlaps

### 'horizontal'

-   **Behavior**: Creates paths that prefer horizontal routing
-   **Use Case**: Good for organizational charts or flowcharts with horizontal emphasis
-   **Visual**: Edges route primarily along horizontal paths with vertical connectors

### 'vertical'

-   **Behavior**: Creates paths that prefer vertical routing
-   **Use Case**: Useful for tree structures or hierarchies with vertical emphasis
-   **Visual**: Edges route primarily along vertical paths with horizontal connectors

## Curved Types

### 'curvedCW' (Clockwise)

-   **Behavior**: Creates curved edges that bend in a clockwise direction
-   **Use Case**: **Perfect for causal loop diagrams** - this is what you want for your CLD viewer!
-   **Visual**: Smooth curves that arc clockwise from source to target
-   **Roundness Control**: Works with the `roundness` parameter to control curve intensity

### 'curvedCCW' (Counter-Clockwise)

-   **Behavior**: Creates curved edges that bend in a counter-clockwise direction
-   **Use Case**: Alternative to curvedCW when you want curves in the opposite direction
-   **Visual**: Smooth curves that arc counter-clockwise from source to target

### 'cubicBezier'

-   **Behavior**: Uses cubic Bezier curves with customizable control points
-   **Use Case**: When you need precise control over curve shape and path
-   **Visual**: Highly customizable curves using mathematical Bezier curve calculations

## Recommendation for Causal Loop Diagrams

For our CLD viewer, we recommend sticking with **'curvedCW'** as you're currently using, because:

-   It creates clear visual separation between forward and reverse causal links
-   The clockwise curve direction is conventional for systems thinking diagrams
-   It works well with the `roundness` parameter to control curve intensity
-   It handles two-node loops elegantly (which are common in CLDs)

Your current configuration looks good:

```js
smooth:{type:'curvedCW',roundness:0.5} // Good for pronounced curves in two-node loops}
```

The `roundness: 0.5` value you're using creates nice, pronounced curves that make the causal relationships clear and visually appealing in your causal loop diagrams.

### Smooth Type Demos

* [Smooth Demo on Vis Network Examples](https://visjs.github.io/vis-network/examples/network/edgeStyles/smooth.html)
* [Smooth Scale Demo with World Cut Data](https://visjs.github.io/vis-network/examples/network/edgeStyles/smoothWorldCup.html)
* [Run the Smooth Types Demo](./smooth-types.html)

## Step 6: Depict CLD semantics with visual conventions

CLDs often follow a few “house rules”:

* **Polarity**: set `label: '+'` for same‑direction causation; `label: '−'` for opposite. You can also color edges (e.g., green for `+`, red for `−`) to speed scanning. (Edge coloring and arrows are first‑class options.) ([visjs.github.io][2])
* **Delays**: use **dashed** edges (`dashes:true`) and describe the delay in the `title` so the tooltip explains it. (Static smooth curves are helpful when you’ve disabled physics.) ([visjs.github.io][9])
* **Reinforcing / Balancing loops**: place an image node (“R” or “B” emblem) or a small label node near the loop; route curved edges to circle it.


## Step 7: Use `title` to show **hover tooltips** (nodes **and** edges)

* Add `title` to any node or edge; vis shows a tooltip on hover when `interaction.hover:true`.
* You can tune `tooltipDelay` (ms) globally, and you can style the tooltip with CSS targeting the generated `.vis-tooltip` element. ([visjs.github.io][10])

```js
const options = {
  interaction: { hover: true, tooltipDelay: 150 },
  // …
};
```

> Trouble‑shooting: If you don’t see tooltips, check that your CSS isn’t hiding `.vis-tooltip`. (Common in frameworks; Stack Overflow threads discuss this exact issue.) ([Stack Overflow][11], [GitHub][12])

---

## Step 8: Zoom, pan, and “start zoomed‑in” defaults

* Users can pan/zoom by default; you can control speed and behavior with `interaction.zoomSpeed` and friends. ([visjs.github.io][10])
* To **start** with a bigger zoom, call:

```js
network.once('afterDrawing', () => {
  network.moveTo({ position: { x: 0, y: 0 }, scale: 3.0 });
});
```

This animates the camera to your chosen center/scale. ([visjs.github.io][7])

---

## Step 9: Minimal CLD starter you can paste into `main.html`

```html
<div id="network" style="height: 520px"></div>
<script>
  const nodes = new vis.DataSet([
    { id: 'bank',     label: 'Bank\nBalance',     title: 'Stock of money' },
    { id: 'interest', label: 'Interest\nEarned',  title: 'Flow increasing balance' },
    { id: 'loop',     shape: 'image', image: 'reinforcing-loop-cw.png',
      size: 20, borderWidth: 0, shadow: false, fixed: {x:true,y:true}, x:0, y:0,
      title: 'Reinforcing loop'
    }
  ]);

  const edges = new vis.DataSet([
    { id: 'e1', from: 'bank', to: 'interest', label: '+',
      title: 'More balance → more interest' },
    { id: 'e2', from: 'interest', to: 'bank', label: '+',
      title: 'Interest increases balance', dashes: true } // dashed to suggest delay
  ]);

  const options = {
    physics: false,
    interaction: { hover: true, tooltipDelay: 150 },
    nodes: { shape: 'box', font: { size: 18 } },
    edges: {
      arrows: { to: { enabled: true } },
      smooth: { enabled: true, type: 'curvedCW', roundness: 0.4 },
      width: 2, font: { size: 20, vadjust: -8 }
    },
    layout: { improvedLayout: false }
  };

  const net = new vis.Network(document.getElementById('network'), { nodes, edges }, options);
  net.once('afterDrawing', () => net.moveTo({ position: { x:0, y:0 }, scale: 3.0 }));
</script>
```

This matches CLD conventions, uses intuitive **global defaults**, and demonstrates **per‑element overrides** (image node, dashed edge, labels, tooltips).

---

## Quick reference: what’s global vs per‑element?

* **Global defaults:** `options.nodes.*`, `options.edges.*`, `options.interaction.*`, `options.physics`, `options.layout`.
  Anything you put here applies to **all** nodes/edges—**unless** overridden. ([visjs.github.io][4])
* **Per‑node overrides:** put properties directly on a node `{ id, label, title, shape, color, font, fixed, x, y, image, size, … }`. These **replace** the global node defaults for that node. ([visjs.github.io][4])
* **Per‑edge overrides:** same idea: `{ from, to, label, title, arrows, color, smooth, dashes, width, font, … }`. Use `smooth.type` and `roundness` to route edges cleanly around icons or other nodes. ([visjs.github.io][5])
* **Tooltips:** set `interaction.hover:true` and add `title` on nodes/edges; customize delay with `tooltipDelay`. ([visjs.github.io][10])
* **Camera / initial zoom:** `network.moveTo({ position, scale })`. ([visjs.github.io][7])

### Extras you may want later

* **Balancing loop symbol:** add a small image/label node with “B” and route edges `curvedCCW` on that side. ([visjs.github.io][9])
* **Keyboard navigation / zoom control:** tune `interaction` further (keyboard, zoom speed, etc.). ([visjs.github.io][10])
* **Large graphs:** prefer **static** smooth curves over dynamic for performance; consider clustering if needed. ([visjs.github.io][5], [GitHub][13])

## Annotated References

1.  [vis.js -- Network documentation](https://visjs.github.io/vis-network/docs/?utm_source=chatgpt.com) - 2025 - Vis.js Docs - Official documentation for the vis-network library, covering configuration options and API details.

2.  [Vis Network Examples](https://visjs.github.io/vis-network/examples/?utm_source=chatgpt.com) - 2025 -  Vis.js Examples - Collection of interactive examples showing how to use vis-network features.

4.  [Nodes documentation -- vis.js](https://visjs.github.io/vis-network/docs/network/nodes.html?utm_source=chatgpt.com) - 2025 - GitHub Pages - Detailed reference for configuring and customizing nodes in vis-network.

5.  [Edges documentation -- vis.js](https://visjs.github.io/vis-network/docs/network/edges.html?utm_source=chatgpt.com) - 2025 - GitHub Pages - Documentation describing how to style, label, and configure edges in vis-network.

6.  [visNetwork: Network Visualization using 'vis.js' Library](https://cran.r-project.org/web/packages/visNetwork/visNetwork.pdf?utm_source=chatgpt.com) - 2025 - CRAN (R Project) - Documentation for the R package *visNetwork*, which uses vis.js for network visualization.

7.  [Vis Network | Other | Animations](https://visjs.github.io/vis-network/examples/network/other/animationShowcase.html?utm_source=chatgpt.com) - 2025 - GitHub Pages - Example page showing how to animate networks in vis-network.

8.  [vis.js -- Place node manually](https://stackoverflow.com/questions/32902720/vis-js-place-node-manually?utm_source=chatgpt.com) - 2015 - Stack Overflow - Community Q&A explaining how to set fixed positions for nodes in vis.js.

9.  [Vis Network | Edge Styles | Static smooth curves](https://visjs.github.io/vis-network/examples/network/edgeStyles/smooth.html?utm_source=chatgpt.com) - 2025 - GitHub Pages - Example showing how to configure static smooth curves for edges.

10.  [vis.js -- Interaction documentation](https://visjs.github.io/vis-network/docs/network/interaction.html?utm_source=chatgpt.com) - 2025 - GitHub Pages - Documentation on interaction settings such as zoom, hover, and selection.

11.  [Vis.js node tooltip doesn't show up on hover using ReactJS](https://stackoverflow.com/questions/48930138/vis-js-node-tooltip-doesnt-show-up-on-hover-using-reactjs?utm_source=chatgpt.com) - 2018 - Stack Overflow - Troubleshooting discussion on tooltip visibility in ReactJS + vis.js.

12.  [Displaying tooltips and pop-ups via the title attribute #3834](https://github.com/almende/vis/issues/3834?utm_source=chatgpt.com) - 2017 - GitHub Issues - Issue thread discussing tooltip and popup handling in vis.js.

13.  [visjs/vis-network](https://github.com/visjs/vis-network?utm_source=chatgpt.com) - 2025 - GitHub - Main repository for the vis-network project, including source code, documentation, and issue tracking.

<!--

3.  [Top 10 Examples of vis-data code in JavaScript](https://www.clouddefense.ai/code/javascript/example/vis-data?utm_source=chatgpt.com) - 2025 - CloudDefense.ai - Demonstrates real-world code snippets for using vis-data with JavaScript.
-->