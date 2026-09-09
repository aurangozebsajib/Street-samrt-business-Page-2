/* ============================================================
   STREET SMART BUSINESS LAB — OPPORTUNITY BUILDER
   Single source of truth for filter labels + codes is embedded
   here (mirrors the existing filters-config.js used by Page 2).
   ============================================================ */

/* ---------------- CONFIG ---------------- */
const CONFIG = {
  industry: [
    ['Agriculture','agriculture'],['Fish','fish'],['Fisheries','fisheries'],
    ['Poultry','poultry'],['Livestock','livestock'],['Dairy','dairy'],
    ['Food Processing','food-processing'],['Restaurant','restaurant'],
    ['Fast Food','fast-food'],['Bakery','bakery'],['Cafe','cafe'],
    ['Catering','catering'],['Grocery','grocery'],['Food Delivery','food-delivery'],
    ['Food Supply','food-supply'],['Retail','retail'],['Wholesale','wholesale'],
    ['Trading','trading'],['Import','import'],['Export','export'],
    ['Distribution','distribution'],['FMCG','fmcg'],['Clothing','clothing'],
    ['Fashion','fashion'],['Shoes','shoes'],['Cosmetics','cosmetics'],
    ['Electronics','electronics'],['Home Appliances','home-appliances'],
    ['Furniture','furniture'],['Hardware','hardware'],
    ['Building Materials','building-materials'],
    ['Agricultural Products','agricultural-products'],
    ['Medical Supplies','medical-supplies'],['Stationery','stationery'],
    ['IT','it'],['Software','software'],['Web Development','web-development'],
    ['Mobile Apps','mobile-apps'],['AI','ai'],['Digital Services','digital-services'],
    ['SaaS','saas'],['E-commerce','e-commerce'],['Digital Products','digital-products'],
    ['Online Education','online-education'],['Digital Marketing','digital-marketing'],
    ['Content','content'],['Freelancing','freelancing'],['Cleaning','cleaning'],
    ['Repair','repair'],['Maintenance','maintenance'],['Delivery','delivery'],
    ['Logistics','logistics'],['Transportation','transportation'],['Moving','moving'],
    ['Security','security'],['Education','education'],['Training','training'],
    ['Consulting','consulting'],['Accounting','accounting'],['Recruitment','recruitment'],
    ['Event Management','event-management'],['Photography','photography'],
    ['Video','video'],['Printing','printing'],['Design','design'],
    ['Beauty','beauty'],['Personal Care','personal-care'],
    ['Healthcare Services','healthcare-services'],['Home Services','home-services'],
    ['Manufacturing','manufacturing'],['Garments','garments'],['Textile','textile'],
    ['Packaging','packaging'],['Furniture Manufacturing','furniture-manufacturing'],
    ['Food Manufacturing','food-manufacturing'],['Plastic','plastic'],['Metal','metal'],
    ['Wood','wood'],['Leather','leather'],['Handicrafts','handicrafts'],
    ['Real Estate','real-estate'],['Property Services','property-services'],
    ['Construction','construction'],['Equipment','equipment'],['Machinery','machinery'],
    ['Warehousing','warehousing'],['Storage','storage'],['Rental','rental'],
    ['Shared Spaces','shared-spaces'],['B2B Services','b2b-services'],
    ['Procurement','procurement'],['Sourcing','sourcing'],['Brokerage','brokerage'],
    ['Lead Generation','lead-generation'],['Recruitment Services','recruitment-services'],
    ['Outsourcing','outsourcing'],['Business Support','business-support'],
    ['Tourism','tourism'],['Travel','travel'],['Hospitality','hospitality'],
    ['Automobile','automobile'],['Motorcycle','motorcycle'],
    ['Renewable Energy','renewable-energy'],['Waste Management','waste-management'],
    ['Recycling','recycling'],['Environmental Services','environmental-services'],
    ['Local Businesses','local-businesses'],['Community Services','community-services']
  ],

  capital: [
    { label: '৳0',                    code: '0',            min: 0,         max: 0 },
    { label: '৳1–10,000',             code: '1-10000',      min: 1,         max: 10000 },
    { label: '৳10,000–50,000',        code: '10000-50000',  min: 10000,     max: 50000 },
    { label: '৳50,000–1 lakh',        code: '50000-100000', min: 50000,     max: 100000 },
    { label: '৳1–5 lakh',             code: '100000-500000',min: 100000,    max: 500000 },
    { label: '৳5–10 lakh',            code: '500000-1000000',min: 500000,   max: 1000000 },
    { label: '৳10–25 lakh',           code: '1000000-2500000',min: 1000000, max: 2500000 },
    { label: '৳25–50 lakh',           code: '2500000-5000000',min: 2500000, max: 5000000 },
    { label: '৳50 lakh–1 crore',      code: '5000000-10000000',min: 5000000,max: 10000000 },
    { label: '৳1 crore+',             code: '10000000-plus',min: 10000000,  max: null },
    { label: 'I don\'t know',         code: 'unknown',      min: null,      max: null }
  ],

  difficulty: [
    ['Beginner-Friendly','beginner'],
    ['Intermediate','intermediate'],
    ['Advanced','advanced'],
    ['Expert','expert']
  ],

  businessModel: [
    ['Brokerage','brokerage'],['Commission','commission'],['Referral','referral'],
    ['Reselling','reselling'],['Wholesale','wholesale'],['Distribution','distribution'],
    ['Consignment','consignment'],['Aggregation','aggregation'],
    ['Lead Generation','lead-generation'],['Service Coordination','service-coordination'],
    ['B2B Sourcing','b2b-sourcing'],['Import','import'],['Export','export'],
    ['Rental','rental'],['Shared Usage','shared-usage'],['Subscription','subscription'],
    ['Marketplace','marketplace'],['Information Packaging','information-packaging'],
    ['Digital Product','digital-product'],['Service Business','service-business'],
    ['Manufacturing','manufacturing'],['Private Label','private-label'],
    ['Bundling','bundling'],['Arbitrage','arbitrage'],['Waste-to-Value','waste-to-value'],
    ['Liquidation','liquidation'],['Surplus Distribution','surplus-distribution'],
    ['Customer-Traffic Monetization','customer-traffic-monetization'],
    ['Complementary Business Partnership','complementary-business-partnership']
  ],

  opportunityType: [
    ['Unused Asset','unused-asset'],['Underused Asset','underused-asset'],
    ['Empty Capacity','empty-capacity'],['Excess Inventory','excess-inventory'],
    ['Surplus Stock','surplus-stock'],['Customer Traffic','customer-traffic'],
    ['Supply Gap','supply-gap'],['Demand Gap','demand-gap'],['Trust Gap','trust-gap'],
    ['Information Gap','information-gap'],['Coordination Gap','coordination-gap'],
    ['Struggling Business','struggling-business'],['Location Advantage','location-advantage'],
    ['Timing Advantage','timing-advantage'],['Convenience Gap','convenience-gap'],
    ['Price Gap','price-gap'],['Distribution Gap','distribution-gap'],
    ['Access Gap','access-gap'],['Service Gap','service-gap'],['Skill Gap','skill-gap'],
    ['Waste-to-Value','waste-to-value'],['Complementary Business','complementary-business'],
    ['Existing Business Improvement','existing-business-improvement']
  ],

  access: [
    ['Nothing yet','nothing-yet'],['Shop','shop'],['Empty Space','empty-space'],
    ['Warehouse','warehouse'],['Vehicle','vehicle'],['Motorcycle','motorcycle'],
    ['Machine','machine'],['Equipment','equipment'],['Supplier','supplier'],
    ['Manufacturer','manufacturer'],['Distributor','distributor'],
    ['Existing Customers','existing-customers'],['Customer Traffic','customer-traffic'],
    ['Facebook Audience','facebook-audience'],['Online Audience','online-audience'],
    ['Social Media Page','social-media-page'],['Existing Business','existing-business'],
    ['Employee / Worker','employee-worker'],['Skilled Person','skilled-person'],
    ['Partner','partner'],['Family Business','family-business'],['Network','network'],
    ['Industry Relationship','industry-relationship'],['Location','location'],
    ['Delivery Network','delivery-network'],['Capital','capital'],['Credit','credit'],
    ['Supplier Credit','supplier-credit'],['Inventory','inventory'],
    ['Data / Information','data-information'],['Professional Skill','professional-skill']
  ],

  workLocation: [['Online','online'],['Offline','offline'],['Both','both']],
  time:           [['Part-time','part-time'],['Full-time','full-time']],
  team:           [['Solo','solo'],['With Partner','with-partner'],['Build a Team','build-a-team']],
  customer:       [['B2C','b2c'],['B2B','b2b'],['Both','both']],

  scale: [
    ['Side Income','side-income'],['Small Local Business','small-local-business'],
    ['Micro Business','micro-business'],['Small Business','small-business'],
    ['Growing Business','growing-business'],['Scalable Business','scalable-business'],
    ['High-Growth Opportunity','high-growth-opportunity']
  ],

  stage: [
    ['Start From Scratch','start-from-scratch'],
    ['Existing Business Opportunity','existing-business-opportunity'],
    ['Buy / Take Over','buy-take-over'],
    ['Partner With Existing Business','partner-with-existing-business'],
    ['Improve Existing Business','improve-existing-business'],
    ['Broker Existing Supply','broker-existing-supply'],
    ['Resell Existing Products','resell-existing-products'],
    ['Monetize Existing Assets','monetize-existing-assets'],
    ['Monetize Existing Customers','monetize-existing-customers'],
    ['Build a New Service','build-a-new-service'],
    ['Build a Digital Business','build-a-digital-business']
  ],

  resources: [
    ['Physical Product','physical-product'],['Digital Product','digital-product'],
    ['Physical Space','physical-space'],['Vehicle','vehicle'],['Machine','machine'],
    ['Human Skill','human-skill'],['Customer Base','customer-base'],
    ['Supplier Network','supplier-network'],['Distribution Network','distribution-network'],
    ['Information','information'],['Software','software'],['Equipment','equipment'],
    ['Inventory','inventory'],['Existing Business','existing-business'],
    ['Other People\'s Assets','other-peoples-assets']
  ]
};

