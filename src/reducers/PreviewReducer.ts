import { PreviewForm } from "../functions/types";

type UpdateAnswerAction = {
    type: "update_answer",
    id: number,
    value: string 
}

type ResetAnswerAction = {
    type: "reset_answer",
}

type UpdateActiveIndexAction = {
    type: "update_active_index",
    curr_index: number
}

type PreviewAction = UpdateAnswerAction | ResetAnswerAction | UpdateActiveIndexAction;

const previewReducer = (state: PreviewForm, action: PreviewAction): PreviewForm => {
    switch(action.type) {
        case "update_answer": {
            return {
                ...state,
                formAnswers: {
                    ...state.formAnswers,
                    answers: state.formAnswers.answers.map(answer => {
                        if(answer.id === action.id) return {...answer, answer: action.value};
                        return answer;
                    })
                }
            }
        }

        case "reset_answer": {
            return {
                ...state,
                formAnswers: {
                    ...state.formAnswers,
                    answers: state.formAnswers.answers.map(answer => {
                        return {...answer, answer: ""}
                    })
                }
            }
        }

        case "update_active_index": {
            return {
                ...state,
                activeIndex: action.curr_index
            }
        }
    }
}

export { previewReducer };