import { Link, navigate } from "raviger";
import React, { useEffect, useState } from "react";

import Loading from "../common/Loading";

import { getAllSubmissions } from "../../functions/ApiCalls";

import { Pagination } from "../../functions/types/commonTypes";
import { Submission } from "../../functions/types/submissionTypes";

const getDate = (date: Date | undefined) => {
    if(date === undefined) return "";

    const newDate = new Date(date);
    return newDate.toDateString();
}

export default function PreviewHome(props: {formId: number}) {
    const [loading, setLoading] = useState(false);
    const [previewSubmissions, setPreviewSubmissions] = useState<Pagination<Submission>>({
        count: 0,
        next: null,
        prev: null,
        results: [],
    });

    useEffect(() => {
        document.title = "Form Preview";
        const fetchPreviewData = async () => {
            try {
                setLoading(true);
                const data: Pagination<Submission> = await getAllSubmissions(props.formId);
                setPreviewSubmissions(data);
            } catch (error) {
                console.log("Error fetching preview data", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPreviewData();
    }, [props.formId]);


    return (
        <div>
            {loading && <Loading />}
            {previewSubmissions.count === 0 ? (
                <p className="text-xl text-red-600 font-medium text-center">No submissions yet</p>
            ) : (
                <div className="">
                    <h2 className="text-lg font-medium">Title: <span className="font-normal">{previewSubmissions.results[0].form?.title}</span></h2>
                    <h2 className="text-lg font-medium">Description: <span className="font-normal">{previewSubmissions.results[0].form?.description}</span></h2>
                    <h2 className="text-lg font-medium">Created On: <span className="font-normal">{getDate(previewSubmissions.results[0].form?.created_date)}</span></h2>
                    <h2 className="text-lg font-medium">Total Submissions: <span className="font-normal">{previewSubmissions.count}</span></h2>
                </div>
            )}

            <div className="py-4 mt-4 flex justify-center items-center w-full">
                <Link 
                    href={`/preview/${props.formId}/submission`}
                    className="px-6 py-1 bg-blue-400 text-white rounded-lg font-semibold text-lg shadow-sm border-2 border-blue-400 mr-2 hover:bg-white hover:text-blue-400"
                >
                    New Submission
                </Link>
                <button 
                    type='button' 
                    onClick={() => navigate("/")}
                    className="px-6 py-1 rounded-lg border-red-400 text-red-400 border-2 font-semibold ml-2 text-lg shadow-sm hover:bg-red-400 hover:text-white"
                >
                    Back to forms
                </button>
            </div>
        </div>
    )
}