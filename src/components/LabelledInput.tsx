import React from 'react';
import { Field } from '../functions/types/formTypes';

interface LabelledInputProps {
    field: Field;
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
                placeholder={` Your ${props.field.label.toLowerCase()}`}
                onChange={e => props.changeValueCB(props.field.id!, e.target.value)}
            />
        </div> 
    )
}
