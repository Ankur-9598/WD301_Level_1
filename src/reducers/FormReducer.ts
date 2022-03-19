import { generateFormField, validFields } from "../functions/formFieldUtils";
import { fieldType, formData, formField, InitialAddField } from "../functions/types";

type AddFieldAction = {
    type: "add_field",
    fieldData: InitialAddField,
    callback: () => void
}

type RemoveFieldAction = {
    type: "remove_field",
    id: number
}

type UpdateTitleAction = {
    type: "update_title",
    title: string
}

type UpdateLabelAction = {
    type: "update_label",
    id: number,
    value: string
}

type UpdateInputTypeAction = {
    type: "update_input_type",
    id: number,
    newType: fieldType
}

type UpdateOptionsAction = {
    type: "update_options",
    id: number,
    options: string
}

type UpdateRatingAction = {
    type: "update_rating",
    id: number,
    ratingLevel: number
}

type FormAction = AddFieldAction | RemoveFieldAction | UpdateTitleAction | UpdateLabelAction | UpdateInputTypeAction | UpdateOptionsAction | UpdateRatingAction;



const formReducer = (state: formData, action: FormAction): formData => {
    switch(action.type) {
        case "add_field": {
            const { inputType, kind, label, options, rating } = action.fieldData;

            if(validFields(label, kind, options, inputType, rating)) {
                const fieldOptions = options?.split(",");
                const newFormField = generateFormField(kind, label, inputType, fieldOptions, rating);
                
                action.callback();
                
                return {
                    ...state,
                    formFields: [
                        ...state.formFields,
                        newFormField as formField
                    ]
                }
            }
            return state;
        }

        case "remove_field": {
            return {
                ...state,
                formFields: state.formFields.filter(field => field.id !== action.id)
            };
        }

        case "update_title": {
            return {
                ...state,
                title: action.title
            }
        }

        case "update_label": {
            const {id, value} = action;
            return {
                ...state,
                formFields: state.formFields.map(field => {
                    if(field.id === id) return {...field, label: value}
                    return field;
                })
            }
        }

        case "update_input_type": {
            const { id, newType} = action;
            return {
                ...state,
                formFields: state.formFields.map(field => {
                    if(field.id === id) return {...field, fieldType: newType};
                    return field;
                })
            }
        }

        case "update_options": {
            const { id, options } = action;
            const fieldOptions = options.split(",");
            return {
                ...state,
                formFields: state.formFields.map(field => {
                    if(field.id === id) return {...field, options: fieldOptions};
                    return field;
                })
            }
        }

        case "update_rating": {
            const { id, ratingLevel } = action;
            return {
                ...state,
                formFields: state.formFields.map(field => {
                    if(field.id === id) return {...field, level: ratingLevel};
                    return field;
                })
            }
        }

        default: return state;
    }
}

export { formReducer };