/* Dimensions stored as arrays (even single-select ones) to match Explorer schema */
const ARRAY_DIMS = new Set([
  'industry','difficulty','businessModel','opportunityType','access',
  'workLocation','time','team','customer','scale','stage','resources','tags'
]);

/* Dimensions that allow multiple values (UI: multi-select) */
const MULTI_DIMS = new Set([
  'industry','businessModel','opportunityType','access','scale','stage','resources','tags'
]);

/* Build label<->code maps for every dimension */
const LABEL_TO_CODE = {};
const CODE_TO_LABEL = {};
for (const dim of Object.keys(CONFIG)) {
  LABEL_TO_CODE[dim] = new Map();
  CODE_TO_LABEL[dim] = new Map();
  for (const item of CONFIG[dim]) {
    const label = item[0] ?? item.label;
    const code  = item[1] ?? item.code;
    LABEL_TO_CODE[dim].set(label, code);
    CODE_TO_LABEL[dim].set(code, label);
  }
}

/* Capital code -> {min,max} lookup */
const CAPITAL_BY_CODE = new Map(CONFIG.capital.map(c => [c.code, { min: c.min, max: c.max, label: c.label }]));
const CAPITAL_CODE_BY_MINMAX = (() => {
  const m = new Map();
  for (const c of CONFIG.capital) {
    const key = c.min + '|' + (c.max === null ? 'null' : c.max);
    m.set(key, c.code);
  }
  return m;
})();

/* ---------------- STORAGE ---------------- */
const STORAGE_KEY = 'ssbl_builder_opps_v1';
const COUNTER_KEY = 'ssbl_builder_counter_v1';

const Store = {
  _cache: null,

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      this._cache = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(this._cache)) this._cache = [];
    } catch (e) {
      console.error('Failed to load data', e);
      this._cache = [];
    }
    return this._cache;
  },

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._cache));
    } catch (e) {
      toast('Save failed: storage may be full', 'error');
    }
  },

  all() { return this._cache || this.load(); },

  get(id) { return this.all().find(o => o.id === id) || null; },

  add(opp) {
    this.all().push(opp);
    this.save();
  },

  update(id, patch) {
    const idx = this.all().findIndex(o => o.id === id);
    if (idx === -1) return false;
    this._cache[idx] = { ...this._cache[idx], ...patch };
    this.save();
    return true;
  },

  remove(id) {
    const before = this._cache.length;
    this._cache = this._cache.filter(o => o.id !== id);
    this.save();
    return this._cache.length < before;
  },

  /* Counter is monotonic — never decremented on delete */
  nextId() {
    let n = parseInt(localStorage.getItem(COUNTER_KEY) || '0', 10);
    if (isNaN(n) || n < 0) n = 0;
    /* Also ensure we're above any existing ID in the dataset (import safety) */
    for (const o of this.all()) {
      const m = /^OP(\d+)$/.exec(o.id || '');
      if (m) {
        const v = parseInt(m[1], 10);
        if (v > n) n = v;
      }
    }
    n += 1;
    localStorage.setItem(COUNTER_KEY, String(n));
    return 'OP' + String(n).padStart(5, '0');
  },

  slugExists(slug, excludeId) {
    return this.all().some(o => o.slug === slug && o.id !== excludeId);
  },

  generateSlug(title, excludeId = null) {
    const base = slugify(title || 'opportunity') || 'opportunity';
    let slug = base;
    let i = 2;
    while (this.slugExists(slug, excludeId)) {
      slug = `${base}-${i}`;
      i++;
    }
    return slug;
  },

  clear() {
    this._cache = [];
    this.save();
  }
};

