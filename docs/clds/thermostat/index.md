# A Causal Loop Diagram for a Thermostat

[Run the Thermostat CLD Viewer](../../sims/cld-viewer/main.html?file=thermostat-cld.json)

Here is a causal loop diagram for a simple thermostat system that maintains constant room temperature.

## The Basic Thermostat Causal Loop Diagram

The thermostat system creates a **balancing loop** (negative feedback loop) with the following causal relationships:

**The Main Balancing Loop:**

1. **Room Temperature** → **Temperature Gap** (negative polarity): As room temperature increases, the gap between actual and desired temperature decreases

2. **Temperature Gap** → **Thermostat Signal** (positive polarity): A larger temperature gap triggers a stronger thermostat response signal

3. **Thermostat Signal** → **Heater Output** (positive polarity): The thermostat signal directly controls how much heat the heater produces

4. **Heater Output** → **Room Temperature** (positive polarity): More heater output increases the room temperature

This creates a balancing loop where the system naturally seeks equilibrium at the desired temperature.

## Key System Characteristics

**Goal-Seeking Behavior:** The system continuously works to minimize the difference between actual room temperature and the thermostat's set point.

**Self-Correcting:** When room temperature drops below the set point, the gap increases, triggering more heating. When temperature rises above the set point, the gap becomes negative (or zero), reducing or stopping heating.

**Delays:** There are natural delays in the system - it takes time for the heater to warm up, for heat to circulate through the room, and for the thermostat to sense temperature changes.

This is a classic example of a **balancing loop** or **negative feedback system** that maintains stability around a desired goal state through automatic corrective responses.

## Diagram Description

### Structure Overview

**Main Balancing Loop:** Room Temperature → Temperature Gap → Thermostat Signal → Heater Output → Room Temperature

**Key Components:**

-   **5 nodes** representing the core system elements
-   **5 causal relationships** showing how each element affects the next
-   **1 primary balancing loop** that maintains temperature stability
-   **3 leverage points** for system intervention
-   **3 scenarios** exploring different operating conditions

### Notable Features

**Node Placement Strategy:** I used a clockwise circular layout as detailed in the metadata notes. This makes it easy to follow the causal flow and understand the feedback mechanism.

**Educational Focus:** The diagram includes comprehensive educational content with discussion questions, key insights, common misconceptions, and extension activities suitable for learning about control systems and feedback loops.

**Real-World Application:** The scenarios cover typical thermostat situations like cold startup, setpoint changes, and external heat sources.

**Systems Thinking Concepts:** The diagram demonstrates fundamental concepts like delays, goal-seeking behavior, negative feedback, and system stability.

This thermostat CLD serves as an excellent introduction to balancing loops and control systems, showing how simple feedback mechanisms create stable, goal-seeking behavior in everyday technology.