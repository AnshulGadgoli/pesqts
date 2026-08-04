// ==========================================================================
// PES HANDBOOK GLOBALS & CHAPTERS REGISTRY
// ==========================================================================
const handbookChapters = [
  { num: "Chapter I", title: "Welcome & Campuses", url: "welcome.html", desc: "Acquaint yourself with the university leadership, and explore the layout of our Ring Road, Electronic City, and Hanumanth Nagar campuses." },
  { num: "Chapter II", title: "Fundamentals", url: "fundamentals.html", desc: "Master the essential parameters of daily university life: class timings, strict attendance quotas, and ID card policies." },
  { num: "Chapter III", title: "Must-Haves", url: "must-haves.html", desc: "Understand the list of physical assets required for lab submissions, exams, and lectures, including official textbooks and calculators." },
  { num: "Chapter IV", title: "Examinations", url: "examinations.html", desc: "Explore the grading timeline, question paper generation protocols, answer booklet details, and our AI-assisted evaluation policy." },
  { num: "Chapter V", title: "Subjects in Each Cycle", url: "subjects.html", desc: "A guide to the structural cycles of the first year: compare curriculum components between the Physics Cycle and Chemistry Cycle." },
  { num: "Chapter VI", title: "Assignments & Labs", url: "assignments.html", desc: "Details of lab evaluations, written portfolios, physics and chemistry practical logs, and computer programming lab grading rubrics." },
  { num: "Chapter VII", title: "SRN & PRN Decoded", url: "srn-prn.html", desc: "Learn how to decode the numbers that identify your academic records: Student Registration Number and Permanent Registration Number." },
  { num: "Chapter VIII", title: "Credits & GPA", url: "credits-gpa.html", desc: "An interactive breakdown of graduation requisites, mark distributions, course grading tables, and our live GPA estimator tool." },
  { num: "Chapter IX", title: "Scholarships", url: "scholarships.html", desc: "Explore the MRD and CNR scholarships, distinction awards, eligibility requirements, and branch calculations across campuses." },
  { num: "Chapter X", title: "Bootstrap Induction", url: "bootstrap.html", desc: "Your induction into campus life: rotating sets, color group assignments, community development service, and a packing checklist." },
  { num: "Chapter XI", title: "The Ring Road Campus (RRC)", url: "rrc-campus.html", desc: "Coming after Campus Challenge" },
  { num: "Chapter XII", title: "Clubs of RRC", url: "rrc-clubs.html", desc: "Explore the automotive teams, innovation labs, performing arts, and debating circles at the Ring Road Campus." },
  { num: "Chapter XIII", title: "Fests of RRC", url: "rrc-fests.html", desc: "A chronicle of the massive technical conferences, cultural showcases, and annual celebrations at Ring Road." },
  { num: "Chapter XIV", title: "The Electronic City Campus (ECC)", url: "ecc-campus.html", desc: "Coming after Campus Challenge" },
  { num: "Chapter XV", title: "Clubs of ECC", url: "ecc-clubs.html", desc: "Explore the diverse technical, cultural, arts, and leadership student-run clubs that drive campus life at ECC." },
  { num: "Chapter XVI", title: "Fests of ECC", url: "ecc-fests.html", desc: "Coming soon" },
  { num: "Chapter XVII", title: "Website Credits", url: "website-credits.html", desc: "Meet the designers, builders, and developers who created this handbook website." }
];