/* ---------------- UTILITIES ---------------- */
function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')            /* strip combining marks */
    .replace(/[^\w\s-]/g, '')        /* strip non-word chars (keeps letters/digits) */
    .replace(/[\s_-]+/g, '-')        /* collapse whitespace */
    .replace(/^-+|-+$/g, '');
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

function formatDate(iso) {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    if (isNaN(d)) return '—';
    return d.toLocaleDateString(undefined, { year:'numeric', month:'short', day:'2-digit' });
  } catch { return '—'; }
}

function capitalLabelFromValue(cap) {
  if (!cap || typeof cap !== 'object') return '—';
  const key = (cap.min === null || cap.min === undefined ? 'null' : cap.min) + '|' +
              (cap.max === null || cap.max === undefined ? 'null' : cap.max);
  const code = CAPITAL_CODE_BY_MINMAX.get(key);
  if (code) return CAPITAL_BY_CODE.get(code).label;
  /* Fallback: format numerically */
  const min = cap.min == null ? '?' : cap.min.toLocaleString();
  const max = cap.max == null ? '+' : cap.max.toLocaleString();
  return `৳${min}–${max}`;
}

function labelsForCodes(dim, codes) {
  if (!Array.isArray(codes)) return [];
  const map = CODE_TO_LABEL[dim];
  return codes.map(c => map.get(c) || c);
}

function chipsHtml(codes, dim, max = 2) {
  const labels = labelsForCodes(dim, codes);
  if (!labels.length) return '<span class="chip neutral">—</span>';
  const visible = labels.slice(0, max);
  const more = labels.length - visible.length;
  let html = visible.map(l => `<span class="chip" title="${escapeHtml(l)}">${escapeHtml(l)}</span>`).join('');
  if (more > 0) html += `<span class="chip more">+${more}</span>`;
  return html;
}

function toast(msg, kind = '') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast ' + kind;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.add('hidden'), 3200);
}

/* ---------------- VALIDATION ---------------- */
function validate(opp) {
  const errors = {};
  if (!opp.title || !opp.title.trim()) errors.title = 'Title is required.';
  if (!opp.shortDescription || !opp.shortDescription.trim()) errors.shortDescription = 'Short description is required.';

  /* Capital must be a valid object with numeric min/max (or null for max on 1cr+) */
  if (!opp.capital || typeof opp.capital !== 'object') {
    errors.capital = 'Select a capital range.';
  } else {
    const { min, max } = opp.capital;
    const minOk = typeof min === 'number' && !isNaN(min) && min >= 0;
    const maxOk = max === null || (typeof max === 'number' && !isNaN(max) && max >= 0);
    if (!minOk || !maxOk) errors.capital = 'Invalid capital range.';
    else if (max !== null && max < min) errors.capital = 'Capital max must be ≥ min.';
  }

  /* difficulty stored as array with at least one valid code */
  if (!Array.isArray(opp.difficulty) || opp.difficulty.length === 0) {
    errors.difficulty = 'Select difficulty.';
  } else {
    const valid = new Set(CONFIG.difficulty.map(d => d[1]));
    if (opp.difficulty.some(c => !valid.has(c))) errors.difficulty = 'Invalid difficulty value.';
  }

  /* industry: at least one */
  if (!Array.isArray(opp.industry) || opp.industry.length === 0) {
    errors.industry = 'Select at least one industry.';
  }

  /* Validate every array dimension against CONFIG */
  const checks = [
    ['businessModel','businessModel'],
    ['opportunityType','opportunityType'],
    ['access','access'],
    ['workLocation','workLocation'],
    ['time','time'],
    ['team','team'],
    ['customer','customer'],
    ['scale','scale'],
    ['stage','stage'],
    ['resources','resources']
  ];
  for (const [field, dim] of checks) {
    const val = opp[field];
    if (val === undefined || val === null) {
      /* Allow empty for optional multi-selects, but if present must be valid */
      continue;
    }
    if (!Array.isArray(val)) {
      errors[field] = 'Must be an array.';
      continue;
    }
    const valid = new Set(CONFIG[dim].map(d => d[1] ?? d.code));
    const bad = val.filter(c => !valid.has(c));
    if (bad.length) errors[field] = `Invalid value(s): ${bad.join(', ')}`;
  }

  return errors;
}

/* ---------------- FORM ---------------- */
const FormState = {
  mode: 'new',        /* 'new' | 'edit' */
  editingId: null,
  originalSlug: null,
  data: null
};

function emptyOpportunity() {
  return {
    title: '',
    shortDescription: '',
    fullDescription: '',
    tags: [],
    industry: [],
    capital: null,
    difficulty: [],
    businessModel: [],
    opportunityType: [],
    access: [],
    workLocation: [],
    time: [],
    team: [],
    customer: [],
    scale: [],
    stage: [],
    resources: []
  };
}

function openForm(mode, opp = null) {
  FormState.mode = mode;
  FormState.editingId = opp ? opp.id : null;
  FormState.originalSlug = opp ? opp.slug : null;
  FormState.data = opp ? structuredClone(opp) : emptyOpportunity();

  document.getElementById('form-title').textContent =
    mode === 'edit' ? 'Edit Opportunity' : 'New Opportunity';

  const meta = document.getElementById('form-meta');
  if (mode === 'edit') {
    meta.innerHTML = `ID: <strong>${escapeHtml(opp.id)}</strong> · slug: <code>${escapeHtml(opp.slug)}</code>`;
  } else {
    meta.textContent = 'A new ID and slug will be generated on save.';
  }

  renderForm();
  showModal('form-modal');
}

