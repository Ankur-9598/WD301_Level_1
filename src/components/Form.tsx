import { Link } from 'raviger';
import React, { useEffect, useReducer, useRef } from 'react';
import { getInitialFormData, saveFormData, updateAnswerFormOnNewFieldAdded } from '../functions/storage';
import { fieldType, InitialAddField } from '../functions/types';
import { NewFieldReducer } from '../reducers/FieldReducer';
import { formReducer } from '../reducers/FormReducer';
import Label from './Label';

const initialField: InitialAddField = {
    label: "",
    kind: "",
    inputType: "text",
    options: "",
    rating: 2
}

export default function Form(props: {formId: number}) {
    const [fieldState, dispatchField] = useReducer(NewFieldReducer, initialField);
    const [formDataState, dispatch] = useReducer(formReducer, null, () => getInitialFormData(props.formId));
    const titleRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        document.title = "Form - " + formDataState.title;
        titleRef.current?.focus();
        return () => {
            document.title = "React Typescript with Tailwindcss";
        }
    }, [formDataState.title]);

    useEffect(() => {
        let timeout = setTimeout(() => {
            saveFormData(formDataState);
            updateAnswerFormOnNewFieldAdded(formDataState);
        }, 1000);
        return () => {
            clearTimeout(timeout);
        }
    }, [formDataState]);

    // Add a new field in the active form...
    const addField = () => {
        dispatch({
            type: "add_field",
            fieldData: fieldState,
            callback: () => {
                dispatchField({
                    type: "clear_field"
                });
            }
        });
    }


    return (
        <form action="p-2 divide-dotted divide-gray-500 divide-y-2">
            <div className="flex flex-row justify-between my-3 pb-2">
                <input 
                    type="text" 
                    className="w-3/4 px-2 border-b-2 border-gray-400 focus:ring-0 focus:outline-0"
                    value={formDataState.title}
                    onChange={e => dispatch({type: "update_title", title: e.target.value})}
                    placeholder="Form Title"
                    ref={titleRef}
                />
            </div>
            
            {formDataState.formFields.map(field => (
                <Label 
                    key={field.id}
                    field={field}
                    removeFieldCB={(id: number) => {
                        dispatch({
                            type: "remove_field",
                            id
                        })
                    }}
                    handleFieldTypeChangeCB={(id: number, newType: fieldType) => {
                        dispatch({
                            type: "update_input_type",
                            id,
                            newType
                        })
                    }}
                    handleFieldLabelChangeCB={(id: number, value: string) => {
                        dispatch({
                            type: "update_label",
                            id,
                            value
                        })
                    }}
                    handleFieldRatingChangeCB={(id: number, ratingLevel: number) => {
                        dispatch({
                            type: "update_rating",
                            id,
                            ratingLevel
                        })
                    }}
                    handleFieldOptionsChangeCB={(id: number, fieldOptions: string) => {
                        dispatch({
                            type: "update_options",
                            id,
                            options: fieldOptions
                        })
                    }}
                />
            ))}
            <div className="flex flex-row flex-wrap justify-between gap-4 py-4 mt-3 border-y-2 border-y-stone-500">
                <input 
                    type="text" 
                    className="p-2 border-2 border-gray-200 rounded-lg"
                    value={fieldState.label}
                    onChange={e => dispatchField({
                        type: "update_label", 
                        value: e.target.value
                    })}
                    placeholder="Field Label"
                />

                <select 
                    value={fieldState.kind}
                    onChange={e => dispatchField({
                        type: "update_field_kind",
                        value: e.target.value
                    })}
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

                {(fieldState.kind === "dropdown" || fieldState.kind === "radio" || fieldState.kind === "multiselect") && (
                    <input 
                        type="text" 
                        value={fieldState.options}
                        autoFocus
                        onChange={e => dispatchField({
                            type: "update_options",
                            options: e.target.value
                        })}
                        placeholder="Options separated by ,(comma)"
                        className="p-2 border-2 border-gray-200 rounded-lg"
                    />   
                )}

                {(fieldState.kind === "text") && (
                    <select 
                        value={fieldState.inputType}
                        onChange={e => dispatchField({
                            type: "update_input_type",
                            value: e.target.value as fieldType
                        })}
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

                {fieldState.kind === "rating" && (
                    <input 
                        autoFocus
                        min={2}
                        max={10}
                        type="number" 
                        value={fieldState.rating}
                        onChange={e => dispatchField({
                            type: "update_rating",
                            rating: Number(e.target.value)
                        })}
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
