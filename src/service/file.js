import FileDAO from "@/dao/file";
import {getUserData} from "@/utils/auth";
import LogDAO from "@/dao/log";

export async function getFileById({fileId, checkStatus = true}) {
    fileId = Number(fileId);

    const result = await FileDAO.queryById({file_id: fileId});
    if (!result) {
        throw new Error('文件不存在');
    }

    if (result.status !== 'uploaded' && checkStatus) {
        throw new Error('文件未上传完成');
    }

    return {
        fileId: result.file_id,
        fileName: result.filename,
        fileType: result.type,
        fileSize: result.size,
        fileStorageId: result.storage_id,
        fileStatus: result.status,
        fileCreateTime: result.created_at,
        fileCreateBy: result.created_by,
    }
}


export async function updateFileStatus({fileId, storageId}) {
    fileId = Number(fileId);

    const file = await getFileById({fileId, checkStatus: false});
    if (file.fileStatus === 'uploaded') {
        throw new Error('文件已上传完成');
    }

    LogDAO.addLog({
        time: new Date(),
        type: 'upload',
        detail: `确认上传文件完成: ${file.fileName}, 类型: ${file.fileType}, 大小: ${file.fileSize}`,
        user_id: file.fileCreateBy
    }).catch((err) => {
        console.error("[service/file.js] LogDAO.addLog error: ", err);
    })

    return await FileDAO.update({
        file_id: fileId,
        status: 'uploaded',
        storage_id: storageId
    });
}


export async function insertFile({fileName, fileType, fileSize}) {
    const user = await getUserData();
    if (!user) {
        throw new Error('请先登录');
    }

    LogDAO.addLog({
        time: new Date(),
        type: 'upload',
        detail: `用户上传文件: ${fileName}, 类型: ${fileType}, 大小: ${fileSize}`,
        user_id: user.userId
    }).catch((err) => {
        console.error("[service/file.js] LogDAO.addLog error: ", err);
    })

    return await FileDAO.insert({
        filename: fileName,
        type: fileType,
        size: fileSize,
        storage_id: 'N/A',
        created_by: user.userId
    });
}
