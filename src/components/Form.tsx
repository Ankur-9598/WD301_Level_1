import { Link, navigate } from 'raviger';
import React, { useEffect, useRef, useState } from 'react';

import { Pagination } from '../functions/types/commonTypes';
import { Field, FormData } from '../functions/types/formTypes';
import { getFormData, getFormFields, me, removeField, updateFormData } from '../functions/ApiCalls';

import Label from './Label';
import AddFields from './AddFields';
import Modal from './common/Modal';
import Loading from './common/Loading';
import { User } from '../functions/types/User';



export default function Form(props: {formId: number}) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<FormData>({
        title: ""
    });
    const [formFields, setFormFields] = useState<Field[]>([]);
    const titleRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        document.title = "Form Preview";
        titleRef.current?.focus();

        const authenticateUser = async () => {
            const user: User = await me();
            if (user.username.length < 1) {
                alert("You must be logged in to edit a form");
                navigate("/login");
            }
        }
        authenticateUser();
    }, []);

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                setLoading(true);
                const formData: FormData = await getFormData(props.formId);
                const formFieldsData: Pagination<Field> = await getFormFields(props.formId); 
                setForm(formData);
                setFormFields(formFieldsData.results);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchFormData();
    }, [props.formId]);

    useEffect(() => {
        let timeout = setTimeout(async() => { 
            if(!form.id) return;   
            if(form.title.length < 1 || form.title.length > 100) {
                alert("Title must be between 1 and 100 characters");
                return;
            }
            const data = await updateFormData(props.formId, form);
            setForm(data);
        }, 1000);
        
        return () => {
            clearTimeout(timeout);
            document.title = "React Typescript with Tailwindcss";
        }
    }, [form, form.title, form.id, props.formId]);

    // Remove a field from the active form...
    const handleRemoveField = async (fieldId: number) => {
        try {
            await removeField(props.formId, fieldId);
            setFormFields(formFields.filter(field => field.id !== fieldId));
        } catch (error) {
            console.log(error);
        }
    }

    const closeModal = () => setOpen(false);


    return (
        <div className="p-2">
            {loading && <Loading />}
            <div className="flex flex-row justify-between my-3 pb-2">
                <input 
                    type="text" 
                    className="w-3/4 px-2 border-b-2 border-gray-400 focus:ring-0 focus:outline-0"
                    value={form.title}
                    onChange={e => setForm({...form, title: e.target.value})}
                    placeholder="Form Title"
                    ref={titleRef}
                />
            </div>
            <div className="divide-y divide-gray-400 divide-dotted">
                {formFields.map(field => (
                    <Label 
                        key={field.id}
                        field={field}
                        formId={props.formId}
                        removeFieldCB={handleRemoveField}
                    />
                ))}
            </div>


            <Modal open={open} onCloseCB={closeModal}>
                <AddFields 
                    formId={props.formId}
                    closeModalCB={closeModal}
                    setLoadingCB={(value: boolean) => setLoading(value)}
                    setFormFieldsCB={(data: Field) => setFormFields([...formFields, data])}
                />
            </Modal>
            
            <div className="flex flex-row gap-x-4 items-center">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="px-6 h-11 mt-6 border-blue-400 rounded-lg text-blue-400 font-semibold text-lg border-2"
                >
                    Add new field
                </button>
                <Link 
                    href="/" 
                    className="flex items-center justify-center px-6 h-11 w-36  border-red-500 rounded-lg text-red-500 font-semibold text-lg mt-5 border-2 ml-2"
                >
                    Close
                </Link>

            </div>
        </div>
    );
}
