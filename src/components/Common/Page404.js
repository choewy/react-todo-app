import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
    width: 768px;
    height: 100vh;

    background: white;
    border-radius: 16px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

    margin: 0 auto;

    margin-top: 15px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        width: 100%;
    }
`

const Header = styled.div`
    font-size: 50px;
    font-weight: 800;

    @media (max-width: 768px) {
        font-size: 25px;
    }
`

const Description = styled.div`
    margin-top: 20px;
    font-size: 25px;
    text-align: center;
    line-height: 1.3;

    @media (max-width: 768px) {
        font-size: 20px;
    }
`

const Page404 = () => {
    return (
        <Wrapper>
            <Header>404 : Page Not Found</Header>
            <Description>요청하신 페이지를 찾을 수 없습니다.</Description>
        </Wrapper>
    )
}

export default Page404;