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

const cityDefs = [
  ["berlin", "Berlin", 52.52, 13.405, ["berlin"]],
  ["hamburg", "Hamburg", 53.551, 9.994, ["hamburg", "hamburg/deutschland"]],
  ["koeln", "Köln", 50.938, 6.96, ["köln", "koln", "cologne", "hürth"]],
  ["stuttgart", "Stuttgart", 48.775, 9.182, ["stuttgart"]],
  ["muenchen", "München", 48.137, 11.576, ["münchen", "munich", "muenchen"]],
  ["frankfurt", "Frankfurt am Main", 50.11, 8.682, ["frankfurt"]],
  ["bielefeld", "Bielefeld", 52.03, 8.532, ["bielefeld", "ostwestfalen"]],
  ["duesseldorf", "Düsseldorf", 51.227, 6.773, ["düsseldorf", "dusseldorf"]],
  ["bremen", "Bremen", 53.079, 8.802, ["bremen"]],
  ["osnabrueck", "Osnabrück", 52.279, 8.047, ["osnabrück", "osnabrueck"]],
  ["essen", "Essen", 51.456, 7.012, ["essen"]],
  ["dortmund", "Dortmund", 51.514, 7.465, ["dortmund"]],
  ["hannover", "Hannover", 52.375, 9.732, ["hannover"]],
  ["heidelberg", "Heidelberg", 49.399, 8.672, ["heidelberg"]],
  ["krefeld", "Krefeld", 51.338, 6.585, ["krefeld"]],
  ["erlangen", "Erlangen", 49.589, 11.011, ["erlangen"]],
  ["rheine", "Rheine", 52.286, 7.44, ["rheine"]],
  ["potsdam", "Potsdam", 52.39, 13.064, ["potsdam"]],
  ["muenster", "Münster", 51.961, 7.626, ["münster", "muenster"]],
  ["dresden", "Dresden", 51.05, 13.737, ["dresden"]],
  ["linz", "Linz", 48.306, 14.286, ["linz"]],
  ["wien", "Wien", 48.208, 16.374, ["wien", "vienna"]],
  ["basel", "Basel/Münchenstein", 47.559, 7.588, ["basel", "münchenstein", "muenchenstein"]],
  ["genf", "Genf/Versoix", 46.204, 6.143, ["genf", "versoix"]],
  ["amsterdam", "Amsterdam", 52.367, 4.904, ["amsterdam"]],
  ["denhaag", "Den Haag", 52.071, 4.3, ["den haag"]],
  ["kopenhagen", "Kopenhagen", 55.676, 12.568, ["kopenhagen", "copenhagen"]],
  ["london", "London", 51.507, -0.128, ["london"]],
  ["glasgow", "Glasgow", 55.864, -4.252, ["glasgow"]],
  ["lyon", "Lyon", 45.764, 4.835, ["lyon"]],
  ["mailand", "Mailand", 45.464, 9.19, ["mailand", "milan"]],
  ["toronto", "Toronto", 43.653, -79.383, ["toronto"]],
  ["saopaulo", "São Paulo", -23.55, -46.633, ["sao paulo", "são paulo"]],
  ["losangeles", "Los Angeles", 34.052, -118.244, ["los angeles"]],
  ["newyork", "New York", 40.713, -74.006, ["new york", "brooklyn"]],
  ["sydney", "Sydney", -33.869, 151.209, ["sydney", "paddington"]],
  ["santafe", "Santa Fe", 35.687, -105.938, ["santa fe"]],
  ["lasvegas", "Las Vegas", 36.172, -115.14, ["las vegas"]],
  ["denver", "Denver", 39.739, -104.99, ["denver"]],
  ["grapevine", "Grapevine", 32.934, -97.078, ["grapevine"]],
  ["houston", "Houston", 29.76, -95.37, ["houston"]],
  ["global", "Global/Remote", null, null, ["global", "remote", "international"]],
  ["unknown", "Ort unklar", null, null, [""]]
].map(([key, label, lat, lon, aliases]) => ({ key, label, lat, lon, aliases }));

