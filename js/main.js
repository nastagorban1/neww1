document.addEventListener("DOMContentLoaded", init);

function init() {
  initActiveNav();
  initMobileMenu();
  initTheme();
  initBackToTop();
  initFooterYear();
  initAccordion();
  initFormValidation();
  initFormDraft();
}

function initActiveNav() {
  const links = document.querySelectorAll(".nav-list a");
  const currentPage = location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href").includes(currentPage)) {
      link.classList.add("is-active");
    }
  });
}
function initMobileMenu() {
  const nav = document.querySelector(".nav-list");
  const btn = document.querySelector(".menu-btn");

  if (!nav || !btn) return;

  btn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}


function initTheme() {
  const btn = document.querySelector(".theme-btn");
  const body = document.body;

  if (!btn) return;

  const saved = localStorage.getItem("theme");

  if (saved === "dark") {
    body.classList.add("theme-dark");
  }

  btn.addEventListener("click", () => {
    body.classList.toggle("theme-dark");

    localStorage.setItem(
      "theme",
      body.classList.contains("theme-dark") ? "dark" : "light"
    );
  });
}

function initBackToTop() {
  const btn = document.querySelector(".to-top");

  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.hidden = window.scrollY < 200;
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initFooterYear() {
  const year = document.querySelector(".year");
  if (year) year.textContent = new Date().getFullYear();
}

function initAccordion() {
  const items = document.querySelectorAll(".accordion-item");

  items.forEach(item => {
    const btn = item.querySelector(".accordion-title");

    btn?.addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });
}

function initFormValidation() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("[name='name']");
    const email = form.querySelector("[name='email']");
    const msg = form.querySelector("[name='message']");

    let valid = true;

    if (name.value.length < 2) valid = false;
    if (!email.value.includes("@")) valid = false;
    if (msg.value.trim() === "") valid = false;

    if (!valid) {
      alert("Заповніть форму правильно");
      return;
    }

    alert("Форма відправлена!");
    form.reset();
    localStorage.removeItem("contactDraft");
  });
}

function initFormDraft() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const key = "contactDraft";

  const saved = JSON.parse(localStorage.getItem(key) || "{}");

  Object.keys(saved).forEach(name => {
    const el = form.querySelector(`[name="${name}"]`);
    if (el) el.value = saved[name];
  });

  form.addEventListener("input", () => {
    const data = Object.fromEntries(new FormData(form).entries());
    localStorage.setItem(key, JSON.stringify(data));
  });
}
