const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const limit = 12;
let offset = 0;


function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        (pokemon) =>
          `<li onclick="executaAcao(${pokemon.number})" data-modal="modal-${
            pokemon.number
          }" class="clicavel pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types
                              .map(
                                (type) =>
                                  `<li class="type ${type}">${type}</li>`
                              )
                              .join("")}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </li>

                <dialog id="modal-${pokemon.number}" >
                      <div class="modal-background ${pokemon.type}">
                              <button onclick="closeModal(${
                                pokemon.number
                              })" class="close-modal clicavel">Fechar</button>
                              <h1 class="name-modal">${pokemon.name}</h1>
                              <ol class="types">
                            ${pokemon.types
                              .map(
                                (type) =>
                                  `<li class="type-modal ${type}">${type}</li>`
                              )
                              .join("")}
                        </ol>
                        <div class="container-image">
                              <img class="pokemonImage" src="${
                                pokemon.photo
                              }" alt="${pokemon.name}">
                        </div>
                        <div class="statistics">
                          <div class="tab">
                            <button class="tablinks" onclick="navTab(event, 'nav-tab-status${pokemon.name}')">Status</button>
                            <button class="tablinks" onclick="navTab(event, 'nav-tab-habilidades${pokemon.name}')">Habilidades</button>
                            <button class="tablinks" onclick="navTab(event, 'nav-tab-dimensoes${pokemon.name}')">Dimensões</button>
                          </div>

                          <div id="nav-tab-status${pokemon.name}" class="tabcontent">
                            <h3>Status</h3>
                            <p>${pokemon.status.hp}</p>
                            <p>${pokemon.status.attack}</p>
                            <p>${pokemon.status.defense}</p>
                            <p>${pokemon.status.specialAttack}</p>
                            <p>${pokemon.status.specialDefense}</p>
                            <p>${pokemon.status.speed}</p>
                            
                          </div>

                          <div id="nav-tab-habilidades${pokemon.name}" class="tabcontent">
                            <h3>Habilidades</h3>
                            <p>${pokemon.abilities}</p> 
                          </div>

                          <div id="nav-tab-dimensoes${pokemon.name}" class="tabcontent">
                            <h3>Dimensões</h3>
                            <p>${pokemon.height}</p>
                            <p>${pokemon.weight}</p>
                          </div>
                        </div>
                      </div>
                </dialog>
            `
      )
      .join("");
    pokemonList.innerHTML += newHtml;
  });
}

function navTab(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

function executaAcao(number) {
  const modal = document.getElementById(`modal-${number}`);

  modal.showModal();
}

function closeModal(number) {
  const modal = document.getElementById(`modal-${number}`);

  modal.close();
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  loadPokemonItems(offset, limit);
});
