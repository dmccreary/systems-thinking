# Leverage Points Iceberg - MicroSim Specification

## Overview

An interactive visualization of Donella Meadows' 12 Leverage Points using the iceberg metaphor. The iceberg shows that the most powerful intervention points are hidden beneath the surface—harder to see and access, but far more transformative.

## Learning Objectives

- **Bloom Level:** Understand (L2) / Apply (L3)
- Students will understand the hierarchy of intervention effectiveness
- Students will recognize why surface-level interventions often fail
- Students will identify which leverage level is appropriate for different change strategies

## Canvas Layout

```
┌─────────────────────────────────────────────────────────────┐
│                        TITLE BAR                            │
│         "Leverage Points: Where to Intervene"               │
├────────────────────────────┬────────────────────────────────┤
│                            │                                │
│                            │         INFOBOX AREA           │
│       ICEBERG              │                                │
│       VISUAL               │    (appears on hover)          │
│                            │                                │
│       (400px wide)         │       (350px wide)             │
│                            │                                │
│                            │                                │
│                            │                                │
│                            │                                │
├────────────────────────────┴────────────────────────────────┤
│                      CONTROL BAR                            │
│            "Click any layer to learn more"                  │
└─────────────────────────────────────────────────────────────┘
```

### Dimensions

- **Total canvas:** 800 x 650 pixels (responsive, scales down for mobile)
- **Drawing area:** 800 x 580 pixels
- **Control bar:** 800 x 70 pixels
- **Iceberg area:** 400 x 520 pixels (left side)
- **Infobox area:** 380 x 520 pixels (right side, 20px padding)

## Visual Design

### Iceberg Shape

The iceberg is drawn as a polygon with these characteristics:

```
Above waterline (visible, ~20% of mass):
- Narrow peak at top
- Widens slightly at waterline
- Light, bright colors (white/light blue)
- Sharp, crystalline edges

Below waterline (hidden, ~80% of mass):
- Dramatically wider
- Deepens to dark navy/purple at bottom
- Slightly softer edges (water diffusion effect)
- Subtle glow on deepest layers
```

### Waterline

- **Position:** Approximately 25% down from top of iceberg
- **Visual:** Animated wave line with subtle motion
- **Label:** "SURFACE" on left, small wave icon
- **Effect:** Slight refraction/blur effect below waterline

### Layer Zones

The 12 leverage points are grouped into 4 zones:

| Zone | Levels | Position | Color Range | Label |
|------|--------|----------|-------------|-------|
| Shallow | 12, 11, 10 | Above waterline | White → Light cyan | "Easy to reach" |
| Structural | 9, 8, 7 | Just below waterline | Cyan → Teal | "Requires effort" |
| Deep | 6, 5 | Middle depths | Teal → Navy | "Systemic change" |
| Transformative | 4, 3, 2, 1 | Bottom | Navy → Deep purple | "Paradigm shift" |

### Individual Layers

Each layer is a horizontal band within the iceberg:

