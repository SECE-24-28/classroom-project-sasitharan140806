const API_URL = "https://mockapi.io/api/v1/plans"; // Replace with your real MockAPI endpoint
let plans = [];
let currentType = "prepaid";
let selectedPlan = null;

const qs = (sel) => document.querySelector(sel);
const qsa = (sel) => Array.from(document.querySelectorAll(sel));

const fallbackPlans = [
  { id: "1", type: "prepaid", price: 199, validity: "28 days", data: "1.5GB/day", description: "Unlimited calls + 100 SMS/day" },
  { id: "2", type: "prepaid", price: 299, validity: "28 days", data: "2GB/day", description: "Unlimited calls + 100 SMS/day" },
  { id: "3", type: "prepaid", price: 399, validity: "56 days", data: "2GB/day", description: "OTT lite" },
  { id: "4", type: "postpaid", price: 499, validity: "1 month", data: "75GB", description: "Family add-on available" },
  { id: "5", type: "postpaid", price: 649, validity: "1 month", data: "90GB", description: "Intl roaming packs" },
  { id: "6", type: "postpaid", price: 799, validity: "1 month", data: "120GB", description: "OTT + hotspot" },
  { id: "7", type: "prepaid", price: 666, validity: "84 days", data: "1.5GB/day", description: "Long validity combo" },
  { id: "8", type: "prepaid", price: 109, validity: "14 days", data: "1GB/day", description: "Budget starter" },
];

function toast(msg) {
  const t = qs("#toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2000);
}

function setStatus(text, tone = "muted") {
  const status = qs("#status");
  if (!status) return;
  status.textContent = text;
  status.className = `text-sm ${tone === "error" ? "text-rose-300" : "text-slate-400"}`;
}

async function fetchPlans() {
  setStatus("Loading plans from API...", "muted");
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    plans = data && Array.isArray(data) && data.length ? data : fallbackPlans;
    setStatus("Loaded from API.");
  } catch (err) {
    plans = fallbackPlans;
    setStatus("API unavailable, showing fallback data.", "error");
    toast("Using fallback data");
  }
  renderPlans();
}

function renderPlans() {
  const grid = qs("#planGrid");
  if (!grid) return;
  const filtered = plans.filter((p) => (p.type || "").toLowerCase() === currentType);
  if (!filtered.length) {
    grid.innerHTML = `<p class="text-slate-400">No plans found for ${currentType}.</p>`;
    return;
  }
  grid.innerHTML = filtered.map((p) => `
    <article class="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2 shadow">
      <div class="flex items-start justify-between">
        <div class="text-xl font-semibold">₹${p.price}</div>
        <span class="badge">${p.type}</span>
      </div>
      <p class="text-slate-200">${p.data} • ${p.validity}</p>
      <p class="text-slate-400 text-sm">${p.description || ""}</p>
      <button type="button" class="mt-2 px-3 py-2 rounded-lg bg-cyan-400 text-slate-900 font-semibold" data-select="${p.id}">Select</button>
    </article>
  `).join("");
  grid.querySelectorAll("[data-select]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const plan = plans.find((p) => String(p.id) === btn.dataset.select);
      if (plan) selectPlan(plan);
    });
  });
}

function selectPlan(plan) {
  selectedPlan = plan;
  const target = qs("#selected");
  if (!target) return;
  target.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <p class="text-sm text-slate-400">Selected Plan</p>
        <h4 class="text-2xl font-semibold">₹${plan.price} • ${plan.data}</h4>
        <p class="text-slate-300">${plan.validity} • ${plan.type}</p>
        <p class="text-slate-400 text-sm">${plan.description || ""}</p>
      </div>
      <div class="text-right">
        <p class="text-sm text-slate-400">Total</p>
        <p class="text-2xl font-semibold">₹${plan.price}</p>
        <button id="proceed" class="mt-2 px-4 py-2 rounded-xl bg-indigo-500 text-white font-semibold">Proceed to Payment</button>
      </div>
    </div>
  `;
  const proceed = qs("#proceed");
  if (proceed) {
    proceed.addEventListener("click", () => {
      toast(`Proceeding with ₹${plan.price}`);
    });
  }
}

function bindTypeButtons() {
  qsa(".type-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentType = btn.dataset.type;
      qsa(".type-btn").forEach((b) => b.classList.remove("bg-slate-800", "text-slate-100"));
      btn.classList.add("bg-slate-800", "text-slate-100");
      renderPlans();
    });
  });
}

function init() {
  bindTypeButtons();
  const reload = qs("#reload");
  if (reload) reload.addEventListener("click", fetchPlans);
  fetchPlans();
}

document.addEventListener("DOMContentLoaded", init);
