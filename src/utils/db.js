/**
 * 生成更新字段
 * @param params 参数，object类型，key为字段名，value为字段值
 * @returns {*[][]}
 */
export function generateUpdateFields(params) {
    const fields = [];
    const values = [];
    Object.keys(params).forEach(key => {
        if (params[key] === null || params[key] === undefined) {
            return;
        }
        fields.push(`${"`"}${key}${"`"} = ?`);
        values.push(params[key]);
    });
    return [fields, values];
}
