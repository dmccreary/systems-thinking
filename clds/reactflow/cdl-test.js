import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Custom node component for CLD boxes
const CLDNode = ({ data }) => {
  return (
    <div style={{
      background: '#E8F4FD',
      border: '2px solid #4A90E2',
      borderRadius: '8px',
      padding: '12px 16px',
      fontSize: '14px',
      fontWeight: '500',
      textAlign: 'center',
      minWidth: '120px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <Handle type="target" position={Position.Top} style={{ background: '#4A90E2' }} />
      <Handle type="source" position={Position.Bottom} style={{ background: '#4A90E2' }} />
      <Handle type="target" position={Position.Left} style={{ background: '#4A90E2' }} />
      <Handle type="source" position={Position.Right} style={{ background: '#4A90E2' }} />
      
      <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
        {data.label}
      </div>
      <div style={{ fontSize: '10px', color: '#666', fontStyle: 'italic' }}>
        {data.type}
      </div>
    </div>
  );
};

// Custom loop indicator component
const LoopIndicator = ({ data }) => {
  const isReinforcing = data.loopType === 'reinforcing';
  
  return (
    <div style={{
      background: isReinforcing ? '#dc3545' : '#28a745',
      color: 'white',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      fontWeight: 'bold',
      border: '2px solid #000',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    }}>
      {isReinforcing ? 'R' : 'B'}
    </div>
  );
};

const nodeTypes = {
  cldNode: CLDNode,
  loopIndicator: LoopIndicator,
};

const initialNodes = [
  {
    id: '1',
    type: 'cldNode',
    position: { x: 250, y: 100 },
    data: { 
      label: 'Population',
      type: 'stock'
    },
  },
  {
    id: '2',
    type: 'cldNode',
    position: { x: 100, y: 300 },
    data: { 
      label: 'Births',
      type: 'flow'
    },
  },
  {
    id: '3',
    type: 'cldNode',
    position: { x: 400, y: 300 },
    data: { 
      label: 'Deaths',
      type: 'flow'
    },
  },
  // Loop indicators
  {
    id: 'loop1',
    type: 'loopIndicator',
    position: { x: 155, y: 180 },
    data: { 
      loopType: 'reinforcing'
    },
    draggable: false,
  },
  {
    id: 'loop2',
    type: 'loopIndicator',
    position: { x: 345, y: 180 },
    data: { 
      loopType: 'balancing'
    },
    draggable: false,
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    animated: false,
    style: { 
      stroke: '#28a745', 
      strokeWidth: 3,
    },
    label: '+',
    labelStyle: { 
      background: '#28a745', 
      color: 'white', 
      fontWeight: 'bold',
      borderRadius: '50%',
      padding: '2px 6px'
    },
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#28a745', color: '#fff', fillOpacity: 0.9 },
    data: {
      description: 'More population leads to more births (reproductive potential)'
    }
  },
  {
    id: 'e2-1',
    source: '2',
    target: '1',
    type: 'smoothstep',
    animated: false,
    style: { 
      stroke: '#28a745', 
      strokeWidth: 3,
    },
    label: '+',
    labelStyle: { 
      background: '#28a745', 
      color: 'white', 
      fontWeight: 'bold',
      borderRadius: '50%',
      padding: '2px 6px'
    },
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#28a745', color: '#fff', fillOpacity: 0.9 },
    data: {
      description: 'More births increase the population'
    }
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: 'smoothstep',
    animated: false,
    style: { 
      stroke: '#28a745', 
      strokeWidth: 3,
    },
    label: '+',
    labelStyle: { 
      background: '#28a745', 
      color: 'white', 
      fontWeight: 'bold',
      borderRadius: '50%',
      padding: '2px 6px'
    },
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#28a745', color: '#fff', fillOpacity: 0.9 },
    data: {
      description: 'More population leads to more deaths (larger population to die)'
    }
  },
  {
    id: 'e3-1',
    source: '3',
    target: '1',
    type: 'smoothstep',
    animated: false,
    style: { 
      stroke: '#dc3545', 
      strokeWidth: 3,
    },
    label: '−',
    labelStyle: { 
      background: '#dc3545', 
      color: 'white', 
      fontWeight: 'bold',
      borderRadius: '50%',
      padding: '2px 6px'
    },
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#dc3545', color: '#fff', fillOpacity: 0.9 },
    data: {
      description: 'More deaths decrease the population'
    }
  },
];

export default function PopulationCLD() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div style={{ width: '100%', height: '600px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <div style={{ 
        padding: '16px', 
        background: '#f8f9fa', 
        borderBottom: '1px solid #ddd',
        borderRadius: '8px 8px 0 0'
      }}>
        <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>
          Population Dynamics Causal Loop Diagram
        </h3>
        <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
          This diagram shows two feedback loops: a <strong style={{color: '#dc3545'}}>reinforcing loop (R)</strong> between population and births that drives exponential growth, 
          and a <strong style={{color: '#28a745'}}>balancing loop (B)</strong> between population and deaths that provides natural limits.
        </p>
      </div>
      
      <div style={{ height: '500px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Controls />
          <MiniMap 
            nodeStrokeColor={(n) => {
              if (n.style?.background) return n.style.background;
              return '#eee';
            }}
            nodeColor={(n) => {
              if (n.style?.background) return n.style.background;
              return '#fff';
            }}
            nodeBorderRadius={2}
          />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
      
      <div style={{ 
        padding: '12px 16px', 
        background: '#f8f9fa', 
        borderTop: '1px solid #ddd',
        fontSize: '12px',
        color: '#666',
        borderRadius: '0 0 8px 8px'
      }}>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div><strong>Reinforcing Loop (R):</strong> Population → (+) → Births → (+) → Population</div>
          <div><strong>Balancing Loop (B):</strong> Population → (+) → Deaths → (−) → Population</div>
        </div>
        <div style={{ marginTop: '8px' }}>
          <strong>Key:</strong> (+) = positive relationship, (−) = negative relationship, 
          <span style={{color: '#28a745'}}> Green edges</span> = positive causal links, 
          <span style={{color: '#dc3545'}}> Red edges</span> = negative causal links
        </div>
      </div>
    </div>
  );
}