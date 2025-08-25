# Simple Causal Loop Viewer Using Vis.js

!!! prompt
    Please create a JavaScript program that will read a Causal Loop Diagram (CLD) JSON file and render it using the vis.js library.

    You can find out about the structure of  JSON schema for the CLD in the file cld-schema.json in the Files area.  You can find two examples of the CLD files here:

    banning-books-cld.json
    edu-ai-training-cld.json

    For the first version, just get the following items from the JSON file:

    title
    nodes
    edges
    loops

    Have the JavaScript program read in the JSON elements needed and display the causal loop diagram.  Place the title at the top if the diagram and centered.  Use your best judgement about the correct placement algorithm to use.  Allow the user to click on a node or edge and see the details below the drawing area.

!!! prompt
Please refactor the vis.js JavaScript program at sims/cld-viewer/main.html.
All the JavaScript for that program is located at sims/cld-viewer/cld-viewer.js
I want to be able to pass in a URL parameter to the main.html program that has the example name like this:

/sims/cld-viewer/main.html?file=ai-flywheel-v1-cld.json

The program would read the URL parameter `file` and open that file in the examples directory.
