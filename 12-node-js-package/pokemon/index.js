const pokemon = require("pokemon");

const allPokemon = pokemon.all();
// console.log("All Pokemon:", allPokemon);

const randomPokemon = pokemon.random();
console.log("Random Pokemon:", randomPokemon);

const randomPokemonId = pokemon.getId(randomPokemon);
console.log("Random Pokemon ID:", randomPokemonId);
