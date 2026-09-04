let levelList = [];
let pendingList = [];
let allowedMods = [];
let players = [];

async function loadLevelList() {
  const ids = await fetch("data/sonic_list.json").then(r => r.json());
  const levels = await Promise.all(
    ids.map(id => fetch(`data/levels/${id}.json`).then(r => r.json()))
  );
  levelList = levels;
  renderLevelList();
}

async function loadPendingList() {
  const ids = await fetch("data/pending.json").then(r => r.json());
  const levels = await Promise.all(
    ids.map(id => fetch(`data/levels/${id}.json`).then(r => r.json()))
  );
  pendingList = levels;
  renderPendingList();
}

async function loadAllowedMods() {
  allowedMods = await fetch("data/allowed_mods.json").then(r => r.json());
  renderAllowedMods();
}

async function loadPlayers() {
  players = await fetch("data/players.json").then(r => r.json());
  renderLeaderboard();
}

function renderLevelList() {
  const container = document.getElementById("list-container");
  container.innerHTML = "";
  levelList.forEach(l => container.appendChild(createLevelCard(l)));
}

function renderPendingList() {
  const container = document.getElementById("pending-container");
  container.innerHTML = "";
  pendingList.forEach(l => container.appendChild(createLevelCard(l)));
}

function renderAllowedMods() {
  const container = document.getElementById("allowed-container");
  container.innerHTML = "";
  allowedMods.forEach(m => {
    const div = document.createElement("div");
    div.textContent = m.name;
    container.appendChild(div);
  });
}

function renderLeaderboard() {
  const container = document.getElementById("leaderboard-container");
  container.innerHTML = "";
  players.sort((a, b) => b.score - a.score);
  players.forEach(p => {
    const card = document.createElement("div");
    card.className = "player-card";
    card.innerHTML = `
      <h2>${p.name}</h2>
      <p>Score: ${p.score}</p>
      <p>Hardest Zone: ${p.hardestZone}</p>
    `;
    container.appendChild(card);
  });
}

function createLevelCard(l) {
  const card = document.createElement("div");
  card.className = "level-card";
  card.innerHTML = `
    <img src="${l.thumbnail}">
    <div class="level-info">
      <h2>${l.name}</h2>
      <p>Game: ${l.game}</p>
    </div>
  `;
  card.onclick = () => openLevelPage(l);
  return card;
}

function openLevelPage(l) {
  const overlay = document.getElementById("demon-overlay");
  overlay.innerHTML = `
    <div class="demon-page-inner">
      <button class="close-page" id="close-demon-page">×</button>

      <div class="demon-page-header">
        <img src="${l.thumbnail}" class="demon-page-banner">
        <div>
          <h1>${l.name}</h1>
          <p>Game: ${l.game}</p>
        </div>
      </div>

      <h2>Records</h2>
      <div class="victor-list">
        ${l.records.map(r => `
          <p>${r.user} — ${r.percent}% — <a href="${r.link}" target="_blank">Video</a></p>
        `).join("")}
      </div>
    </div>
  `;
  overlay.classList.add("active");
  document.getElementById("close-demon-page").onclick = closeLevelPage;
}

function closeLevelPage() {
  const overlay = document.getElementById("demon-overlay");
  overlay.classList.remove("active");
  overlay.innerHTML = "";
}

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const tab = btn.getAttribute("data-tab");
    document.querySelectorAll(".tab-content").forEach(c => {
      c.classList.toggle("active", c.id === tab);
    });
  });
});

loadLevelList();
loadPendingList();
loadAllowedMods();
loadPlayers();
