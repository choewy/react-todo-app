const authKey = "react-todo-app-auth";
const saveKey = "react-todo-app-save";

export const localStorageGetAuth = () => {
    return JSON.parse(localStorage.getItem(authKey));
};

export const localStorageSetAuth = (auth) => {
    localStorage.setItem(authKey, JSON.stringify(auth));
    return auth;
};

export const localStorageRemoveAuth = () => {
    localStorage.removeItem(authKey);
    return null;
};

export const localStorageGetSave = () => {
    return JSON.parse(localStorage.getItem(saveKey));
};

export const localStorageSetSave = (auth) => {
    localStorage.setItem(saveKey, JSON.stringify(auth));
    return auth;
};

export const localStorageRemoveSave = () => {
    localStorage.removeItem(saveKey);
    return null;
};