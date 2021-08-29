import React, { useState } from 'react';

const EditButton = ({ disabled, setDisabled, saveTodo }) => {
    const handleEditMode = () => {
        setDisabled(false);
    }

    const handleRemove = () => {
        console.log("삭제할건지 물어보고 삭제")
    }

    const handleComplete = () => {
        saveTodo();
    }

    const handleCancel = () => {
        setDisabled(true);
    }

    return (
        disabled
            ? (
                <>
                    <button onClick={handleEditMode}>수정</button>
                    <button onClick={handleRemove}>삭제</button>
                </>
            )
            : (
                <>
                    <button onClick={handleComplete}>완료</button>
                    <button onClick={handleCancel}>취소</button>
                </>
            )
    )
}

const TodoItem = ({ index, todo, updateGroup }) => {
    const [done, setDone] = useState(todo.done)
    const [text, setText] = useState(todo.text)
    const [description, setDescriptioin] = useState(todo.description)
    const [disabled, setDisabled] = useState(true);

    const changeDone = () => {
        todo.done = !todo.done;
        updateGroup(index, todo);
        setDone(!done);
    }

    const saveTodo = () => {
        todo.text = text;
        todo.description = description;
        updateGroup(index, todo);
        setDisabled(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        saveTodo();
    }

    const textareaKeyPress = (event) => {
        if (event.which === 13 && !event.shiftKey) {
            event.preventDefault();
            saveTodo();
        }
    }

    return (
        <div className="todo-item">
            <form className="todo-item-form" onSubmit={handleSubmit}>
                <div className="todo-item-inputs">
                    <input
                        type="checkbox"
                        checked={done}
                        onChange={changeDone}
                    />
                    <input
                        type="text"
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                        disabled={disabled}
                    />
                </div>
                <div className="todo-item-textarea">
                    <textarea
                        type="text"
                        value={description}
                        onChange={(event) => setDescriptioin(event.target.value)}
                        onKeyPress={textareaKeyPress}
                        disabled={disabled}
                    />
                </div>
            </form>
            <EditButton
                disabled={disabled}
                setDisabled={setDisabled}
                saveTodo={saveTodo}
            />
        </div>
    )
}

export default TodoItem;