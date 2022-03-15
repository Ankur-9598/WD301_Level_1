import React from 'react';
import { TextAreaField } from '../functions/types';

interface TextareaInputProps {
    field: TextAreaField;
    answer: string;
    changeValueCB: (id: number, value: string) => void;
}

export default function TextareaInput(props: TextareaInputProps) {
    const { field, answer, changeValueCB } = props;

    return (
        <div className="mb-1">
            <label className="block text-gray-700 text-lg">
                {props.field.label}
            </label>
            <textarea 
                value={answer}
                autoFocus
                onChange={e => changeValueCB(field.id, e.target.value)}
                className="w-full p-2 border-2 border-gray-200 rounded-lg mt-1"    
            ></textarea>
        </div> 
    )
}
