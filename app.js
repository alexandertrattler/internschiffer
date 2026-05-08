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

const cityDefs = [
  ["berlin", "Berlin", ["berlin"]],
  ["hamburg", "Hamburg", ["hamburg", "hamburg/deutschland"]],
  ["koeln", "Köln", ["köln", "koeln", "koln", "cologne", "hürth"]],
  ["stuttgart", "Stuttgart", ["stuttgart"]],
  ["muenchen", "München", ["münchen", "muenchen", "munich"]],
  ["frankfurt", "Frankfurt am Main", ["frankfurt"]],
  ["bielefeld", "Bielefeld", ["bielefeld", "ostwestfalen"]],
  ["duesseldorf", "Düsseldorf", ["düsseldorf", "duesseldorf", "dusseldorf"]],
  ["bremen", "Bremen", ["bremen"]],
  ["osnabrueck", "Osnabrück", ["osnabrück", "osnabrueck"]],
  ["essen", "Essen", ["essen"]],
  ["dortmund", "Dortmund", ["dortmund"]],
  ["hannover", "Hannover", ["hannover"]],
  ["heidelberg", "Heidelberg", ["heidelberg"]],
  ["krefeld", "Krefeld", ["krefeld"]],
  ["erlangen", "Erlangen", ["erlangen"]],
  ["rheine", "Rheine", ["rheine"]],
  ["potsdam", "Potsdam", ["potsdam"]],
  ["muenster", "Münster", ["münster", "muenster"]],
  ["dresden", "Dresden", ["dresden"]],
  ["linz", "Linz", ["linz"]],
  ["wien", "Wien", ["wien", "vienna"]],
  ["basel", "Basel/Münchenstein", ["basel", "münchenstein", "muenchenstein"]],
  ["genf", "Genf/Versoix", ["genf", "geneva", "versoix"]],
  ["amsterdam", "Amsterdam", ["amsterdam"]],
  ["denhaag", "Den Haag", ["den haag", "the hague"]],
  ["kopenhagen", "Kopenhagen", ["kopenhagen", "copenhagen"]],
  ["london", "London", ["london"]],
  ["glasgow", "Glasgow", ["glasgow"]],
  ["lyon", "Lyon", ["lyon"]],
  ["mailand", "Mailand", ["mailand", "milan", "milano"]],
  ["toronto", "Toronto", ["toronto"]],
  ["saopaulo", "São Paulo", ["sao paulo", "são paulo"]],
  ["losangeles", "Los Angeles", ["los angeles"]],
  ["newyork", "New York", ["new york", "brooklyn"]],
  ["sydney", "Sydney", ["sydney", "paddington"]],
  ["santafe", "Santa Fe", ["santa fe"]],
  ["lasvegas", "Las Vegas", ["las vegas"]],
  ["denver", "Denver", ["denver"]],
  ["grapevine", "Grapevine", ["grapevine"]],
  ["houston", "Houston", ["houston"]],
  ["global", "Global/Remote", ["global", "remote", "international"]],
  ["unknown", "Ort unklar", [""]]
].map(([key, label, aliases]) => ({ key, label, aliases }));

const state = {
  agencies: [],
  filtered: [],
  query: "",
  capabilityFilters: new Set(),
  cityFilters: new Set(),
  shortlist: new Set(JSON.parse(localStorage.getItem("agencyShortlist") || "[]"))
};

const els = {
  searchInput: document.querySelector("#searchInput"),
  capabilityFilters: document.querySelector("#capabilityFilters"),
  cityFilters: document.querySelector("#cityFilters"),
  resetFilters: document.querySelector("#resetFilters"),
  cardsGrid: document.querySelector("#cardsGrid"),
  emptyState: document.querySelector("#emptyState"),
  copyShortlist: document.querySelector("#copyShortlist"),
  statTotal: document.querySelector("#statTotal"),
  statShown: document.querySelector("#statShown"),
  statShortlist: document.querySelector("#statShortlist")
};

const normalize = (value) => String(value || "")
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replaceAll("ß", "ss")
  .replaceAll("ä", "ae")
  .replaceAll("ö", "oe")
  .replaceAll("ü", "ue");

const cityByKey = (key) => cityDefs.find((city) => city.key === key) || cityDefs.at(-1);

const html = (value) => String(value || "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#039;"
}[char]));

const cityKeysForLocation = (location) => {
  const text = normalize(location);
  const keys = cityDefs
    .filter((city) => city.key !== "unknown" && city.aliases.some((alias) => text.includes(normalize(alias))))
    .map((city) => city.key);
  if (keys.length) return [...new Set(keys)];
  if (text.includes("global") || text.includes("remote") || text.includes("international")) return ["global"];
  return ["unknown"];
};

const enrichAgency = (agency) => {
  const haystack = normalize(`${agency.name} ${agency.location} ${agency.profile}`);
  const capabilities = capabilityDefs
    .filter(([, keywords]) => keywords.some((keyword) => haystack.includes(normalize(keyword))))
    .map(([name]) => name);
  const cityKeys = cityKeysForLocation(agency.location);
  const cities = cityKeys.map((key) => cityByKey(key).label);
  return {
    ...agency,
    capabilities,
    cityKeys,
    cities
  };
};

