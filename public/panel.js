const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "giriş.html";
}

// çıkış
function cikis() {
    localStorage.removeItem("token");
    window.location.href = "giriş.html";
}

/* ---------------- SIDEBAR TOGGLE ---------------- */

function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("kapali");
}

/* ---------------- CANLI SAHTE VERİ ---------------- */

setInterval(() => {
    document.getElementById("users").innerText =
        Math.floor(Math.random() * 500);

    document.getElementById("servers").innerText =
        Math.floor(Math.random() * 100);
}, 2000);

/* ---------------- GRAFİK ---------------- */

const ctx = document.getElementById("sistemGrafik");

new Chart(ctx, {
    type: "line",
    data: {
        labels: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
        datasets: [{
            label: "Sistem Trafiği",
            data: [10, 30, 20, 40, 35, 60, 50],
            borderColor: "#00e5ff",
            tension: 0.4,
            fill: true,
            backgroundColor: "rgba(0,229,255,0.1)"
        }]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    color: "white"
                }
            }
        },
        scales: {
            x: { ticks: { color: "white" } },
            y: { ticks: { color: "white" } }
        }
    }
});