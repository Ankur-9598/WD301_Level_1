import { Error } from "../types/commonTypes";
import { Field, FormData } from "../types/formTypes";

export const validateForm = (form: FormData) => {
    const errors: Error<FormData> = {};
    if(form.title.length < 1) {
        errors.title = "Title is required";
    }
    if(form.title.length > 100) {
        errors.title = "Title must be less than 100 characters"
    }

    return errors;
}

export const validateFormField = (field: Field) => {
    const errors: Error<Field> = {};
    if(field.label.length < 1) {
        errors.label = "Label is required";
    }
    if(field.label.length > 100) {
        errors.label = "Label must be less than 100 characters"
    }
    if((field.kind === "DROPDOWN" || field.kind === "RADIO") && (!field.options || field.options.length < 1)) {
        errors.options = "Options are required for dropdown and radio fields";
    }
    return errors;
}