```javascript
const layers = [
  {
    level: 12,
    name: "Constants & Numbers",
    shortName: "Numbers",
    zone: "shallow",
    yPosition: 0.05, // percentage from top
    height: 0.06,
    color: "#E8F4F8",
    hoverColor: "#FFFFFF",
    anchor: "#level-12-constants-numbers-subsidies",
    description: "Tweaking parameters like tax rates, quotas, and subsidies",
    examples: ["Carbon tax rate", "Minimum wage amount", "Emission caps"],
    impact: "Low - system finds workarounds",
    timeToEffect: "Immediate",
    typicalActors: ["Politicians", "Regulators", "Economists"],
    icon: "calculator"
  },
  {
    level: 11,
    name: "Stocks & Buffers",
    shortName: "Stocks",
    zone: "shallow",
    yPosition: 0.11,
    height: 0.06,
    color: "#D4EEF5",
    hoverColor: "#E8F4F8",
    anchor: "#level-11-material-stocks-and-flows",
    description: "Changing physical infrastructure and capacity",
    examples: ["Building renewable plants", "Expanding transit", "Training inspectors"],
    impact: "Low-Medium - slow and expensive",
    timeToEffect: "Years",
    typicalActors: ["Engineers", "Planners", "Investors"],
    icon: "warehouse"
  },
  {
    level: 10,
    name: "Negative Feedback",
    shortName: "Regulation",
    zone: "shallow",
    yPosition: 0.17,
    height: 0.06,
    color: "#B8E4F0",
    hoverColor: "#D4EEF5",
    anchor: "#level-10-regulating-negative-feedback-loops",
    description: "Creating constraints and regulations",
    examples: ["Safety standards", "Environmental limits", "Antitrust enforcement"],
    impact: "Medium - can change competitive dynamics",
    timeToEffect: "Months to years",
    typicalActors: ["Regulators", "Lawyers", "Compliance officers"],
    icon: "shield"
  },
  // --- WATERLINE (~0.23) ---
  {
    level: 9,
    name: "Positive Feedback",
    shortName: "Acceleration",
    zone: "structural",
    yPosition: 0.26,
    height: 0.08,
    color: "#7ECCE0",
    hoverColor: "#9DD9E8",
    anchor: "#level-9-driving-positive-feedback-loops",
    description: "Accelerating beneficial self-reinforcing processes",
    examples: ["Feed-in tariffs", "Network effects", "Viral adoption"],
    impact: "Medium-High - harnesses system momentum",
    timeToEffect: "Months to years",
    typicalActors: ["Entrepreneurs", "Movement builders", "Early adopters"],
    icon: "rocket"
  },
  {
    level: 8,
    name: "Information Flows",
    shortName: "Information",
    zone: "structural",
    yPosition: 0.34,
    height: 0.08,
    color: "#5BBDD0",
    hoverColor: "#7ECCE0",
    anchor: "#level-8-information-flows",
    description: "Changing who knows what, when, and how they can act",
    examples: ["Disclosure requirements", "Whistleblower protections", "Real-time feedback"],
    impact: "High - information is power",
    timeToEffect: "Weeks to months",
    typicalActors: ["Journalists", "Researchers", "Transparency advocates"],
    icon: "broadcast"
  },
  {
    level: 7,
    name: "Rules of the System",
    shortName: "Rules",
    zone: "structural",
    yPosition: 0.42,
    height: 0.08,
    color: "#3AADC2",
    hoverColor: "#5BBDD0",
    anchor: "#level-7-rules-of-the-system",
    description: "Changing formal and informal rules that define behavior",
    examples: ["Property rights", "Voting rules", "Market structures", "Extended producer responsibility"],
    impact: "High - rules define the game",
    timeToEffect: "Years",
    typicalActors: ["Legislators", "Courts", "Standards bodies"],
    icon: "gavel"
  },
  {
    level: 6,
    name: "Power to Self-Organize",
    shortName: "Power",
    zone: "deep",
    yPosition: 0.52,
    height: 0.10,
    color: "#2090A8",
    hoverColor: "#3AADC2",
    anchor: "#level-6-power-to-self-organize-system-structure",
    description: "Changing who makes the rules and how rule-making works",
    examples: ["Worker co-determination", "Community ownership", "Democratic governance"],
    impact: "Very High - power over power",
    timeToEffect: "Years to decades",
    typicalActors: ["Organizers", "Reformers", "Social movements"],
    icon: "users"
  },
  {
    level: 5,
    name: "Goals of the System",
    shortName: "Goals",
    zone: "deep",
    yPosition: 0.62,
    height: 0.10,
    color: "#186B80",
    hoverColor: "#2090A8",
    anchor: "#level-5-goals-of-the-system",
    description: "Changing what the system is trying to achieve",
    examples: ["From shareholder to stakeholder value", "From GDP to wellbeing", "From treatment to prevention"],
    impact: "Transformative - purpose drives everything",
    timeToEffect: "Decades",
    typicalActors: ["Visionaries", "B-Corp founders", "Policy innovators"],
    icon: "target"
  },
  {
    level: 4,
    name: "Paradigms",
    shortName: "Paradigms",
    zone: "transformative",
    yPosition: 0.72,
    height: 0.12,
    color: "#0F4D5C",
    hoverColor: "#186B80",
    anchor: "#level-4-mental-models-and-paradigms",
    description: "Changing shared beliefs and assumptions that create the system",
    examples: ["Nature as partner vs resource", "Enough vs more", "Cooperation vs competition"],
    impact: "Revolutionary - source code of culture",
    timeToEffect: "Generations",
    typicalActors: ["Philosophers", "Artists", "Spiritual leaders", "Scientists"],
    icon: "brain"
  },
  {
    level: 3,
    name: "Goals of Paradigms",
    shortName: "Meta-Goals",
    zone: "transformative",
    yPosition: 0.84,
    height: 0.08,
    color: "#0A3340",
    hoverColor: "#0F4D5C",
    anchor: "#level-4-mental-models-and-paradigms", // Links to paradigm section
    description: "The goals that arise from paradigms themselves",
    examples: ["What does 'progress' mean?", "What is a 'good life'?"],
    impact: "Foundational",
    timeToEffect: "Generations",
    typicalActors: ["Cultures", "Civilizations"],
    icon: "infinity"
  },
  {
    level: 2,
    name: "Mindset of Paradigms",
    shortName: "Mindset",
    zone: "transformative",
    yPosition: 0.92,
    height: 0.04,
    color: "#061E28",
    hoverColor: "#0A3340",
    anchor: "#level-4-mental-models-and-paradigms",
    description: "The ability to see paradigms as paradigms",
    examples: ["Recognizing your own assumptions", "Holding beliefs lightly"],
    impact: "Liberating",
    timeToEffect: "Lifetime practice",
    typicalActors: ["Contemplatives", "Systems thinkers"],
    icon: "eye"
  },
  {
    level: 1,
    name: "Transcending Paradigms",
    shortName: "Transcendence",
    zone: "transformative",
    yPosition: 0.96,
    height: 0.04,
    color: "#2D1B4E", // Deep purple
    hoverColor: "#3D2B5E",
    anchor: "#level-4-mental-models-and-paradigms",
    description: "The power to transcend paradigms entirely",
    examples: ["No paradigm is 'true'", "Flexible mind, appropriate response"],
    impact: "Beyond measurement",
    timeToEffect: "Timeless",
    typicalActors: ["Sages", "Masters"],
    icon: "sparkles"
  }
];
```

