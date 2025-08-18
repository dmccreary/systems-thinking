# Interactive Causal Loop Diagram Architecture

## Overview

This document outlines an architecture for converting your JSON archetype data into interactive causal loop diagrams that students can explore and learn from.

## Recommended Technology Stack

### Primary Recommendation: Vis.js Network
- **Pros**: Highly interactive, great physics simulation, excellent for graph visualization
- **Cons**: Larger bundle size, requires more setup
- **Best for**: Complex interactive diagrams where students need to manipulate and explore

### Alternative: Mermaid.js + Custom Interactivity
- **Pros**: Lightweight, declarative syntax, good for simple diagrams
- **Cons**: Limited interactivity out of the box
- **Best for**: Static diagrams with light interaction needs

### Alternative: D3.js Custom Solution
- **Pros**: Maximum flexibility and customization
- **Cons**: Significant development time, steeper learning curve
- **Best for**: Highly customized educational experiences

## Data Architecture

### Enhanced JSON Structure

```json
{
  "archetypes": [
    {
      "filename": "banning-ai",
      "title": "Banning AI",
      "subtitle": "Fixes That Fail Archetype",
      "description": "How well-intentioned AI bans create worse problems",
      "system_structure": "**AI Cheating Concerns** → **Complete AI Ban** → ...",
      "nodes": [
        {
          "id": "concern",
          "label": "AI Cheating Concerns",
          "type": "problem",
          "description": "Detailed explanation of this component",
          "examples": ["Specific examples", "Real-world cases"],
          "questions": ["What triggers this?", "How does this manifest?"],
          "position": { "x": 100, "y": 100 }
        }
      ],
      "edges": [
        {
          "from": "concern",
          "to": "ban",
          "type": "causal",
          "label": "leads to",
          "delay": "immediate",
          "strength": "strong",
          "description": "How this connection works"
        }
      ],
      "loops": [
        {
          "type": "reinforcing",
          "path": ["concern", "ban", "illiteracy", "concern"],
          "description": "The vicious cycle explanation"
        }
      ],
      "leverage_points": [
        {
          "node": "ban",
          "description": "Instead of banning, teach proper AI usage",
          "intervention": "Create AI literacy curriculum"
        }
      ]
    }
  ]
}
```

## Component Architecture

### 1. Data Parser Component
```javascript
class ArchetypeParser {
  static parseSystemStructure(structureString) {
    // Convert "A → B → C" format to nodes and edges
    const components = structureString.split('→').map(s => s.trim());
    return {
      nodes: this.createNodes(components),
      edges: this.createEdges(components)
    };
  }
  
  static createNodes(components) {
    return components.map((comp, index) => ({
      id: index,
      label: comp.replace(/\*\*/g, ''), // Remove markdown bold
      type: this.inferNodeType(index, components.length),
      color: this.getColorForType(this.inferNodeType(index, components.length))
    }));
  }
  
  static inferNodeType(index, total) {
    if (index === 0) return 'problem';
    if (index === 1) return 'quick_fix';
    if (index === 2) return 'temporary_relief';
    if (index === total - 2) return 'unintended_consequence';
    if (index === total - 1) return 'worse_problem';
    return 'intermediate';
  }
}
```

### 2. Interactive Diagram Component
```javascript
class InteractiveCLD {
  constructor(container, archetypeData) {
    this.container = container;
    this.data = archetypeData;
    this.selectedNode = null;
    this.network = null;
    this.initialize();
  }
  
  initialize() {
    this.setupNetwork();
    this.bindEvents();
    this.addEducationalFeatures();
  }
  
  setupNetwork() {
    const nodes = new vis.DataSet(this.data.nodes);
    const edges = new vis.DataSet(this.data.edges);
    
    const options = {
      physics: {
        stabilization: false,
        solver: 'forceAtlas2Based',
        forceAtlas2Based: {
          gravitationalConstant: -50,
          centralGravity: 0.01,
          springLength: 200
        }
      },
      layout: {
        improvedLayout: true
      }
    };
    
    this.network = new vis.Network(this.container, {nodes, edges}, options);
  }
  
  addEducationalFeatures() {
    this.addAnimatedFlows();
    this.addGuidedTour();
    this.addQuestionPrompts();
  }
}
```

### 3. Educational Enhancement Features

#### A. Animated Information Flow
```javascript
class FlowAnimator {
  animateSystemFlow(network, path, speed = 1000) {
    // Highlight each node in sequence to show causation flow
    path.forEach((nodeId, index) => {
      setTimeout(() => {
        this.highlightNode(network, nodeId);
      }, index * speed);
    });
  }
  
  showFeedbackLoop(network, loopPath) {
    // Special animation for feedback loops
    this.animateSystemFlow(network, loopPath);
    // Add pulsing effect to show reinforcement
  }
}
```

