/* ============================================================
   AP CHEM ACADEMY — DATA
   Elements 1–56 + Pt, Au, Hg, Pb, Rn, Fr, Ra, U, Pu
   Polyatomic ions, metal cations, flashcard decks
   ============================================================ */

// [number, symbol, name, mass, group(col), period(row), category]
const ELEMENTS = [
  [1,  "H",  "Hydrogen",   1.008,   1,  1, "nonmetal"],
  [2,  "He", "Helium",     4.003,   18, 1, "noble"],
  [3,  "Li", "Lithium",    6.94,    1,  2, "alkali"],
  [4,  "Be", "Beryllium",  9.012,   2,  2, "alkaline"],
  [5,  "B",  "Boron",      10.81,   13, 2, "metalloid"],
  [6,  "C",  "Carbon",     12.011,  14, 2, "nonmetal"],
  [7,  "N",  "Nitrogen",   14.007,  15, 2, "nonmetal"],
  [8,  "O",  "Oxygen",     15.999,  16, 2, "nonmetal"],
  [9,  "F",  "Fluorine",   18.998,  17, 2, "halogen"],
  [10, "Ne", "Neon",       20.180,  18, 2, "noble"],
  [11, "Na", "Sodium",     22.990,  1,  3, "alkali"],
  [12, "Mg", "Magnesium",  24.305,  2,  3, "alkaline"],
  [13, "Al", "Aluminum",   26.982,  13, 3, "post"],
  [14, "Si", "Silicon",    28.085,  14, 3, "metalloid"],
  [15, "P",  "Phosphorus", 30.974,  15, 3, "nonmetal"],
  [16, "S",  "Sulfur",     32.06,   16, 3, "nonmetal"],
  [17, "Cl", "Chlorine",   35.45,   17, 3, "halogen"],
  [18, "Ar", "Argon",      39.948,  18, 3, "noble"],
  [19, "K",  "Potassium",  39.098,  1,  4, "alkali"],
  [20, "Ca", "Calcium",    40.078,  2,  4, "alkaline"],
  [21, "Sc", "Scandium",   44.956,  3,  4, "transition"],
  [22, "Ti", "Titanium",   47.867,  4,  4, "transition"],
  [23, "V",  "Vanadium",   50.942,  5,  4, "transition"],
  [24, "Cr", "Chromium",   51.996,  6,  4, "transition"],
  [25, "Mn", "Manganese",  54.938,  7,  4, "transition"],
  [26, "Fe", "Iron",       55.845,  8,  4, "transition"],
  [27, "Co", "Cobalt",     58.933,  9,  4, "transition"],
  [28, "Ni", "Nickel",     58.693,  10, 4, "transition"],
  [29, "Cu", "Copper",     63.546,  11, 4, "transition"],
  [30, "Zn", "Zinc",       65.38,   12, 4, "transition"],
  [31, "Ga", "Gallium",    69.723,  13, 4, "post"],
  [32, "Ge", "Germanium",  72.630,  14, 4, "metalloid"],
  [33, "As", "Arsenic",    74.922,  15, 4, "metalloid"],
  [34, "Se", "Selenium",   78.971,  16, 4, "nonmetal"],
  [35, "Br", "Bromine",    79.904,  17, 4, "halogen"],
  [36, "Kr", "Krypton",    83.798,  18, 4, "noble"],
  [37, "Rb", "Rubidium",   85.468,  1,  5, "alkali"],
  [38, "Sr", "Strontium",  87.62,   2,  5, "alkaline"],
  [39, "Y",  "Yttrium",    88.906,  3,  5, "transition"],
  [40, "Zr", "Zirconium",  91.224,  4,  5, "transition"],
  [41, "Nb", "Niobium",    92.906,  5,  5, "transition"],
  [42, "Mo", "Molybdenum", 95.95,   6,  5, "transition"],
  [43, "Tc", "Technetium", 98,      7,  5, "transition"],
  [44, "Ru", "Ruthenium",  101.07,  8,  5, "transition"],
  [45, "Rh", "Rhodium",    102.906, 9,  5, "transition"],
  [46, "Pd", "Palladium",  106.42,  10, 5, "transition"],
  [47, "Ag", "Silver",     107.868, 11, 5, "transition"],
  [48, "Cd", "Cadmium",    112.414, 12, 5, "transition"],
  [49, "In", "Indium",     114.818, 13, 5, "post"],
  [50, "Sn", "Tin",        118.710, 14, 5, "post"],
  [51, "Sb", "Antimony",   121.760, 15, 5, "metalloid"],
  [52, "Te", "Tellurium",  127.60,  16, 5, "metalloid"],
  [53, "I",  "Iodine",     126.904, 17, 5, "halogen"],
  [54, "Xe", "Xenon",      131.293, 18, 5, "noble"],
  [55, "Cs", "Cesium",     132.905, 1,  6, "alkali"],
  [56, "Ba", "Barium",     137.327, 2,  6, "alkaline"],
  [78, "Pt", "Platinum",   195.084, 10, 6, "transition"],
  [79, "Au", "Gold",       196.967, 11, 6, "transition"],
  [80, "Hg", "Mercury",    200.592, 12, 6, "transition"],
  [82, "Pb", "Lead",       207.2,   14, 6, "post"],
  [86, "Rn", "Radon",      222,     18, 6, "noble"],
  [87, "Fr", "Francium",   223,     1,  7, "alkali"],
  [88, "Ra", "Radium",     226,     2,  7, "alkaline"],
  [92, "U",  "Uranium",    238.029, 7,  9, "actinide"],
  [94, "Pu", "Plutonium",  244,     9,  9, "actinide"],
];