function renderForm() {
  const form = document.getElementById('opp-form');
  const d = FormState.data;

  form.innerHTML = `
    <div class="form-section">
      <h3 class="form-section-title">Basic Information</h3>
      <div class="form-grid">
        <div class="full">
          <label class="field-label">Opportunity Title <span class="req">*</span></label>
          <input type="text" name="title" class="text-input" value="${escapeHtml(d.title)}" maxlength="200" required>
          <span class="error-msg"></span>
          ${FormState.mode === 'edit' ? `
            <label class="field-hint" style="margin-top:8px;display:flex;gap:6px;align-items:center">
              <input type="checkbox" id="regen-slug"> Regenerate slug from title
            </label>
            <span class="field-hint">Current slug: <code>${escapeHtml(d.slug)}</code></span>
          ` : ''}
        </div>
        <div class="full">
          <label class="field-label">Short Description <span class="req">*</span></label>
          <textarea name="shortDescription" class="text-area" maxlength="400" required>${escapeHtml(d.shortDescription)}</textarea>
          <span class="field-hint">One or two sentences. Shown in Explorer cards.</span>
          <span class="error-msg"></span>
        </div>
        <div class="full">
          <label class="field-label">Full Description</label>
          <textarea name="fullDescription" class="text-area" style="min-height:110px">${escapeHtml(d.fullDescription || '')}</textarea>
          <span class="field-hint">Optional — reserved for future Page 3 detail view.</span>
        </div>
        <div class="full">
          <label class="field-label">Tags</label>
          <div data-ms="tags"></div>
          <span class="field-hint">Free-form keywords. Press Enter or comma to add.</span>
        </div>
      </div>
    </div>

    <div class="form-section">
      <h3 class="form-section-title">Classification</h3>
      <div class="form-grid">
        <div class="full" data-field-wrap="industry">
          <label class="field-label">Industry <span class="req">*</span></label>
          <div data-ms="industry"></div>
          <span class="error-msg"></span>
        </div>

        <div data-field-wrap="capital">
          <label class="field-label">Capital <span class="req">*</span></label>
          <select name="capital" class="select-input">
            <option value="">— Select —</option>
            ${CONFIG.capital.map(c => `
              <option value="${c.code}" ${capitalCodeOf(d.capital) === c.code ? 'selected' : ''}>${escapeHtml(c.label)}</option>
            `).join('')}
          </select>
          <span class="error-msg"></span>
        </div>

        <div data-field-wrap="difficulty">
          <label class="field-label">Difficulty <span class="req">*</span></label>
          <div data-ms="difficulty"></div>
          <span class="error-msg"></span>
        </div>

        <div class="full" data-field-wrap="businessModel">
          <label class="field-label">Business Model</label>
          <div data-ms="businessModel"></div>
        </div>

        <div class="full" data-field-wrap="opportunityType">
          <label class="field-label">Opportunity Type</label>
          <div data-ms="opportunityType"></div>
        </div>

        <div class="full" data-field-wrap="access">
          <label class="field-label">Access</label>
          <div data-ms="access"></div>
        </div>

        <div data-field-wrap="workLocation">
          <label class="field-label">Work Location</label>
          <div data-ms="workLocation"></div>
        </div>

        <div data-field-wrap="time">
          <label class="field-label">Time</label>
          <div data-ms="time"></div>
        </div>

        <div data-field-wrap="team">
          <label class="field-label">Team</label>
          <div data-ms="team"></div>
        </div>

        <div data-field-wrap="customer">
          <label class="field-label">Customer</label>
          <div data-ms="customer"></div>
        </div>

        <div class="full" data-field-wrap="scale">
          <label class="field-label">Scale</label>
          <div data-ms="scale"></div>
        </div>

        <div class="full" data-field-wrap="stage">
          <label class="field-label">Stage</label>
          <div data-ms="stage"></div>
        </div>

        <div class="full" data-field-wrap="resources">
          <label class="field-label">Resources</label>
          <div data-ms="resources"></div>
        </div>
      </div>
    </div>
  `;

  /* Mount multi-selects */
  for (const dim of ['industry','difficulty','businessModel','opportunityType','access',
                     'workLocation','time','team','customer','scale','stage','resources']) {
    mountMultiSelect(form.querySelector(`[data-ms="${dim}"]`), dim, d[dim] || []);
  }
  /* Tags is special: free-form */
  mountTagInput(form.querySelector('[data-ms="tags"]'), d.tags || []);

  /* Live title -> slug preview (only on new) */
  if (FormState.mode === 'new') {
    const titleInput = form.querySelector('input[name="title"]');
    titleInput.addEventListener('input', () => {
      FormState.data.title = titleInput.value;
    });
  }
}

function capitalCodeOf(cap) {
  if (!cap || typeof cap !== 'object') return '';
  const key = (cap.min === null || cap.min === undefined ? 'null' : cap.min) + '|' +
              (cap.max === null || cap.max === undefined ? 'null' : cap.max);
  return CAPITAL_CODE_BY_MINMAX.get(key) || '';
}

