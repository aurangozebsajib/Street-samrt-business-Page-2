# Street Smart Business Lab — Opportunity Builder

## What this is

An internal, single-user data-entry tool for creating, validating,
storing, and exporting opportunity records for Page 2 (the Explorer,
`explore.html`). No backend, no build step — plain HTML/CSS/vanilla
JS, opened directly in a browser.

It is built to match the Explorer's existing contract exactly:
`js/filters-config.js` is the only source of filter labels/codes,
and everything the Builder exports matches `DATA_SCHEMA.md`.

## File placement

```
your-site/
├── explore.html
├── data/
│   ├── manifest.json
│   └── opportunities/
│       └── demo-opportunities.json
├── js/
│   ├── filters-config.js
│   ├── data-loader.js
│   └── explore.js
└── builder/                  <-- this tool
    ├── builder.html
    ├── builder.css
    ├── builder.js
    └── README.md
```

`builder.html` loads `../js/filters-config.js`, so the `builder/`
folder must sit as a sibling of `js/` — one level below whatever
folder `js/` lives in. It does **not** need `explore.js` or
`data-loader.js`; it only depends on `filters-config.js` for codes
and labels.

## Opening it

Just open `builder/builder.html` in a browser. No server or install
step is required — everything (including your data) lives in that
browser's `localStorage`, scoped to wherever you're serving the file
from.

**Important:** `localStorage` is per-origin. If you sometimes open
the file as `file://.../builder.html` and other times through a local
dev server (`http://localhost:.../builder.html`), those are two
different origins with two different storerooms — your opportunities
won't follow you between them. Pick one way of opening it and stick
with it while you're entering data.

## Everyday workflow

1. **+ Add Idea** opens a form. Fill in the required fields (marked
   with a red `*`) and click **Save Opportunity**.
2. **Save & add another** (checked by default when creating) keeps
   the form open and clears it for the next entry, so you can enter
   10, 100, or 1,000 opportunities back-to-back without reopening the
   modal each time.
3. Saved opportunities appear in the table immediately. Use the
   search box and the Industry/Difficulty dropdowns above the table
   to find one quickly — this works fine with well over a thousand
   records, since the table only renders one page (25–250 rows,
   your choice) at a time.
4. **Edit** re-opens the form pre-filled. The opportunity's ID and
   slug are shown read-only under the title and never change here,
   even if you edit the title — see "IDs and slugs," below.
5. **Duplicate** opens the form pre-filled from that opportunity with
   `(Copy)` appended to the title, ready for you to tweak before
   saving. It always gets a brand-new ID and slug — nothing about the
   original is touched.
6. **Delete** asks for confirmation, then removes the record. Its ID
   is retired permanently; the next new opportunity you create will
   never reuse it, even though the ID counter doesn't "reset" or
   "fill the gap."
7. Everything is saved to `localStorage` as you go — closing the tab
   or restarting the browser doesn't lose your work.

## IDs and slugs

- **ID** (`OP00001`, `OP00002`, …) is assigned automatically the
  moment you save a new opportunity, and never changes after that —
  not on edit, not ever. The counter only moves forward: deleting an
  opportunity does not free its number for reuse, and duplicating one
  always mints a fresh ID.
- **Slug** is generated from the title the first time you save a new
  opportunity (`Garlic Supply to Restaurants` → `garlic-supply-to-
  restaurants`; a `-2`, `-3`, … suffix is added automatically if that
  slug is already taken). Editing the title afterward does **not**
  change the slug — this is deliberate, so a link someone already has
  to `business.html?slug=garlic-supply-to-restaurants` never breaks
  just because you tightened the title later. There's no "regenerate
  slug" button in this version; if you genuinely need to change a
  slug, the safest way is to note the new title, delete the old
  record, and re-create it (which mints a fresh slug from scratch).

## Capital

The Capital dropdown shows the same human ranges as Page 1
(৳0, ৳1–10,000, … ৳1 crore+). Selecting one stores the opportunity's
capital as the numeric structure the Explorer actually filters on:

```json
"capital": { "min": 10000, "max": 50000, "codes": ["10000-50000"] }
```

