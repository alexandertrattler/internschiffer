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

const ethicsCategory = "Ethik/Gendergerechtigkeit";


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
  ["augsburg", "Augsburg", ["augsburg"]],
  ["leipzig", "Leipzig", ["leipzig"]],
  ["mannheim", "Mannheim", ["mannheim"]],
  ["mainleus", "Mainleus", ["mainleus"]],
  ["buende", "Bünde", ["bünde", "buende"]],
  ["essen", "Essen", ["essen"]],
  ["dortmund", "Dortmund", ["dortmund"]],
  ["muelheim", "Mülheim an der Ruhr", ["mülheim", "muelheim", "mülheim an der ruhr", "muelheim an der ruhr"]],
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
  ["enschede", "Enschede", ["enschede"]],
  ["kopenhagen", "Kopenhagen", ["kopenhagen", "copenhagen"]],
  ["barcelona", "Barcelona", ["barcelona"]],
  ["london", "London", ["london"]],
  ["glasgow", "Glasgow", ["glasgow"]],
  ["lyon", "Lyon", ["lyon"]],
  ["mailand", "Mailand", ["mailand", "milan", "milano"]],
  ["toronto", "Toronto", ["toronto"]],
  ["saopaulo", "São Paulo", ["sao paulo", "são paulo"]],
  ["tokyo", "Tokio", ["tokio", "tokyo"]],
  ["losangeles", "Los Angeles", ["los angeles"]],
  ["newyork", "New York", ["new york", "brooklyn"]],
  ["sydney", "Sydney", ["sydney", "paddington"]],
  ["santafe", "Santa Fe", ["santa fe"]],
  ["lasvegas", "Las Vegas", ["las vegas"]],
  ["denver", "Denver", ["denver"]],
  ["grapevine", "Grapevine", ["grapevine"]],
  ["houston", "Houston", ["houston"]],
  ["werther", "Werther", ["werther"]],
  ["lage", "Lage", ["lage, "]],
  ["guetersloh", "Gütersloh", ["gütersloh", "guetersloh"]],
  ["offenbach", "Offenbach am Main", ["offenbach"]],
  ["aachen", "Aachen", ["aachen"]],
  ["wiesbaden", "Wiesbaden", ["wiesbaden"]],
  ["ueberlingen", "Überlingen", ["überlingen", "ueberlingen"]],
  ["bochum", "Bochum", ["bochum"]],
  ["mainz", "Mainz", ["mainz"]],
  ["braunschweig", "Braunschweig", ["braunschweig"]],
  ["zuerich", "Zürich", ["zürich", "zuerich", "zurich"]],
  ["stockholm", "Stockholm", ["stockholm"]],
  ["oslo", "Oslo", ["oslo"]],
  ["helsinki", "Helsinki", ["helsinki"]],
  ["rotterdam", "Rotterdam", ["rotterdam"]],
  ["madrid", "Madrid", ["madrid"]],
  ["lissabon", "Lissabon", ["lissabon", "lisbon"]],
  ["sanfrancisco", "San Francisco", ["san francisco"]],
  ["queenstown", "Queenstown", ["queenstown"]],
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
  ["es", "Spanien"],
  ["it", "Italien"],
  ["us", "USA"],
  ["ca", "Kanada"],
  ["br", "Brasilien"],
  ["au", "Australien"],
  ["jp", "Japan"],
  ["se", "Schweden"],
  ["no", "Norwegen"],
  ["fi", "Finnland"],
  ["pt", "Portugal"],
  ["nz", "Neuseeland"],
  ["cn", "China"],
  ["global", "Global/Remote"],
  ["unknown", "Unklar"]
].map(([key, label]) => ({ key, label }));