const saveShortlist = () => {
  localStorage.setItem("agencyShortlist", JSON.stringify([...state.shortlist]));
  els.statShortlist.textContent = state.shortlist.size;
};

const makeChip = (label, count, active, onClick) => {
  const el = document.createElement("button");
  el.className = `chip${active ? " active" : ""}`;
  el.type = "button";
  el.textContent = count === undefined ? label : `${label} ${count}`;
  el.addEventListener("click", onClick);
  return el;
};

const countBy = (items, getKeys) => {
  const counts = new Map();
  items.forEach((item) => {
    getKeys(item).forEach((key) => counts.set(key, (counts.get(key) || 0) + 1));
  });
  return counts;
};

const renderFilters = () => {
  const capabilityCounts = countBy(state.agencies, (agency) => agency.capabilities);
  els.capabilityFilters.replaceChildren(...capabilityDefs.map(([name]) => makeChip(
    name,
    capabilityCounts.get(name) || 0,
    state.capabilityFilters.has(name),
    () => toggleSet(state.capabilityFilters, name)
  )));

  const cityCounts = countBy(state.agencies, (agency) => agency.cityKeys);
  const cityChips = [...cityCounts.entries()]
    .map(([key, count]) => ({ key, count, label: cityByKey(key).label }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "de"));
  els.cityFilters.replaceChildren(...cityChips.map((city) => makeChip(
    city.label,
    city.count,
    state.cityFilters.has(city.key),
    () => toggleSet(state.cityFilters, city.key)
  )));
};

const toggleSet = (set, value) => {
  if (set.has(value)) set.delete(value);
  else set.add(value);
  update();
};

const searchableText = (agency) => normalize([
  agency.name,
  agency.domain,
  agency.location,
  agency.profile,
  agency.sourceUrl,
  agency.confidence,
  agency.capabilities.join(" "),
  agency.cities.join(" ")
].join(" "));

const filterAgencies = () => {
  const tokens = normalize(state.query).split(/\s+/).filter(Boolean);
  state.filtered = state.agencies.filter((agency) => {
    const text = searchableText(agency);
    const matchesSearch = tokens.length === 0 || tokens.every((token) => text.includes(token));
    const matchesCapabilities = state.capabilityFilters.size === 0 ||
      [...state.capabilityFilters].every((capability) => agency.capabilities.includes(capability));
    const matchesCities = state.cityFilters.size === 0 ||
      agency.cityKeys.some((key) => state.cityFilters.has(key));
    return matchesSearch && matchesCapabilities && matchesCities;
  });
};

const agencyLink = (agency) => {
  if (agency.sourceUrl) return agency.sourceUrl;
  if (agency.domain) return `https://${agency.domain.split(";")[0].trim()}`;
  return "";
};

const shortlistButtonLabel = (id) => state.shortlist.has(id) ? "Entfernen" : "Shortlist";

const toggleShortlist = (id) => {
  if (state.shortlist.has(id)) state.shortlist.delete(id);
  else state.shortlist.add(id);
  saveShortlist();
  renderCards();
};

const cardTemplate = (agency) => `
  <article class="card">
    <div class="card-topline">
      <span class="confidence ${html(agency.confidence)}">${html(agency.confidence)}</span>
      <span class="city-line">${html(agency.cities.join(", "))}</span>
    </div>
    <h3>${html(agency.name)}</h3>
    <p class="domain">${html(agency.domain || "Keine verifizierte Domain")}</p>
    <div class="tags">${agency.capabilities.slice(0, 6).map((tag) => `<span class="tag">${html(tag)}</span>`).join("")}</div>
    <p>${html(agency.profile)}</p>
    <div class="card-footer">
      ${agencyLink(agency) ? `<a href="${html(agencyLink(agency))}" target="_blank" rel="noreferrer">Quelle öffnen</a>` : "<span></span>"}
      <button type="button" data-shortlist="${agency.id}">${shortlistButtonLabel(agency.id)}</button>
    </div>
  </article>
`;

const renderCards = () => {
  els.cardsGrid.innerHTML = state.filtered.map(cardTemplate).join("");
  els.emptyState.hidden = state.filtered.length !== 0;
  els.cardsGrid.querySelectorAll("[data-shortlist]").forEach((buttonEl) => {
    buttonEl.addEventListener("click", () => toggleShortlist(Number(buttonEl.dataset.shortlist)));
  });
};

const copyShortlist = async () => {
  const text = state.agencies
    .filter((agency) => state.shortlist.has(agency.id))
    .map((agency) => `${agency.name} - ${agency.domain || "keine Domain"}\n${agency.cities.join(", ")}\n${agency.profile}\n${agency.sourceUrl}`)
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
    els.copyShortlist.textContent = "Shortlist kopieren";
  }, 1200);
};

const update = () => {
  filterAgencies();
  els.statShown.textContent = state.filtered.length;
  renderFilters();
  renderCards();
};

const init = () => {
  state.agencies = (window.AGENCIES || []).map(enrichAgency);
  state.filtered = state.agencies;
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
    state.cityFilters.clear();
    els.searchInput.value = "";
    update();
  });
  els.copyShortlist.addEventListener("click", copyShortlist);
};

init();
