/* This example requires Tailwind CSS v2.0+ */
import { navigate } from 'raviger';
import React, { useEffect, useState } from 'react'

import { User } from '../functions/types/User';
import { Error } from '../functions/types/commonTypes';
import { FormData } from '../functions/types/formTypes';

import { createForm, me } from '../functions/ApiCalls';
import { validateForm } from '../functions/utils/formUtils';

export default function CreateForm(props: {closeModalCB: () => void}) {
    const [form, setForm] = useState<FormData>({
        title: "",
        description: "",
        is_public: false
    })
    const [errors, setErrors] = useState<Error<FormData>>({});

    useEffect(() => {
        const authenticateUser = async () => {
            const user: User = await me();
            if (user.username.length < 1) {
                alert("You must be logged in to create a form");
                navigate("/login");
            }
        }
        authenticateUser();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationErrors = validateForm(form);
        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0) {
            try {
                const data = await createForm(form);
                navigate(`/forms/${data.id}`)
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="w-full max-w-lg divide-y divide-gray-200">
            <h2 className="text-2xl my-2 pl-5">Create Form</h2>
            <form onSubmit={handleSubmit} className="p-5">
                <div className="mb-4">
                    <label htmlFor="title" className={`${errors.title ? "text-red-500" : ""}`}>Title</label>
                    <input 
                        id="title"
                        type="text" 
                        name="title"
                        value={form.title}
                        onChange={e => setForm({
                            ...form,
                            title: e.target.value
                        })}
                        className="w-full p-2 my-2 border-2 border-gray-200 rounded-lg"
                    />
                    {errors.title && <p className="text-red-500">{ errors.title }</p> }
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className={`${errors.description ? "text-red-500" : ""}`}>Description</label>
                    <input 
                        id="description"
                        type="text" 
                        name="description"
                        value={form.description}
                        onChange={e => setForm({
                            ...form,
                            description: e.target.value
                        })}
                        className="w-full p-2 my-2 border-2 border-gray-200 rounded-lg"
                    />
                    {errors.description && <p className="text-red-500">{ errors.description }</p> }
                </div>
                <div className="mb-4">
                    <input 
                        id="is_public"
                        type="checkbox" 
                        name="is_public"
                        value={form.is_public ? "true" : "false"}
                        onChange={e => setForm({
                            ...form,
                            is_public: e.target.checked
                        })}
                        className="w-[14px] h-[14px] my-2 mr-2 border-2 border-gray-200 rounded-lg"
                    />
                    <label htmlFor="is_public" className={`${errors.is_public ? "text-red-500" : ""}`}>Is Public</label>
                    {errors.is_public && <p className="text-red-500">{ errors.is_public }</p> }
                </div>

                <button type="submit" className="w-full py-2 rounded-lg bg-blue-500 text-lg text-white font-semibold hover:bg-gray-200 hover:text-blue-500 hover:shadow-lg">Create</button>
                <button
                    type="button"
                    onClick={props.closeModalCB}
                    className="w-full px-6 h-11 mt-4 border-red-400 rounded-lg text-red-400 font-semibold text-lg border-2 hover:text-red-500 hover:border-red-500"
                >
                    Cancel
                </button>
            </form>
        </div>
    )
}