const cityCountry = {
  berlin: "de", hamburg: "de", koeln: "de", stuttgart: "de", muenchen: "de",
  frankfurt: "de", bielefeld: "de", duesseldorf: "de", bremen: "de", osnabrueck: "de",
  essen: "de", dortmund: "de", hannover: "de", heidelberg: "de", krefeld: "de",
  erlangen: "de", rheine: "de", potsdam: "de", muenster: "de", dresden: "de",
  augsburg: "de", leipzig: "de", mannheim: "de", mainleus: "de", buende: "de",
  muelheim: "de",
  linz: "at", wien: "at", basel: "ch", genf: "ch",
  amsterdam: "nl", denhaag: "nl", enschede: "nl", kopenhagen: "dk", barcelona: "es", london: "uk", glasgow: "uk",
  lyon: "fr", mailand: "it", toronto: "ca", saopaulo: "br",
  tokyo: "jp",
  losangeles: "us", newyork: "us", santafe: "us", lasvegas: "us", denver: "us",
  grapevine: "us", houston: "us", sydney: "au",
  werther: "de", lage: "de", guetersloh: "de", offenbach: "de", aachen: "de",
  wiesbaden: "de", ueberlingen: "de", bochum: "de", mainz: "de", braunschweig: "de",
  zuerich: "ch", stockholm: "se", oslo: "no", helsinki: "fi", rotterdam: "nl",
  madrid: "es", lissabon: "pt", sanfrancisco: "us", queenstown: "nz",
  global: "global", unknown: "unknown"
};

const blockedPreviewIds = new Set([
  5, 7, 11, 22, 23, 26, 28, 30, 31, 33, 36, 38, 39, 45, 46, 51, 52, 56,
  69, 73, 84, 86, 87, 89, 91, 92, 98
]);

const backendUrl = "http://127.0.0.1:8787";

const state = {
  agencies: [],
  filtered: [],
  previews: new Map(),
  query: "",
  capabilityFilters: new Set(),
  countryFilters: new Set(),
  cityFilters: new Set(),
  expandedCountries: new Set(),
  sortMode: "name",
  expandedAgencyId: null,
  ethicsOnly: false,
  shortlistOnly: false,
  shortlist: new Set(JSON.parse(localStorage.getItem("agencyShortlist") || "[]"))
};

const drawerDrag = {
  pointerId: null,
  startY: 0,
  startTranslate: 0,
  closedTranslate: 0,
  hasMoved: false
};

