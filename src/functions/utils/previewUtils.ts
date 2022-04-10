import { Error } from "../types/commonTypes";
import { Answer } from "../types/submissionTypes";

export const validatePreviewForm = (answers: Answer[]) => {
    const errors: Error<Answer>[] = [];

    answers.forEach(answer => {
        if(answer.value.length < 1 || answer.value.length > 100) {
            errors.push({
                form_field: String(answer.form_field),
                value: "Answer is required"
            });
        }
    });

    return errors;
}