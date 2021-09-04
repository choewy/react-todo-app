import React, { useState } from 'react';
import { MdAdd, MdSend } from 'react-icons/md';
import styled, { css } from 'styled-components';
import { useTodoDispatch } from '../../context/TodoContext';
import { v4 } from 'uuid';
import { appendGroupInGoogleSheet } from '../../util/google.sheets';
import { useAuthState } from '../../context/AuthContext';
import Spinner from '../Common/Spinner';

const GroupAppendForm = styled.form`
    background: #f8f9fa;
    padding-left: 32px;
    padding-top: 32px;
    padding-right: 32px;
    padding-bottom: 72px;

    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top: 1px solid #e9ecef;

    align-items: center;
    justify-content: center;
    display: flex;
`;

const GroupAppendInput = styled.input`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 100%;
    outline: none;
    font-size: 18px;
    box-sizing: border-box;

    @media (max-width: 768px) {
        font-size: 15px;
    }
`;

const GroupAppendButton = styled.button`
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

const GroupAppendSubmitButton = styled.button`
    border: 1px solid #dee2e6;
    border-radius: 4px;
    font-size: 25px;
    background-color: #38d9a9;
    padding: 5px;
    padding-top: 10px;
    cursor: pointer;
    width: 60px;
    &:hover {
        background: #63e6be;
    }
`

const GroupAppend = () => {
    const auth = useAuthState();
    const dispatch = useTodoDispatch();

    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);

    const [loader, setLoader] = useState(false);

    const onAppend = async (event) => {
        event.preventDefault();

        if (title) {
            setLoader(true);

            const group = {
                id: `G-${v4()}`,
                title,
                uuid: auth.uuid
            };

            await appendGroupInGoogleSheet(group)
                .then(() => {
                    dispatch({
                        type: "GROUP_APPEND",
                        group
                    })
                    setTitle('');
                })
                .catch(error => {
                    console.log(error)
                });

            setLoader(false);
        }

    }

    return (
        <>{
            open && (
                <GroupAppendForm onSubmit={onAppend}>
                    {
                        loader
                            ? (
                                <Spinner
                                    width={30}
                                    height={30}
                                    type="Oval"
                                    color="#3d66ba"
                                />
                            ) : (
                                <>
                                    <GroupAppendInput
                                        autoFocus
                                        placeholder="새 그룹 입력"
                                        value={title}
                                        onChange={event => setTitle(event.target.value)}
                                    />
                                    <GroupAppendSubmitButton type="submit">
                                        <MdSend />
                                    </GroupAppendSubmitButton>
                                </>
                            )
                    }
                </GroupAppendForm>
            )
        }
            <GroupAppendButton open={open} onClick={() => setOpen(!open)}>
                <MdAdd />
            </GroupAppendButton>
        </>
    )
}

export default GroupAppend;