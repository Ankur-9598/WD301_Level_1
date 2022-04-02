import React from 'react';

interface EditorProps {
    placeholder: string;
    value: string;
    onChangeCB: (value: string) => void;
}

export default function Editor(props: EditorProps) {
    const { placeholder, value, onChangeCB } = props;

    return (
        <textarea
            className="w-[47%] h-full mr-4 bg-white rounded-lg pl-4 text-[16px] p-2"
            placeholder={value ? "" : placeholder}
            onChange={e => onChangeCB(e.target.value)}
        >{ value }</textarea>
    );
}
