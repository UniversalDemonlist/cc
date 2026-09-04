const levels = [
  {
    id: "green_hill",
    name: "Green Hill Zone Act 3",
    game: "Sonic 1",
    thumbnail: "images/greenhill.png",
    victors: ["Player1", "Player2"]
  },
  {
    id: "chemical_plant",
    name: "Chemical Plant Zone Act 2",
    game: "Sonic 2",
    thumbnail: "images/chemicalplant.png",
    victors: ["Player3"]
  }
];

const pendingLevels = [
  {
    id: "metropolis",
    name: "Metropolis Zone Act 3",
    game: "Sonic 2",
    thumbnail: "images/metropolis.png"
  }
];

const allowedMods = [
  {
    name: "Sonic 1 Forever"
  },
  {
    name: "Sonic 2 Absolute"
  }
];

const players = [
  {
    name: "Player1",
    score: 120,
    hardestZone: "Chemical Plant Zone Act 2"
  },
  {
    name: "Player2",
    score: 95,
    hardestZone: "Green Hill Zone Act 3"
  }
];

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

function createLevelCard(lvl) {
  const card = document.createElement("div");
  card.className = "level-card";
  card.innerHTML = `
    <img src="${lvl.thumbnail}">
    <div class="level-info">
      <h2>${lvl.name}</h2>
      <p>Game: ${lvl.game}</p>
    </div>
  `;
  card.onclick = () => openLevelPage(lvl);
  return card;
}

function openLevelPage(lvl) {
  const page = document.getElementById("level-page");
  page.innerHTML = `
    <div class="level-header">
      <img src="${lvl.thumbnail}" class="level-banner">
      <div>
        <h1>${lvl.name}</h1>
        <p>Game: ${lvl.game}</p>
      </div>
    </div>
    <h2>Victors</h2>
    <div class="victor-list">
      ${lvl.victors.map(v => `<p>${v}</p>`).join("")}
    </div>
  `;
}

function renderList() {
  const container = document.getElementById("list-container");
  container.innerHTML = "";
  levels.forEach(lvl => container.appendChild(createLevelCard(lvl)));
}

function renderPending() {
  const container = document.getElementById("pending-container");
  container.innerHTML = "";
  pendingLevels.forEach(lvl => {
    const card = document.createElement("div");
    card.className = "level-card";
    card.innerHTML = `
      <img src="${lvl.thumbnail}">
      <div class="level-info">
        <h2>${lvl.name}</h2>
        <p>Game: ${lvl.game}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderAllowed() {
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

renderList();
renderPending();
renderAllowed();
renderLeaderboard();
