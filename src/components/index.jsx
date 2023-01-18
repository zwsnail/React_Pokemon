import { useState, useEffect } from "react";
import { SearchPokemon } from "./search-panel/search-panel-component";
import { PokemonList } from "./list/list-component";
import { Footer } from "./footer/index";

export const PokemonIndex = () => {
    const [pokemon, setPokemon] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [currentOffset, setCurrentOffset] = useState(0);

    const loadPokemon = () => {
        console.log("offset - 1", offset);
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`)
            .then(response => response.json())
            .then(json => {
                // if (json.next === null) {
                //     setNextUrl(json.next);
                // }
                // if (json.previous === null) {
                //     setPreviousUrl(json.previous);
                // }

                // Add an id to each pokemon for the image url
                json.results.forEach(pokemon => {
                    const id = pokemon.url.split('/')[6];
                    pokemon.id = id;
                })
                // json.results.map((result, index) => result.id = index + 1)
                setPokemon(json.results)
                setFilteredPokemons(json.results)
            });
        // setOffset(offset + 10);
        setOffset(offset => offset + 10);
        console.log("offset - 2", offset);
    }

    const load = () => {
        const newPockemon = [];
        console.log("currentOffset - 1", currentOffset);
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${currentOffset}&limit=10`)
            .then(response => response.json())
            .then(json => {
                json.results.forEach(p => {
                    const id = p.url.split('/')[6];
                    p.id = id;
                    newPockemon.push(p);
                })
                setPokemon([...pokemon, ...newPockemon]);
                setFilteredPokemons([...pokemon, ...newPockemon]);
            })
        // currentOffset += 10;
        setCurrentOffset(currentOffset + 10);
        // setCurrentOffset(currentOffset => currentOffset + 10);
        console.log("currentOffset - 3", currentOffset);
    }
    const load3 = () => {
        const newPockemon = [];
        console.log("offset - 1", offset);
        // setOffset(offset => offset + 10);
        console.log("offset - 2", offset);
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`)
            .then(response => response.json())
            .then(json => {
                json.results.forEach(p => {
                    const id = p.url.split('/')[6];
                    p.id = id;
                    newPockemon.push(p);
                })
                setPokemon([...pokemon, ...newPockemon]);
                setFilteredPokemons([...pokemon, ...newPockemon]);
            })
        // currentOffset += 10;
        setOffset(offset => offset + 10);
        console.log("offset - 3", offset);
    }

    let currentOffset2 = 0;

    const load2 = () => {
        const newPockemon = [];
        console.log("currentOffset2 - 1", currentOffset2);
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${currentOffset2}&limit=10`)
            .then(response => response.json())
            .then(json => {
                json.results.forEach(p => {
                    const id = p.url.split('/')[6];
                    p.id = id;
                    newPockemon.push(p);
                })
                setPokemon([...pokemon, ...newPockemon]);
                setFilteredPokemons([...pokemon, ...newPockemon]);
            })
        currentOffset2 += 10;

        console.log("currentOffset2 - 2", currentOffset2);
    }

    useEffect(() => {
        // loadPokemon();
        load();
    }, []);

    const loadMorePokemon = () => {
        console.log("offset - 1", offset);
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`)
            .then(response => response.json())
            .then(anotherNewPokemons => {
                const emptyArray = [];
                console.log(anotherNewPokemons.results);
                anotherNewPokemons.results.forEach(pokemon => {
                    emptyArray.push(pokemon);
                    const id = pokemon.url.split('/')[6];
                    pokemon.id = id;
                })
                setPokemon(pokemon => [...pokemon, ...emptyArray]);
                setFilteredPokemons(pokemon => [...pokemon, ...emptyArray]);

            });
        // setOffset(offset => offset + 10);
        setOffset(offset + 10);
        console.log("offset - 2", offset);
    }

    const onChangeHandler = (event) => {
        // Filter the pokemon list based on the search input
        // Use the original pokemon list to filter
        const comparedPokemons = pokemon.filter((pokemon) => {
            return pokemon.name.includes(event.target.value);
        })
        setTimeout(() => {
            setFilteredPokemons(comparedPokemons);
        }, 300);
    }

    return (
        <div>
            <SearchPokemon onChangeHandler={onChangeHandler} />
            <PokemonList PokemonLists={filteredPokemons} loadMorePokemon={load} />
            <Footer />
        </div>
    );
};