/* ---------- Multi-select component ---------- */
function mountMultiSelect(host, dim, initialCodes) {
  if (!host) return;
  const isMulti = MULTI_DIMS.has(dim);
  const options = CONFIG[dim]; /* array of [label, code] */
  const selected = new Set(initialCodes || []);

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'multi-select-trigger';
  trigger.setAttribute('aria-haspopup', 'listbox');

  const dropdown = document.createElement('div');
  dropdown.className = 'multi-select-dropdown hidden';
  dropdown.setAttribute('role', 'listbox');
  dropdown.setAttribute('aria-multiselectable', isMulti ? 'true' : 'false');

  const search = document.createElement('input');
  search.type = 'text';
  search.className = 'ms-search';
  search.placeholder = options.length > 20 ? 'Search...' : '';
  if (options.length <= 20) search.style.display = 'none';

  const list = document.createElement('div');
  list.className = 'ms-options';

  dropdown.appendChild(search);
  dropdown.appendChild(list);

  const wrap = document.createElement('div');
  wrap.className = 'multi-select';
  wrap.appendChild(trigger);
  wrap.appendChild(dropdown);
  host.appendChild(wrap);

  function renderTrigger() {
    trigger.innerHTML = '';
    if (selected.size === 0) {
      const ph = document.createElement('span');
      ph.className = 'ms-placeholder';
      ph.textContent = isMulti ? 'Select...' : '— Select —';
      trigger.appendChild(ph);
      return;
    }
    if (!isMulti && selected.size > 1) {
      /* Enforce single-select */
      const first = [...selected][0];
      selected.clear();
      selected.add(first);
    }
    for (const code of selected) {
      const label = CODE_TO_LABEL[dim].get(code) || code;
      const tag = document.createElement('span');
      tag.className = 'ms-tag';
      tag.innerHTML = `<span>${escapeHtml(label)}</span>`;
      const x = document.createElement('button');
      x.type = 'button';
      x.className = 'ms-tag-x';
      x.innerHTML = '&times;';
      x.setAttribute('aria-label', 'Remove');
      x.addEventListener('click', (e) => {
        e.stopPropagation();
        selected.delete(code);
        renderTrigger();
        renderList();
      });
      tag.appendChild(x);
      trigger.appendChild(tag);
    }
  }

  function renderList(filter = '') {
    list.innerHTML = '';
    const q = filter.trim().toLowerCase();
    const filtered = q
      ? options.filter(([label]) => label.toLowerCase().includes(q))
      : options;

    if (filtered.length === 0) {
      const none = document.createElement('div');
      none.className = 'ms-option none';
      none.textContent = 'No matches';
      list.appendChild(none);
      return;
    }

    for (const [label, code] of filtered) {
      const row = document.createElement('label');
      row.className = 'ms-option';
      const cb = document.createElement('input');
      cb.type = isMulti ? 'checkbox' : 'radio';
      cb.name = `ms-${dim}`;
      cb.checked = selected.has(code);
      const txt = document.createElement('span');
      txt.textContent = label;
      row.appendChild(cb);
      row.appendChild(txt);
      row.addEventListener('click', (e) => {
        /* Let the native input handle state; we sync after */
      });
      cb.addEventListener('change', () => {
        if (isMulti) {
          if (cb.checked) selected.add(code); else selected.delete(code);
        } else {
          selected.clear();
          if (cb.checked) selected.add(code);
          /* Close dropdown for single-select */
          dropdown.classList.add('hidden');
          wrap.classList.remove('open');
        }
        FormState.data[dim] = [...selected];
        renderTrigger();
      });
      list.appendChild(row);
    }
  }

  trigger.addEventListener('click', () => {
    const open = !dropdown.classList.contains('hidden');
    closeAllMultiSelects();
    if (!open) {
      dropdown.classList.remove('hidden');
      wrap.classList.add('open');
      renderList();
      if (search.style.display !== 'none') setTimeout(() => search.focus(), 0);
    }
  });

  search.addEventListener('input', () => renderList(search.value));

  /* Initial render */
  renderTrigger();

  /* Expose current selection */
  host._getValue = () => [...selected];
  host._setValue = (codes) => {
    selected.clear();
    (codes || []).forEach(c => selected.add(c));
    FormState.data[dim] = [...selected];
    renderTrigger();
  };
}

function closeAllMultiSelects() {
  document.querySelectorAll('.multi-select.open').forEach(w => {
    w.classList.remove('open');
    w.querySelector('.multi-select-dropdown').classList.add('hidden');
  });
}
document.addEventListener('click', (e) => {
  if (!e.target.closest('.multi-select')) closeAllMultiSelects();
});

/* ---------- Tag input (free-form) ---------- */
function mountTagInput(host, initialTags) {
  if (!host) return;
  const tags = [...(initialTags || [])];

  const trigger = document.createElement('div');
  trigger.className = 'multi-select-trigger';
  trigger.style.cursor = 'text';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Add tag and press Enter';
  input.style.cssText = 'border:none;outline:none;flex:1;min-width:120px;background:transparent;font-size:13px;padding:2px 0;';

  function render() {
    trigger.innerHTML = '';
    if (tags.length === 0) {
      const ph = document.createElement('span');
      ph.className = 'ms-placeholder';
      ph.textContent = 'No tags yet';
      trigger.appendChild(ph);
    } else {
      for (const t of tags) {
        const tag = document.createElement('span');
        tag.className = 'ms-tag';
        tag.innerHTML = `<span>${escapeHtml(t)}</span>`;
        const x = document.createElement('button');
        x.type = 'button';
        x.className = 'ms-tag-x';
        x.innerHTML = '&times;';
        x.addEventListener('click', () => {
          const i = tags.indexOf(t);
          if (i >= 0) tags.splice(i, 1);
          FormState.data.tags = [...tags];
          render();
        });
        tag.appendChild(x);
        trigger.appendChild(tag);
      }
    }
    trigger.appendChild(input);
  }

  function addTag(raw) {
    const t = raw.trim().replace(/,$/,'').trim();
    if (!t) return;
    if (!tags.includes(t)) tags.push(t);
    FormState.data.tags = [...tags];
    render();
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input.value);
      input.value = '';
    } else if (e.key === 'Backspace' && input.value === '' && tags.length) {
      tags.pop();
      FormState.data.tags = [...tags];
      render();
    }
  });
  input.addEventListener('blur', () => {
    if (input.value.trim()) { addTag(input.value); input.value = ''; }
  });

  trigger.addEventListener('click', () => input.focus());

  host.appendChild(trigger);
  render();
  host._getValue = () => [...tags];
}

