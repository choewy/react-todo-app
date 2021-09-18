import { useState, useEffect } from "react";
import { MdCancel, MdCheck, MdDelete, MdEdit } from "react-icons/md";
import { useAppDispatch } from "../../context/AppContext";
import { useTodoDispatch } from "../../context/TodoContext";
import { googleSheetDeleteGroup, googleSheetEditGroup } from "../../util/googlesheets";

const TodoHeader = ({ props }) => {
    const appDispatch = useAppDispatch();
    const todoDispatch = useTodoDispatch();

    const [group, setGroup] = useState({});
    const [title, setTitle] = useState('');
    const [disabled, setDisabled] = useState(true);

    const { setSpinner } = props;

    useEffect(() => {
        setGroup(props.group);
        setTitle(props.group.title);
    }, [props]);

    const onTitle = async (event) => {
        event.preventDefault();

        if (title !== group.title) {
            setSpinner(true);
            const groupId = group.id;
            await googleSheetEditGroup(groupId, title)
                .then(() => {
                    todoDispatch({ type: 'group_edit', groupId, title });
                })
                .catch(error => console.log(error));
            setSpinner(false);
        }

        setDisabled(true);
    };

    const onCancel = () => {
        if (title !== group.title) {
            setTitle(group.title);
        }

        setDisabled(true);
    }

    const onDelete = async () => {
        setSpinner(true);
        const groupId = group.id;
        await googleSheetDeleteGroup(groupId)
            .then(() => {
                todoDispatch({ type: 'group_delete', groupId });
            })
            .catch(error => console.log(error));
        setSpinner(false);
        appDispatch({ type: 'show_aside' });
    };

    return (
        <div className="todo-header" mode={disabled ? 'none' : 'edit'}>
            <form className="todo-header-form" onSubmit={onTitle}>
                <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} disabled={disabled} />
            </form>
            <div className="todo-header-buttons">
                {
                    disabled
                        ? (<>
                            <div className="todo-header-icon" onClick={() => setDisabled(false)}>
                                <MdEdit />
                            </div>
                            <div className="todo-header-icon" onClick={onDelete}>
                                <MdDelete />
                            </div>
                        </>) : (<>
                            <div className="todo-header-icon" onClick={onTitle}>
                                <MdCheck />
                            </div>
                            <div className="todo-header-icon" onClick={onCancel}>
                                <MdCancel />
                            </div>
                        </>
                        )
                }
            </div>
        </div>
    )
}

export default TodoHeader;