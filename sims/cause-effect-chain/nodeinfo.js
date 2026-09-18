/* Node content for the Cause-and-Effect Chain diagram.
 * CANVAS_HEIGHT: 520
 * Chapter 1: Foundations of Systems Thinking
 * Learning objective: trace each cause to its effect and identify which link in
 * the chain is the root cause versus a surface-level symptom (Bloom: Analyze).
 */
const nodeInfo = {
    n1: {
        tag: 'Root cause',
        tagColor: '#E8871A',
        title: 'Printer positioned near a sunny window',
        description: 'Somebody chose this spot years ago because it had a free power ' +
            'outlet. Nothing about it looks like a printer problem, which is exactly ' +
            'what makes it a root cause: it is the earliest link you can actually ' +
            'change, and changing it stops every link after it.',
        example: '<strong>Root cause — removing this stops the whole chain.</strong> ' +
            'Move the printer, and the sun, the humidity, the sticking and the jams ' +
            'all stop together.'
    },
    n2: {
        tag: 'Intermediate cause',
        title: 'Afternoon sun warms the room',
        description: 'Why it leads to the next link: warm air holds more moisture than ' +
            'cool air, so the room’s humidity climbs every afternoon that the sun ' +
            'hits that wall. This is also why the jams are worse in summer and nearly ' +
            'absent in winter.',
        example: 'Notice the timing clue. A problem that happens at the same hour every ' +
            'day is almost never random — something on a daily cycle is driving it.'
    },
    n3: {
        tag: 'Intermediate cause',
        title: 'Paper stored nearby absorbs humidity',
        description: 'Why it leads to the next link: paper is hygroscopic, meaning it ' +
            'takes moisture out of the air. A ream sitting open beside the printer ' +
            'swells slightly as the room’s humidity rises.',
        example: 'Swapping in a fresh ream "fixes" the jams for an hour or two, which is ' +
            'why this link is so often mistaken for the real cause.'
    },
    n4: {
        tag: 'Intermediate cause',
        title: 'Damp paper sheets stick together',
        description: 'Why it leads to the next link: swollen sheets cling to each other, ' +
            'so the feed roller pulls two or three at once instead of one.',
        example: 'This is the last link before the symptom, and the one a technician can ' +
            'actually see. Seeing it explains the jam without explaining the pattern.'
    },
    n5: {
        tag: 'Symptom',
        tagColor: '#C62828',
        title: 'Printer jams (the symptom users report)',
        description: 'This is what gets reported, what gets ticketed, and what gets ' +
            '"fixed" — by clearing the jam, by replacing the roller, eventually by ' +
            'replacing the printer.',
        example: '<strong>Symptom — treating this alone does not stop it from ' +
            'recurring.</strong> A new printer in the same sunny spot jams by the ' +
            'following summer.'
    }
};