const els = {
  filters: document.querySelector(".filters"),
  appShell: document.querySelector(".app-shell"),
  searchInput: document.querySelector("#searchInput"),
  capabilityFilters: document.querySelector("#capabilityFilters"),
  locationFilters: document.querySelector("#locationFilters"),
  shortlistFilter: document.querySelector("#shortlistFilter"),
  shortlistFilterCount: document.querySelector("#shortlistFilterCount"),
  uploadDataButton: document.querySelector("#uploadDataButton"),
  uploadDataInput: document.querySelector("#uploadDataInput"),
  uploadDataStatus: document.querySelector("#uploadDataStatus"),
  ethicsFilter: document.querySelector("#ethicsFilter"),
  mobileEthicsFilter: document.querySelector("#mobileEthicsFilter"),
  openFilters: document.querySelector("#openFilters"),
  peekFilters: document.querySelector("#peekFilters"),
  filterScrim: document.querySelector("#filterScrim"),
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

const setMobileFiltersOpen = (isOpen) => {
  const open = Boolean(isOpen);
  els.filters.classList.remove("dragging");
  els.filters.style.transform = "";
  els.filterScrim.style.opacity = "";
  els.filterScrim.style.pointerEvents = "";
  document.body.classList.toggle("filters-open", open);
  els.openFilters.setAttribute("aria-expanded", String(open));
  els.peekFilters.setAttribute("aria-expanded", String(open));
  els.peekFilters.textContent = open ? "Close Filter" : "Open Filter";
  els.filterScrim.hidden = !open;
};

const isMobileFiltersLayout = () => window.matchMedia("(max-width: 980px)").matches;

const getClosedDrawerTranslate = () => Math.max(0, els.filters.getBoundingClientRect().height - 34);

const setDrawerDragTranslate = (translateY) => {
  const progress = drawerDrag.closedTranslate
    ? Math.max(0, Math.min(1, 1 - (translateY / drawerDrag.closedTranslate)))
    : 0;
  els.filters.style.transform = `translateY(${translateY}px)`;
  els.filterScrim.hidden = false;
  els.filterScrim.style.opacity = String(progress);
  els.filterScrim.style.pointerEvents = progress > 0.05 ? "auto" : "none";
};

const startDrawerDrag = (event) => {
  if (!isMobileFiltersLayout() || event.pointerType === "mouse") return;
  drawerDrag.pointerId = event.pointerId;
  drawerDrag.startY = event.clientY;
  drawerDrag.closedTranslate = getClosedDrawerTranslate();
  drawerDrag.startTranslate = document.body.classList.contains("filters-open")
    ? 0
    : drawerDrag.closedTranslate;
  drawerDrag.hasMoved = false;
  els.filters.classList.add("dragging");
  els.peekFilters.setPointerCapture(event.pointerId);
};

const moveDrawerDrag = (event) => {
  if (drawerDrag.pointerId !== event.pointerId) return;
  const deltaY = event.clientY - drawerDrag.startY;
  if (Math.abs(deltaY) > 4) drawerDrag.hasMoved = true;
  if (!drawerDrag.hasMoved) return;
  event.preventDefault();
  const nextTranslate = Math.max(0, Math.min(
    drawerDrag.closedTranslate,
    drawerDrag.startTranslate + deltaY
  ));
  setDrawerDragTranslate(nextTranslate);
};

const endDrawerDrag = (event) => {
  if (drawerDrag.pointerId !== event.pointerId) return;
  const deltaY = event.clientY - drawerDrag.startY;
  const currentTranslate = Math.max(0, Math.min(
    drawerDrag.closedTranslate,
    drawerDrag.startTranslate + deltaY
  ));
  const shouldOpen = drawerDrag.hasMoved
    ? currentTranslate < drawerDrag.closedTranslate * 0.62
    : document.body.classList.contains("filters-open");

  if (els.peekFilters.hasPointerCapture(event.pointerId)) {
    els.peekFilters.releasePointerCapture(event.pointerId);
  }

  drawerDrag.pointerId = null;
  if (drawerDrag.hasMoved) {
    event.preventDefault();
    setMobileFiltersOpen(shouldOpen);
  } else {
    els.filters.classList.remove("dragging");
  }
};

const setUploadStatus = (message, tone = "") => {
  els.uploadDataStatus.textContent = message;
  els.uploadDataStatus.dataset.tone = tone;
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

const makeCountryGroup = (country) => {
  const group = document.createElement("div");
  group.className = "location-group";
  const head = document.createElement("div");
  head.className = "location-group-head";
  head.append(makeChip(
    country.label,
    country.count,
    state.countryFilters.has(country.key),
    () => toggleSet(state.countryFilters, country.key)
  ));
  const cities = country.cities.filter((city) => city.label !== country.label);
  group.append(head);
  if (!cities.length) return group;

  const hasActiveCity = cities.some((city) => state.cityFilters.has(city.key));
  const expanded = state.expandedCountries.has(country.key) || hasActiveCity;
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "location-toggle";
  toggle.setAttribute("aria-expanded", String(expanded));
  const cityWord = cities.length === 1 ? "Stadt" : "Städte";
  toggle.textContent = `${cities.length} ${cityWord} ${expanded ? "▴" : "▾"}`;
  toggle.addEventListener("click", () => {
    if (state.expandedCountries.has(country.key)) state.expandedCountries.delete(country.key);
    else state.expandedCountries.add(country.key);
    renderFilters();
  });
  head.append(toggle);

  if (expanded) {
    const list = document.createElement("div");
    list.className = "chip-grid location-cities";
    list.append(...withFilterSeparators(cities.map((city) => makeChip(
      city.label,
      city.count,
      state.cityFilters.has(city.key),
      () => toggleSet(state.cityFilters, city.key)
    ))));
    group.append(list);
  }
  return group;
};

const makeFilterSeparator = () => {
  const separator = document.createElement("span");
  separator.className = "filter-separator";
  separator.setAttribute("aria-hidden", "true");
  separator.textContent = "•";
  return separator;
};

const withFilterSeparators = (chips) => chips.flatMap((chip, index) => (
  index === chips.length - 1 ? [chip] : [chip, makeFilterSeparator()]
));

const countBy = (items, getKeys) => {
  const counts = new Map();
  items.forEach((item) => {
    getKeys(item).forEach((key) => counts.set(key, (counts.get(key) || 0) + 1));
  });
  return counts;
};

const alphaSort = (a, b) => a.label.localeCompare(b.label, "de", { sensitivity: "base" });

const getSearchTokens = () => normalize(state.query).split(/\s+/).filter(Boolean);
const isMissingValue = (value) => normalize(value) === "missing";

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

const matchesEthicsFilter = (agency) => {
  if (!state.ethicsOnly) return true;
  return (agency.categories || []).includes(ethicsCategory);
};

const matchesShortlistFilter = (agency) => !state.shortlistOnly || state.shortlist.has(agency.id);

const candidatesForCounts = (skip) => {
  const tokens = getSearchTokens();
  return state.agencies.filter((agency) => {
    if (!matchesSearch(agency, tokens)) return false;
    if (skip !== "capability" && !matchesCapabilityFilters(agency)) return false;
    if (skip !== "country" && !matchesCountryFilters(agency)) return false;
    if (skip !== "city" && !matchesCityFilters(agency)) return false;
    if (!matchesEthicsFilter(agency)) return false;
    if (!matchesShortlistFilter(agency)) return false;
    return true;
  });
};

const renderFilters = () => {
  const capabilityCounts = countBy(candidatesForCounts("capability"), (agency) => agency.capabilities);
  const capabilityChips = capabilityDefs
    .map(([name]) => ({ label: name, count: capabilityCounts.get(name) || 0 }))
    .sort(alphaSort);
  els.capabilityFilters.replaceChildren(...withFilterSeparators(capabilityChips.map((capability) => makeChip(
    capability.label,
    capability.count,
    state.capabilityFilters.has(capability.label),
    () => toggleSet(state.capabilityFilters, capability.label)
  ))));

  const countryCounts = countBy(candidatesForCounts("country"), (agency) => agency.countryKeys);
  const cityCounts = countBy(candidatesForCounts("city"), (agency) => agency.cityKeys);
  const citiesByCountry = new Map();
  cityCounts.forEach((count, key) => {
    const countryKey = cityCountry[key] || "unknown";
    if (!citiesByCountry.has(countryKey)) citiesByCountry.set(countryKey, []);
    citiesByCountry.get(countryKey).push({ key, count, label: cityByKey(key).label });
  });
  const pinnedLast = new Set(["global", "unknown"]);
  const countryGroups = countryDefs
    .map((country) => ({
      ...country,
      count: countryCounts.get(country.key) || 0,
      cities: (citiesByCountry.get(country.key) || []).sort(alphaSort)
    }))
    .filter((country) => country.count > 0 || state.countryFilters.has(country.key) ||
      country.cities.some((city) => state.cityFilters.has(city.key)))
    .sort((a, b) => (pinnedLast.has(a.key) - pinnedLast.has(b.key)) || (b.count - a.count) || alphaSort(a, b));
  els.locationFilters.replaceChildren(...countryGroups.map(makeCountryGroup));

  els.shortlistFilter.classList.toggle("active", state.shortlistOnly);
  els.ethicsFilter.classList.toggle("active", state.ethicsOnly);
  els.mobileEthicsFilter.classList.toggle("active", state.ethicsOnly);
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
  (agency.categories || []).join(" "),
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
      matchesEthicsFilter(agency) &&
      matchesShortlistFilter(agency);
  });
  sortAgencies();
};

