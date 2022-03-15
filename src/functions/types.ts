export type fieldType = "text" | "email" | "date" | "tel" | "time" | "number";

type basicField = {
    id: number;
    label: string;
    value: string;
}

export type TextField = basicField & {
    kind: "text";
    fieldType: fieldType;
};

export type DropdownField = basicField & {
    kind: "dropdown";
    options: string[];
}

export type RadioField = basicField &{
    kind: "radio";
    options: string[];
}

export type TextAreaField = basicField & { kind: "textarea" };

export type MultiSelectField = basicField & {
    kind: "multiselect";
    options: string[];
}

export type RatingField = basicField & {
    kind: "rating";
    level: number;
}

export type formField = TextField | DropdownField | RadioField | TextAreaField | MultiSelectField | RatingField;

export interface formData {
    id: number;
    title: string;
    formFields: formField[];
}

export interface formAnswer {
    id: number;
    answer: string;
}

export interface Answers {
    id: number;
    answers: formAnswer[];
}