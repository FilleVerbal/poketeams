import { cleanTeamCard, displayPokemonReserves } from "./displayfunctions.js";
function createButton(text) {
    const button = document.createElement("button");
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

function kickFromTeam(teamIndex) {
    const kickedPokemon = team.splice(teamIndex, 1)[0];
    const firstReservePokemon = reserves.splice(0, 1)[0];
    team.splice(teamIndex, 0 , firstReservePokemon);
    reserves.unshift(kickedPokemon)
}

function kickFromRosterTeam(teamIndex) {
    team.splice(teamIndex, 1)[0];
    if (reserves.length > 0) {
        const promotePokemon = reserves.shift()
        team.splice(teamIndex, 0, promotePokemon);
    }
}

function moveUpOnce(pokemon) {
    const index = reserves.indexOf(pokemon)
    const temp = reserves[index -1]
    reserves[index -1] = pokemon;
    reserves[index] = temp
}

function topReserve(pokemon) {
    const index = reserves.indexOf(pokemon)
    if (index !== -1) {
        reserves.splice(index, 1)
    }
    reserves.unshift(pokemon)
}

function kickFromRosterReserves(reservesIndex) {
    reserves.splice(reservesIndex, 1)[0]
}

function displayTeam() {
    document.querySelector(".your-team").innerHTML = "";
    team.forEach((pokemon, index) => {
        cleanTeamCard(pokemon, index);
    });
}
function displayReserves() {
    document.querySelector(".your-reserves").innerHTML = "";
    reserves.forEach((pokemon, index) => {
        displayPokemonReserves(pokemon, index);
    })
}
function teamWarning() {
    const warningTeamPage = document.querySelector(".warning-text-team")
    warningTeamPage.classList.remove("warning-not-needed")
}
function teamWarningNotNeeded() {
    const warningTeamPage = document.querySelector(".warning-text-team")
    warningTeamPage.classList.add("warning-not-needed")
}

export { createButton, starterPokemon, kickFromTeam, kickFromRosterTeam, moveUpOnce, topReserve, kickFromRosterReserves, displayTeam, displayReserves, teamWarning, teamWarningNotNeeded }