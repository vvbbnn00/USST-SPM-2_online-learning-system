"use server"
import {createQuestion, updateQuestion} from "@/service/question";

export const doUpdateQuestion = async (_, formData) => {
    const question_id = parseInt(formData.get("question_id"));
    const question_content = formData.get("question_content");
    const question_option = JSON.parse(formData.get("question_option"));
    const question_bank_id = formData.get("question_bank_id");
    const percentage = Number(formData.get("percentage"));

    if (isNaN(percentage)) {
        return {
            code: 400,
            message: "题目分值不合法"
        }
    }

    if (!question_option?.type) {
        return {
            code: 400,
            message: "题目类型错误"
        }
    }

    let is_subjective = 0;

    switch (question_option.type) {
        case "single": {
            is_subjective = 0;
            if (!question_option?.options || !question_option?.answer) {
                return {
                    code: 400,
                    message: "题目选项或者答案为空"
                }
            }
            if (question_option?.options.length < 2) {
                return {
                    code: 400,
                    message: "题目选项不得少于2个"
                }
            }
            const answer = parseInt(question_option.answer);
            if (answer >= question_option.options.length) {
                return {
                    code: 400,
                    message: "题目答案不合法"
                }
            }
            if (answer < 0) {
                return {
                    code: 400,
                    message: "题目答案不合法"
                }
            }
            break;
        }

        case "multiple": {
            is_subjective = 0;
            if (!question_option?.options || !question_option?.answer) {
                return {
                    code: 400,
                    message: "题目选项或者答案为空"
                }
            }
            if (question_option?.options.length < 2) {
                return {
                    code: 400,
                    message: "题目选项不得少于2个"
                }
            }
            const answer = question_option.answer.split(",");
            answer.forEach((item) => {
                item = parseInt(item);
                if (item >= question_option.options.length) {
                    return {
                        code: 400,
                        message: "题目答案不合法"
                    }
                }
                if (item < 0) {
                    return {
                        code: 400,
                        message: "题目答案不合法"
                    }
                }
            });
            break;
        }

        case "text": {
            is_subjective = 1;
            if (!question_option?.answer) {
                return {
                    code: 400,
                    message: "题目答案为空"
                }
            }
            break;
        }
    }

    try {
        if (isNaN(question_id)) {
            const question = await createQuestion({
                question_content,
                question_option,
                is_subjective,
                question_bank_id,
                percentage
            });
            return {
                code: 200,
                message: "创建成功",
                question_id: question,
                time: new Date()
            }
        } else {
            await updateQuestion({
                question_id,
                question_content,
                question_option,
                is_subjective,
                question_bank_id,
                percentage
            });
        }
    } catch (e) {
        console.error(e);
        return {
            code: 500,
            message: e.message
        }
    }

    return {
        code: 200,
        message: "更新成功",
        time: new Date()
    }
}

