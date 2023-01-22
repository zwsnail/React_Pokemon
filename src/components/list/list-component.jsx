import { Card, List, Image, Button } from 'antd';
import styled from 'styled-components';


export const PokemonList = ({ PokemonLists, loadMorePokemon }) => {
    return (
        <>
            <Wrapper>
                <List
                    grid={{
                        gutter: 1,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3,
                    }}
                    dataSource={PokemonLists}
                    renderItem={(pokemon) =>
                    (
                        <List.Item href={pokemon.url} key={pokemon.url}>
                            <Card>
                                <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                                    alt={pokemon.name} />
                                <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                            </Card>
                        </List.Item>
                    )}
                />
            </Wrapper>
            <LoadMoreButtonWrap>
                <Button type="primary" value="large" onClick={loadMorePokemon}>Load More</Button>
            </LoadMoreButtonWrap>
        </>
    );
}

const LoadMoreButtonWrap = styled.div`
  padding-top: 20px;
  z-index: 7;
`;

const Wrapper = styled.div`
    width: 100%;
    padding: 4rem;
    /* background: papayawhip; */
    flex: 1;
`;