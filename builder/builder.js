/**
 * builder.js
 * ------------------------------------------------------------------
 * Street Smart Business Lab — Opportunity Builder (internal tool).
 *
 * Contract this file honors:
 *   - js/filters-config.js is the ONLY source of filter labels/codes.
 *     Nothing here hand-types a code.
 *   - Exported opportunity objects match DATA_SCHEMA.md exactly, so
 *     they can be dropped straight into data/ and registered in
 *     data/manifest.json for the Explorer (explore.html) to load.
 *   - The HTML/CSS markup this file renders for table rows and
 *     checkbox groups follows the contract documented at the top of
 *     builder.css ("CSS/JS CONTRACT").
 *
 * Storage:
 *   localStorage['ssbl_builder_opportunities']  -> JSON array of opportunities
 *   localStorage['ssbl_builder_id_counter']     -> highest ID number issued so far
 *
 * ID rule: OP00001, OP00002, ... — the counter only ever increases.
 * Deleting an opportunity never frees its ID or lowers the counter.
 *
 * Slug rule: generated from the title once, at creation, then frozen.
 * Editing a title never silently changes the slug (there is no
 * "regenerate slug" control in this UI on purpose — see README).
 * ------------------------------------------------------------------
 */

(function () {
  'use strict';

  var STORAGE_KEY_DATA = 'ssbl_builder_opportunities';
  var STORAGE_KEY_COUNTER = 'ssbl_builder_id_counter';

  var FILTERS = (window.StreetSmartFilters && window.StreetSmartFilters.FILTERS) || null;
  var labelFor = (window.StreetSmartFilters && window.StreetSmartFilters.labelFor) || function (dim, code) { return code; };
  var slugify = (window.StreetSmartFilters && window.StreetSmartFilters.slugify) || function (s) {
    return String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  };

  if (!FILTERS) {
    // filters-config.js failed to load — nothing in this tool can work
    // safely without it, since it's the single source of truth for codes.
    document.addEventListener('DOMContentLoaded', function () {
      var banner = document.getElementById('statusBanner');
      if (banner) {
        banner.textContent = 'filters-config.js did not load. Check that builder.html is inside a folder next to js/filters-config.js (../js/filters-config.js).';
        banner.className = 'status-banner status-banner--error';
        banner.hidden = false;
      }
    });
    return;
  }

  // Checkbox-group dimensions (multi-select).
  var CHECKBOX_GROUPS = [
    { key: 'industry', groupId: 'groupIndustry' },
    { key: 'businessModel', groupId: 'groupBusinessModel' },
    { key: 'opportunityType', groupId: 'groupOpportunityType' },
    { key: 'access', groupId: 'groupAccess' },
    { key: 'scale', groupId: 'groupScale' },
    { key: 'stage', groupId: 'groupStage' },
    { key: 'resources', groupId: 'groupResources' }
  ];

  // Single-select <select> dimensions.
  var SELECT_FIELDS = [
    { key: 'capital', selectId: 'fieldCapital', excludeCodes: ['unknown'] },
    { key: 'difficulty', selectId: 'fieldDifficulty', excludeCodes: ['all'] },
    { key: 'workLocation', selectId: 'fieldWorkLocation', excludeCodes: [] },
    { key: 'time', selectId: 'fieldTime', excludeCodes: [] },
    { key: 'team', selectId: 'fieldTeam', excludeCodes: [] },
    { key: 'customer', selectId: 'fieldCustomer', excludeCodes: [] }
  ];

  // ---- State ---------------------------------------------------------

  var opportunities = [];
  var idCounter = 0;

  var listState = {
    search: '',
    industry: '',
    difficulty: '',
    page: 1,
    pageSize: 50
  };

  var formState = {
    mode: null,       // 'create' | 'edit'
    editingId: null
  };

  var pendingDeleteId = null;

  // ---- DOM refs (populated on init) ----------------------------------

  var dom = {};

  function cacheDom() {
    var ids = [
      'statusBanner', 'recordCount', 'addIdeaBtn', 'listSearch',
      'filterIndustry', 'filterDifficulty', 'clearListFiltersBtn',
      'importBtn', 'importFileInput', 'exportBtn',
      'opTableBody', 'emptyState', 'emptyStateHeading', 'emptyStateBody',
      'tableInfo', 'prevPageBtn', 'pageIndicator', 'nextPageBtn', 'pageSizeSelect',
      'formOverlay', 'formTitle', 'formCloseBtn', 'opForm',
      'opId', 'opSlug', 'opCreatedAt', 'formIdLine', 'formIdDisplay', 'formSlugDisplay',
      'fieldTitle', 'fieldShortDesc', 'fieldFullDesc', 'fieldTags',
      'fieldCapital', 'fieldDifficulty', 'fieldWorkLocation', 'fieldTime', 'fieldTeam', 'fieldCustomer',
      'formErrors', 'formCancelBtn', 'saveAndNewCheck', 'formSaveBtn',
      'importOverlay', 'importSummary', 'importCloseBtn', 'importOkBtn',
      'exportOverlay', 'exportCountHint', 'exportFilename', 'manifestHelper', 'manifestSnippet',
      'copyManifestBtn', 'exportCloseBtn', 'exportCancelBtn', 'exportConfirmBtn',
      'deleteOverlay', 'deleteMessage', 'deleteCancelBtn', 'deleteConfirmBtn'
    ];
    ids.forEach(function (id) { dom[id] = document.getElementById(id); });
    CHECKBOX_GROUPS.forEach(function (g) { dom[g.groupId] = document.getElementById(g.groupId); });
  }

  // ---- Utilities -------------------------------------------------------

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function debounce(fn, wait) {
    var t;
    return function () {
      var args = arguments, ctx = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(ctx, args); }, wait);
    };
  }

  function formatDate(iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function formatNumber(n) {
    if (n == null) return '';
    return Number(n).toLocaleString('en-US');
  }

  function capitalLabel(capital) {
    if (!capital) return '—';
    var code = capital.codes && capital.codes[0];
    if (code) {
      var opt = FILTERS.capital.filter(function (c) { return c.code === code; })[0];
      if (opt) return opt.label;
    }
    var min = capital.min != null ? '৳' + formatNumber(capital.min) : '৳0';
    var max = capital.max != null ? formatNumber(capital.max) : '+';
    return min + '–' + max;
  }

  function sanitizeFilename(name) {
    return String(name || '')
      .trim()
      .replace(/\.json$/i, '')
      .replace(/[^a-zA-Z0-9\-_ ]+/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // ---- Persistence -------------------------------------------------

  function loadData() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY_DATA);
      opportunities = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(opportunities)) opportunities = [];
    } catch (e) {
      console.error('[builder] Could not read stored opportunities, starting empty:', e);
      opportunities = [];
    }

    try {
      idCounter = parseInt(localStorage.getItem(STORAGE_KEY_COUNTER), 10) || 0;
    } catch (e) {
      idCounter = 0;
    }
    // Safety net: if the counter was ever lost, never regenerate an ID
    // that collides with data actually on record.
    opportunities.forEach(function (o) {
      var m = /^OP(\d+)$/.exec(o.id || '');
      if (m) idCounter = Math.max(idCounter, parseInt(m[1], 10));
    });
  }

  function persistData() {
    try {
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(opportunities));
    } catch (e) {
      showStatus('Could not save to browser storage (it may be full). Your latest change may be lost on refresh.', 'error');
      console.error('[builder] localStorage write failed:', e);
    }
  }

  function persistCounter() {
    try {
      localStorage.setItem(STORAGE_KEY_COUNTER, String(idCounter));
    } catch (e) {
      console.error('[builder] Could not persist ID counter:', e);
    }
  }

  // ---- ID / slug generation -----------------------------------------

  function generateId() {
    var id;
    do {
      idCounter += 1;
      id = 'OP' + String(idCounter).padStart(5, '0');
    } while (opportunities.some(function (o) { return o.id === id; }));
    persistCounter();
    return id;
  }

  function generateSlug(title, excludeId) {
    var base = slugify(title) || 'opportunity';
    var slug = base;
    var n = 2;
    while (opportunities.some(function (o) { return o.slug === slug && o.id !== excludeId; })) {
      slug = base + '-' + n;
      n += 1;
    }
    return slug;
  }

  // ---- Status banner --------------------------------------------------

  var statusTimer = null;

  function showStatus(message, type) {
    if (!dom.statusBanner) return;
    clearTimeout(statusTimer);
    dom.statusBanner.textContent = message;
    dom.statusBanner.className = 'status-banner status-banner--' + (type || 'success');
    dom.statusBanner.hidden = false;
    if (type !== 'error') {
      statusTimer = setTimeout(function () { dom.statusBanner.hidden = true; }, 5000);
    }
  }

  // ---- Form: option rendering (once, at init) -------------------------

  function renderCheckboxGroup(groupId, dimensionKey) {
    var container = dom[groupId];
    if (!container) return;
    var options = FILTERS[dimensionKey] || [];

    var optionsHtml = options.map(function (opt) {
      return '<label class="checkbox-option">' +
        '<input type="checkbox" value="' + escapeHtml(opt.code) + '">' +
        '<span>' + escapeHtml(opt.label) + '</span>' +
        '</label>';
    }).join('');

    container.innerHTML =
      '<div class="group-search-wrap">' +
        '<input type="text" class="group-search" placeholder="Filter…" aria-label="Filter options">' +
        '<span class="group-selected-count">0 selected</span>' +
      '</div>' +
      '<div class="group-scroll">' + optionsHtml + '</div>';
  }

  function renderSelectField(selectId, dimensionKey, excludeCodes) {
    var select = dom[selectId];
    if (!select) return;
    var options = (FILTERS[dimensionKey] || []).filter(function (opt) {
      return excludeCodes.indexOf(opt.code) === -1;
    });
    // Keep the existing first placeholder <option>, append the rest.
    var placeholder = select.querySelector('option');
    select.innerHTML = '';
    if (placeholder) select.appendChild(placeholder);
    options.forEach(function (opt) {
      var o = document.createElement('option');
      o.value = opt.code;
      o.textContent = opt.label;
      select.appendChild(o);
    });
  }

  function populateFormOptionsOnce() {
    CHECKBOX_GROUPS.forEach(function (g) { renderCheckboxGroup(g.groupId, g.key); });
    SELECT_FIELDS.forEach(function (f) { renderSelectField(f.selectId, f.key, f.excludeCodes); });
  }

  function populateListFilterDropdowns() {
    var industryPlaceholder = dom.filterIndustry.querySelector('option');
    dom.filterIndustry.innerHTML = '';
    dom.filterIndustry.appendChild(industryPlaceholder);
    FILTERS.industry.forEach(function (opt) {
      var o = document.createElement('option');
      o.value = opt.code;
      o.textContent = opt.label;
      dom.filterIndustry.appendChild(o);
    });

    var difficultyPlaceholder = dom.filterDifficulty.querySelector('option');
    dom.filterDifficulty.innerHTML = '';
    dom.filterDifficulty.appendChild(difficultyPlaceholder);
    FILTERS.difficulty.filter(function (opt) { return opt.code !== 'all'; }).forEach(function (opt) {
      var o = document.createElement('option');
      o.value = opt.code;
      o.textContent = opt.label;
      dom.filterDifficulty.appendChild(o);
    });
  }

  // ---- Form: group checked-state helpers -------------------------------

  function getCheckedValues(groupId) {
    var container = dom[groupId];
    if (!container) return [];
    return Array.prototype.slice.call(container.querySelectorAll('input[type="checkbox"]:checked'))
      .map(function (cb) { return cb.value; });
  }

  function setCheckedValues(groupId, values) {
    var container = dom[groupId];
    if (!container) return;
    var set = {};
    (values || []).forEach(function (v) { set[v] = true; });
    Array.prototype.forEach.call(container.querySelectorAll('input[type="checkbox"]'), function (cb) {
      cb.checked = !!set[cb.value];
    });
    updateGroupCount(groupId);
  }

  function updateGroupCount(groupId) {
    var container = dom[groupId];
    if (!container) return;
    var countEl = container.querySelector('.group-selected-count');
    if (!countEl) return;
    var n = container.querySelectorAll('input[type="checkbox"]:checked').length;
    countEl.textContent = n + ' selected';
  }

  function updateAllGroupCounts() {
    CHECKBOX_GROUPS.forEach(function (g) { updateGroupCount(g.groupId); });
  }

  // ---- Form: open / close / fill / reset -------------------------------

  function resetFormFields() {
    dom.opId.value = '';
    dom.opSlug.value = '';
    dom.opCreatedAt.value = '';
    dom.formIdLine.hidden = true;
    dom.formIdDisplay.textContent = '';
    dom.formSlugDisplay.textContent = '';

    dom.fieldTitle.value = '';
    dom.fieldShortDesc.value = '';
    dom.fieldFullDesc.value = '';
    dom.fieldTags.value = '';

    CHECKBOX_GROUPS.forEach(function (g) { setCheckedValues(g.groupId, []); });
    SELECT_FIELDS.forEach(function (f) { dom[f.selectId].value = ''; });

    hideFormErrors();
  }

  function fillFormFields(op) {
    dom.opId.value = op.id || '';
    dom.opSlug.value = op.slug || '';
    dom.opCreatedAt.value = op.createdAt || '';

    dom.fieldTitle.value = op.title || '';
    dom.fieldShortDesc.value = op.shortDescription || '';
    dom.fieldFullDesc.value = op.fullDescription || '';
    dom.fieldTags.value = (op.tags || []).join(', ');

    CHECKBOX_GROUPS.forEach(function (g) { setCheckedValues(g.groupId, op[g.key] || []); });

    SELECT_FIELDS.forEach(function (f) {
      var val;
      if (f.key === 'capital') {
        val = op.capital && op.capital.codes && op.capital.codes[0];
      } else {
        val = op[f.key];
        if (Array.isArray(val)) val = val[0];
      }
      dom[f.selectId].value = val || '';
    });
  }

  function openForm(mode, sourceOp) {
    formState.mode = mode;
    formState.editingId = mode === 'edit' ? sourceOp.id : null;

    resetFormFields();

    if (mode === 'edit') {
      dom.formTitle.textContent = 'Edit Opportunity';
      fillFormFields(sourceOp);
      dom.formIdLine.hidden = false;
      dom.formIdDisplay.textContent = sourceOp.id;
      dom.formSlugDisplay.textContent = sourceOp.slug;
      dom.saveAndNewCheck.checked = false;
    } else if (mode === 'duplicate') {
      dom.formTitle.textContent = 'Add Opportunity';
      fillFormFields(sourceOp);
      dom.opId.value = '';
      dom.opSlug.value = '';
      dom.opCreatedAt.value = '';
      dom.fieldTitle.value = (sourceOp.title || '') + ' (Copy)';
      dom.saveAndNewCheck.checked = false;
    } else {
      dom.formTitle.textContent = 'Add Opportunity';
      dom.saveAndNewCheck.checked = true;
    }

    dom.formOverlay.hidden = false;
    dom.fieldTitle.focus();
  }

  function closeForm() {
    dom.formOverlay.hidden = true;
    formState.mode = null;
    formState.editingId = null;
  }

  // ---- Form: validation & collection -----------------------------------

  function collectFormData() {
    var tags = dom.fieldTags.value.split(',')
      .map(function (t) { return t.trim(); })
      .filter(function (t) { return t.length > 0; });
    // De-duplicate tags, case-insensitive, preserving first-seen casing.
    var seen = {};
    tags = tags.filter(function (t) {
      var k = t.toLowerCase();
      if (seen[k]) return false;
      seen[k] = true;
      return true;
    });

    return {
      title: dom.fieldTitle.value,
      shortDescription: dom.fieldShortDesc.value,
      fullDescription: dom.fieldFullDesc.value,
      tags: tags,
      industry: getCheckedValues('groupIndustry'),
      businessModel: getCheckedValues('groupBusinessModel'),
      opportunityType: getCheckedValues('groupOpportunityType'),
      access: getCheckedValues('groupAccess'),
      scale: getCheckedValues('groupScale'),
      stage: getCheckedValues('groupStage'),
      resources: getCheckedValues('groupResources'),
      capitalCode: dom.fieldCapital.value,
      difficultyCode: dom.fieldDifficulty.value,
      workLocation: dom.fieldWorkLocation.value,
      time: dom.fieldTime.value,
      team: dom.fieldTeam.value,
      customer: dom.fieldCustomer.value
    };
  }

  function validateFormData(d) {
    var errors = [];
    if (!d.title.trim()) errors.push('Opportunity title is required.');
    if (!d.shortDescription.trim()) errors.push('Short description is required.');
    if (!d.capitalCode) errors.push('Select a capital range.');
    if (!d.difficultyCode) errors.push('Select a difficulty.');
    if (!d.industry.length) errors.push('Select at least one industry.');
    if (!d.businessModel.length) errors.push('Select at least one business model.');
    if (!d.opportunityType.length) errors.push('Select at least one opportunity type.');
    if (!d.access.length) errors.push('Select at least one access item.');
    if (!d.workLocation) errors.push('Select a work location.');
    if (!d.time) errors.push('Select a time commitment.');
    if (!d.team) errors.push('Select a team size.');
    if (!d.customer) errors.push('Select a customer type.');
    if (!d.scale.length) errors.push('Select at least one scale.');
    if (!d.stage.length) errors.push('Select at least one stage.');
    if (!d.resources.length) errors.push('Select at least one resource.');
    return errors;
  }

  function showFormErrors(errors) {
    dom.formErrors.innerHTML = '<ul>' + errors.map(function (e) { return '<li>' + escapeHtml(e) + '</li>'; }).join('') + '</ul>';
    dom.formErrors.hidden = false;
    if (typeof dom.formErrors.scrollIntoView === 'function') {
      dom.formErrors.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function hideFormErrors() {
    dom.formErrors.hidden = true;
    dom.formErrors.innerHTML = '';
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    var raw = collectFormData();
    var errors = validateFormData(raw);
    if (errors.length) {
      showFormErrors(errors);
      return;
    }
    hideFormErrors();

    var isEdit = formState.mode === 'edit';
    var now = new Date().toISOString();
    var id, slug, createdAt;

    if (isEdit) {
      id = formState.editingId;
      slug = dom.opSlug.value || generateSlug(raw.title, id);
      createdAt = dom.opCreatedAt.value || now;
    } else {
      id = generateId();
      slug = generateSlug(raw.title, null);
      createdAt = now;
    }

    var capitalOpt = FILTERS.capital.filter(function (c) { return c.code === raw.capitalCode; })[0];

    var opportunity = {
      id: id,
      slug: slug,
      title: raw.title.trim(),
      shortDescription: raw.shortDescription.trim(),
      fullDescription: raw.fullDescription.trim(),
      industry: raw.industry,
      capital: { min: capitalOpt.min, max: capitalOpt.max, codes: [capitalOpt.code] },
      difficulty: [raw.difficultyCode],
      businessModel: raw.businessModel,
      opportunityType: raw.opportunityType,
      access: raw.access,
      workLocation: [raw.workLocation],
      time: [raw.time],
      team: [raw.team],
      customer: [raw.customer],
      scale: raw.scale,
      stage: raw.stage,
      resources: raw.resources,
      tags: raw.tags,
      createdAt: createdAt
    };

    if (isEdit) {
      var idx = opportunities.findIndex(function (o) { return o.id === id; });
      if (idx !== -1) opportunities[idx] = opportunity;
    } else {
      opportunities.push(opportunity);
    }

    persistData();
    renderTable();
    showStatus('Saved ' + opportunity.id + ' — "' + opportunity.title + '".', 'success');

    if (!isEdit && dom.saveAndNewCheck.checked) {
      formState.mode = 'create';
      formState.editingId = null;
      resetFormFields();
      dom.formTitle.textContent = 'Add Opportunity';
      dom.fieldTitle.focus();
    } else {
      closeForm();
    }
  }

  // ---- Table rendering --------------------------------------------------

  function getFilteredSorted() {
    var q = listState.search.trim().toLowerCase();
    var list = opportunities.filter(function (o) {
      if (listState.industry && (o.industry || []).indexOf(listState.industry) === -1) return false;
      if (listState.difficulty && (o.difficulty || []).indexOf(listState.difficulty) === -1) return false;
      if (!q) return true;
      var industryLabels = (o.industry || []).map(function (c) { return labelFor('industry', c); });
      var haystack = [o.title, o.shortDescription].concat(o.tags || [], industryLabels).join(' ').toLowerCase();
      return haystack.indexOf(q) !== -1;
    });
    list.sort(function (a, b) { return (b.createdAt || '').localeCompare(a.createdAt || ''); });
    return list;
  }

  function chipListHtml(codes, dimensionKey, limit) {
    var labels = (codes || []).map(function (c) { return labelFor(dimensionKey, c); });
    var shown = labels.slice(0, limit).map(function (l) {
      return '<span class="mini-chip">' + escapeHtml(l) + '</span>';
    }).join('');
    var extra = labels.length > limit
      ? '<span class="mini-chip">+' + (labels.length - limit) + ' more</span>'
      : '';
    return shown + extra || '<span class="mini-chip">—</span>';
  }

  function renderRow(o) {
    var difficultyCode = (o.difficulty && o.difficulty[0]) || '';
    var difficultyLabel = difficultyCode ? labelFor('difficulty', difficultyCode) : '—';

    return (
      '<tr>' +
        '<td class="col-id"><code class="id-badge">' + escapeHtml(o.id) + '</code></td>' +
        '<td class="col-title">' + escapeHtml(o.title) + '</td>' +
        '<td class="col-industry">' + chipListHtml(o.industry, 'industry', 3) + '</td>' +
        '<td class="col-capital"><span class="capital-value">' + escapeHtml(capitalLabel(o.capital)) + '</span></td>' +
        '<td class="col-difficulty">' +
          (difficultyCode
            ? '<span class="difficulty-pill difficulty-' + escapeHtml(difficultyCode) + '">' + escapeHtml(difficultyLabel) + '</span>'
            : '—') +
        '</td>' +
        '<td class="col-model">' + chipListHtml(o.businessModel, 'businessModel', 2) + '</td>' +
        '<td class="col-type">' + chipListHtml(o.opportunityType, 'opportunityType', 2) + '</td>' +
        '<td class="col-created">' + escapeHtml(formatDate(o.createdAt)) + '</td>' +
        '<td class="col-actions">' +
          '<div class="row-actions">' +
            '<button type="button" class="action-btn action-edit" data-id="' + escapeHtml(o.id) + '">Edit</button>' +
            '<button type="button" class="action-btn action-duplicate" data-id="' + escapeHtml(o.id) + '">Duplicate</button>' +
            '<button type="button" class="action-btn action-delete" data-id="' + escapeHtml(o.id) + '">Delete</button>' +
          '</div>' +
        '</td>' +
      '</tr>'
    );
  }

  function renderTable() {
    var filtered = getFilteredSorted();
    var totalPages = Math.max(1, Math.ceil(filtered.length / listState.pageSize));
    if (listState.page > totalPages) listState.page = totalPages;
    if (listState.page < 1) listState.page = 1;

    var start = (listState.page - 1) * listState.pageSize;
    var pageItems = filtered.slice(start, start + listState.pageSize);

    dom.opTableBody.innerHTML = pageItems.map(renderRow).join('');

    var noDataAtAll = opportunities.length === 0;
    var noMatches = filtered.length === 0;

    if (noMatches) {
      dom.emptyState.hidden = false;
      dom.opTableBody.closest('table').hidden = true;
      if (noDataAtAll) {
        dom.emptyStateHeading.textContent = 'No opportunities yet';
        dom.emptyStateBody.innerHTML = 'Click <strong>+ Add Idea</strong> above to create your first one.';
      } else {
        dom.emptyStateHeading.textContent = 'No opportunities match';
        dom.emptyStateBody.textContent = 'Try a different search or clear the filters above.';
      }
    } else {
      dom.emptyState.hidden = true;
      dom.opTableBody.closest('table').hidden = false;
    }

    dom.recordCount.textContent = opportunities.length + (opportunities.length === 1 ? ' opportunity' : ' opportunities');

    var isFiltered = !!(listState.search || listState.industry || listState.difficulty);
    if (filtered.length === 0) {
      dom.tableInfo.textContent = isFiltered ? '0 results (filtered from ' + opportunities.length + ')' : '';
    } else {
      var rangeEnd = Math.min(start + pageItems.length, filtered.length);
      dom.tableInfo.textContent = 'Showing ' + (start + 1) + '–' + rangeEnd + ' of ' + filtered.length +
        (isFiltered ? ' (filtered from ' + opportunities.length + ')' : '');
    }

    dom.pageIndicator.textContent = 'Page ' + listState.page + ' of ' + totalPages;
    dom.prevPageBtn.disabled = listState.page <= 1;
    dom.nextPageBtn.disabled = listState.page >= totalPages;
  }

  // ---- Delete ------------------------------------------------------------

  function openDeleteModal(id) {
    var op = opportunities.filter(function (o) { return o.id === id; })[0];
    if (!op) return;
    pendingDeleteId = id;
    dom.deleteMessage.textContent = 'Delete "' + op.title + '" (' + op.id + ')? This cannot be undone.';
    dom.deleteOverlay.hidden = false;
  }

  function closeDeleteModal() {
    dom.deleteOverlay.hidden = true;
    pendingDeleteId = null;
  }

  function confirmDelete() {
    if (!pendingDeleteId) return;
    var id = pendingDeleteId;
    opportunities = opportunities.filter(function (o) { return o.id !== id; });
    persistData();
    closeDeleteModal();
    renderTable();
    showStatus('Deleted ' + id + '. Its ID will never be reused.', 'warning');
  }

  // ---- Import -------------------------------------------------------------

  function normalizeImportedOpportunity(raw, index, errors) {
    if (!raw || typeof raw !== 'object') {
      errors.push('Record ' + (index + 1) + ': not a valid object.');
      return null;
    }
    if (!raw.id || !String(raw.id).trim()) {
      errors.push('Record ' + (index + 1) + ': missing "id".');
      return null;
    }
    if (!raw.slug || !String(raw.slug).trim()) {
      errors.push('Record ' + (index + 1) + ' (' + raw.id + '): missing "slug".');
      return null;
    }
    if (!raw.title || !String(raw.title).trim()) {
      errors.push('Record ' + (index + 1) + ' (' + raw.id + '): missing "title".');
      return null;
    }

    var asArray = function (v) { return Array.isArray(v) ? v : []; };
    var capital = raw.capital && typeof raw.capital === 'object'
      ? { min: raw.capital.min != null ? raw.capital.min : null, max: raw.capital.max !== undefined ? raw.capital.max : null, codes: asArray(raw.capital.codes) }
      : { min: null, max: null, codes: [] };

    return {
      id: String(raw.id),
      slug: String(raw.slug),
      title: String(raw.title),
      shortDescription: raw.shortDescription || '',
      fullDescription: raw.fullDescription || '',
      industry: asArray(raw.industry),
      capital: capital,
      difficulty: asArray(raw.difficulty),
      businessModel: asArray(raw.businessModel),
      opportunityType: asArray(raw.opportunityType),
      access: asArray(raw.access),
      workLocation: asArray(raw.workLocation),
      time: asArray(raw.time),
      team: asArray(raw.team),
      customer: asArray(raw.customer),
      scale: asArray(raw.scale),
      stage: asArray(raw.stage),
      resources: asArray(raw.resources),
      tags: asArray(raw.tags),
      createdAt: raw.createdAt || new Date().toISOString()
    };
  }

  function handleImportFile(file) {
    var reader = new FileReader();
    reader.onload = function () {
      var parsed;
      try {
        parsed = JSON.parse(reader.result);
      } catch (e) {
        showImportSummary({ error: 'That file is not valid JSON: ' + e.message });
        return;
      }

      var rawList = Array.isArray(parsed) ? parsed : (parsed && Array.isArray(parsed.opportunities) ? parsed.opportunities : null);
      if (!rawList) {
        showImportSummary({ error: 'Expected either a bare array or an object with an "opportunities" array.' });
        return;
      }

      var invalidErrors = [];
      var duplicateIds = [];
      var importedCount = 0;
      var existingIds = {};
      opportunities.forEach(function (o) { existingIds[o.id] = true; });

      rawList.forEach(function (raw, i) {
        var op = normalizeImportedOpportunity(raw, i, invalidErrors);
        if (!op) return;
        if (existingIds[op.id]) {
          duplicateIds.push(op.id);
          return;
        }
        opportunities.push(op);
        existingIds[op.id] = true;
        importedCount += 1;
      });

      if (importedCount > 0) {
        // Keep the ID counter ahead of any imported OP##### ids so
        // future auto-generated IDs never collide with imported data.
        opportunities.forEach(function (o) {
          var m = /^OP(\d+)$/.exec(o.id || '');
          if (m) idCounter = Math.max(idCounter, parseInt(m[1], 10));
        });
        persistCounter();
        persistData();
        renderTable();
      }

      showImportSummary({
        total: rawList.length,
        importedCount: importedCount,
        duplicateIds: duplicateIds,
        invalidErrors: invalidErrors
      });
    };
    reader.onerror = function () {
      showImportSummary({ error: 'Could not read that file.' });
    };
    reader.readAsText(file);
  }

  function showImportSummary(result) {
    var html = '';
    if (result.error) {
      html = '<p>' + escapeHtml(result.error) + '</p>';
    } else {
      html += '<p><strong>' + result.importedCount + '</strong> of ' + result.total + ' records imported.</p>';
      if (result.duplicateIds.length) {
        html += '<p>' + result.duplicateIds.length + ' skipped — ID already exists (not overwritten):</p>' +
          '<ul>' + result.duplicateIds.slice(0, 20).map(function (id) { return '<li><code>' + escapeHtml(id) + '</code></li>'; }).join('') + '</ul>';
        if (result.duplicateIds.length > 20) html += '<p>…and ' + (result.duplicateIds.length - 20) + ' more.</p>';
      }
      if (result.invalidErrors.length) {
        html += '<p>' + result.invalidErrors.length + ' skipped — invalid record:</p>' +
          '<ul>' + result.invalidErrors.slice(0, 20).map(function (e) { return '<li>' + escapeHtml(e) + '</li>'; }).join('') + '</ul>';
        if (result.invalidErrors.length > 20) html += '<p>…and ' + (result.invalidErrors.length - 20) + ' more.</p>';
      }
      if (!result.duplicateIds.length && !result.invalidErrors.length && result.importedCount > 0) {
        html += '<p>No issues found.</p>';
      }
    }
    dom.importSummary.innerHTML = html;
    dom.importOverlay.hidden = false;
  }

  // ---- Export ---------------------------------------------------------

  function openExportModal() {
    if (opportunities.length === 0) {
      showStatus('No opportunities to export yet — add at least one first.', 'error');
      return;
    }
    dom.exportCountHint.textContent = 'Exporting all ' + opportunities.length + (opportunities.length === 1 ? ' opportunity.' : ' opportunities.');
    dom.exportFilename.value = '';
    dom.manifestHelper.hidden = true;
    dom.manifestSnippet.textContent = '';
    dom.exportOverlay.hidden = false;
    dom.exportFilename.focus();
  }

  function closeExportModal() {
    dom.exportOverlay.hidden = true;
  }

  function confirmExport() {
    var filename = sanitizeFilename(dom.exportFilename.value) || 'opportunities-export';

    var payload = { opportunities: opportunities };
    var json = JSON.stringify(payload, null, 2);
    var blob = new Blob([json], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);

    var industrySet = {};
    opportunities.forEach(function (o) {
      (o.industry || []).forEach(function (code) { industrySet[code] = true; });
    });
    var manifestEntry = {
      path: 'opportunities/' + filename + '.json',
      industries: Object.keys(industrySet)
    };
    dom.manifestSnippet.textContent = JSON.stringify(manifestEntry, null, 2);
    dom.manifestHelper.hidden = false;

    showStatus('Exported ' + opportunities.length + (opportunities.length === 1 ? ' opportunity' : ' opportunities') + ' to ' + filename + '.json.', 'success');
  }

  function copyManifestSnippet() {
    var text = dom.manifestSnippet.textContent;
    var done = function () {
      var original = dom.copyManifestBtn.textContent;
      dom.copyManifestBtn.textContent = 'Copied!';
      setTimeout(function () { dom.copyManifestBtn.textContent = original; }, 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text, done); });
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
  }

  // ---- Event wiring -------------------------------------------------------

  function wireGroupDelegation() {
    dom.opForm.addEventListener('change', function (e) {
      if (e.target.matches && e.target.matches('input[type="checkbox"]')) {
        var group = e.target.closest('.checkbox-group');
        if (group && group.id) updateGroupCount(group.id);
      }
    });

    dom.opForm.addEventListener('input', function (e) {
      if (e.target.matches && e.target.matches('.group-search')) {
        var query = e.target.value.trim().toLowerCase();
        var scroll = e.target.closest('.checkbox-group').querySelector('.group-scroll');
        Array.prototype.forEach.call(scroll.querySelectorAll('.checkbox-option'), function (label) {
          var text = label.textContent.trim().toLowerCase();
          label.classList.toggle('is-no-match', query.length > 0 && text.indexOf(query) === -1);
        });
      }
    });
  }

  function wireTableDelegation() {
    dom.opTableBody.addEventListener('click', function (e) {
      var btn = e.target.closest('.action-btn');
      if (!btn) return;
      var id = btn.getAttribute('data-id');
      var op = opportunities.filter(function (o) { return o.id === id; })[0];
      if (!op) return;

      if (btn.classList.contains('action-edit')) {
        openForm('edit', op);
      } else if (btn.classList.contains('action-duplicate')) {
        openForm('duplicate', op);
      } else if (btn.classList.contains('action-delete')) {
        openDeleteModal(id);
      }
    });
  }

  function wireEvents() {
    dom.addIdeaBtn.addEventListener('click', function () { openForm('create'); });
    dom.formCloseBtn.addEventListener('click', closeForm);
    dom.formCancelBtn.addEventListener('click', closeForm);
    dom.opForm.addEventListener('submit', handleFormSubmit);

    dom.listSearch.addEventListener('input', debounce(function () {
      listState.search = dom.listSearch.value;
      listState.page = 1;
      renderTable();
    }, 250));

    dom.filterIndustry.addEventListener('change', function () {
      listState.industry = dom.filterIndustry.value;
      listState.page = 1;
      renderTable();
    });
    dom.filterDifficulty.addEventListener('change', function () {
      listState.difficulty = dom.filterDifficulty.value;
      listState.page = 1;
      renderTable();
    });
    dom.clearListFiltersBtn.addEventListener('click', function () {
      dom.listSearch.value = '';
      dom.filterIndustry.value = '';
      dom.filterDifficulty.value = '';
      listState.search = '';
      listState.industry = '';
      listState.difficulty = '';
      listState.page = 1;
      renderTable();
    });

    dom.prevPageBtn.addEventListener('click', function () { listState.page -= 1; renderTable(); });
    dom.nextPageBtn.addEventListener('click', function () { listState.page += 1; renderTable(); });
    dom.pageSizeSelect.addEventListener('change', function () {
      listState.pageSize = parseInt(dom.pageSizeSelect.value, 10) || 50;
      listState.page = 1;
      renderTable();
    });

    dom.importBtn.addEventListener('click', function () { dom.importFileInput.click(); });
    dom.importFileInput.addEventListener('change', function () {
      var file = dom.importFileInput.files && dom.importFileInput.files[0];
      if (file) handleImportFile(file);
      dom.importFileInput.value = '';
    });
    dom.importCloseBtn.addEventListener('click', function () { dom.importOverlay.hidden = true; });
    dom.importOkBtn.addEventListener('click', function () { dom.importOverlay.hidden = true; });

    dom.exportBtn.addEventListener('click', openExportModal);
    dom.exportCloseBtn.addEventListener('click', closeExportModal);
    dom.exportCancelBtn.addEventListener('click', closeExportModal);
    dom.exportConfirmBtn.addEventListener('click', confirmExport);
    dom.copyManifestBtn.addEventListener('click', copyManifestSnippet);

    dom.deleteCancelBtn.addEventListener('click', closeDeleteModal);
    dom.deleteConfirmBtn.addEventListener('click', confirmDelete);

    // Click on an overlay's backdrop (not its modal content) closes it.
    [dom.formOverlay, dom.importOverlay, dom.exportOverlay, dom.deleteOverlay].forEach(function (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) overlay.hidden = true;
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (!dom.formOverlay.hidden) closeForm();
      else if (!dom.importOverlay.hidden) dom.importOverlay.hidden = true;
      else if (!dom.exportOverlay.hidden) closeExportModal();
      else if (!dom.deleteOverlay.hidden) closeDeleteModal();
    });

    wireGroupDelegation();
    wireTableDelegation();
  }

  // ---- Init ---------------------------------------------------------------

  function init() {
    cacheDom();
    loadData();
    populateFormOptionsOnce();
    populateListFilterDropdowns();
    wireEvents();
    renderTable();
    updateAllGroupCounts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