#### B. Guided Learning Tours
```javascript
class LearningTour {
  constructor(cldComponent) {
    this.cld = cldComponent;
    this.steps = this.createTourSteps();
  }
  
  createTourSteps() {
    return [
      {
        target: 'problem-node',
        title: 'Identify the Problem',
        content: 'Every systems archetype starts with a problem or symptom...',
        action: () => this.cld.highlightNode('problem')
      },
      {
        target: 'quick-fix-node',
        title: 'The Quick Fix',
        content: 'Notice how the quick fix seems logical but...',
        action: () => this.cld.showPath(['problem', 'quick-fix'])
      }
    ];
  }
}
```

## Implementation Approaches

### Approach 1: Pure Vis.js Solution
**Recommended for maximum interactivity**

```javascript
// Convert your JSON directly to vis.js format
const convertArchetypeToVisData = (archetype) => {
  const parsed = ArchetypeParser.parseSystemStructure(archetype.system_structure);
  
  return {
    nodes: parsed.nodes.map(node => ({
      id: node.id,
      label: node.label,
      color: getNodeColor(node.type),
      shape: 'box',
      margin: 10,
      font: { size: 14, face: 'Arial' }
    })),
    edges: parsed.edges.map(edge => ({
      from: edge.from,
      to: edge.to,
      arrows: 'to',
      smooth: { type: 'curvedCW', roundness: 0.1 }
    }))
  };
};
```

### Approach 2: Mermaid + Custom Overlay
**Good for simpler implementations**

```javascript
// Generate Mermaid syntax from your JSON
const generateMermaidDiagram = (archetype) => {
  const components = archetype.system_structure.split('→');
  let mermaidCode = 'graph LR\n';
  
  components.forEach((comp, index) => {
    const cleanLabel = comp.replace(/\*\*/g, '').trim();
    const nodeId = `N${index}`;
    mermaidCode += `  ${nodeId}["${cleanLabel}"]\n`;
    
    if (index < components.length - 1) {
      mermaidCode += `  ${nodeId} --> N${index + 1}\n`;
    }
  });
  
  // Add feedback loop
  const lastIndex = components.length - 1;
  mermaidCode += `  N${lastIndex} -.-> N0\n`;
  
  return mermaidCode;
};
```

## Educational Enhancement Suggestions

### 1. Progressive Disclosure
- Start with simple cause-and-effect chain
- Gradually reveal the feedback loop
- Finally show the full archetype pattern

### 2. Interactive Elements
- **Click nodes**: Show detailed explanations
- **Hover edges**: Display relationship descriptions
- **Animation controls**: Play/pause system flow
- **Zoom to focus**: Highlight specific parts of the loop

### 3. Assessment Integration
```javascript
class ArchetypeAssessment {
  generateQuestions(archetype) {
    return [
      {
        type: 'identify',
        prompt: 'Click on the node that represents the initial problem',
        correctNode: 'problem',
        feedback: 'Correct! This is where the system dysfunction begins.'
      },
      {
        type: 'predict',
        prompt: 'What do you think happens after the quick fix is applied?',
        options: ['Problem solved', 'Temporary improvement', 'Immediate failure'],
        correct: 1
      },
      {
        type: 'analysis',
        prompt: 'Describe the feedback loop in your own words',
        type: 'text'
      }
    ];
  }
}
```

### 4. Comparison Tools
- Side-by-side archetype comparison
- Pattern recognition across different domains
- "What if" scenario modeling

## File Structure Recommendations

```
src/
├── components/
│   ├── InteractiveCLD.js
│   ├── NodeDetailsPanel.js
│   ├── ArchetypeLegend.js
│   └── LearningTour.js
├── data/
│   ├── archetypes.json (your enhanced data)
│   └── educational-content.json
├── utils/
│   ├── ArchetypeParser.js
│   ├── FlowAnimator.js
│   └── ColorSchemes.js
├── styles/
│   └── cld-themes.css
└── assets/
    └── archetype-icons/
```

## Benefits of This Architecture

1. **Scalable**: Easy to add new archetypes by updating JSON
2. **Educational**: Multiple learning modalities (visual, interactive, textual)
3. **Engaging**: Students learn by exploration rather than passive reading
4. **Flexible**: Can adapt to different learning objectives
5. **Assessable**: Built-in opportunities for formative assessment

## Next Steps

1. Choose your preferred visualization library
2. Enhance your JSON with the additional educational metadata
3. Build the core parser and visualization components
4. Add interactive learning features gradually
5. Test with students and iterate based on feedback

This architecture provides a solid foundation for creating engaging, educational causal loop diagrams that will help students understand systems thinking concepts through interactive exploration.