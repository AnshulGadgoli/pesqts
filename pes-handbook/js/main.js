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
  { num: "Chapter IX", title: "Bootstrap Induction", url: "bootstrap.html", desc: "Your induction into the campus life: color groups, mechanical, biotechnology, community service projects, and packing checklist." }
];

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // PIXEL CLOUD TRANSITION PAGE ENTRY (SLIDE AWAY)
  // ==========================================================================
  const cloudOverlay = document.getElementById('pixelCloudOverlay');
  if (cloudOverlay) {
    // Reveal page by sliding clouds out
    window.addEventListener('load', () => {
      setTimeout(() => {
        cloudOverlay.classList.remove('active');
      }, 100);
    });
    // Fallback safe release
    setTimeout(() => {
      cloudOverlay.classList.remove('active');
    }, 400);
  }

  // Safe release of page loader curtain
  const pageLoader = document.getElementById('pageLoader');
  if (pageLoader) {
    window.addEventListener('load', () => {
      pageLoader.classList.add('hide');
    });
    setTimeout(() => {
      pageLoader.classList.add('hide');
    }, 450);
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
    // Filter clicks within the last 1 second
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

  if (isoMap && landmarks.length) {
    landmarks.forEach(landmark => {
      landmark.addEventListener('click', (e) => {
        e.preventDefault();
        
        const url = landmark.getAttribute('data-url');
        if (!url) return;

        const rect = landmark.getBoundingClientRect();
        const mapRect = isoMap.getBoundingClientRect();

        const clickX = rect.left - mapRect.left + (rect.width / 2);
        const clickY = rect.top - mapRect.top + (rect.height / 2);

        const percentX = (clickX / mapRect.width) * 100;
        const percentY = (clickY / mapRect.height) * 100;

        isoMap.style.transformOrigin = `${percentX}% ${percentY}%`;
        isoMap.style.transform = 'scale(5)';
        isoMap.classList.add('zoom-active');

        if (cloudOverlay) {
          setTimeout(() => {
            cloudOverlay.classList.add('active');
          }, 150);
        }

        setTimeout(() => {
          window.location.href = url;
        }, 750);
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
  // COOL UI CUSTOM DROPDOWNS (SELECT SELECTORS) & SGPA RE-CALCULATION
  // ==========================================================================
  const gpaForm = document.getElementById('gpaForm');
  const gpaOutput = document.getElementById('gpaOutput');

  const calculateGPA = () => {
    if (!gpaForm || !gpaOutput) return;

    const rows = gpaForm.querySelectorAll('.calc-row');
    let totalPoints = 0;
    let totalCredits = 0;

    rows.forEach(row => {
      const creditInput = row.querySelector('.calc-input');
      const selectEl = row.querySelector('select');
      if (creditInput && selectEl) {
        const credits = parseFloat(creditInput.value) || 0;
        const grade = selectEl.value;
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

        totalPoints += (credits * points);
        totalCredits += credits;
      }
    });

    if (totalCredits > 0) {
      const sgpa = totalPoints / totalCredits;
      gpaOutput.textContent = sgpa.toFixed(2);
    } else {
      gpaOutput.textContent = '0.00';
    }
  };

  const initCustomSelects = () => {
    const selectContainers = document.querySelectorAll('.custom-select-container');

    selectContainers.forEach(container => {
      const trigger = container.querySelector('.custom-select-trigger');
      const options = container.querySelectorAll('.custom-option');
      const nativeSelect = container.querySelector('select');

      if (!trigger || !options.length) return;

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        selectContainers.forEach(c => {
          if (c !== container) c.classList.remove('active');
        });
        container.classList.toggle('active');
      });

      options.forEach(option => {
        option.addEventListener('click', (e) => {
          e.stopPropagation();

          options.forEach(o => o.classList.remove('selected'));
          option.classList.add('selected');

          const text = option.textContent;
          const val = option.getAttribute('data-value');

          trigger.textContent = text;

          if (nativeSelect) {
            nativeSelect.value = val;
            nativeSelect.dispatchEvent(new Event('change', { bubbles: true }));
          }

          container.classList.remove('active');
        });
      });
    });

    document.addEventListener('click', () => {
      selectContainers.forEach(c => c.classList.remove('active'));
    });
  };

  initCustomSelects();

  if (gpaForm && gpaOutput) {
    gpaForm.querySelectorAll('.calc-input').forEach(input => {
      input.addEventListener('input', calculateGPA);
    });
    gpaForm.querySelectorAll('select').forEach(sel => {
      sel.addEventListener('change', calculateGPA);
    });
    // Initial run
    calculateGPA();
  }

  // ==========================================================================
  // GLOBAL SEARCH OVERLAY & RESULTS GENERATOR
  // ==========================================================================
  const searchBtn = document.getElementById('searchBtn');
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

  function renderSearchResults(query) {
    if (!searchResults) return;
    searchResults.innerHTML = '';
    
    const filtered = handbookChapters.filter(ch => 
      ch.title.toLowerCase().includes(query.toLowerCase()) || 
      ch.desc.toLowerCase().includes(query.toLowerCase()) ||
      ch.num.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) {
      searchResults.innerHTML = '<div style="text-align: center; color: var(--color-text-muted); padding: 2rem; font-family: var(--font-pixel);">No matching chapters found.</div>';
      return;
    }

    filtered.forEach(ch => {
      const item = document.createElement('a');
      item.href = ch.url;
      item.className = 'search-item';
      item.innerHTML = `
        <div class="search-item-num">${ch.num}</div>
        <div class="search-item-title">${ch.title}</div>
        <div class="search-item-desc">${ch.desc}</div>
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
});
