const STORAGE_USER = "day4_user";
const STORAGE_HISTORY = "day4_history";

const planCatalog = [
  { id: "p1", price: 199, data: "1.5GB/day", validity: "28d", desc: "Combo pack" },
  { id: "p2", price: 239, data: "1.5GB/day", validity: "28d", desc: "Prime add-on" },
  { id: "p3", price: 399, data: "2GB/day", validity: "56d", desc: "OTT lite" },
];

const qs = (sel) => document.querySelector(sel);
const qsa = (sel) => Array.from(document.querySelectorAll(sel));

function getUser() {
  const raw = localStorage.getItem(STORAGE_USER);
  return raw ? JSON.parse(raw) : null;
}

function setUser(user) {
  localStorage.setItem(STORAGE_USER, JSON.stringify(user));
}

function getHistory() {
  const raw = localStorage.getItem(STORAGE_HISTORY);
  return raw ? JSON.parse(raw) : [];
}

function setHistory(arr) {
  localStorage.setItem(STORAGE_HISTORY, JSON.stringify(arr));
}

function toast(msg) {
  const t = qs("#toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2200);
}

function setError(field, message) {
  const errEl = qs(`[data-error-for="${field}"]`);
  if (errEl) errEl.textContent = message || "";
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePhone(value) {
  return /^\d{10}$/.test(value);
}

function handleLogin() {
  const form = qs("#loginForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    let ok = true;
    setError("email", "");
    setError("password", "");
    if (!validateEmail(email)) {
      setError("email", "Enter a valid email.");
      ok = false;
    }
    if (password.length < 6) {
      setError("password", "Password must be at least 6 characters.");
      ok = false;
    }
    if (!ok) return;
    setUser({ email });
    qs("#loginMessage").textContent = "Login successful. Redirecting to recharge...";
    toast("Signed in as " + email);
    setTimeout(() => (window.location.href = "recharge.html"), 700);
  });
}

function handleSignup() {
  const form = qs("#signupForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { name, email, phone, password, confirm } = form;
    ["name", "email", "phone", "password", "confirm"].forEach((f) => setError(f, ""));
    let ok = true;
    if (!name.value.trim()) { setError("name", "Name is required."); ok = false; }
    if (!validateEmail(email.value.trim())) { setError("email", "Valid email required."); ok = false; }
    if (!validatePhone(phone.value.trim())) { setError("phone", "Enter 10-digit number."); ok = false; }
    if (password.value.length < 6) { setError("password", "Min 6 characters."); ok = false; }
    if (password.value !== confirm.value) { setError("confirm", "Passwords must match."); ok = false; }
    if (!ok) return;
    setUser({ email: email.value.trim(), name: name.value.trim(), phone: phone.value.trim() });
    qs("#signupMessage").textContent = "Account created. Redirecting to login...";
    toast("Signup success. Please login.");
    setTimeout(() => (window.location.href = "login.html"), 800);
  });
}

function renderPlans() {
  const grid = qs("#planGrid");
  if (!grid) return;
  grid.innerHTML = planCatalog.map((p) => `
    <article class="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2" data-plan="${p.id}">
      <div class="text-xl font-semibold">₹${p.price}</div>
      <p class="text-slate-200">${p.data} • ${p.validity}</p>
      <p class="text-slate-400 text-sm">${p.desc}</p>
      <button type="button" class="mt-2 px-3 py-2 rounded-lg bg-teal-400 text-slate-900 font-semibold" data-fill="${p.price}">Use this plan</button>
    </article>
  `).join("");
  grid.querySelectorAll("[data-fill]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const amount = btn.dataset.fill;
      const planInput = qs("#plan");
      if (planInput) planInput.value = amount;
      toast(`Filled amount ₹${amount}`);
      updateSummary();
    });
  });
}

function updateSummary() {
  const summary = qs("#summary");
  if (!summary) return;
  const num = qs("#number")?.value || "—";
  const country = qs("#country")?.value || "";
  const op = qs("#operator")?.value || "—";
  const circle = qs("#circle")?.value || "—";
  const amount = qs("#plan")?.value || "—";
  summary.innerHTML = `
    <p>Number: ${country} ${num || "—"}</p>
    <p>Operator: ${op || "—"}</p>
    <p>Circle: ${circle || "—"}</p>
    <p>Amount: ₹${amount || "—"}</p>
  `;
}

