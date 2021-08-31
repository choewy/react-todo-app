import React, { useContext, createContext, useReducer } from 'react';
import { v4 } from 'uuid';

const initTodos = [];

function Reducer(state, action) {
    switch (action.type) {
        case "INIT":
            return action.groups

        case "GROUP_APPEND":
            const group = {
                id: `G-${v4()}`,
                title: action.title,
                todos: []
            }
            return state.concat(group)

        case "GROUP_CHANGE":
            return state

        case "GROUP_REMOVE":
            return state

        case "TODO_APPEND":
            const todo = {
                id: `T-${v4()}`,
                text: action.text,
                done: false
            }

            return state.map(group => {
                if (group.id === action.group_id) {
                    group.todos = [...group.todos, todo]
                }
                return group
            })
        case "TODO_CHECK":
            return state.map(group => {
                if (group.id === action.group_id) {
                    group.todos.map(todo => {
                        if (todo.id === action.todo_id) {
                            todo.done = !todo.done
                        }
                        return todo
                    })
                }
                return group
            });
        case "TODO_REMOVE":
            return state.map(group => {
                if (group.id === action.group_id) {
                    group.todos.forEach((todo, index) => {
                        if (todo.id === action.todo_id) {
                            group.todos.splice(index, 1)
                            return
                        }
                    })
                }
                return group
            });
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();

export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(Reducer, initTodos);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                {children}
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

export function useTodoState() {
    const context = useContext(TodoStateContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export const useTodoDispatch = () => {
    const context = useContext(TodoDispatchContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}