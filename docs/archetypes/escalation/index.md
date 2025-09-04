---
title: Escalation Systems Thinking Archetype
description: Escalation Systems Thinking Archetype with causal loop diagram for 
image: /archetypes/escalation/escalation.png
og:image: /archetypes/escalation/escalations.png
twitter:image: /archetypes/escalation/escalations.png
social:
   cards: false
---
# Escalation

<iframe src="../../sims/cld-viewer/main.html?file=escalation-cld.json" height=400 scrolling="no"> </iframe>


!!! prompt
    Please generate a new JSON file for the causal loop diagram for the "Escalation" archetype.
    Use the structure in the cld-schema.json to generate the JSON file.

    Layout:
    The diagram has two side-by-side balancing clockwise loops with a central shared node with the label "Results\nComparison".
    The name of the left loop is called "Agent X".
    The name of the right loop is called "Agent Y".

    Center:
    The center of the diagram is (0,0) with x increasing to the right and y increasing going down.
    In the center at (0,0) place the node with the label "Results\nComparison".  This node is shared by both loops.

    Left Loop:
    This is a balancing loop called "Agent X".
    Above the "Results\nComparison" node is a balancing loop directed counter-clockwise curvedCCW centered at (0, -100).
    In the lower left at (-100,100) place a node with the label "Action by X".
    In the upper left at (-200, -100) place a node with the label "Results of X".
    The edge "Results\nComparison" to "Action by X" is negative.
    The other edges are positive.

    Right Loop:
    This is a balancing loop called "Agent X".
    Above the "Results\nComparison" node is a balancing loop directed counter-clockwise curvedCCW centered at (0, -100).
    In the lower right at (100,100) place a node with the label "Action by Y".
    In the upper right at (200, -100) place a node with the label "Results of Y".
    The edge. from "Action by Y" to "Results\nComparison" is negative.
    The other edges are positive.

    There are five total nodes in the diagram.
    There are six edges in the diagram.  
    The three edges in the top are counter clockwise.
    The three edges in the bottom are clockwise.