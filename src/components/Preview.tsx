import { Link } from 'raviger';
import React, { useEffect, useReducer } from 'react';
import { getInitialAnswerData, getInitialFormData, saveFormAnswers } from '../functions/storage';
import { formField, PreviewForm } from '../functions/types';
import { previewReducer } from '../reducers/PreviewReducer';
import DropdownInput from './DropdownInput';
import LabelledInput from './LabelledInput';
import MultiselectInput from './MultiselectInput';
import RadioInput from './RadioInput';
import RatingInput from './RatingInput';
import TextareaInput from './TextareaInput';

const initializePreview = (formId: number): PreviewForm => {
    const formData = getInitialFormData(formId);
    const formAnswers = getInitialAnswerData(formData);
    return {
        formData,
        formAnswers,
        activeIndex: 0
    }
}

export default function Preview(props: {formId: number}) {
    const [previewState, dispatch] = useReducer(previewReducer, null, () => initializePreview(props.formId))

    useEffect(() => {
        document.title = "Form Preview";
        return () => {
            document.title = "Home";
        }
    }, []);

    useEffect(() => {
        let timeout = setTimeout(() => {
            saveFormAnswers(previewState.formAnswers);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        }
    }, [previewState.formAnswers]);

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { formData, formAnswers } = previewState;
        let msg = "Hello User,\n";
        msg += "Your answers has been recorded.\n"
        msg += `Form title: ${formData.title}\n\n`;
        formAnswers.answers.forEach(answer => {
            msg += `${formData.formFields.find(field => field.id === answer.id)?.label}: ${answer.answer}\n`;
        });
        msg += "\nThank you for your time.";
        alert(msg);
    }

    // Get the next active index
    const _nextField = () => {
        let currentIndex = previewState.activeIndex;
        let len = previewState.formData.formFields.length;
        currentIndex = currentIndex >= len - 2 ? len - 1 : currentIndex + 1;
        // setActiveIndex(currentIndex);
        dispatch({
            type: "update_active_index",
            curr_index: currentIndex
        });
    }

    // Get the previous active index
    const _prevField = () => {
        let currentIndex = previewState.activeIndex;
        currentIndex = currentIndex <= 1 ? 0 : currentIndex - 1;
        // setActiveIndex(currentIndex);
        dispatch({
            type: "update_active_index",
            curr_index: currentIndex
        });
    }

    // Get the next button
    const _nextButton = () => {
        if(previewState.activeIndex < previewState.formData.formFields.length - 1) {
            return (
                <button 
                    type="button" 
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-6 rounded focus:outline-none focus:shadow-outline" 
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
        if(previewState.activeIndex > 0) {
            return (
                <button 
                    type="button" 
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline" 
                    onClick={_prevField}
                >
                    Previous
                </button>
            );
        }
        return null;
    }

    // Get the answer of a field
    const getAnswer = (fieldId: number): string => {
        return previewState.formAnswers.answers.filter(answer => answer.id === fieldId)[0].answer;
    }

    // Render form field based on the input kind
    const renderFormField = (field: formField) => {
        
        return (
            <React.Fragment key={field.id}>
                <p className="text-right">Currently on {previewState.activeIndex + 1}/{previewState.formData.formFields.length}</p>
                { field.kind === "text" 
                    ?  
                        <LabelledInput 
                            field={field}
                            changeValueCB={(id: number, value: string) => {
                                dispatch({
                                    type: "update_answer",
                                    id,
                                    value
                                })
                            }}
                            answer={getAnswer(field.id)}
                        />
                        
                    : field.kind === "dropdown" ?
                        <DropdownInput
                            field={field}
                            changeValueCB={(id: number, value: string) => {
                                dispatch({
                                    type: "update_answer",
                                    id,
                                    value
                                })
                            }}
                            answer={getAnswer(field.id)}
                        />
                    
                    : field.kind === "radio" ?
                        <RadioInput 
                            field={field}
                            changeValueCB={(id: number, value: string) => {
                                dispatch({
                                    type: "update_answer",
                                    id,
                                    value
                                })
                            }}
                            answer={getAnswer(field.id)}
                        />

                    : field.kind === "textarea" ?
                        <TextareaInput 
                            field={field}
                            changeValueCB={(id: number, value: string) => {
                                dispatch({
                                    type: "update_answer",
                                    id,
                                    value
                                })
                            }}
                            answer={getAnswer(field.id)}
                        />

                    : field.kind === "multiselect" ?
                        <MultiselectInput 
                            field={field}
                            changeValueCB={(id: number, value: string) => {
                                dispatch({
                                    type: "update_answer",
                                    id,
                                    value
                                })
                            }}
                            answer={getAnswer(field.id)}    
                        />
                    : <RatingInput 
                        field={field}
                        changeValueCB={(id: number, value: string) => {
                            dispatch({
                                type: "update_answer",
                                id,
                                value
                            })
                        }}
                        answer={getAnswer(field.id)}
                    />
                }
            </React.Fragment>
        ) 
    }

    return (
        <>
            <div className="py-2 w-full flex flex-col items-center">
                <h2 className="text-xl font-semibold">{ previewState.formData.title }</h2>
                <p>This form contains {previewState.formData.formFields.length } questions</p>
            </div>
            <form
                onSubmit={handleSubmit} 
                className="max-w-[400px] w-full mx-auto rounded-lg shadow-lg bg-gray-100 p-5 my-3"
            >
                {previewState.formData.formFields.map((field, index) => (
                    previewState.activeIndex === index && renderFormField(field)
                ))}
                
                <div className="flex justify-evenly mt-4">
                    {_previousButton()}
                    {_nextButton()}
                </div>

                {(previewState.activeIndex === previewState.formData.formFields.length -1) && 
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
                    onClick={() => {
                        dispatch({
                            type: "reset_answer"
                        })
                    }}
                    className="px-6 py-1 rounded-lg border-blue-400 text-blue-400 border-2 font-semibold ml-2 text-lg shadow-sm hover:bg-blue-400 hover:text-white"
                >
                    Reset Answers
                </button>
            </div>
        </>
    );
}
