import React, { useState } from 'react';

import { Field } from '../functions/types/formTypes';
import { Error } from '../functions/types/commonTypes';

import { addField } from '../functions/ApiCalls';
import { validateFormField } from '../functions/utils/formUtils';


interface AddFieldProps {
    formId: number;
    closeModalCB: () => void;
    setLoadingCB: (value: boolean) => void;
    setFormFieldsCB: (data: Field) => void;
}

export default function AddFields( props: AddFieldProps ) {
    const [errors, setErrors] = useState<Error<Field>>({});
    const [newField, setNewField] = useState<Field>({
        label: "",
        kind: "TEXT",
        options: "",
    });

    const handleInputKindChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const kind = event.target.value;
        if(kind === "RADIO" || kind === "DROPDOWN") {
            setNewField({
                ...newField,
                kind: kind
            });
        } else {
            setNewField({
                ...newField,
                meta: kind
            });
        }
        
    }

    // Add a new field in the active form...
    const handleAddField = async () => {
        const validationErros = validateFormField(newField);
        setErrors(validationErros);

        if(Object.keys(validationErros).length === 0) {
            try {
                props.setLoadingCB(true);
                const data: Field = await addField(props.formId, newField);
                props.setFormFieldsCB(data);
                setNewField({
                    label: "",
                    kind: "TEXT",
                    options: ""
                });
                props.closeModalCB();
            } catch (error) {
                console.log(error);
            } finally {
                props.setLoadingCB(false);
            }
        }
    }

    return (
        <div className="flex flex-col justify-between py-6 px-4">
            <h2 className="text-xl font-bold border-b-2 border-gray-600 pb-1">Add a new field</h2>
            <div className="flex flex-col pt-6 pb-2">
                <label htmlFor="field_label">Field Label</label>
                <input 
                    type="text" 
                    id="field_label"
                    className="p-2 border-2 border-gray-200 rounded-lg"
                    value={newField.label}
                    onChange={e => setNewField({...newField, label: e.target.value})}
                />
                {errors.label && <span className="text-red-500">{errors.label}</span>}
            </div>

            <div className="flex flex-col py-2">
                <label htmlFor="input_kind">Input Kind</label>
                <select 
                    id="input_kind"
                    title='Field Type'
                    value={newField.meta ? newField.meta : newField.kind}
                    onChange={handleInputKindChange}
                    className='p-2 border-2 border-gray-200 rounded-lg'
                >
                    <option disabled value="">Select input kind</option>
                    <option value="TEXT">Text</option>
                    <option value="DROPDOWN">Dropdown</option>
                    <option value="RADIO">Radio</option>
                    <option value="textarea">Textarea</option>
                    <option value="multiselect">Multiselect</option>
                    <option value="rating">Rating</option>
                    <option value="code">Code</option>
                </select>
                {errors.kind && <span className="text-red-500">{errors.kind}</span>}
            </div>

            {(newField.kind === "DROPDOWN" || newField.kind === "RADIO" || newField.meta === "multiselect") && (
                <div className="flex flex-col py-2">
                    <label htmlFor="options">Options</label>
                    <input 
                        autoFocus
                        type="text" 
                        id="options"
                        value={newField.options}
                        onChange={e => setNewField({...newField, options: e.target.value})}
                        placeholder="Options separated by ,(comma)"
                        className="p-2 border-2 border-gray-200 rounded-lg"
                    />   
                    {errors.options && <span className="text-red-500">{errors.options}</span>}
                </div>
            )}

            { newField.meta === "rating" && (
                <div className="flex flex-col py-2">
                    <label htmlFor="rating">Rating Level</label>
                    <input 
                        min={2}
                        max={10}
                        autoFocus
                        id="rating"
                        type="number" 
                        value={newField.value}
                        className="p-2 border-2 border-gray-200 rounded-lg"
                        onChange={e => setNewField({...newField, options: e.target.value})}
                    />
                    {errors.options && <span className="text-red-500">{errors.options}</span>}
                </div>
            )}

            { newField.meta === "code" && (
                <div className="flex flex-col py-2">
                    <label htmlFor="code">Language</label>
                    <select 
                        id="code"
                        title='Code Language'
                        value={newField.options}
                        onChange={e => setNewField({...newField, options: e.target.value})}
                        className='p-2 border-2 border-gray-200 rounded-lg'
                    >
                        <option disabled value="">Select code language</option>
                        <option value="c">C</option>
                        <option value="cpp">C++</option>
                        <option value="javascript">Javascript</option>
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                    </select>
                    {errors.options && <span className="text-red-500">{errors.options}</span>}
                </div>
            )}

            <button
                type="button"
                onClick={handleAddField}
                className="px-6 h-11 mt-6 border-blue-400 rounded-lg text-blue-400 font-semibold text-lg border-2 hover:text-blue-500 hover:border-blue-500"
            >
                + Add field
            </button>

            <button
                type="button"
                onClick={props.closeModalCB}
                className="px-6 h-11 mt-4 border-red-400 rounded-lg text-red-400 font-semibold text-lg border-2 hover:text-red-500 hover:border-red-500"
            >
                Cancel
            </button>
        </div>
    );
}
