import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

const HeaderBackground = styled.div`
    width: 100%;
    background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
    color: #ffffff;
`

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 768px;
    height: 150px;
    margin: 0 auto;

    @media (max-width: 768px) {
        width: 100%;
        height: 150px;
        padding: 0 20px;
    }
`

const HeaderTitle = styled.div`
    margin-top: 15px;
    font-size: 35px;
    font-weight: 700;
    text-align: center;
    @media (max-width: 768px) {
        font-size: 25px;
    }
`
const Header = ({ auth }) => {
    return (
        <HeaderBackground>
            <HeaderWrapper>
                <HeaderTitle>
                    😎 H201803138
                </HeaderTitle>
                <Navbar auth={auth} />
            </HeaderWrapper>
        </HeaderBackground>
    )
}

export default Header;
