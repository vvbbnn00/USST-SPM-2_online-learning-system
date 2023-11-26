import StudyProgressDAO from "@/dao/study-progress";
import ContentDAO from "@/dao/content";

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
                userId: item.user.user_id,
                username: item.user.username,
                name: item.user.name,
                employeeId: item.user.employee_id,
                avatar: item.user.avatar
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
