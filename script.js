let demonList = [];
let pendingList = [];
let allowedMods = [];
let players = [];

async function loadDemonList() {
  const ids = await fetch("data/demonlist.json").then(r => r.json());
  const demons = await Promise.all(
    ids.map(id => fetch(`data/demons/${id}.json`).then(r => r.json()))
  );
  demonList = demons;
  renderDemonList();
}

async function loadPendingList() {
  const ids = await fetch("data/pending.json").then(r => r.json());
  const demons = await Promise.all(
    ids.map(id => fetch(`data/demons/${id}.json`).then(r => r.json()))
  );
  pendingList = demons;
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

function renderDemonList() {
  const container = document.getElementById("list-container");
  container.innerHTML = "";
  demonList.forEach(d => container.appendChild(createDemonCard(d)));
}

function renderPendingList() {
  const container = document.getElementById("pending-container");
  container.innerHTML = "";
  pendingList.forEach(d => container.appendChild(createDemonCard(d)));
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

function createDemonCard(d) {
  const card = document.createElement("div");
  card.className = "demon-card";
  card.innerHTML = `
    <img src="${d.thumbnail}">
    <div class="demon-info">
      <h2>${d.name}</h2>
      <p>Game: ${d.game}</p>
    </div>
  `;
  card.onclick = () => openDemonPage(d);
  return card;
}

function openDemonPage(d) {
  const overlay = document.getElementById("demon-overlay");
  overlay.innerHTML = `
    <div class="demon-page-inner">
      <button class="close-page" id="close-demon-page">×</button>
      <div class="demon-page-header">
        <img src="${d.thumbnail}" class="demon-page-banner">
        <div>
          <h1>${d.name}</h1>
          <p>Game: ${d.game}</p>
        </div>
      </div>
      <h2>Victors</h2>
      <div class="victor-list">
        ${Array.isArray(d.victors) ? d.victors.map(v => `<p>${v}</p>`).join("") : ""}
      </div>
      ${d.video ? `
      <div class="demon-page-video">
        <iframe src="${d.video}" allowfullscreen></iframe>
      </div>` : ""}
    </div>
  `;
  overlay.classList.add("active");
  document.getElementById("close-demon-page").onclick = closeDemonPage;
}

function closeDemonPage() {
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

loadDemonList();
loadPendingList();
loadAllowedMods();
loadPlayers();
