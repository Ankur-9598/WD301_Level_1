
export type FormData = {
    id?: number,
    title: string,
    description?: string,
    is_public?: boolean,
    created_by?: number,
    created_date?: Date,
    modified_date?: Date
}

type MultiSelectField = {
    kind: "multiselect",
}

type RatingField = {
    kind: "rating",
}

type TextAreaField = {
    kind: "textarea",
}

export type MetaField = MultiSelectField | RatingField | TextAreaField;

export type Field = {
    id?: number,
    label: string,
    kind: "TEXT" | "DROPDOWN" | "RADIO",
    options?: string,
    value?: string,
    meta?: string
}

export type FormField = FormData & {
    formFields: Field[]
}

export type PreviewForm = {
    formData: FormData,
    formFields: Field[],
    activeIndex: number
}
