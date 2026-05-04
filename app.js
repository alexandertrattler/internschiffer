const capabilityDefs = [
  ["CGI/3D", ["cgi", "3d", "render", "visualisierung", "visuals", "digital human", "unreal", "simulation"]],
  ["Motion/VFX", ["motion", "animation", "vfx", "postproduktion", "moving image", "bewegtbild"]],
  ["Immersive/XR", ["immersive", "vr", "ar", "xr", "mixed reality", "360", "phygital"]],
  ["Installation/Exhibition", ["installation", "ausstellung", "exponat", "muse", "raum", "szenografie", "visitor", "showroom"]],
  ["Branding/Communication", ["brand", "marke", "branding", "kommunikation", "kampagne", "strategy", "strategie", "identity"]],
  ["Creative Tech/Data/AI", ["technologie", "technology", "creative tech", "software", "data", "daten", "ai", "ki", "generativ", "interactive", "interaktiv"]],
  ["Film/Production", ["film", "produktion", "commercial", "spot", "video", "live action", "content"]],
  ["Event/Tech Service", ["event", "veranstaltung", "technik", "lichttechnik", "ton", "projektion", "messe"]],
  ["Art/Culture", ["kunst", "kultur", "festival", "museum", "media art", "medienkunst", "public art"]]
];

const colors = {
  "Tech/Immersive Brand Studio": "#1f6fb2",
  "Immersive Kultur/Experience": "#14857c",
  "CGI/Motion Production": "#7858a6",
  "Ausstellung/Spatial Experience": "#4d8b37",
  "Branding/Kommunikation": "#b9821e",
  "Technik/Event Dienstleister": "#b84d45",
  "Sonstiges/unklar": "#627084"
};

const state = {
  agencies: [],
  filtered: [],
  selectedId: null,
  query: "",
  capabilityFilters: new Set(),
  confidenceFilters: new Set(),
  regionFilters: new Set(),
  shortlist: new Set(JSON.parse(localStorage.getItem("agencyShortlist") || "[]"))
};

const els = {
  searchInput: document.querySelector("#searchInput"),
  capabilityFilters: document.querySelector("#capabilityFilters"),
  confidenceFilters: document.querySelector("#confidenceFilters"),
  regionFilters: document.querySelector("#regionFilters"),
  resetFilters: document.querySelector("#resetFilters"),
  landscapeSvg: document.querySelector("#landscapeSvg"),
  detailPanel: document.querySelector("#detailPanel"),
  cardsGrid: document.querySelector("#cardsGrid"),
  matrixTable: document.querySelector("#matrixTable"),
  shortlistGrid: document.querySelector("#shortlistGrid"),
  copyShortlist: document.querySelector("#copyShortlist"),
  tooltip: document.querySelector("#tooltip"),
  legend: document.querySelector("#legend"),
  statTotal: document.querySelector("#statTotal"),
  statShown: document.querySelector("#statShown"),
  statShortlist: document.querySelector("#statShortlist")
};

const normalize = (value) => String(value || "").toLowerCase();

const detectRegion = (location) => {
  const text = normalize(location);
  if (!text) return "Unklar";
  if (text.includes("deutschland") || text.includes("berlin") || text.includes("köln") || text.includes("hamburg") || text.includes("stuttgart") || text.includes("bielefeld") || text.includes("münchen")) return "Deutschland";
  if (text.includes("niederlande") || text.includes("dänemark") || text.includes("schweiz") || text.includes("österreich") || text.includes("frankreich") || text.includes("glasgow") || text.includes("london") || text.includes("vereinigtes königreich")) return "Europa";
  if (text.includes("usa") || text.includes("kanada") || text.includes("global") || text.includes("remote") || text.includes("new york") || text.includes("los angeles")) return "Global/USA";
  return "Weitere";
};

const enrichAgency = (agency) => {
  const haystack = normalize(`${agency.name} ${agency.location} ${agency.profile}`);
  const capabilities = capabilityDefs
    .filter(([, keywords]) => keywords.some((keyword) => haystack.includes(keyword)))
    .map(([name]) => name);

  const has = (capability) => capabilities.includes(capability);
  const techScore = Number(has("CGI/3D")) + Number(has("Immersive/XR")) + Number(has("Creative Tech/Data/AI")) + Number(has("Installation/Exhibition"));
  const cultureScore = Number(has("Art/Culture")) + Number(has("Installation/Exhibition")) - Number(has("Branding/Communication")) - Number(has("Film/Production"));
  const focus =
    techScore >= 3 && cultureScore >= 1 ? "Immersive Kultur/Experience" :
    techScore >= 3 ? "Tech/Immersive Brand Studio" :
    has("CGI/3D") && has("Motion/VFX") ? "CGI/Motion Production" :
    has("Installation/Exhibition") ? "Ausstellung/Spatial Experience" :
    has("Event/Tech Service") ? "Technik/Event Dienstleister" :
    has("Branding/Communication") ? "Branding/Kommunikation" :
    "Sonstiges/unklar";

  return {
    ...agency,
    capabilities,
    techScore,
    cultureScore,
    focus,
    region: detectRegion(agency.location)
  };
};