const CATEGORY_NAMES = {
  alkali: "Alkali Metal", alkaline: "Alkaline Earth Metal", transition: "Transition Metal",
  post: "Post-Transition Metal", metalloid: "Metalloid", nonmetal: "Nonmetal",
  halogen: "Halogen", noble: "Noble Gas", actinide: "Actinide",
};

// Likely ion formed, by group
const LIKELY_IONS = { 1: "+1", 2: "+2", 13: "+3", 15: "−3", 16: "−2", 17: "−1", 18: "none (stable)" };

// Polyatomic ions: [formulaHTML, name, charge group]
const POLYATOMICS = [
  ["H<sub>3</sub>O<sup>+</sup>", "hydronium", "+1 cations"],
  ["NH<sub>4</sub><sup>+</sup>", "ammonium", "+1 cations"],
  ["BrO<sub>4</sub><sup>−</sup>", "perbromate", "−1 anions"],
  ["BrO<sub>3</sub><sup>−</sup>", "bromate", "−1 anions"],
  ["BrO<sub>2</sub><sup>−</sup>", "bromite", "−1 anions"],
  ["BrO<sup>−</sup>", "hypobromite", "−1 anions"],
  ["ClO<sub>4</sub><sup>−</sup>", "perchlorate", "−1 anions"],
  ["ClO<sub>3</sub><sup>−</sup>", "chlorate", "−1 anions"],
  ["ClO<sub>2</sub><sup>−</sup>", "chlorite", "−1 anions"],
  ["ClO<sup>−</sup>", "hypochlorite", "−1 anions"],
  ["IO<sub>4</sub><sup>−</sup>", "periodate", "−1 anions"],
  ["IO<sub>3</sub><sup>−</sup>", "iodate", "−1 anions"],
  ["IO<sub>2</sub><sup>−</sup>", "iodite", "−1 anions"],
  ["IO<sup>−</sup>", "hypoiodite", "−1 anions"],
  ["MnO<sub>4</sub><sup>−</sup>", "permanganate", "−1 anions"],
  ["MnO<sub>3</sub><sup>−</sup>", "manganate", "−1 anions"],
  ["NO<sub>3</sub><sup>−</sup>", "nitrate", "−1 anions"],
  ["NO<sub>2</sub><sup>−</sup>", "nitrite", "−1 anions"],
  ["C<sub>2</sub>H<sub>3</sub>O<sub>2</sub><sup>−</sup>", "acetate", "−1 anions"],
  ["CH<sub>3</sub>COO<sup>−</sup>", "acetate (alt. form)", "−1 anions"],
  ["CN<sup>−</sup>", "cyanide", "−1 anions"],
  ["OCN<sup>−</sup>", "cyanate", "−1 anions"],
  ["SCN<sup>−</sup>", "thiocyanate", "−1 anions"],
  ["OH<sup>−</sup>", "hydroxide", "−1 anions"],
  ["N<sub>3</sub><sup>−</sup>", "azide", "−1 anions"],
  ["NH<sub>2</sub><sup>−</sup>", "amide", "−1 anions"],
  ["O<sub>2</sub><sup>−</sup>", "superoxide", "−1 anions"],
  ["CrO<sub>4</sub><sup>2−</sup>", "chromate", "−2 anions"],
  ["Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup>", "dichromate", "−2 anions"],
  ["SO<sub>4</sub><sup>2−</sup>", "sulfate", "−2 anions"],
  ["SO<sub>3</sub><sup>2−</sup>", "sulfite", "−2 anions"],
  ["S<sub>2</sub>O<sub>3</sub><sup>2−</sup>", "thiosulfate", "−2 anions"],
  ["CO<sub>3</sub><sup>2−</sup>", "carbonate", "−2 anions"],
  ["C<sub>2</sub>O<sub>4</sub><sup>2−</sup>", "oxalate", "−2 anions"],
  ["O<sub>2</sub><sup>2−</sup>", "peroxide", "−2 anions"],
  ["BO<sub>3</sub><sup>3−</sup>", "borate", "−3/−4 anions"],
  ["PO<sub>3</sub><sup>3−</sup>", "phosphite", "−3/−4 anions"],
  ["PO<sub>4</sub><sup>3−</sup>", "phosphate", "−3/−4 anions"],
  ["AsO<sub>4</sub><sup>3−</sup>", "arsenate", "−3/−4 anions"],
  ["AsO<sub>3</sub><sup>3−</sup>", "arsenite", "−3/−4 anions"],
  ["HCO<sub>3</sub><sup>−</sup>", "hydrogen carbonate (bicarbonate)", "with hydrogen"],
  ["HSO<sub>4</sub><sup>−</sup>", "hydrogen sulfate (bisulfate)", "with hydrogen"],
  ["HSO<sub>3</sub><sup>−</sup>", "hydrogen sulfite (bisulfite)", "with hydrogen"],
  ["HPO<sub>4</sub><sup>2−</sup>", "hydrogen phosphate", "with hydrogen"],
  ["H<sub>2</sub>PO<sub>4</sub><sup>−</sup>", "dihydrogen phosphate", "with hydrogen"],
  ["HS<sup>−</sup>", "hydrogen sulfide", "with hydrogen"],
];

