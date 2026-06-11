# ⚛️ AP Chem Academy

An animated, interactive single-page course that teaches chemistry from the
ground up — and works through **every problem on the AP Chemistry summer
homework**, step by step.

## Running it

No build step, no dependencies. Just open `index.html` in a browser, or serve
the folder:

```bash
npx http-server .        # then visit http://localhost:8080
```

## What's inside

| Chapter | Highlights |
|---|---|
| 01 Measurement | Sig-fig counter, percent-error & temperature calculators, dimensional-analysis "rail" |
| 02 Matter | Live particle simulation of solid / liquid / gas, classification tree |
| 03 Atoms | Isotope-notation graphic, average atomic mass worked examples |
| 04 Periodic Table | Interactive table of all required elements (1–56 + Pt, Au, Hg, Pb, Rn, Fr, Ra, U, Pu) with electron configs |
| 05 Light & Electrons | Animated wave, c = λν / E = hν, noble-gas configurations |
| 06 Periodicity | Radius / ionization energy / electronegativity trend map |
| 07 Ions | **Flashcards** for elements, polyatomic ions & metal cations + a 10-question quiz |
| 08 Naming | Acid / ionic / covalent naming flowchart, criss-cross method |
| 09 Reactions | Six reaction types, net-ionic walkthrough, activity-series ladder |
| 10 Moles | Mole map, molar-mass calculator, limiting-reactant recipe |
| 11 Molarity | M = mol/L solver |
| 12 Acids & Bases | pH scale, conjugate-pair tagging |
| ✦ Homework | All 86 problems with hidden, worked solutions (try first, then reveal) |

## Files

- `index.html` — all content and structure
- `styles.css` — theme, animations, transitions
- `app.js` — particle background, simulations, widgets, flashcards, quiz
- `data.js` — element / ion datasets and the electron-config generator
