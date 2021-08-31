import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TodoTitleWrapper = styled.div`
padding-top: 24px;
padding-left: 20px;
padding-right: 32px;
padding-bottom: 24px;
border-bottom: 1px solid #e9ecef;

h1 {
    margin: 0;
    font-size: 36px;
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

display: flex;
`
const BackLink = styled(Link)`
`

const TodoTitle = ({ title }) => {
    return (
        <TodoTitleWrapper>

            <BackLink to="/todo/groups/">
                <MdArrowBack />
            </BackLink>

            <h1>{title}</h1>
        </TodoTitleWrapper>
    )
}

export default TodoTitle