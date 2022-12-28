import styles from "./list.module.scss";

export const PokemonList = ({ PokemonLists, loadMorePokemon }) => {
    const imgCSS = {
        border: '1px solid darkorange',
        borderRadius: '10px'
    }

    return (
        <div>
            <ul className={styles.ulContainer}>
                {PokemonLists.map((pokemon) => {
                    return (
                        <a href={pokemon.url} key={pokemon.url}>
                            <div className={styles.divContainer} >
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                                    style={imgCSS} alt={pokemon.name} />
                                <li>{pokemon.name}</li>
                            </div>
                        </a>
                    );
                })}
            </ul>
            <button className={styles.loadMore} onClick={loadMorePokemon}>Load More</button>
        </div>
    );
}