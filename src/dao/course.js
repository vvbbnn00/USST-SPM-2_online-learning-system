export default class CourseDAO {
    static COURSE_KEYS = ["course_cover", "course_description", "course_id", "course_name", "course_type"];

    /**
     * 获取课程配置信息
     * @returns any
     */
    static async queryConfig({keys}) {
        if (!keys) {
            keys = this.COURSE_KEYS;
        }

        // TODO 获取课程配置信息

        return {
            course_cover: "http://192.168.19.2:3000/course-cover.png",
            course_description: "\n" +
                "\"项目管理与过程改进\"这门课程致力于教授如何有效地管理项目并优化各种业务流程。在这门课程中，学生将学习项目管理的基本原则，包括项目启动、规划、执行、监控和结束等各个阶段。此外，课程还重点介绍了过程改进的方法和技巧，如六西格玛、精益管理和敏捷方法论。通过案例研究和实际项目实践，学生可以深入了解如何在不同行业和环境中应用这些方法。这门课程旨在培养学生的批判性思维能力，使他们能够识别和解决实际工作中的复杂问题，提高项目成功率和业务效率。",
            course_id: '(2023-2024-1)-12003580-01',
            course_name: "项目管理与过程改进",
            course_type: "必修",
        }
    }
}
