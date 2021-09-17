import { createContext, useContext, useReducer } from "react";

const init = [];

const reducer = (state, action) => {
    switch (action.type) {
        case "get":
            return action.groups;

        case "group_append":
            return [...state, action.group];

        case "group_edit":
            return state.map(group => group.id === action.groupId
                ? { ...group, title: action.title }
                : group);

        case "group_delete":
            return state.filter(group => group.id !== action.groupId);

        case "todo_append":
            return state.map(group => group.id === action.groupId ? { ...group, todos: [...group.todos, action.todo] } : group)

        case "todo_edit":
            return state.map(group => group.id === action.groupId
                ? {
                    ...group, todos: group.todos.map(todo => todo.id === action.todoId
                        ? { ...todo, text: action.text }
                        : todo)
                }
                : group);

        case "todo_check":
            state = state.map(group => group.id === action.groupId
                ? {
                    ...group, todos: group.todos.map(todo => todo.id === action.todoId
                        ? { ...todo, done: action.done }
                        : todo)
                }
                : group);

            return state.map(group => group.id === action.groupId
                ? group.todos.length === 0
                    ? { ...group, state: "new" }
                    : group.todos.filter(todo => todo.done === false).length > 0
                        ? { ...group, state: "ing" }
                        : { ...group, state: "done" }
                : group);

        case "todo_delete":
            state = state.map(group => group.id === action.groupId
                ? { ...group, todos: group.todos.filter(todo => todo.id !== action.todoId) }
                : group);

            return state.map(group => group.id === action.groupId
                ? group.todos.length === 0
                    ? { ...group, state: "new" }
                    : group.todos.filter(todo => todo.done === false).length > 0
                        ? { ...group, state: "ing" }
                        : { ...group, state: "done" }
                : group);

        default:
            return state;
    }
};

const context = createContext();
const dispatcher = createContext();

export const TodoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, init);

    return (
        <context.Provider value={state}>
            <dispatcher.Provider value={dispatch}>
                {children}
            </dispatcher.Provider>
        </context.Provider>
    );
};

export const useTodoState = () => {
    return useContext(context);
};

export const useTodoDispatch = () => {
    return useContext(dispatcher);
};