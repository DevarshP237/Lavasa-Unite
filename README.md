# Lavasa-Unite — Town Hall Civic Emergency & Rapid Response Bridge

An interactive, editorial-minimalist web platform engineered to bridge the communication gap between Lavasa residents and municipal field response teams during civic infrastructure crises.

Inspired by the design aesthetics, editorial typography, and interactive fluidity of **[Immersive Garden](https://immersive-g.com/)**.

---

## 🏛️ The Civic Challenge Solved in Lavasa

In Lavasa Hill City, when municipal infrastructure fails:
- **Phone lines and town hall administrative desks are frequently unattended or congested.**
- **Residents facing water supply stoppages or power cuts are left without updates or ETAs.**
- **Response crews (water technicians, electricians, security patrols) work without direct telemetry from affected residents.**

**Lavasa-Unite** acts as an instant, transparent two-way bridge connecting the community directly to the field teams to resolve matters rapidly without bureaucratic delays.

---

## ⚡ The Three Core Pillars

1. **Water & Hydrological Network (Warasgaon Catchment)**
   - No water in household or apartment taps
   - Burst underground mains and roadway flooding along Dasve Promenade & Lakeside
   - Water pressure collapse preventing pump/heater operation
   - Emergency potable water tanker dispatch for residents

2. **Electrical Grid & Power Reliability**
   - Sudden blackouts across residential blocks and commercial promenades
   - Sparking transformers and electrical hazards
   - Downed high-voltage lines on hilly roads and pedestrian corridors
   - Voltage fluctuations & power restoration updates

3. **Immediate Response Security Corps**
   - 24/7 urgent citizen distress beacons
   - Town Hall, public park, and lakeside perimeter disturbances
   - Ghat pass & hillside access security monitoring
   - Emergency welfare checks for vulnerable residents

---

## ✨ Immersive Garden (immersive-g.com) Design Cues

- **Architectural & Editorial Typography**: 
  - Expressive serif headlines (`Cormorant Garamond`) paired with Swiss modernist sans (`Inter`) and monospace telemetry coordinates (`JetBrains Mono`).
- **Signature Minimalist Palette**:
  - High-end Concrete Grey (`#E8E8E8`) with deep ink black (`#030303`), paired with an instant toggle to Obsidian Dark (`#030303` with luminous `#E8E8E8`).
- **WebGL Ambient Canvas**:
  - Fluid Three.js particle and topographic grid mesh that responds softly to cursor position and scroll inertia.
- **Custom Lagging Cursor Physics**:
  - Precision follower circle with contextual micro-labels (`[REPORT]`, `[DISPATCH]`, `[WATER]`, `[GRID]`, `[RADAR]`, `[SOUND]`).
- **Signature Sound Toggle Widget (Bottom-Right)**:
  - Exact replica of Immersive Garden's orbiting dot & progress ring widget.
  - Web Audio API synthesizer generating calm ambient harmonics and tactile UI clicks without external audio dependencies.
- **The Bridge Desk (Instant Dispatch & 2-Way Terminal)**:
  - Minimalist slide-over drawer to register incidents in under 3 clicks.
  - Live 4-stage timeline (Received &rarr; Unit Assigned &rarr; En Route &rarr; Resolved).
  - Direct 2-way real-time chat with the field team commander.
- **Interactive Municipal Operations Radar**:
  - Real-time 2D radar sweeping Lavasa sectors (Dasve Promenade, Town Hall Core, Mugaon Ridge, Ghat Pass, Lakeside Villas) with moving response units and incident heat nodes.

---

## 🚀 Running the Platform

1. Directly open in any browser:
   ```
   C:\Education\Websites\Lavasa-Unite\index.html
   ```

2. Or start the lightweight local static server:
   ```bash
   cd C:\Education\Websites\Lavasa-Unite
   node server.js
   ```
   and navigate to `http://localhost:3000`.
