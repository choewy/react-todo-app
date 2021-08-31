import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete, MdEdit, MdSave, MdCancel } from 'react-icons/md'
import { useTodoDispatch } from '../../context/TodoContext';

const RemoveButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 19px;
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
    font-size: 19px;
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
    font-size: 19px;
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
    font-size: 19px;
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

const TodoCheckBox = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 16px;
    border: 1px solid #ced4da;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
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
    font-size: 16px;
    color: #495057;
    ${props =>
        props.done &&
        css`
            color: #ced4da;
        `
    }
`;

const TodoForm = styled.form`
    flex: 1; 
`

const TodoInput = styled.input`
    width: 100%;
    font-size: 16px;
    color: #495057;
`;

const TodoItem = ({ group_id, todo_id, text, done }) => {

    const dispatch = useTodoDispatch();

    const [edit, setEdit] = useState(false);
    const [editText, setEditText] = useState(text);

    const onCheck = () => dispatch({ type: "TODO_CHECK", group_id, todo_id })
    const onTextChange = (event) => setEditText(event.target.value)

    const onEdit = () => setEdit(true);
    const onRemove = () => dispatch({ type: "TODO_REMOVE", group_id, todo_id })
    const onSave = (event) => {
        event.preventDefault();
        // dispatch({ type: "EDIT_TODO", group_id, todo_id, editText })
        setEdit(false);
    }
    const onCancel = () => {
        setEditText(text);
        setEdit(false);
    }

    return (
        <TodoItemWapper>
            <TodoCheckBox done={done} onClick={onCheck}>
                {done && <MdDone />}
            </TodoCheckBox>
            {
                edit
                    ? (
                        <TodoForm onSubmit={onSave}>
                            <TodoInput type="text" value={editText} onChange={onTextChange} />
                        </TodoForm>
                    )
                    : <TodoText done={done}>{text}</TodoText>

            }
            {
                edit
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
                            <EditButton onClick={onEdit}>
                                <MdEdit />
                            </EditButton>
                            <RemoveButton onClick={onRemove}>
                                <MdDelete />
                            </RemoveButton>
                        </>
                    )
            }
        </TodoItemWapper>
    )
}

export default TodoItem;