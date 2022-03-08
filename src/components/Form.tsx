import React, { useState } from 'react';
import LabelledInput from './LabelledInput';

interface formData {
    title: string;
    formFields: formField[];
}
interface formField {
    id: number,
    label: string,
    type: string,
    value: string
}

const formFields: formField[] = [
    { id: 1, label: "First Name", type: "text", value: ""},
    { id: 2, label: "Last Name", type: "text", value: ""},
    { id: 3, label: "Email", type: "email", value: ""},
    { id: 4, label: "Phone Number", type: "tel", value: ""},
    { id: 5, label: "Date of Birth", type: "date", value: ""}
]

export default function Form(props: {changeStateCB: (value: string) => void}) {
    const [formData, setFormData] = useState(formFields);
    const [value, setValue] = useState("");

    const resetForm = () => { 
        setFormData(formData.map(data => {
            data.value = "";
            return data;
        }));
    }

    const changeValue = (id: number, value: string) => {
        setFormData(formData.map(data => {
            if (data.id === id) {
                return { ...data, value: value };
            }
            return data;
        }));
    }
    const addField = () => {
        let data = value.split("_");
        const label = data[0];
        const type = data.length > 1 ? data[1] : "text";
        setFormData([
            ...formData,
            {
                id: Number(new Date()),
                label: label,
                type: type,
                value: ""
            }
        ])
        setValue("");
    }

    const removeField = (id: number) => {
        setFormData(formData.filter(data => data.id !== id));
    }

    return (
        <form action="p-2 divide-dotted divide-gray-500 divide-y-2">
            {formData.map(field => (
                <LabelledInput 
                    key={field.id}
                    id={field.id}
                    label={field.label}
                    value={field.value}
                    type={field.type}
                    changeValueCB={changeValue}
                    removeFieldCB={removeField}
                />
            ))}
            <div className="flex flex-row justify-between my-4 pt-2 border-t-2 border-t-stone-500">
                <input 
                    type="text" 
                    className="w-3/4 p-2 border-2 border-gray-200 rounded-lg"
                    value={value}
                    onChange={e => setValue(e.target.value)}
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
                onClick={() => props.changeStateCB("home")}
                type='button' 
                className="px-6 py-2 bg-blue-600 rounded-lg text-white font-semibold text-lg mt-3 border-2 ml-2"
            >
                Close Form
            </button>
        </form>
    );
}
