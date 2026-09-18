/* Node content for the intervention-to-implementation workflow.
 * CANVAS_HEIGHT: 440
 * Chapter 25: Systems Design, Emerging Technology, and Practice
 * Learning objective: sequence the design steps from choosing an intervention
 * point through closing the feedback loop, and explain what each step catches
 * that the previous step could miss (Bloom: Analyze).
 *
 * Each step is illustrated with the same running example: redesigning how a
 * hospital schedules outpatient appointments.
 */
const nodeInfo = {
    s1: {
        tag: 'Step 1',
        tagColor: '#2E5A87',
        title: 'Choose Intervention Point',
        description: 'Decide where in the system you are going to push. Meadows ranked ' +
            'these: adjusting a parameter is the weakest place to intervene, changing ' +
            'the rules is stronger, and changing the goal or the paradigm is strongest.',
        example: '<strong>Hospital scheduling:</strong> hiring one more scheduler adjusts ' +
            'a parameter. Changing the rule that every appointment is booked by phone ' +
            'during business hours is a far stronger intervention on the same problem.'
    },
    s2: {
        tag: 'Step 2',
        tagColor: '#2E5A87',
        title: 'Anticipate Side Effects',
        description: 'Ask what else moves when this moves. Step 1 tells you where to ' +
            'push but says nothing about what the push displaces — this step catches ' +
            'the second-order consequences that turn a clean fix into a new problem.',
        example: '<strong>Hospital scheduling:</strong> online self-booking shortens ' +
            'phone queues, and also quietly shifts appointments toward patients who ' +
            'are comfortable online. The intervention succeeded and created an equity ' +
            'problem nobody measured.'
    },
    s3: {
        tag: 'Step 3',
        tagColor: '#2E5A87',
        title: 'Design Feedback Mechanism',
        description: 'Decide in advance what you will measure and how you will know if ' +
            'you were wrong. Step 2 was a list of guesses; this step is what turns ' +
            'those guesses into something the system will tell you about.',
        example: '<strong>Hospital scheduling:</strong> track no-show rate and average ' +
            'wait, <em>and</em> the age and language profile of who books online versus ' +
            'by phone. The second measure only exists because Step 2 flagged the risk.'
    },
    s4: {
        tag: 'Step 4',
        tagColor: '#2E5A87',
        title: 'Select Implementation Strategy',
        description: 'Choose how much of the system to change at once. A good ' +
            'measurement plan is worthless if the rollout is so wide that a bad result ' +
            'cannot be undone — this step is what keeps the feedback actionable.',
        example: '<strong>Hospital scheduling:</strong> pilot the new system at one ' +
            'clinic before a hospital-wide rollout. One clinic can be reverted in a ' +
            'week; a whole hospital cannot.'
    },
    s5: {
        tag: 'The loop closes',
        tagColor: '#E8871A',
        title: 'Human Flourishing Feedback',
        description: 'Ask whether the people in the system are actually better off, ' +
            'not just whether the metric improved. Every earlier step can be executed ' +
            'perfectly while the intervention still makes life worse — this is the ' +
            'step that catches that, and it is why the diagram loops instead of ending.',
        example: '<strong>Hospital scheduling:</strong> wait times fell 30%, and ' +
            'patients over 70 now wait longer than before. The metric says success; ' +
            'flourishing feedback says go back to Step 1 and pick a different ' +
            'intervention point.'
    }
};