const sortAgencies = () => {
  if (state.sortMode !== "name") return;
  state.filtered.sort((a, b) => a.name.localeCompare(b.name, "de", { sensitivity: "base" }));
};

const agencyLink = (agency) => {
  if (agency.sourceUrl && !isMissingValue(agency.sourceUrl)) return agency.sourceUrl;
  if (agency.domain && !isMissingValue(agency.domain)) return `https://${agency.domain.split(";")[0].trim()}`;
  return "";
};

const agencyPreviewImage = (agency) => state.previews.get(agency.id) || "";

const loadPreviewManifest = async () => {
  try {
    const response = await fetch("previews/preview-manifest.json", { cache: "no-store" });
    if (!response.ok) return;
    const previews = await response.json();
    state.previews = new Map(
      previews
        .filter((preview) => preview.status === "captured" && preview.previewImage)
        .map((preview) => [Number(preview.id), preview.previewImage])
    );
  } catch {
    state.previews = new Map();
  }
};

const shortlistButtonLabel = (id) => state.shortlist.has(id) ? "Entfernen" : "Shortlist";

const toggleShortlist = (id) => {
  if (state.shortlist.has(id)) state.shortlist.delete(id);
  else state.shortlist.add(id);
  if (state.shortlistOnly && state.shortlist.size === 0) state.shortlistOnly = false;
  saveShortlist();
  update();
};

