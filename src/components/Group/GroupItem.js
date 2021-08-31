import React, { useState } from 'react';
import { MdCancel, MdDelete, MdEdit, MdSave } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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

const GroupItemWapper = styled.div`
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
const GroupText = styled.div`
    flex: 1;
    font-size: 16px;
    color: #495057;
`;

const GroupLink = styled(Link)`
    text-decoration: none;
`;

const GroupForm = styled.form`
    flex: 1; {
`

const GroupInput = styled.input`
    width: 100%;
    font-size: 16px;
    color: #495057;
`;

const GroupItem = ({ group_id, title }) => {
    const dispatch = useTodoDispatch();
    const [edit, setEdit] = useState(false);
    const [editTitle, setEditTitle] = useState(title);

    const onTitleChange = (event) => setEditTitle(event.target.value)
    const onEdit = () => setEdit(true);
    const onRemove = () => dispatch({ type: "GROUP_REMOVE", group_id })
    const onSave = (event) => {
        event.preventDefault();
        setEdit(false);

    }
    const onCancel = () => {
        setEditTitle(title);
        setEdit(false);
    }

    return (
        <GroupItemWapper>
            {
                edit
                    ? (
                        <GroupForm>
                            <GroupInput type="text" value={editTitle} onChange={onTitleChange} />
                        </GroupForm>
                    ) : (
                        <GroupText>
                            <GroupLink

                                to={`/todo/?group_id=${group_id}`}
                            >
                                {title}
                            </GroupLink>
                        </GroupText>
                    )
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
        </GroupItemWapper>
    )
}

export default GroupItem;