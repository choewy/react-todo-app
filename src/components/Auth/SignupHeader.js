import React from 'react';
import styled from 'styled-components';

const SignupHeaderWrapper = styled.div`
    padding-top: 24px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e9ecef;

    h1 {
        margin: 0;
        font-size: 36px;
        color: #343a40;
        text-align: center;
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

const SignupHeader = () => {
    return (
        <SignupHeaderWrapper>
            <h1>회원가입</h1>
        </SignupHeaderWrapper>
    )
}

export default SignupHeader;