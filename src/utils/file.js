import * as querystring from "querystring";
import {generateRandomString} from "@/utils/string";
import {FILE_ENDPOINT, FILE_SECRET_KEY, FILE_PREVIEW_SECRET_KEY} from "@/config/api";
import * as crypto from "crypto";


function generateSha1Sign(path, nonce, timestamp, secret) {
    const hash = crypto.createHash('sha1');
    hash.update(path + nonce + timestamp + secret);
    return hash.digest('hex');
}

function generateSha256Sign(url, exp, secret) {
    const hash = crypto.createHash('sha256');
    hash.update(url + exp + secret);
    return hash.digest('hex');
}

function generateDownloadUrl(path, filename = null) {
    const timestamp = Math.floor(Date.now() / 1000);
    const nonce = generateRandomString(32);
    const sign = generateSha1Sign(path, nonce, timestamp, FILE_SECRET_KEY);

    // Construct query parameters
    let query_params = {
        n: nonce,
        t: timestamp,
        s: sign,
    };

    // If a filename is provided, add it to the query parameters
    if (filename) {
        query_params.filename = filename;
    }

    // Concatenate query parameters to URL
    return `${FILE_ENDPOINT}${path}?${querystring.stringify(query_params)}`;
}


export function generateDownloadUrlByFileStorageId(fileStorageId, filename = null) {
    return generateDownloadUrl(`/file/download/${fileStorageId}`, filename);
}


export function generateUploadUrl() {
    const timestamp = Math.floor(Date.now() / 1000);
    const nonce = generateRandomString(32);
    const sign = generateSha1Sign("/file/upload", nonce, timestamp, FILE_SECRET_KEY);

    // Construct query parameters
    let query_params = {
        n: nonce,
        t: timestamp,
        s: sign,
    };

    // Concatenate query parameters to URL
    return `${FILE_ENDPOINT}/file/upload?${querystring.stringify(query_params)}`;
}


export function generatePreviewUrl(url, fileType = "doc", exp = null) {
    switch (fileType) {
        case "doc":
        case "docx":
        case "ppt":
        case "pptx":
        case "xls":
        case "xlsx":
            break;
        default:
            return null;
    }

    if (!exp) {
        exp = Math.floor(Date.now() / 1000) + 3600;
    }

    url = btoa(url);

    const sign = generateSha256Sign(url, exp, FILE_PREVIEW_SECRET_KEY);

    // Construct query parameters
    let query_params = {
        url: url,
        exp: exp,
        sign: sign,
    };

    // Concatenate query parameters to URL
    return `/onlinePreview?${querystring.stringify(query_params)}`;
}

