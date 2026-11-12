// ==========================================================================
// capacitados.ar — Interactividad y Navegación del Prototipo (10 Pantallas)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const currentPage = document.body.getAttribute('data-page') || 'index.html';
  const cancelModal = document.getElementById('cancel-modal');

  function openCancelModal() {
    if (cancelModal) {
      cancelModal.setAttribute('data-open', 'true');
    } else {
      window.location.href = 'cancelacion.html';
    }
  }

  function closeCancelModal() {
    if (currentPage === 'cancelacion.html') {
      window.location.href = 'checkout-paso-2.html';
      return;
    }
    if (cancelModal) {
      cancelModal.setAttribute('data-open', 'false');
    }
  }

  // Close modal when clicking backdrop outside dialog
  if (cancelModal) {
    cancelModal.addEventListener('click', (e) => {
      if (e.target === cancelModal) {
        closeCancelModal();
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cancelModal && cancelModal.getAttribute('data-open') === 'true') {
      closeCancelModal();
    }
  });

  // Helper to get clean text of an element
  function cleanText(el) {
    return (el.textContent || '').replace(/\s+/g, ' ').trim();
  }

  // 1. Wire up Logo clicks to index.html
  document.querySelectorAll('[data-node-id="29:5103"], [data-name*="Link → capacitados.ar"]').forEach((logoEl) => {
    logoEl.setAttribute('data-interactive', 'true');
    logoEl.setAttribute('title', 'Ir a Inicio (index.html)');
    logoEl.addEventListener('click', (e) => {
      e.stopPropagation();
      window.location.href = 'index.html';
    });
  });

  // 1b. Responsive Hamburger Menu for Main Header on Tablet & Mobile (<= 900px)
  document.querySelectorAll('.site-header').forEach((header) => {
    const navBar = header.querySelector('[data-name="NavBarPrincipal"]');
    const headerInner = header.querySelector('.header-inner');
    if (!navBar || !headerInner) return;

    const menuBtn = document.createElement('button');
    menuBtn.type = 'button';
    menuBtn.className = 'mobile-menu-toggle';
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Abrir menú de navegación');

    const iconHamburger = '<svg class="menu-icon-bars" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" y1="7" x2="20" y2="7"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="17" x2="20" y2="17"></line></svg>';
    const iconClose = '<svg class="menu-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    menuBtn.innerHTML = `${iconHamburger}${iconClose}<span class="mobile-menu-label">Menú</span>`;

    // Insert button right after the logo so row 1 is [Logo ... Menú]
    const logo = headerInner.firstElementChild;
    if (logo && logo.nextSibling) {
      headerInner.insertBefore(menuBtn, logo.nextSibling);
    } else {
      headerInner.appendChild(menuBtn);
    }

    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = header.classList.toggle('mobile-menu-open');
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
      if (header.classList.contains('mobile-menu-open') && !header.contains(e.target)) {
        header.classList.remove('mobile-menu-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && header.classList.contains('mobile-menu-open')) {
        header.classList.remove('mobile-menu-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // 2. Wire up cancellation modal specific buttons via data-node-id / data-name
  document.querySelectorAll('[data-node-id="59:10775"], [data-node-id="59:10813"]').forEach((btn) => {
    btn.setAttribute('data-interactive', 'true');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeCancelModal();
    });
  });

  document.querySelectorAll('[data-node-id="59:10819"]').forEach((btn) => {
    btn.setAttribute('data-interactive', 'true');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = 'detalle-curso.html';
    });
  });

  // 3. Wire up buttons and links based on exact label text
  const candidates = document.querySelectorAll('a, button, [data-name*="Button"], [data-name*="Link"]');
  candidates.forEach((el) => {
    if (el.closest('.proto-dock')) return;
    if (el.hasAttribute('data-wired')) return;

    const txt = cleanText(el);
    const dname = el.getAttribute('data-name') || '';

    let route = null;
    let action = null;

    if (txt === 'Inicio') {
      route = 'index.html';
    } else if (
      txt === 'Explorar Cursos' ||
      txt.startsWith('Buscar Cursos') ||
      txt.startsWith('Explorar') && txt.length <= 16 ||
      txt.includes('Ver todas las 18 áreas') ||
      txt.includes('Volver al Explorador de Cursos')
    ) {
      route = 'explorar-cursos.html';
    } else if (txt === 'Academias' || txt === 'Comenzar a Publicar' || txt.includes('Adherir Centro de Formación')) {
      route = 'academias.html';
    } else if (
      txt.includes('Ver Cursos de la Fundación') ||
      txt.includes('Ver Talleres Municipales') ||
      txt.includes('Ver Convocatorias Samsung') ||
      txt.includes('Ver Oferta UTN FRRG') ||
      txt.includes('Ver Cursos UCES') ||
      txt.includes('Ver Cursos Gastronómicos') ||
      txt.includes('Ver Perfil de la Academia') ||
      txt === 'Fundación Mirgor' ||
      txt === 'Fundación Mirgor (Río Grande, TDF)'
    ) {
      route = 'academia-mirgor.html';
    } else if (
      txt === 'Ver Curso' ||
      txt === 'Ver Detalle' ||
      txt === 'Inscribirse' ||
      txt.includes('Control de Calidad en Líneas de Producción') ||
      txt.includes('Impresión 3D y Modelado para la Industria')
    ) {
      route = 'detalle-curso.html';
    } else if (
      txt.startsWith('Inscribirme') ||
      txt === 'Postularme a Beca de Estudio'
    ) {
      route = 'checkout-paso-1.html';
    } else if (txt.includes('Continuar a Medio de Pago')) {
      route = 'checkout-paso-2.html';
    } else if (txt.includes('Continuar a Revisión')) {
      route = 'checkout-paso-3.html';
    } else if (txt.includes('Confirmar Inscripción y Pagar')) {
      route = 'confirmacion.html';
    } else if (
      txt.includes('Modificar datos') ||
      txt.includes('Volver a editar') ||
      txt === '1. DATOS PERSONALES'
    ) {
      route = 'checkout-paso-1.html';
    } else if (
      txt.includes('Modificar pago') ||
      txt.includes('Volver a Medio de Pago') ||
      txt === '2. PAGO'
    ) {
      route = 'checkout-paso-2.html';
    } else if (txt.includes('Cancelar y volver al curso')) {
      action = openCancelModal;
    } else if (txt.includes('Volver al Curso')) {
      if (['checkout-paso-1.html', 'checkout-paso-2.html', 'checkout-paso-3.html'].includes(currentPage)) {
        action = openCancelModal;
      } else {
        route = 'detalle-curso.html';
      }
    } else if (dname.includes('Category Card')) {
      route = 'explorar-cursos.html';
    }

    if (route || action) {
      el.setAttribute('data-wired', 'true');
      el.setAttribute('data-interactive', 'true');
      if (el.tagName === 'A' && route) {
        el.setAttribute('href', route);
      }
      el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (action) action();
        else if (route) window.location.href = route;
      });
    }
  });

  // 4. Make Featured Category cards on Home page navigate to explorar-cursos.html
  document.querySelectorAll('[data-name="Section - Featured Categories Bento Grid"] a').forEach((card) => {
    const isGastroCard = cleanText(card).toLowerCase().includes('gastronomía');
    const targetHref = isGastroCard ? 'explorar-cursos.html?filtro=gastronomia' : 'explorar-cursos.html';
    card.setAttribute('data-wired', 'true');
    card.setAttribute('data-interactive', 'true');
    card.setAttribute('href', targetHref);
    card.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = targetHref;
    });
  });

  // 5. Make Input fields editable so the user can type into search bars and checkout forms
  document.querySelectorAll('[data-name="Input"], [data-name*="Input"]').forEach((inputBox) => {
    if (inputBox.tagName === 'INPUT' || inputBox.querySelector('input')) return;
    const textLeaf =
      inputBox.querySelector('p') ||
      inputBox.querySelector('[data-node-id]') ||
      inputBox;
    if (textLeaf) {
      textLeaf.setAttribute('contenteditable', 'true');
      textLeaf.setAttribute('spellcheck', 'false');
      textLeaf.classList.add('proto-input-editable');
      inputBox.style.cursor = 'text';
      inputBox.addEventListener('click', () => {
        textLeaf.focus();
      });
      textLeaf.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          textLeaf.blur();
          // If inside a search bar, go to explorar-cursos.html
          if (inputBox.closest('[data-name*="Search"]')) {
            window.location.href = 'explorar-cursos.html';
          }
        }
      });
    }
  });

  // Helper to reflow grid cards cleanly after filtering or sorting
  function reflowGridCards(grid, colsCount) {
    if (!grid) return 0;
    let visibleIdx = 0;
    Array.from(grid.children).forEach((card) => {
      card.classList.remove('col-1', 'col-2', 'col-3', 'row-1', 'row-2', 'row-3');
      if (card.style.display !== 'none') {
        const col = (visibleIdx % colsCount) + 1;
        const row = Math.floor(visibleIdx / colsCount) + 1;
        card.classList.add(`col-${col}`, `row-${row}`);
        visibleIdx++;
      }
    });
    return visibleIdx;
  }

  // 5b. Wire "Limpiar filtros" / "Reiniciar" / "Limpiar" buttons, Checkboxes, and Price Range slider
  const resultsCounterP = document.querySelector('[data-node-id="32:6324"] p');
  let activeSectorKeyword = '';

  // Helper to wire interactive buttons inside dynamically swapped course grids
  function wireCourseGridButtons(gridEl) {
    if (!gridEl) return;
    gridEl.querySelectorAll('[data-name*="Button"], a, button').forEach((el) => {
      const txt = cleanText(el);
      const dname = el.getAttribute('data-name') || '';
      if (dname === 'Button - Guardar curso') {
        el.setAttribute('data-interactive', 'true');
        el.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          el.classList.toggle('bookmark-saved');
        });
      } else if (txt === 'Ver Detalle' || txt === 'Ver Curso') {
        el.setAttribute('data-wired', 'true');
        el.setAttribute('data-interactive', 'true');
        el.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.location.href = 'detalle-curso.html';
        });
      }
    });
  }

  // Dedicated state transition for explorar-cursos.html:
  // Catálogo General (default) <-> Gastronomía Argentina (the ONLY filter that can be activated on explorar-cursos.html)
  const explorarCourseGrid = currentPage === 'explorar-cursos.html'
    ? document.querySelector('[data-node-id="32:6522"]')
    : null;
  const gastroCardsPool = document.getElementById('gastronomia-cards-pool');
  const generalCatalogHTML = explorarCourseGrid ? explorarCourseGrid.innerHTML : '';
  const gastronomiaCatalogHTML = gastroCardsPool ? gastroCardsPool.innerHTML : '';
  let isGastronomiaActive = false;

  function setGastronomiaFilter(active) {
    if (currentPage !== 'explorar-cursos.html' || !explorarCourseGrid) return;
    isGastronomiaActive = Boolean(active);

    const breadcrumbCurrentP = document.querySelector('[data-node-id="32:6272"] p');
    const headingP = document.querySelector('[data-node-id="32:6278"] p');
    const subtitleP = document.querySelector('[data-node-id="32:6280"] p');
    const searchPlaceholderP = document.querySelector('[data-node-id="32:6289"] p');
    const gastroChip = document.getElementById('gastronomia-chip');
    const todosPill = document.querySelector('[data-node-id="32:6296-todos"]');
    const gastroPill = document.querySelector('[data-node-id="32:6296"]');
    const gastroCheckbox = document.querySelector('input.real-checkbox[data-node-id="32:6452"]');

    if (breadcrumbCurrentP) {
      breadcrumbCurrentP.textContent = isGastronomiaActive ? 'Gastronomía Argentina' : 'Catálogo General';
    }
    if (headingP) {
      headingP.textContent = isGastronomiaActive
        ? 'Cursos y Talleres de Gastronomía & Cocina Argentina'
        : 'Explorar Cursos y Talleres en Tierra del Fuego';
    }
    if (subtitleP) {
      subtitleP.textContent = isGastronomiaActive
        ? 'Capacitaciones prácticas en panadería artesanal, asado criollo, cordero fueguino, pastelería, coctelería y manipulación de alimentos en Río Grande, Ushuaia y Tolhuin.'
        : 'Capacitaciones prácticas con certificación oficial en industria electrónica, tecnología, gastronomía argentina, oficios técnicos, negocios y diseño en Río Grande, Ushuaia y Tolhuin.';
    }
    if (searchPlaceholderP) {
      searchPlaceholderP.textContent = isGastronomiaActive
        ? 'Buscar en Gastronomía Argentina (ej: pan masa madre, pastelería, barismo, bromatología)...'
        : 'Buscar por curso, oficio, tecnología o academia (ej: Manufactura, PLC, Python, Cordero)...';
      searchPlaceholderP.parentElement.classList.remove('text-[#141e1b]');
      searchPlaceholderP.parentElement.classList.add('text-[#717975]');
    }
    if (resultsCounterP) {
      resultsCounterP.textContent = isGastronomiaActive
        ? '24 capacitaciones activas en Gastronomía Argentina'
        : '380 capacitaciones activas en Tierra del Fuego';
    }
    if (gastroChip) {
      gastroChip.style.display = isGastronomiaActive ? 'flex' : 'none';
    }

    // Update top pills with mutual exclusivity
    const horizontalPills = document.querySelector('[data-name="Horizontal Sector Pills"]');
    if (horizontalPills) {
      horizontalPills.querySelectorAll('div, button, a').forEach((p) => {
        p.classList.remove('bg-[#173b32]');
        p.classList.add('bg-[#e5f0eb]');
        p.querySelectorAll('p').forEach((t) => {
          t.classList.remove('text-white');
          t.classList.add('text-[#414845]');
        });
      });
      const activePill = isGastronomiaActive ? gastroPill : todosPill;
      if (activePill) {
        activePill.classList.remove('bg-[#e5f0eb]');
        activePill.classList.add('bg-[#173b32]');
        activePill.querySelectorAll('p').forEach((t) => {
          t.classList.remove('text-[#414845]');
          t.classList.add('text-white');
        });
      }
    }

    // Sync Gastronomía Argentina checkbox (32:6452) without blocking other static checkboxes
    if (gastroCheckbox) {
      gastroCheckbox.checked = isGastronomiaActive;
      const lbl = gastroCheckbox.closest('label');
      if (lbl) {
        lbl.classList.toggle('filter-label-active', isGastronomiaActive);
      }
    }

    // Swap Course Grid (3x3) between 9 General Catalog courses and 9 Gastronomía Argentina courses
    explorarCourseGrid.innerHTML = isGastronomiaActive ? gastronomiaCatalogHTML : generalCatalogHTML;
    reflowGridCards(explorarCourseGrid, 3);
    wireCourseGridButtons(explorarCourseGrid);
  }

  // Wire removable "Gastronomía Argentina ×" chip and breadcrumb "Explorar Cursos" on explorar-cursos.html
  const gastroChipEl = document.getElementById('gastronomia-chip');
  if (gastroChipEl) {
    gastroChipEl.setAttribute('data-interactive', 'true');
    gastroChipEl.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setGastronomiaFilter(false);
    });
  }
  const breadcrumbExplorar = document.querySelector('[data-node-id="32:6267"]');
  if (breadcrumbExplorar && currentPage === 'explorar-cursos.html') {
    breadcrumbExplorar.setAttribute('data-interactive', 'true');
    breadcrumbExplorar.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setGastronomiaFilter(false);
    });
  }

  // Static visual checkmark behavior for all checkboxes across all screens
  // (Only Gastronomía Argentina 32:6452 on explorar-cursos.html swaps the catalog view)
  document.querySelectorAll('input.real-checkbox').forEach((cb) => {
    const initLbl = cb.closest('label');
    if (initLbl && cb.checked && cb.closest('[data-name*="Sidebar Filters"]')) {
      initLbl.classList.add('filter-label-active');
    }
    cb.addEventListener('change', () => {
      const nid = cb.getAttribute('data-node-id');
      const lbl = cb.closest('label');
      if (lbl && cb.closest('[data-name*="Sidebar Filters"]')) {
        lbl.classList.toggle('filter-label-active', cb.checked);
      }
      if (currentPage === 'explorar-cursos.html' && nid === '32:6452') {
        setGastronomiaFilter(cb.checked);
      }
    });
  });

  document.querySelectorAll('[data-node-id="32:6335"], [data-node-id="32:6356"], [data-node-id="32:5565"], [data-node-id="32:5567"]').forEach((resetBtn) => {
    resetBtn.setAttribute('data-interactive', 'true');
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('[data-name*="Sidebar Filters"] input.real-checkbox').forEach((cb) => {
        cb.checked = false;
        const lbl = cb.closest('label');
        if (lbl) lbl.classList.remove('filter-label-active');
      });
      document.querySelectorAll('select.real-select').forEach((sel) => {
        sel.selectedIndex = 0;
        sel.classList.remove('select-has-value');
      });
      const rangeInput = document.querySelector('input.real-range');
      if (rangeInput) {
        rangeInput.value = '45000';
        rangeInput.dispatchEvent(new Event('input'));
      }
      if (currentPage === 'explorar-cursos.html') {
        setGastronomiaFilter(false);
      }
    });
  });

  const priceSlider = document.querySelector('input.real-range[data-node-id="32:5627"]');
  const priceLabelP = document.querySelector('[data-node-id="32:5625"] p');
  if (priceSlider && priceLabelP) {
    priceSlider.addEventListener('input', () => {
      const val = Number(priceSlider.value || 0);
      priceLabelP.textContent = val === 0 ? 'Gratis' : `$${val.toLocaleString('es-AR')} ARS`;
    });
  }

  // 5c. Interactive Sector, Location & Category Filter Pills across ALL screens (index, explorar-cursos, academias, academia-mirgor)
  const pillGroupSelector = [
    '[data-name="Horizontal Sector Pills"]',
    '[data-name="Category Filter Pills"]',
    '[data-name="Category & Modality Filter Tabs"]',
    '[data-name="Filtros por Categoría Temática Rápida"]',
    '[data-node-id="32:7106"]',
    '[data-name="Quick Search Chips"]'
  ].join(', ');

  document.querySelectorAll(pillGroupSelector).forEach((pillGroup) => {
    const isQuickSearch = (pillGroup.getAttribute('data-name') || '') === 'Quick Search Chips';
    const isWhiteDefault = pillGroup.getAttribute('data-node-id') === '32:7125';
    const isDfebe6Default = pillGroup.getAttribute('data-node-id') === '32:7106';
    const inactiveBg = isWhiteDefault ? 'bg-white' : (isDfebe6Default ? 'bg-[#dfebe6]' : 'bg-[#e5f0eb]');

    const pills = Array.from(pillGroup.children).filter((el) => {
      const dname = el.getAttribute('data-name') || '';
      return (el.tagName === 'DIV' || el.tagName === 'BUTTON' || el.tagName === 'A') && !dname.includes('Margin') && !dname.includes('Label:');
    });

    pills.forEach((pill) => {
      pill.setAttribute('data-interactive', 'true');
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const label = cleanText(pill).toLowerCase();

        // 1) On explorar-cursos.html, "Gastronomía Argentina" (32:6296) and "Todos los rubros" (32:6296-todos) toggle the Gastronomía catalog state
        if (pillGroup.getAttribute('data-name') === 'Horizontal Sector Pills') {
          const pnid = pill.getAttribute('data-node-id') || '';
          if (pnid === '32:6296') {
            setGastronomiaFilter(!isGastronomiaActive);
            return;
          } else if (pnid === '32:6296-todos') {
            setGastronomiaFilter(false);
            return;
          } else if (isGastronomiaActive) {
            setGastronomiaFilter(false);
          }
        }

        if (isQuickSearch) {
          const searchInputP = document.querySelector('[data-node-id="32:5390"] p');
          if (searchInputP) {
            searchInputP.textContent = cleanText(pill);
            searchInputP.parentElement.classList.remove('text-[#717975]');
            searchInputP.parentElement.classList.add('text-[#141e1b]');
          }
        }

        pills.forEach((p) => {
          p.classList.remove('bg-[#173b32]', 'bg-[#e5f0eb]', 'bg-[#dfebe6]', 'bg-white');
          p.classList.add(inactiveBg);
          p.querySelectorAll('[class*="text-white"]').forEach((t) => {
            t.classList.remove('text-white');
            t.classList.add('text-[#414845]');
          });
        });

        pill.classList.remove('bg-[#e5f0eb]', 'bg-[#dfebe6]', 'bg-white', 'bg-[rgba(229,240,235,0.7)]');
        pill.classList.add('bg-[#173b32]');
        pill.querySelectorAll('div, span').forEach((t) => {
          if (t.children.length === 1 && t.firstElementChild?.tagName === 'P') {
            t.classList.remove('text-[#414845]', 'text-[#141e1b]', 'text-[#00251d]', 'text-[#173b32]');
            t.classList.add('text-white');
          }
        });
      });
    });
  });

  // 5d. Visual active CSS state on all Select Lists when an option is chosen
  document.querySelectorAll('select.real-select').forEach((sel) => {
    sel.addEventListener('change', () => {
      sel.classList.toggle('select-has-value', sel.selectedIndex > 0);
    });
  });

  if (currentPage === 'explorar-cursos.html' && window.location.search.includes('gastronomia')) {
    setGastronomiaFilter(true);
  }

  // 5e. Interactive Payment Method Tabs (checkout-paso-2.html & cancelacion.html)
  document.querySelectorAll('[data-name="Payment Method Tabs"]').forEach((tabGroup) => {
    const tabs = Array.from(tabGroup.children);
    tabs.forEach((tab) => {
      tab.setAttribute('data-interactive', 'true');
      tab.addEventListener('click', () => {
        tabs.forEach((t) => {
          t.classList.remove('bg-[#e5f0eb]', 'drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]');
          t.classList.add('bg-[#ebf6f1]', 'opacity-85');
          const dot = t.querySelector('[data-node-id="39:9259"], [data-node-id="39:9279"], [data-node-id="39:9293"]');
          if (dot) {
            dot.className = 'bg-[#dae5e0] relative rounded-[9999px] shrink-0 size-[20px]';
            dot.innerHTML = '';
          }
        });
        tab.classList.remove('bg-[#ebf6f1]', 'opacity-85');
        tab.classList.add('bg-[#e5f0eb]', 'drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]');
        const activeDot = tab.querySelector('[data-node-id="39:9259"], [data-node-id="39:9279"], [data-node-id="39:9293"]');
        if (activeDot) {
          activeDot.className = 'bg-[#00251d] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[20px]';
          activeDot.innerHTML = '<div class="bg-white relative rounded-[9999px] shrink-0 size-[8px]"></div>';
        }
      });
    });
  });

  // 5f. Interactive Bookmark ("Guardar curso") & Pagination buttons
  document.querySelectorAll('[data-name="Button - Guardar curso"], [data-node-id="29:1639"]').forEach((bmBtn) => {
    bmBtn.setAttribute('data-interactive', 'true');
    bmBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      bmBtn.classList.toggle('bookmark-saved');
    });
  });

  document.querySelectorAll('[data-name="Pagination"]').forEach((pag) => {
    const btns = Array.from(pag.children).filter((el) => el.getAttribute('data-name') === 'Button');
    btns.forEach((btn) => {
      btn.setAttribute('data-interactive', 'true');
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const txt = cleanText(btn);
        if (!/^\d+$/.test(txt)) return;
        btns.forEach((b) => {
          if (/^\d+$/.test(cleanText(b))) {
            b.classList.remove('bg-[#173b32]', 'shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]');
            b.classList.add('bg-white');
            b.querySelectorAll('[class*="text-white"]').forEach((t) => {
              t.classList.remove('text-white');
              t.classList.add('text-[#414845]');
            });
          }
        });
        btn.classList.remove('bg-white');
        btn.classList.add('bg-[#173b32]');
        btn.querySelectorAll('div').forEach((t) => {
          if (t.children.length === 1 && t.firstElementChild?.tagName === 'P') {
            t.classList.remove('text-[#414845]');
            t.classList.add('text-white');
          }
        });
      });
    });
  });

  // 6. Interactive Syllabus Accordion on detalle-curso.html
  if (currentPage === 'detalle-curso.html') {
    const moduleDetails = [
      'recorrido práctico por layouts fabriles en Río Grande, balanceo de líneas de ensamble, takt time, estaciones de trabajo y estándares operativos en la industria electrónica fueguina.',
      'protocolos de descarga electrostática (pulseras, taloneras y mantas ESD), uso correcto de EPP en planta industrial, ergonomía e identificación de riesgos operativos.',
      'inspección visual bajo norma internacional IPC-A-610, criterios de aceptabilidad de soldadura SMD/THT, trazabilidad por código de barras/QR y registro de no conformidades.',
      'práctica integradora en línea modelo de Fundación Mirgor con herramental real, simulación de turno productivo y evaluación técnica final para certificación oficial.'
    ];
    let modIdx = 0;
    document.querySelectorAll('h4').forEach((h4) => {
      const card = h4.closest('.bg-\\[\\#ebf6f1\\], .bg-white');
      if (card && modIdx < moduleDetails.length) {
        const detailText = moduleDetails[modIdx++];
        card.setAttribute('data-interactive', 'true');
        const extra = document.createElement('div');
        extra.style.display = 'none';
        extra.style.padding = '12px 20px 16px 68px';
        extra.style.fontSize = '14px';
        extra.style.lineHeight = '22px';
        extra.style.color = '#414845';
        extra.style.borderTop = '1px solid rgba(193, 200, 196, 0.35)';
        extra.textContent = 'Contenido del módulo: ' + detailText;
        card.parentElement.appendChild(extra);
        card.addEventListener('click', () => {
          const isOpen = extra.style.display === 'block';
          extra.style.display = isOpen ? 'none' : 'block';
        });
      }
    });
  }

  // 7. Collapsible Filters Sidebar on screens smaller than PC (<= 1024px)
  document.querySelectorAll('[data-name="Aside - Left Sidebar Filters"]').forEach((aside) => {
    if (aside.querySelector('.mobile-filter-toggle')) return;

    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'mobile-filter-toggle';
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.innerHTML = '<svg class="inline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="18" x2="20" y2="18"></line><circle cx="8" cy="6" r="2" fill="currentColor"></circle><circle cx="16" cy="12" r="2" fill="currentColor"></circle><circle cx="10" cy="18" r="2" fill="currentColor"></circle></svg><span>Mostrar / Ocultar Filtros de Búsqueda</span>';

    const filterBody = document.createElement('div');
    filterBody.className = 'filters-body filters-collapsed-mobile';
    while (aside.firstChild) {
      filterBody.appendChild(aside.firstChild);
    }

    aside.appendChild(toggleBtn);
    aside.appendChild(filterBody);

    toggleBtn.addEventListener('click', () => {
      const isCollapsed = filterBody.classList.toggle('filters-collapsed-mobile');
      toggleBtn.setAttribute('aria-expanded', isCollapsed ? 'false' : 'true');
    });
  });

  // 8. Live countdown timer on reservation badges (08:41 / 14:32)
  document.querySelectorAll('span, p').forEach((el) => {
    const t = (el.textContent || '').trim();
    if (/^\d{2}:\d{2}$/.test(t) || /^\(\d{2}:\d{2}\)$/.test(t)) {
      const hasParens = t.startsWith('(');
      const clean = t.replace(/[()]/g, '');
      const parts = clean.split(':');
      let totalSec = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
      setInterval(() => {
        if (totalSec > 0) totalSec--;
        const m = String(Math.floor(totalSec / 60)).padStart(2, '0');
        const s = String(totalSec % 60).padStart(2, '0');
        el.textContent = hasParens ? `(${m}:${s})` : `${m}:${s}`;
      }, 1000);
    }
  });
});
