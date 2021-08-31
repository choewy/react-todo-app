import React, { createContext, useContext, useReducer } from 'react';
import { getLocalAuth, removeLocalAuth, removeLocalSave, setLocalAuth, setLocalSave } from '../util/storage';

const initAuth = getLocalAuth();

function Reducer(state, action) {
    switch (action.type) {
        case "AUTH_LOGIN":
            setLocalAuth(action.auth);
            if (action.check) setLocalSave(action.auth.email)
            else removeLocalSave();
            return action.auth;

        case "AUTH_SIGNUP":
            setLocalAuth(action.auth);
            return action.auth;

        case "AUTH_LOGOUT":
            removeLocalAuth();
            return null;

        case "AUTH_REMOVE":
            // {uuid, }
            return state;

        case "AUTH_CHANGE":
            // {uuid, auth}
            return state;

        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(Reducer, initAuth);
    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}

export const useAuthState = () => {
    return useContext(AuthStateContext);
}

export const useAuthDispatch = () => {
    return useContext(AuthDispatchContext);
}