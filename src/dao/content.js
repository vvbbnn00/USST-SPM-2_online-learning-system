export default class ContentDAO {
    /**
     * 获取教学材料列表
     * @returns any
     *
     * 返回的格式应当是一个数组，数组中包括了所有的教学材料
     */
    static async queryListWithPercentage() {

        // TODO: 获取教学材料列表，此处需要用到联表查询(type从相关file表中获取)

        return [{
            content_id: 1,
            name: "教学材料1",
            type: "doc",
            progress_total: 20,
            progress_finished: 10,
            chapter: "第一章 绪论"
        }, {
            content_id: 2,
            name: "教学材料2",
            type: "ppt",
            progress_total: 20,
            progress_finished: 10,
            chapter: "第一章 绪论"
        }, {
            content_id: 3,
            name: "很好的教学材料1",
            type: "doc",
            progress_total: 20,
            progress_finished: 1,
            chapter: "第二章 项目初始"
        }, {
            content_id: 4,
            name: "很好的教学材料2",
            type: "mp4",
            progress_total: 10,
            progress_finished: 10,
            chapter: "第二章 项目初始"
        }, {
            content_id: 5,
            name: "很好的教学材料3",
            type: "png",
            progress_total: 10,
            progress_finished: 10,
            chapter: "第二章 项目初始"
        }, {
            content_id: 6,
            name: "一个表格文件",
            type: "xls",
            progress_total: 10,
            progress_finished: 10,
            chapter: "第三章 进度计划"
        }]
    }

    static async queryById({content_id}) {
        // TODO: 根据content_id获取教学材料详情

        return {
            content_id: content_id,
            name: "教学材料1",
            chapter: "第一章 绪论",
            file_id: 1,
            can_download: false,
            percentage: 10,
        }
    }
}
