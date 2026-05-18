/* SCRIPT.JS — Portfolio Andres Pelizzer */

/* 1. UPTIME */
const startTime = Date.now();
const uptimeEl = document.getElementById("uptime");
setInterval(() => {
  const s = Math.floor((Date.now() - startTime) / 1000);
  uptimeEl.textContent =
    String(Math.floor(s / 3600)).padStart(2, "0") +
    ":" +
    String(Math.floor((s % 3600) / 60)).padStart(2, "0") +
    ":" +
    String(s % 60).padStart(2, "0");
}, 1000);

/* 2. CYCLING ANIMATIONS — Focus, Now, Interest */
function createCycler(elementId, items, interval) {
  const el = document.getElementById(elementId);
  if (!el) return;
  let i = 0;
  setInterval(() => {
    el.style.opacity = "0";
    el.style.transform = "translateY(6px)";
    el.style.transition = "opacity .2s, transform .2s";
    setTimeout(() => {
      i = (i + 1) % items.length;
      el.textContent = items[i];
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 220);
  }, interval);
}

createCycler(
  "focusCycle",
  ["Frontend", "Backend", "Database", "REST API", "UI / UX"],
  2200,
);

/* 3. PARALLAX + MOUSE */
const heroFirst = document.querySelector(".hero-first");
const heroLast = document.querySelector(".hero-last");
let scrollY = 0;
window.addEventListener(
  "scroll",
  () => {
    scrollY = window.scrollY;
  },
  { passive: true },
);
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 14;
  const y = (e.clientY / window.innerHeight - 0.5) * 8;
  if (heroFirst)
    heroFirst.style.transform = `translate(${x * 0.5}px, ${y * 0.5 - scrollY * 0.04}px)`;
  if (heroLast)
    heroLast.style.transform = `translate(${x * 1.1}px, ${y * 1.1 - scrollY * 0.09}px)`;
});

/* 4. HAMBURGER MENU */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const mmClose = document.getElementById("mmClose");

function openMobileMenu() {
  if (!mobileMenu) return;
  hamburger.classList.add("open");
  mobileMenu.classList.add("open");
  if (mmClose) mmClose.classList.add("visible");
  document.body.style.overflow = "hidden";
}
function closeMobileMenu() {
  if (!mobileMenu) return;
  hamburger.classList.remove("open");
  mobileMenu.classList.remove("open");
  if (mmClose) mmClose.classList.remove("visible");
  document.body.style.overflow = "";
}
if (hamburger) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.contains("open")
      ? closeMobileMenu()
      : openMobileMenu();
  });
}
if (mmClose) {
  const closeHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeMobileMenu();
  };
  mmClose.addEventListener("click", closeHandler);
  mmClose.addEventListener("touchend", closeHandler);
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("open"))
    closeMobileMenu();
});
document.querySelectorAll(".mm-link").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

/* 5. TENNIS EASTER EGG */
const navLogo = document.getElementById("navLogo");
const tennisTip = document.getElementById("tennisTip");
let tipTimeout = null;
if (navLogo && tennisTip) {
  navLogo.addEventListener("click", (e) => {
    if (window.scrollY < window.innerHeight) e.preventDefault();
    if (tennisTip.classList.contains("visible")) {
      tennisTip.classList.remove("visible");
      clearTimeout(tipTimeout);
    } else {
      tennisTip.classList.add("visible");
      clearTimeout(tipTimeout);
      tipTimeout = setTimeout(
        () => tennisTip.classList.remove("visible"),
        3000,
      );
    }
  });
  document.addEventListener("click", (e) => {
    if (!navLogo.contains(e.target)) {
      tennisTip.classList.remove("visible");
      clearTimeout(tipTimeout);
    }
  });
}

/* 6. REVEAL ON SCROLL */
const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
);
revealElements.forEach((el) => observer.observe(el));

/* 6b. BOTTOM SHEET — tooltip mobile/tablet.
   Su schermi ≤800px, click su parola gialla → bottom sheet dal basso.
   Su desktop (>800px) il CSS hover funziona da solo. */
(function () {
  var sheet = document.getElementById("bottomSheet");
  var overlay = document.getElementById("bsOverlay");
  var bsTitle = document.getElementById("bsTitle");
  var bsDesc = document.getElementById("bsDesc");
  if (!sheet || !overlay) return;

  function openSheet(title, desc) {
    bsTitle.textContent = title;
    bsDesc.textContent = desc;
    sheet.classList.add("active");
    overlay.classList.add("active");
  }

  function closeSheet() {
    sheet.classList.remove("active");
    overlay.classList.remove("active");
  }

  document.querySelectorAll(".key-word").forEach(function (kw) {
    kw.addEventListener("click", function (e) {
      if (window.innerWidth > 800) return;
      e.preventDefault();
      e.stopPropagation();
      var tip = kw.querySelector(".tip");
      if (!tip) return;
      openSheet(kw.childNodes[0].textContent.trim(), tip.textContent.trim());
    });
  });

  overlay.addEventListener("click", closeSheet);

  /* swipe down per chiudere */
  var startY = 0;
  sheet.addEventListener(
    "touchstart",
    function (e) {
      startY = e.touches[0].clientY;
    },
    { passive: true },
  );
  sheet.addEventListener(
    "touchmove",
    function (e) {
      var dy = e.touches[0].clientY - startY;
      if (dy > 60) closeSheet();
    },
    { passive: true },
  );
})();

/* 7. STAT CARDS TOGGLE */
document.querySelectorAll(".stat-card").forEach((card) => {
  card.addEventListener("click", () => card.classList.toggle("open"));
});

/* 8. SKILLS ANIMATION */
const skillsGrid = document.querySelector(".skills-grid");
const skillsTotal = document.querySelector(".skills-total");
if (skillsGrid) {
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const allChips = skillsGrid.querySelectorAll(".skill-chip");
          allChips.forEach((chip, i) => {
            chip.style.opacity = "0";
            chip.style.transform = "translateY(8px) scale(.95)";
            chip.style.transition = "none";
            setTimeout(
              () => {
                chip.style.transition =
                  "opacity .35s ease, transform .35s ease";
                chip.style.opacity = "1";
                chip.style.transform = "translateY(0) scale(1)";
              },
              400 + i * 40,
            );
          });
          if (skillsTotal) {
            let count = 0;
            const step = () => {
              count++;
              skillsTotal.textContent = count + " skills";
              if (count < 24) requestAnimationFrame(step);
            };
            setTimeout(step, 600);
          }
          skillsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );
  skillsObserver.observe(skillsGrid);
}