const toggleInfo = (id) => {
  state.expandedAgencyId = state.expandedAgencyId === id ? null : id;
  update();
};

const cardTemplate = (agency) => `
  <article class="card ${state.expandedAgencyId === agency.id ? "expanded" : ""}" data-agency-id="${agency.id}">
    ${state.expandedAgencyId === agency.id && agencyLink(agency) ? `
      <div class="site-preview" data-preview-shell data-agency-preview-id="${agency.id}" data-preview-image="${html(agencyPreviewImage(agency))}" aria-hidden="true">
        <iframe src="${html(agencyLink(agency))}" title="" loading="lazy" referrerpolicy="no-referrer" data-live-preview></iframe>
        ${agencyPreviewImage(agency) ? `<img data-src="${html(agencyPreviewImage(agency))}" alt="" loading="lazy" data-preview-fallback>` : ""}
      </div>
    ` : ""}
    <div class="card-content">
      <div class="card-topline">
        <span class="city-line">${html(agency.countries.join(", "))} · ${html(agency.cities.join(", "))}</span>
        <button class="star-button ${state.shortlist.has(agency.id) ? "active" : ""}" type="button" data-shortlist="${agency.id}" aria-label="${state.shortlist.has(agency.id) ? "Von Shortlist entfernen" : "Zur Shortlist hinzufügen"}">${state.shortlist.has(agency.id) ? "★" : "☆"}</button>
      </div>
      <h3>${html(agency.name)}</h3>
      <p class="domain">${html(agency.domain || "Keine verifizierte Domain")}</p>
      <div class="tags">${agency.capabilities.slice(0, 6).map((tag) => `<button class="tag ${state.capabilityFilters.has(tag) ? "active" : ""}" type="button" data-capability="${html(tag)}" aria-pressed="${state.capabilityFilters.has(tag)}">${html(tag)}</button>`).join("")}</div>
      <p>${html(agency.profile)}</p>
      <div class="card-footer">
        <button class="info-button ${state.expandedAgencyId === agency.id ? "active" : ""}" type="button" data-info="${agency.id}">${state.expandedAgencyId === agency.id ? "Schließen" : "Info"}</button>
        ${agencyLink(agency) ? `<a href="${html(agencyLink(agency))}" target="_blank" rel="noopener noreferrer">Quelle öffnen</a>` : "<span></span>"}
      </div>
      ${state.expandedAgencyId === agency.id ? `<p class="preview-note">Live-Vorschau im Hintergrund. Wenn die Website iframes blockiert, erscheint automatisch der gespeicherte Screenshot.</p>` : ""}
    </div>
  </article>
`;

const renderCards = () => {
  els.cardsGrid.innerHTML = state.filtered.map(cardTemplate).join("");
  els.emptyState.hidden = state.filtered.length !== 0;
  setupPreviewFallbacks();
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
  const glowSelector = ".tag, .chip, .sort-option, .ghost-button, .card-footer a, .info-button, .star-button";
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

const setupPreviewFallbacks = () => {
  document.querySelectorAll("[data-preview-shell]").forEach((shell) => {
    const iframe = shell.querySelector("[data-live-preview]");
    const fallback = shell.querySelector("[data-preview-fallback]");
    if (!iframe) return;

    let settled = false;
    let slowTimer;
    const showFallback = () => {
      if (settled || !fallback) return;
      settled = true;
      window.clearTimeout(slowTimer);
      iframe.setAttribute("aria-hidden", "true");
      fallback.addEventListener("load", () => shell.classList.add("show-fallback"), { once: true });
      if (fallback.complete && fallback.currentSrc) shell.classList.add("show-fallback");
      if (!fallback.getAttribute("src")) fallback.setAttribute("src", fallback.dataset.src);
    };
    const keepLivePreview = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(slowTimer);
      shell.classList.add("show-live");
    };

    if (blockedPreviewIds.has(Number(shell.dataset.agencyPreviewId))) {
      showFallback();
      return;
    }

    iframe.addEventListener("load", keepLivePreview, { once: true });
    iframe.addEventListener("error", showFallback, { once: true });
    slowTimer = window.setTimeout(showFallback, 14000);
  });
};

