import React from 'react';
import { TextField } from '../functions/types';

interface LabelledInputProps {
    field: TextField;
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
                type={props.field.fieldType} 
                className="w-full p-2 border-2 border-gray-200 rounded-lg mt-1"
                value={props.answer}
                onChange={e => props.changeValueCB(props.field.id, e.target.value)}
            />
        </div> 
    )
}
