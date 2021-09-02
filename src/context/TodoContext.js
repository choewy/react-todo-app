import React, { useContext, createContext, useReducer } from 'react';

const initTodos = [];

function Reducer(state, action) {
    switch (action.type) {
        case "INIT":
            return action.groups

        case "GROUP_APPEND":
            return state.concat({
                ...action.group,
                todos: []
            });

        case "GROUP_CHANGE":
            return state.map((group) => group.id === action.group_id ? { ...group, title: action.editTitle } : group)

        case "GROUP_REMOVE":
            return state.filter((group) => group.uuid === action.uuid && group.id !== action.group_id)

        case "TODO_APPEND":
            return state.map(group => {
                if (group.uuid === action.uuid && group.id === action.group_id) {
                    group.todos.push(action.todo)
                }
                return group
            })
        case "TODO_CHANGE":
            return state.map(group => {
                if (group.id === action.group_id) {
                    group.todos.map(todo => {
                        if (todo.id === action.todo_id) {
                            todo.text = action.editText
                        }
                        return todo
                    })
                }
                return group
            });
        case "TODO_DONE":
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