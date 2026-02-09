// script.js - versi baru

// Fungsi jam realtime
function updateClock() {
    const clockElem = document.getElementById('clock');
    if (clockElem) {
        const now = new Date();
        clockElem.textContent = now.toLocaleTimeString();
    }
}

// Jalankan jam setiap detik
setInterval(updateClock, 1000);
updateClock(); // tampil langsung saat load

// Tombol interaktif
const btn = document.getElementById('btn');
if (btn) {
    btn.addEventListener('click', () => {
        alert('Button Clicked!');
    });
}