// Metal cations with multiple charges: [ionHTML, name]
const METAL_CATIONS = [
  ["Sb<sup>3+</sup>", "Antimony(III)"],
  ["Sb<sup>5+</sup>", "Antimony(V)"],
  ["Bi<sup>3+</sup>", "Bismuth(III)"],
  ["Bi<sup>5+</sup>", "Bismuth(V)"],
  ["Cd<sup>2+</sup>", "Cadmium"],
  ["Cr<sup>2+</sup>", "Chromium(II)"],
  ["Cr<sup>3+</sup>", "Chromium(III)"],
  ["Co<sup>2+</sup>", "Cobalt(II)"],
  ["Co<sup>3+</sup>", "Cobalt(III)"],
  ["Cu<sup>+</sup>", "Copper(I) / Cuprous"],
  ["Cu<sup>2+</sup>", "Copper(II) / Cupric"],
  ["Au<sup>+</sup>", "Gold(I)"],
  ["Au<sup>3+</sup>", "Gold(III)"],
  ["Fe<sup>2+</sup>", "Iron(II) / Ferrous"],
  ["Fe<sup>3+</sup>", "Iron(III) / Ferric"],
  ["Pb<sup>2+</sup>", "Lead(II) / Plumbous"],
  ["Pb<sup>4+</sup>", "Lead(IV) / Plumbic"],
  ["Mn<sup>2+</sup>", "Manganese(II)"],
  ["Mn<sup>3+</sup>", "Manganese(III)"],
  ["Mn<sup>4+</sup>", "Manganese(IV)"],
  ["Mn<sup>7+</sup>", "Manganese(VII)"],
  ["Hg<sub>2</sub><sup>2+</sup>", "Mercury(I) / Mercurous"],
  ["Hg<sup>2+</sup>", "Mercury(II) / Mercuric"],
  ["Ni<sup>2+</sup>", "Nickel(II)"],
  ["Ni<sup>3+</sup>", "Nickel(III)"],
  ["Ag<sup>+</sup>", "Silver"],
  ["Sn<sup>2+</sup>", "Tin(II) / Stannous"],
  ["Sn<sup>4+</sup>", "Tin(IV) / Stannic"],
  ["Zn<sup>2+</sup>", "Zinc"],
];

// Electron configuration (aufbau order) with common exceptions
const AUFBAU = [
  ["1s",2],["2s",2],["2p",6],["3s",2],["3p",6],["4s",2],["3d",10],["4p",6],
  ["5s",2],["4d",10],["5p",6],["6s",2],["4f",14],["5d",10],["6p",6],
  ["7s",2],["5f",14],["6d",10],["7p",6],
];
const CONFIG_EXCEPTIONS = {
  24: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹ 3d⁵",
  29: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹ 3d¹⁰",
  41: "[Kr] 5s¹ 4d⁴", 42: "[Kr] 5s¹ 4d⁵", 44: "[Kr] 5s¹ 4d⁷",
  45: "[Kr] 5s¹ 4d⁸", 46: "[Kr] 4d¹⁰", 47: "[Kr] 5s¹ 4d¹⁰",
  78: "[Xe] 6s¹ 4f¹⁴ 5d⁹", 79: "[Xe] 6s¹ 4f¹⁴ 5d¹⁰",
};
const SUPS = { 0:"⁰",1:"¹",2:"²",3:"³",4:"⁴",5:"⁵",6:"⁶",7:"⁷",8:"⁸",9:"⁹",10:"¹⁰",11:"¹¹",12:"¹²",13:"¹³",14:"¹⁴" };

function electronConfig(z) {
  if (CONFIG_EXCEPTIONS[z]) return CONFIG_EXCEPTIONS[z];
  let left = z, parts = [];
  for (const [sub, cap] of AUFBAU) {
    if (left <= 0) break;
    const n = Math.min(cap, left);
    parts.push(sub + SUPS[n]);
    left -= n;
  }
  return parts.join(" ");
}

// Masses keyed by symbol (for the molar mass calculator)
const MASS_BY_SYMBOL = {};
ELEMENTS.forEach(e => MASS_BY_SYMBOL[e[1]] = e[3]);
