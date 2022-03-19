import { fieldType, InitialAddField } from "../functions/types"

type UpdateLabelAction = {
    type: "update_label",
    value: string
}

type UpdateFieldKindAction = {
    type: "update_field_kind",
    value: string 
}

type UpdateTextInputTypeAction = {
    type: "update_input_type",
    value: fieldType
}

type UpdateRatingAction = {
    type: "update_rating",
    rating: number
}

type UpdateOptionsAction = {
    type: "update_options",
    options: string
}

type ClearFieldAction = {
    type: "clear_field"
}

type NewFieldActions = UpdateLabelAction | UpdateFieldKindAction | UpdateTextInputTypeAction | UpdateRatingAction | UpdateOptionsAction | ClearFieldAction;

const NewFieldReducer = (state: InitialAddField, action: NewFieldActions): InitialAddField => {
    switch(action.type) {
        case "update_label": {
            return {
                ...state,
                label: action.value
            }
        }

        case "update_field_kind": {
            return {
                ...state,
                kind: action.value
            }
        }

        case "update_input_type": {
            return {
                ...state,
                inputType: action.value
            }
        }

        case "update_options": {
            return {
                ...state,
                options: action.options
            }
        }

        case "update_rating": {
            return {
                ...state,
                rating: action.rating
            }
        }

        case "clear_field": {
            return {
                label: "",
                kind: "",
                inputType: "text",
                options: "",
                rating: 2
            };
        }

        default: return state;
    }
}

export { NewFieldReducer };