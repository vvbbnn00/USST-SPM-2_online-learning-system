import CourseDAO from "@/dao/course";
import UserDAO from "@/dao/user";
import {cacheStore} from "@/utils/session";

export async function getCourseConfig() {
    const ret = await CourseDAO.queryConfig({keys: CourseDAO.COURSE_KEYS});
    const studentNumber = await UserDAO.count({
        role: 'student'
    });
    const teacherList = await UserDAO.queryMany({
        role: 'teacher',
        page: 1,
        pageSize: 1000
    });

    return {
        courseCover: ret.course_cover,
        courseDescription: ret.course_description,
        courseId: ret.course_id,
        courseName: ret.course_name,
        courseType: ret.course_type,
        studentNumber: studentNumber,
        teacherList: teacherList.map((teacher) => {
            return {
                userId: teacher.user_id,
                username: teacher.username,
                name: teacher.name,
                avatar: teacher.avatar
            }
        })
    }
}


export async function getCourseName() {
    const cache = await cacheStore.get('global:courseName');
    if (cache) {
        return cache;
    }
    const ret = await CourseDAO.queryConfig({keys: ['course_name']});
    await cacheStore.set('global:courseName', ret.course_name, 'EX', 60 * 60 * 24);
    return ret.course_name;
}