## Interaction Design

### Hover Behavior

When mouse enters a layer:

1. **Layer highlight:**
   - Layer color shifts to `hoverColor`
   - Slight scale increase (102%)
   - Subtle glow effect matching zone color
   - Cursor changes to pointer

2. **Infobox appears** (right side):
   - Fade in animation (200ms)
   - Contains structured information (see Infobox Design below)

3. **Other layers:**
   - Dim slightly (opacity 0.7)
   - Creates focus effect

### Click Behavior

When user clicks a layer:

1. Brief pulse animation on layer
2. Navigate to anchor link in current page
3. Use smooth scroll behavior

```javascript
function handleLayerClick(layer) {
  // Navigate to the anchor in the chapter
  window.location.href = layer.anchor;
}
```

### Infobox Design

```
┌─────────────────────────────────────┐
│ [ICON]  LEVEL 8                     │
│         INFORMATION FLOWS           │
├─────────────────────────────────────┤
│                                     │
│ Changing who knows what, when,      │
│ and how they can act on it.         │
│                                     │
├─────────────────────────────────────┤
│ EXAMPLES                            │
│ • Disclosure requirements           │
│ • Whistleblower protections         │
│ • Real-time feedback systems        │
├─────────────────────────────────────┤
│ ⚡ Impact: High                      │
│ ⏱️ Time to effect: Weeks to months  │
│ 👥 Typical actors: Journalists,     │
│    Researchers, Advocates           │
├─────────────────────────────────────┤
│     [ Click to learn more → ]       │
└─────────────────────────────────────┘
```

**Infobox styling:**
- Background: White with subtle shadow
- Border-left: 4px solid in zone color
- Padding: 20px
- Max-width: 340px
- Font: System sans-serif