// BFCache navigation recovery and load handlers
window.addEventListener('pageshow', (event) => {
  const cloudOverlay = document.getElementById('pixelCloudOverlay');
  if (cloudOverlay) {
    cloudOverlay.classList.remove('active');
  }
  const pageLoader = document.getElementById('pageLoader');
  if (pageLoader) {
    pageLoader.classList.add('hide');
  }
});

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // PLATFORM SHORTCUT DETECTION (Ctrl+K for Win, ⌘K for Mac)
  // ==========================================================================
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;
    const kbd = searchBtn.querySelector('kbd');
    if (kbd) {
      kbd.textContent = isMac ? '⌘K' : 'Ctrl+K';
    }
  }

  // ==========================================================================
  // BODY CLICK CONTROLLERS: PIXEL EXPLOSIONS & GAMIFIED CPS MOUSE SPEED
  // ==========================================================================
  let clickTimestamps = [];
  let cpsPopup = null;
  let cpsTimeout = null;

  const handleBodyClick = (e) => {
    // Click particles
    const particleCount = 8;
    const body = document.body;
    const clickX = e.pageX;
    const clickY = e.pageY;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'click-particle';
      particle.style.left = `${clickX}px`;
      particle.style.top = `${clickY}px`;
      body.appendChild(particle);

      const angle = (i * (360 / particleCount) + Math.random() * 20) * (Math.PI / 180);
      const distance = 25 + Math.random() * 20;
      const targetX = Math.round(Math.cos(angle) * distance);
      const targetY = Math.round(Math.sin(angle) * distance);

      requestAnimationFrame(() => {
        particle.style.transform = `translate(${targetX}px, ${targetY}px) scale(0.4)`;
        particle.style.opacity = '0';
      });

      setTimeout(() => {
        particle.remove();
      }, 400);
    }

    // Gamified CPS Pop tracker
    const now = Date.now();
    clickTimestamps.push(now);
    clickTimestamps = clickTimestamps.filter(t => now - t < 1000);
    const cpsCount = clickTimestamps.length;

    if (cpsCount >= 6) {
      if (!cpsPopup) {
        cpsPopup = document.createElement('div');
        cpsPopup.className = 'cps-popup-card';
        body.appendChild(cpsPopup);
      }

      cpsPopup.style.left = `${e.clientX}px`;
      cpsPopup.style.top = `${e.clientY}px`;
      cpsPopup.classList.add('show');

      let title = "FAST CLICKER!";
      if (cpsCount >= 9) title = "SPEED DEMON! ⚡";
      if (cpsCount >= 13) title = "HYPERACTIVE CHIEF! 🔥";
      if (cpsCount >= 17) title = "OVERCLOCK STATUS!!! 💻";

      cpsPopup.innerHTML = `
        <span class="cps-title-label">${title}</span>
        <span class="cps-number-val">${cpsCount} CPS</span>
      `;

      clearTimeout(cpsTimeout);
      cpsTimeout = setTimeout(() => {
        if (cpsPopup) {
          cpsPopup.classList.remove('show');
          setTimeout(() => {
            if (cpsPopup && !cpsPopup.classList.contains('show')) {
              cpsPopup.remove();
              cpsPopup = null;
            }
          }, 150);
        }
      }, 1000);
    }
  };

  document.addEventListener('click', handleBodyClick);

  // ==========================================================================
  // HERO CURSOR-DRIFT & FLOATING PARALLAX
  // ==========================================================================
  const hero = document.querySelector('.hero-entrance');
  const floaters = document.querySelectorAll('.floating-pixel-obj');

  if (hero && floaters.length) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const moveX = (e.clientX - centerX) * 0.05;
      const moveY = (e.clientY - centerY) * 0.05;

      floaters.forEach((floater, idx) => {
        const factor = (idx + 1) * 0.45;
        const driftX = Math.round(moveX * factor);
        const driftY = Math.round(moveY * factor);
        floater.style.transform = `translate(${driftX}px, ${driftY}px)`;
      });
    });

    hero.addEventListener('mouseleave', () => {
      floaters.forEach(floater => {
        floater.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ==========================================================================
  // TOP-DOWN MAP NAVIGATION ZOOM & CLOUD SWEEP
  // ==========================================================================
  const isoMap = document.getElementById('isometricMap');
  const landmarks = document.querySelectorAll('.map-landmark');
  const cloudOverlay = document.getElementById('pixelCloudOverlay');

  if (isoMap && landmarks.length) {
    const playSound = (type) => {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioCtx.currentTime;
        if (type === 'throw') {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(180, now);
          osc.frequency.exponentialRampToValueAtTime(50, now + 0.18);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.linearRampToValueAtTime(0.01, now + 0.18);
          osc.start();
          osc.stop(now + 0.18);
        } else if (type === 'teleport') {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(600, now);
          osc.frequency.exponentialRampToValueAtTime(2200, now + 0.3);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
          osc.start();
          osc.stop(now + 0.3);

          const osc2 = audioCtx.createOscillator();
          const gain2 = audioCtx.createGain();
          osc2.connect(gain2);
          gain2.connect(audioCtx.destination);
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(1400, now + 0.05);
          osc2.frequency.exponentialRampToValueAtTime(3000, now + 0.3);
          gain2.gain.setValueAtTime(0.1, now + 0.05);
          gain2.gain.linearRampToValueAtTime(0.01, now + 0.3);
          osc2.start();
          osc2.stop(now + 0.3);
        }
      } catch (err) {
        console.warn("Web AudioContext blocked/failed:", err);
      }
    };

    landmarks.forEach(landmark => {
      landmark.addEventListener('click', (e) => {
        e.preventDefault();
        
        const url = landmark.getAttribute('data-url');
        if (!url) return;

        if (isoMap.classList.contains('zoom-active')) return;

        const node = landmark.querySelector('.map-landmark-node');
        if (!node) return;

        const targetX = parseFloat(node.getAttribute('cx'));
        const targetY = parseFloat(node.getAttribute('cy'));

        const wrapper = document.querySelector('.map-viewport-wrapper');
        if (!wrapper) return;

        const wrapperRect = wrapper.getBoundingClientRect();
        const scaleX = wrapperRect.width / 800;
        const scaleY = wrapperRect.height / 460;

        const startX = wrapperRect.width / 2;
        const startY = wrapperRect.height;
        const endX = targetX * scaleX;
        const endY = targetY * scaleY;

        const pearl = document.createElement('img');
        pearl.src = 'images/ender-pearl.png';
        pearl.className = 'ender-pearl-projectile';
        pearl.style.left = startX + 'px';
        pearl.style.top = startY + 'px';
        wrapper.appendChild(pearl);

        playSound('throw');

        const startTime = performance.now();
        const duration = 650;
        const peakHeight = 150;

        const animatePearl = (time) => {
          let elapsed = time - startTime;
          let t = Math.min(elapsed / duration, 1);

          const x = startX + (endX - startX) * t;
          const y = startY + (endY - startY) * t - peakHeight * Math.sin(t * Math.PI);

          pearl.style.left = x + 'px';
          pearl.style.top = y + 'px';
          pearl.style.transform = `translate(-50%, -50%) rotate(${t * 720}deg)`;

          if (t < 1) {
            const numParticles = Math.random() < 0.6 ? 2 : 1;
            for (let i = 0; i < numParticles; i++) {
              const sparkle = document.createElement('div');
              sparkle.className = 'ender-sparkle purple';
              sparkle.style.left = (x + (Math.random() * 16 - 8)) + 'px';
              sparkle.style.top = (y + (Math.random() * 16 - 8)) + 'px';
              wrapper.appendChild(sparkle);
              setTimeout(() => sparkle.remove(), 450);
            }
          }

          if (t < 1) {
            requestAnimationFrame(animatePearl);
          } else {
            pearl.remove();
            playSound('teleport');

            const percentX = (targetX / 800) * 100;
            const percentY = (targetY / 460) * 100;
            isoMap.style.transformOrigin = `${percentX}% ${percentY}%`;
            isoMap.style.transform = 'scale(5.5)';
            isoMap.classList.add('zoom-active');

            if (cloudOverlay) {
              setTimeout(() => {
                cloudOverlay.classList.add('active');
              }, 120);
            }

            setTimeout(() => {
              window.location.href = url;
            }, 680);
          }
        };

        requestAnimationFrame(animatePearl);
      });
    });

  }

  // Add click interceptor on navigation links to trigger transition clouds
  const navLinks = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="javascript"])');
  navLinks.forEach(link => {
    if (link.closest('.map-landmark')) return;
    
    link.addEventListener('click', (e) => {
      const url = link.getAttribute('href');
      if (!url || url === 'index.html' && window.location.pathname.endsWith('index.html')) return;
      
      e.preventDefault();
      if (cloudOverlay) {
        cloudOverlay.classList.add('active');
      }
      setTimeout(() => {
        window.location.href = url;
      }, 650);
    });
  });

  // ==========================================================================
  // REAL-TIME WPM AVERAGE READING SPEED & COMPLETION PERCENTAGE ESTIMATOR
  // ==========================================================================
  const wpmValEl = document.getElementById('wpmValue');
  const paceValEl = document.getElementById('paceValue');
  const wpmProgressBar = document.getElementById('wpmProgressBar');

  if (wpmValEl && paceValEl && wpmProgressBar) {
    const pageLoadTime = Date.now();
    const textContent = document.body.innerText || "";
    const totalWords = textContent.split(/\s+/).filter(w => w.length > 1).length || 300;

    const updateReadingSpeed = () => {
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = window.scrollY;
      const scrollPercent = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      
      wpmProgressBar.style.width = `${scrollPercent * 100}%`;

      const elapsedMinutes = (Date.now() - pageLoadTime) / 60000;
      const wordsRead = Math.round(scrollPercent * totalWords);
      const progressPercent = Math.round(scrollPercent * 100);

      // Display Completion percentage instead of pace
      paceValEl.textContent = `COMPLETED: ${progressPercent}%`;

      if (currentScroll > 50 && elapsedMinutes > 0.04) {
        const wpm = Math.round(wordsRead / elapsedMinutes);
        wpmValEl.textContent = `${wpm} WPM`;
      } else {
        wpmValEl.textContent = '--- WPM';
      }
    };

    window.addEventListener('scroll', updateReadingSpeed);
    updateReadingSpeed();
  }

  // ==========================================================================
  // SCROLL REVEAL OBSERVER (STEPPED SCALE)
  // ==========================================================================
  const initScrollReveal = () => {
    const revealTargets = document.querySelectorAll(
      '.chapter-strip, .campuses-grid .campus-item, .leadership-grid .leader-card, ' +
      '.editorial-columns .editorial-col, .product-showcase .product-card, ' +
      '.timeline-outer .timeline-item, .subjects-dual-columns .cycle-column, ' +
      '.common-subjects-tabs .sub-card, .dossier-container, .decoders-grid .decoder-card, ' +
      '.credits-intro, .table-panel, .gpa-calculator-box, .story-events .story-card, ' +
      '.seals-grid .seal-card, .checklist-box, .ornamental-divider'
    );

    revealTargets.forEach(el => el.classList.add('scroll-reveal'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -20px 0px'
    });

    revealTargets.forEach(el => observer.observe(el));
  };
  initScrollReveal();

  // ==========================================================================
  // DYNAMIC CYCLE GPA ESTIMATOR WITH BUBBLY GRADE STEPPERS
  // ==========================================================================
  const gpaForm = document.getElementById('gpaForm');
  const gpaOutput = document.getElementById('gpaOutput');
  const gpaCalculatorRows = document.getElementById('gpaCalculatorRows');

  const physicsCycleSubjects = [
    { name: "Mathematics I (M1)", credits: 4 },
    { name: "Engineering Physics", credits: 5 },
    { name: "Basic Mechanical Eng", credits: 4 },
    { name: "Basic Electrical Eng", credits: 4 },
    { name: "Environmental Studies (EVS)", credits: 2 },
    { name: "Problem Solving with Python", credits: 5 }
  ];

  const chemistryCycleSubjects = [
    { name: "Mathematics II (M2)", credits: 4 },
    { name: "Engineering Chemistry", credits: 5 },
    { name: "Mechanical Statistics", credits: 4 },
    { name: "Electronic Principles", credits: 4 },
    { name: "Constitution of India", credits: 2 },
    { name: "Problem Solving with C", credits: 5 }
  ];

  const grades = ['F', 'E', 'D', 'C', 'B', 'A', 'S'];

  const calculateGPA = () => {
    if (!gpaCalculatorRows || !gpaOutput) return;

    const activeToggle = document.querySelector('.cycle-toggle.active');
    const cycle = activeToggle ? activeToggle.getAttribute('data-cycle') : 'physics';
    const subjects = cycle === 'physics' ? physicsCycleSubjects : chemistryCycleSubjects;

    let totalPoints = 0;
    let totalCredits = 0;

    const valEls = gpaCalculatorRows.querySelectorAll('.grade-stepper-val');
    valEls.forEach((valEl, idx) => {
      const grade = valEl.textContent;
      const sub = subjects[idx];
      if (sub) {
        let points = 0;
        switch(grade) {
          case 'S': points = 10; break;
          case 'A': points = 9; break;
          case 'B': points = 8; break;
          case 'C': points = 7; break;
          case 'D': points = 6; break;
          case 'E': points = 5; break;
          case 'F': points = 0; break;
        }
        totalPoints += (sub.credits * points);
        totalCredits += sub.credits;
      }
    });

    if (totalCredits > 0) {
      const sgpa = totalPoints / totalCredits;
      gpaOutput.textContent = sgpa.toFixed(2);
    } else {
      gpaOutput.textContent = '0.00';
    }
  };

  const bindStepperListeners = () => {
    const minusBtns = document.querySelectorAll('.minus-btn');
    const plusBtns = document.querySelectorAll('.plus-btn');

    minusBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.getAttribute('data-index');
        const valEl = document.querySelector(`.grade-stepper-val[data-index="${idx}"]`);
        if (valEl) {
          const currentGrade = valEl.textContent;
          let gradeIdx = grades.indexOf(currentGrade);
          if (gradeIdx > 0) {
            valEl.textContent = grades[gradeIdx - 1];
            calculateGPA();
          }
        }
      });
    });

    plusBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.getAttribute('data-index');
        const valEl = document.querySelector(`.grade-stepper-val[data-index="${idx}"]`);
        if (valEl) {
          const currentGrade = valEl.textContent;
          let gradeIdx = grades.indexOf(currentGrade);
          if (gradeIdx < grades.length - 1) {
            valEl.textContent = grades[gradeIdx + 1];
            calculateGPA();
          }
        }
      });
    });
  };

  const renderGPACalculator = (cycle) => {
    if (!gpaCalculatorRows) return;

    const subjects = cycle === 'physics' ? physicsCycleSubjects : chemistryCycleSubjects;
    gpaCalculatorRows.innerHTML = '';

    subjects.forEach((sub, index) => {
      const row = document.createElement('div');
      row.className = 'calc-row';
      row.innerHTML = `
        <span style="font-weight: 700; font-size: 0.95rem; color: #ffffff;">${sub.name}</span>
        <span class="calc-row-credits">Credits: ${sub.credits}</span>
        
        <div class="grade-stepper-container">
          <button class="btn-stepper minus-btn" type="button" data-index="${index}" aria-label="Decrease Grade">-</button>
          <span class="grade-stepper-val" data-index="${index}">A</span>
          <button class="btn-stepper plus-btn" type="button" data-index="${index}" aria-label="Increase Grade">+</button>
        </div>
      `;
      gpaCalculatorRows.appendChild(row);
    });

    bindStepperListeners();
    calculateGPA();
  };

  // Initialize cycle selector event listeners
  const cycleToggles = document.querySelectorAll('.cycle-toggle');
  cycleToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      cycleToggles.forEach(t => t.classList.remove('active'));
      toggle.classList.add('active');
      const cycle = toggle.getAttribute('data-cycle');
      renderGPACalculator(cycle);
    });
  });

  // Initial calculation run
  if (gpaCalculatorRows) {
    const activeToggle = document.querySelector('.cycle-toggle.active');
    const initCycle = activeToggle ? activeToggle.getAttribute('data-cycle') : 'physics';
    renderGPACalculator(initCycle);
  }

  // ==========================================================================
  // GLOBAL SEARCH OVERLAY & RESULTS GENERATOR
  // ==========================================================================
  const searchOverlay = document.getElementById('searchOverlay');
  const closeSearch = document.getElementById('closeSearch');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  if (searchBtn && searchOverlay && closeSearch) {
    searchBtn.addEventListener('click', () => {
      searchOverlay.classList.add('active');
      searchInput.value = '';
      renderSearchResults('');
      setTimeout(() => searchInput.focus(), 100);
    });

    closeSearch.addEventListener('click', () => {
      searchOverlay.classList.remove('active');
    });

    searchInput.addEventListener('input', (e) => {
      renderSearchResults(e.target.value);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchBtn.click();
      }
    });
  }

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function renderSearchResults(query) {
    if (!searchResults) return;
    searchResults.innerHTML = '';

    if (!query.trim()) {
      searchResults.innerHTML = '<div style="text-align: center; color: var(--color-text-muted); padding: 2rem; font-family: var(--font-pixel);">Type to search the entire handbook...</div>';
      return;
    }

    const normalizedQuery = query.toLowerCase().trim();
    // Reference global searchIndex (loaded from js/search-index.js)
    const activeIndex = typeof searchIndex !== 'undefined' ? searchIndex : [];
    const filtered = activeIndex.filter(ch => 
      ch.title.toLowerCase().includes(normalizedQuery) || 
      ch.desc.toLowerCase().includes(normalizedQuery) ||
      ch.num.toLowerCase().includes(normalizedQuery) ||
      ch.content.toLowerCase().includes(normalizedQuery)
    );

    if (filtered.length === 0) {
      searchResults.innerHTML = '<div style="text-align: center; color: var(--color-text-muted); padding: 2rem; font-family: var(--font-pixel);">No matching results found.</div>';
      return;
    }

    filtered.forEach(ch => {
      let snippet = ch.desc;
      const contentLower = ch.content.toLowerCase();
      const queryIdx = contentLower.indexOf(normalizedQuery);

      if (queryIdx !== -1) {
        const start = Math.max(0, queryIdx - 60);
        const end = Math.min(ch.content.length, queryIdx + normalizedQuery.length + 60);
        let slice = ch.content.slice(start, end);
        
        if (start > 0) slice = '...' + slice;
        if (end < ch.content.length) slice = slice + '...';

        const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
        snippet = slice.replace(regex, '<mark style="background: var(--color-brass); color: var(--color-bg-deep); font-weight: bold; padding: 0.1rem 0.2rem;">$1</mark>');
      } else {
        const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
        snippet = snippet.replace(regex, '<mark style="background: var(--color-brass); color: var(--color-bg-deep); font-weight: bold; padding: 0.1rem 0.2rem;">$1</mark>');
      }

      const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
      const highlightedTitle = ch.title.replace(regex, '<mark style="background: var(--color-brass); color: var(--color-bg-deep); font-weight: bold; padding: 0.1rem 0.2rem;">$1</mark>');
      const highlightedNum = ch.num.replace(regex, '<mark style="background: var(--color-brass); color: var(--color-bg-deep); font-weight: bold; padding: 0.1rem 0.2rem;">$1</mark>');

      const item = document.createElement('a');
      item.href = ch.url;
      item.className = 'search-item';
      item.innerHTML = `
        <div class="search-item-num">${highlightedNum}</div>
        <div class="search-item-title">${highlightedTitle}</div>
        <div class="search-item-desc">${snippet}</div>
      `;
      searchResults.appendChild(item);
    });
  }

  // ==========================================================================
  // KEYBOARD PAGE NAVIGATION
  // ==========================================================================
  const prevLink = document.querySelector('.nav-footer-btn.prev-btn');
  const nextLink = document.querySelector('.nav-footer-btn.next-btn');

  document.addEventListener('keydown', (e) => {
    if (searchOverlay && searchOverlay.classList.contains('active')) return;
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'SELECT') return;

    if (e.key === 'ArrowLeft' && prevLink) {
      prevLink.click();
    } else if (e.key === 'ArrowRight' && nextLink) {
      nextLink.click();
    }
  });

  // ==========================================================================
  // TIMELINE INTERACTIVITY (EXAMINATIONS)
  // ==========================================================================
  const timelineNodes = document.querySelectorAll('.timeline-node');
  const timelineItems = document.querySelectorAll('.timeline-item');

  timelineNodes.forEach((node, idx) => {
    node.addEventListener('click', () => {
      timelineItems.forEach(item => item.classList.remove('active'));
      timelineItems[idx].classList.add('active');
      timelineItems[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  // ==========================================================================
  // TABS CONTROLLERS (SUBJECTS & LABS)
  // ==========================================================================
  const setupTabs = (navClass, paneClass) => {
    const tabTriggers = document.querySelectorAll(`.${navClass} .tab-trigger, .${navClass} .dossier-tab`);
    const tabPanes = document.querySelectorAll(`.${paneClass}`);

    tabTriggers.forEach((trigger, idx) => {
      trigger.addEventListener('click', () => {
        tabTriggers.forEach(t => t.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        trigger.classList.add('active');
        tabPanes[idx].classList.add('active');
      });
    });
  };

  setupTabs('tabs-nav', 'tab-pane');
  setupTabs('dossier-header-tabs', 'dossier-pane');

  // ==========================================================================
  // DECODER SYSTEM (SRN & PRN)
  // ==========================================================================
  const setupDecoder = (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const chunks = container.querySelectorAll('.code-chunk');
    const explanations = container.querySelectorAll('.explanation-block');

    chunks.forEach(chunk => {
      chunk.addEventListener('click', () => {
        chunks.forEach(c => c.classList.remove('active'));
        explanations.forEach(e => e.classList.remove('active'));

        chunk.classList.add('active');
        const targetId = chunk.getAttribute('data-target');
        const targetExp = container.querySelector(`#${targetId}`);
        if (targetExp) {
          targetExp.classList.add('active');
        }
      });
    });
  };

  setupDecoder('prnDecoderBox');
  setupDecoder('srnDecoderBox');

  // ==========================================================================
  // CHECKLIST LOGIC (BOOTSTRAP)
  // ==========================================================================
  const checklistItems = document.querySelectorAll('.checklist-item');
  checklistItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('checked');
    });
  });

  // ==========================================================================
  // PROGRAMMATIC SCROLL-TO-TOP BUTTON INJECTION
  // ==========================================================================
  const topBtn = document.createElement('button');
  topBtn.className = 'scroll-to-top-btn';
  topBtn.setAttribute('aria-label', 'Scroll to top');
  topBtn.innerHTML = '▲';
  document.body.appendChild(topBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  });

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