const update = () => {
  filterAgencies();
  els.statShown.textContent = state.filtered.length;
  renderFilters();
  renderCards();
};

const setAgencyData = (agencies) => {
  state.agencies = agencies.map(enrichAgency);
  state.filtered = state.agencies;
  state.expandedAgencyId = null;
  state.shortlist = new Set([...state.shortlist].filter((id) => state.agencies.some((agency) => agency.id === id)));
  els.statTotal.textContent = state.agencies.length;
  saveShortlist();
  update();
};

const checkUploadBackend = async () => {
  if (!els.uploadDataButton) return;
  try {
    const response = await fetch(`${backendUrl}/api/health`, { cache: "no-store" });
    if (!response.ok) throw new Error("Backend nicht erreichbar");
    els.uploadDataButton.hidden = false;
    setUploadStatus("Backend bereit", "ok");
  } catch {
    els.uploadDataButton.hidden = true;
    setUploadStatus("");
  }
};

const uploadAgencyFile = async (file) => {
  if (!file) return;
  setUploadStatus("Upload läuft...", "busy");
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${backendUrl}/api/upload`, {
      method: "POST",
      body: formData
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Upload fehlgeschlagen");
    setAgencyData(payload.agencies);
    setUploadStatus(`${payload.count} Einträge aktualisiert`, "ok");
  } catch (error) {
    setUploadStatus(error.message || "Upload fehlgeschlagen", "error");
  } finally {
    els.uploadDataInput.value = "";
  }
};

const init = async () => {
  await loadPreviewManifest();
  setAgencyData(window.AGENCIES || []);

  els.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    update();
  });
  els.resetFilters.addEventListener("click", () => {
    state.query = "";
    state.capabilityFilters.clear();
    state.countryFilters.clear();
    state.cityFilters.clear();
    state.ethicsOnly = false;
    state.shortlistOnly = false;
    state.shortlist.clear();
    els.searchInput.value = "";
    saveShortlist();
    update();
  });
  els.uploadDataButton.addEventListener("click", () => els.uploadDataInput.click());
  els.uploadDataInput.addEventListener("change", (event) => uploadAgencyFile(event.target.files?.[0]));
  els.openFilters.addEventListener("click", () => setMobileFiltersOpen(true));
  els.peekFilters.addEventListener("pointerdown", startDrawerDrag);
  els.peekFilters.addEventListener("pointermove", moveDrawerDrag);
  els.peekFilters.addEventListener("pointerup", endDrawerDrag);
  els.peekFilters.addEventListener("pointercancel", endDrawerDrag);
  els.peekFilters.addEventListener("click", () => {
    if (drawerDrag.hasMoved) {
      drawerDrag.hasMoved = false;
      return;
    }
    setMobileFiltersOpen(!document.body.classList.contains("filters-open"));
  });
  els.filterScrim.addEventListener("click", () => setMobileFiltersOpen(false));
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMobileFiltersOpen(false);
  });
  window.matchMedia("(min-width: 981px)").addEventListener("change", (event) => {
    if (event.matches) setMobileFiltersOpen(false);
  });
  els.ethicsFilter.addEventListener("click", () => {
    state.ethicsOnly = !state.ethicsOnly;
    update();
  });
  els.mobileEthicsFilter.addEventListener("click", () => {
    state.ethicsOnly = !state.ethicsOnly;
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
      return;
    }

    const infoButton = event.target.closest("[data-info]");
    if (infoButton) {
      toggleInfo(Number(infoButton.dataset.info));
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
  checkUploadBackend();
};

init();
