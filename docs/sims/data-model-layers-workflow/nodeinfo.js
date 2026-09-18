/* Node content for the Conceptual / Logical / Physical data model diagram.
 * CANVAS_HEIGHT: 440
 * Chapter 26: Knowledge Graph Applications and Data Architecture
 * Learning objective: trace how one business relationship is represented
 * differently at each modeling layer, and explain what new detail each layer
 * adds (Bloom: Analyze).
 *
 * Every layer is illustrated with the same retailer example -- "Customer places
 * Order" -- so the learner sees one relationship change form three times rather
 * than three unrelated diagrams.
 */
const nodeInfo = {
    conceptual: {
        tag: 'Layer 1 of 3 — most abstract',
        tagColor: '#2E5A87',
        title: 'Conceptual Data Model',
        description: 'Names the things the business cares about and how they relate, ' +
            'in language a business stakeholder can read and correct. It deliberately ' +
            'says nothing about columns, keys or storage — if a detail would change ' +
            'when you switch databases, it does not belong here.',
        example: '<strong>The retailer example:</strong> <em>Customer places Order.</em> ' +
            'Two entities, one relationship, no attributes. A store manager can look ' +
            'at this and tell you whether it is right.'
    },
    logical: {
        tag: 'Layer 2 of 3 — adds structure',
        tagColor: '#8E6E63',
        title: 'Logical Data Model',
        description: 'Adds the attributes and the precise shape of each relationship, ' +
            'while still staying independent of any particular database product. This ' +
            'is the layer where cardinality gets pinned down, and where the questions ' +
            'the conceptual model let you gloss over have to be answered.',
        example: '<strong>The retailer example:</strong> <em>Customer</em> gains ' +
            '<code>customer_id</code>, <code>name</code>, <code>email</code>; ' +
            '<em>Order</em> gains <code>order_id</code>, <code>order_date</code>, ' +
            '<code>total</code>. The relationship becomes explicit: one Customer ' +
            'places zero or many Orders; each Order is placed by exactly one Customer.'
    },
    physical: {
        tag: 'Layer 3 of 3 — most concrete',
        tagColor: '#E8871A',
        title: 'Physical Data Model',
        description: 'Adds the technology-specific implementation: actual tables or ' +
            'node labels, data types, indexes and the mechanism that stores the ' +
            'relationship. This is the layer that changes when you change databases, ' +
            'and it is why the other two layers are worth keeping separate.',
        example: '<strong>The retailer example, two ways.</strong><br>' +
            '<em>Relational:</em> an <code>orders</code> table with a ' +
            '<code>customer_id</code> foreign key and an index on it; the ' +
            'relationship is reconstructed by a JOIN at query time.<br>' +
            '<em>Graph:</em> a <code>(:Customer)-[:PLACED]-&gt;(:Order)</code> edge; ' +
            'the relationship is stored directly as a pointer, so traversing it ' +
            'costs no join at all.'
    }
};
