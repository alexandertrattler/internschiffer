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

const countryDefs = [
  ["de", "Deutschland"],
  ["uk", "Vereinigtes Königreich"],
  ["nl", "Niederlande"],
  ["at", "Österreich"],
  ["ch", "Schweiz"],
  ["fr", "Frankreich"],
  ["dk", "Dänemark"],
  ["it", "Italien"],
  ["us", "USA"],
  ["ca", "Kanada"],
  ["br", "Brasilien"],
  ["au", "Australien"],
  ["cn", "China"],
  ["global", "Global/Remote"],
  ["unknown", "Unklar"]
].map(([key, label]) => ({ key, label }));

const cityCountry = {
  berlin: "de", hamburg: "de", koeln: "de", stuttgart: "de", muenchen: "de",
  frankfurt: "de", bielefeld: "de", duesseldorf: "de", bremen: "de", osnabrueck: "de",
  essen: "de", dortmund: "de", hannover: "de", heidelberg: "de", krefeld: "de",
  erlangen: "de", rheine: "de", potsdam: "de", muenster: "de", dresden: "de",
  linz: "at", wien: "at", basel: "ch", genf: "ch",
  amsterdam: "nl", denhaag: "nl", kopenhagen: "dk", london: "uk", glasgow: "uk",
  lyon: "fr", mailand: "it", toronto: "ca", saopaulo: "br",
  losangeles: "us", newyork: "us", santafe: "us", lasvegas: "us", denver: "us",
  grapevine: "us", houston: "us", sydney: "au",
  global: "global", unknown: "unknown"
};

const state = {
  agencies: [],
  filtered: [],
  query: "",
  capabilityFilters: new Set(),
  countryFilters: new Set(),
  cityFilters: new Set(),
  sortMode: "name",
  shortlistOnly: false,
  shortlist: new Set(JSON.parse(localStorage.getItem("agencyShortlist") || "[]"))
};

