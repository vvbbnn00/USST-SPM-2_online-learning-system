import FileDAO from "@/dao/file";

export async function getFileById({fileId}) {
    fileId = Number(fileId);

    const result = await FileDAO.queryById({file_id: fileId});
    if (!result) {
        throw new Error('文件不存在');
    }

    if (result.status !== 'uploaded') {
        throw new Error('文件未上传完成');
    }

    return {
        fileId: result.file_id,
        fileName: result.name,
        fileType: result.type,
        fileSize: result.size,
        fileStorageId: result.storage_id,
        fileStatus: result.status,
        fileCreateTime: result.create_time,
        fileCreateBy: result.create_by,
    }
}
