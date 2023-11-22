import * as querystring from "querystring";
import {generateRandomString} from "@/utils/string";
import {FILE_ENDPOINT, FILE_SECRET_KEY} from "@/config/api";
import * as crypto from "crypto";


function generateSha1Sign(path, nonce, timestamp, secret) {
    const hash = crypto.createHash('sha1');
    hash.update(path + nonce + timestamp + secret);
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


export function generateDownloadUrlByFileId(fileId, filename = null) {
    return generateDownloadUrl(`/file/download/${fileId}`, filename);
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

