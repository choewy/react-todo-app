import { useState, useEffect } from "react";
import { MdCancel, MdCheck, MdDelete, MdEdit } from "react-icons/md";
import { useTodoDispatch } from "../../context/TodoContext"
import { googleSheetDeleteTodo, googleSheetDoneTodo, googleSheetEditTodo } from "../../util/googlesheets";

const TodoBody = ({ props }) => {

    const dispatch = useTodoDispatch();

    const [todo, setTodo] = useState({});
    const [text, setText] = useState('');
    const [disabled, setDisabled] = useState(true);

    const { setSpinner } = props;

    useEffect(() => {
        setTodo(props.todo);
        setText(props.todo.text);
    }, [props]);

    const onCheck = async () => {
        setSpinner(true);

        const groupId = props.groupId;
        const todoId = todo.id;
        const done = !todo.done;

        await googleSheetDoneTodo(groupId, todoId, done)
            .then(() => {
                dispatch({ type: 'todo_check', groupId: props.groupId, todoId, done });
            })
            .catch(error => console.log(error));

        setSpinner(false);
    }

    const onText = async (event) => {
        event.preventDefault();

        if (text !== todo.title) {
            setSpinner(true);

            const groupId = props.groupId;
            const todoId = todo.id;

            await googleSheetEditTodo(groupId, todoId, text)
                .then(() => {
                    dispatch({ type: 'todo_edit', groupId, todoId, text })
                })
                .catch(error => console.log(error));
        };

        setDisabled(true);
        setSpinner(false);
    };

    const onCancel = () => {
        if (text !== todo.text) {
            setText(todo.text);
        };

        setDisabled(true);
    };

    const onDelete = async () => {
        setSpinner(true);

        const groupId = props.groupId;
        const todoId = todo.id;

        await googleSheetDeleteTodo(groupId, todoId)
            .then(() => {
                dispatch({ type: "todo_delete", groupId, todoId });
            })
            .catch(error => console.log(error));

        setSpinner(false);
    };

    return (
        <div className="todo-body" done={todo.done ? 'true' : 'false'}>
            <div className="todo-check" onClick={onCheck} >
                <MdCheck />
            </div>
            <form className="todo-body-form" onSubmit={onText}>
                <input type='text' value={text} onChange={(event) => setText(event.target.value)} disabled={disabled} />
            </form>
            <div className="todo-body-bottons">
                {
                    disabled
                        ? (
                            <>
                                <div className="todo-body-icon" onClick={() => setDisabled(false)}>
                                    <MdEdit />
                                </div>
                                <div className="todo-body-icon" onClick={onDelete}>
                                    <MdDelete />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="todo-body-icon" onClick={onText}>
                                    <MdCheck />
                                </div>
                                <div className="todo-body-icon" onClick={onCancel}>
                                    <MdCancel />
                                </div>
                            </>
                        )
                }
            </div>
        </div>);
};

export default TodoBody;