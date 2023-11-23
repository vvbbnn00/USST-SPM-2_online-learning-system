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

}
