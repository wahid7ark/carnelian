// ===== Tombol Interaktif =====
document.getElementById("btn").addEventListener("click", function() {
  alert("Hello! Welcome to Carnelian!");
});

// ===== Ganti Background Dinamis =====
const colors = ["#f8f4f0", "#ffe4e1", "#fff0f5", "#faf0e6"];
let i = 0;

function changeBackground() {
  document.body.style.backgroundColor = colors[i];
  i = (i + 1) % colors.length;
}

// Ganti background setiap 5 detik
setInterval(changeBackground, 5000);

// ===== Simple Clock =====
function showTime() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  document.getElementById("clock").textContent = time;
}

// Update clock setiap detik
setInterval(showTime, 1000);
