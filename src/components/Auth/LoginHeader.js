import React from 'react';
import styled from 'styled-components';

const LoginHeaderWrapper = styled.div`
    padding-top: 24px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e9ecef;
    
    h1 {
        margin: 0;
        font-size: 36px;
        text-align: center;
        color: #343a40;
    }
    .day {
        margin-top: 4px;
        color: #868e96;
        font-size: 21px;
    }
    .tasks-left {
        color: #20c997;
        font-size: 18px;
        margin-top: 40px;
        font-weight: bold;
    }
`;

const LoginHeader = () => {
    return (
        <LoginHeaderWrapper>
            <h1>로그인</h1>
        </LoginHeaderWrapper>
    )
}

export default LoginHeader;