---
title: Accidental Advisories
description: How initial cooperation can lead to organizations undermining each other.
image: /archetypes/name/name.png
og:image: /archetypes/name.png
twitter:image: /archetypes/name.png
social:
   cards: false
---
# Accidental Adversaries


<iframe src="../../sims/cld-viewer/main.html?file=accidental-adversaries-cld.json" height=400 scrolling="no"> </iframe>

[CLD JSON File](./accidental-adversaries-cld.json)

## Examples

Here are some compelling real-world examples of the Accidental Adversaries archetype:

### Corporate/Organizational Examples

**Sales vs. Customer Service Departments**
- Sales pushes for quick deals and promises to hit quotas
- Customer Service deals with unrealistic expectations and angry customers
- Each department's success metrics inadvertently undermine the other's effectiveness

**Marketing vs. Operations**
- Marketing launches campaigns to drive demand spikes
- Operations struggles with sudden capacity overloads and quality issues
- Marketing's success in generating leads creates operational nightmares

**Software Development Teams in Large Companies**
- Team A optimizes their service for performance, changing APIs frequently
- Team B's applications break constantly due to upstream changes
- Both teams are measured on individual delivery speed, not system stability

### Healthcare Examples

**Hospital Departments**
- Emergency Room tries to admit patients quickly to meet throughput targets
- Inpatient units get overwhelmed with unprepared admissions
- Each department's efficiency metrics conflict with overall patient care quality

**Primary Care vs. Specialists**
- Primary care refers patients quickly to meet appointment availability targets
- Specialists get flooded with inappropriate referrals, reducing their efficiency
- Both are measured on individual metrics rather than coordinated care outcomes

### Government/Public Sector

**Police vs. Social Services**
- Police arrest individuals with mental health issues to clear the streets
- Social services lose clients to incarceration, reducing their success metrics
- Both agencies want to help vulnerable populations but work at cross-purposes

**Different Government Agencies**
- Transportation department builds highways to reduce traffic
- Environmental agency's air quality goals are undermined by increased car usage
- Each agency optimizes for their mandate without considering system-wide impacts

### Technology/Platform Examples

**App Store Optimization**
- Mobile apps optimize for algorithm visibility with frequent updates
- Users get frustrated with constant notifications and changes
- Platform's engagement metrics improve while user satisfaction declines

**Social Media Content Creators**
- Creators post frequently and use trending hashtags for algorithm boost
- Followers experience content fatigue and reduced engagement quality
- Platform rewards activity that ultimately reduces user experience

### Supply Chain Examples

**Retailers vs. Suppliers**
- Retailers demand just-in-time delivery to minimize inventory costs
- Suppliers forced into expensive rush production and shipping
- Cost savings for retailers create cost increases for suppliers

**Different Manufacturing Plants**
- Plant A ships products early to meet delivery targets
- Plant B's quality control processes get rushed due to delivery pressure
- Individual plant metrics conflict with overall product quality

### Academic Examples

**University Departments**
- Engineering department attracts students with promises of easy math requirements
- Math department's enrollment and reputation suffer from underprepared students
- Each department optimizes for their own enrollment and success metrics

**Teachers in Same School**
- Individual teachers give easier grades to keep students and parents happy
- Other teachers appear "too hard" by comparison, creating grade inflation pressure
- Everyone wants student success but individual optimization hurts system credibility

## Key Insight

In all these examples, the parties involved typically have **aligned higher-level goals** (customer satisfaction, patient care, public safety, quality education) but their **individual success metrics and operational pressures** create inadvertent interference. The solution usually involves:

1. **Shared metrics** that reward collaboration
2. **Communication systems** that increase mutual awareness
3. **Process redesign** that eliminates conflicting incentives
4. **Higher-level coordination** that optimizes for system-wide outcomes

These examples show why the Accidental Adversaries archetype is so common in 
complex organizations - good people working in systems that pit them against 
each other without meaning to.

## Sample Prompt

!!! prompt
    Please generate a causal loop diagram JSON file for the "Accidental Advisories" archetype.
    Use the JSON schema file cld-schema.json for the structure JSON of the file.

    General Layout:
    This diagram has four nodes in a single horizontal row.
    On the left are two nodes related to Agent A.
    On the right are two nodes related to Agent B.

    Agent A Details:
    Agent A has two nodes placed horizontally side-by-side on the left side of the diagram.
    The left node has the label "A's Success" and is placed at (100,300).
    The right node has the label "A's Activities" and is placed at (200, 300).
    A clockwise reinforcing loop with two CCW edges connects these nodes together.

    Agent B Details:
    Agent B has two nodes placed horizontally side-by-side on the right side of the diagram.
    The left node has the label "B's Activities" and is placed at (400,300).
    The right node has the label "B's Success" and is placed at (500, 300).
        A clockwise reinforcing loop with two CCW edges connects these nodes together.

    Outer Loops:
    This diagram contains four outer edges that connect the nodes.
    A the top is a clockwise positive edge that connects "A's Success" to "B's Success" with a smoothness of .5.
    Below this edge is a counter clockwise (CCW) negative edge that connects "B's Activities" to  "A's Success" with a smoothness of .2.
    Below the center line is edge is a counter clockwise (CCW) negative edge that connects "A's Activities" to  "B's Success" with a smoothness of .2.
    At the bottom is an positive clockwise (CW) edge that connects "B's Success" to "A's Success" with a smoothness of .5

    Loop Symbols:
    There are four loops.
    There is an R between "A's Success" and "A's Activities" at location (150, 300) called "A Success".
    There is an R between "B's Success" and "B's Activities" at location (450, 300) called "B Success".
    There is an R at the top at (300, 100) called "Mutual Success".
    There is a B at (250, 150) called the Undercutting loop.

## References

[Wikipedia Page on Accidental Adversaries](https://en.wikipedia.org/wiki/Accidental_Adversaries)



