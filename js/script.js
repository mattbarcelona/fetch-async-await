let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");
let resetBtn = document.getElementById("resetBtn");

const getPoke = async () => {
  let apiUrl = `https://pokeapi.co/api/v2/pokemon/?offset=10&limit=10`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Ha surgido un error: ${response.status}`);
    }
    const data = await response.json();

    // Clear previous content in the app container (if necessary)
    const app = document.getElementById("app");
    app.innerHTML = "";

    // Use `.map()` to iterate over the results
    data.results.forEach(async (pokemon) => {
      // Fetch details for each Pokémon
      const pokemonResponse = await fetch(pokemon.url);
      if (!pokemonResponse.ok) {
        throw new Error(`Error al obtener datos de ${pokemon.name}`);
      }
      const pokemonData = await pokemonResponse.json();

      // Create and append elements for each Pokémon
      const liPoke = document.createElement("li");
      const pokeName = document.createElement("h3");
      pokeName.textContent = pokemonData.name;
      pokeName.classList.add("title");

      const imgGen = document.createElement("img");
      imgGen.src = pokemonData.sprites.front_default; // Correct image property
      imgGen.alt = pokemonData.name;
      imgGen.classList.add("imGen");

      liPoke.appendChild(pokeName);
      liPoke.appendChild(imgGen);
      app.appendChild(liPoke);
    });
  } catch (error) {
    console.error("Error al obtener los datos", error);
  }
};

// Call the function to fetch and display Pokémon
getPoke();

let currentPage = 1;
const baseUrl = `https://pokeapi.co/api/v2/pokemon`;

nextBtn.addEventListener("click", async () => {
  const addPage = (page) => {
    if (page >= 1 && page < 130) {
      return page + 1;
    } else {
      console.error("There is an error! Page number is out of range.");
      return null;
    }
  };

  const next = addPage(currentPage);
  if (next) {
    currentPage = next;

    // Calculate offset dynamically
    const offset = (currentPage - 1) * 10;
    const nextUrl = `${baseUrl}/?offset=${offset}&limit=10`;

    try {
      const response = await fetch(nextUrl);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }

      const data = await response.json();

      const app = document.getElementById("app");
      app.innerHTML = ""; // Clear previous content

      // Use `.forEach()` to iterate over the results
      for (const pokemon of data.results) {
        const pokemonResponse = await fetch(pokemon.url);
        if (!pokemonResponse.ok) {
          throw new Error(`Error fetching data for ${pokemon.name}`);
        }
        const pokemonData = await pokemonResponse.json();

        // Create and append elements for each Pokémon
        const liPoke = document.createElement("li");
        const pokeName = document.createElement("h3");
        pokeName.textContent = pokemonData.name;
        pokeName.classList.add("title");

        const imgGen = document.createElement("img");
        imgGen.src = pokemonData.sprites.front_default; // Correct image property
        imgGen.alt = pokemonData.name;
        imgGen.classList.add("imGen");

        liPoke.appendChild(pokeName);
        liPoke.appendChild(imgGen);
        app.appendChild(liPoke);
      }
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);

      const app = document.getElementById("app");
      app.innerHTML = `<p>Error: Something went wrong while fetching Pokémon data.</p>`;
    }
  }
});

prevBtn.addEventListener("click", async () => {
  const prevPage = (page) => {
    if (page >= 1 && page < 130) {
      return page - 1;
    } else {
      console.error("There is an error! Page number is out of range.");
      return null;
    }
  };

  const prev = prevPage(currentPage);
  if (prev) {
    currentPage = prev;

    // Calculate offset dynamically
    const offset = (currentPage - 1) * 10;
    const nextUrl = `${baseUrl}/?offset=${offset}&limit=10`;

    try {
      const response = await fetch(nextUrl);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }

      const data = await response.json();

      const app = document.getElementById("app");
      app.innerHTML = ""; // Clear previous content

      // Use `.forEach()` to iterate over the results
      for (const pokemon of data.results) {
        const pokemonResponse = await fetch(pokemon.url);
        if (!pokemonResponse.ok) {
          throw new Error(`Error fetching data for ${pokemon.name}`);
        }
        const pokemonData = await pokemonResponse.json();

        // Create and append elements for each Pokémon
        const liPoke = document.createElement("li");
        const pokeName = document.createElement("h3");
        pokeName.textContent = pokemonData.name;
        pokeName.classList.add("title");

        const imgGen = document.createElement("img");
        imgGen.src = pokemonData.sprites.front_default; // Correct image property
        imgGen.alt = pokemonData.name;
        imgGen.classList.add("imGen");

        liPoke.appendChild(pokeName);
        liPoke.appendChild(imgGen);
        app.appendChild(liPoke);
      }
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);

      const app = document.getElementById("app");
      app.innerHTML = `<p>Error: Something went wrong while fetching Pokémon data.</p>`;
    }
  }
});

resetBtn.addEventListener("click", () => {
  getPoke();
});

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// Retrieve stored value from localStorage or set empty if not present
searchInput.value = localStorage.getItem("content") || "";

// Save search term to localStorage when the user types
searchInput.addEventListener("input", () => {
  localStorage.setItem("content", searchInput.value);
});

// Listen for user input in the search box
searchInput.addEventListener("keyup", async () => {
  const query = searchInput.value.trim().toLowerCase(); // Get the search query
  if (!query) {
    document.getElementById("app").innerHTML =
      "<p>Escriba algo para buscar.</p>";
    return; // Exit if the search box is empty
  }

  try {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=1000`; // Fetch all Pokémon
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Ha surgido un error: ${response.status}`);
    }

    const data = await response.json();
    const app = document.getElementById("app");
    app.innerHTML = ""; // Clear previous results

    // Filter results by matching Pokémon name with the search query
    const matchingPokemons = data.results.filter((pokemon) =>
      pokemon.name.includes(query)
    );

    if (matchingPokemons.length === 0) {
      app.innerHTML = `<p>No se encontraron coincidencias.</p>`;
      return;
    }

    // Fetch and display details for matching Pokémon
    for (const pokemon of matchingPokemons) {
      const pokemonResponse = await fetch(pokemon.url);
      if (!pokemonResponse.ok) {
        throw new Error(`Error al obtener datos de ${pokemon.name}`);
      }

      const pokemonData = await pokemonResponse.json();

      const liPoke = document.createElement("li");
      const pokeName = document.createElement("h3");
      pokeName.textContent = pokemonData.name;
      pokeName.classList.add("title");

      const imgGen = document.createElement("img");
      imgGen.src = pokemonData.sprites.front_default; // Correct image property
      imgGen.alt = pokemonData.name;
      imgGen.classList.add("imGen");

      liPoke.appendChild(pokeName);
      liPoke.appendChild(imgGen);
      app.appendChild(liPoke);
    }
  } catch (error) {
    console.error("Error al obtener los datos", error);
    document.getElementById("app").innerHTML =
      "<p>Error al obtener los datos. Inténtalo de nuevo más tarde.</p>";
  }
});
