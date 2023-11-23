import ContentDAO from '@/dao/content';
import StudyProgressDAO from '@/dao/study-progress';
import {getUserData, isStudent, isTeacher} from "@/utils/auth";
import {getFileById} from "@/service/file";
import {generateDownloadUrlByFileStorageId, generatePreviewUrl} from "@/utils/file";
import {INNER_API_ENDPOINT} from "@/config/api";

export async function getContentList() {
    const userData = await getUserData();

    let returnList;

    // 获取基础的教学材料列表
    const contentList = await ContentDAO.queryListWithPercentage();
    returnList = contentList.map(item => {
        return {
            contentId: item.content_id,
            contentName: item.name,
            contentType: item.type,
            chapter: item.chapter,

            progress: {
                total: item.progress_total,
                finished: item.progress_finished
            }
        }
    })

    // 获取用户的学习进度
    if (await isStudent()) {
        const progressList = await StudyProgressDAO.queryListByUserId({
            userId: userData.userId
        });
        const progressMap = {};
        progressList.forEach(item => {
            progressMap[item.content_id] = item;
        })

        returnList.forEach(item => {
            const progress = progressMap[item.contentId];
            if (progress) {
                item.status = progress.status;
                item.lastTime = progress.last_time;
            } else {
                item.status = 'unfinished';
                item.lastTime = null;
            }
        })
    }

    // console.log(returnList);
    return returnList;
}


export async function getContentDetail({contentId}) {
    contentId = Number(contentId);

    const content = await ContentDAO.queryById({content_id: contentId});
    if (!content) {
        return null;
    }

    // console.log(content);

    let file;

    try {
        file = await getFileById({fileId: content.file_id});
    } catch (e) {
        return null;
    }

    // console.log(file);

    const downloadUrl = generateDownloadUrlByFileStorageId(file.fileStorageId, file.fileName);
    const innerDownloadUrl = `${INNER_API_ENDPOINT}/api/upload/${file.fileId}/download/ols_upload_${file.fileId}.${file.fileType}`;
    const previewUrl = generatePreviewUrl(innerDownloadUrl, file.fileType) || downloadUrl;

    const ret = {
        contentId: content.content_id,
        contentName: content.name,
        contentType: file.fileType,
        chapter: content.chapter,
        contentFile: {
            fileId: file.fileId,
            fileName: file.fileName,
            fileType: file.fileType,
            fileSize: file.fileSize,
            fileStatus: file.fileStatus,
            fileCreateTime: file.fileCreateTime,
            fileCreateBy: file.fileCreateBy,
        },
        canDownload: false,
        percentage: content.percentage,
    }

    ret.downloadUrl = null;
    ret.previewUrl = previewUrl;

    if (content.can_download || await isTeacher()) {
        ret.canDownload = true;
        ret.downloadUrl = downloadUrl;
        ret.previewUrl = previewUrl;
    }
    return ret;
}
