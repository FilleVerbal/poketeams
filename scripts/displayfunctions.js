
import { createButton, starterPokemon, kickFromTeam, kickFromRosterTeam, moveUpOnce, topReserve, kickFromRosterReserves, displayTeam, displayReserves, teamWarning, teamWarningNotNeeded } from "./userfunctions.js"
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

    const pokemonName = document.createElement("h1");
    pokemonName.textContent = pokemon.name;
    pokemonCard.appendChild(pokemonName);
    console.log(pokemonName);

    const pokemonHP = document.createElement('h3');
    pokemonHP.innerHTML = `HP <br>${pokemon.stats[0].base_stat}`; 
    pokemonCard.appendChild(pokemonHP);

    const abilitiesHeader = document.createElement('h4');
    abilitiesHeader.textContent = "Abilities:";
    pokemonCard.appendChild(abilitiesHeader);

    const abilitiesList = document.createElement('ul');
    pokemon.abilities.forEach(ability => {
        const abilityItem = document.createElement("li");
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
        } else {
            window.reserves.push(pokemon)
        }
        pokeNick.value = "";
    });

    resultsContainer.appendChild(pokemonCard);
}

function displayPokemonReserves(pokemon, index) {   
    
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('reserve-display');

    const pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.sprites.front_default;
    pokemonImage.alt = pokemon.name;
    pokemonCard.appendChild(pokemonImage);

    const pokemonName = document.createElement('h1');
    pokemonName.textContent = pokemon.name;
    pokemonCard.appendChild(pokemonName);

    const pokemonHP = document.createElement('h3');
    pokemonHP.textContent = `HP: ${pokemon.stats[0].base_stat}`; 
    pokemonCard.appendChild(pokemonHP);

    const abilitiesHeader = document.createElement('h4');
    abilitiesHeader.textContent = "Abilities:";
    pokemonCard.appendChild(abilitiesHeader);

    const abilitiesList = document.createElement('ul');
    pokemon.abilities.forEach(ability => {
        const abilityItem = document.createElement("li");
        abilityItem.textContent = ability.ability.name;
        abilitiesList.appendChild(abilityItem);
    });
    pokemonCard.appendChild(abilitiesList);

    const buttonContainer = document.createElement(`div`)
    buttonContainer.classList.add(`button-container`)
    if (index === 0) {
        const kickButton = createButton("Kick from roster");
        buttonContainer.appendChild(kickButton);
        kickButton.addEventListener('click', () => {
            kickFromRosterReserves(pokemon)
            displayReserves()
        });
    } else if (index === 1) {
        const firstReserve = createButton("Top-reserve");
        const kickButton = createButton("Kick from roster");
        buttonContainer.appendChild(firstReserve);
        buttonContainer.appendChild(kickButton);

        firstReserve.addEventListener(`click`, () => {
            topReserve(pokemon)
            displayReserves()
        })
        kickButton.addEventListener('click', () => {
            kickFromRosterReserves(pokemon)
            displayReserves()
        });
    } else {
        const firstReserve = createButton("Top-reserve")
        const moveUpOne = createButton("Move up one")
        const kickButton = document.createElement("button");
        kickButton.textContent = "Kick from roster";
        buttonContainer.appendChild(firstReserve);
        buttonContainer.appendChild(moveUpOne)
        buttonContainer.appendChild(kickButton);
    
        firstReserve.addEventListener(`click`, () => {
            topReserve(pokemon)
            displayReserves()
        })
        moveUpOne.addEventListener(`click`, () => {
            moveUpOnce(pokemon)
            displayReserves()
        })
        kickButton.addEventListener('click', () => {
            kickFromRosterReserves(pokemon)
            displayReserves()
        });

    }
    pokemonCard.appendChild(buttonContainer)
    yourReserves.appendChild(pokemonCard);
}


function cleanTeamCard(pokemon, containerIndex) {
    const container = document.createElement("div");
    container.classList.add("card-container"); 

    const pName = document.createElement("h1");
    pName.classList.add("pName");
    if ( containerIndex === 0 ) {
        pName.textContent = `Starter: ${pokemon.name}`;
    } else {
        pName.textContent = pokemon.name;
    }

    const pHP = document.createElement("h3");
    pHP.classList.add("pHP");
    pHP.textContent = `HP: ${pokemon.stats[0].base_stat}`;

    const pokemonImg = document.createElement("img");
    pokemonImg.classList.add("pokemon-img");
    pokemonImg.src = pokemon.sprites.front_default;
    pokemonImg.alt = pokemon.name;

    const abilitiesList = document.createElement(`ul`);
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
        const kickFromTeamButton = createButton("Kick from Team");
        const kickFromRosterButton = createButton("Kick from Roster");

        kickFromTeamButton.addEventListener(`click`, () => {
            kickFromTeam(containerIndex)
            displayTeam()
            displayReserves()
        })
        kickFromRosterButton.addEventListener(`click`, () => {
            kickFromRosterTeam(containerIndex)
            displayTeam()
            displayReserves()
            if (team.length < 3) {
                teamWarning()
            } else {
                teamWarningNotNeeded()
            }
        })

        container.appendChild(kickFromTeamButton);
        container.appendChild(kickFromRosterButton);

    } else {
        const makeStarterButton = createButton("Make Starter");
        const kickFromTeamButton = createButton("Kick from Team");
        const kickFromRosterButton = createButton("Kick from Roster");

        makeStarterButton.addEventListener(`click`, () => {
            starterPokemon(team, containerIndex, 0)
            displayTeam()
        })
        kickFromTeamButton.addEventListener(`click`, () => {
            kickFromTeam(containerIndex)
            displayTeam()
            displayReserves()
        })
        kickFromRosterButton.addEventListener(`click`, () => {
            kickFromRosterTeam(containerIndex)
            displayTeam()
            displayReserves()
        })
        container.appendChild(makeStarterButton);
        container.appendChild(kickFromTeamButton);
        container.appendChild(kickFromRosterButton);
    }
    document.querySelector(".your-team").appendChild(container);
}

export { displayPokemonCard, cleanTeamCard, displayPokemonReserves, starterPokemon }