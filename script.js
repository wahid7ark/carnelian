const timestamps = ['08:00','12:00','16:00','19:50'];
const draftTimeline = [
  {forward:0.73, midship:0.745, aft:0.77},
  {forward:1.5, midship:2.0, aft:2.2},
  {forward:2.7, midship:3.2, aft:3.5},
  {forward:3.96, midship:4.38, aft:4.835}
];

const observedDensity = 1.015;
const waterplaneArea = 91*24;
const coef = 0.75;
const initialDisp = 1349.123;
const scale = 50;

const overlayF = document.getElementById('overlay-forward');
const overlayM = document.getElementById('overlay-midship');
const overlayA = document.getElementById('overlay-aft');
const dataDisplay = document.getElementById('data-display');

function computeData(draft){
  const meanDraft = (draft.forward + draft.midship + draft.aft)/3;
  const deltaDraft = meanDraft - 0.746;
  const volume = waterplaneArea * deltaDraft / coef;
  const cargo = volume * observedDensity;
  const dispFinal = initialDisp + cargo;
  return {meanDraft, deltaDraft, volume, cargo, dispFinal};
}

let index=0;
function step(){
  if(index >= draftTimeline.length) return;
  const d = draftTimeline[index];

  overlayF.style.height = d.forward*scale + 'px';
  overlayM.style.height = d.midship*scale + 'px';
  overlayA.style.height = d.aft*scale + 'px';

  const data = computeData(d);
  dataDisplay.textContent =
`Time: ${timestamps[index]}
Draft (Fwd/Mid/Aft): ${d.forward.toFixed(2)}/${d.midship.toFixed(2)}/${d.aft.toFixed(2)} m
Mean Draft: ${data.meanDraft.toFixed(3)} m
Delta Draft (from QM): ${data.deltaDraft.toFixed(3)} m
Volume Air Dipindahkan: ${data.volume.toFixed(0)} m³
Density Air Laut Bunati: ${observedDensity} kg/L
Perkiraan Cargo: ${data.cargo.toFixed(0)} MT
Total Displacement: ${data.dispFinal.toFixed(0)} MT`;

  index++;
  setTimeout(step, 1000);
}

window.onload = step;
