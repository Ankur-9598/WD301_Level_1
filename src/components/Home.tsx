import { Link, useQueryParams } from 'raviger';
import React, { useEffect, useState } from 'react';
import { getLocalFormsData, saveLocalForms } from '../functions/storage';
import FormCard from './FormCard';


export default function Home() {
    const [{search}, setQueryParams] = useQueryParams();
    const [searchQuery, setSearchQuery] = useState(search || "");
    const [localForms, setLocalForms] = useState(() => getLocalFormsData());

    useEffect(() => {
        document.title = "Form Lists";
        return () => {
            document.title = "React Typescript with Tailwindcss";
        }
    }, []);


    const deleteForm = (id: number) => {
        const updatedForms = localForms.filter(form => form.id !== id);
        saveLocalForms(updatedForms);
        setLocalForms(updatedForms);
    }



    return (
        <div className="flex flex-col">
            <form
                className="my-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    setQueryParams({search: searchQuery});
                }}
            >
                <input 
                    type="text" 
                    name="search"
                    placeholder="Search forms..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full px-2 py-2 border-2 rounded-lg border-gray-400 focus:ring-0 focus:outline-0"
                />
            </form>

            { (search !== undefined && search !== "") && <h2 className="text-xl font-bold mb-4">Search results for "{search}"</h2> }

            {localForms.filter(form => form.title.toLowerCase().includes(search?.toLowerCase() || ""))
            .map(form => (
                <FormCard
                    key={form.id}
                    form={form}
                    deleteFormCB={deleteForm}
                />
            ))}
            
            <Link 
                href={`/forms/${Number(new Date())}`} 
                className="max-w-[300px] w-full mx-auto text-center px-6 py-[6px] rounded-lg text-blue-600 font-semibold text-lg mt-4 border-2 border-blue-600 hover:bg-blue-600 hover:text-white"
            >
                + Create new form
            </Link>
        </div>
    );
}

