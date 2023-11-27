import CourseDAO from "@/dao/course";
import UserDAO from "@/dao/user";
import {cacheStore, convertAsync} from "@/utils/session";

export async function getCourseConfig() {
    const cache = await cacheStore.get('global:courseData');
    if (cache) {
        return JSON.parse(cache);
    }

    const ret = await CourseDAO.queryConfig({keys: CourseDAO.COURSE_KEYS});
    const studentNumber = await UserDAO.count({
        role: 'student'
    });
    const teacherList = await UserDAO.queryMany({
        role: 'teacher',
        page: 1,
        pageSize: 1000
    });

    const data = {
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
    };

    const asyncSet = convertAsync(cacheStore.set, cacheStore);
    asyncSet('global:courseData', JSON.stringify(data), 'EX', 60).catch((err) => {
        console.error("[service/course.js] cacheStore.set error: ", err);
    });

    return data;
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


export async function updateCourseConfig({courseCover, courseDescription, courseName, courseType, courseId}) {
    const ret = await CourseDAO.updateConfig({
        course_cover: courseCover,
        course_description: courseDescription,
        course_name: courseName,
        course_type: courseType,
        course_id: courseId
    });
    if (!ret) {
        throw new Error('更新课程配置失败');
    }

    await cacheStore.del('global:courseData');
    await cacheStore.del('global:courseName');
    return ret;
}
