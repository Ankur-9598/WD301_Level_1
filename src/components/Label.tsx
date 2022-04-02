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
        <div className="flex justify-between items-end gap-3 mb-2">
            <div className="flex flex-col my-2">
                <label className="block text-gray-600 text-lg">
                    {fieldData.label}
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
                    <div className="flex flex-col my-2">
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
                    <div className="flex flex-col my-2">
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

                { field.meta === "code" && (
                    <div className="flex flex-col my-2">
                        <label htmlFor="code">Language</label>
                        <select 
                            id="code"
                            title='Code Language'
                            value={fieldData.options}
                            onChange={e => setFieldData({...fieldData, options: e.target.value})}
                            className='p-2 border-2 border-gray-200 rounded-lg'
                        >
                            <option disabled value="">Select code language</option>
                            <option value="c">C</option>
                            <option value="cpp">C++</option>
                            <option value="javascript">Javascript</option>
                            <option value="java">Java</option>
                            <option value="python">Python</option>
                        </select>
                    </div>
                )}

                <div className="flex gap-2 ml-2">
                    <button
                        type="button"
                        onClick={() => removeFieldCB(fieldData.id!)}
                        className="px-6 py-[6px] border-red-400 rounded-lg text-red-400 font-semibold text-lg border-2 mb-1"
                    >
                        Remove
                    </button>
                </div>
        </div>
    )
}
