// Draft survey Wahid (Initial → Final)
const timestamps = ['10:25','19:50'];
const draftTimeline = [
  { port:0.73, mid:0.745, starboard:0.77 }, // initial
  { port:3.94, mid:4.38, starboard:4.835 }  // final
];

// Konstanta
const waterplaneArea = 91*24; // m²
const coef = 0.75;            // koreksi bentuk tongkang
const density = 1.015;        // kg/L air laut Bunati
const initialDisp = 1349.123; // MT
const scale = 50;             // scaling overlay visual

// DOM Elements
const overlayBarge = document.getElementById('overlay-barge');
const dataDisplay = document.getElementById('data-display');

// Hitung mean draft & cargo
function computeData(draft){
  const meanDraft = (draft.port + draft.mid + draft.starboard)/3;
  const deltaDraft = meanDraft - 0.74625; // QM initial
  const volume = waterplaneArea * deltaDraft / coef;
  const cargo = volume * density;
  const dispFinal = initialDisp + cargo;
  return {meanDraft, deltaDraft, volume, cargo, dispFinal};
}

// Animasi step
let index=0;
function step(){
  if(index >= draftTimeline.length) return;
  const d = draftTimeline[index];

  // Naikkan overlay sesuai rata-rata port-mid-starboard
  const avgDraft = (d.port + d.mid + d.starboard)/3;
  overlayBarge.style.height = avgDraft*scale + 'px';

  // Update panel data
  const data = computeData(d);
  dataDisplay.textContent =
`Time: ${timestamps[index]}
Draft (Port/Mid/Starboard): ${d.port.toFixed(3)}/${d.mid.toFixed(3)}/${d.starboard.toFixed(3)} m
Mean Draft: ${data.meanDraft.toFixed(3)} m
ΔDraft (QM Initial): ${data.deltaDraft.toFixed(3)} m
Volume Air Dipindahkan: ${data.volume.toFixed(0)} m³
Perkiraan Cargo: ${data.cargo.toFixed(0)} MT
Total Displacement: ${data.dispFinal.toFixed(0)} MT`;

  index++;
  setTimeout(step, 2000); // 2 detik per step
}

window.onload = step;
