// script.js - Interaksi dan Logika Website

document.addEventListener("DOMContentLoaded", function () {
    // 1. Berikan pesan sambutan di console atau alert ramah saat halaman Beranda dibuka
    const path = window.location.pathname;
    if (path.includes("home.html") || path.endsWith("/")) {
        console.log("Selamat datang di Portal Akademik Micro 3!");
    }

    // 2. Tandai menu navigasi secara dinamis berdasarkan halaman yang sedang dibuka
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        // Hapus kelas active bawaan dari HTML jika ada
        link.classList.remove("active");
        
        // Cocokkan href dengan nama file halaman saat ini
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    // 3. Efek interaktif sederhana untuk sel baterai/kartu (opsional)
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-3px)";
            card.style.transition = "transform 0.3s ease";
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0)";
        });
    });
});
