import { useQueryParams } from 'raviger';
import React, { useEffect, useState } from 'react';

import { listForms } from '../functions/ApiCalls';
import { FormData } from '../functions/types/formTypes';
import { Pagination, PaginationData } from '../functions/types/commonTypes';

import Modal from './common/Modal';
import Loading from './common/Loading';
import FormCard from './FormCard';
import CreateForm from './CreateForm';
import PaginationContainer from './common/PaginationContainer';


const fetchFormsData = async (setFormsData: React.Dispatch<React.SetStateAction<PaginationData<FormData>>>, setLoading?: React.Dispatch<React.SetStateAction<boolean>>, offset?: number, limit?: number) => {
    try {
        if(setLoading) setLoading(true);
        const offsetValue: number = offset ? offset : 0;
        const limitValue: number = limit ? limit : 5;
        const data: Pagination<FormData> = await listForms({offset: offsetValue, limit: limitValue});
        
        setFormsData({
            results: data.results,
            count: data.count,
            prev: data.prev,
            next: data.next,
            limit: limitValue,
            activePage: offsetValue ? offsetValue / limitValue + 1 : 1
        });
    } catch (error) {
        console.error(error);
    } finally {
        if(setLoading) setLoading(false);
    }
}

export default function Home() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formsData, setFormsData] = useState<PaginationData<FormData>>({
        count: 0,
        prev: null,
        next: null,
        results: [],
        limit: 5,
        activePage: 0
    })
    const [{search}, setQueryParams] = useQueryParams();
    const [searchQuery, setSearchQuery] = useState(search || "");

    useEffect(() => {
        document.title = "Form Lists";
        fetchFormsData(setFormsData, setLoading);
        return () => {
            document.title = "React Typescript with Tailwindcss";
        }
    }, []);


    const onPageChange = (page: number) => {
        const offset = (page - 1) * formsData.limit;
        fetchFormsData(setFormsData, setLoading, offset, formsData.limit);
    }

    const closeModal = () => setOpen(false);

    return (
        <div className="flex flex-col">
            {loading && <Loading />}
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

            <ul>
                {formsData.results.filter(form => form.title.toLowerCase().includes(search?.toLowerCase() || ""))
                .map(form => (
                    <FormCard
                        key={form.id}
                        form={form}
                    />
                ))}
            </ul>

            <PaginationContainer
                count={formsData.count}
                limit={formsData.limit}
                activePage={formsData.activePage}
                onPageChangeCB={onPageChange}
            />

            <button 
                type='button'
                onClick={_ => setOpen(true)}
                className="max-w-[300px] w-full mx-auto text-center px-6 py-[6px] rounded-lg text-blue-600 font-semibold text-lg mt-4 border-2 border-blue-600 hover:bg-blue-600 hover:text-white"
            >
                + Create new form
            </button>

            <Modal open={open} onCloseCB={closeModal}>
                <CreateForm closeModalCB={closeModal} />
            </Modal>
            
        </div>
    );
}

