// =====================================
// HYDROSTATIC DATA
// (Lengkapi sesuai tabel asli kapal)
// =====================================

const hydrostaticData = {

  moulded: [
    { draft: 3.000, disp: 5954.66, tpc: 21.38 },
    { draft: 3.050, disp: 6061.65, tpc: 21.42 },
    { draft: 3.100, disp: 6168.76, tpc: 21.46 },
    { draft: 3.150, disp: 6275.99, tpc: 21.50 }
  ],

  extreme: [
    { draft: 3.000, disp: 6002.62, tpc: 21.43 },
    { draft: 3.050, disp: 6109.86, tpc: 21.47 },
    { draft: 3.100, disp: 6217.21, tpc: 21.51 },
    { draft: 3.150, disp: 6324.68, tpc: 21.55 }
  ]
};

// =====================================
// INTERPOLATION SYSTEM
// =====================================

function findSurroundingDraft(data, draftInput) {
  for (let i = 0; i < data.length - 1; i++) {
    if (draftInput >= data[i].draft && draftInput <= data[i + 1].draft) {
      return { lower: data[i], upper: data[i + 1] };
    }
  }
  return null;
}

function interpolate(lower, upper, draftInput, key) {
  let ratio = (draftInput - lower.draft) / (upper.draft - lower.draft);
  return lower[key] + ratio * (upper[key] - lower[key]);
}

// =====================================
// MAIN CALCULATION
// =====================================

function calculate() {

  let fwd = parseFloat(document.getElementById("draftFwd").value);
  let mid = parseFloat(document.getElementById("draftMid").value);
  let aft = parseFloat(document.getElementById("draftAft").value);
  let density = parseFloat(document.getElementById("density").value);
  let type = document.getElementById("hydroType").value;

  if (isNaN(fwd) || isNaN(mid) || isNaN(aft)) {
    alert("Please input all draft values.");
    return;
  }

  let meanDraft = (fwd + mid + aft) / 3;
  document.getElementById("meanDraft").innerText = meanDraft.toFixed(4);

  let data = hydrostaticData[type];
  let surrounding = findSurroundingDraft(data, meanDraft);

  if (!surrounding) {
    alert("Draft out of hydrostatic table range!");
    return;
  }

  let disp = interpolate(surrounding.lower, surrounding.upper, meanDraft, "disp");
  let tpc = interpolate(surrounding.lower, surrounding.upper, meanDraft, "tpc");

  let dispCorrected = disp * (density / 1.025);

  document.getElementById("disp").innerText = disp.toFixed(2);
  document.getElementById("tpc").innerText = tpc.toFixed(3);
  document.getElementById("dispCorrected").innerText = dispCorrected.toFixed(2);
}
