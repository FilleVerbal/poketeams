//  ta bort från här till och med 
const welcomeView = document.querySelector(".welcome-page")
const teamView = document.querySelector(".team-page")

//  hit, bort med det ovan

import { nukeEm } from "./userfunctions.js"
import { searchForPoke } from "./fetchfunctions.js"
import { cleanTeamCard, displayPokemonCard, displayPokemonReserves } from "./displayfunctions.js"

const startBtn = document.querySelector(".start-button");
const nukeBtn = document.querySelector(".nuke-btn");
const editTeamView = document.querySelector(".team-check");
const endPage = document.querySelector(".end-page");
const backToSearch = document.querySelector(".back-to-search");
const resultsContainer = document.querySelector(".search-results");
const yourReserves = document.querySelector(".your-reserves");
const pokeSearch = document.querySelector("#poke-search");

startBtn.addEventListener("click", () => {
    welcomeView.classList.toggle("visibility")
    teamView.classList.toggle("visibility")    
})

nukeBtn.addEventListener("click", () => {
    nukeEm()
    endPage.classList.add("visibility")
    teamView.classList.remove("visibility")
})

editTeamView.addEventListener("click", () => {
    welcomeView.classList.add("visibility")
    teamView.classList.add("visibility")
    endPage.classList.remove("visibility")
    console.log("teamutskrift: ", team);
    console.log("reserves: ", reserves);
    console.log(team.length);
    document.querySelector(".your-team").innerHTML = ""
    document.querySelector(".your-reserves").innerHTML = ""
    team.forEach((pokemon, index) => {
        cleanTeamCard(pokemon, index);
    })
    reserves.forEach((pokemon) => {
        displayPokemonReserves(pokemon)
    })     
})

backToSearch.addEventListener("click", () => {
    teamView.classList.remove("visibility")
    endPage.classList.add("visibility")
})

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

