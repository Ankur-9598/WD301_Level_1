import React, { useState } from 'react';
import { fieldType, formField } from '../functions/types';

interface LabelPropsInterface {
    field: formField;
    removeFieldCB: (id: number) => void;
    handleFieldLabelChangeCB: (id: number, value: string) => void;
    handleFieldTypeChangeCB: (id: number, newType: fieldType) => void;
    handleFieldRatingChangeCB: (id: number, ratingLevel: number) => void;
    handleFieldOptionsChangeCB: (id: number, fieldOptions: string) => void;
}

const getOptions = (field: formField) => {
    if("options" in field) return field.options.join(",");
    return "";
}


export default function Label(props: LabelPropsInterface) {
    const { field, removeFieldCB, handleFieldTypeChangeCB, handleFieldLabelChangeCB, handleFieldRatingChangeCB, handleFieldOptionsChangeCB } = props;
    const [fieldOptions, setFieldOptions] = useState(() => getOptions(field));
    
    const handleFieldOptionsChange = (value: string) => {
        setFieldOptions(value);
        handleFieldOptionsChangeCB(field.id, fieldOptions);
    }

    return (
        <div className="flex justify-between items-end gap-3 mb-2">
            <div className="flex flex-col">
                <label className="block text-gray-600 text-lg">
                    {field.label}
                </label>
                <input 
                    type="text" 
                    className="flex-1 p-2 border-2 border-gray-200 rounded-lg"
                    value={field.label}
                    onChange={e => handleFieldLabelChangeCB(field.id, e.target.value)}
                />
            </div>
                {field.kind === "text" && (
                    <div className="">
                        <label className="block text-gray-600 text-lg">Text input type</label>
                        <select 
                            value={field.fieldType}
                            onChange={e => handleFieldTypeChangeCB(field.id, e.target.value as fieldType)}
                            className='p-2 border-2 border-gray-200 rounded-lg'
                        >
                            <option disabled value="">Select text input type</option>
                            <option value="email">Email</option>
                            <option value="date">Date</option>
                            <option value="number">Number</option>
                            <option value="tel">Telephone</option>
                            <option value="text">Text</option>
                            <option value="time">Time</option>
                        </select>
                    </div>
                )}
                {(field.kind === "dropdown" || field.kind === "radio" || field.kind === "multiselect") && (
                    <div className="flex flex-col">
                        <label className="block text-gray-600 text-lg">Options</label>
                        <input 
                            type="text" 
                            name="options"
                            title="Options separated by comma(,)"
                            value={fieldOptions}
                            placeholder="Options separated by ,(comma)"
                            onChange={e => handleFieldOptionsChange(e.target.value)}
                            className="flex-1 p-2 border-2 border-gray-200 rounded-lg"
                        />
                    </div>
                )}

                {field.kind === "rating" && (
                    <div className="flex flex-col">
                        <label className="block text-gray-600 text-lg">Rating stars limit</label>
                        <input 
                            type="number" 
                            value={field.level}
                            onChange={e => handleFieldRatingChangeCB(field.id, Number(e.target.value))}
                            className="flex-1 p-2 border-2 border-gray-200 rounded-lg"
                        />
                    </div>
                )}
                <div className="flex gap-2 ml-2">
                    <button
                        type="button"
                        onClick={() => removeFieldCB(field.id)}
                        className="px-6 py-[6px] border-red-400 rounded-lg text-red-400 font-semibold text-lg border-2 mb-1"
                    >
                        Remove
                    </button>
                </div>
        </div>
    )
}
