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
    flex-direction: row;
    justify-content: left;
    align-items: center;
    width: 768px;
    height: 80px;
    margin: 0 auto;

    @media (max-width: 768px) {
        width: 100%;
        height: 300px;
        padding: 0 20px;
    }

    h1 {
        margin-right: 50px;
        font-size: 35px;
        font-weight: 700;
        text-align: left;
    
        @media (max-width: 768px) {
            font-size: 25px;
        }
    }

    h2 {
        font-size: 20px;
        font-weight: 400;
        text-align: center;

        @media (max-width: 768px) {
            font-size: 15px;
        }
    }
`

const Header = ({ auth }) => {
    return (
        <HeaderBackground>
            <HeaderWrapper>
                <h1>React Todo App</h1>
                <Navbar auth={auth} />
            </HeaderWrapper>
        </HeaderBackground>
    )
}

export default Header;
