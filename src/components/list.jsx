import { useState } from 'react';
import { Card, List, Image, Button, Avatar, Modal } from 'antd';
import { CloseSquareOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { searchIcon } from '../utils/search-icon';
import { PokemonModal } from './modal';
import PokeballImage from '../assets/icons/pokeball.png';
import NoDataImage from '../assets/icons/pokemon_card_back.png';

export const PokemonList = ({ PokemonLists, loadMorePokemon, comparedPokemons }) => {
    const { Meta } = Card;

    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleClick = (pokemon, e) => {
        e.preventDefault()
        setSelectedPokemon(pokemon)
        setIsModalOpen(true);
        // document.body.style.overflow = 'hidden';
    }

    return (
        <>
            <Wrapper>
                <List
                    grid={{
                        gutter: 0,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 4,
                        xxl: 6,
                    }}
                    dataSource={PokemonLists}
                    itemLayout='horizontal'
                    size='small'
                    rowKey={(pokemon) => pokemon.id}
                    locale={{
                        emptyText: (<span>
                            <h2>Opoos~<br /> _(:з」∠)_ <br /><b>No Pokemon Found</b></h2>
                            {/* <Button>do something</Button> */}
                            <Image preview={false} src={NoDataImage} style={{ marginTop: 10, borderRadius: 22 }} />
                        </span>)
                    }}
                    renderItem={(pokemon) =>
                    (
                        <List.Item>

                            <a onClick={(e) => handleClick(pokemon, e)} href="#">
                                <Card
                                    style={{ backgroundColor: `var(--bg-poke-color-light-${pokemon.types[0].type.name})`, }}
                                    hoverable
                                    size="small"
                                    cover={
                                        <ImageWrap
                                            preview={false}
                                            alt={pokemon.name}
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                                        />
                                    }
                                    title={`#${pokemon.id}`}
                                    extra={
                                        <img
                                            style={{
                                                width: 31,
                                                borderRadius: 100,
                                            }
                                            }
                                            alt={pokemon.types.map(t => t.type.name).join(', ')}
                                            src={searchIcon(pokemon.types[0].type.name)}
                                        />
                                    }
                                >
                                    <Meta
                                        avatar={<Avatar src={PokeballImage} alt="avatar" />}
                                        title={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                                    />
                                </Card>
                            </a>

                            {selectedPokemon === pokemon &&
                                <Modal centered={true} open={isModalOpen} onCancel={handleCancel} footer={null} width={400}>
                                    <PokemonModal selectedPokemon={selectedPokemon} key={pokemon.url} />
                                </Modal>
                            }
                        </List.Item>
                    )}
                />
            </Wrapper>

            {
                comparedPokemons.length >= 1 &&
                <LoadMoreButtonWrap>
                    <Button type="primary" value="large" onClick={loadMorePokemon}>Load More</Button>
                </LoadMoreButtonWrap>
            }
        </>
    );
}

const LoadMoreButtonWrap = styled.div`
  padding-top: 20px;
  z-index: 7;

  button {
  align-items: center;
  appearance: none;
  background-color: #FCFCFD;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395A;
  cursor: pointer;
  display: inline-flex;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;

    &:focus {
        box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
    }
    &:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
    transform: translateY(-2px);
    background-color: var(--bg-primary) !important;
    color: #000 !important;
    }
    &:active {
    box-shadow: #D6D6E7 0 3px 7px inset;
    transform: translateY(2px);
    }
  }
`;

const Wrapper = styled.div`
    width: 100%;
    padding: 7% 15%;
    flex: 1;
`;

const ImageWrap = styled(Image)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`;

