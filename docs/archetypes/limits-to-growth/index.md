---
title: Limits to Growth
description: Causal loop diagram for the limits to growth archetype
image: /archetypes/limits-to-growth/limits-to-growth.png
og:image: /archetypes/limits-to-growth/limits-to-growth.png
twitter:image: /archetypes/limits-to-growth/limits-to-growth.png
social:
   cards: false
---
# Limits to Growth

<iframe src="../../sims/cld-viewer/main.html?file=limits-to-growth-cld.json" height=250 scrolling="no"> </iframe>


**Limits to Growth** shows us how exponential growth eventually encounters constraints, 
leading to overshoot and collapse. This archetype is essential for understanding sustainability, 
resource management, and why systems can't grow indefinitely.

## Examples of Limits to Growth

### Human Population on Planet Earth

[Humans on Earth](humans-on-earth/index.md)

### Bacterial colonies

[Bacterial Colonies](./bacteria/index.md)

### Moore's Law

[Moore's Law](./moores-law/index.md)

### AI Capabilities

[Large Language Models](./llms/index.md)

### Business Expansion

[Business Expansion](./business-expansion/index.md)

## Computer Gaming Skills

[Computer Gaming Skills](./gaming-skills/index.md)

## Intensive Agriculture

[Intensive Agriculture](./intensive-agricultuer/index.md)

## Social Media

[Social Media](./social-media/index.md)

## Other Examples

Here's a comprehensive list of "Limits to Growth" archetype examples across different domains:

## Technology & Digital Systems

- **Cryptocurrency mining** - Energy consumption and computational limits
- **Internet bandwidth growth** - Physical infrastructure and spectrum constraints
- **Social media platform expansion** - Attention economy and user engagement limits
- **Smartphone battery life** - Chemical energy storage density limits
- **Cloud computing growth** - Data center energy and cooling constraints
- **Video game graphics improvement** - Hardware performance and development cost limits
- **App store ecosystems** - Market saturation and discovery limits

## Biological & Medical Systems

- **Antibiotic effectiveness** - Bacterial resistance evolution
- **Human lifespan extension** - Cellular aging and biological repair limits
- **Intensive agriculture** - Soil depletion and ecosystem degradation
- **Fish farming/aquaculture** - Disease, pollution, and feed conversion limits
- **Organ transplantation** - Donor availability and immune rejection constraints
- **Performance-enhancing drugs** - Physiological limits and health consequences

## Urban & Infrastructure Systems

- **City traffic congestion** - Road capacity and commuting time limits
- **Urban sprawl** - Land availability and infrastructure cost constraints
- **Housing development** - Zoning, environmental, and affordability limits
- **Public transit expansion** - Funding, geography, and ridership constraints
- **Waste management systems** - Landfill capacity and environmental limits

## Economic & Business Systems

- **Fast fashion industry** - Environmental impact and labor exploitation limits
- **Gig economy expansion** - Worker classification and market saturation
- **Subscription service proliferation** - Consumer budget and attention limits
- **Tourism industry growth** - Destination carrying capacity and environmental impact
- **Credit expansion cycles** - Debt sustainability and economic bubble formation

## Environmental & Resource Systems

- **Fossil fuel extraction** - Easily accessible reserves depletion
- **Groundwater pumping** - Aquifer recharge rate limits
- **Forest harvesting** - Regeneration capacity and biodiversity loss
- **Rare earth mining** - Geographic concentration and environmental costs
- **Commercial fishing** - Ocean ecosystem collapse and overfishing

## Social & Cultural Systems

- **Higher education expansion** - Credential inflation and employment mismatch
- **Professional sports performance** - Human physiological and safety limits
- **Entertainment content production** - Audience attention and quality dilution
- **Social movement mobilization** - Activist burnout and message dilution
- **Political campaign spending** - Diminishing returns on voter persuasion

## Financial & Investment Systems

- **Stock market bubbles** - Valuation disconnection from fundamentals
- **Real estate speculation** - Affordability and economic sustainability limits
- **Venture capital scaling** - Quality deal scarcity and return expectations
- **Pension fund growth** - Demographic shifts and return assumptions

## Scientific & Research Systems

- **Academic publication growth** - Peer review capacity and quality control
- **Research funding competition** - Government budget and grant success rates
- **Clinical trial expansion** - Patient recruitment and safety constraints
- **Space exploration scaling** - Launch costs and technical complexity

## Personal & Lifestyle Systems

- **Fitness and bodybuilding** - Genetic potential and injury risk limits
- **Career advancement pursuit** - Organizational hierarchy and work-life balance
- **Social networking expansion** - Dunbar's number and relationship quality
- **Skill acquisition** - Time constraints and cognitive capacity limits

Each of these examples follows the same basic pattern:
1. **Initial success** creates confidence in unlimited growth potential
2. **Reinforcing loops** drive accelerating expansion
3. **Hidden constraints** gradually emerge and intensify
4. **Diminishing returns** appear despite increased effort/investment
5. **System limits** force transition to new approaches or face collapse

## Sample Prompt

!!! prompt
    Please generate a new JSON file for the causal loop diagram for the "Limits to Growth" archetype.
    Use the structure in the cld-schema.json to generate the JSON file.

    Overall Layout:
    The diagram has two loops placed side-by side with shared shared node labeled "Condition" in the center shared by both the loops.
    There is a single node to the far upper right called "Limiting Condition".

    Center Description:
    The center of the causal loop diagram has a node called "Condition".  
    It is placed at (0,0) on the canvas.

    Left Loop:
    The name of the left loop is called "Growth".
    It is a Reinforcing loop with two clockwise positive edges (CW).
    On the right of the Growth loop is the shared node labeled "Condition" at (0,0).
    On the left side of the Growth loop is the node labeled "Growing Action".
    Growth Action is located at (-200, 0).
    The Reinforcing loop symbol is located at (-100,0).
    Both edges in this loop are positive.

    Right Loop:
    The name of the right loop is called "Slowing".
    It is a Reinforcing loop with two clockwise edges (CW).
    On the left of the Slowing loop is the shared node labeled "Condition" at (0,0).
    On the right of the Slowing loop is the shared node labeled "Slowing Action" at (200,0).
    The Balancing loop symbol is located at (100,0).
    The edge from "System Condition" to "lowing Action" is positive.
    The edge from "Slowing Action" to "System Condition" is negative.
    In the upper right corner is a node labeled "Limiting Condition" at (300, 100).
    "Limiting Condition" connects to the "Slowing" loop at the "Slowing Action" via a clockwise edge.
    
    There are four total nodes in the diagram.
    There are five edges in the diagram.  All of the edges are clockwise (CW).
    There are no counter-clockwise edges (CCW) in this diagram.