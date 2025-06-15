

document.querySelectorAll("details").forEach(detail => {
    const summary = detail.querySelector("summary");
    const content = detail.querySelector(".details-content");

    if (!content || !summary) return;

    content.style.overflow = "hidden";
    content.style.maxHeight = "0";
    content.style.opacity = "0";
    content.style.transition = "max-height 0.4s ease, opacity 0.4s ease";

    summary.addEventListener("click", (e) => {
        e.preventDefault();
        const isOpen = detail.hasAttribute("open");

        if (isOpen) {
            content.style.maxHeight = content.scrollHeight + "px";
            content.style.opacity = "1";
            requestAnimationFrame(() => {
                content.style.maxHeight = "0";
                content.style.opacity = "0";
            });
            setTimeout(() => {
                detail.removeAttribute("open");
            }, 400);
        } else {
            detail.setAttribute("open", "");
            content.style.maxHeight = "0";
            content.style.opacity = "0";

            requestAnimationFrame(() => {
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.opacity = "1";
            });

            // 🧠 Let it grow beyond transition
            setTimeout(() => {
                content.style.maxHeight = "none";
            }, 400);
        }
    });

});

function toggleTheme() {
    const root = document.documentElement;
    const btn = document.getElementById("themeToggle");
    const icon = btn.querySelector(".toggle-icon");
    const label = btn.querySelector(".toggle-label");
    const isDark = root.classList.contains("dark");

    // Start flip
    btn.classList.add("flipping");

    setTimeout(() => {
        // Switch theme
        if (isDark) {
            root.classList.remove("dark");
            icon.textContent = "🌙";
            label.textContent = "Dark Mode";
        } else {
            root.classList.add("dark");
            icon.textContent = "☀️";
            label.textContent = "Light Mode";
        }

        // End flip
        btn.classList.remove("flipping");
    }, 300); // match transition timing
}

function setThemeByTime() {
    const hour = new Date().getHours();         // returns 6
    const minutes = new Date().getMinutes();    // returns 30
    const decimalHour = hour + minutes / 60;
    const root = document.documentElement;
    const btn = document.getElementById("themeToggle");

    const isNight = (decimalHour < 6.5 || decimalHour >= 18.5); // 6 PM to 7 AM is dark

    if (isNight) {
        root.classList.add("dark");
        btn.querySelector(".toggle-icon").textContent = "☀️";
        btn.querySelector(".toggle-label").textContent = "Light Mode";
    } else {
        root.classList.remove("dark");
        btn.querySelector(".toggle-icon").textContent = "🌙";
        btn.querySelector(".toggle-label").textContent = "Dark Mode";
    }
}

function simulateOpenFirstDetail() {
    const detail = document.querySelector("details");
    const summary = detail.querySelector("summary");
    const content = detail.querySelector(".details-content");

    if (!content) return;

    // Make sure it's open
    detail.setAttribute("open", "");

    // Reset any blocking styles
    content.style.opacity = "0";
    content.style.maxHeight = "0";

    // Animate like a click
    requestAnimationFrame(() => {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.opacity = "1";
    });

    setTimeout(() => {
        content.style.maxHeight = "none"; // allow natural growth
    }, 400);
}

window.addEventListener("DOMContentLoaded", () => { setThemeByTime?.(); simulateOpenFirstDetail(); }); 

setInterval(setThemeByTime, 120000);
