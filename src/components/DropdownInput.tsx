import React from 'react';
import { DropdownField } from '../functions/types';


interface DropdownInputProps {
    field: DropdownField;
    answer: string;
    changeValueCB: (id: number, value: string) => void;
}

export default function DropdownInput(props: DropdownInputProps) {
    const { field, answer, changeValueCB } = props;
    
    return (
        <div className="mb-1">
             <label className="block text-gray-700 text-lg">
                {field.label}
            </label>
            <select
                value={answer}
                onChange={e => {
                    e.preventDefault();
                    changeValueCB(field.id, e.target.value);
                }}
                className="w-full p-2 border-2 border-gray-200 rounded-lg mt-1 focus:ring-0"
            >
                <option value="">Select an option</option>
                {field.options.map((option, index) => (
                    <option 
                        key={index} 
                        value={option}
                    >
                        { option }
                    </option>
                ))}
            </select>
        </div>
    );
}