const html = (value) => String(value || "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#039;"
}[char]));

const saveShortlist = () => {
  localStorage.setItem("agencyShortlist", JSON.stringify([...state.shortlist]));
  els.statShortlist.textContent = state.shortlist.size;
};

const button = (label, active, onClick) => {
  const el = document.createElement("button");
  el.className = `chip${active ? " active" : ""}`;
  el.type = "button";
  el.textContent = label;
  el.addEventListener("click", onClick);
  return el;
};

const renderFilters = () => {
  els.capabilityFilters.replaceChildren(...capabilityDefs.map(([name]) => button(
    name,
    state.capabilityFilters.has(name),
    () => toggleSet(state.capabilityFilters, name)
  )));

  els.confidenceFilters.replaceChildren(...["high", "medium", "low"].map((name) => button(
    name,
    state.confidenceFilters.has(name),
    () => toggleSet(state.confidenceFilters, name)
  )));

  const regions = [...new Set(state.agencies.map((agency) => agency.region))].sort();
  els.regionFilters.replaceChildren(...regions.map((name) => button(
    name,
    state.regionFilters.has(name),
    () => toggleSet(state.regionFilters, name)
  )));
};

const toggleSet = (set, value) => {
  if (set.has(value)) set.delete(value);
  else set.add(value);
  update();
};

const filterAgencies = () => {
  const query = normalize(state.query);
  state.filtered = state.agencies.filter((agency) => {
    const text = normalize(`${agency.name} ${agency.domain} ${agency.location} ${agency.profile} ${agency.focus}`);
    const matchesQuery = !query || text.includes(query);
    const matchesCapabilities = state.capabilityFilters.size === 0 || [...state.capabilityFilters].every((capability) => agency.capabilities.includes(capability));
    const matchesConfidence = state.confidenceFilters.size === 0 || state.confidenceFilters.has(agency.confidence);
    const matchesRegion = state.regionFilters.size === 0 || state.regionFilters.has(agency.region);
    return matchesQuery && matchesCapabilities && matchesConfidence && matchesRegion;
  });
};

const scale = (value, min, max, outMin, outMax) => {
  if (max === min) return (outMin + outMax) / 2;
  return outMin + ((value - min) / (max - min)) * (outMax - outMin);
};

const renderLegend = () => {
  const activeFocuses = [...new Set(state.agencies.map((agency) => agency.focus))].sort();
  els.legend.innerHTML = activeFocuses.map((focus) => `<span><i style="background:${colors[focus]}"></i>${html(focus)}</span>`).join("");
};

const renderMap = () => {
  const svg = els.landscapeSvg;
  const width = 980;
  const height = 620;
  const pad = { left: 86, right: 44, top: 42, bottom: 76 };
  const minTech = Math.min(...state.agencies.map((agency) => agency.techScore), 0);
  const maxTech = Math.max(...state.agencies.map((agency) => agency.techScore), 4);
  const minCulture = Math.min(...state.agencies.map((agency) => agency.cultureScore), -2);
  const maxCulture = Math.max(...state.agencies.map((agency) => agency.cultureScore), 2);
  const shownIds = new Set(state.filtered.map((agency) => agency.id));
  const selected = state.selectedId;

  const x = (agency) => scale(agency.techScore, minTech, maxTech, pad.left, width - pad.right);
  const y = (agency) => scale(agency.cultureScore, minCulture, maxCulture, height - pad.bottom, pad.top);

  const grid = [0, 1, 2, 3, 4].map((tick) => {
    const tx = scale(tick, minTech, maxTech, pad.left, width - pad.right);
    return `<line class="grid-line" x1="${tx}" y1="${pad.top}" x2="${tx}" y2="${height - pad.bottom}"></line>`;
  }).join("") + [-2, -1, 0, 1, 2].map((tick) => {
    const ty = scale(tick, minCulture, maxCulture, height - pad.bottom, pad.top);
    return `<line class="grid-line" x1="${pad.left}" y1="${ty}" x2="${width - pad.right}" y2="${ty}"></line>`;
  }).join("");

  const points = state.agencies.map((agency) => {
    const visible = shownIds.has(agency.id);
    const radius = agency.confidence === "high" ? 8 : agency.confidence === "medium" ? 7 : 6;
    return `<circle
      class="agency-point ${visible ? "" : "dimmed"} ${selected === agency.id ? "selected" : ""}"
      data-id="${agency.id}"
      cx="${x(agency)}"
      cy="${y(agency)}"
      r="${radius}"
      fill="${colors[agency.focus]}"
      tabindex="0"
      role="button"
      aria-label="${html(agency.name)}"></circle>`;
  }).join("");

  svg.innerHTML = `
    <rect x="0" y="0" width="${width}" height="${height}" fill="#fbfdff"></rect>
    ${grid}
    <line x1="${pad.left}" y1="${height - pad.bottom}" x2="${width - pad.right}" y2="${height - pad.bottom}" stroke="#223047" stroke-width="1.4"></line>
    <line x1="${pad.left}" y1="${pad.top}" x2="${pad.left}" y2="${height - pad.bottom}" stroke="#223047" stroke-width="1.4"></line>
    <text class="axis-label" x="${pad.left}" y="${height - 30}">Branding / Kommunikation</text>
    <text class="axis-label" x="${width - 238}" y="${height - 30}">Tech / Immersion</text>
    <text class="axis-label" x="18" y="${height - pad.bottom}" transform="rotate(-90 18 ${height - pad.bottom})">Commercial / Corporate</text>
    <text class="axis-label" x="18" y="${pad.top + 160}" transform="rotate(-90 18 ${pad.top + 160})">Kunst / Kultur / Experience</text>
    ${points}
  `;

  svg.querySelectorAll(".agency-point").forEach((point) => {
    point.addEventListener("click", () => selectAgency(Number(point.dataset.id)));
    point.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") selectAgency(Number(point.dataset.id));
    });
    point.addEventListener("pointermove", (event) => showTooltip(event, Number(point.dataset.id)));
    point.addEventListener("pointerleave", hideTooltip);
  });
};

