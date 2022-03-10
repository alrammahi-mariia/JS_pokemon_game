const cards = document.querySelector(".cards");

const fetchData = () => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=0")
    .then((res) => res.json())
    .then((data) => {
      // console.log("fetch result", data);
      // buildCards(data.results);
      const fetches = data.results.map((p) => {
        return fetch(p.url).then((res) => res.json());
      });
      Promise.all(fetches).then((res) => {
        buildCards(res);
      });
    });
};

const buildCards = (data) => {
  console.log("pokecards data coming in", data);
  const boxes = data
    .map((box) => {
      return `<div class="card">
    <img src="${box.sprites.other.dream_world.front_default}" alt="${box.name}"/><h3>${box.name}</h3>
  </div>`;
    })
    .join("");
  cards.innerHTML = boxes;
};

fetchData();

//to-do:
// - make a search function for pokemons
