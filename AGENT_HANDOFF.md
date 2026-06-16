# AGENT HANDOFF DOCUMENTATION

**To the next Antigravity Agent:**
Welcome to the **L.I. Ad Formatter AI** project for Grand RP! 
The user is handing this project over to you. Please read this document carefully to understand the exact state of the codebase, the architecture, and the highly specific grammatical rules that have been hardcoded into the application.

## 1. Project Overview
This is a React-based web application (built with Vite) that generates perfectly formatted roleplay advertisements based on strict server rules. It has a beautiful, compact, "modern startup" aesthetic designed to minimize vertical scrolling.

- **Root Directory:** `c:\Users\ekans\Desktop\li\app`
- **Run Command:** `npm run dev`
- **Tech Stack:** React, Vanilla CSS (`index.css`), Vite.

## 2. File Architecture
- **`src/App.jsx`**: The core engine. It contains all React State, the UI layout, and the explicit string-generation functions (`generateAutoAd`, `generateRealEstateAd`, `generateBusinessAd`). 
- **`src/data.js`**: The single source of truth for all dropdowns and checklists. It exports arrays for `carsList`, `officialLocations`, `unofficialLocations`, `familyBusinesses`, `generalBusinesses`, and `sharesBusinesses`.
- **`src/utils/formatter.js`**: Contains the logic for the "Auto-Detect" tab (parsing raw text).
- **`src/index.css`**: Contains all the styling. It is specifically tuned to be compact with small gaps, minimal padding, and horizontal centering.

## 3. Core Logic & Grammatical Rules (CRITICAL)
The application relies heavily on specific grammatical rules requested by the user. Do not break these rules when adding new features:

### A. Location Grammar
- **Official Locations:** Rendered exactly as named. (e.g., `in Vinewood`, `near Sandy Shores`).
- **Unofficial Locations:** Must automatically include "the" before the name and be lowercased. (e.g., `in the city`, `near the beach`).
- *Note:* The user explicitly requested the UI checklist to display "Official Locations" first, followed by "Unofficial Locations", stacked in a single scrollable container.

### B. Real Estate Rules
- **Penthouse Exception:** If the user selects "Penthouse", it MUST be output as `"Casino penthouse"`. If a house number is provided, it becomes `"Casino penthouse №[num]"`. Furthermore, penthouses DO NOT get a location string appended to them (the location state is ignored).
- **Format:** `[Action] [Property] №[Num] [Location]. Price/Budget: [Price].`

### C. Business Rules
- **Category Split:** Businesses are split into `General Business` and `Family Business`.
- **Modifiers:** General Businesses have modifiers: `Standard`, `Shares`, and `Control`.
  - `Shares`: Appends "shares" (e.g., "Gas station shares"). Does not use a Business Number.
  - `Control`: Appends "Control" (e.g., "Chip tuning №4 Control").
- **Plantations (Family Business):** Selecting "Plantation" reveals two extra text inputs: `Crop Type` and `Beds`. It dynamically formats capitalization: `Cabbage plantation business with 20 beds`.
- **Terminology Overrides:**
  - If a user attempts to sell a generic General Business, it defaults to `"private business"` (e.g., "Buying a private business.").
  - "Drug lab" is strictly prohibited and automatically mapped to `"Burger shop"`.
- **Trade Restrictions:** Family Businesses CANNOT be traded. The Trade UI button is hidden when Family Business is selected.
- **Number Appending:** If a specific business is selected but NO business number is provided, the word `"business"` is appended (e.g., `"Selling ATM business"`). If a number is provided, `"business"` is omitted (e.g., `"Selling 24/7 Store №123"`).

### D. Global Price Rules
- **The $500M Cap:** Across the board (specifically implemented in the Business logic), if a price is evaluated to be greater than $500,000,000, the output string MUST automatically replace the price with `"Negotiable"`.

### E. Work Rules
- **Construction Roles vs General Roles:** Work professions are split into General Roles and Construction Roles. Construction roles (and 'Trucker') unlock additional UI fields like "Construction Site №" and "Years of Experience".
- **Dynamic Naming:** The 'Construction site' option automatically renders as 'Workers' in the UI when the action is set to 'Hiring', but its underlying value remains 'Construction site'.
- **Location Overrides:** Selecting 'Firefighter' automatically locks the location prefix to `at`. Certain roles (Trucker, Lawyer, Personal driver, Assistant, Solar panel plantation worker) have their location UI completely hidden, and location formatting is ignored.
- **Looking vs Hiring:** If the action is "Looking", the Salary block is hidden completely and omitted from generation. If "Looking for a job" is selected with "None" for profession, Construction Site No and Experience are hidden.

### F. Global Formatting Rules
- **Digit Period Rule:** A global formatting function (`applyDigitRule`) runs on every single generated ad right before output. If the ad ends in a period `.`, and the character immediately before it is a digit (e.g., `$200.000.` or `№1.`), the period is stripped automatically. If it ends in a word, the period is kept.
- **Category Switching Reset:** Whenever a user switches between categories (e.g., from Auto to Work), ALL form states across all categories are instantly reset to their defaults to ensure a clean slate.

## 4. How to Continue Work
When you take over, simply read the user's prompt. All modifications to the UI should remain compact to match the `index.css` design philosophy. If adding new categories (like Dating or Work), follow the exact same state-driven architecture found in `App.jsx`.

Good luck!
