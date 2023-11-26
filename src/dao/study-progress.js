export default class StudyProgressDAO {

    /**
     * 获取用户的学习进度
     * @returns any
     *
     * 返回的格式应当是一个数组，数组中包括了所有的教学材料
     */
    static async queryListByUserId({userId}) {

        // TODO: 获取用户学习进度列表

        return [{
            content_id: 1,
            user_id: userId,
            status: "finished",
            last_time: new Date(),
        },{
            content_id: 3,
            user_id: userId,
            status: "finished",
            last_time: new Date(),
        },{
            content_id: 4,
            user_id: userId,
            status: "finished",
            last_time: new Date(),
        }]
    }


    /**
     * 获取某一个学习内容的学习进度
     *
     */
    static async queryByContentId({contentId}) {
        // TODO: 根据content_id获取每个用户的学习进度

        return [{
            content_id: contentId,
            user_id: 1,
            status: "finished",
            last_time: new Date(),
            user: {
                user_id: 1,
                username: "vvbbnn00",
                name: "张三",
                employee_id: "10001",
                avatar: "https://avatars.githubusercontent.com/u/46409975?v=4"
            }
        },{
            content_id: contentId,
            user_id: 2,
            status: "finished",
            last_time: new Date(),
            user: {
                user_id: 1,
                username: "vvbbnn00",
                name: "张三",
                employee_id: "10001",
                avatar: "https://avatars.githubusercontent.com/u/46409975?v=4"
            }
        },{
            content_id: contentId,
            user_id: 3,
            status: "finished",
            last_time: new Date(),
            user: {
                user_id: 1,
                username: "vvbbnn00",
                name: "张三",
                employee_id: "10001",
                avatar: "https://avatars.githubusercontent.com/u/46409975?v=4"
            }
        }]
    }
}
