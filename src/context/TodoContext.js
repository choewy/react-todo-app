import { createContext, useContext, useReducer } from "react";

const init = [];

const reducer = (state, action) => {
    switch (action.type) {
        case "get":
            return action.groups;
        case "group_append":
            return [...state, action.group];
        case "group_change":
            return state;
        case "group_remove":
            return state;
        case "todo_append":
            return state;
        case "todo_change":
            return state;
        case "todo_done":
            return state;
        case "todo_remove":
            return state;
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