const els = {
  appShell: document.querySelector(".app-shell"),
  searchInput: document.querySelector("#searchInput"),
  capabilityFilters: document.querySelector("#capabilityFilters"),
  countryFilters: document.querySelector("#countryFilters"),
  cityFilters: document.querySelector("#cityFilters"),
  shortlistFilter: document.querySelector("#shortlistFilter"),
  shortlistFilterCount: document.querySelector("#shortlistFilterCount"),
  sortOptions: document.querySelectorAll("[data-sort]"),
  filterResizeHandle: document.querySelector("#filterResizeHandle"),
  resetFilters: document.querySelector("#resetFilters"),
  cardsGrid: document.querySelector("#cardsGrid"),
  emptyState: document.querySelector("#emptyState"),
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
const countryByKey = (key) => countryDefs.find((country) => country.key === key) || countryDefs.at(-1);

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
  const countryKeys = [...new Set(cityKeys.map((key) => cityCountry[key] || "unknown"))];
  const countries = countryKeys.map((key) => countryByKey(key).label);
  return {
    ...agency,
    capabilities,
    cityKeys,
    cities,
    countryKeys,
    countries
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
  el.innerHTML = count === undefined
    ? `<span>${html(label)}</span>`
    : `<span>${html(label)}</span><span class="chip-count">${count}</span>`;
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

const getSearchTokens = () => normalize(state.query).split(/\s+/).filter(Boolean);

const matchesSearch = (agency, tokens = getSearchTokens()) => {
  const text = searchableText(agency);
  return tokens.length === 0 || tokens.every((token) => text.includes(token));
};

const matchesCapabilityFilters = (agency) => state.capabilityFilters.size === 0 ||
  [...state.capabilityFilters].every((capability) => agency.capabilities.includes(capability));

const matchesCountryFilters = (agency) => state.countryFilters.size === 0 ||
  agency.countryKeys.some((key) => state.countryFilters.has(key));

const matchesCityFilters = (agency) => state.cityFilters.size === 0 ||
  agency.cityKeys.some((key) => state.cityFilters.has(key));

const matchesShortlistFilter = (agency) => !state.shortlistOnly || state.shortlist.has(agency.id);

const candidatesForCounts = (skip) => {
  const tokens = getSearchTokens();
  return state.agencies.filter((agency) => {
    if (!matchesSearch(agency, tokens)) return false;
    if (skip !== "capability" && !matchesCapabilityFilters(agency)) return false;
    if (skip !== "country" && !matchesCountryFilters(agency)) return false;
    if (skip !== "city" && !matchesCityFilters(agency)) return false;
    if (!matchesShortlistFilter(agency)) return false;
    return true;
  });
};

const renderFilters = () => {
  const capabilityCounts = countBy(candidatesForCounts("capability"), (agency) => agency.capabilities);
  els.capabilityFilters.replaceChildren(...capabilityDefs.map(([name]) => makeChip(
    name,
    capabilityCounts.get(name) || 0,
    state.capabilityFilters.has(name),
    () => toggleSet(state.capabilityFilters, name)
  )));

  const countryCounts = countBy(candidatesForCounts("country"), (agency) => agency.countryKeys);
  const countryChips = countryDefs
    .map((country) => ({ ...country, count: countryCounts.get(country.key) || 0 }))
    .filter((country) => country.count > 0 || state.countryFilters.has(country.key));
  els.countryFilters.replaceChildren(...countryChips.map((country) => makeChip(
    country.label,
    country.count,
    state.countryFilters.has(country.key),
    () => toggleSet(state.countryFilters, country.key)
  )));

  const cityCounts = countBy(candidatesForCounts("city"), (agency) => agency.cityKeys);
  const cityChips = [...cityCounts.entries()]
    .map(([key, count]) => ({ key, count, label: cityByKey(key).label }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "de"));
  els.cityFilters.replaceChildren(...cityChips.map((city) => makeChip(
    city.label,
    city.count,
    state.cityFilters.has(city.key),
    () => toggleSet(state.cityFilters, city.key)
  )));

  els.shortlistFilter.classList.toggle("active", state.shortlistOnly);
  els.shortlistFilterCount.textContent = state.shortlist.size;
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
  agency.countries.join(" "),
  agency.cities.join(" ")
].join(" "));

const filterAgencies = () => {
  const tokens = getSearchTokens();
  state.filtered = state.agencies.filter((agency) => {
    return matchesSearch(agency, tokens) &&
      matchesCapabilityFilters(agency) &&
      matchesCountryFilters(agency) &&
      matchesCityFilters(agency) &&
      matchesShortlistFilter(agency);
  });
  sortAgencies();
};

const sortAgencies = () => {
  if (state.sortMode !== "name") return;
  state.filtered.sort((a, b) => a.name.localeCompare(b.name, "de", { sensitivity: "base" }));
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
  if (state.shortlistOnly && state.shortlist.size === 0) state.shortlistOnly = false;
  saveShortlist();
  update();
};

const cardTemplate = (agency) => `
  <article class="card">
    <div class="card-topline">
      <span class="city-line">${html(agency.countries.join(", "))} · ${html(agency.cities.join(", "))}</span>
      <button class="star-button ${state.shortlist.has(agency.id) ? "active" : ""}" type="button" data-shortlist="${agency.id}" aria-label="${state.shortlist.has(agency.id) ? "Von Shortlist entfernen" : "Zur Shortlist hinzufügen"}">${state.shortlist.has(agency.id) ? "★" : "☆"}</button>
    </div>
    <h3>${html(agency.name)}</h3>
    <p class="domain">${html(agency.domain || "Keine verifizierte Domain")}</p>
    <div class="tags">${agency.capabilities.slice(0, 6).map((tag) => `<button class="tag ${state.capabilityFilters.has(tag) ? "active" : ""}" type="button" data-capability="${html(tag)}" aria-pressed="${state.capabilityFilters.has(tag)}">${html(tag)}</button>`).join("")}</div>
    <p>${html(agency.profile)}</p>
    <div class="card-footer">
      ${agencyLink(agency) ? `<a href="${html(agencyLink(agency))}" target="_blank" rel="noopener noreferrer">Quelle öffnen</a>` : "<span></span>"}
    </div>
  </article>
`;

const renderCards = () => {
  els.cardsGrid.innerHTML = state.filtered.map(cardTemplate).join("");
  els.emptyState.hidden = state.filtered.length !== 0;
};

const toggleShortlistFilter = () => {
  state.shortlistOnly = !state.shortlistOnly;
  update();
};

const setupResizableFilters = () => {
  const savedWidth = Number(localStorage.getItem("agencyFilterWidth"));
  if (savedWidth) els.appShell.style.setProperty("--filter-width", `${savedWidth}px`);

  let startX = 0;
  let startWidth = 0;
  const stopResize = () => document.body.classList.remove("resizing");

  els.filterResizeHandle.addEventListener("pointerdown", (event) => {
    startX = event.clientX;
    startWidth = parseFloat(getComputedStyle(els.appShell).getPropertyValue("--filter-width"));
    els.filterResizeHandle.setPointerCapture(event.pointerId);
    document.body.classList.add("resizing");
  });

  els.filterResizeHandle.addEventListener("pointermove", (event) => {
    if (!document.body.classList.contains("resizing")) return;
    const width = Math.max(220, Math.min(520, startWidth + event.clientX - startX));
    els.appShell.style.setProperty("--filter-width", `${width}px`);
    localStorage.setItem("agencyFilterWidth", String(Math.round(width)));
  });

  els.filterResizeHandle.addEventListener("pointerup", stopResize);
  els.filterResizeHandle.addEventListener("pointercancel", stopResize);
};

const setupReleaseGlow = () => {
  const glowSelector = ".tag, .chip, .sort-option, .ghost-button, .card-footer a, .star-button";
  const triggerGlow = (target) => {
    if (!target || target.disabled) return;
    target.classList.remove("release-glow");
    void target.offsetWidth;
    target.classList.add("release-glow");
  };

  document.addEventListener("pointerup", (event) => {
    triggerGlow(event.target?.closest?.(glowSelector));
  });
  document.addEventListener("pointerleave", (event) => {
    triggerGlow(event.target?.closest?.(glowSelector));
  }, true);
  document.addEventListener("animationend", (event) => {
    if (event.animationName === "releaseGlow") event.target.classList.remove("release-glow");
  });
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
    state.countryFilters.clear();
    state.cityFilters.clear();
    state.shortlistOnly = false;
    state.shortlist.clear();
    els.searchInput.value = "";
    saveShortlist();
    update();
  });
  els.shortlistFilter.addEventListener("click", toggleShortlistFilter);
  els.cardsGrid.addEventListener("click", (event) => {
    const shortlistButton = event.target.closest("[data-shortlist]");
    if (shortlistButton) {
      toggleShortlist(Number(shortlistButton.dataset.shortlist));
      return;
    }

    const capabilityButton = event.target.closest("[data-capability]");
    if (capabilityButton) {
      toggleSet(state.capabilityFilters, capabilityButton.dataset.capability);
    }
  });
  els.sortOptions.forEach((buttonEl) => {
    buttonEl.addEventListener("click", () => {
      state.sortMode = buttonEl.dataset.sort;
      els.sortOptions.forEach((option) => option.classList.toggle("active", option === buttonEl));
      update();
    });
  });
  setupResizableFilters();
  setupReleaseGlow();
};

init();
