import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';


const TodoListWrapper = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
`

const TodoList = ({ group_id, todos }) => {
    return (
        <TodoListWrapper>
            {
                todos.map((todo, index) => (
                    <TodoItem
                        key={index}
                        group_id={group_id}
                        todo_id={todo.id}
                        text={todo.text}
                        done={todo.done}
                    />
                ))
            }
        </TodoListWrapper>
    )
}

export default TodoList;