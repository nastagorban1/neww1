document.addEventListener("DOMContentLoaded", initCatalog);

let allItems = [];

async function initCatalog() {
  const catalog = document.getElementById("catalog");
  const loading = document.getElementById("loading");

  if (!catalog) return;

  try {
    const response = await fetch("../data/items.json");

    if (!response.ok) {
      throw new Error("Помилка завантаження");
    }

    allItems = await response.json();

    loading.style.display = "none";
    renderCards(allItems);
    initFilters();

  } catch (error) {
    loading.textContent = "Не вдалося завантажити дані";
  }
}

function renderCards(items) {
  const catalog = document.getElementById("catalog");
  catalog.innerHTML = "";

  if (items.length === 0) {
    catalog.innerHTML = "<p>Нічого не знайдено</p>";
    return;
  }

  items.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("section");

    card.innerHTML = `
      <h2>${item.title}</h2>
      <p><strong>Category:</strong> ${item.category}</p>
      <p>${item.description}</p>
      <p><strong>Price:</strong> $${item.price}</p>
      <button>Add to favorites</button>
    `;

    catalog.appendChild(card);
  });
}

function initFilters() {
  const search = document.getElementById("search");
  const category = document.getElementById("categoryFilter");
  const sort = document.getElementById("sortSelect");

  function applyFilters() {
    let filtered = [...allItems];

    const query = search.value.toLowerCase();
    const selectedCategory = category.value;
    const selectedSort = sort.value;

    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(query)
    );

    if (selectedCategory !== "all") {
      filtered = filtered.filter(item =>
        item.category === selectedCategory
      );
    }

    if (selectedSort === "title") {
      filtered.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    if (selectedSort === "price") {
      filtered.sort((a, b) =>
        a.price - b.price
      );
    }

    renderCards(filtered);
  }

  search.addEventListener("input", applyFilters);
  category.addEventListener("change", applyFilters);
  sort.addEventListener("change", applyFilters);
}