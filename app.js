/**
 * LAVASA UNITE — IMMERSIVE GARDEN EXACT REPLICA ENGINE
 * Featuring Lenis Smooth Inertia Scroll, GSAP Slide Physics & Custom Mouse Follower
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Lenis Smooth Momentum Scroll Engine
  const lenis = initLenisScroll();

  // 2. GSAP ScrollTrigger Slide & Parallax Animations
  initScrollSlideAnimations(lenis);

  // 4. Scroll Progress Dots System
  initScrollCursorDots(lenis);

  // 5. Sound Synthesizer (Web Audio API)
  const soundSystem = initSoundSystem();

  // 6. Theme Toggle (Concrete Light / Obsidian Dark)
  initThemeToggle();

  // 7. Interactive Pillars & Simulators
  initPillarInteractions();

  // 8. Municipal Operations Radar (Interactive Canvas)
  initMunicipalRadar(soundSystem);

  // 9. The Bridge Desk (Dispatch Drawer & 2-Way Live Communication)
  initBridgeDesk(soundSystem, lenis);
});

/* ==========================================================================
   1. LENIS SMOOTH MOMENTUM SCROLL ENGINE
   ========================================================================== */
function initLenisScroll() {
  if (typeof Lenis === 'undefined') return null;

  const lenis = new Lenis({
    duration: 1.35,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6,
    infinite: false
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Integrate with GSAP ScrollTrigger
  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  // Smooth anchor navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -60, duration: 1.4 });
        }
      }
    });
  });

  return lenis;
}

/* ==========================================================================
   2. GSAP SCROLLTRIGGER SLIDE & PARALLAX ANIMATIONS
   Exact Immersive Garden slide-in choreography
   ========================================================================== */