/* ---------- Form submit ---------- */
document.getElementById('opp-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const form = e.target;
  const d = FormState.data;

  /* Pull simple fields */
  d.title = (form.querySelector('input[name="title"]').value || '').trim();
  d.shortDescription = (form.querySelector('textarea[name="shortDescription"]').value || '').trim();
  d.fullDescription = (form.querySelector('textarea[name="fullDescription"]').value || '').trim();

  /* Capital */
  const capCode = form.querySelector('select[name="capital"]').value;
  if (capCode) {
    const c = CAPITAL_BY_CODE.get(capCode);
    d.capital = { min: c.min, max: c.max };
  } else {
    d.capital = null;
  }

  /* Multi-selects already update FormState.data via their bindings */

  /* Validate */
  const errors = validate(d);

  /* Clear previous errors */
  form.querySelectorAll('.field-error').forEach(el => el.classList.remove('field-error'));
  form.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

  if (Object.keys(errors).length) {
    for (const [field, msg] of Object.entries(errors)) {
      const wrap = form.querySelector(`[data-field-wrap="${field}"]`) || form.querySelector(`[name="${field}"]`)?.closest('.full, [class*="field"]');
      if (wrap) {
        wrap.classList.add('field-error');
        const errEl = wrap.querySelector('.error-msg');
        if (errEl) errEl.textContent = msg;
      }
    }
    toast('Please fix the highlighted fields.', 'error');
    return;
  }

  /* Slug handling */
  let slug = d.slug;
  if (FormState.mode === 'new') {
    slug = Store.generateSlug(d.title);
  } else {
    const regen = form.querySelector('#regen-slug')?.checked;
    if (regen) {
      const newSlug = Store.generateSlug(d.title, d.id);
      slug = newSlug;
    } else {
      /* Keep existing slug, but if title changed and slug would collide with another, warn */
      if (Store.slugExists(slug, d.id)) {
        /* Should never happen since we preserve original, but guard anyway */
        slug = Store.generateSlug(d.title, d.id);
      }
    }
  }

  /* Build final object */
  const now = new Date().toISOString();
  let finalOpp;
  if (FormState.mode === 'new') {
    finalOpp = {
      id: Store.nextId(),
      slug,
      title: d.title,
      shortDescription: d.shortDescription,
      fullDescription: d.fullDescription || '',
      industry: d.industry,
      capital: d.capital,
      difficulty: d.difficulty,
      businessModel: d.businessModel,
      opportunityType: d.opportunityType,
      access: d.access,
      workLocation: d.workLocation,
      time: d.time,
      team: d.team,
      customer: d.customer,
      scale: d.scale,
      stage: d.stage,
      resources: d.resources,
      tags: d.tags,
      createdAt: now
    };
    Store.add(finalOpp);
    toast(`Created ${finalOpp.id}`, 'success');
  } else {
    finalOpp = {
      ...d,
      slug,
      title: d.title,
      shortDescription: d.shortDescription,
      fullDescription: d.fullDescription || '',
      industry: d.industry,
      capital: d.capital,
      difficulty: d.difficulty,
      businessModel: d.businessModel,
      opportunityType: d.opportunityType,
      access: d.access,
      workLocation: d.workLocation,
      time: d.time,
      team: d.team,
      customer: d.customer,
      scale: d.scale,
      stage: d.stage,
      resources: d.resources,
      tags: d.tags
    };
    Store.update(d.id, finalOpp);
    toast(`Saved ${finalOpp.id}`, 'success');
  }

  hideModal('form-modal');
  renderList();
});

/* ---------------- LIST VIEW ---------------- */
const PAGE_SIZE = 50;
let currentPage = 1;
let currentFilter = { search: '', industry: '', capital: '', difficulty: '' };

function populateFilterSelects() {
  const ind = document.getElementById('filter-industry');
  for (const [label, code] of CONFIG.industry) {
    const o = document.createElement('option');
    o.value = code; o.textContent = label;
    ind.appendChild(o);
  }
  const cap = document.getElementById('filter-capital');
  for (const c of CONFIG.capital) {
    const o = document.createElement('option');
    o.value = c.code; o.textContent = c.label;
    cap.appendChild(o);
  }
  const diff = document.getElementById('filter-difficulty');
  for (const [label, code] of CONFIG.difficulty) {
    const o = document.createElement('option');
    o.value = code; o.textContent = label;
    diff.appendChild(o);
  }
}

