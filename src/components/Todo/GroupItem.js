import React, { useState } from 'react';
import TodoItem from './TodoItem';

// TODO
/*
    1. 제목 수정, 그룹 삭제 버튼 및 기능 구현
*/

// 새로고침 시 Route state 초기화로 인한 오류 방지
let temp = { uuid: null, group_title: '', group_seq: null, items: [] };

const tempGroup = (group) => {
    if (group) {
        temp = group;
    }
    return temp;
}

const GroupItem = ({ location }) => {
    const [group, setGroup] = useState(tempGroup(location.state));

    const [title, setTitle] = useState(group.group_title);
    const [disabled, setDisabled] = useState(true);
    const [text, setText] = useState('');
    const [description, setDescription] = useState('');

    if (temp.uuid === null) window.location.replace('#/todo/');

    const updateGroup = (index, todo) => {
        const _group = { ...group }
        _group.items[index] = todo;
        console.log(todo)
        setGroup(_group)
    }

    const pushTodo = () => {
        const todo = {
            text,
            description,
            done: false
        }
        const _group = { ...group }
        _group.items.push(todo);
        setGroup(_group);
        setText('');
        setDescription('');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        pushTodo();
    }

    const handleTitleChange = (event) => {
        event.preventDefault();
        setDisabled(true);
    }

    const textareaKeyPress = (event) => {
        if (event.which === 13 && !event.shiftKey) {
            event.preventDefault();
            pushTodo();
        }
    }

    return (
        <div className="group-item">
            <form onSubmit={handleTitleChange}>
                <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} disabled={disabled} />
            </form>
            {
                group.items.map((todo, index) => (
                    <TodoItem key={index} index={index} todo={todo} updateGroup={updateGroup} />
                ))
            }
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                />
                <textarea
                    type="text"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    onKeyPress={textareaKeyPress}
                />
            </form>
        </div>
    )
}

export default GroupItem;