function initScrollSlideAnimations(lenis) {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // 1. Hero Staggered Slide In
  const heroItems = document.querySelectorAll('.hero-section [data-slide-item]');
  if (heroItems.length > 0) {
    gsap.fromTo(heroItems, 
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.35,
        ease: 'power3.out',
        stagger: 0.16,
        delay: 0.15
      }
    );
  }

  // 2. Editorial Text Statements Slide In
  document.querySelectorAll('.editorial-text-section [data-slide-item]').forEach(block => {
    gsap.fromTo(block,
      { y: 70, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.25,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: block,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // 3. Project Blocks Slide Animation (Media Card & Text Col with Parallax Depth)
  document.querySelectorAll('.projectBlock').forEach(project => {
    const mediaCard = project.querySelector('[data-slide-media]');
    const infoCard = project.querySelector('[data-slide-info]');

    if (mediaCard) {
      // Visual card slides from below with subtle scale
      gsap.fromTo(mediaCard,
        { y: 110, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.35,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: project,
            start: 'top 78%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Continuous subtle parallax while scrolling past
      gsap.to(mediaCard, {
        y: -35,
        ease: 'none',
        scrollTrigger: {
          trigger: project,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    }

    if (infoCard) {
      // Info column slides in with slight delay for asymmetric rhythm
      gsap.fromTo(infoCard,
        { y: 90, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.25,
          delay: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: project,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });

  // 4. Municipal Radar & Transparency Archive Slide In
  document.querySelectorAll('.radar-section [data-slide-item], .transparency-section [data-slide-item]').forEach(item => {
    gsap.fromTo(item,
      { y: 75, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // 5. Footer Large CTA Slide In
  const footerCta = document.querySelector('.footer-cta-wrap [data-slide-item]');
  if (footerCta) {
    gsap.fromTo(footerCta,
      { y: 70, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerCta,
          start: 'top 85%'
        }
      }
    );
  }
}

/* ==========================================================================
   4. SCROLL PROGRESS CURSOR DOTS (replicated from Immersive Garden)
   ========================================================================== */
function initScrollCursorDots(lenis) {
  const dots = document.querySelectorAll('.scrollCursor .dot');
  if (dots.length === 0) return;

  const sections = [
    document.querySelector('.hero-section'),
    document.querySelector('#pillar-water'),
    document.querySelector('#pillar-electric'),
    document.querySelector('#pillar-security'),
    document.querySelector('#radar-section'),
    document.querySelector('#transparency-archive')
  ];

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + window.innerHeight * 0.4;
    
    sections.forEach((sec, idx) => {
      if (sec && dots[idx]) {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          dots.forEach(d => d.classList.remove('dot--active'));
          dots[idx].classList.add('dot--active');
        }
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   5. SOUND SYSTEM (Web Audio API Synthesizer)
   ========================================================================== */
function initSoundSystem() {
  const soundWidget = document.getElementById('sound-toggle-widget');
  const soundStateText = document.getElementById('sound-state-text');
  let audioCtx = null;
  let isSoundActive = false;
  let ambientOsc1 = null;
  let ambientOsc2 = null;
  let masterGain = null;

  function createAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function startAmbientDrone() {
    if (!audioCtx) createAudioContext();
    if (ambientOsc1) return;

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.045, audioCtx.currentTime);

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, audioCtx.currentTime);

    ambientOsc1 = audioCtx.createOscillator();
    ambientOsc1.type = 'sine';
    ambientOsc1.frequency.setValueAtTime(110, audioCtx.currentTime);

    ambientOsc2 = audioCtx.createOscillator();
    ambientOsc2.type = 'sine';
    ambientOsc2.frequency.setValueAtTime(164.81, audioCtx.currentTime);

    ambientOsc1.connect(filter);
    ambientOsc2.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    ambientOsc1.start();
    ambientOsc2.start();
  }

  function stopAmbientDrone() {
    if (masterGain && audioCtx) {
      masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
      setTimeout(() => {
        if (ambientOsc1) { ambientOsc1.stop(); ambientOsc1.disconnect(); ambientOsc1 = null; }
        if (ambientOsc2) { ambientOsc2.stop(); ambientOsc2.disconnect(); ambientOsc2 = null; }
      }, 900);
    }
  }

  function playUiClick(freq = 440) {
    if (!isSoundActive || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.035, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch(e) {}
  }

  function playDispatchPing() {
    if (!isSoundActive || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      [587.33, 880].forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.05, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 0.35);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.4);
      });
    } catch(e) {}
  }

  if (soundWidget) {
    soundWidget.addEventListener('click', () => {
      createAudioContext();
      isSoundActive = !isSoundActive;
      if (isSoundActive) {
        soundWidget.classList.add('active');
        soundStateText.textContent = 'SOUND [ ON ]';
        startAmbientDrone();
        playUiClick(660);
      } else {
        soundWidget.classList.remove('active');
        soundStateText.textContent = 'SOUND [ OFF ]';
        stopAmbientDrone();
      }
    });
  }

  return { playUiClick, playDispatchPing, isActive: () => isSoundActive };
}

/* ==========================================================================
   6. THEME TOGGLE
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (!themeBtn) return;

  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    themeBtn.setAttribute('title', isDark ? 'Switch to Light Concrete' : 'Switch to Dark Obsidian');
    if (window.updateWebGLTheme) {
      window.updateWebGLTheme(isDark);
    }
  });
}

/* ==========================================================================
   7. PILLAR INTERACTIONS
   ========================================================================== */
function initPillarInteractions() {
  const waterGauge = document.getElementById('water-pressure-readout');
  const waterToggleBtn = document.getElementById('water-simulate-toggle');
  let isWaterDisrupted = true;

  if (waterToggleBtn && waterGauge) {
    waterToggleBtn.addEventListener('click', () => {
      isWaterDisrupted = !isWaterDisrupted;
      if (isWaterDisrupted) {
        waterGauge.textContent = '0.4 BAR';
        waterGauge.style.color = 'var(--accent-security)';
        waterToggleBtn.textContent = 'Simulate Valve Reopen';
      } else {
        waterGauge.textContent = '3.8 BAR';
        waterGauge.style.color = 'var(--text-primary)';
        waterToggleBtn.textContent = 'Simulate Tap Outage';
      }
    });
  }
}

/* ==========================================================================
   8. MUNICIPAL RADAR (Interactive Canvas Telemetry)
   ========================================================================== */
function initMunicipalRadar(soundSystem) {
  const canvas = document.getElementById('municipal-radar-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const sectors = [
    { name: 'Sector 01: Dasve Promenade', type: 'water', x: 0.28, y: 0.32, incidentCount: 1, label: 'Warasgaon Intake & Aqueduct' },
    { name: 'Sector 02: Town Hall & Portofino', type: 'security', x: 0.52, y: 0.48, incidentCount: 2, label: 'Town Hall Civic Core' },
    { name: 'Sector 03: Mugaon Valley', type: 'electric', x: 0.74, y: 0.35, incidentCount: 1, label: '33kV Substation & Feeder B' },
    { name: 'Sector 04: Hill Top & Ghat Pass', type: 'security', x: 0.42, y: 0.75, incidentCount: 0, label: 'Ghat Ridge Emergency Post' },
    { name: 'Sector 05: Lakeside Villas', type: 'water', x: 0.82, y: 0.68, incidentCount: 0, label: 'Pumping Booster Relay 4' }
  ];

  const units = [
    { id: 'HYDRO-LAVASA-1', type: 'water', x: 0.25, y: 0.28, targetX: 0.30, targetY: 0.35, speed: 0.0008 },
    { id: 'VOLT-CREW-02', type: 'electric', x: 0.70, y: 0.38, targetX: 0.75, targetY: 0.34, speed: 0.0006 },
    { id: 'PATROL-DELTA-LAVASA', type: 'security', x: 0.50, y: 0.52, targetX: 0.55, targetY: 0.46, speed: 0.0010 }
  ];

  let activeFilter = 'all';
  let radarAngle = 0;
  let hoveredNode = null;

  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.getAttribute('data-filter') || 'all';
      if (soundSystem) soundSystem.playUiClick(520);
    });
  });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    hoveredNode = null;
    sectors.forEach(sec => {
      const sx = sec.x * canvas.width;
      const sy = sec.y * canvas.height;
      if (Math.hypot(mx - sx, my - sy) < 28) hoveredNode = sec;
    });

    const infoPanel = document.querySelector('.radar-overlay-info');
    if (infoPanel) {
      if (hoveredNode) {
        infoPanel.innerHTML = `
          <div class="info-title">${hoveredNode.name}</div>
          <div class="info-desc">Infrastructure: ${hoveredNode.label} | Active Incidents: ${hoveredNode.incidentCount} | Field Crew Monitored</div>
        `;
      } else {
        infoPanel.innerHTML = `
          <div class="info-title">MUNICIPAL CIVIC RADAR</div>
          <div class="info-desc">Real-time status of water distribution, electrical grid stability, and active security response teams across Lavasa. Hover over any node to inspect telemetry.</div>
        `;
      }
    }
  });

  function drawRadar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isDark = document.body.classList.contains('dark-theme');
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.05)';
    const textColor = isDark ? '#aaaaaa' : '#555555';

    // Grid lines
    const step = 40;
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // Sweep line
    radarAngle += 0.015;
    const cx = canvas.width * 0.5, cy = canvas.height * 0.5;
    const radius = Math.min(canvas.width, canvas.height) * 0.44;

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(radarAngle) * radius, cy + Math.sin(radarAngle) * radius);
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)';
    ctx.stroke();
    ctx.restore();

    // Sector Nodes
    sectors.forEach(sec => {
      if (activeFilter !== 'all' && sec.type !== activeFilter) return;

      const sx = sec.x * canvas.width, sy = sec.y * canvas.height;
      let color = '#059669';
      if (sec.type === 'water') color = '#2563eb';
      if (sec.type === 'electric') color = '#d97706';
      if (sec.type === 'security') color = '#dc2626';

      ctx.beginPath();
      ctx.arc(sx, sy, 12, 0, Math.PI * 2);
      ctx.fillStyle = color.replace(')', ', 0.12)').replace('rgb', 'rgba');
      ctx.fill();

      ctx.beginPath();
      ctx.arc(sx, sy, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = textColor;
      ctx.fillText(sec.name, sx + 12, sy - 4);
    });

    // Moving response units
    units.forEach(unit => {
      if (activeFilter !== 'all' && unit.type !== activeFilter) return;

      unit.x += (unit.targetX - unit.x) * unit.speed * 20;
      unit.y += (unit.targetY - unit.y) * unit.speed * 20;
      if (Math.hypot(unit.targetX - unit.x, unit.targetY - unit.y) < 0.02) {
        unit.targetX = Math.random() * 0.6 + 0.2;
        unit.targetY = Math.random() * 0.6 + 0.2;
      }

      const ux = unit.x * canvas.width, uy = unit.y * canvas.height;
      ctx.save();
      ctx.fillStyle = isDark ? '#ffffff' : '#030303';
      ctx.beginPath();
      ctx.arc(ux, uy, 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillText(`[${unit.id}]`, ux + 8, uy + 3);
      ctx.restore();
    });

    requestAnimationFrame(drawRadar);
  }
  drawRadar();
}

/* ==========================================================================
   9. THE BRIDGE DESK (DISPATCH DRAWER & 2-WAY LIVE TERMINAL)
   ========================================================================== */
function initBridgeDesk(soundSystem, lenis) {
  const modalBackdrop = document.getElementById('bridge-modal-backdrop');
  const closeBtn = document.getElementById('btn-close-drawer');
  const openButtons = document.querySelectorAll('.open-bridge-trigger');
  const formSection = document.getElementById('bridge-form-section');
  const activeTerminal = document.getElementById('active-ticket-terminal');
  const newReportDrawerBtn = document.getElementById('btn-drawer-new-report');

  function openBridge(preselectCategory = null) {
    if (modalBackdrop) modalBackdrop.classList.add('active');
    if (lenis && typeof lenis.stop === 'function') lenis.stop();
    if (soundSystem) soundSystem.playUiClick(480);
    if (preselectCategory) selectCategory(preselectCategory);
  }

  function closeBridge() {
    if (modalBackdrop) modalBackdrop.classList.remove('active');
    if (lenis && typeof lenis.start === 'function') lenis.start();
    if (soundSystem) soundSystem.playUiClick(360);
  }

  if (newReportDrawerBtn) {
    newReportDrawerBtn.addEventListener('click', () => {
      if (activeTerminal) activeTerminal.classList.remove('visible');
      if (formSection) formSection.style.display = 'block';
      const drawer = document.querySelector('.bridge-drawer');
      if (drawer) drawer.scrollTop = 0;
      if (soundSystem) soundSystem.playUiClick(500);
    });
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // If clicking link with category that has full report.html, check modifier keys
      if (e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      const cat = btn.getAttribute('data-preselect') || null;
      openBridge(cat);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeBridge);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeBridge();
    });
  }

  const categoryOptions = {
    water: [
      'No water in taps (Complete outage)',
      'Burst main pipeline on street',
      'Severe pressure drop across neighborhood',
      'Discolored / Brown water supply',
      'Request emergency potable water tanker'
    ],
    electric: [
      'Total neighborhood blackout',
      'Sparking transformer / Explosion heard',
      'Downed live high-voltage power lines',
      'Critical flicker / Dangerous voltage fluctuation',
      'Multiple streetlights dark along corridor'
    ],
    security: [
      'Immediate civic distress / Threat escalation',
      'Town Hall / Public facility trespass',
      'Suspicious perimeter disturbance',
      'Uncontrolled crowd / Escalation',
      'Urgent vulnerable elder safety check'
    ]
  };

  let selectedCategory = 'water';
  let selectedSubproblem = categoryOptions.water[0];
  let selectedUrgency = 'high';

  const catButtons = document.querySelectorAll('.category-option-btn');
  const subproblemContainer = document.getElementById('subproblem-chips-container');

  function renderSubproblems(catKey) {
    if (!subproblemContainer) return;
    subproblemContainer.innerHTML = '';
    const list = categoryOptions[catKey] || [];
    list.forEach((prob, idx) => {
      const chip = document.createElement('div');
      chip.className = `subproblem-chip ${idx === 0 ? 'selected' : ''}`;
      chip.textContent = prob;
      chip.addEventListener('click', () => {
        document.querySelectorAll('.subproblem-chip').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        selectedSubproblem = prob;
        if (soundSystem) soundSystem.playUiClick(600);
      });
      subproblemContainer.appendChild(chip);
    });
    selectedSubproblem = list[0];
  }

  function selectCategory(catKey) {
    selectedCategory = catKey;
    catButtons.forEach(btn => {
      if (btn.getAttribute('data-category') === catKey) btn.classList.add('selected');
      else btn.classList.remove('selected');
    });
    renderSubproblems(catKey);
  }

  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      selectCategory(btn.getAttribute('data-category'));
      if (soundSystem) soundSystem.playUiClick(500);
    });
  });

  document.querySelectorAll('.urgency-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.urgency-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedUrgency = btn.getAttribute('data-urgency') || 'high';
      if (soundSystem) soundSystem.playUiClick(550);
    });
  });

  const dispatchBtn = document.getElementById('btn-submit-dispatch');
  const activeTerminal = document.getElementById('active-ticket-terminal');
  const formSection = document.getElementById('bridge-form-section');
  const ticketIdElem = document.getElementById('terminal-ticket-id');
  const chatStream = document.getElementById('terminal-chat-stream');
  const chatInput = document.getElementById('terminal-chat-input');
  const chatSendBtn = document.getElementById('btn-send-chat');

  if (dispatchBtn) {
    dispatchBtn.addEventListener('click', () => {
      const addressInput = document.getElementById('input-address');
      const address = (addressInput && addressInput.value.trim()) ? addressInput.value.trim() : 'Dasve Promenade, Block 4, Sector 01';
      
      const prefix = selectedCategory.toUpperCase().substring(0, 3);
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const ticketId = `LVS-${prefix}-${randomNum}`;

      if (ticketIdElem) ticketIdElem.textContent = ticketId;
      if (soundSystem) soundSystem.playDispatchPing();

      if (formSection) formSection.style.display = 'none';
      if (activeTerminal) {
        activeTerminal.classList.add('visible');
        activeTerminal.scrollIntoView({ behavior: 'smooth' });
      }

      if (chatStream) {
        chatStream.innerHTML = `
          <div class="chat-bubble team">
            <div class="chat-sender-tag">LAVASA TOWN HALL DISPATCH</div>
            Report registered under <strong>${ticketId}</strong> for ${selectedCategory.toUpperCase()} crisis at ${address}. Priority: ${selectedUrgency.toUpperCase()}.
          </div>
        `;

        setTimeout(() => {
          let assignedUnit = 'HYDRO-UNIT 01 (Warasgaon Tech)';
          if (selectedCategory === 'electric') assignedUnit = 'GRID RESPONSE CREW #02';
          if (selectedCategory === 'security') assignedUnit = 'PATROL DELTA LAVASA (Sgt. Reyes)';

          appendTeamMessage(`Unit Assigned: <strong>${assignedUnit}</strong>. We are en route to resolve "${selectedSubproblem}". ETA: 3 minutes.`);
          
          const step2 = document.getElementById('timeline-step-2');
          if (step2) step2.classList.add('completed');
          const step3 = document.getElementById('timeline-step-3');
          if (step3) step3.classList.add('active');
          if (soundSystem) soundSystem.playUiClick(720);
        }, 1500);
      }
    });
  }

  function appendTeamMessage(text) {
    if (!chatStream) return;
    const msg = document.createElement('div');
    msg.className = 'chat-bubble team';
    msg.innerHTML = `<div class="chat-sender-tag">FIELD RESPONSE CREW</div>${text}`;
    chatStream.appendChild(msg);
    chatStream.scrollTop = chatStream.scrollHeight;
  }

  function appendCitizenMessage(text) {
    if (!chatStream) return;
    const msg = document.createElement('div');
    msg.className = 'chat-bubble citizen';
    msg.innerHTML = `<div class="chat-sender-tag">YOU (CITIZEN DIRECT CHANNEL)</div>${text}`;
    chatStream.appendChild(msg);
    chatStream.scrollTop = chatStream.scrollHeight;
  }

  function handleSendChat() {
    if (!chatInput) return;
    const val = chatInput.value.trim();
    if (!val) return;

    appendCitizenMessage(val);
    chatInput.value = '';
    if (soundSystem) soundSystem.playUiClick(500);

    setTimeout(() => {
      const responses = [
        "Copy that. Technician has arrived on location; isolating primary valve/breaker now.",
        "Received. We have verified the issue at the street manifold. Rectification is underway.",
        "Understood. Security patrol has secured the sector perimeter. Situation is de-escalated and under control.",
        "Status update: Diagnostics complete. Normal supply restoration ETA is under 18 minutes."
      ];
      const reply = responses[Math.floor(Math.random() * responses.length)];
      appendTeamMessage(reply);
      if (soundSystem) soundSystem.playUiClick(650);
    }, 1800);
  }

  if (chatSendBtn) chatSendBtn.addEventListener('click', handleSendChat);
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSendChat();
    });
  }
}
