import { pbkdf2, randomBytes } from "crypto";
import ENCODE_CONFIG from './encode.config.json';

export const createSaltKey = () =>
    new Promise((resolve, reject) => {
        randomBytes(64, (error, buffer) => {
            const salt = `S-${buffer.toString('base64')}`
            if (error) reject(error);
            resolve(salt);
        })
    })

export const encodingPassword = (salt, password) =>
    new Promise((resolve, reject) => {
        pbkdf2(password, salt, ENCODE_CONFIG.ITER, ENCODE_CONFIG.LENGTH, ENCODE_CONFIG.DIGEST, (error, key) => {
            const _password = `P-${key.toString(ENCODE_CONFIG.STRING_TYPE)}`;
            if (error) reject(error);
            else resolve(_password);
        })
    })

export const encodingAuthor = (salt, author) =>
    new Promise((resolve, reject) => {
        pbkdf2(author, salt, ENCODE_CONFIG.ITER, ENCODE_CONFIG.LENGTH, ENCODE_CONFIG.DIGEST, (error, key) => {
            const _author = `A-${key.toString(ENCODE_CONFIG.STRING_TYPE)}`;
            if (error) reject(error);
            else resolve(_author);
        })
    })