const state = {
  agencies: [],
  filtered: [],
  selectedId: null,
  query: "",
  capabilityFilters: new Set(),
  confidenceFilters: new Set(),
  regionFilters: new Set(),
  selectedCityKey: null,
  hoveredCityKey: null,
  map: { scale: 1, tx: 0, ty: 0 },
  drag: null,
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
  zoomIn: document.querySelector("#zoomIn"),
  zoomOut: document.querySelector("#zoomOut"),
  resetMap: document.querySelector("#resetMap"),
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

const cityKeysForLocation = (location) => {
  const text = normalize(location)
    .replaceAll("ü", "ue")
    .replaceAll("ö", "oe")
    .replaceAll("ä", "ae")
    .replaceAll("ß", "ss");
  const keys = cityDefs
    .filter((city) => city.aliases.some((alias) => text.includes(normalize(alias)
      .replaceAll("ü", "ue")
      .replaceAll("ö", "oe")
      .replaceAll("ä", "ae")
      .replaceAll("ß", "ss"))))
    .map((city) => city.key);
  if (keys.length) return [...new Set(keys)];
  if (text.includes("global") || text.includes("remote") || text.includes("international")) return ["global"];
  return ["unknown"];
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
    region: detectRegion(agency.location),
    cityKeys: cityKeysForLocation(agency.location)
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
    const cityLabels = agency.cityKeys.map((key) => cityByKey(key).label).join(" ");
    const text = normalize(`${agency.name} ${agency.domain} ${agency.location} ${cityLabels} ${agency.profile} ${agency.focus}`);
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

const cityByKey = (key) => cityDefs.find((city) => city.key === key) || cityDefs.at(-1);

const project = (lat, lon) => {
  const width = 980;
  const height = 620;
  return {
    x: ((lon + 180) / 360) * width,
    y: ((90 - lat) / 180) * height
  };
};

const agenciesByCity = (items = state.filtered) => {
  const groups = new Map();
  items.forEach((agency) => {
    agency.cityKeys.forEach((key) => {
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(agency);
    });
  });
  return groups;
};

const renderMap = () => {
  const svg = els.landscapeSvg;
  const width = 980;
  const height = 620;
  const groups = agenciesByCity();
  const visibleCities = [...groups.entries()]
    .map(([key, agencies]) => ({ ...cityByKey(key), agencies }))
    .filter((city) => Number.isFinite(city.lat) && Number.isFinite(city.lon));
  const selectedKey = state.selectedCityKey || visibleCities[0]?.key || null;
  state.selectedCityKey = selectedKey;
  const maxCount = Math.max(...visibleCities.map((city) => city.agencies.length), 1);
  const world = { x: state.map.tx, y: state.map.ty, scale: state.map.scale };
  const graticule = [-120, -60, 0, 60, 120].map((lon) => {
    const p1 = project(-65, lon);
    const p2 = project(75, lon);
    return `<line class="map-graticule" x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}"></line>`;
  }).join("") + [-45, 0, 45].map((lat) => {
    const p1 = project(lat, -170);
    const p2 = project(lat, 170);
    return `<line class="map-graticule" x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}"></line>`;
  }).join("");
  const land = [
    ["Europe", 505, 205, 155, 95],
    ["North America", 210, 210, 220, 135],
    ["South America", 330, 410, 95, 160],
    ["Africa", 510, 350, 140, 170],
    ["Asia", 690, 245, 260, 150],
    ["Australia", 800, 470, 135, 70]
  ].map(([label, cx, cy, rx, ry]) => `<ellipse class="map-land" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"><title>${label}</title></ellipse>`).join("");
  const dots = visibleCities.map((city) => {
    const p = project(city.lat, city.lon);
    const count = city.agencies.length;
    const radius = 6 + Math.sqrt(count / maxCount) * 13;
    return `<g class="city-group" data-city="${city.key}">
      <circle class="city-dot ${city.key === selectedKey ? "selected" : ""}" cx="${p.x}" cy="${p.y}" r="${radius}" tabindex="0" role="button" aria-label="${html(city.label)}: ${count} Einträge"></circle>
      <text class="city-label" x="${p.x + radius + 5}" y="${p.y + 4}">${html(city.label)} (${count})</text>
    </g>`;
  }).join("");
  svg.innerHTML = `
    <rect x="0" y="0" width="${width}" height="${height}" fill="#fbfdff"></rect>
    <g id="mapWorld" transform="translate(${world.x} ${world.y}) scale(${world.scale})">
      ${graticule}
      ${land}
      ${dots}
    </g>
    <text class="map-hint" x="24" y="594">${visibleCities.length} Orte mit ${state.filtered.length} gefilterten Einträgen</text>
  `;

  svg.querySelectorAll(".city-group").forEach((group) => {
    group.addEventListener("click", () => selectCity(group.dataset.city));
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") selectCity(group.dataset.city);
    });
    group.addEventListener("pointermove", (event) => showTooltip(event, group.dataset.city));
    group.addEventListener("pointerenter", () => {
      state.hoveredCityKey = group.dataset.city;
      renderDetail();
    });
    group.addEventListener("pointerleave", hideTooltip);
  });
  bindMapNavigation();
};

