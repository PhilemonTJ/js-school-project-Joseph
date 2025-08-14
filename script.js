document.addEventListener("DOMContentLoaded", () => {
  const timeline = document.getElementById("timeline");
  const modal = document.getElementById("modal");
  const closeModalBtn = document.getElementById("close-modal");
  const yearFilter = document.getElementById("filter-year");
  const categoryFilter = document.getElementById("filter-category");

  let eventsData = [];

  // Fetch events from JSON
  fetch("data/events.json")
    .then(res => res.json())
    .then(data => {
      eventsData = data;
      populateFilters(data);
      renderEvents(data);
    });

  function populateFilters(events) {
    const years = [...new Set(events.map(e => e.year))].sort();
    const categories = [...new Set(events.map(e => e.category))].sort();

    years.forEach(y => {
      const opt = document.createElement("option");
      opt.value = y;
      opt.textContent = y;
      yearFilter.appendChild(opt);
    });

    categories.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c.charAt(0).toUpperCase() + c.slice(1);
      categoryFilter.appendChild(opt);
    });
  }

  function renderEvents(events) {
    timeline.innerHTML = "";
    events.forEach(ev => {
      const card = document.createElement("article");
      card.className = "event-card";
      card.innerHTML = `
        <img src="${ev.imageURL}" alt="${ev.title}">
        <h3>${ev.title}</h3>
        <p>${ev.year} • ${ev.category}</p>
      `;
      card.addEventListener("click", () => openModal(ev));
      timeline.appendChild(card);
    });
  }

  function openModal(event) {
    document.getElementById("modal-image").src = event.imageURL;
    document.getElementById("modal-title").textContent = event.title;
    document.getElementById("modal-description").textContent = event.description;
    document.getElementById("modal-year").textContent = event.year;
    document.getElementById("modal-category").textContent = event.category;
    modal.classList.remove("hidden");
  }

  closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  // Filtering
  yearFilter.addEventListener("change", applyFilters);
  categoryFilter.addEventListener("change", applyFilters);

  function applyFilters() {
    const yearVal = yearFilter.value;
    const catVal = categoryFilter.value;

    const filtered = eventsData.filter(e => {
      return (yearVal === "" || e.year === yearVal) &&
             (catVal === "" || e.category === catVal);
    });

    renderEvents(filtered);
  }
});
