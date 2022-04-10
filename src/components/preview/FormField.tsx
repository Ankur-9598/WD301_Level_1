import React, { useEffect, useState } from "react";


import RadioInput from '../inputs/RadioInput';
import RatingInput from '../inputs/RatingInput';
import TextareaInput from '../inputs/TextareaInput';
import DropdownInput from '../inputs/DropdownInput';
import LabelledInput from '../inputs/LabelledInput';
import MultiselectInput from '../inputs/MultiselectInput';

import { getFormField } from "../../functions/ApiCalls";

import { Field } from "../../functions/types/formTypes";
import { Answer } from "../../functions/types/submissionTypes";
import { Error } from "../../functions/types/commonTypes";


interface PreviewFormFieldInterface {
    total: number;
    error: Error<Answer>[];
    formId: number;
    activeIndex: number;
    answerField: Answer;
    updateAnswerCB: (fieldId: number, value: string) => void;
}

const fetchFormField = async (formId: number, fieldId: number, setField: React.Dispatch<React.SetStateAction<Field>>) => {
    try {
        const data = await getFormField(formId, fieldId);
        setField(data);
    } catch (error) {
        console.log(error);
    }
}



export default function PreviewFormField(props: PreviewFormFieldInterface) {
    const { formId, total, error, activeIndex, answerField, updateAnswerCB } = props;
    const [field, setField] = useState<Field>({
        label: "",
        kind: "NULL",
    });

    useEffect(() => {
        fetchFormField(formId, answerField.form_field, setField);
    }, [answerField.form_field, formId]);
    
    const getError = () => {
        const fieldError = error.find(e => Number(e.form_field) === answerField.form_field);
        return fieldError?.value ? fieldError.value : "";
    }

    return (
        <div>
            <p className="text-right">Currently on {activeIndex + 1}/{total}</p>
            { (field.kind === "TEXT" && !field.meta) && ( 
                <LabelledInput
                    field={field}
                    error={getError()}
                    answer={answerField.value}
                    changeValueCB={updateAnswerCB}
                />
            )}
                    
            { field.kind === "DROPDOWN" && (
                <DropdownInput
                    field={field}
                    error={getError()}
                    answer={answerField.value}
                    changeValueCB={updateAnswerCB}
                />
            )}
                
            { field.kind === "RADIO" && (
                <RadioInput 
                    field={field}
                    error={getError()}
                    answer={answerField.value}
                    changeValueCB={updateAnswerCB}
                />
            )}

            { field.meta === "multiselect" && (
                <MultiselectInput 
                    field={field}
                    error={getError()}
                    answer={answerField.value}
                    changeValueCB={updateAnswerCB}
                />
            )}

            { field.meta === "textarea" && (
                <TextareaInput 
                    field={field}
                    error={getError()}
                    answer={answerField.value}
                    changeValueCB={updateAnswerCB}
                />
            )}

            { field.meta === "rating" && (
                <RatingInput 
                    field={field}
                    error={getError()}
                    answer={answerField.value}
                    changeValueCB={updateAnswerCB}
                />
            )}
        </div>
    )
}