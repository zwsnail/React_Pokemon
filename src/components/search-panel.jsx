import { Input, Image } from 'antd';
import styled from 'styled-components'
import logo from '../assets/icons/logo.png';
export const SearchPokemon = ({ onChangeHandler, totalPokemon }) => {

  return (<Wrapper>
    {/* <img src={PokeballImage}></img> */}
    <Image style={{ marginBottom: "45px" }} width={200} src={logo}></Image>
    <h1>Search Your Favorite Pokemon</h1>
    <ShorterInput onChange={onChangeHandler} placeholder="Search..." />
    <p style={{ fontSize: 10, marginTop: 10 }}>~ Do you know there are <b>{totalPokemon}</b> pokemons⭐️~</p>
  </Wrapper>);
}

const Wrapper = styled.div`
  width: 100%;
  padding: 4em;
  background: var(--bg-primary);
`;
const ShorterInput = styled(Input)`
  width: 50%;
`;