import React, { useState } from 'react';
import { Error } from '../../functions/types/commonTypes';
import { Field } from '../../functions/types/formTypes';
import { Answer } from '../../functions/types/submissionTypes';


interface RadioInputProps {
    field: Field;
    answer: string;
    error: string;
    changeValueCB: (id: number, value: string) => void;
}

export default function RadioInput(props: RadioInputProps) {
    const { field, answer, changeValueCB } = props;
    const [options] = useState(field.options!.split(','));
    
    return (
        <div className="mb-1">
             <label className="block font-semibold text-gray-700 text-lg">
                {field.label}
            </label>
            <div className="w-full flex flex-wrap items-center justify-start gap-x-8 gap-y-1">
                {options.map((option, index) => (
                    <div key={index} className="flex gap-2 items-center">
                        <input 
                            type="radio" 
                            value={option}
                            name={field.label} 
                            className="w-4 h-4"
                            checked={answer === option}
                            title='Select an option'
                            onChange={e => changeValueCB(field.id!, e.target.value)}
                        />
                        <label className="text-gray-600 text-lg">{ option }</label>
                    </div>
                ))}
            </div>
            {props.error && <span className="text-sm text-red-600">{props.error}</span>}
        </div>
    );
}
