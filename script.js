const scale = 50;
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

const forward = document.getElementById('forward');
const midship = document.getElementById('midship');
const aft = document.getElementById('aft');
const fwdLabel = document.getElementById('fwd-label');
const midLabel = document.getElementById('mid-label');
const aftLabel = document.getElementById('aft-label');
const dataDisplay = document.getElementById('data-display');
const barge = document.getElementById('barge');

function computeData(draft){
  const meanDraft = (draft.forward + draft.midship + draft.aft)/3;
  const deltaDraft = meanDraft - 0.746;
  let volume = waterplaneArea * deltaDraft / coef;
  let cargo = volume * observedDensity;
  let dispFinal = initialDisp + cargo;
  return {meanDraft, deltaDraft, volume, cargo, dispFinal};
}

let index=0;
function step(){
  if(index >= draftTimeline.length) return;
  let d = draftTimeline[index];

  setTimeout(()=>{
    forward.style.height = d.forward*scale + 'px';
    midship.style.height = d.midship*scale + 'px';
    aft.style.height = d.aft*scale + 'px';

    forward.style.background = `rgb(${50+index*50},80,100)`;
    midship.style.background = `rgb(${80+index*40},100,120)`;
    aft.style.background = `rgb(${100+index*30},120,140)`;

    let trimAngle = (d.aft - d.forward)*10;
    barge.style.transform = `rotateX(${trimAngle}deg)`;

    fwdLabel.textContent = d.forward.toFixed(2)+'m';
    midLabel.textContent = d.midship.toFixed(2)+'m';
    aftLabel.textContent = d.aft.toFixed(2)+'m';

    const data = computeData(d);
    dataDisplay.textContent =
`Time: ${timestamps[index]}
Draft (Fwd/Mid/Aft): ${d.forward.toFixed(2)}/${d.midship.toFixed(2)}/${d.aft.toFixed(2)} m
Mean Draft: ${data.meanDraft.toFixed(3)} m
Delta Draft (from initial QM): ${data.deltaDraft.toFixed(3)} m
Volume Air Dipindahkan: ${data.volume.toFixed(0)} m³
Density Air Laut Bunati: ${observedDensity} kg/L
Perkiraan Cargo: ${data.cargo.toFixed(0)} MT
Total Displacement: ${data.dispFinal.toFixed(0)} MT
Catatan: bentuk tongkang tidak kotak → koreksi koefisien ${coef}`;

    index++;
    step();
  }, 500);
}

forward.style.height = '0px';
midship.style.height = '0px';
aft.style.height = '0px';

window.onload = function(){ step(); };
