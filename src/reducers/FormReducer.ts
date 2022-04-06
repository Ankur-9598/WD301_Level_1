import { Field } from "../functions/types/formTypes";

export type FormReducerState = {
    open: boolean;
    loading: boolean;
    formFields: Field[];
}

type SetFormFieldsAction = {
    type: "set_form_fields",
    payload: Field[]
}

type AddFormFieldAction = {
    type: "add_form_field",
    payload: Field
}

type RemoveFieldAction = {
    type: "remove_field",
    fieldId: number
}

type UpdateLoadingAction = {
    type: "update_loading",
    payload: boolean
}

type UpdateModalAction = {
    type: "update_modal",
    payload: boolean
}

export type FormReducerAction = SetFormFieldsAction | AddFormFieldAction | RemoveFieldAction | UpdateLoadingAction | UpdateModalAction;

export const formReducer = (state: FormReducerState, action: FormReducerAction) => {
    switch(action.type) {
        case "set_form_fields": return {
            ...state,
            formFields: action.payload
        }

        case "add_form_field": return {
            ...state,
            formFields: [...state.formFields, action.payload]
        }

        case "update_loading": return {
            ...state,
            loading: action.payload
        }

        case "remove_field": return {
            ...state,
            formFields: state.formFields.filter(field => field.id !== action.fieldId)
        }

        case "update_modal": return {
            ...state,
            open: action.payload
        }

    }
}