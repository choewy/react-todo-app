import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 768px;
    height: 768px;

    background: white;
    border-radius: 16px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

    margin: 0 auto;

    margin-top: 15px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
`

const Home = () => {
    return (
        <Wrapper>
            홈
        </Wrapper>
    )
}

export default Home;