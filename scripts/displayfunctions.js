
const resultsContainer = document.querySelector(".search-results");
const yourReserves = document.querySelector(".your-reserves")
window.team = []
window.reserves = []

function displayPokemonCard(pokemon) {
    console.log("kallar på dpc");
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
    addButton.textContent = "Add";
    pokemonCard.appendChild(addButton);

    const pokeNick = document.createElement("input")
    pokeNick.type = "text";
    pokeNick.placeholder = "Change name";
    pokeNick.classList.add("poke-nick")
    pokemonCard.appendChild(pokeNick);

    addButton.addEventListener("click", () => {
        const newName = pokeNick.value.trim();
        if (newName.length >= 2) {
            pokemon.name = newName;
        }
        if (window.team.length < 3) {
            window.team.push(pokemon)
            console.log("team: ", team);
        } else {
            window.reserves.push(pokemon)
            console.log("reserves: ", reserves);
        }
        pokeNick.value = "";
        console.log(`Adding ${pokemon.name} to the team or reserves`);
    });

    resultsContainer.appendChild(pokemonCard);
}

function displayPokemonReserves(pokemon) {
    console.log("displayrtest: ", pokemon);    
    
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

    const kickButton = document.createElement("button");
    kickButton.textContent = "Kick from roster";
    pokemonCard.appendChild(kickButton);

    kickButton.addEventListener('click', () => {
    //     const newName = pokeNick.value.trim();
    //     if (newName.length >= 2) {
    //         pokemon.name = newName;
    //     }
    //     if (team.length < 3) {
    //         team.push(pokemon)
    //         console.log(team);
    //     } else {
    //         reserves.push(pokemon)
    //         console.log(reserves);
    //     }
    //     pokeNick.value = "";
        console.log(`Kicking ${pokemon.name} from the face of the planet`);
    });

    yourReserves.appendChild(pokemonCard);
}


function cleanTeamCard(pokemon, containerIndex) {
    const container = document.createElement("div");
    container.classList.add("card-container"); 

    const pName = document.createElement("h1");
    pName.classList.add("pName");
    pName.textContent = pokemon.name;

    const pHP = document.createElement("h3");
    pHP.classList.add("pHP");
    pHP.textContent = `HP: ${pokemon.stats[0].base_stat}`;

    const pokemonImg = document.createElement("img");
    pokemonImg.classList.add("pokemon-img");
    pokemonImg.src = pokemon.sprites.front_default;
    pokemonImg.alt = pokemon.name;

    const abilitiesList = document.createElement('ul');
    abilitiesList.classList.add("main-abilitys");
    pokemon.abilities.forEach(ability => {
        const li = document.createElement("li");
        li.textContent = ability.ability.name;
        abilitiesList.appendChild(li);
    });

    container.appendChild(pName);
    container.appendChild(pHP);
    container.appendChild(pokemonImg);
    container.appendChild(abilitiesList);

    if (containerIndex === 0) {
        // Add "Kick from Team" and "Kick from Roster" buttons for the first team card
        const kickFromTeamButton = createButton("Kick from Team");
        const kickFromRosterButton = createButton("Kick from Roster");
        container.appendChild(kickFromTeamButton);
        container.appendChild(kickFromRosterButton);
    } else {
        // Add "Make Starter" and all three buttons for the rest of the team cards at the bottom
        const makeStarterButton = createButton("Make Starter");
        const kickFromTeamButton = createButton("Kick from Team");
        const kickFromRosterButton = createButton("Kick from Roster");
        container.appendChild(makeStarterButton);
        container.appendChild(kickFromTeamButton);
        container.appendChild(kickFromRosterButton);
    }

    document.querySelector(".your-team").appendChild(container);
}

function createButton(text) {
    const button = document.createElement('button');
    button.textContent = text;
    return button;
}

function starterPokemon(array, index1, index2) {
    if (index1 < 0 || index1 >= array.length || index2 < 0 || index2 >= array.length) {
        console.error('Invalid indices');
        return;
    }
    
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
} 


export { displayPokemonCard, cleanTeamCard, displayPokemonReserves, starterPokemon }