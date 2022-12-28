import styles from './previous-next-component.module.scss';

export const PreviousNextList = ({ previousUrl, nextUrl, onClickPreNexHandler }) => {

    return (<div className={styles.previousNextDiv}>
        <button onClick={onClickPreNexHandler(previousUrl)}>Previous</button>
        <button onClick={onClickPreNexHandler(nextUrl)}>Next</button>
    </div>);
}