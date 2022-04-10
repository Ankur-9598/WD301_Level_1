
import { FormData } from "./formTypes"

export type Answer = {
    form_field: number;
    value: string;
}

export type Submission = {
    answers: Answer[];
    id?: number;
    form?: FormData;
    created_date?: Date;
}