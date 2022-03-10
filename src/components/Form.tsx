import React, { useEffect, useRef, useState } from 'react';
import LabelledInput from './LabelledInput';

interface formData {
    id: number;
    title: string;
    formFields: formField[];
}
interface formField {
    id: number,
    label: string,
    type: string,
    value: string
}

export default function Form(props: {formData: formData, hideActiveFormCB: () => void, saveFormDataCB: (formData: formData) => void}) {
    const [formData, setFormData] = useState(props.formData);
    const [newField, setNewField] = useState("");
    const titleRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        document.title = "Form - " + props.formData.title;
        titleRef.current?.focus();
        return () => {
            document.title = "React Typescript with Tailwindcss";
        }
    }, []);

    useEffect(() => {
        let timeout = setTimeout(() => {
            props.saveFormDataCB(formData);
        }, 1000);
        return () => clearTimeout(timeout);
    }, [formData]);

    // Reset the form fields...
    const resetForm = () => { 
        setFormData({
            ...formData,
            formFields: formData.formFields.map(field => {
                return {...field, value: ""}
            })
        });
    }

    // Control the form field change value...
    const handleFieldChange = (id: number, value: string) => {
        setFormData({
            ...formData,
            formFields: formData.formFields.map(field => {
                if(field.id === id) return {...field, value: value};
                return field;
            })
        });
    }

    const handleFormTitleChange = (value: string) => {
        setFormData({
            ...formData,
            title: value
        });
    }

    // Add a new field in the active form...
    const addField = () => {
        let data = newField.split("_");
        const label = data[0];
        const type = data.length > 1 ? data[1] : "text";
        setFormData({
            ...formData,
            formFields: [
                ...formData.formFields,
                {
                    id: Number(new Date()),
                    label: label,
                    type: type,
                    value: ""
                }
            ]
        });
        setNewField("");
    }

    // Remove a field from the active form...
    const removeField = (id: number) => {
        setFormData({
            ...formData,
            formFields: formData.formFields.filter(field => field.id !== id)
        });
    }


    return (
        <form action="p-2 divide-dotted divide-gray-500 divide-y-2">
            <h3 className="text-xl font-bold">Active Form: {formData.title}</h3>
            <div className="flex flex-row justify-between my-3 pb-2 border-b-2 border-b-stone-500">
                <input 
                    type="text" 
                    className="w-3/4 p-2 border-2 border-gray-200 rounded-lg"
                    value={formData.title}
                    onChange={e => handleFormTitleChange(e.target.value)}
                    placeholder="Form Title"
                    ref={titleRef}
                />
            </div>
            {formData.formFields.map(field => (
                <LabelledInput 
                    key={field.id}
                    id={field.id}
                    label={field.label}
                    value={field.value}
                    type={field.type}
                    changeValueCB={handleFieldChange}
                    removeFieldCB={removeField}
                />
            ))}
            <div className="flex flex-row justify-between my-4 pt-2 border-t-2 border-t-stone-500">
                <input 
                    type="text" 
                    className="w-3/4 p-2 border-2 border-gray-200 rounded-lg"
                    value={newField}
                    onChange={e => setNewField(e.target.value)}
                    placeholder="e.g. labelName_inputType"
                />
                <button
                    type="button"
                    onClick={addField}
                    className="px-6 py-2 bg-blue-600 rounded-lg text-white font-semibold text-lg border-2"
                >
                    Add field
                </button>
            </div>
            <button type='submit' className="w-3/12 px-6 py-2 bg-blue-600 rounded-lg text-white font-semibold text-lg mt-3 border-2">
                Submit
            </button>

            <button 
                type='button' 
                onClick={resetForm}
                className="w-3/12 ml-2 px-6 py-2 rounded-lg text-blue-600 border-blue-600 border-2 font-semibold text-lg mt-3"
            >
                Reset
            </button>
            <button 
                onClick={props.hideActiveFormCB}
                type='button' 
                className="px-6 py-2 bg-blue-600 rounded-lg text-white font-semibold text-lg mt-3 border-2 ml-2"
            >
                Close Form
            </button>
        </form>
    );
}
