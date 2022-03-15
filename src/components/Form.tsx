import { Link } from 'raviger';
import React, { useEffect, useRef, useState } from 'react';
import { generateFormField, validFields } from '../functions/formFieldUtils';
import { getInitialFormData, saveFormData, updateAnswerFormOnNewFieldAdded } from '../functions/storage';
import { fieldType, formField } from '../functions/types';
import Label from './Label';



export default function Form(props: {formId: number}) {
    const [formData, setFormData] = useState(() => getInitialFormData(props.formId));
    const [options, setOptions] = useState("");
    const [newField, setNewField] = useState("");
    const [newFieldKind, setNewFieldKind] = useState("");
    const [textInputType, setTextInputType] = useState("");
    const [ratingLevel, setRatingLevel] = useState(2);
    
    const titleRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        document.title = "Form - " + formData.title;
        titleRef.current?.focus();
        return () => {
            document.title = "React Typescript with Tailwindcss";
        }
    }, [formData.title]);

    useEffect(() => {
        let timeout = setTimeout(() => {
            saveFormData(formData);
            updateAnswerFormOnNewFieldAdded(formData);
        }, 1000);
        return () => {
            clearTimeout(timeout);
        }
    }, [formData]);


    const handleFormTitleChange = (value: string) => {
        setFormData({
            ...formData,
            title: value
        });
    }

    // Add a new field in the active form...
    const addField = () => {
        if(validFields(newField, newFieldKind, options, textInputType, ratingLevel)) {
            let data = newField.split("_");
            const label = data[0];
            const fieldOptions = options.split(",");
            const newFormField = generateFormField(newFieldKind, label, textInputType as fieldType, fieldOptions, ratingLevel);
    
            setFormData({
                ...formData,
                formFields: [
                    ...formData.formFields,
                    newFormField as formField
                ]
            });
            setNewField("");
            setOptions("");
            setNewFieldKind("");
            setTextInputType("");
        }
    }

    // Remove a field from the active form...
    const removeField = (id: number) => {
        setFormData({
            ...formData,
            formFields: formData.formFields.filter(field => field.id !== id)
        });
    }

    // Handle the label change...
    const handleFieldLabelChange = (id: number, value: string) => {
        setFormData({
            ...formData,
            formFields: formData.formFields.map(field => {
                if(field.id === id) return {...field, label: value};
                return field;
            })
        });
    }

    const handleFieldTypeChange = (id: number, newType: fieldType) => {
        setFormData({
            ...formData,
            formFields: formData.formFields.map(field => {
                if(field.id === id) return {...field, fieldType: newType};
                return field;
            })
        })
    }

    const handleFieldOptionsChange = (id: number, fieldOptions: string) => {
        const options = fieldOptions.split(",");
        setFormData({
            ...formData,
            formFields: formData.formFields.map(field => {
                if(field.id === id) return {...field, options: options};
                return field;
            })
        })
    }

    const handleFieldRatingChange = (id: number, ratingLevel: number) => {
        setFormData({
            ...formData,
            formFields: formData.formFields.map(field => {
                if(field.id === id) return {...field, level: ratingLevel};
                return field;
            })
        })
    }


    return (
        <form action="p-2 divide-dotted divide-gray-500 divide-y-2">
            <div className="flex flex-row justify-between my-3 pb-2">
                <input 
                    type="text" 
                    className="w-3/4 px-2 border-b-2 border-gray-400 focus:ring-0 focus:outline-0"
                    value={formData.title}
                    onChange={e => handleFormTitleChange(e.target.value)}
                    placeholder="Form Title"
                    ref={titleRef}
                />
            </div>
            
            {formData.formFields.map(field => (
                <Label 
                    key={field.id}
                    field={field}
                    removeFieldCB={removeField}
                    handleFieldTypeChangeCB={handleFieldTypeChange}
                    handleFieldLabelChangeCB={handleFieldLabelChange}
                    handleFieldRatingChangeCB={handleFieldRatingChange}
                    handleFieldOptionsChangeCB={handleFieldOptionsChange}
                />
            ))}
            <div className="flex flex-row flex-wrap justify-between gap-4 py-4 mt-3 border-y-2 border-y-stone-500">
                <input 
                    type="text" 
                    className="p-2 border-2 border-gray-200 rounded-lg"
                    value={newField}
                    onChange={e => setNewField(e.target.value)}
                    placeholder="Field Label"
                />

                <select 
                    value={newFieldKind}
                    onChange={e => setNewFieldKind(e.target.value)}
                    className='p-2 border-2 border-gray-200 rounded-lg'
                >
                    <option disabled value="">Select input kind</option>
                    <option value="text">Text</option>
                    <option value="dropdown">Dropdown</option>
                    <option value="radio">Radio</option>
                    <option value="textarea">Textarea</option>
                    <option value="multiselect">Multiselect</option>
                    <option value="rating">Rating</option>
                </select>

                {(newFieldKind === "dropdown" || newFieldKind === "radio" || newFieldKind === "multiselect") && (
                    <input 
                        type="text" 
                        value={options}
                        autoFocus
                        onChange={e => setOptions(e.target.value)}
                        placeholder="Options separated by ,(comma)"
                        className="p-2 border-2 border-gray-200 rounded-lg"
                    />   
                )}

                {(newFieldKind === "text") && (
                    <select 
                        value={textInputType}
                        onChange={e => setTextInputType(e.target.value)}
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
                )}

                {newFieldKind === "rating" && (
                    <input 
                        autoFocus
                        min={2}
                        max={10}
                        type="number" 
                        value={ratingLevel}
                        onChange={e => setRatingLevel(Number(e.target.value))}
                        className="p-2 border-2 border-gray-200 rounded-lg"
                    />
                )}

                <button
                    type="button"
                    onClick={addField}
                    className="px-6 py-[6px] border-blue-400 rounded-lg text-blue-400 font-semibold text-lg border-2"
                >
                    Add field
                </button>
            </div>

            <Link 
                href="/" 
                className="inline-block px-6 py-2 border-blue-500 rounded-lg text-blue-500 font-semibold text-lg mt-5 border-2 ml-2"
            >
                Close
            </Link>
        </form>
    );
}
