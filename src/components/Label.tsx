import { Link } from 'raviger';
import React, { useEffect, useState } from 'react';
import { updateField } from '../functions/ApiCalls';
import { Field } from '../functions/types/formTypes';

interface LabelPropsInterface {
    field: Field;
    formId: number;
    removeFieldCB: (id: number) => void;
}


export default function Label(props: LabelPropsInterface) {
    const { field, formId, removeFieldCB } = props;
    const [fieldData, setFieldData] = useState<Field>(field);
    
    useEffect(() => {
        let timeout = setTimeout(async () => {
            await updateField(formId, fieldData.id!, fieldData);
        }, 1000);
        return () => clearTimeout(timeout);
    }, [fieldData, formId]);

    return (
        <li className="flex justify-between items-end gap-3 mb-4 bg-slate-100 px-3 pb-4 py-1 rounded-lg" tabIndex={0}>
            <div className="flex flex-col">
                <label className="block text-gray-600 text-lg">
                    Label
                </label>
                <input 
                    type="text" 
                    value={fieldData.label}
                    placeholder='Label'
                    className="flex-1 p-2 border-2 border-gray-200 rounded-lg"
                    onChange={e => setFieldData({...fieldData, label: e.target.value})}
                />
            </div>
            {(fieldData.kind === "RADIO" || fieldData.kind === "DROPDOWN" || fieldData.meta === "multiselect") && (
                <div className="flex flex-col">
                    <label className="block text-gray-600 text-lg">Options</label>
                    <input 
                        type="text" 
                        name="options"
                        title="Options separated by comma(,)"
                        value={fieldData.options}
                        placeholder="Options separated by ,(comma)"
                        onChange={e => setFieldData({...fieldData, options: e.target.value})}
                        className="flex-1 p-2 border-2 border-gray-200 rounded-lg"
                    />
                </div>
            )}

            {field.meta === "rating" && (
                <div className="flex flex-col">
                    <label className="block text-gray-600 text-lg" htmlFor='rating'>Rating stars</label>
                    <input 
                        type="number" 
                        id="rating"
                        title="Rating stars"
                        value={fieldData.options}
                        className="flex-1 p-2 border-2 border-gray-200 rounded-lg"
                        onChange={e => setFieldData({...fieldData, options: e.target.value})}
                    />
                </div>
            )}
            <div className="flex gap-2 ml-2">
                <button
                    type="button"
                    onClick={() => removeFieldCB(fieldData.id!)}
                    className="px-6 py-[5px] border-red-400 rounded-lg text-red-400 font-semibold text-lg border-2"
                >
                    Remove
                </button>

                <Link
                    href="#"
                    className="px-4 py-1 rounded-lg font-semibold text-lg text-slate-700"
                >
                    Drag
                </Link>
            </div>

        </li>
    )
}
