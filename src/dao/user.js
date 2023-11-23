export default class UserDAO {
    static async query({user_id = null, username = null, withPassword = false}) {
        // 如果没有传入user_id和username，返回null
        if (!user_id && !username) {
            return null;
        }

        // TODO: 从数据库获取用户信息，如果没有找到，返回null，若携带密码，返回密码

        return {
            user_id: 1,
            username: "vvbbnn00",
            password: "xxx",
            name: "张三",
            employee_id: "10001",
            roles: "teacher,student", // 用逗号分隔的字符串
            avatar: "https://avatars.githubusercontent.com/u/46409975?v=4"
        }
    }
}
