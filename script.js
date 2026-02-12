/* ==========================================
   BG ARK CARNELIAN - FINAL ENGINE STABLE (FIXED)
   Coder Base: Wahid (ARK DAN)
   Debug & Stabilization: ChatGPT Assist
   ========================================== */


// ==============================
// HYDRO TABLE 0.500–5.000
// (TIDAK DIUBAH)
// ==============================

const hydroTable = [
{draft:0.500,disp:965.33},{draft:0.550,disp:1051.62},
{draft:0.600,disp:1138.47},{draft:0.650,disp:1225.88},
{draft:0.700,disp:1313.86},{draft:0.750,disp:1402.40},
{draft:0.800,disp:1491.50},{draft:0.850,disp:1581.17},
{draft:0.900,disp:1671.40},{draft:0.950,disp:1762.20},
{draft:1.000,disp:1853.56},{draft:1.050,disp:1945.49},
{draft:1.100,disp:2037.98},{draft:1.150,disp:2131.03},
{draft:1.200,disp:2224.65},{draft:1.250,disp:2318.83},
{draft:1.300,disp:2413.57},{draft:1.350,disp:2508.88},
{draft:1.400,disp:2604.75},{draft:1.450,disp:2701.19},
{draft:1.500,disp:2798.19},{draft:1.550,disp:2895.76},
{draft:1.600,disp:2993.89},{draft:1.650,disp:3092.59},
{draft:1.700,disp:3191.85},{draft:1.750,disp:3291.68},
{draft:1.800,disp:3392.07},{draft:1.850,disp:3493.03},
{draft:1.900,disp:3594.55},{draft:1.950,disp:3696.64},
{draft:2.000,disp:3799.29},{draft:2.050,disp:3902.51},
{draft:2.100,disp:4006.29},{draft:2.150,disp:4110.64},
{draft:2.200,disp:4215.55},{draft:2.250,disp:4321.03},
{draft:2.300,disp:4427.07},{draft:2.350,disp:4533.68},
{draft:2.400,disp:4640.86},{draft:2.450,disp:4748.60},
{draft:2.500,disp:4856.91},{draft:2.550,disp:4965.79},
{draft:2.600,disp:5075.23},{draft:2.650,disp:5185.24},
{draft:2.700,disp:5295.81},{draft:2.750,disp:5406.95},
{draft:2.800,disp:5518.65},{draft:2.850,disp:5630.92},
{draft:2.900,disp:5743.76},{draft:2.950,disp:5857.16},
{draft:3.000,disp:5954.66},{draft:3.050,disp:6061.65},
{draft:3.100,disp:6168.86},{draft:3.150,disp:6276.27},
{draft:3.200,disp:6383.89},{draft:3.250,disp:6491.73},
{draft:3.300,disp:6599.78},{draft:3.350,disp:6703.02},
{draft:3.400,disp:6815.44},{draft:3.450,disp:6925.07},
{draft:3.500,disp:7033.90},{draft:3.550,disp:7142.93},
{draft:3.600,disp:7252.17},{draft:3.650,disp:7361.62},
{draft:3.700,disp:7471.28},{draft:3.750,disp:7581.14},
{draft:3.800,disp:7691.22},{draft:3.850,disp:7802.51},
{draft:3.900,disp:7912.02},{draft:3.950,disp:8022.73},
{draft:4.000,disp:8133.66},{draft:4.050,disp:8244.68},
{draft:4.100,disp:8355.75},{draft:4.150,disp:8466.85},
{draft:4.200,disp:8577.98},{draft:4.250,disp:8689.17},
{draft:4.300,disp:8800.40},{draft:4.350,disp:8911.67},
{draft:4.400,disp:9022.97},{draft:4.450,disp:9134.32},
{draft:4.500,disp:9245.71},{draft:4.550,disp:9357.15},
{draft:4.600,disp:9468.63},{draft:4.650,disp:9579.75},
{draft:4.700,disp:9690.86},{draft:4.750,disp:9801.98},
{draft:4.800,disp:9913.10},{draft:4.850,disp:10024.22},
{draft:4.900,disp:10135.34},{draft:4.950,disp:10246.45},
{draft:5.000,disp:10357.59}
];


// ==============================
// CORE FUNCTIONS
// ==============================

function interpolate(draft){
    if(draft < 0.5 || draft > 5.0) return null;

    for(let i=0;i<hydroTable.length-1;i++){
        let d1 = hydroTable[i];
        let d2 = hydroTable[i+1];

        if(draft >= d1.draft && draft <= d2.draft){
            let ratio = (draft - d1.draft) / (d2.draft - d1.draft);
            return d1.disp + ratio * (d2.disp - d1.disp);
        }
    }
    return null;
}

function mean(a,b){ return (a+b)/2; }

function trueMean(F,M,A){
    let quarter = (F + A)/2;
    let simple = (F + M + A)/3;
    return (quarter + simple)/2;
}


// ==============================
// MAIN CALCULATION
// ==============================

function get(id){
    let v = document.getElementById(id).value;
    if(v === "") throw new Error("empty");
    return parseFloat(v);
}

function calculateCargo(){

try{

    let density = parseFloat(document.getElementById("density").value) || 1.025;

    // INITIAL
    let iF = mean(get("i_fp"), get("i_fs"));
    let iM = mean(get("i_mp"), get("i_ms"));
    let iA = mean(get("i_ap"), get("i_as"));
    let iMean = trueMean(iF, iM, iA);

    // FINAL
    let fF = mean(get("f_fp"), get("f_fs"));
    let fM = mean(get("f_mp"), get("f_ms"));
    let fA = mean(get("f_ap"), get("f_as"));
    let fMean = trueMean(fF, fM, fA);

    let initialDisp = interpolate(iMean);
    let finalDisp   = interpolate(fMean);

    if(initialDisp === null || finalDisp === null){
        document.getElementById("output").innerHTML =
        "Draft outside hydro table range (0.500 – 5.000 m)";
        return;
    }

    // Density correction
    let correctedInitial = initialDisp * (density / 1.025);
    let correctedFinal   = finalDisp   * (density / 1.025);

    let netCargo = correctedFinal - correctedInitial;

    document.getElementById("output").innerHTML = `
    INITIAL SURVEY<br>
    Mean Draft : ${iMean.toFixed(4)} m<br>
    Displacement (Corrected) : ${correctedInitial.toFixed(2)} MT<br><br>

    FINAL SURVEY<br>
    Mean Draft : ${fMean.toFixed(4)} m<br>
    Displacement (Corrected) : ${correctedFinal.toFixed(2)} MT<br><br>

    <strong>NET CARGO : ${netCargo.toFixed(2)} MT</strong>
    `;

}catch(err){
    document.getElementById("output").innerHTML =
    "Please fill ALL draft readings first.";
}

}


// ==============================
// BUTTON ACTIVATOR (PENTING)
// ==============================

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("calcBtn")
    .addEventListener("click", calculateCargo);
});
