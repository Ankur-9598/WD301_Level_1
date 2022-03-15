import React from 'react';
import { RadioField } from '../functions/types';


interface RadioInputProps {
    field: RadioField;
    answer: string;
    changeValueCB: (id: number, value: string) => void;
}

export default function RadioInput(props: RadioInputProps) {
    const { field, answer, changeValueCB } = props;
    
    return (
        <div className="mb-1">
             <label className="block font-semibold text-gray-700 text-lg">
                {field.label}
            </label>
            <div className="w-full flex flex-wrap items-center justify-start gap-x-8 gap-y-1">
                {field.options.map((option, index) => (
                    <div key={index} className="flex gap-2 items-center">
                        <input 
                            type="radio" 
                            name={field.label} 
                            className="w-4 h-4"
                            checked={answer === option}
                            value={option}
                            onChange={e => changeValueCB(field.id, e.target.value)}
                        />
                        <label className="text-gray-600 text-lg">{ option }</label>
                    </div>
                ))}
            </div>
        </div>
    );
}
