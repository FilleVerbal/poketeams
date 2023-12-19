

async function searchForPoke(query) {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0";
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        const results = data.results || [];
        const matchingPokemons = results.filter(pokemon => pokemon.name.includes(query.toLowerCase()));

        if (matchingPokemons.length > 0) {
            const fetchPromises = matchingPokemons.map(async pokemon => {
                const pokemonResponse = await fetch(pokemon.url);
                if (pokemonResponse.ok) {
                    const pokemonData = await pokemonResponse.json();
                    return pokemonData;
                } else {
                    throw new Error(`Failed to fetch details for ${pokemon.name}`);
                }
            });

            const matchingPokemonDetails = await Promise.all(fetchPromises);
            console.log("Matching Pokémon details:", matchingPokemonDetails);
            return matchingPokemonDetails;
        } else {
            console.log("No matches found.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching or processing data:", error);
        return [];
    }
}



export { searchForPoke }