function applyFilters(list) {
  const q = currentFilter.search.trim().toLowerCase();
  return list.filter(o => {
    if (currentFilter.industry && !(o.industry || []).includes(currentFilter.industry)) return false;
    if (currentFilter.difficulty && !(o.difficulty || []).includes(currentFilter.difficulty)) return false;
    if (currentFilter.capital) {
      const want = CAPITAL_BY_CODE.get(currentFilter.capital);
      if (!want) return false;
      const have = o.capital || {};
      if (have.min !== want.min || have.max !== want.max) return false;
    }
    if (q) {
      const hay = [
        o.title, o.shortDescription, o.fullDescription,
        (o.tags || []).join(' '),
        labelsForCodes('industry', o.industry).join(' '),
        labelsForCodes('businessModel', o.businessModel).join(' '),
        labelsForCodes('opportunityType', o.opportunityType).join(' ')
      ].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

function renderList() {
  const all = Store.all();
  const filtered = applyFilters(all);
  const tbody = document.getElementById('opp-tbody');
  const empty = document.getElementById('empty-state');
  const pag = document.getElementById('pagination');
  const stats = document.getElementById('stats-count');

  stats.textContent = `${filtered.length} of ${all.length} opportunities`;

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    empty.classList.remove('hidden');
    pag.classList.add('hidden');
    return;
  }
  empty.classList.add('hidden');

  /* Sort by createdAt desc, then by id desc */
  filtered.sort((a, b) => {
    const ta = a.createdAt || ''; const tb = b.createdAt || '';
    if (ta !== tb) return tb.localeCompare(ta);
    return (b.id || '').localeCompare(a.id || '');
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  if (currentPage > totalPages) currentPage = totalPages;
  const start = (currentPage - 1) * PAGE_SIZE;
  const page = filtered.slice(start, start + PAGE_SIZE);

  tbody.innerHTML = page.map(o => `
    <tr data-id="${escapeHtml(o.id)}">
      <td class="col-id">${escapeHtml(o.id)}</td>
      <td class="col-title">
        <a href="../business.html?slug=${encodeURIComponent(o.slug)}" title="${escapeHtml(o.shortDescription || '')}" target="_blank">
          ${escapeHtml(o.title)}
        </a>
      </td>
      <td class="col-industry"><div class="chip-row">${chipsHtml(o.industry, 'industry', 2)}</div></td>
      <td class="col-capital">${escapeHtml(capitalLabelFromValue(o.capital))}</td>
      <td class="col-difficulty"><div class="chip-row">${chipsHtml(o.difficulty, 'difficulty', 1)}</div></td>
      <td class="col-bm"><div class="chip-row">${chipsHtml(o.businessModel, 'businessModel', 2)}</div></td>
      <td class="col-ot"><div class="chip-row">${chipsHtml(o.opportunityType, 'opportunityType', 2)}</div></td>
      <td class="col-created">${escapeHtml(formatDate(o.createdAt))}</td>
      <td class="col-actions">
        <div class="actions-cell">
          <button class="btn btn-ghost btn-sm" data-act="edit">Edit</button>
          <button class="btn btn-ghost btn-sm" data-act="dup">Duplicate</button>
          <button class="btn btn-ghost btn-sm" data-act="del" style="color:var(--danger)">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');

  /* Pagination */
  if (totalPages > 1) {
    pag.classList.remove('hidden');
    const pages = buildPageButtons(currentPage, totalPages);
    pag.innerHTML = `
      <span>Page ${currentPage} of ${totalPages}</span>
      <div class="page-controls">
        <button class="page-btn" data-page="prev" ${currentPage === 1 ? 'disabled' : ''}>‹</button>
        ${pages.map(p => p === '...'
          ? `<span style="padding:0 4px;color:var(--text-dim)">…</span>`
          : `<button class="page-btn ${p === currentPage ? 'active' : ''}" data-page="${p}">${p}</button>`
        ).join('')}
        <button class="page-btn" data-page="next" ${currentPage === totalPages ? 'disabled' : ''}>›</button>
      </div>
    `;
  } else {
    pag.classList.add('hidden');
  }
}

function buildPageButtons(current, total) {
  if (total <= 7) return Array.from({length: total}, (_, i) => i + 1);
  const pages = new Set([1, total, current, current - 1, current + 1]);
  const arr = [...pages].filter(p => p >= 1 && p <= total).sort((a,b) => a - b);
  const out = [];
  let prev = 0;
  for (const p of arr) {
    if (p - prev > 1) out.push('...');
    out.push(p);
    prev = p;
  }
  return out;
}

/* List event delegation */
document.getElementById('opp-tbody').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-act]');
  if (!btn) return;
  const tr = btn.closest('tr');
  const id = tr.dataset.id;
  const opp = Store.get(id);
  if (!opp) return;
  const act = btn.dataset.act;
  if (act === 'edit') {
    openForm('edit', opp);
  } else if (act === 'dup') {
    duplicateOpportunity(opp);
  } else if (act === 'del') {
    if (confirm(`Delete ${opp.id} — "${opp.title}"? This cannot be undone.`)) {
      Store.remove(id);
      toast(`Deleted ${id}`, 'success');
      renderList();
    }
  }
});

document.getElementById('pagination').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-page]');
  if (!btn || btn.disabled) return;
  const p = btn.dataset.page;
  if (p === 'prev') currentPage--;
  else if (p === 'next') currentPage++;
  else currentPage = parseInt(p, 10);
  renderList();
});

/* Toolbar bindings */
document.getElementById('search').addEventListener('input', (e) => {
  currentFilter.search = e.target.value;
  currentPage = 1;
  renderList();
});
document.getElementById('filter-industry').addEventListener('change', (e) => {
  currentFilter.industry = e.target.value;
  currentPage = 1;
  renderList();
});
document.getElementById('filter-capital').addEventListener('change', (e) => {
  currentFilter.capital = e.target.value;
  currentPage = 1;
  renderList();
});
document.getElementById('filter-difficulty').addEventListener('change', (e) => {
  currentFilter.difficulty = e.target.value;
  currentPage = 1;
  renderList();
});

/* ---------------- DUPLICATE ---------------- */
function duplicateOpportunity(opp) {
  const copy = structuredClone(opp);
  copy.id = Store.nextId();
  copy.slug = Store.generateSlug(opp.title + ' copy');
  copy.title = opp.title + ' (Copy)';
  copy.createdAt = new Date().toISOString();
  Store.add(copy);
  toast(`Duplicated → ${copy.id}`, 'success');
  renderList();
}

/* ---------------- MODAL HELPERS ---------------- */
function showModal(id) {
  document.getElementById(id).classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function hideModal(id) {
  document.getElementById(id).classList.add('hidden');
  document.body.style.overflow = '';
}
document.querySelectorAll('[data-close]').forEach(el => {
  el.addEventListener('click', () => {
    const modal = el.closest('.modal');
    if (modal) hideModal(modal.id);
  });
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal:not(.hidden)').forEach(m => hideModal(m.id));
  }
});

/* ---------------- HEADER ACTIONS ---------------- */
document.getElementById('btn-add').addEventListener('click', () => openForm('new'));
document.getElementById('btn-export').addEventListener('click', openExportModal);
document.getElementById('btn-import').addEventListener('click', openImportModal);

/* ---------------- EXPORT ---------------- */
function openExportModal() {
  const all = Store.all();
  if (all.length === 0) {
    toast('Nothing to export yet.', 'warn');
    return;
  }
  /* Pre-populate industries from the data */
  const industries = [...new Set(all.flatMap(o => o.industry || []))].sort();
  const snippet = {
    path: 'opportunities/<filename>.json',
    industries
  };
  document.getElementById('manifest-snippet').textContent = JSON.stringify(snippet, null, 2);
  showModal('export-modal');
}

document.getElementById('btn-copy-manifest').addEventListener('click', async () => {
  const text = document.getElementById('manifest-snippet').textContent;
  try {
    await navigator.clipboard.writeText(text);
    toast('Manifest entry copied', 'success');
  } catch {
    toast('Copy failed — select manually', 'error');
  }
});

document.getElementById('btn-export-run').addEventListener('click', () => {
  const all = Store.all();
  if (all.length === 0) { toast('Nothing to export.', 'warn'); return; }
  let filename = (document.getElementById('export-filename').value || 'opportunities').trim();
  filename = filename.replace(/\.json$/i, '').replace(/[^\w\-]+/g, '-').replace(/^-+|-+$/g, '') || 'opportunities';

  /* Update manifest snippet with actual filename */
  const industries = [...new Set(all.flatMap(o => o.industry || []))].sort();
  const snippet = { path: `opportunities/${filename}.json`, industries };
  document.getElementById('manifest-snippet').textContent = JSON.stringify(snippet, null, 2);

  /* Clean export: ensure every required field exists */
  const clean = all.map(o => ({
    id: o.id,
    slug: o.slug,
    title: o.title,
    shortDescription: o.shortDescription,
    fullDescription: o.fullDescription || '',
    industry: o.industry || [],
    capital: o.capital || { min: 0, max: 0 },
    difficulty: o.difficulty || [],
    businessModel: o.businessModel || [],
    opportunityType: o.opportunityType || [],
    access: o.access || [],
    workLocation: o.workLocation || [],
    time: o.time || [],
    team: o.team || [],
    customer: o.customer || [],
    scale: o.scale || [],
    stage: o.stage || [],
    resources: o.resources || [],
    tags: o.tags || [],
    createdAt: o.createdAt || new Date().toISOString()
  }));

  const json = JSON.stringify(clean, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast(`Exported ${clean.length} opportunities → ${filename}.json`, 'success');
});

/* ---------------- IMPORT ---------------- */
let importState = { parsed: [], conflicts: [], valid: [], invalid: [] };

function openImportModal() {
  importState = { parsed: [], conflicts: [], valid: [], invalid: [] };
  document.getElementById('import-text').value = '';
  document.getElementById('import-file').value = '';
  document.getElementById('import-file-name').textContent = '';
  document.getElementById('import-preview').innerHTML = '';
  showModal('import-modal');
}

document.getElementById('import-file').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  document.getElementById('import-file-name').textContent = file.name;
  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById('import-text').value = String(reader.result || '');
    previewImport();
  };
  reader.onerror = () => toast('Could not read file', 'error');
  reader.readAsText(file);
});

document.getElementById('import-text').addEventListener('input', debounce(previewImport, 300));

function debounce(fn, ms) {
  let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}

function previewImport() {
  const raw = document.getElementById('import-text').value.trim();
  const preview = document.getElementById('import-preview');
  if (!raw) { preview.innerHTML = ''; importState = { parsed: [], conflicts: [], valid: [], invalid: [] }; return; }

  let arr;
  try {
    const parsed = JSON.parse(raw);
    arr = Array.isArray(parsed) ? parsed : [parsed];
  } catch (err) {
    preview.innerHTML = `<div class="err">Invalid JSON: ${escapeHtml(err.message)}</div>`;
    importState = { parsed: [], conflicts: [], valid: [], invalid: [] };
    return;
  }

  const valid = [];
  const invalid = [];
  for (let i = 0; i < arr.length; i++) {
    const rec = normalizeImportedRecord(arr[i]);
    const errs = validate(rec);
    if (Object.keys(errs).length) {
      invalid.push({ index: i, id: rec.id || '(no id)', errors: errs });
    } else {
      valid.push(rec);
    }
  }

  const existingIds = new Set(Store.all().map(o => o.id));
  const existingSlugs = new Set(Store.all().map(o => o.slug));
  const conflicts = valid.filter(r => existingIds.has(r.id) || existingSlugs.has(r.slug));

  importState = { parsed: arr, valid, invalid, conflicts };

  let html = `<div><span class="ok">✓ ${valid.length} valid</span> · <span class="err">✗ ${invalid.length} invalid</span> · <span class="warn">⚠ ${conflicts.length} conflict with existing data</span></div>`;

  if (invalid.length) {
    html += `<details style="margin-top:8px"><summary style="cursor:pointer;color:var(--danger);font-size:12px">Invalid records (${invalid.length})</summary><ul>`;
    for (const r of invalid.slice(0, 20)) {
      html += `<li><code>${escapeHtml(r.id)}</code> (row ${r.index + 1}): ${escapeHtml(Object.values(r.errors).join('; '))}</li>`;
    }
    if (invalid.length > 20) html += `<li>…and ${invalid.length - 20} more</li>`;
    html += `</ul></details>`;
  }

  if (conflicts.length) {
    html += `<div class="import-strategy">
      <strong style="font-size:12px">How to handle ${conflicts.length} conflict(s):</strong>
      <label><input type="radio" name="strategy" value="skip" checked> <span><strong>Skip</strong> conflicting records, import the rest</span></label>
      <label><input type="radio" name="strategy" value="rename"> <span><strong>Rename</strong> conflicting IDs (append -2, -3…) and regenerate clashing slugs</span></label>
      <label><input type="radio" name="strategy" value="overwrite"> <span><strong>Overwrite</strong> existing records with imported versions</span></label>
    </div>`;
  }

  preview.innerHTML = html;
}

function normalizeImportedRecord(raw) {
  if (!raw || typeof raw !== 'object') return raw;
  const r = { ...raw };

  /* Ensure array dims are arrays */
  for (const dim of ARRAY_DIMS) {
    if (r[dim] === undefined || r[dim] === null) r[dim] = [];
    else if (!Array.isArray(r[dim])) r[dim] = [r[dim]];
  }

  /* Normalize capital */
  if (r.capital && typeof r.capital === 'object') {
    const min = typeof r.capital.min === 'number' ? r.capital.min : null;
    const max = r.capital.max === null || typeof r.capital.max === 'number' ? r.capital.max : null;
    r.capital = { min, max };
  } else if (typeof r.capital === 'string') {
    /* Try to convert legacy string code to object */
    const c = CAPITAL_BY_CODE.get(r.capital);
    if (c) r.capital = { min: c.min, max: c.max };
    else r.capital = { min: null, max: null };
  } else {
    r.capital = { min: null, max: null };
  }

  /* Ensure slug exists */
  if (!r.slug && r.title) r.slug = slugify(r.title);

  /* Ensure createdAt */
  if (!r.createdAt) r.createdAt = new Date().toISOString();

  /* Ensure strings are strings */
  r.title = String(r.title || '').trim();
  r.shortDescription = String(r.shortDescription || '').trim();
  r.fullDescription = String(r.fullDescription || '').trim();

  return r;
}

document.getElementById('btn-import-run').addEventListener('click', () => {
  const { valid, invalid, conflicts } = importState;
  if (!valid.length && !invalid.length) {
    toast('Paste JSON or choose a file first.', 'warn');
    return;
  }
  if (!valid.length) {
    toast('No valid records to import.', 'error');
    return;
  }

  const strategyEl = document.querySelector('input[name="strategy"]:checked');
  const strategy = strategyEl ? strategyEl.value : 'skip';

  let added = 0, skipped = 0, overwritten = 0, renamed = 0;
  const existingIds = new Set(Store.all().map(o => o.id));
  const existingSlugs = new Set(Store.all().map(o => o.slug));

  for (const rec of valid) {
    const idConflict = existingIds.has(rec.id);
    const slugConflict = existingSlugs.has(rec.slug);
    const hasConflict = idConflict || slugConflict;

    if (!hasConflict) {
      Store.add(rec);
      existingIds.add(rec.id);
      existingSlugs.add(rec.slug);
      added++;
      continue;
    }

    if (strategy === 'skip') {
      skipped++;
      continue;
    }

    if (strategy === 'overwrite' && idConflict) {
      Store.update(rec.id, rec);
      overwritten++;
      continue;
    }

    if (strategy === 'rename') {
      /* Assign a fresh ID */
      const newId = Store.nextId();
      /* Regenerate slug if clashing */
      let newSlug = rec.slug;
      if (slugConflict) newSlug = Store.generateSlug(rec.title);
      const copy = { ...rec, id: newId, slug: newSlug };
      Store.add(copy);
      existingIds.add(newId);
      existingSlugs.add(newSlug);
      renamed++;
      continue;
    }

    /* Default: skip */
    skipped++;
  }

  hideModal('import-modal');
  toast(`Imported: ${added} added, ${renamed} renamed, ${overwritten} overwritten, ${skipped} skipped. ${invalid.length} invalid.`, added || renamed || overwritten ? 'success' : 'warn');
  renderList();
});

/* ---------------- INIT ---------------- */
function init() {
  Store.load();
  populateFilterSelects();
  renderList();
}
document.addEventListener('DOMContentLoaded', init);
