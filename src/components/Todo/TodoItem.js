import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete, MdEdit, MdSave, MdCancel } from 'react-icons/md'
import { useTodoDispatch } from '../../context/TodoContext';
import { doneTodoInGoogleSheet, editTodoTextInGoogleSheet, removeTodoFromGoogleSheet } from '../../util/google.sheets';
import { useAuthState } from '../../context/AuthContext';
import Spinner from '../Common/Spinner';

const TodoButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;

    div {
        font-size: 19px;

        @media (max-width: 768px) {
            font-size: 15px;
        }
    }
`

const RemoveButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    cursor: pointer;
    margin-left: 10px;

    &:hover {
        color: #ff6b6b;
    }

    display: none;
`;

const EditButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    cursor: pointer;
    margin-left: 10px;

    &:hover {
        color: #ff6b6b;
    }

    display: none;
`;

const SaveButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    cursor: pointer;
    margin-left: 10px;

    &:hover {
        color: #ff6b6b;
    }
`;

const CancelButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    cursor: pointer;
    margin-left: 10px;

    &:hover {
        color: #ff6b6b;
    }
`;

const TodoItemWapper = styled.div`
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
    &:hover {
        ${EditButton},
        ${RemoveButton} {
            display: initial;
        }
    }
`

const TodoCheckBoxWrapper = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`

const TodoCheckBox = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 16px;
    border: 1px solid #ced4da;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    ${props =>
        props.done &&
        css`
            border: 1px solid #38d9a9;
            color: #38d9a9;
        `
    }
`;

const TodoText = styled.div`
    flex: 1;
    font-size: 20px;
    color: #495057;
    ${props =>
        props.done &&
        css`
            color: #ced4da;
        `
    }

    @media (max-width: 768px) {
        font-size: 15px;
    }
`;

const TodoForm = styled.form`
    flex: 1;
    display: flex;
    justify-content: center;
    font-size: 20px;
`

const TodoInput = styled.input`
    width: 100%;
    color: #495057;
    font-size: 20px;

    @media (max-width: 768px) {
        font-size: 15px;
    }
`;

const TodoItem = ({ group_id, todo_id, text, done }) => {
    const auth = useAuthState();
    const dispatch = useTodoDispatch();
    const [editText, setEditText] = useState(text);

    const onTextChange = (event) => { setEditText(event.target.value) }
    const onEditable = () => setEditable(true);

    const [editable, setEditable] = useState(false);
    const [disable, setDisable] = useState(false);
    const [loader, setLoader] = useState(false);
    const [checking, setChecking] = useState(false);

    const onDone = async () => {
        const uuid = auth.uuid;

        setChecking(true);

        await doneTodoInGoogleSheet(uuid, group_id, todo_id, !done)
            .then(() => dispatch({ type: "TODO_DONE", group_id, todo_id }))
            .catch(error => console.log(error))

        setChecking(false);
    }

    const onRemove = async () => {
        const uuid = auth.uuid;

        setDisable(true);
        setLoader(true);

        await removeTodoFromGoogleSheet(uuid, group_id, todo_id)
            .then(() => {
                setDisable(false);
                setLoader(false);
                dispatch({ type: "TODO_REMOVE", group_id, todo_id })
            })
            .catch(error => {
                setDisable(false);
                setLoader(false);
                console.log(error);
            });
    }

    const onSave = async (event) => {
        event.preventDefault();


        if (text !== editText) {
            const uuid = auth.uuid;

            setDisable(true);
            setLoader(true);

            await editTodoTextInGoogleSheet(uuid, group_id, todo_id, editText)
                .then(() => {
                    dispatch({ type: "TODO_CHANGE", group_id, todo_id, editText })
                    setEditable(false);
                })
                .catch(error => console.log(error));

            setLoader(false);
            setDisable(false);
        }
    }

    const onCancel = () => {
        setEditText(text);
        setEditable(false);
    }

    return (
        <TodoItemWapper>
            <TodoCheckBoxWrapper>
                {
                    checking
                        ? (
                            <Spinner
                                width={20}
                                height={20}
                                type="Oval"
                                color="#3d66ba"
                            />
                        ) : (
                            <TodoCheckBox done={done} onClick={onDone}>
                                {done && <MdDone />}
                            </TodoCheckBox>
                        )
                }
            </TodoCheckBoxWrapper>

            {
                editable
                    ? (
                        <TodoForm onSubmit={onSave}>
                            <TodoInput type="text" value={editText} onChange={onTextChange} disabled={disable} autoFocus />
                        </TodoForm>
                    )
                    : <TodoText done={done}>{text}</TodoText>

            }

            <TodoButtonWrapper>
                {
                    loader
                        ? (
                            <Spinner
                                width={20}
                                height={20}
                                type="Oval"
                                color="#3d66ba"
                            />
                        ) : (
                            <>
                                {
                                    editable
                                        ? (
                                            <>
                                                <SaveButton onClick={onSave}>
                                                    <MdSave />
                                                </SaveButton>
                                                <CancelButton onClick={onCancel}>
                                                    <MdCancel />
                                                </CancelButton>
                                            </>
                                        ) : (
                                            <>
                                                <EditButton onClick={onEditable}>
                                                    <MdEdit />
                                                </EditButton>
                                                <RemoveButton onClick={onRemove}>
                                                    <MdDelete />
                                                </RemoveButton>
                                            </>
                                        )
                                }
                            </>
                        )
                }
            </TodoButtonWrapper>
        </TodoItemWapper>
    )
}

export default TodoItem;