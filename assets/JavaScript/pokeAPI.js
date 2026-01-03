//declarando o objeto que sera exportado
const pokeApi =  {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  const status = new Status();

  // Dados básicos
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  // Tipos
  const types = pokeDetail.types.map(slot => slot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  // Imagem
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  // Dimensões
  pokemon.height = pokeDetail.height;
  pokemon.weight = pokeDetail.weight;

  // Habilidades
  pokemon.abilities = pokeDetail.abilities.map(
    ability => ability.ability.name
  ).join('<br><br>');

  // Stats
  pokeDetail.stats.forEach(statItem => {
    const name = statItem.stat.name;
    const value = statItem.base_stat;

    if (name === 'hp') status.hp = value;
    if (name === 'attack') status.attack = value;
    if (name === 'defense') status.defense = value;
    if (name === 'specialAttack') status.specialAttack = value;
    if (name === 'specialDefense') status.specialDefense = value;
    if (name === 'speed') status.speed = value;
  });

  pokemon.status = status;

  return pokemon;
}

pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}


pokeApi.getPokemonStatus = (id = 1) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    return fetch(url)
    .then ((response) => response.json()
    .then(dataStatus  => {
      return convertPokeApiDetailToPokemon(dataStatus);
    })
    .catch(error => console.error('Erro:', error))
)

}


pokeApi.getPokemons =(offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

 return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
};