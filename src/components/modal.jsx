import { render } from "@testing-library/react";
import { Card, Image, Avatar, Modal, Progress } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, StarOutlined } from '@ant-design/icons';
import { searchIcon } from '../utils/search-icon';
import styled from 'styled-components';
import useFetch from "utils/fetch";

const { Meta } = Card;

export const PokemonModal = (props) => {

    const pokemon = props.selectedPokemon
    const titleCard = `Height:${pokemon.height}  |  Weight:${pokemon.weight}`;

    const getColorByStat = (name) => {
        switch (name) {
            case 'hp':
                return "#52c41a";
            case 'attack':
                return "#f5222d";
            case 'defense':
                return "var(--bg-poke-color-dark-fighting)";
            case 'special-attack':
                return "var(--bg-poke-color-light-water)";
            case 'special-defense':
                return "var(--bg-poke-color-dark-flying)";
            case 'speed':
                return "var(--bg-poke-color-dark-dark)";
            default:
                return "#1890ff";
        }
    }

    //     const card_head = {.ant - card - head {
    //         background: var(--bg - poke - color - light - ${ pokemon.types[0].type.name });
    // }
    //     }

    return (

        <>
            {pokemon &&
                <CardWrap
                    bordered={false}
                    hoverable={true}
                    style={{
                        // height: "80px",
                        // width: 450,
                        // padding: 12,
                        boxShadow: "none",
                        borderRadius: 0,
                        backgroundColor: `var(--bg-poke-color-light-${pokemon.types[0].type.name})`,
                    }}
                    title={titleCard}
                    extra={
                        <img
                            style={{
                                width: 50,
                                borderRadius: 100,
                            }
                            }
                            alt={pokemon.types.map(t => t.type.name).join(', ')}
                            src={searchIcon(pokemon.types[0].type.name)}
                        />
                    }
                    headStyle={{ background: `var(--bg-poke-color-dark-${pokemon.types[0].type.name})`, borderRadius: 0, }}
                    // extra={<Button type="primary">Details</Button>}
                    cover={
                        // <img
                        //     alt="example"
                        //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        // />
                        <div style={{
                            height: 80,
                            // width: "100%",
                            backgroundColor: `var(--bg-poke-color-dark-${pokemon.types[0].type.name})`,
                            fontSize: 30,
                            // paddingTop: 20
                        }}
                        >
                        </div >
                    }
                // actions={
                //     [
                //         <SettingOutlined key="setting" />,
                //         <EditOutlined key="edit" />,
                //         <StarOutlined key="StarOutlined" />,
                //     ]}
                >
                    <Meta
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        avatar={
                            <Avatar
                                size={180}
                                style={{
                                    marginTop: -100,
                                    marginBottom: 15,
                                    backgroundColor: 'white'
                                }}
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                            />
                        }
                        title={<h2 style={{ textAlign: 'center', marginBottom: '-8px' }}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>}
                        description={<p><b>Base Experience:</b> {pokemon.base_experience} <br /> <b>Types:</b> {pokemon.types.map(t => t.type.name).join(', ')}</p>}
                    />

                    <div style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                        marginTop: 30
                    }}>
                        <div style={{ flex: "auto", display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <h3 style={{}}>Abilities</h3>
                            {pokemon.abilities.map(a =>
                                <li key={a.id}>- {a.ability.name}</li>
                            )}

                            {/* <p>chlorophyll</p> */}
                        </div>
                        <div style={{
                            flex: 4
                            // width: 170
                        }}>
                            {pokemon.stats.map(s =>
                                <div id={s.id}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <p style={{ marginBottom: "-0.5em", fontSize: "smaller", fontWeight: "bold" }}>{s.stat.name}</p>
                                    <Progress style={{ marginBottom: 0 }} percent={s.base_stat} size="small"
                                        strokeColor={getColorByStat(s.stat.name)}>
                                    </Progress>
                                </div>
                            )}
                        </div>
                    </div>


                </CardWrap >
            }
        </>

    );
}

const CardWrap = styled(Card)`
  .ant-card-head-wrapper {
    margin-top: 15px;
  }

`;