# CLD Editor

[Run the CLD Editor v1](./main.html)

## Update History

### September 1st, 2025

Full Property Editing Features:

  Graph/Diagram Properties:
  - Title, ID, archetype, description, author, version
  - Automatic timestamp updates
  - Loop management (add/edit/delete)

  Node Properties:
  - ID, label, type (variable/stock/flow/condition/constant)
  - Description, examples, measurement
  - Color customization
  - Full preservation of all data including examples

  Edge Properties:
  - ID, polarity (positive/negative)
  - Description, strength (weak/moderate/strong)
  - Delay configuration (duration, description)
  - Curve styling (type, roundness with slider)
  - Source/target relationships

  Feedback Loop Properties:
  - ID, label, type (reinforcing/balancing)
  - Description, behavior pattern
  - Path definition, primary loop designation
  - Visual styling updates

  Interface Features:

  - Toolbar with Load/Save/New buttons
  - Right panel forms for all editing operations
  - Real-time updates - changes reflect immediately in the diagram
  - Data preservation - examples and all original properties maintained
  - Delete functionality with confirmation prompts
  - Add new loops functionality

  The editor now provides comprehensive CLD authoring capabilities with a professional HTML form interface for
  editing all diagram elements.

  Position Update Implementation:

  1. Real-time updates during drag: The dragEnd event handler (lines 121-146) immediately updates positions in
  cldData.loops when loop nodes are moved, distinguishing between loop nodes (loop_ prefix) and regular nodes.
  2. Save-time updates: The saveCurrentDiagram function (lines 657-665) updates all loop positions before saving
  the file.
  3. Proper loop ID handling: The code correctly maps between vis.js node IDs (loop_123) and the original loop IDs
   (123) in the data structure.

  Key Features:

  - Immediate feedback: Positions update as soon as you stop dragging
  - Data persistence: Both real-time dragging and file saving preserve positions
  - Loop-specific logic: Handles the loop_ prefix correctly when mapping to original data
  - Bidirectional sync: Changes flow from network → cldData.loops → saved file

  The loop nodes will now maintain their correct x,y coordinates when moved in the diagram and properly save their
   positions in the exported CLD files.
