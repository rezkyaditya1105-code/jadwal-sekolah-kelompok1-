// script.js - Interaksi dan Logika Website

document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname;
    if (path.includes("home.html") || path.endsWith("/")) {
        console.log("Selamat datang di Portal Akademik Micro 3!");
    }

    // Tandai menu navigasi secara dinamis
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

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
