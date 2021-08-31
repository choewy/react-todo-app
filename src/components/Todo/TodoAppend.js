import React, { memo, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import styled, { css } from 'styled-components';
import { useTodoDispatch } from '../../context/TodoContext';

const TodoAppendForm = styled.form`
    background: #f8f9fa;
    padding-left: 32px;
    padding-top: 32px;
    padding-right: 32px;
    padding-bottom: 72px;

    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top: 1px solid #e9ecef;
`;

const TodoAppendInput = styled.input`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 100%;
    outline: none;
    font-size: 18px;
    box-sizing: border-box;
`;

const TodoAppendButton = styled.button`
    background: #38d9a9;

    &:hover {
        background: #63e6be;
    }

    &:active {
        background: #20c997;
    }

    z-index: 5;
    cursor: pointer;
    width: 80px;
    height: 80px;
    display: block;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, 50%);
    color: white;
    border-radius: 50%;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;

    transition: 0.125s all ease-in;
    ${props =>
        props.open &&
        css`
                background: #ff6b6b;
                &:hover {
                    background: #ff8787;
                }

                &:active {
                    background: #fa5252;
                }

                transform: translate(-50%, 50%) rotate(45deg);
            `
    }
`;

const TodoAppend = ({ group_id }) => {
    const dispatch = useTodoDispatch();

    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);

    const onAppend = (event) => {
        event.preventDefault();
        if (text) {
            dispatch({
                type: "TODO_APPEND",
                group_id,
                text
            })
            setText("");
        }

    }

    return (
        <>
            {
                open && (
                    <TodoAppendForm onSubmit={onAppend}>
                        <TodoAppendInput
                            autoFocus
                            placeholder="새로운 할 일 추가"
                            value={text}
                            onChange={event => setText(event.target.value)}
                        />
                    </TodoAppendForm>
                )
            }
            <TodoAppendButton open={open} onClick={() => setOpen(!open)}>
                <MdAdd />
            </TodoAppendButton>
        </>
    )
}

export default memo(TodoAppend);