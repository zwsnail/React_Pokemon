import { useState, useEffect } from "react";
import { SearchPokemon } from "./search-panel/search-panel-component";
import { PokemonList } from "./list/list-component";


export const PokemonIndex = () => {
    const [pokemon, setPokemon] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [currentOffset, setCurrentOffset] = useState(0);

    const loadPokemon = (limit = 12, offset = 0) => {
        const newPokemon = [];
        console.log("currentOffset - 1", currentOffset);
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
            .then(response => response.json())
            .then(json => {
                json.results.forEach(pokemon => {
                    const id = pokemon.url.split('/')[6];
                    pokemon.id = id;
                    newPokemon.push(pokemon);
                })
                setPokemon([...pokemon, ...newPokemon]);
                setFilteredPokemons([...pokemon, ...newPokemon]);
            });
        setCurrentOffset(currentOffset + 12);
        console.log("currentOffset", currentOffset);
    }

    const load = () => {
        const newPockemon = [];
        console.log("currentOffset - 1", currentOffset);
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${currentOffset}&limit=12`)
            .then(response => response.json()
            ).then(json => {
                json.results.forEach(p => {
                    const id = p.url.split('/')[6];
                    p.id = id;
                    newPockemon.push(p);
                })
                setPokemon([...pokemon, ...newPockemon]);
                setFilteredPokemons([...pokemon, ...newPockemon]);
            })
        // currentOffset += 10;
        setCurrentOffset(currentOffset + 20);
        // setCurrentOffset(currentOffset => currentOffset + 10);
        console.log("currentOffset - 3", currentOffset);
    }


    useEffect(() => {
        loadPokemon();
        // load();
    }, []);


    const onChangeHandler = (event) => {
        // Filter the pokemon list based on the search input
        // Use the original pokemon list to filter
        const comparedPokemons = pokemon.filter((pokemon) => {
            return pokemon.name.includes(event.target.value.toLowerCase());
        })
        setTimeout(() => {
            setFilteredPokemons(comparedPokemons);
        }, 300);
    }

    return (
        <>
            <SearchPokemon onChangeHandler={onChangeHandler} />
            <PokemonList PokemonLists={filteredPokemons} loadMorePokemon={() => loadPokemon(12, currentOffset)} />
        </>
    );
};
