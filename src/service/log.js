import LogDAO from "@/dao/log";

export async function getLogList({page = 1, pageSize = 20, kw = null, type = null, userId = null}) {
    const result = await LogDAO.queryMany({
        page,
        pageSize,
        kw,
        type,
        userId
    });
    const count = await LogDAO.count({
        kw,
        type,
        userId
    });

    const logList = [];
    for (let log of result) {
        logList.push({
            logId: log.log_id,
            time: log.time,
            type: log.type,
            detail: log.detail,
            userId: log.user_id,
            username: log.username,
            name: log.name,
        })
    }

    return {
        count,
        logList
    }
}
