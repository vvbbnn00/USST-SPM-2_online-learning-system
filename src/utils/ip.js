import {headers} from "next/headers";

export function getIpAddressFromRequest() {
    const headerList = headers();
    const IP_HEADERS = [
        'x-forwarded-for',
        'x-real-ip',
        'x-client-ip',
    ];
    let ipRaw = '';
    for (const header of IP_HEADERS) {
        if (headerList.has(header)) {
            ipRaw = headerList.get(header);
            break;
        }
    }

    if (ipRaw) {
        const ipList = ipRaw.split(',');
        return ipList[0];
    }

    return 'unknown';
}
