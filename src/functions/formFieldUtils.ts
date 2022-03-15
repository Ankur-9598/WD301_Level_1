import { fieldType } from "./types";


export const textFormField = (label: string, fieldType: fieldType) => {
    return {
        kind: "text",
        id: Number(new Date()),
        label: label,
        fieldType: fieldType,
        value: ""
    };
}

export const optionsFormField = (kind: string, label: string, options: string[]) => {
    return {
        kind: kind,
        id: Number(new Date()),
        label: label,
        options: options,
        value: ""
    };
}

export const textareaFormField = (label: string) => {
    return {
        kind: "textarea",
        id: Number(new Date()),
        label: label,
        value: ""
    }
};

export const ratingFormField = (label: string, rating: number) => {
    return {
        kind: "rating",
        id: Number(new Date()),
        label: label,
        level: rating,
        value: ""
    }
}

export const generateFormField = (kind: string, label: string, fieldType: fieldType = "text", options: string[] = [], rating: number = 5) => {
    
    switch(kind) {
        case "text":
            return textFormField(label, fieldType);

        case "textarea":
            return textareaFormField(label);
        
        case "rating":
            return ratingFormField(label, rating);

        default:
            return optionsFormField(kind, label, options);    
    };
}

export const validFields = (fieldLabel: string, inputKind: string, options: string, textInputType: string, ratingLevel: number) => {
    if (fieldLabel === "") {
        alert("Field label cannot be empty.");
        return false;
    }
    if (inputKind === "") {
        alert("Input kind cannot be empty.");
        return false;
    }
    if(inputKind === "rating" && (ratingLevel < 2 || ratingLevel > 10)) {
        alert("Rating level must be between 2 and 10.");
        return false;
    }
    if (inputKind !== "text" && inputKind !== "textarea" && inputKind !== "rating" && options === "") {
        alert("Options cannot be empty.");
        return false;
    }
    if (inputKind === "text" && textInputType === "") {
        alert("Text input type cannot be empty.");
        return false;
    }
    return true;
}