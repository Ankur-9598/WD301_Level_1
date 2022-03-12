import React, { useState } from 'react';

interface LabelPropsInterface {
    id: number;
    label: string;
    removeFieldCB: (id: number) => void;
    handleFieldLabelChangeCB: (id: number, value: string) => void;
}

export default function Label(props: LabelPropsInterface) {
    const [newLabel, setNewLabel] = useState(props.label);

    return (
        <>
            <label className="block text-gray-600 text-lg">
                {props.label}
            </label>
            <div className="flex justify-between">
                <input 
                    type="text" 
                    className="flex-1 p-2 border-2 border-gray-200 rounded-lg mb-1 mr-2"
                    value={newLabel}
                    onChange={e => setNewLabel(e.target.value)}
                />
                <div className="flex gap-2 ml-2">
                    <button
                        type="button"
                        onClick={() => props.handleFieldLabelChangeCB(props.id, newLabel)}
                        className="px-6 py-[6px] border-blue-400 rounded-lg text-blue-400 font-semibold text-lg border-2 mb-1"
                    >
                        Change Label
                    </button>
                    <button
                        type="button"
                        onClick={() => props.removeFieldCB(props.id)}
                        className="px-6 py-[6px] border-red-400 rounded-lg text-red-400 font-semibold text-lg border-2 mb-1"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </>
    )
}