function handleRecharge() {
  const form = qs("#rechargeForm");
  if (!form) return;
  ["number", "operator", "plan", "email"].forEach((f) => setError(f, ""));
  ["#number", "#operator", "#plan", "#circle", "#country"].forEach((sel) => {
    const el = qs(sel);
    if (el) el.addEventListener("input", updateSummary);
  });
  renderPlans();
  updateSummary();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const num = form.number.value.trim();
    const op = form.operator.value;
    const circle = form.circle.value || "N/A";
    const amount = form.plan.value;
    const email = form.email.value.trim();
    let ok = true;
    ["number", "operator", "plan", "email"].forEach((f) => setError(f, ""));
    if (!validatePhone(num)) { setError("number", "Enter 10-digit number."); ok = false; }
    if (!op) { setError("operator", "Pick an operator."); ok = false; }
    if (!amount || Number(amount) <= 0) { setError("plan", "Enter a valid amount."); ok = false; }
    if (email && !validateEmail(email)) { setError("email", "Enter valid email or leave blank."); ok = false; }
    const user = getUser();
    if (!user) { toast("Please login first."); ok = false; }
    if (!ok) return;

    const record = {
      id: crypto.randomUUID(),
      user: user.email,
      number: `${form.country.value}-${num}`,
      operator: op,
      circle,
      amount: Number(amount),
      plan: amount,
      status: "Success",
      ts: new Date().toISOString(),
    };
    const history = getHistory();
    history.unshift(record);
    setHistory(history.slice(0, 20));
    toast("Recharge saved. View dashboard.");
    updateSummary();
    setTimeout(() => (window.location.href = "dashboard.html"), 900);
  });
}

function renderDashboard() {
  const body = qs("#historyBody");
  if (!body) return;
  const history = getHistory();
  const latestCard = qs("#cardLatest");
  const amountCard = qs("#cardAmount");
  const statusCard = qs("#cardStatus");
  const user = getUser();
  const label = qs("#userLabel");
  if (label) label.textContent = user ? `Overview • ${user.email}` : "Overview";

  if (!history.length) {
    body.innerHTML = `<tr><td colspan="6" class="text-center text-slate-400">No recharges yet.</td></tr>`;
    if (latestCard) latestCard.innerHTML = `<p class="text-sm text-slate-400">Last Recharge</p><p class="text-xl font-semibold">—</p><p class="muted">Plan: —</p>`;
    if (amountCard) amountCard.innerHTML = `<p class="text-sm text-slate-400">Amount</p><p class="text-xl font-semibold">₹ —</p><p class="muted">Method: —</p>`;
    if (statusCard) statusCard.innerHTML = `<p class="text-sm text-slate-400">Status</p><p class="badge">Pending</p><p class="muted">Awaiting recharge</p>`;
    return;
  }

  body.innerHTML = history.map((r) => `
    <tr>
      <td>${new Date(r.ts).toLocaleDateString()}</td>
      <td>${r.number}</td>
      <td>${r.operator}</td>
      <td>${r.plan}</td>
      <td>₹${r.amount}</td>
      <td><span class="badge">${r.status}</span></td>
    </tr>
  `).join("");

  const latest = history[0];
  if (latestCard) latestCard.innerHTML = `<p class="text-sm text-slate-400">Last Recharge</p><p class="text-xl font-semibold">${latest.number}</p><p class="muted">Plan: ₹${latest.amount}</p>`;
  if (amountCard) amountCard.innerHTML = `<p class="text-sm text-slate-400">Amount</p><p class="text-xl font-semibold">₹${latest.amount}</p><p class="muted">User: ${latest.user}</p>`;
  const successRate = Math.round((history.filter((r) => r.status === "Success").length / history.length) * 100);
  if (statusCard) statusCard.innerHTML = `<p class="text-sm text-slate-400">Status</p><p class="badge">Success</p><p class="muted">${successRate}% success</p>`;
}

function handleDashboard() {
  renderDashboard();
  const clearBtn = qs("#clearHistory");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      setHistory([]);
      toast("History cleared");
      renderDashboard();
    });
  }
}

function init() {
  const { page } = document.documentElement.dataset;
  handleLogin();
  handleSignup();
  handleRecharge();
  handleDashboard();
  if (page === "recharge") updateSummary();
}

document.addEventListener("DOMContentLoaded", init);
