import StudyProgressDAO from "@/dao/study-progress";
import ContentDAO from "@/dao/content";
import UserDAO from "@/dao/user";

export async function getProgressByContentId({contentId}) {
    const content = await ContentDAO.queryById({content_id: contentId});
    if (!content) {
        throw new Error('教学材料不存在');
    }

    const result = await StudyProgressDAO.queryByContentId({contentId});
    const list = result.map((item) => {
        return {
            contentId: item.content_id,
            userId: item.user_id,
            status: item.status,
            lastTime: item.last_time,
            user: {
                userId: item.user_id,
                username: item.username,
                name: item.name,
                employeeId: item.employee_id,
                avatar: item.avatar
            }
        }
    });

    return {
        total: list.length,
        finished: list.filter((item) => item.status === 'finished').length,
        unfinished: list.filter((item) => item.status === 'unfinished').length,
        list: list
    }
}


export async function updateProgress({contentId, userId, status}) {
    const user = await UserDAO.query({
        user_id: userId
    });
    if (!user) {
        throw new Error('用户不存在');
    }
    if (user.role !== 'student') {
        throw new Error('只有学生才能更新学习进度');
    }

    const content = await ContentDAO.queryById({content_id: contentId});
    if (!content) {
        throw new Error('教学材料不存在');
    }

    const result = await StudyProgressDAO.update({contentId, userId, status});
    if (result.affectedRows === 0) {
        throw new Error('更新失败');
    }
    return result;
}
