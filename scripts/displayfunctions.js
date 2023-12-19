import { searchForPoke } from "./fetchfunctions.js"
const resultsContainer = document.querySelector(".search-results");
const pokeSearch = document.querySelector("#poke-search")
let team = []
let reserves = []

function displayPokemonCard(pokemon) {
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('search-display');

    const pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.sprites.front_default;
    pokemonImage.alt = pokemon.name;
    pokemonCard.appendChild(pokemonImage);

    const pokemonName = document.createElement('h1');
    pokemonName.textContent = pokemon.name;
    pokemonCard.appendChild(pokemonName);
    console.log(pokemonName);

    const pokemonHP = document.createElement('h3');
    pokemonHP.textContent = `HP: ${pokemon.stats[0].base_stat}`; 
    pokemonCard.appendChild(pokemonHP);
    console.log("pokemondata" + pokemonName + pokemonHP)

    const abilitiesHeader = document.createElement('h4');
    abilitiesHeader.textContent = 'Abilities:';
    pokemonCard.appendChild(abilitiesHeader);

    const abilitiesList = document.createElement('ul');
    pokemon.abilities.forEach(ability => {
        const abilityItem = document.createElement('li');
        abilityItem.textContent = ability.ability.name;
        abilitiesList.appendChild(abilityItem);
    });
    pokemonCard.appendChild(abilitiesList);

    const addButton = document.createElement('button');
    addButton.textContent = 'Add';
    pokemonCard.appendChild(addButton);
    addButton.addEventListener('click', () => {
        if (team.length < 3) {
            team.push(pokemon)
            console.log(team);
        } else {
            reserves.push(pokemon)
            console.log(reserves);
        }
        console.log(`Adding ${pokemon.name} to the team or reserves`);
    });

    resultsContainer.appendChild(pokemonCard);
}

pokeSearch.addEventListener("input", async () => {
    const query = pokeSearch.value.trim()
    if (query.length >= 2) {
        try {
            const result = await searchForPoke(query)
            resultsContainer.innerText = ""
            if (result.length > 0) {
                result.forEach(displayPokemonCard);
            }
            console.log("fick någon form av data" + result);
        } catch (error) {
            console.log("fick ingen data")
        }
    }
})


export { displayPokemonCard }