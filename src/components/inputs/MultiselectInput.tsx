import React, { useEffect, useState } from 'react';

import { Field } from '../../functions/types/formTypes';

interface MultiselectInputProps {
    field: Field;
    answer: string;
    error: string;
    changeValueCB: (id: number, value: string) => void;
}

export default function MultiselectInput(props: MultiselectInputProps) {
    const { field, answer, changeValueCB } = props;
    const [openOptions, setOpenOptions] = useState(false);
    const [multiAnswers, setMultiAnswers] = useState<string[]>(answer.split(",") || []);

    useEffect(() => {
        let timeout = setTimeout(() => {
            changeValueCB(field.id!, multiAnswers.join(","));
        }, 1000);

        return () => clearTimeout(timeout);
    }, [multiAnswers]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        if(e.target.checked) {
            setMultiAnswers([...multiAnswers, value]);
        } else {
            setMultiAnswers(multiAnswers.filter(answer => answer !== value));
        }
    }

    
    return (
        <div className="mb-1">
             <label className="block text-gray-700 text-lg">
                {field.label}
            </label>
            <div className="bg-white rounded-lg px-4 py-2 mt-2">
                <button type="button" className="w-full flex items-center justify-between" onClick={_=> setOpenOptions(!openOptions)}>
                    <span>Select Hobbies</span>
                    <span className="font-bold text-lg">{ openOptions ? "-" : "+" }</span>
                </button>
                { openOptions && (
                    <div className="h-24 overflow-y-scroll">
                        {field.options!.split(",").map((option, index) => (
                            <div className="flex gap-2 items-center" key={index}>
                                <input 
                                    type="checkbox" 
                                    id={`${index}`} 
                                    checked={multiAnswers.find(answer => answer === option) ? true : false} 
                                    onChange={e => handleChange(e, option)}
                                />
                                <label htmlFor={`${index}`}>{option}</label>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex flex-row flex-wrap gap-x-2 items-center mt-4">
                {multiAnswers.map((answer, index) => (
                    answer.length > 0 && <span key={index} className="bg-white rounded-lg px-3 py-1 text-sm">{answer}</span>
                ))}
            </div>
            {props.error && <span className="text-sm text-red-600">{props.error}</span>}
        </div>
    );
}