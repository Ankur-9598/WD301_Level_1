import React, { useEffect, useState } from 'react';
import Form from './Form';

// formData interface...
interface formData {
    id: number;
    title: string;
    formFields: formField[];
}

// formField interface...
interface formField {
    id: number,
    label: string,
    type: string,
    value: string
}

// Initial form fields
const initialFormFields: formField[] = [
    { id: 1, label: "First Name", type: "text", value: ""},
    { id: 2, label: "Last Name", type: "text", value: ""},
    { id: 3, label: "Email", type: "email", value: ""},
    { id: 5, label: "Date of Birth", type: "date", value: ""}
]

// Get form data from local storage
const getLocalFormData: () => formData[] = () => {
    const formDataJSON = localStorage.getItem("formData");
    if(formDataJSON) {
        return JSON.parse(formDataJSON);
    }
    const newForm = {
        id: Number(new Date()),
        title: "Untitled Form",
        formFields: initialFormFields
    }
    saveLocalForms([newForm]);
    return [newForm];
}

// Save form data to local storage
const saveLocalForms = (localForms: formData[]) => {
    localStorage.setItem("formData", JSON.stringify(localForms));
}


export default function FormList(props: {changeStateCB: (value: string) => void}) {
    const [showForm, setShowForm] = useState(false);
    const [localForms, setLocalForms] = useState(() => getLocalFormData());
    const [activeForm, setActiveForm] = useState(localForms[0]);
    const [newFormTitle, setNewFormTitle] = useState("");

    useEffect(() => {
        document.title = "Form Lists";
        return () => {
            document.title = "React Typescript with Tailwindcss";
        }
    }, []);

    const saveFormData = (currentData: formData) => {
        const localForms = getLocalFormData()
        const updatedFormData = localForms.map(form => 
            form.id === currentData.id ? currentData : form
        )
        saveLocalForms(updatedFormData);
        setLocalForms(updatedFormData);
    }

    const addNewForm = () => {
        const newForm = {
            id: Number(new Date()),
            title: newFormTitle,
            formFields: initialFormFields
        }
        saveLocalForms([...localForms, newForm]);
        setLocalForms([...localForms, newForm]);
        setNewFormTitle("");
    }

    const deleteForm = (id: number) => {
        const updatedForms = localForms.filter(form => form.id !== id);
        saveLocalForms(updatedForms);
        setLocalForms(updatedForms);
    }

    const showActiveForm = (form: formData) => {
        setActiveForm(form);
        setShowForm(true);
    }

    const hideActiveForm = () => {
        setShowForm(false);
    }


    return (
        <div className="flex flex-col">
            {showForm ? 
                <Form 
                    formData={activeForm} 
                    hideActiveFormCB={hideActiveForm} 
                    saveFormDataCB={saveFormData}
                />
            :
                <>
                    {localForms.map(form => (
                        <div className="flex flex-row w-full justify-between items-center my-2" key={form.id}>
                            <h2 className="text-xl font-medium">{form.title}</h2>
                            <div className="flex gap-2">
                                <button 
                                    type="button"
                                    onClick={() => showActiveForm(form)}
                                    className="px-6 py-1 bg-blue-600 rounded-lg text-white font-semibold text-lg mt-3"
                                >
                                    Edit
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => deleteForm(form.id)}
                                    className="px-6 py-1 bg-red-400 rounded-lg text-white font-semibold text-lg mt-3"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="flex flex-row justify-between my-4 pt-2 border-t-2 border-t-stone-500">
                        <input 
                            type="text" 
                            className="w-3/4 p-2 border-2 border-gray-200 rounded-lg"
                            value={newFormTitle}
                            onChange={e => setNewFormTitle(e.target.value)}
                            placeholder="New form title"
                        />
                        <button
                            type="button"
                            onClick={addNewForm}
                            className="px-6 py-1 bg-blue-600 rounded-lg text-white font-semibold text-lg border-2"
                        >
                            Add
                        </button>
                    </div>
                    <button 
                        onClick={() => props.changeStateCB("home")}
                        type='button' 
                        className="px-6 py-1 bg-blue-600 rounded-lg text-white font-semibold text-lg mt-3 border-2 ml-2"
                    >
                        Back to Home
                    </button>
                </>
            }
        </div>
    );
}
