import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.div`
    display: grid;
    margin-top: auto;
    padding: 50px 0;
    font-size: 15px;
    text-align: center;
    line-height: 1.8;
    place-content: center;

    @media (max-width: 768px) {
        font-size: 13px;
    }
`

const Footer = () => {
    return (
        <FooterWrapper>
            푸터
        </FooterWrapper>
    )
}

export default Footer;
