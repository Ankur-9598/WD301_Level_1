
export interface formData {
    id: number;
    title: string;
    formFields: formField[];
}

// formField interface...
export interface formField {
    id: number;
    label: string;
    type: string;
    value: string;
}

export interface formAnswer {
    id: number;
    answer: string;
}

export interface Answers {
    id: number;
    answers: formAnswer[];
}