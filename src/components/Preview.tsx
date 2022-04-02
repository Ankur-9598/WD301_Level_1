import { Link, navigate } from 'raviger';
import React, { useEffect, useState } from 'react';

import { getFormData, getFormFields, me, updateField } from '../functions/ApiCalls';

import { Pagination } from '../functions/types/commonTypes';
import { Field, FormData } from '../functions/types/formTypes';

import RadioInput from './RadioInput';
import RatingInput from './RatingInput';
import TextareaInput from './TextareaInput';
import DropdownInput from './DropdownInput';
import LabelledInput from './LabelledInput';
import MultiselectInput from './MultiselectInput';
import Loading from './common/Loading';
import { User } from '../functions/types/User';
import CodeEditor from './code_editor/CodeEditor';



export default function Preview(props: {formId: number}) {
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [previewForm, setPreviewForm] = useState<FormData>()
    const [previewFields, setPreviewFields] = useState<Field[]>([]);

    useEffect(() => {
        const authenticateUser = async () => {
            const user: User = await me();
            if (user.username.length < 1) {
                alert("You must be logged in to fill this form");
                navigate("/login");
            }
            document.title = "Form Preview";
        }
        authenticateUser();
    }, []);

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                setLoading(true);
                const formData: FormData = await getFormData(props.formId);
                setPreviewForm(formData);
                const formFieldsData: Pagination<Field> = await getFormFields(props.formId); 
                setPreviewFields(formFieldsData.results);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchFormData();
    }, [props.formId]);

    const updateAnswer = (fieldId: number, value: string) => {
        setPreviewFields(previewFields.map(field => {
            if(field.id === fieldId) {
                return {
                    ...field,
                    value: value
                }
            }
            return field;
        }));
    }

    const resetFields = () => {
        setPreviewFields(previewFields.map(field => {
            return {
                ...field,
                value: ""
            }
        }));
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        let msg = "";
        try {
            previewFields.forEach(async field => {
                msg += `${field.label}: ${field.value}\n`;
                await updateField(props.formId, field.id!, field);
            });
            alert("Form submitted successfully!\n" + msg);
        } catch(error) {
            console.log(error);
        }
    }

    // Get the next active index
    const _nextField = () => {
        let currentIndex = activeIndex;
        let len = previewFields.length;
        currentIndex = currentIndex >= len - 2 ? len - 1 : currentIndex + 1;
        setActiveIndex(currentIndex);
    }

    // Get the previous active index
    const _prevField = () => {
        let currentIndex = activeIndex;
        currentIndex = currentIndex <= 1 ? 0 : currentIndex - 1;
        setActiveIndex(currentIndex);
    }

    // Get the next button
    const _nextButton = () => {
        if(activeIndex < previewFields.length - 1) {
            return (
                <button 
                    type="button" 
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-6 rounded focus:shadow-outline" 
                    onClick={_nextField}
                >
                    Next
                </button>
            );
        }
        return null;
    }

    // Get the previous button
    const _previousButton = () => {
        if(activeIndex > 0) {
            return (
                <button 
                    type="button" 
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-4 rounded focus:shadow-outline" 
                    onClick={_prevField}
                >
                    Previous
                </button>
            );
        }
        return null;
    }

    // Render form field based on the input kind
    const renderFormField = (field: Field) => {
        
        return (
            <React.Fragment key={field.id}>
                <p className="text-right">Currently on {activeIndex + 1}/{previewFields.length}</p>
                { (field.kind === "TEXT" && !field.meta) && ( 
                    <LabelledInput 
                        field={field}
                        changeValueCB={updateAnswer}
                        answer={field.value || ""}
                    />
                )}
                        
                { field.kind === "DROPDOWN" && (
                    <DropdownInput
                        field={field}
                        changeValueCB={updateAnswer}
                        answer={field.value || ""}
                    />
                )}
                    
                { field.kind === "RADIO" && (
                    <RadioInput 
                        field={field}
                        changeValueCB={updateAnswer}
                        answer={field.value || ""}
                    />
                )}

                { field.meta === "multiselect" && (
                    <MultiselectInput 
                        field={field}
                        changeValueCB={updateAnswer}
                    />
                )}

                { field.meta === "textarea" && (
                    <TextareaInput 
                        field={field}
                        answer={field.value || ""}
                        changeValueCB={updateAnswer}
                    />
                )}

                { field.meta === "rating" && (
                    <RatingInput 
                        field={field}
                        answer={field.value || ""}
                        changeValueCB={updateAnswer}
                    />
                )}

                { field.meta === "code" && (
                    <CodeEditor 
                        field={field}
                        changeValueCB={updateAnswer}
                    />
                )}
            </React.Fragment>
        ) 
    }

    return (
        <div>
            {loading && <Loading />}
            <div className="py-2 w-full flex flex-col items-center">
                <h2 className="text-xl font-semibold">{ previewForm?.title }</h2>
                <p>This form contains { previewFields.length } questions</p>
            </div>
            <form
                onSubmit={handleSubmit} 
                className="max-w-[400px] w-full mx-auto rounded-lg shadow-lg bg-gray-100 p-5 my-3"
            >
                {previewFields.map((field, index) => (
                    activeIndex === index && renderFormField(field)
                ))}
                
                <div className="flex justify-evenly mt-4">
                    {_previousButton()}
                    {_nextButton()}
                </div>

                {(activeIndex === previewFields.length -1) && 
                    <button type="submit" className="px-6 py-1 bg-gray-400 rounded-lg font-semibold text-lg mt-8 hover:shadow-lg">
                        Submit
                    </button>
                }
            </form>

            <div className="py-4 mt-4 flex justify-center items-center w-full">
                <Link 
                    href="/" 
                    className="px-6 py-1 bg-blue-400 text-white rounded-lg font-semibold text-lg shadow-sm border-2 border-blue-400 mr-2 hover:bg-white hover:text-blue-400"
                >
                    Close Form
                </Link>
                <button 
                    type='button' 
                    onClick={resetFields}
                    className="px-6 py-1 rounded-lg border-blue-400 text-blue-400 border-2 font-semibold ml-2 text-lg shadow-sm hover:bg-blue-400 hover:text-white"
                >
                    Reset Answers
                </button>
            </div>
        </div>
    );
}
