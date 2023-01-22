import { Input } from 'antd';
import styled from 'styled-components'

export const SearchPokemon = ({ onChangeHandler }) => {
    return (<Wrapper>
        <h1>Search Your Favorite Pokemon</h1>
        <ShorterInput onChange={onChangeHandler} placeholder="Search..." />
    </Wrapper>);
}

const Wrapper = styled.div`
  width: 100%;
  padding: 4em;
  background: papayawhip;
`;
const ShorterInput = styled(Input)`
  width: 50%;
`;