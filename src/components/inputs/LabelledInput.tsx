import React from 'react';
import { Error } from '../../functions/types/commonTypes';
import { Field } from '../../functions/types/formTypes';
import { Answer } from '../../functions/types/submissionTypes';

interface LabelledInputProps {
    field: Field;
    error: string;
    answer: string;
    changeValueCB: (id: number, value: string) => void;
}

export default function LabelledInput(props: LabelledInputProps) {

    return (
        <div className="mb-1">
            <label className="block text-gray-700 text-lg">
                {props.field.label}
            </label>
            <input 
                autoFocus
                type="text"
                value={props.answer}
                className="w-full p-2 border-2 border-gray-200 rounded-lg mt-1"
                placeholder='Your answer'
                onChange={e => props.changeValueCB(props.field.id!, e.target.value)}
            />
            {props.error && <span className="text-sm text-red-600">{props.error}</span>}
        </div> 
    )
}
