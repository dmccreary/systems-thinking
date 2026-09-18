/* Node content for "How Embodied Knowledge Moves, Fades, and Leaks".
 * CANVAS_HEIGHT: 480
 * Chapter 24: Knowledge Systems and Economic Complexity
 * Learning objective: classify four ways knowledge can move, fade or transfer
 * beyond its original holder, and distinguish cross-generational transfer
 * (intentional) from knowledge spillover (unintentional) (Bloom: Analyze).
 *
 * The color coding previews the analytical distinction: blue nodes are the
 * intentional, controllable paths; amber nodes are the ones that happen to you.
 */
const nodeInfo = {
    core: {
        tag: 'The knowledge itself',
        tagColor: '#E8871A',
        title: 'Knowledge Embodiment',
        description: 'Embodied knowledge lives in people and in the routines they ' +
            'share — not in the manual. A company’s manufacturing process is the ' +
            'standard example: the written procedure is the small, copyable part, and ' +
            'the judgment about when to deviate from it is the part that actually ' +
            'determines yield.',
        example: 'The test: if the whole team left tomorrow and a new team followed the ' +
            'documentation exactly, how much of the capability would survive? Whatever ' +
            'would not survive is the embodied part.'
    },
    cross: {
        tag: 'Intentional — knowledge is handed on',
        tagColor: '#2E5A87',
        title: 'Cross-Generational Knowledge',
        description: 'Knowledge deliberately passed from experienced practitioners to ' +
            'newer ones, usually through working alongside them rather than through ' +
            'documents. It is slow, it is expensive, and it is intentional — somebody ' +
            'chose to spend the senior person’s time this way.',
        example: 'A Japanese sword-smithing workshop takes an apprentice for a decade ' +
            'not because the steps take ten years to describe, but because recognizing ' +
            'the right color in the forge cannot be described at all.'
    },
    sticky: {
        tag: 'Intentional — knowledge stays put',
        tagColor: '#2E5A87',
        title: 'Geographic Knowledge Stickiness',
        description: 'Embodied knowledge concentrates in places and resists moving, ' +
            'because it depends on a dense local web of suppliers, trained workers and ' +
            'informal conversation. A firm can relocate its factory far more easily ' +
            'than it can relocate the capability.',
        example: 'Switzerland’s watch valleys: the machinery could be shipped ' +
            'anywhere, but the network of specialist subcontractors within an ' +
            'hour’s drive cannot be, which is why the industry never left.'
    },
    decay: {
        tag: 'Unintentional — knowledge fades',
        tagColor: '#B8860B',
        title: 'Knowledge Decay',
        description: 'Embodied knowledge degrades when it is not exercised. Nothing ' +
            'leaves the organization and nobody makes a decision — the capability ' +
            'simply stops working, usually discovered at the worst possible moment.',
        example: 'A radiologist who spends four years in administration and then returns ' +
            'to reading scans is measurably slower and less accurate than when they ' +
            'left, despite having forgotten none of the theory.'
    },
    spill: {
        tag: 'Unintentional — knowledge leaks',
        tagColor: '#B8860B',
        title: 'Knowledge Spillover',
        description: 'Knowledge moves to people who never paid for it, through ' +
            'employees changing jobs, suppliers serving competitors, and conversations ' +
            'at conferences. <strong>This is the distinction to hold onto:</strong> ' +
            'cross-generational transfer is somebody choosing to hand knowledge on; ' +
            'spillover is knowledge leaving without anyone deciding.',
        example: 'A process engineer takes a job at a competitor across town. No ' +
            'documents move, no agreement is broken, and the competitor’s yield ' +
            'improves within two quarters.'
    }
};
