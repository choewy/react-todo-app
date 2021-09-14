import { GoogleSpreadsheet } from 'google-spreadsheet';
import { sheetId, apiKey } from '../config/googlesheets.json';
import { createSaltkey, encodePassword } from './encode';
import { v4 } from 'uuid';

const doc = new GoogleSpreadsheet(sheetId);
const sheets = {
    user: 'user',
    todo: 'todo',
    home: 'home'
};

const headers = {
    user: ['uuid', 'email', 'name', 'salt', 'password', 'registDate'],
    todo: ['uuid', 'id', 'title', 'todos'],
    home: ['title', 'date', 'content']
};

const today = () => {
    const day = new Date();
    return `${day.getFullYear()}-${('0' + (day.getMonth() + 1)).slice(-2)}-${('0' + day.getDate()).slice(-2)}`
};

const init = async () => {
    await doc.useServiceAccountAuth(apiKey);
    await doc.loadInfo();
};

export const googleSheetAuth = (email) =>
    new Promise(async (resolve, reject) => {
        await init();
        await doc.sheetsByTitle[sheets.user].getRows()
            .then(rows => {
                const row = rows.filter(row => row.email === email);
                if (row.length > 0) {
                    const auth = {};
                    headers.user.map(header => auth[header] = row[0][header]);
                    resolve(auth);
                } else resolve(null)
            })
            .catch(error => reject(error));
    });

export const googleSheetAppendUser = (email, name, password) =>
    new Promise(async (resolve, reject) => {
        const salt = await createSaltkey();
        const auth = {
            uuid: `U-${v4()}`,
            name,
            email,
            salt,
            password: await encodePassword(salt, password),
            registDate: today()
        };
        await init();
        await doc.sheetsByTitle[sheets.user].addRow(auth)
            .then(() => resolve(auth))
            .catch(error => reject(error));
    });

export const googleSheetEditPassword = (uuid, encode) =>
    new Promise(async (resolve, reject) => {
        await init();
        await doc.sheetsByTitle[sheets.user].getRows()
            .then(async rows => {
                let index = null;
                rows.forEach((row, i) => {
                    if (row.uuid === uuid) {
                        index = i;
                        return;
                    };
                });
                rows[index].password = encode;
                await rows[index].save();
                resolve();
            })
            .catch(error => console.log(error));
    });

export const googleSheetGroup = (uuid) =>
    new Promise(async (resolve, reject) => {
        await init();
        await doc.sheetsByTitle[sheets.todo].getRows()
            .then(rows => {
                const row = rows.filter(row => row.uuid === uuid);
                const groups = [];
                row.forEach(row => {
                    const group = [];
                    headers.todo.map(header => header === 'todos'
                        ? group[header] = JSON.parse(row[header])
                        : group[header] = row[header]
                    );
                    groups.push(group);
                });
                resolve(groups);
            })
            .catch(error => reject(error));
    });

export const googleSheetAppendGroup = (group) =>
    new Promise(async (resolve, reject) => {
        await init();
        await doc.sheetsByTitle[sheets.todo].addRow({ ...group, todos: '[]' })
            .then(() => resolve(group))
            .catch(error => reject(error));
    });

export const googleSheetEditGroup = (uuid, groupId, editTitle) =>
    new Promise(async (resolve, reject) => {
        await init();
        await doc.sheetsByTitle[sheets.todo].getRows()
            .then(async groups => {
                let index = null;
                groups.forEach((group, i) => {
                    if (group.uuid === uuid && group.id === groupId) {
                        index = i;
                        return;
                    };
                });
                groups[index].title = editTitle;
                await groups[index].save();
                resolve(groups);
            })
            .catch(error => reject(error));
    });

export const googleSheetRemoveGroup = (uuid, groupId) =>
    new Promise(async (resolve, reject) => {
        await init();
        await doc.sheetsByTitle[sheets.todo].getRows()
            .then(async groups => {
                let index = null;
                groups.forEach((group, i) => {
                    if (group.uuid === uuid && group.id === groupId) {
                        index = i;
                        return;
                    };
                });
                await groups[index].delete();
                groups.splice(index, 1);
                resolve(groups);
            })
            .catch(error => reject(error));
    });

export const googleSheetAppendTodo = (uuid, groupId, todo) =>
    new Promise(async (resolve, reject) => {
        await init();
        await doc.sheetsByTitle[sheets.todo].getRows()
            .then(async groups => {
                let index = null;
                groups.forEach((group, i) => {
                    if (group.uuid === uuid && group.id === groupId) {
                        index = i;
                        return;
                    };
                });
                const todos = [...JSON.parse(groups[index].todos), todo];
                groups[index].todos = JSON.stringify(todos);
                await groups[index].save();
                resolve(todos);
            })
            .catch(error => reject(error));
    });

export const googleSheetEditTodo = (uuid, groupId, todoId, editText) =>
    new Promise(async (resolve, reject) => {
        await init();
        await doc.sheetsByTitle[sheets.todo].getRows()
            .then(async groups => {
                let index = null;
                groups.forEach((group, i) => {
                    if (group.uuid === uuid && group.id === groupId) {
                        index = i;
                        return;
                    };
                });
                const todos = [...JSON.parse(groups[index].todos)].map(todo => todo.id === todoId ? { ...todo, text: editText } : todo);
                groups[index].todos = JSON.stringify(todos);
                await groups[index].save();
                resolve(todos);
            })
            .catch(error => reject(error));
    });

export const googleSheetDoneTodo = (uuid, groupId, todoId, done) =>
    new Promise(async (resolve, reject) => {
        await init();
        await doc.sheetsByTitle[sheets.todo].getRows()
            .then(async groups => {
                let index = null;
                groups.forEach((group, i) => {
                    if (group.uuid === uuid && group.id === groupId) {
                        index = i;
                        return;
                    };
                });
                const todos = [...JSON.parse(groups[index].todos)].map(todo => todo.id === todoId ? { ...todo, done } : todo)
                groups[index].todos = JSON.stringify(todos);
                await groups[index].save();
                resolve(todos);
            })
            .catch(error => reject(error));
    });

export const googleSheetRemoveTodo = (uuid, groupId, todoId) =>
    new Promise(async (resolve, reject) => {
        await init();
        await doc.sheetsByTitle[sheets.todo].getRows()
            .then(async groups => {
                let index = null;
                groups.forEach((group, i) => {
                    if (group.uuid === uuid && group.id === groupId) {
                        index = i;
                        return;
                    };
                });
                const todos = [...JSON.parse(groups[index].todos)].filter(todo => todo.id !== todoId);
                groups[index].todos = JSON.stringify(todos);
                await groups[index].save();
                resolve(todos);
            })
            .catch(error => reject(error));
    });

export const googleSheetHomePosts = () =>
    new Promise(async (resolve, reject) => {
        await init();
        await doc.sheetsByTitle[sheets.home].getRows()
            .then(rows => {
                const posts = [];
                rows.forEach(row => {
                    posts.push({
                        title: row.title,
                        date: row.date,
                        content: row.content
                    });
                    console.log(row.content)
                });
                resolve(posts);
            })
            .catch(error => reject(error));
    });
