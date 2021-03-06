import React from 'react';
import styled from 'styled-components';

const GroupHeaderWrapper = styled.div`
    padding-top: 24px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e9ecef;
    width: 100%;

    h1 {
        margin: 0;
        font-size: 36px;
        text-align: center;
        color: #343a40;

        @media (max-width: 768px) {
            font-size: 20px;
        }
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
`
const GroupHeader = () => {
    return (
        <GroupHeaderWrapper>
            <h1>TODO 그룹</h1>
        </GroupHeaderWrapper>
    )
}

export default GroupHeader;