"I don't know" is intentionally left out of this dropdown — it's a
*filter* a visitor picks on Page 1 to mean "I'm not sure what I can
spend," not a real range an opportunity can have.

## Import

**Import JSON** accepts either shape `DATA_SCHEMA.md` allows: a bare
array of opportunities, or `{ "opportunities": [...] }`.

- A record needs at minimum a non-empty `id`, `slug`, and `title` to
  be accepted — anything missing one of those three is skipped and
  listed under "invalid record" in the results.
- If an imported `id` already exists in your current data, that
  record is skipped and listed under "skipped — ID already exists."
  **Nothing already saved is ever silently overwritten by an import.**
  If you actually want to replace an existing record, delete it
  first, then import.
- After a successful import, the ID counter is advanced past any
  `OP#####`-style IDs found in the imported file, so opportunities
  you create afterward can never collide with imported ones.

## Export

**Export JSON** asks for a filename (no need to type `.json` — or if
you do, it's stripped and re-added once, so `fishing.json` and
`fishing` both produce `fishing.json`). It downloads **all**
opportunities currently stored — not just whatever's showing after a
search/filter — as:

```json
{ "opportunities": [ { ... }, { ... } ] }
```

matching the shape `demo-opportunities.json` already uses.

After downloading, the same modal shows a ready-to-copy manifest
entry, e.g.:

```json
{
  "path": "opportunities/fishing-opportunities.json",
  "industries": ["fisheries", "fish", "warehousing"]
}
```

The `industries` list is generated automatically from whatever
industries actually appear across the exported records.

### Registering an exported file on Page 2

1. Move the downloaded `.json` file into `data/opportunities/` (or
   wherever your other opportunity files already live).
2. Open `data/manifest.json` and add the copied entry to the `files`
   array — for example:

   ```json
   {
     "files": [
       { "path": "opportunities/demo-opportunities.json", "industries": [...] },
       { "path": "opportunities/fishing-opportunities.json", "industries": ["fisheries", "fish", "warehousing"] }
     ]
   }
   ```

3. Save `manifest.json`. No code changes anywhere else — `explore.js`
   and `data-loader.js` pick up the new file automatically the next
   time Page 2 loads. The filename itself carries no meaning to the
   Explorer; call it whatever helps you keep track of your own
   working files.

## Validation

Before a record can be saved (whether typed in or imported), the
Builder checks: title, short description, one capital range, one
difficulty, at least one industry, at least one business model, at
least one opportunity type, at least one access item, a work
location, a time commitment, a team size, a customer type, at least
one scale, at least one stage, and at least one resource. Saving is
blocked and every missing piece is listed until they're all filled
in — this is what keeps a malformed record from ever reaching Page 2.

## What was tested before delivery

Working end-to-end (via an automated jsdom test run against the real
`builder.html` + `builder.css` + `builder.js`, not just read through):
create → persists across a simulated refresh → second create → delete
→ third create confirms the ID sequence never reuses a deleted number
→ duplicate mints a new ID and a distinct slug → edit preserves ID and
slug while changing other fields → import validates and rejects
malformed/duplicate-ID records without overwriting anything → the
same file re-imported twice adds nothing the second time → a blank
form is correctly blocked from saving with every missing field
listed → capital always exports as `{min, max, codes}` → every
exported code exists in `filters-config.js` → 1,000+ imported records
still render as a single fast page → the Export button's filename
handling and generated manifest snippet are correct.

One real bug was caught and fixed by this testing: Duplicate was
leaving the Capital field blank in the pre-filled form (it read the
whole `capital` object instead of its code) — fixed before delivery.

## Known limitations

- Single-user, single-browser by design — there is no sync between
  devices or people. If more than one person needs to add
  opportunities, export/import is currently how you'd merge work
  (import will safely skip anything with a colliding ID rather than
  overwrite it, so it's safe to try).
- No slug-regeneration control (see "IDs and slugs," above) —
  intentional, to protect already-shared Page 3 links.
- `fullDescription` is stored and exported even when left blank
  (as an empty string), since Page 3 will eventually want it.
