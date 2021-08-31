import React from 'react';
import TodoAppend from './TodoAppend';
import { useTodoState } from '../../context/TodoContext';
import TodoList from './TodoList';
import TodoNotFound from './TodoNotFound';
import TodoTitle from './TodoTitle';
import queryString from 'query-string';


const TodoTemplate = ({ location }) => {
    const query = queryString.parse(location.search);
    const group_id = query.group_id;
    const group = useTodoState().filter(group => group.id === group_id)[0];
    return (
        <>
            {
                group === undefined
                    ? <TodoNotFound />
                    : (
                        <>
                            <TodoTitle title={group.title} />
                            <TodoList group_id={group_id} todos={group.todos} />
                            <TodoAppend group_id={group_id} />
                        </>
                    )
            }
        </>
    )
}

export default TodoTemplate;