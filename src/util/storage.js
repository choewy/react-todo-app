const AUTH_KEY = "react-todo-app-auth";
const AUTO_SAVE = "react-todo-app-auto-save"

const stringfy = (object) => {
    return JSON.stringify(object);
}

const parse = (string) => {
    return JSON.parse(string);
}

export const getLocalAuth = () => {
    return parse(localStorage.getItem(AUTH_KEY));
}

export const setLocalAuth = (auth) => {
    localStorage.setItem(AUTH_KEY, (stringfy(auth)));
    return auth;
}

export const removeLocalAuth = () => {
    localStorage.removeItem(AUTH_KEY);
    return null;
}

export const setLocalAutoSave = (email) => {
    localStorage.setItem(AUTO_SAVE, stringfy(email));
    return email;
}

export const getLocalAutoSave = () => {
    return parse(localStorage.getItem(AUTO_SAVE));
}

export const removeLocalAutoSave = () => {
    localStorage.removeItem(AUTO_SAVE);
    return null;
}