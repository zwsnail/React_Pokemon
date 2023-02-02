import { Input, Image } from 'antd';
import styled from 'styled-components'
import logo from '../assets/icons/logo.png';

export const SearchPokemon = ({ onChangeHandler, totalPokemon }) => {

  return (
    <Wrapper>
      {/* <img src={PokeballImage}></img> */}
      <Image style={{ marginBottom: "45px" }} src={logo}></Image>
      <h1>Search Your Favorite Pokemon</h1>
      <ShorterInput onChange={onChangeHandler} placeholder="Search..." />
      <p style={{ fontSize: 10, marginTop: 10 }}>~ Do you know there are <b>{totalPokemon}</b> pokemons⭐️~</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  padding: 4em;
  background: var(--bg-primary);
  .ant-image {
    width: 20rem;
  }

  @media screen and (max-width: 575px) {
    .ant-image {
      width: 50%;
    }
    .ant-image-img  {
      margin-bottom: 15px !important;
    }
  }

  

`;
const ShorterInput = styled(Input)`
  width: 50%;
`;