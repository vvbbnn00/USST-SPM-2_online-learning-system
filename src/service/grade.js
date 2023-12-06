import GradeDAO from "@/dao/grade";


export async function getGradeList(examList) {
    const ret = await GradeDAO.queryGradeList(examList);
    // console.log('Retrieved data from GradeDAO in the service:', ret);
    if (!ret) {
        throw new Error('获取成绩失败');
    }
    return ret;
}

export async function getQueryExams() {
    const ret = await GradeDAO.queryExamList();
    // console.log('Retrieved data from GradeDAO in the service:', ret);
    if (!ret) {
        throw new Error('获取成绩失败');
    }
    return ret;
}
