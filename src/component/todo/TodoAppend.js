import { useState } from "react"
import { MdKeyboardReturn } from "react-icons/md";
import { useTodoDispatch } from "../../context/TodoContext";
import { googleSheetAppendTodo } from "../../util/googlesheets";

const TodoAppend = ({ props }) => {
    const dispatch = useTodoDispatch();

    const [text, setText] = useState('');

    const { setSpinner } = props;

    const onAppend = async (event) => {
        event.preventDefault();

        if (text !== '') {
            const groupId = props.groupId;
            setSpinner(true);
            await googleSheetAppendTodo(groupId, text)
                .then(todo => {
                    dispatch({ type: 'todo_append', groupId, todo });
                    setText('');
                })
                .catch(error => console.log(error));
        }
        setSpinner(false);
    }

    return (
        <form className="todo-append-form" onSubmit={onAppend}>
            <input placeholder="새 항목을 입력하세요." type="text" value={text} onChange={event => setText(event.target.value)} />
            <button type='submit'>
                <MdKeyboardReturn />
            </button>
        </form>
    )
}

export default TodoAppend;