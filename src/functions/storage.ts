import { FormAnswers, formData, formField } from "./types";

// Initial form fields
const initialFormFields: formField[] = [
    { kind: "text", id: 1, label: "Name", fieldType: "text", value: ""},
    { kind: "text", id: 2, label: "Email", fieldType: "email", value: ""},
    { kind: "dropdown", id: 3, label: "Branch", options: ["CSE", "ECE", "EE", "EIE", "Other"], value: ""}
]

export const getLocalFormsData: () => formData[] = () => {
    
    const formDataJSON = localStorage.getItem("formData");
    if(formDataJSON) {
        return JSON.parse(formDataJSON);
    }
    return [];
}

// Get initial form data from local storage
export const getInitialFormData: (id: number) => formData = (id) => {
    
    const localForms = getLocalFormsData();
    const form = localForms.find(form => form.id === id);
    if(form) {
        return form;
    }
    const newForm = {
        id: Number(id),
        title: "Untitled Form",
        formFields: initialFormFields
    }
    saveLocalForms([...localForms, newForm]);
    return newForm;
}

// Save form data to local storage
export const saveLocalForms = (localForms: formData[]) => {
    
    localStorage.setItem("formData", JSON.stringify(localForms));
}

export const saveFormData = (currentData: formData) => {
    
    const localForms = getLocalFormsData()
    const updatedFormData = localForms.map((form: formData) => 
        form.id === currentData.id ? currentData : form
    )
    saveLocalForms(updatedFormData);
}

//====================Answers Functions=======================
export const updateAnswerFormOnNewFieldAdded = (formData: formData) => {
    const localAnswers = getLocalAnswersData();
    let formAnswers = localAnswers.find(answer => answer.id === formData.id);
    
    if(formAnswers) {
        let addedField = formData.formFields.filter(field => !formAnswers?.answers.find(answer => answer.id === field.id));
        
        if(addedField.length > 0) {
            const newAnswer = {
                id: addedField[0].id,
                answer: ""
            }
            formAnswers.answers.push(newAnswer);
            saveFormAnswers(formAnswers);
        }  
    }
}

export const getInitialAnswerData: (formData: formData) => FormAnswers = (formData) => {
        const localAnswers = getLocalAnswersData();
        const answer = localAnswers.find(answer => answer.id === formData.id);
        if(answer) {
            return answer;
        }
        const newFormAnswer = {
            id: Number(formData.id),
            answers: formData.formFields.map(field => ({id: field.id, answer: ""}))
        }
        saveLocalAnswers([...localAnswers, newFormAnswer]);
        return newFormAnswer;
}

export const getLocalAnswersData: () => FormAnswers[] = () => {
    const answerJSON = localStorage.getItem("answersData");
    if(answerJSON) {
        return JSON.parse(answerJSON);
    }
    return [];
}

export const saveLocalAnswers = (localAnswers: FormAnswers[]) => {
    localStorage.setItem("answersData", JSON.stringify(localAnswers));
}

export const saveFormAnswers = (answers: FormAnswers) => {
    const localAnswers = getLocalAnswersData();
    const updatedAnswers = localAnswers.map(localAnswers => {
        if(answers.id === localAnswers.id) {
            return answers;
        }
        return localAnswers;
    });
    saveLocalAnswers(updatedAnswers);
}
