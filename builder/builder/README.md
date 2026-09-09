# Opportunity Builder — Street Smart Business Lab

Internal data-entry tool for creating, managing, and exporting opportunity
records compatible with the existing Page 2 Opportunity Explorer.

## Files

- `builder.html` — UI shell
- `builder.css`  — styling
- `builder.js`   — logic, config, storage, import/export
- `README.md`    — this file

## How to open

Open `builder.html` directly in your browser, e.g.:

    file:///path/to/your-site/builder/builder.html

Or serve the site locally:

    python3 -m http.server 8000
    # then visit http://localhost:8000/builder/builder.html

All data is stored in the browser's localStorage under the key
`ssbl_builder_opps_v1`. The ID counter lives in `ssbl_builder_counter_v1`.
Refresh freely — your work persists.

## Workflow

1. Click **+ Add Idea** → fill the form → **Save Opportunity**.
2. The opportunity appears in the list.
3. Repeat. Create 10, 100, 1000+ without opening multiple forms.
4. Use the search box and filter dropdowns to find records quickly.
5. Per-row actions: **Edit**, **Duplicate**, **Delete**.

## IDs & slugs

- IDs are auto-generated in the format `OP00001`, `OP00002`, …
- The counter is monotonic — deleting `OP00002` does not reuse that number.
- Slugs are generated from the title (`Garlic Supply → garlic-supply`).
- When editing, the slug is preserved unless you check **Regenerate slug**.
- Slugs are always unique — collisions get `-2`, `-3`, … suffixes.

## Export

1. Click **Export JSON**.
2. Enter a filename (without `.json`), e.g. `fishing-opportunities`.
3. Click **Download JSON** → saves `fishing-opportunities.json`.
4. The modal also shows a ready-to-paste manifest entry.

## Registering with Page 2

1. Move the exported JSON into your site's `data/opportunities/` folder:

       data/opportunities/fishing-opportunities.json

2. Edit `data/manifest.json` and add an entry:

       {
         "files": [
           {
             "path": "opportunities/demo-opportunities.json",
             "industries": ["food-supply", "restaurant"]
           },
           {
             "path": "opportunities/fishing-opportunities.json",
             "industries": ["fisheries", "fish"]
           }
         ]
       }

   The `industries` array is a hint for the Explorer — list the primary
   industries covered by that file. The actual classification lives inside
   each opportunity record.

3. Reload `explore.html` — Page 2 will pick up the new file automatically.

## Import

- **Import JSON** accepts either an array of opportunities or a single object.
- Records are validated against the Explorer schema before import.
- If imported IDs or slugs clash with existing data, you choose:
  - **Skip** conflicting records
  - **Rename** them (new ID, regenerated slug if needed)
  - **Overwrite** existing records with the imported version
- Invalid records are reported but never silently imported.

## Schema compatibility

Every exported record matches the Explorer's expected structure:

    {
      "id": "OP00001",
      "slug": "garlic-supply-to-restaurants",
      "title": "Garlic Supply to Restaurants",
      "shortDescription": "...",
      "fullDescription": "",
      "industry": ["food-supply", "restaurant"],
      "capital": { "min": 10000, "max": 50000 },
      "difficulty": ["beginner"],
      "businessModel": ["reselling", "b2b-sourcing"],
      "opportunityType": ["supply-gap"],
      "access": ["supplier", "delivery-network"],
      "workLocation": ["offline"],
      "time": ["full-time"],
      "team": ["solo"],
      "customer": ["b2b"],
      "scale": ["small-local-business", "growing-business"],
      "stage": ["start-from-scratch"],
      "resources": ["supplier-network", "distribution-network"],
      "tags": ["garlic", "restaurant supply"],
      "createdAt": "2026-09-09T00:00:00.000Z"
    }

All dimension values use the exact codes from the existing
`filters-config.js` — the same codes Page 2 filters on.

## Notes

- The Builder never modifies your existing site files.
- The filter labels/codes are embedded in `builder.js` and mirror
  `filters-config.js`. If you change `filters-config.js`, update the
  `CONFIG` object in `builder.js` to match.
- Capital is stored as `{ min, max }` — never as a bare string.
- The "I don't know" capital option exists for completeness but should
  normally not be used as an opportunity's actual capital range.
