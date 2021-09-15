import { useAuthState } from "../context/AuthContext"
import { useTodoState } from "../context/TodoContext";
import queryString from 'query-string';
import { useState } from "react/cjs/react.development";
import { MdEdit, MdDelete, MdCheck, MdCancel } from "react-icons/md";
import { useCallback, useEffect } from "react";
import NotFoundPage from "./NotFoundPage";
import TodoList from "../component/todo/TodoItem";

const TodoPage = ({ location }) => {
    const auth = useAuthState();
    const query = queryString.parse(location.search);
    const groups = useTodoState();

    const [group, setGroup] = useState(null);
    const [title, setTitle] = useState('');
    const [disabled, setDisabled] = useState(true);

    const fetchGroup = useCallback((isMounted) => {
        const _group = groups.filter(group => group.uuid === auth.uuid && group.id === query.groupId)[0];
        if (_group !== undefined && isMounted) {
            setTitle(_group.title);
            setGroup(_group);
            console.log('fetchGroup');
        }
    }, [query, groups, auth])

    useEffect(() => {
        let isMounted = true;

        fetchGroup(isMounted);

        return () => {
            isMounted = false;
        }
    }, [fetchGroup]);

    const onEdit = () => {
        setDisabled(false);
    }

    const onCancel = () => {
        setDisabled(true);
    }

    return (
        <div className="page">
            {
                group === null
                    ? <NotFoundPage />
                    : <div className="todo-group">
                        <div className="group-title">
                            <input value={title} onChange={(event) => setTitle(event.target.value)} disabled />
                        </div>
                        {
                            disabled
                                ?
                                <div className="group-icons">
                                    <div className="group-icon" onClick={onEdit}>
                                        <MdEdit />
                                    </div>
                                    <div className="group-icon">
                                        <MdDelete />
                                    </div>
                                </div>
                                :
                                <div className="group-icons">
                                    <div className="group-icon">
                                        <MdCheck />
                                    </div>
                                    <div className="group-icon" onClick={onCancel}>
                                        <MdCancel />
                                    </div>
                                </div>
                        }

                        <TodoList group={group} />
                    </div>
            }
        </div>
    )
}

export default TodoPage;