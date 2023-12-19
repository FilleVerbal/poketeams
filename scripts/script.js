//  ta bort från här till och med 
const welcomeView = document.querySelector(".welcome-page")
const teamView = document.querySelector(".team-page")

//  hit, bort med det ovan

import { nukeEm } from "./userfunctions.js"
import { searchForPoke } from "./fetchfunctions.js"
import { displayPokemonCard } from "./displayfunctions.js"

const startBtn = document.querySelector(".start-button")
const nukeBtn = document.querySelector(".nuke-btn")
const pokeSearch = document.querySelector("#poke-search")
const resultsContainer = document.querySelector(".search-results");
const editTeamView = document.querySelector(".team-check")
const endPage = document.querySelector(".end-page")
const backToSearch = document.querySelector(".back-to-search")


startBtn.addEventListener("click", () => {
    welcomeView.classList.toggle("visibility")
    teamView.classList.toggle("visibility")
    
})

nukeBtn.addEventListener("click", () => {
    nukeEm()
})

editTeamView.addEventListener("click", () => {
    welcomeView.classList.add("visibility")
    teamView.classList.add("visibility")
    endPage.classList.remove("visibility")

})

backToSearch.addEventListener("click", () => {
    teamView.classList.remove("visibility")
    endPage.classList.add("visibility")
})