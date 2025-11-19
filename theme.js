console.log("theme.js loaded!");
document.addEventListener("DOMContentLoaded", () => {
    const html = document.documentElement;
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
        html.classList.add("dark");
    }

    const btn = document.querySelector("#theme-toggle");
    if (!btn) {
        console.warn("theme button not found");
        return;
    }

    btn.addEventListener("click", () => {
        html.classList.toggle("dark");

        if (html.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
});