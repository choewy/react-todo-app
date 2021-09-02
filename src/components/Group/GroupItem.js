import React, { useState, memo } from 'react';
import { MdCancel, MdDelete, MdEdit, MdSave } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthState } from '../../context/AuthContext';
import { useTodoDispatch } from '../../context/TodoContext';
import { editGroupTitleInGoogleSheet, removeGroupFromGoogleSheet } from '../../util/google.sheets';
import Spinner from '../Common/Spinner';

const GroupButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
`

const RemoveButton = styled.div`
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
    color: #dee2e6;
    font-size: 19px;
    cursor: pointer;
    margin-left: 10px;

    &:hover {
        color: #ff6b6b;
    }
`;

const CancelButton = styled.div`
    color: #dee2e6;
    font-size: 19px;
    cursor: pointer;
    margin-left: 10px;

    &:hover {x
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
    font-size: 20px;
    color: #495057;
`;

const GroupLink = styled(Link)`
    text-decoration: none;
    color: #495057;
`;

const GroupForm = styled.form`
    flex: 1;
    display: flex;
    justify-content: center;
    font-size: 20px;
`

const GroupInput = styled.input`
    width: 100%;
    font-size: 20px;
    color: #495057;
    margin-left: 5px;
`;

const GroupItem = ({ group_id, title }) => {
    const auth = useAuthState();
    const dispatch = useTodoDispatch();
    const [editTitle, setEditTitle] = useState(title);

    const onTitleChange = (event) => setEditTitle(event.target.value)
    const onEditable = () => setEditable(true);

    const [editable, setEditable] = useState(false);
    const [disable, setDisable] = useState(false);
    const [loader, setLoader] = useState(false);

    const onRemove = async () => {
        const uuid = auth.uuid;

        setDisable(true);
        setLoader(true);
        await removeGroupFromGoogleSheet(uuid, group_id)
            .then(() => {
                setDisable(false);
                setLoader(false);
                dispatch({ type: "GROUP_REMOVE", uuid, group_id })
            })
            .catch(error => {
                setDisable(false);
                setLoader(false);
                console.log(error)
            });
    }

    const onSave = async (event) => {
        event.preventDefault();
        if (title !== editTitle) {
            const uuid = auth.uuid;

            setDisable(true);
            setLoader(true);

            await editGroupTitleInGoogleSheet(uuid, group_id, editTitle)
                .then(() => {
                    dispatch({ type: "GROUP_CHANGE", group_id, editTitle });
                    setEditable(false);
                })
                .catch(error => console.log(error));

            setLoader(false);
            setDisable(false);
        }
    }

    const onCancel = () => {
        setEditTitle(title);
        setEditable(false);
    }

    return (
        <GroupItemWapper>
            {
                editable
                    ? (
                        <GroupForm onSubmit={onSave}>
                            🔗 <GroupInput type="text" value={editTitle} onChange={onTitleChange} disabled={disable} autoFocus />
                        </GroupForm>
                    ) : (
                        <GroupText>
                            <GroupLink
                                to={`/todo/?group_id=${group_id}`}
                            >
                                🔗 {title}
                            </GroupLink>
                        </GroupText>
                    )
            }
            <GroupButtonWrapper>
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
            </GroupButtonWrapper>
        </GroupItemWapper>
    )
}

export default memo(GroupItem);
