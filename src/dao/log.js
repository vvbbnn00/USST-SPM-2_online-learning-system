export default class LogDAO {

    static async addLog({time, type, detail, user_id}) {
        time = new Date(time);

        // TODO: 将日志添加到数据库中

        return true;
    }
}
