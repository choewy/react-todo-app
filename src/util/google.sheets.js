import { GoogleSpreadsheet } from "google-spreadsheet";
import { createSaltKey, encodingAuthor, encodingPassword } from "./encode";
import API_KEY from './google.sheets.key.json';
import { v4 } from 'uuid';

const api = {
    doc: new GoogleSpreadsheet(API_KEY.GOOGLE_SHEET_ID),
    sheet: {
        user: "user",
        todo: "todo"
    },
    header: {
        user: ['uuid', 'email', 'name', 'salt', 'password', 'registDate', 'author'],
        todo: ['uuid', 'id', 'title', 'todos']
    },
    init: async () => {
        await api.doc.useServiceAccountAuth(API_KEY.GOOGLE_CONFIG);
        await api.doc.loadInfo();
    }
}

const getToday = () => {
    const today = new Date();
    return `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`
}

export const emailExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
export const passwordExp = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{10,12}$/;

export const findUserInGoogleSheet = (email) =>
    new Promise(async (resolve, reject) => {
        let auth = null;
        if (email) {
            await api.init();
            await api.doc.sheetsByTitle[api.sheet.user].getRows()
                .then(rows => {
                    rows.forEach(row => {
                        if (email === row.email) {
                            auth = {};
                            api.header.user.map(key =>
                                auth[key] = row[key]
                            )
                            return;
                        }
                    })
                })
                .catch(error => reject(error))
        }
        resolve(auth);
    })

export const appendUserInGoogleSheet = (email, name, password) =>
    new Promise(async (resolve, reject) => {
        const uuid = `U-${v4()}`;
        const salt = await createSaltKey();
        const _password = await encodingPassword(salt, password);
        const _author = await encodingAuthor(salt, 'user');
        const registDate = getToday();
        const auth = {
            uuid,
            name,
            email,
            salt,
            password: _password,
            author: _author,
            registDate
        };
        await api.init();
        await api.doc.sheetsByTitle[api.sheet.user].addRow(auth)
            .then(() => {
                resolve(auth);
            })
            .catch(error => reject(error))
    })

export const getTodosFromGoogleSheet = (uuid) =>
    new Promise(async (resolve, reject) => {
        const groups = [];
        await api.init();
        await api.doc.sheetsByTitle[api.sheet.todo].getRows()
            .then(rows => {
                rows.forEach(row => {
                    if (row.uuid === uuid) {
                        const group = {};
                        api.header.todo.forEach(key => {
                            if (key === 'todos') group[key] = JSON.parse(row[key])
                            else group[key] = row[key]
                        })
                        groups.push(group);
                    }
                })
                resolve(groups);
            })
            .catch(error => reject(error))
    })

export const appendGroupToGoogleSheet = (uuid, group_title) =>
    new Promise(async (resolve, reject) => {
        const group = {
            uuid,
            group_seq: `G-${v4()}`,
            group_title,
            items: '[]'
        }

        await api.init();
        await api.doc.sheetsByTitle[api.sheet.todo].addRow(group)
            .then(() => resolve(group))
            .catch(error => reject(error));
    });

export const editGroupTitleInGoogleSheet = (uuid, group_seq, title) =>
    new Promise(async (resolve, reject) => {
        await api.init();
        await api.doc.sheetsByTitle[api.sheet.todo].getRows()
            .then(async groups => {
                let index = 0;
                groups.forEach((group, _index) => {
                    if (group.uuid === uuid && group.group_seq === group_seq) {
                        index = _index
                    }
                });
                groups[index].group_title = title;
                await groups[index].save();
                resolve();
            })
            .catch(error => reject(error));
    });

export const removeGroupFromGoogleSheet = (uuid, group_seq) =>
    new Promise(async (resolve, reject) => {
        await api.init();
        await api.doc.sheetsByTitle[api.sheet.todo].getRows()
            .then(async groups => {
                let index = 0;
                groups.forEach((group, _index) => {
                    if (group.uuid === uuid && group.group_seq === group_seq) {
                        index = _index
                        return
                    }
                });
                await groups[index].delete();
                resolve();
            })
            .catch(error => reject(error));
    })