const showTooltip = (event, cityKey) => {
  const city = cityByKey(cityKey);
  const count = agenciesByCity().get(cityKey)?.length || 0;
  els.tooltip.hidden = false;
  els.tooltip.innerHTML = `<strong>${html(city.label)}</strong>${count} gefilterte Einträge`;
  els.tooltip.style.left = `${event.clientX + 14}px`;
  els.tooltip.style.top = `${event.clientY + 14}px`;
};

const hideTooltip = () => {
  els.tooltip.hidden = true;
  state.hoveredCityKey = null;
  renderDetail();
};

const selectAgency = (id) => {
  const agency = state.agencies.find((item) => item.id === id);
  state.selectedId = id;
  state.selectedCityKey = agency?.cityKeys.find((key) => Number.isFinite(cityByKey(key).lat)) || agency?.cityKeys[0] || state.selectedCityKey;
  renderMap();
  renderDetail();
};

const selectCity = (cityKey) => {
  state.selectedCityKey = cityKey;
  state.selectedId = null;
  renderMap();
  renderDetail();
};

const zoomMap = (factor) => {
  state.map.scale = Math.max(0.8, Math.min(7, state.map.scale * factor));
  renderMap();
  renderDetail();
};

const resetMap = () => {
  state.map = { scale: 1, tx: 0, ty: 0 };
  renderMap();
  renderDetail();
};

const bindMapNavigation = () => {
  const svg = els.landscapeSvg;
  svg.onwheel = (event) => {
    event.preventDefault();
    zoomMap(event.deltaY < 0 ? 1.12 : 0.88);
  };
  svg.onpointerdown = (event) => {
    svg.setPointerCapture(event.pointerId);
    state.drag = { x: event.clientX, y: event.clientY, tx: state.map.tx, ty: state.map.ty };
  };
  svg.onpointermove = (event) => {
    if (!state.drag) return;
    state.map.tx = state.drag.tx + event.clientX - state.drag.x;
    state.map.ty = state.drag.ty + event.clientY - state.drag.y;
    const world = svg.querySelector("#mapWorld");
    if (world) world.setAttribute("transform", `translate(${state.map.tx} ${state.map.ty}) scale(${state.map.scale})`);
  };
  svg.onpointerup = () => {
    state.drag = null;
  };
  svg.onpointercancel = () => {
    state.drag = null;
  };
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
  const groups = agenciesByCity();
  const cityKey = state.hoveredCityKey || state.selectedCityKey || [...groups.keys()][0];
  const city = cityByKey(cityKey);
  const agencies = groups.get(cityKey) || [];
  if (!cityKey || agencies.length === 0) {
    els.detailPanel.innerHTML = `<p class="empty-detail">Keine Agentur passt zu den aktuellen Filtern oder Orten.</p>`;
    return;
  }
  els.detailPanel.innerHTML = `
    <h2>${html(city.label)}</h2>
    <p class="city-count">${agencies.length} Agentur${agencies.length === 1 ? "" : "en"} mit den aktuellen Filtern</p>
    <div class="city-list">
      ${agencies.map((agency) => `
        <article class="city-agency">
          <h3>${html(agency.name)}</h3>
          <p class="domain">${html(agency.domain || "Keine verifizierte Domain")}</p>
          <div class="tags">${agency.capabilities.slice(0, 6).map((tag) => `<span class="tag">${html(tag)}</span>`).join("")}</div>
          <p>${html(agency.profile)}</p>
          <div class="meta compact-meta">
            <div><strong>Ort</strong>${html(agency.location || "Unklar")}</div>
            <div><strong>Sicherheit</strong><span class="confidence ${html(agency.confidence)}">${html(agency.confidence)}</span></div>
          </div>
          <div class="detail-actions">
            ${agencyLink(agency) ? `<a href="${html(agencyLink(agency))}" target="_blank" rel="noreferrer">Quelle öffnen</a>` : ""}
            <button type="button" data-shortlist="${agency.id}">${shortlistButtonLabel(agency.id)}</button>
          </div>
        </article>
      `).join("")}
    </div>
  `;
  els.detailPanel.querySelectorAll("[data-shortlist]").forEach((buttonEl) => {
    buttonEl.addEventListener("click", () => toggleShortlist(Number(buttonEl.dataset.shortlist)));
  });
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
  els.zoomIn.addEventListener("click", () => zoomMap(1.2));
  els.zoomOut.addEventListener("click", () => zoomMap(0.82));
  els.resetMap.addEventListener("click", resetMap);
  els.copyShortlist.addEventListener("click", copyShortlist);
};

init();
