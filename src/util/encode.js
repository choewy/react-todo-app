import { pbkdf2, randomBytes } from "crypto";
import { count, length, digest, type } from '../config/encode.json';

export const createSaltkey = () =>
    new Promise((resolve, reject) => {
        randomBytes(64, (error, buffer) => {
            if (error) reject(error);
            else resolve(`S-${buffer.toString(type)}`);
        });
    });

export const encodePassword = (salt, password) =>
    new Promise((resolve, reject) => {
        pbkdf2(password, salt, count, length, digest, (error, key) => {
            if (error) reject(error);
            else resolve(`P-${key.toString(type)}`)
        });
    });
