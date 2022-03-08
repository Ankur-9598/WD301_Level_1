import React, { useState } from 'react';

export default function LabelledInput(props: { id: number, label: string, value: string, type: string, changeValueCB: (id: number, value: string) => void, removeFieldCB: (id: number) => void }) {

    return (
        <>
            <label className="block text-gray-600 text-lg">
                {props.label}
            </label>
            <div className="flex justify-between">
                <input 
                    type={props.type} 
                    className="w-3/4 p-2 border-2 border-gray-200 rounded-lg"
                    value={props.value}
                    onChange={e => props.changeValueCB(props.id, e.target.value)}
                />
                <button
                    onClick={() => props.removeFieldCB(props.id)}
                    className="px-6 py-2 bg-blue-600 rounded-lg text-white font-semibold text-lg border-2"
                >
                    Remove
                </button>
            </div>
        </>
    )
}
