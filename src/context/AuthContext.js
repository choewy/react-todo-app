import { createContext, useContext, useReducer } from "react";
import { localStorageGetAuth, localStorageRemoveAuth, localStorageRemoveSave, localStorageSetAuth, localStorageSetSave } from "../util/localstorage";

const init = localStorageGetAuth();

const reducer = (state, action) => {
    switch (action.type) {
        case "login":
            if (action.check) localStorageSetSave(action.auth.email)
            else localStorageRemoveSave();
            return localStorageSetAuth(action.auth);
        case "signup":
            localStorageSetSave(action.auth.email);
            return localStorageSetAuth(action.auth);
        case "logout":
            return localStorageRemoveAuth();
        default:
            return state;
    };
};

const context = createContext();
const dispatcher = createContext();

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, init);

    return (
        <context.Provider value={state}>
            <dispatcher.Provider value={dispatch}>
                {children}
            </dispatcher.Provider>
        </context.Provider>
    );
};

export const useAuthState = () => {
    return useContext(context);
};

export const useAuthDispatch = () => {
    return useContext(dispatcher);
};