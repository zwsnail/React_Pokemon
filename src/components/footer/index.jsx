import styled from 'styled-components';

export const Footer = () => {

    return (
        <FooterDiv>
            <h3>POKEAPI - {new Date().getFullYear()}</h3>
        </FooterDiv>
    );
};

const FooterDiv = styled.div`
    display: block;
    margin-top: auto;
    padding: 12px 0;
    background: #e16e6e;
    text-align: center;
`;