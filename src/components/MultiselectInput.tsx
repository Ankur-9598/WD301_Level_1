import React from 'react';
import { MultiSelectField } from '../functions/types';


interface MultiselectInputProps {
    field: MultiSelectField;
    answer: string;
    changeValueCB: (id: number, value: string) => void;
}

export default function MultiselectInput(props: MultiselectInputProps) {
    const { field, answer, changeValueCB } = props;
    const [multiOptions, setMultiOptions] = React.useState(() => answer.split(","));

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value: string[] = [];
        const options = e.target.options;
        for (let i = 0; i < options.length; i++) {
            if(options[i].selected) {
                value.push(options[i].value);
            }
        }
        setMultiOptions(value);
        changeValueCB(field.id, value.join(","));
    }
    
    return (
        <div className="mb-1">
             <label className="block text-gray-700 text-lg">
                {field.label} (Use ctrl+click to select multiple)
            </label>
            <select
                multiple
                value={multiOptions}
                onChange={handleChange}
                className="w-full p-2 border-2 border-gray-200 rounded-lg mt-1 focus:ring-0"
            >
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