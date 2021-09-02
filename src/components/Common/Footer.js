import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.div`
    display: grid;
    place-items: center;
    margin-top: auto;
    padding: 50px 0;
    font-size: 15px;
    text-align: center;
    line-height: 1.5;
    
    @media (max-width: 768px) {
        font-size: 13px;
    }
`

const Footer = () => {
    return (
        <FooterWrapper>
            <p>HYCU 컴퓨터공학과 (H201803138 최원영) 졸업작품 😎</p>
        </FooterWrapper>
    )
}

export default Footer;
