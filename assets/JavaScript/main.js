const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const limit = 5;
let offset = 0;
//aqui eu pego o codigo HTML que eu quero que seja adicionado no index.html, ele tambem esta entre crases para permitir a concatenacao dos
//valores desejados

//aqui eu estou pegando o ID da OL no HTML para transforma-lo em uma constante, assim, sendo possivel adicionar tags dentro dele dinamicamente

//pegando o objeto do pokeAPI

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map((pokemon) =>
          `<li onclick="executaAcao(${pokemon.number})" data-modal="modal-${pokemon.number}" class="clicavel pokemon ${pokemon.type}">
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
                              <button onclick="closeModal(${pokemon.number})" class="close-modal">fechar</button>
                              <h1>${pokemon.name}</h1>
                              <ol class="types">
                            ${pokemon.types
                              .map(
                                (type) =>
                                  `<li class="type ${type}">${type}</li>`
                              )
                              .join("")}
                        </ol>
                              <img class="pokemonImage" src="${pokemon.photo}" alt="${pokemon.name}">
                        <div class="statistics">

                        </div>
                      </div>
                </dialog>
            `
      ).join("");
    pokemonList.innerHTML += newHtml;
  });
}

function executaAcao(number){
  const modal = document.getElementById(`modal-${number}`);

    modal.showModal();

}

function closeModal(number){
  const modal = document.getElementById(`modal-${number}`);

  modal.close();
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener("click", () => {
    offset += limit
  loadPokemonItems(offset, limit);
});