const showTooltip = (event, id) => {
  const agency = state.agencies.find((item) => item.id === id);
  els.tooltip.hidden = false;
  els.tooltip.innerHTML = `<strong>${html(agency.name)}</strong>${html(agency.focus)}<br>${html(agency.location || "Ort unklar")}`;
  els.tooltip.style.left = `${event.clientX + 14}px`;
  els.tooltip.style.top = `${event.clientY + 14}px`;
};

const hideTooltip = () => {
  els.tooltip.hidden = true;
};

const selectAgency = (id) => {
  state.selectedId = id;
  renderMap();
  renderDetail();
};

const shortlistButtonLabel = (id) => state.shortlist.has(id) ? "Von Shortlist entfernen" : "Zur Shortlist";

const toggleShortlist = (id) => {
  if (state.shortlist.has(id)) state.shortlist.delete(id);
  else state.shortlist.add(id);
  saveShortlist();
  renderDetail();
  renderCards();
  renderShortlist();
};

const agencyLink = (agency) => {
  if (agency.sourceUrl) return agency.sourceUrl;
  if (agency.domain) return `https://${agency.domain.split(";")[0].trim()}`;
  return "";
};

const renderDetail = () => {
  const agency = state.agencies.find((item) => item.id === state.selectedId) || state.filtered[0];
  if (!agency) {
    els.detailPanel.innerHTML = `<p class="empty-detail">Keine Agentur passt zu den aktuellen Filtern.</p>`;
    return;
  }
  state.selectedId = agency.id;
  const url = agencyLink(agency);
  els.detailPanel.innerHTML = `
    <h2>${html(agency.name)}</h2>
    <p class="domain">${html(agency.domain || "Keine verifizierte Domain")}</p>
    <div class="tags">${agency.capabilities.map((tag) => `<span class="tag">${html(tag)}</span>`).join("")}</div>
    <p class="profile">${html(agency.profile)}</p>
    <div class="meta">
      <div><strong>Ort</strong>${html(agency.location || "Unklar")}</div>
      <div><strong>Einordnung</strong>${html(agency.focus)}</div>
      <div><strong>Sicherheit</strong><span class="confidence ${html(agency.confidence)}">${html(agency.confidence)}</span></div>
    </div>
    <div class="detail-actions">
      ${url ? `<a href="${html(url)}" target="_blank" rel="noreferrer">Quelle öffnen</a>` : ""}
      <button type="button" data-shortlist="${agency.id}">${shortlistButtonLabel(agency.id)}</button>
    </div>
  `;
  els.detailPanel.querySelector("[data-shortlist]")?.addEventListener("click", () => toggleShortlist(agency.id));
};

const renderCards = () => {
  els.cardsGrid.innerHTML = state.filtered.map(cardTemplate).join("");
  els.cardsGrid.querySelectorAll("[data-select]").forEach((buttonEl) => {
    buttonEl.addEventListener("click", () => {
      selectAgency(Number(buttonEl.dataset.select));
      switchView("map");
    });
  });
  els.cardsGrid.querySelectorAll("[data-shortlist]").forEach((buttonEl) => {
    buttonEl.addEventListener("click", () => toggleShortlist(Number(buttonEl.dataset.shortlist)));
  });
};

