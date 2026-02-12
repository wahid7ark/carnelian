// ================= HYDROSTATIC DATA =================
// PASTE FULL DATA 0.500 – 5.000 DI SINI

const hydrostaticData = {
  moulded: [
    { draft: 3.000, disp: 5954.66 },
    { draft: 3.050, disp: 6061.65 },
    { draft: 3.100, disp: 6168.76 },
    { draft: 3.150, disp: 6275.99 }
  ],
  extreme: [
    { draft: 3.000, disp: 6002.62 },
    { draft: 3.050, disp: 6109.86 },
    { draft: 3.100, disp: 6217.21 },
    { draft: 3.150, disp: 6324.68 }
  ]
};

// ================= MODE SWITCH =================

function switchMode() {

  const mode = document.getElementById("mode").value;

  document.getElementById("quickInitial").style.display =
    mode === "surveyor" ? "block" : "none";

  document.getElementById("quickFinal").style.display =
    mode === "surveyor" ? "block" : "none";

  document.getElementById("fullInitial").style.display =
    mode === "full" ? "block" : "none";

  document.getElementById("fullFinal").style.display =
    mode === "full" ? "block" : "none";
}

// ================= INTERPOLATION =================

function interpolate(table, draft) {

  if (draft < table[0].draft ||
      draft > table[table.length - 1].draft)
    return null;

  for (let i = 0; i < table.length - 1; i++) {

    let lower = table[i];
    let upper = table[i + 1];

    if (draft >= lower.draft &&
        draft <= upper.draft) {

      let ratio =
        (draft - lower.draft) /
        (upper.draft - lower.draft);

      return lower.disp +
        ratio * (upper.disp - lower.disp);
    }
  }

  return null;
}

// ================= QUARTER MEAN =================

function quarterMean(F, M, A) {

  let q = (F + A) / 2;
  let mom = (F + M + A) / 3;

  return (q + mom) / 2;
}

// ================= GET DRAFT =================

function getDraft(prefix) {

  const mode = document.getElementById("mode").value;

  if (mode === "surveyor") {

    return {
      F: parseFloat(document.getElementById(prefix + "_fwd").value),
      M: parseFloat(document.getElementById(prefix + "_mid").value),
      A: parseFloat(document.getElementById(prefix + "_aft").value)
    };

  } else {

    let fp = parseFloat(document.getElementById(prefix + "_fp").value);
    let fs = parseFloat(document.getElementById(prefix + "_fs").value);
    let mp = parseFloat(document.getElementById(prefix + "_mp").value);
    let ms = parseFloat(document.getElementById(prefix + "_ms").value);
    let ap = parseFloat(document.getElementById(prefix + "_ap").value);
    let as = parseFloat(document.getElementById(prefix + "_as").value);

    return {
      F: (fp + fs) / 2,
      M: (mp + ms) / 2,
      A: (ap + as) / 2
    };
  }
}

// ================= MAIN CALC =================

function calculate() {

  const hydroType =
    document.getElementById("hydroType").value;

  const table =
    hydrostaticData[hydroType];

  const initial = getDraft("i");
  const final = getDraft("f");

  const initialMean =
    quarterMean(initial.F, initial.M, initial.A);

  const finalMean =
    quarterMean(final.F, final.M, final.A);

  const initialDisp =
    interpolate(table, initialMean);

  const finalDisp =
    interpolate(table, finalMean);

  if (!initialDisp || !finalDisp) {
    alert("Draft out of range.");
    return;
  }

  const initialDensity =
    parseFloat(document.getElementById("i_density").value);

  const finalDensity =
    parseFloat(document.getElementById("f_density").value);

  const initialCorr =
    initialDisp * (initialDensity / 1.025);

  const finalCorr =
    finalDisp * (finalDensity / 1.025);

  const cargo =
    finalCorr - initialCorr;

  document.getElementById("resInitial")
    .innerText = initialCorr.toFixed(2);

  document.getElementById("resFinal")
    .innerText = finalCorr.toFixed(2);

  document.getElementById("resCargo")
    .innerText = cargo.toFixed(2);
}
