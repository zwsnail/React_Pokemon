import styles from './search-panel.module.scss';

export const SearchPokemon = ({ onChangeHandler }) => {
    return (<div className={styles.searchDiv}>
        <h1>Search Your Favorite Pokemon</h1>
        <input type="search" onChange={onChangeHandler} placeholder="Search..." />
    </div>);
}