export default class FileDAO {

    /**
     * 根据文件ID获取文件信息
     * @param fileId
     * @returns any
     */
    static async queryById({file_id}) {
        // TODO: 根据文件ID获取文件信息

        return {
            file_id: file_id,
            name: "教学材料1.doc",
            type: "doc",
            size: 1024,
            storage_id: "1700581199/ed93a79f1a574dc66b4d7d00b372dd9a/d41d8cd98f00b204e9800998ecf8427e",
            status: "uploaded",
            create_time: new Date(),
            create_by: 1,
        }
    }

}
