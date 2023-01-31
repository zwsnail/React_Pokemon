import { render } from "@testing-library/react";
import { Card, Image, Avatar, Modal, Progress } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, StarOutlined } from '@ant-design/icons';
import { searchIcon } from '../utils/search-icon';
import styled from 'styled-components';

const { Meta } = Card;

export const PokemonModal = (props) => {

    const pokemon = props.selectedPokemon ?? '';
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

    return (

        <>
            {(pokemon && pokemon.id && pokemon.types && pokemon.name && pokemon.abilities && pokemon.stats && pokemon.name) &&
                <CardWrap
                    bordered={false}
                    hoverable={true}
                    style={{
                        boxShadow: "none",
                        borderRadius: 0,
                        backgroundColor: `var(--bg-poke-color-light-${pokemon.types[0].type.name})`,
                    }}
                    title={titleCard}
                    extra={
                        <img
                            style={{
                                maxWidth: 50,
                                borderRadius: 100,
                            }}
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
                        <div className="coverWrapper" style={{ backgroundColor: `var(--bg-poke-color-dark-${pokemon.types[0].type.name})` }} >
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
                                size={{
                                    xs: 120,
                                    sm: 180,
                                    md: 180,
                                    lg: 180,
                                    xl: 180,
                                    xxl: 180,
                                }}
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

                    <ProgressAbilityDiv>
                        <div className="abilityWrapper">
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
                    </ProgressAbilityDiv>


                </CardWrap >
            }
        </>

    );
}

const CardWrap = styled(Card)`

    .ant-card-head-wrapper {
        margin-top: 15px;
    }

  .coverWrapper {
    height: 80px;
    }

`;

const ProgressAbilityDiv = styled.div`
     display: flex;
     flex-direction: row;
     justify-content: space-between;
     margin-top: 30;

    .abilityWrapper {
         flex: auto; 
         display: flex;
         flex-direction: column;
         align-items: flex-start; 
    }
    

    @media screen and (max-width: 575px) {
        display: flex;
        flex-direction: column;

        .abilityWrapper {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
        }
    }
`;
