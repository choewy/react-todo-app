import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TodoHeaderWrapper = styled.div`
    padding-top: 24px;
    padding-left: 20px;
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
`
const TodoBackLink = styled(Link)`
    display: grid;
    place-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #ffffff;
    color: #000000;
    font-size: 20px;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    margin-right: 20px;
`

const TodoHeader = ({ title }) => {
    return (
        <TodoHeaderWrapper>
            <TodoBackLink to="/todo/groups/">
                <MdArrowBack />
            </TodoBackLink>
            <h1>{title}</h1>
        </TodoHeaderWrapper>
    )
}

export default TodoHeader