const cardTemplate = (agency) => `
  <article class="card">
    <h3>${html(agency.name)}</h3>
    <span class="confidence ${html(agency.confidence)}">${html(agency.confidence)}</span>
    <p class="domain">${html(agency.domain || "Keine verifizierte Domain")}</p>
    <div class="tags">${agency.capabilities.slice(0, 5).map((tag) => `<span class="tag">${html(tag)}</span>`).join("")}</div>
    <p>${html(agency.profile)}</p>
    <div class="card-footer">
      <button type="button" data-select="${agency.id}">Details</button>
      <button type="button" data-shortlist="${agency.id}">${state.shortlist.has(agency.id) ? "Entfernen" : "Shortlist"}</button>
    </div>
  </article>
`;

const renderMatrix = () => {
  const headers = ["Firma", "Domain", ...capabilityDefs.map(([name]) => name), "Sicherheit"];
  const rows = state.filtered.map((agency) => `
    <tr>
      <td><button class="matrix-link" data-select="${agency.id}" type="button">${html(agency.name)}</button></td>
      <td>${html(agency.domain)}</td>
      ${capabilityDefs.map(([name]) => `<td class="${agency.capabilities.includes(name) ? "mark" : ""}">${agency.capabilities.includes(name) ? "1" : ""}</td>`).join("")}
      <td><span class="confidence ${html(agency.confidence)}">${html(agency.confidence)}</span></td>
    </tr>
  `).join("");
  els.matrixTable.innerHTML = `<thead><tr>${headers.map((header) => `<th>${html(header)}</th>`).join("")}</tr></thead><tbody>${rows}</tbody>`;
  els.matrixTable.querySelectorAll("[data-select]").forEach((buttonEl) => {
    buttonEl.addEventListener("click", () => {
      selectAgency(Number(buttonEl.dataset.select));
      switchView("map");
    });
  });
};

const renderShortlist = () => {
  const items = state.agencies.filter((agency) => state.shortlist.has(agency.id));
  els.shortlistGrid.innerHTML = items.length ? items.map(cardTemplate).join("") : `<p class="empty-detail">Noch keine Einträge in der Shortlist.</p>`;
  els.shortlistGrid.querySelectorAll("[data-select]").forEach((buttonEl) => {
    buttonEl.addEventListener("click", () => {
      selectAgency(Number(buttonEl.dataset.select));
      switchView("map");
    });
  });
  els.shortlistGrid.querySelectorAll("[data-shortlist]").forEach((buttonEl) => {
    buttonEl.addEventListener("click", () => toggleShortlist(Number(buttonEl.dataset.shortlist)));
  });
};

const switchView = (view) => {
  document.querySelectorAll(".view-tabs button").forEach((tab) => tab.classList.toggle("active", tab.dataset.view === view));
  document.querySelectorAll(".view").forEach((panel) => panel.classList.toggle("active", panel.id === `${view}View`));
};

const update = () => {
  filterAgencies();
  els.statShown.textContent = state.filtered.length;
  renderFilters();
  renderMap();
  renderDetail();
  renderCards();
  renderMatrix();
  renderShortlist();
};

const copyShortlist = async () => {
  const text = state.agencies
    .filter((agency) => state.shortlist.has(agency.id))
    .map((agency) => `${agency.name} - ${agency.domain || "keine Domain"}\n${agency.profile}\n${agency.sourceUrl}`)
    .join("\n\n");
  const payload = text || "Keine Shortlist-Einträge.";
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(payload);
  } else {
    const area = document.createElement("textarea");
    area.value = payload;
    document.body.append(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
  els.copyShortlist.textContent = "Kopiert";
  setTimeout(() => {
    els.copyShortlist.textContent = "Als Text kopieren";
  }, 1200);
};

const init = () => {
  const data = window.AGENCIES || [];
  state.agencies = data.map(enrichAgency);
  state.filtered = state.agencies;
  state.selectedId = state.agencies[0]?.id || null;

  els.statTotal.textContent = state.agencies.length;
  saveShortlist();
  renderLegend();
  update();

  els.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    update();
  });
  els.resetFilters.addEventListener("click", () => {
    state.query = "";
    state.capabilityFilters.clear();
    state.confidenceFilters.clear();
    state.regionFilters.clear();
    els.searchInput.value = "";
    update();
  });
  document.querySelectorAll(".view-tabs button").forEach((tab) => {
    tab.addEventListener("click", () => switchView(tab.dataset.view));
  });
  els.copyShortlist.addEventListener("click", copyShortlist);
};

init();
