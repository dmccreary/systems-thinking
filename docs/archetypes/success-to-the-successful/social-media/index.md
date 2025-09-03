# Social Media CLD

Social Media Influence - Causal Loop Diagram
An example of the Success to the Successful archetype

## JSON File

[JSON CLD File](social-media-cld.json)

## Social Media CLD Test Results

1. ❌ Test 1: Every node in a feedback loop has >= 2 unique neighbors — FAIL
    - Node 'platform_innovation' has only 1 unique neighbor(s): ['content_diversity']
2. ✅ Test 2: Every edge connects two existing nodes — PASS
3. ❌ Test 3: Every loop is a closed loop — FAIL
    - Loop 'diversity_innovation_loop': missing directed edge(s): [('platform_innovation', 'content_quality_resources'), ('increased_visibility', 'influence_concentration')]
4. ✅ Test 4: Every loop is labeled Reinforcing or Balancing — PASS