### Default State (No Hover)

When nothing is hovered, show a general introduction in the infobox area:

```
┌─────────────────────────────────────┐
│        🧊 THE ICEBERG MODEL         │
├─────────────────────────────────────┤
│                                     │
│ Most intervention attempts focus    │
│ on what's visible above the         │
│ waterline—numbers, regulations,     │
│ quick fixes.                        │
│                                     │
│ But the real leverage lies beneath: │
│ in rules, power structures, goals,  │
│ and the paradigms that shape how    │
│ we see the world.                   │
│                                     │
│ Hover over any layer to explore.    │
│ Click to dive deeper.               │
│                                     │
├─────────────────────────────────────┤
│ Shallow (12-10): Easy, low impact   │
│ Structural (9-7): Harder, lasting   │
│ Deep (6-5): Systemic change         │
│ Transformative (4-1): Paradigm shift│
└─────────────────────────────────────┘
```

## Animation Details

### Water Surface Animation

- Subtle sine wave motion on waterline
- Amplitude: 3-5 pixels
- Period: 3 seconds
- Creates sense of the dividing line being dynamic

```javascript
function drawWaterline(y) {
  stroke(100, 180, 220, 150);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let x = 0; x < icebergWidth; x += 5) {
    let waveY = y + sin((x * 0.05) + (frameCount * 0.03)) * 4;
    vertex(x, waveY);
  }
  endShape();
}
```

### Layer Glow Animation

Deep layers (4-1) have subtle pulsing glow:

```javascript
function drawDeepGlow(layer) {
  let glowIntensity = sin(frameCount * 0.02) * 0.3 + 0.7;
  // Draw glow behind layer
  fill(layer.color + hex(glowIntensity * 50));
  // ... draw expanded layer shape
}
```

### Hover Transition

Smooth easing on all hover state changes:
- Color transition: 150ms ease-out
- Scale transition: 100ms ease-out
- Opacity transition: 200ms ease-out

## Accessibility

### Keyboard Navigation

- Tab through layers (top to bottom)
- Enter/Space to "click" (navigate to anchor)
- Escape to clear focus
- Focus indicator: High-contrast outline

### Screen Reader Support

- Each layer has aria-label with full description
- Infobox uses aria-live for dynamic content
- Role="img" on canvas with full alt text

### Color Considerations

- All text meets WCAG AA contrast requirements
- Zone colors distinguishable for colorblind users
- Patterns/textures supplement color coding

## Responsive Behavior

### Tablet (< 800px)

- Canvas scales to container width
- Infobox moves below iceberg
- Touch-friendly hit targets (minimum 44px)

### Mobile (< 500px)

- Iceberg fills width
- Infobox appears as modal overlay on tap
- Swipe to dismiss infobox
- Larger layer labels

## Control Bar

Bottom control bar contains:

- **Left:** "Hover to explore • Click to learn more"
- **Right:** Zone legend with color swatches:
  - 🔵 Shallow (easy)
  - 🔷 Structural (harder)
  - 🔹 Deep (systemic)
  - 💜 Transformative (paradigm)

## File Structure

```
/docs/sims/leverage-iceberg/
├── index.md          # Documentation and iframe embed
├── main.html         # HTML wrapper
├── iceberg.js        # Main p5.js sketch
├── layers-data.js    # Layer configuration data
├── styles.css        # Additional styling
└── metadata.json     # Dublin Core metadata
```

## Integration with Chapter

The MicroSim should be embedded in Chapter 6 after the "Donella Meadows' 12 Leverage Points" heading, replacing or supplementing the existing `<details>` placeholder:

```markdown
#### Interactive Visualization: The Leverage Iceberg

<iframe
  src="../../sims/leverage-iceberg/main.html"
  width="100%"
  height="680"
  frameborder="0"
  title="Interactive Leverage Points Iceberg"
  loading="lazy">
</iframe>
```

## Success Metrics

- Users can identify which zone a given intervention falls into
- Users understand why "quick fixes" often fail (they're above waterline)
- Users can navigate to detailed explanations of each level
- Average engagement time > 30 seconds
