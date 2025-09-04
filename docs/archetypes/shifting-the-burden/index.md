# Shifting the Burden: Systems Archetype Examples

<iframe src="../../sims/cld-viewer/main.html?file=shifting-the-burden-cld.json" height=400 scrolling="no"> </iframe>


The "Shifting the Burden" archetype occurs when organizations or individuals rely on quick fixes to address problem symptoms, providing immediate relief but preventing investment in fundamental solutions that would address root causes. Over time, the quick fixes become addictive while the capacity to implement real solutions deteriorates, making the original problems worse and creating dependency on increasingly intensive interventions.

## IT Help Desk Overload

A company expands its IT help desk to handle employee technology problems, providing immediate relief but preventing employees from developing basic computer skills. Over time, ticket volume continues growing as employees become increasingly dependent on IT support, while the organization loses the ability to build tech literacy through training programs. The quick fix becomes a costly addiction that makes the original problem worse.

[Read the IT Help Desk Overload example](./it-helpdesk/index.md.md)

## Getting Homework Help Instead of Learning

High school students rely on friends, family, or online resources to complete challenging assignments, getting immediate relief from academic stress but never developing independent problem-solving skills. When tests arrive requiring solo performance, students discover they don't actually understand the material they've been "doing" all semester. The pattern prevents the development of study skills and academic confidence needed for long-term success.

[Read the Getting Homework Help example](./homework-help/index.md.md)

## Cramming vs. Consistent Study Habits

College students use intense last-minute cramming sessions to pass exams, providing dramatic short-term relief and often decent grades. However, this approach prevents the development of consistent study habits and deep understanding needed for advanced coursework. Students become psychologically addicted to crisis-driven motivation while losing the ability to learn sustainably, leading to failure when they encounter truly challenging material.

[Read the Cramming vs. Consistent Study Habits example](./college-cramming/index.md)

## AI Homework Dependency

Students use generative AI to complete assignments quickly and with high quality, providing immediate relief from academic struggle and producing better work than they could create independently. However, this prevents the development of critical thinking, problem-solving, and original reasoning skills that AI cannot provide. When authentic assessment occurs—tests, presentations, or discussions—students discover they lack the fundamental capabilities hidden by AI assistance.

[Read the AI Homework Dependency example](./ai-homework/index.md.md)

## Pain Medication vs. Comprehensive Pain Management

Healthcare systems prescribe pain medication as the primary treatment for chronic conditions, providing immediate symptom relief that allows patients to function quickly. However, this approach prevents investment in comprehensive pain management including physical therapy, lifestyle changes, and addressing root causes. Over time, tolerance develops, side effects accumulate, and underlying conditions worsen, creating dependency while natural pain management capabilities deteriorate.

[Read the Pain Medication vs. Comprehensive Pain Management example](./pain-management.md)

## Emergency Response vs. Prevention Investment

Governments expand emergency response capacity to address recurring crises like crime, homelessness, and infrastructure failures, providing immediate visible relief that satisfies citizens and media. However, this prevents investment in prevention programs that would address root causes of these problems. Over time, emergency costs spiral upward while prevention capacity erodes, creating more frequent and severe crises requiring ever-larger emergency interventions.

[Read the Emergency Response vs. Prevention Investment example](./emergency-response/index.md)

## Emergency Room Overuse vs. Comprehensive Healthcare

Homeless and uninsured individuals rely on emergency departments for basic healthcare needs, receiving immediate treatment that hospitals are legally required to provide. However, this prevents investment in primary care, behavioral health, and social services that would address underlying health conditions and social determinants. Emergency visits continue increasing while comprehensive care capacity deteriorates, creating spiraling costs and worse health outcomes for vulnerable populations.

[Read the Emergency Room Overuse example](./er-overuse/index.md)

## Understanding the Pattern

These examples all demonstrate the same fundamental dynamic: **quick fixes that work in the short term can prevent long-term solutions and create addiction-like dependency**. The pattern is particularly insidious because:

- The quick fix genuinely provides relief, making it seem like the right choice
- The negative consequences are delayed and often invisible
- Each use of the quick fix weakens the capacity for fundamental solutions
- Breaking the cycle becomes increasingly difficult over time

## Breaking the Cycle

Recognizing "Shifting the Burden" patterns requires:

1. **Looking beyond immediate relief** to examine long-term consequences
2. **Investing in fundamental capabilities** even when quick fixes are available
3. **Measuring different outcomes** that reflect root cause resolution
4. **Building systems that support** long-term solutions over short-term fixes
5. **Understanding that sustainable solutions** often require more initial effort and time

## Applications Across Domains

This archetype appears in virtually every domain of human activity:

- **Education**: Teaching to the test instead of developing critical thinking
- **Business**: Cost-cutting instead of investing in innovation and capability
- **Healthcare**: Treating symptoms instead of addressing lifestyle and prevention
- **Government**: Crisis response instead of prevention and root cause intervention
- **Personal**: Quick fixes instead of building sustainable habits and skills
- **Technology**: Workarounds instead of fixing underlying system problems

Understanding this pattern can help individuals, organizations, and societies make better choices about when to use quick fixes strategically versus when to invest in fundamental solutions that create lasting positive change.

## Sample Prompt
    Please generate a causal loop diagram JSON file for the "Shifting the Burden" archetype.
    Use the JSON schema file cld-schema.json for the structure JSON of the file.

    General Layout:
    The diagram has three loops.
    On the left side there are two balancing loops stacked vertically.
    Both loops contain only clockwise edges.
    Both balancing loops share nodes "Problem" in the middle of the left side.
    On the right is a single Reinforcing loop going from the top left through "Side Effect" to the bottom of the left.

    Center of the Diagram
    The node "Problem" is located at the center at point (0,0).

    Top Loop:
    The top loop is a clockwise balancing loop called "Treat the Symptoms".  
    It has the "Problem" node on lower part and a "Treat Symptom" symptom node at the top of the loop.
    The edge "Treat Symptom" to "Problem" is negative.
    The edge "Problem" to "Treat Symptom" is positive.

    Bottom Loop:
    The bottom loop is a balancing clockwise loop "Find and Fix Root Causes".  
    It has the "Problem" node on the top a "Root Cause" node at the bottom.
    The edge "Root Cause" to "Problem" is negative.
    The edge "Problem" to "Root Cause" is positive.

    Right Loop:
    The right loop is a Reinforcing loop called "Side Effects".
    It adds one new node on the right called the "Side Effect" node.
    It starts at the "Treat Symptom" with a positive clockwise edge to "Side Effect".
    The edge from the "Side Effect" to "Root Cause" is negative.


