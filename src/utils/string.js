import crypto from 'crypto';

export function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export function parseDateTime(date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();

    return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day} ${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}


export function millSecondsToText(millSeconds) {
    if (millSeconds < 0) {
        return "00:00:00";
    }

    const seconds = Math.floor(millSeconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    return `${hours < 10 ? "0" + hours : hours}:${minutes % 60 < 10 ? "0" + minutes % 60 : minutes % 60}:${seconds % 60 < 10 ? "0" + seconds % 60 : seconds % 60}`;
}


export function hashPassword(password, salt) {
    const hash = crypto.createHash('sha256');
    const rawPassword = `${password}_${salt}`;

    hash.update(rawPassword);

    return hash.digest('hex');
}


export function md5(text) {
    const hash = crypto.createHash('md5');

    hash.update(text);

    return hash.digest('hex');
}


export function parseSize(bytes) {
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0.00 Byte";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
    return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
}
