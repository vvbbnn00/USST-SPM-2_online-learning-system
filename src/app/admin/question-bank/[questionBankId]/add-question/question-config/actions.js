"use server"
export const doUpdateQuestion = async (_, formData) => {
    const question_id = formData.get("question_id");
    const question_content = formData.get("question_content");
    const question_option = JSON.parse(formData.get("question_option"));
    const is_subjective = formData.get("is_subjective");
    const question_bank_id = formData.get("question_bank_id");

    console.log(question_id, question_content, question_option, is_subjective, question_bank_id);

    if (!question_option?.type) {
        return {
            code: 400,
            message: "题目类型错误"
        }
    }

    switch (question_option.type) {
        case "single": {
            if (!question_option?.options || !question_option?.answer) {
                return {
                    code: 400,
                    message: "题目选项或者答案为空"
                }
            }
            const answer = parseInt(question_option.answer);
            if (answer > question_option.options.length) {
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
            if (!question_option?.options || !question_option?.answer) {
                return {
                    code: 400,
                    message: "题目选项或者答案为空"
                }
            }
            const answer = question_option.answer.split(",");
            answer.forEach((item) => {
                item = parseInt(item);
                if (item > question_option.options.length) {
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
            if (!question_option?.answer) {
                return {
                    code: 400,
                    message: "题目答案为空"
                }
            }
            break;
        }
    }
    return {
        code: 200,
        message: "更新成功"

    }

}

