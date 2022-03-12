import { Link } from 'raviger';
import React, { useEffect, useState } from 'react';
import { getInitialAnswerData, getInitialFormData, saveFormAnswers } from '../functions/storage';
import LabelledInput from './LabelledInput';



export default function Preview(props: {formId: number}) {
    const [formData] = useState(() => getInitialFormData(props.formId));
    const [formAnswers, setFormAnswers] = useState(() => getInitialAnswerData(formData));
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        document.title = "Form Preview";
        return () => {
            document.title = "Home";
        }
    }, []);

    useEffect(() => {
        let timeout = setTimeout(() => {
            saveFormAnswers(formAnswers);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        }
    }, [formAnswers]);

    // Reset the answers...
    const resetAnswers = () => { 
        setFormAnswers({
            ...formAnswers,
            answers: formAnswers.answers.map(answer => {
                return {...answer, answer: ""};
            })
        });
    }

    // Control the form field change value...
    const handleFieldChange = (id: number, value: string) => {
        setFormAnswers({
            ...formAnswers,
            answers: formAnswers.answers.map(answer => {
                if (answer.id === id) {
                    return {...answer, answer: value}
                }
                return answer;
            })
        });
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
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
        let currentIndex = activeIndex;
        let len = formData.formFields.length;
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
        if(activeIndex < formData.formFields.length - 1) {
            return (
                <button 
                    type="button" 
                    className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-1 px-6 rounded focus:outline-none focus:shadow-outline" 
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
                    className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline" 
                    onClick={_prevField}
                >
                    Previous
                </button>
            );
        }
        return null;
    }

    return (
        <>
            <div className="py-2 w-full flex flex-col items-center">
                <h2 className="text-xl font-semibold">{ formData.title }</h2>
                <p>This form contains {formData.formFields.length } questions</p>
            </div>
            <form
                onSubmit={handleSubmit} 
                className="max-w-[400px] w-full mx-auto rounded-lg shadow-lg bg-gray-50 p-5 my-3"
            >
                {formData.formFields.map((field, index) => (activeIndex === index && (
                    <React.Fragment key={field.id}>
                        <p className="text-right">Currently on {activeIndex + 1}/{formData.formFields.length}</p>
                        <LabelledInput 
                            key={field.id}
                            field={field}
                            answer={formAnswers.answers.filter(answer => answer.id === field.id)[0].answer}
                            changeValueCB={handleFieldChange}
                        />
                    </React.Fragment>
                )))}

                <div className="flex justify-evenly mt-4">
                    {_previousButton()}
                    {_nextButton()}
                </div>

                {(activeIndex === formData.formFields.length -1) && 
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
                    onClick={resetAnswers}
                    className="px-6 py-1 rounded-lg border-blue-400 text-blue-400 border-2 font-semibold ml-2 text-lg shadow-sm hover:bg-blue-400 hover:text-white"
                >
                    Reset Answers
                </button>
            </div>
        </>
    );
}
